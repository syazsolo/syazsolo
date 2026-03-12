'use client';

import { A4Paginator } from '@/components/ui/A4Paginator';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import React from 'react';
import coverLetterData from '@/data/job-hunt/v2/cover-letter.json';

const HIGHLIGHTS = [
  'highly engaged, architecturally opinionated developer',
  '188 sessions in just one month',
  'comfortable letting Claude do heavy multi-file refactors',
  'planning first, then executing',
  'willingness to course-correct Claude aggressively',
  'strong design sensibility, driving UX decisions',
  'you hold Claude to a high standard',
  'architecturally hands-on developer',
  'but actively intervenes and redirects',
];

function HighlightedText({ text }: { text: string }) {
  const pattern = HIGHLIGHTS.map(h =>
    h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  ).join('|');
  const regex = new RegExp(`(${pattern})`, 'g');
  const parts = text.split(regex);
  const highlightSet = new Set(HIGHLIGHTS);

  return (
    <>
      {parts.map((part, i) =>
        highlightSet.has(part) ? (
          <mark
            key={i}
            style={{
              background: 'linear-gradient(#fef08a, #fef08a) bottom / 100% 60% no-repeat',
              backgroundColor: 'transparent',
            }}
            className="rounded-sm font-medium text-slate-900"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

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
          <p className="mt-1 text-sm text-slate-500">Cover Letter</p>
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
          <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
            <span
              className="inline-block h-3 w-5 rounded-sm"
              style={{
                background: 'linear-gradient(#fef08a, #fef08a) bottom / 100% 60% no-repeat',
                backgroundColor: 'transparent',
              }}
              aria-hidden="true"
            />
            Key signals highlighted for easier scanning.
          </p>
        </div>

        <section className="mb-6">
          <h2 className="mb-3 text-sm font-bold tracking-wide text-slate-400 uppercase">
            How You Use Claude Code
          </h2>
          <div className="space-y-4">
            {how_you_use_claude_code.map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed text-slate-700">
                <HighlightedText text={paragraph} />
              </p>
            ))}
          </div>
        </section>

        <div className="mb-8 border-l-2 border-slate-300 pl-4">
          <p className="text-sm leading-relaxed font-medium text-slate-800 italic">
            <HighlightedText text={key_pattern} />
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
