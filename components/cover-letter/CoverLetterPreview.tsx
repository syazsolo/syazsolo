'use client';

import { Printer } from 'lucide-react';

import { A4Paginator } from '@/components/ui/A4Paginator';
import { Button } from '@/components/ui/button';
import React from 'react';
import resumeData from '@/data/resume.json';

interface CoverLetterPreviewProps {
  content: string;
  onEdit: () => void;
  onSave: () => void;
}

export default function CoverLetterPreview({
  content,
  onEdit,
  onSave,
}: CoverLetterPreviewProps) {
  const { profile } = resumeData;

  const handlePrint = () => {
    onSave();
    window.print();
  };

  // Split content into paragraphs
  const paragraphs = content.split('\n\n');
  
  let salutation = '';
  let bodyParagraphs: string[] = [];
  let signOff = '';

  if (paragraphs.length === 1) {
    salutation = paragraphs[0];
  } else if (paragraphs.length === 2) {
    salutation = paragraphs[0];
    signOff = paragraphs[1];
  } else {
    salutation = paragraphs[0];
    bodyParagraphs = paragraphs.slice(1, -1);
    signOff = paragraphs[paragraphs.length - 1];
  }

  // Sidebar Component (Zero height wrapper to not affect flow)
  const Sidebar = () => (
    <div className="relative h-0 w-full">
      <div className="absolute top-0 left-0 w-[35%] pt-8">
        {/* Name & Title */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold leading-none tracking-tight text-slate-900">
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
                <p className="whitespace-pre-line leading-relaxed">
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
      <div className="absolute top-8 bottom-0 left-[35%] w-px bg-slate-900 h-[250mm]" />
    </div>
  );

  // Content Row Component
  const ContentRow = ({
    children,
    className = '',
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div className={`ml-[35%] pl-8 ${className}`}>
      <div className="text-base leading-relaxed text-slate-800 whitespace-pre-wrap">
        {children}
      </div>
    </div>
  );

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

      {/* A4 Paginator Wrapper */}
      <A4Paginator paddingMM={12}>
        {/* Sidebar (Absolute, on Page 1) */}
        <Sidebar />

        {/* Salutation */}
        <ContentRow className="pb-6 pt-8">
          {salutation}
        </ContentRow>

        {/* Body Paragraphs */}
        {bodyParagraphs.map((para, index) => (
          <ContentRow key={index} className="pb-6">
            {para}
          </ContentRow>
        ))}

        {/* Sign Off */}
        <ContentRow className="mt-8">
          {signOff}
        </ContentRow>
      </A4Paginator>
    </div>
  );
}
