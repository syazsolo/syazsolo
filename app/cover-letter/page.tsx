'use client';

import { Printer } from 'lucide-react';

import { A4Paginator } from '@/components/ui/A4Paginator';
import { Button } from '@/components/ui/button';
import React from 'react';
import coverLetterData from '@/data/job-hunt/v2/cover-letter.json';

export default function CoverLetterPage() {
  const { meta, how_you_use_claude_code, key_pattern, regards } =
    coverLetterData;

  return (
    <div className="min-h-screen bg-gray-50 py-8 print:bg-white print:p-0">
      <style>{`
        @media print {
          .resume-page-content { padding: 10mm !important; }
        }
      `}</style>

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

      <A4Paginator paddingMM={12}>
        <header className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Syazani Zulkhairi
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Cover Letter
          </p>
        </header>

        <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 px-5 py-4">
          <p className="text-sm leading-relaxed text-slate-700">
            On {meta.date}, using {meta.model} at {meta.effort} effort, the{' '}
            <code className="rounded bg-slate-200 px-1.5 py-0.5 text-xs font-medium text-slate-800">
              {meta.command}
            </code>{' '}
            command produced the following output for{' '}
            <span className="font-medium">{meta.project}</span>:
          </p>
        </div>

        <section className="mb-6">
          <h2 className="mb-3 text-sm font-bold tracking-wide text-slate-400 uppercase">
            How You Use Claude Code
          </h2>
          <div className="space-y-4">
            {how_you_use_claude_code.map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed text-slate-700">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <div className="mb-8 border-l-2 border-slate-300 pl-4">
          <p className="text-sm font-medium leading-relaxed text-slate-800 italic">
            {key_pattern}
          </p>
        </div>

        <div className="space-y-0.5">
          {regards.map((line, i) => (
            <p key={i} className="text-sm text-slate-700">
              {line}
            </p>
          ))}
        </div>
      </A4Paginator>
    </div>
  );
}
