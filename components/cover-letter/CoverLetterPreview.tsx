'use client';

import { Printer } from 'lucide-react';

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

  // Format date: "October 24, 2024"
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

      {/* A4 Paginator Wrapper */}
      <A4Paginator paddingMM={12}>
        <div className="flex h-full gap-8">
          {/* Left Column: Profile & Contact */}
          <div className="w-[35%] shrink-0 pt-8">
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
                {roleTitle || 'Associate Software Engineer'}
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

          {/* Vertical Divider */}
          <div className="w-px bg-slate-900 my-8" />

          {/* Right Column: Letter Content */}
          <div className="flex-1 pt-8">
            {/* Salutation */}
            <div className="mb-8">
              <p className="text-base text-slate-900">
                Dear {hiringManagerName || '[Hiring Manager Name]'},
              </p>
            </div>

            {/* Body Paragraphs */}
            <div className="space-y-6 text-base leading-relaxed text-slate-800">
              <p>
                I am writing to apply for the {roleTitle || 'Associate Software Engineer'} position at {companyName || '[Company Name]'}. With my experience in software engineering and development, I am confident that I am the perfect candidate for this role.
              </p>

              <p>
                I have a Bachelor&apos;s degree in Computer Science and have been working as a software engineer. During this time, I have developed my skills in software design, coding, debugging, and testing. I have also gained experience in working on various software projects and collaborating with teams in order to develop efficient software solutions.
              </p>

              <p>
                In addition, I have excellent problem-solving abilities and a passion for learning new technologies. I am also highly motivated and able to work in a fast-paced environment.
              </p>

              <p>
                I would be thrilled to join your team and contribute to the success of {companyName || '[Company Name]'}. I am confident that my skills and experience make me the ideal candidate for this role and I look forward to hearing from you soon.
              </p>
            </div>

            {/* Sign-off */}
            <div className="mt-12">
              <p className="text-base text-slate-900">Sincerely,</p>
              <p className="mt-8 text-base text-slate-900">
                {profile.name || '[Your Name]'}
              </p>
            </div>
          </div>
        </div>
      </A4Paginator>
    </div>
  );
}
