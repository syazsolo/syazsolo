'use client';

import { A4Paginator } from '@/components/ui/A4Paginator';
import { Button } from '@/components/ui/button';
import { ContentItem } from '@/lib/cover-letter-utils';
import { Printer } from 'lucide-react';
import React from 'react';
import resumeData from '@/data/resume.json';

interface CoverLetterPreviewProps {
  content: ContentItem[];
  regards?: ContentItem[];
  onEdit: () => void;
}

const { profile } = resumeData;

const Sidebar = () => (
    <div className="relative h-0 w-full">
      <div className="absolute top-0 left-0 w-[35%] pt-8">
        {/* Name & Title */}
        <div className="mb-8">
          <h1 className="text-5xl leading-none font-bold tracking-tight text-slate-900">
            {profile.name.split(' ').map((namePart, i) => (
              <span key={i} className="block">
                {namePart}
              </span>
            ))}
          </h1>
          <p className="mt-4 text-xl font-light text-slate-600">
            {profile.headline}
          </p>
        </div>

        {/* Divider */}
        <hr className="mb-8 border-t-2 border-slate-900" />

        {/* Contact Details */}
        <div>
          <h3 className="mb-4 text-lg font-bold text-slate-900">
            Contact Details
          </h3>
          <div className="flex flex-col gap-4 text-sm text-slate-700">
            {profile.location && (
              <div>
                <p className="leading-relaxed whitespace-pre-line">
                  {profile.location}
                </p>
              </div>
            )}

            {profile.contact.phone && (
              <div>
                <p>{profile.contact.phone}</p>
              </div>
            )}

            {profile.contact.email && (
              <div>
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="underline decoration-slate-400 underline-offset-4"
                >
                  {profile.contact.email}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Vertical Line */}
      <div className="absolute top-8 bottom-0 left-[35%] h-[250mm] w-px bg-slate-900" />
    </div>
  );

const ContentRow = ({
    children,
    className = '',
    scale = 1,
  }: {
    children: React.ReactNode;
    className?: string;
    scale?: number;
  }) => (
    <div
      className={`ml-[35%] pl-8 ${className}`}
      style={{ fontSize: `${scale}rem` }}
    >
      <div className="leading-relaxed whitespace-pre-wrap text-slate-800">
        {children}
      </div>
    </div>
  );

export default function CoverLetterPreview({
  content,
  regards = [],
  onEdit,
}: CoverLetterPreviewProps) {
  const [fontSizeScale, setFontSizeScale] = React.useState(1);
  const contentRef = React.useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const renderContentItem = (
    item: ContentItem,
    scale: number,
    key: string | number
  ): React.ReactNode => {
    if (typeof item === 'string') {
      return (
        <ContentRow key={key} scale={scale} className="pb-6">
          {item}
        </ContentRow>
      );
    }

    const ListTag = item.type === 'ul' ? 'ul' : 'ol';
    const listStyle = item.type === 'ul' ? 'list-disc' : 'list-decimal';

    return (
      <ContentRow key={key} scale={scale} className="pb-6">
        <ListTag className={`ml-4 ${listStyle} space-y-2`}>
          {item.items.map((subItem, index) => (
            <li key={index} className="pl-1">
              {typeof subItem === 'string' ? (
                subItem
              ) : (
                // Recursive rendering for nested lists if needed, though simple string items are expected for now
                <div className="mt-2">
                  {renderContentItem(subItem, scale, `nested-${index}`)}
                </div>
              )}
            </li>
          ))}
        </ListTag>
      </ContentRow>
    );
  };

  const renderCoverLetterContent = (scale: number) => {
    const renderedContent = content.map((item, index) => {
      const isFirst = index === 0;

      // Apply specific spacing for salutation
      if (isFirst && typeof item === 'string') {
        return (
          <ContentRow key={`content-${index}`} scale={scale} className="pt-8 pb-6">
            {item}
          </ContentRow>
        );
      }

      return renderContentItem(item, scale, `content-${index}`);
    });

    const renderedRegards = regards.map((item, index) => {
      const isFirst = index === 0;
      return (
        <ContentRow 
          key={`regards-${index}`} 
          scale={scale} 
          className={isFirst ? "mt-12" : ""}
        >
          {typeof item === 'string' ? item : renderContentItem(item, scale, `regards-${index}`)}
        </ContentRow>
      );
    });

    return [...renderedContent, ...renderedRegards];
  };

  // Auto-fit logic
  React.useLayoutEffect(() => {
    if (!contentRef.current) {
      return;
    }

    const MAX_HEIGHT_MM = 297 - 12 * 2; // A4 height - padding (top + bottom)
    const MM_TO_PX = 3.7795275591;
    const maxHeightPx = MAX_HEIGHT_MM * MM_TO_PX;

    // Measure the unscaled content
    const contentHeight = contentRef.current.scrollHeight;

    if (contentHeight > maxHeightPx) {
      // Calculate ratio to fit
      // Use a smaller safety factor to ensure content fits comfortably on a single page
      const SAFETY_FACTOR = 0.9;
      const ratio = (maxHeightPx / contentHeight) * SAFETY_FACTOR;
      // Don't scale up, only down. Allow a bit more shrink if needed.
      const newScale = Math.max(0.4, Math.min(1, ratio));
      setFontSizeScale(newScale);
    } else {
      setFontSizeScale(1);
    }
  }, [content]);

  return (
    <div className="mx-auto max-w-[210mm] print:max-w-none">
      {/* Action Buttons (Hidden in Print) */}
      <div className="fixed top-8 right-8 flex flex-col gap-4 print:hidden">
        <Button onClick={onEdit} variant="outline" className="shadow-lg">
          Edit Details
        </Button>
        <Button onClick={handlePrint} className="gap-2 shadow-lg">
          <Printer className="h-4 w-4" />
          Print / Save PDF
        </Button>
      </div>

      {/* Hidden Measurement Container */}
      <div
        className="pointer-events-none fixed -z-50 w-[210mm] bg-white opacity-0"
        style={{ padding: '12mm' }}
        aria-hidden="true"
      >
        {/* 
            We need to replicate the structure exactly to get accurate height.
            The Sidebar takes 0 height, so it doesn't contribute to the flow height 
            except for the vertical line which is absolute.
            The main content flow is what matters.
            We render with scale=1 to get the natural height.
         */}
        <div ref={contentRef}>{renderCoverLetterContent(1)}</div>
      </div>

      {/* A4 Paginator Wrapper */}
      <A4Paginator paddingMM={12}>
        {/* Sidebar (Absolute, on Page 1) */}
        <Sidebar />

        {/* Scaled Content */}
        {renderCoverLetterContent(fontSizeScale)}
      </A4Paginator>
    </div>
  );
}
