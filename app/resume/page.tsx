'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link as LinkIcon, Linkedin, Mail, Phone, Printer } from 'lucide-react';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import resumeData from '@/data/resume.json';

export default function ResumePage() {
  const { profile, about, experience, education } = resumeData;

  return (
    <div className="flex min-h-screen justify-center bg-gray-100 py-12 print:bg-white print:p-0">
      <PrintButton />

      {/* A4 Paper Container */}
      <div className="mx-auto min-h-[297mm] w-[210mm] bg-white p-[15mm] text-black shadow-2xl md:p-[15mm] print:m-0 print:min-h-0 print:w-full print:p-0 print:shadow-none">
        {/* Header */}
        <header className="mb-6 flex items-start justify-between border-b-2 border-gray-800 pb-6">
          <div className="flex items-center gap-5">
            <Avatar className="h-20 w-20 border border-gray-200 print:hidden">
              <AvatarImage
                src={profile.profileUrl}
                alt={profile.name}
                className="object-cover"
              />
              <AvatarFallback className="bg-gray-100 text-xl text-gray-600">
                {profile.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 uppercase print:text-black">
                {profile.name}
              </h1>
              <p className="mt-0.5 text-lg font-medium text-gray-700 print:text-black">
                {profile.headline}
              </p>
              <p className="mt-1 text-sm text-gray-500 print:text-gray-600">
                {profile.location}
              </p>
            </div>
          </div>

          <div className="space-y-1.5 text-right text-sm text-gray-600 print:text-black">
            {profile.contact?.email && (
              <div className="flex items-center justify-end gap-2">
                <span className="text-black">{profile.contact.email}</span>
                <Mail className="h-4 w-4 text-gray-400 print:text-black" />
              </div>
            )}
            {profile.contact?.phone && (
              <div className="flex items-center justify-end gap-2">
                <span className="text-black">{profile.contact.phone}</span>
                <Phone className="h-4 w-4 text-gray-400 print:text-black" />
              </div>
            )}
            {profile.contact?.linkedin && (
              <div className="flex items-center justify-end gap-2">
                <span className="text-black">{profile.contact.linkedin}</span>
                <Linkedin className="h-4 w-4 text-gray-400 print:text-black" />
              </div>
            )}
            {profile.contact?.portfolio && (
              <div className="flex items-center justify-end gap-2">
                <span className="text-black">{profile.contact.portfolio}</span>
                <LinkIcon className="h-4 w-4 text-gray-400 print:text-black" />
              </div>
            )}
          </div>
        </header>

        {/* Summary */}
        <section className="mb-6">
          <h2 className="mb-3 border-b border-gray-200 pb-1 text-sm font-bold tracking-wider text-gray-500 uppercase print:text-gray-600">
            Summary
          </h2>
          <div className="space-y-2 text-sm leading-relaxed text-gray-800 print:text-black">
            {about.map((item, index) => {
              if (typeof item === 'string') {
                return <p key={index}>{item}</p>;
              }
              if (Array.isArray(item)) {
                return (
                  <ul key={index} className="mt-1 list-disc space-y-1 pl-5">
                    {item.map(listItem => (
                      <li key={listItem.title}>
                        <span className="font-semibold">{listItem.title}</span>{' '}
                        – {listItem.description}
                      </li>
                    ))}
                  </ul>
                );
              }
              return null;
            })}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-6">
          <h2 className="mb-4 border-b border-gray-200 pb-1 text-sm font-bold tracking-wider text-gray-500 uppercase print:text-gray-600">
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map(exp => (
              <div key={exp.id} className="flex break-inside-avoid gap-4">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded bg-gray-50 print:hidden">
                  {exp.logo ? (
                    <Image
                      src={exp.logo}
                      alt={exp.company}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs font-bold text-gray-400">
                      {exp.company[0]}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-base font-bold text-gray-900 print:text-black">
                      {exp.title}
                    </h3>
                    <span className="text-xs font-medium whitespace-nowrap text-gray-500 print:text-gray-600">
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-gray-700 print:text-black">
                    {exp.company}
                  </div>
                  <div className="mt-0.5 text-xs text-gray-500 print:text-gray-600">
                    {exp.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-6">
          <h2 className="mb-4 border-b border-gray-200 pb-1 text-sm font-bold tracking-wider text-gray-500 uppercase print:text-gray-600">
            Education
          </h2>
          <div className="space-y-4">
            {education.map(edu => (
              <div key={edu.id} className="flex break-inside-avoid gap-4">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded bg-gray-50 print:hidden">
                  {edu.logo ? (
                    <Image
                      src={edu.logo}
                      alt={edu.institution}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs font-bold text-gray-400">
                      {edu.institution[0]}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-base font-bold text-gray-900 print:text-black">
                      {edu.institution}
                    </h3>
                    <span className="text-xs font-medium whitespace-nowrap text-gray-500 print:text-gray-600">
                      {edu.startYear} – {edu.endYear}
                    </span>
                  </div>
                  <div className="text-sm text-gray-700 print:text-black">
                    {edu.program}
                  </div>
                  {edu.grade && (
                    <div className="mt-0.5 text-xs text-gray-500 print:text-gray-600">
                      Grade: {edu.grade}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function PrintButton() {
  return (
    <div className="fixed right-8 bottom-8 z-50 print:hidden">
      <Button
        onClick={() => window.print()}
        className="gap-2 shadow-xl"
        size="lg"
      >
        <Printer className="h-4 w-4" />
        Print / Save as PDF
      </Button>
    </div>
  );
}
