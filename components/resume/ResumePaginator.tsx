'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

const A4_HEIGHT_MM = 297;
const PADDING_MM = 40; // 20mm top + 20mm bottom
const CONTENT_HEIGHT_MM = A4_HEIGHT_MM - PADDING_MM;
const MM_TO_PX = 3.7795275591; // 1mm = 3.78px (approx at 96 DPI)

interface ResumePaginatorProps {
  children: React.ReactNode;
}

export function ResumePaginator({ children }: ResumePaginatorProps) {
  const [pages, setPages] = useState<React.ReactNode[][]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const childrenArray = useMemo(() => React.Children.toArray(children), [children]);

  useEffect(() => {
    if (!containerRef.current) return;

    const contentNodes = Array.from(containerRef.current.children);
    const newPages: React.ReactNode[][] = [];
    let currentPage: React.ReactNode[] = [];
    let currentHeight = 0;
    const contentHeightPx = CONTENT_HEIGHT_MM * MM_TO_PX;

    contentNodes.forEach((node, index) => {
      const element = node as HTMLElement;
      const height = element.offsetHeight;
      const style = window.getComputedStyle(element);
      const marginTop = parseFloat(style.marginTop);
      const marginBottom = parseFloat(style.marginBottom);
      const totalHeight = height + marginTop + marginBottom;

      if (currentHeight + totalHeight > contentHeightPx) {
        // Push current page and start new one
        if (currentPage.length > 0) {
          newPages.push(currentPage);
        }
        currentPage = [childrenArray[index]];
        currentHeight = totalHeight;
      } else {
        currentPage.push(childrenArray[index]);
        currentHeight += totalHeight;
      }
    });

    if (currentPage.length > 0) {
      newPages.push(currentPage);
    }

    setPages(newPages);
  }, [childrenArray]);

  return (
    <>
      {/* Measurement Container (Hidden) */}
      <div
        ref={containerRef}
        className="fixed top-0 left-0 -z-50 w-[210mm] p-[20mm] opacity-0 pointer-events-none"
        aria-hidden="true"
      >
        {children}
      </div>

      {/* Rendered Pages */}
      {pages.length > 0 ? (
        <div className="flex flex-col gap-8 print:block print:gap-0">
          {pages.map((pageContent, pageIndex) => (
            <div
              key={pageIndex}
              className="relative mx-auto min-h-[297mm] w-[210mm] bg-white p-[20mm] text-slate-900 shadow-xl print:min-h-0 print:w-full print:shadow-none print:break-after-page"
            >
              {pageContent}
            </div>
          ))}
        </div>
      ) : (
        // Fallback while calculating (show first page empty or loading)
        <div className="mx-auto min-h-[297mm] w-[210mm] bg-white shadow-xl"></div>
      )}

      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </>
  );
}
