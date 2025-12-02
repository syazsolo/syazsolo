'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

const A4_HEIGHT_MM = 297;
const A4_WIDTH_MM = 210;
const MM_TO_PX = 3.7795275591; // 1mm = 3.78px (approx at 96 DPI)

interface A4PaginatorProps {
  children: React.ReactNode;
  paddingMM?: number;
}

export function A4Paginator({ children, paddingMM = 15 }: A4PaginatorProps) {
  const [pages, setPages] = useState<React.ReactNode[][]>([]);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const childrenArray = useMemo(
    () => React.Children.toArray(children),
    [children]
  );

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const a4WidthPx = A4_WIDTH_MM * MM_TO_PX;
      // Add some padding/margin for mobile view
      const targetWidth = screenWidth - 32; // 16px padding on each side

      if (targetWidth < a4WidthPx) {
        setScale(targetWidth / a4WidthPx);
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const contentNodes = Array.from(containerRef.current.children);
    const newPages: React.ReactNode[][] = [];
    let currentPage: React.ReactNode[] = [];
    let currentHeight = 0;
    
    // Calculate content height based on dynamic padding
    const verticalPaddingMM = paddingMM * 2;
    const contentHeightMM = A4_HEIGHT_MM - verticalPaddingMM;
    const contentHeightPx = contentHeightMM * MM_TO_PX;

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
  }, [childrenArray, paddingMM]);

  return (
    <>
      {/* Measurement Container (Hidden) */}
      <div
        ref={containerRef}
        className="fixed top-0 left-0 -z-50 w-[210mm] opacity-0 pointer-events-none"
        style={{ padding: `${paddingMM}mm` }}
        aria-hidden="true"
      >
        {children}
      </div>

      {/* Rendered Pages */}
      {pages.length > 0 ? (
        <div className="flex flex-col items-center gap-8 print:block print:gap-0">
          {pages.map((pageContent, pageIndex) => (
            <div
              key={pageIndex}
              style={{
                width: `calc(210mm * ${scale})`,
                height: `calc(297mm * ${scale})`,
              }}
              className="relative print:!h-auto print:!w-full"
            >
              <div
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                  padding: `${paddingMM}mm`,
                }}
                className={`resume-page-content absolute top-0 left-0 min-h-[297mm] w-[210mm] bg-white text-slate-900 shadow-xl print:static print:min-h-[297mm] print:w-full print:shadow-none print:!scale-100 print:!m-0 ${
                pageIndex < pages.length - 1 ? 'print:break-after-page' : ''
              }`}
              >
                {pageContent}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Fallback while calculating (show first page empty or loading)
        <div className="mx-auto min-h-[297mm] w-[210mm] bg-white shadow-xl"></div>
      )}

      <style jsx global>{`
        .resume-page-content > :first-child {
          margin-top: 0 !important;
          padding-top: 0 !important;
          border-top: none !important;
        }

        @media print {
          @page {
            size: A4;
            margin: 0 !important;
          }
          html, body {
            width: 210mm;
            height: auto !important;
            min-height: 100%;
            background-color: white !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: visible !important;
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          /* Ensure no other margins interfere */
          * {
            box-sizing: border-box;
          }
        }
      `}</style>
    </>
  );
}
