'use client';

import {
  Github,
  Link as LinkIcon,
  Linkedin,
  Mail,
  Phone,
  Printer,
} from 'lucide-react';

import { A4Paginator } from '@/components/ui/A4Paginator';
import { Button } from '@/components/ui/button';
import { FormData } from '@/types/cover-letter';
import React from 'react';
import resumeData from '@/data/resume.json';

interface CoverLetterPreviewProps {
  data: FormData;
  onEdit: () => void;
}

export default function CoverLetterPreview({
  data,
  onEdit,
}: CoverLetterPreviewProps) {
  const { profile } = resumeData;
  const { companyName, roleTitle, hiringManagerName, companyAddress, date } =
    data;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="mx-auto max-w-[210mm] print:max-w-none">
      {/* Action Buttons (Hidden in Print) */}
      <div className="fixed top-8 right-8 flex flex-col gap-4 print:hidden">
        <Button onClick={onEdit} variant="outline" className="shadow-lg">
          Edit Details
        </Button>
        <Button onClick={() => window.print()} className="gap-2 shadow-lg">
          <Printer className="h-4 w-4" />
          Print / Save PDF
        </Button>
      </div>

      {/* A4 Paginator Wrapper with 0 padding for full bleed header */}
      <A4Paginator paddingMM={0}>
        {/* Header Section */}
        <header className="bg-slate-900 px-12 py-16 text-white print:px-12 print:py-12">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-5xl font-bold uppercase tracking-tight sm:text-6xl">
                {profile.name}
              </h1>
              <p className="mt-2 text-xl font-light tracking-widest uppercase text-slate-400">
                {profile.headline}
              </p>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-slate-300">
              {profile.contact.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{profile.contact.email}</span>
                </div>
              )}
              {profile.contact.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{profile.contact.phone}</span>
                </div>
              )}
              {profile.contact.portfolio && (
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4" />
                  <span>{profile.contact.portfolio}</span>
                </div>
              )}
              {profile.contact.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  <span>linkedin.com/in/syazani</span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Recipient Info */}
        <div className="px-12 pt-12 pb-6 text-sm text-slate-600 print:px-12 print:pt-12 print:pb-6">
          <p className="font-medium text-slate-900">{formattedDate}</p>
          <div className="mt-4">
            <p className="font-bold text-slate-900">
              {hiringManagerName || 'Hiring Manager'}
            </p>
            <p>{roleTitle || 'Software Engineer'}</p>
            <p className="font-bold text-slate-900">
              {companyName || 'Google'}
            </p>
            {companyAddress && (
              <p className="whitespace-pre-line">{companyAddress}</p>
            )}
          </div>
        </div>

        {/* Letter Body - Split into paragraphs for pagination */}
        <div className="px-12 pb-6 text-base leading-relaxed text-slate-800 print:px-12 print:pb-6">
          <p>
            Dear {hiringManagerName || 'Hiring Manager'},
          </p>
        </div>

        <div className="px-12 pb-6 text-base leading-relaxed text-slate-800 print:px-12 print:pb-6">
          <p>
            I am writing to express my strong interest in the {roleTitle || 'Software Engineer'} position at{' '}
            <span className="font-semibold">{companyName || 'Google'}</span>. As a software engineer who views code as a craft, I have long admired companies that prioritize both technical excellence and aesthetic refinement.
          </p>
        </div>

        <div className="px-12 pb-6 text-base leading-relaxed text-slate-800 print:px-12 print:pb-6">
          <p>
            My approach to engineering is grounded in a simple philosophy: I cannot stand ugliness—whether in code architecture or user interface. In my experience building web applications with Next.js, React, and Vue, I have consistently pushed for solutions that are not just functional, but beautiful and maintainable. I believe that true quality lies in the details, from the cleanliness of a component's API to the fluidity of a micro-interaction.
          </p>
        </div>

        <div className="px-12 pb-6 text-base leading-relaxed text-slate-800 print:px-12 print:pb-6">
          <p>
            At my previous roles, I have taken pride in being a "professional crafter." Whether architecting a frontend redesign or ensuring a zero-defect rate on backend features, I bring a level of care and precision that elevates the final product. I value simplicity and clarity, and I am eager to bring this mindset to the engineering team at{' '}
            {companyName || 'Google'}.
          </p>
        </div>

        <div className="px-12 pb-6 text-base leading-relaxed text-slate-800 print:px-12 print:pb-6">
          <p>
            I would welcome the opportunity to discuss how my values and skills align with the goals of your team. Thank you for your time and consideration.
          </p>
        </div>

        {/* Sign-off */}
        <div className="px-12 pb-12 print:px-12 print:pb-12">
          <p className="text-base leading-relaxed text-slate-800">Sincerely,</p>
          <p className="mt-8 font-bold text-slate-900">{profile.name}</p>
        </div>
      </A4Paginator>
    </div>
  );
}
