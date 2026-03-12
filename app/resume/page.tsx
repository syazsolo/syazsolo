'use client';

import { Printer } from 'lucide-react';

import { A4Paginator } from '@/components/ui/A4Paginator';
import { Button } from '@/components/ui/button';
import React from 'react';
import resumeData from '@/data/job-hunt/v2/resume.json';

// ============================================================================
// Main Component
// ============================================================================

export default function ResumePage() {
  const { header, one_liner, experience, projects, skills, education } =
    resumeData;

  return (
    <div className="min-h-screen bg-gray-50 py-8 print:bg-white print:p-0">
      {/* Print uses slightly less padding than screen to compensate for
          browser print engine rendering fonts/layout slightly larger than screen */}
      <style>{`
        @media print {
          .resume-page-content { padding: 8mm !important; }
        }
      `}</style>
      <PrintButton />

      <A4Paginator paddingMM={10}>
        {/* Header */}
        <header className="mb-3 border-b-2 border-slate-900 pb-3">
          <h1 className="text-[26px] font-bold tracking-tight text-slate-900 uppercase">
            {header.name}
          </h1>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-slate-600">
            <span>{header.title}</span>
            <span className="text-slate-300">|</span>
            <span>{header.location}</span>
            <span className="text-slate-300">|</span>
            <a href={`mailto:${header.email}`} className="hover:text-slate-900">{header.email}</a>
            <span className="text-slate-300">|</span>
            <span>{header.phone}</span>
            <span className="text-slate-300">|</span>
            <a href={`https://${header.portfolio}`} target="_blank" rel="noreferrer" className="hover:text-slate-900">{header.portfolio}</a>
            <span className="text-slate-300">|</span>
            <a href={`https://${header.github}`} target="_blank" rel="noreferrer" className="hover:text-slate-900">{header.github}</a>
            <span className="text-slate-300">|</span>
            <a href={`https://${header.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-slate-900">{header.linkedin}</a>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 italic">
            {one_liner}
          </p>
        </header>

        {/* Experience */}
        <section className="mb-4">
          <SectionHeader title="Experience" />
          {experience.map((exp, i) => (
            <div key={i} className={`break-inside-avoid ${i > 0 ? 'mt-3 border-t border-slate-100 pt-3' : ''}`}>
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-slate-900">{exp.company}</span>
                  <span className="text-xs text-slate-400">{exp.location}</span>
                </div>
                <span className="text-xs text-slate-500 tabular-nums">{exp.period}</span>
              </div>
              <p className="mb-1 text-xs font-medium text-slate-500 italic">{exp.title}</p>
              <ul className="list-disc list-outside ml-4 space-y-0.5">
                {exp.bullets.map((bullet, j) => (
                  <li key={j} className="text-sm leading-relaxed text-slate-700">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Projects */}
        <section className="mb-4">
          <SectionHeader title="Projects" />

          {/* Bigcampus - main project */}
          <div className="break-inside-avoid">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold text-slate-900">{projects.main.name}</span>
              <a
                href={`https://${projects.main.url}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-slate-400 hover:text-slate-700 hover:underline"
              >
                {projects.main.url}
              </a>
              <span className="text-xs text-slate-400">&middot;</span>
              <span className="text-xs text-slate-500">{projects.main.stack}</span>
            </div>
            <ul className="mt-1 list-disc list-outside ml-4 space-y-0.5">
              {projects.main.bullets.map((bullet, i) => (
                <li key={i} className="text-sm leading-relaxed text-slate-700">
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          {/* Other projects — compact */}
          <div className="mt-3 space-y-1.5">
            {projects.others.map((proj, i) => (
              <div key={i} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-sm">
                <span className="font-semibold text-slate-800">{proj.name}</span>
                <a
                  href={`https://${proj.url}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-slate-400 hover:text-slate-700 hover:underline"
                >
                  {proj.url}
                </a>
                <span className="text-slate-400 text-xs">&mdash;</span>
                <span className="text-sm text-slate-600">{proj.one_liner}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-3 break-inside-avoid">
          <SectionHeader title="Skills" />
          <div className="space-y-1">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="flex gap-3 text-sm">
                <span className="w-20 shrink-0 font-semibold text-slate-800">{category}</span>
                <span className="text-slate-600">{(items as string[]).join(', ')}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="break-inside-avoid">
          <SectionHeader title="Education" />
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-bold text-slate-900">{education.institution}</span>
            <span className="text-xs text-slate-500">{education.years}</span>
          </div>
          <p className="text-sm text-slate-600">
            {education.program} &middot; {education.grade} &middot; {education.note}
          </p>
        </section>
      </A4Paginator>
    </div>
  );
}

// ============================================================================
// Sub-components
// ============================================================================

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="mb-1.5 border-b border-slate-200 pb-0.5 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
      {title}
    </h2>
  );
}


function PrintButton() {
  return (
    <div className="fixed right-8 bottom-8 z-50 print:hidden">
      <Button
        onClick={() => window.print()}
        className="gap-2 bg-slate-900 text-white shadow-xl hover:bg-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
        size="lg"
      >
        <Printer className="h-4 w-4" />
        Print PDF
      </Button>
    </div>
  );
}
