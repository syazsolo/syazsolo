'use client';

import { A4Paginator } from '@/components/ui/A4Paginator';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import coverLetterData from '@/data/job-hunt/v3/cover-letter.json';

const HIGHLIGHTS = coverLetterData.highlights;

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
              background:
                'linear-gradient(#fef08a, #fef08a) bottom / 100% 60% no-repeat',
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
  const { meta, how_you_use_claude_code, key_pattern, conclusion, regards } =
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
            On {meta.date}, {meta.model} ran the{' '}
            <code className="rounded bg-slate-200 px-1.5 py-0.5 text-xs font-medium text-slate-800">
              {meta.command}
            </code>{' '}
            command at {meta.effort} effort
            {meta.command_description && ` — ${meta.command_description} — `}
            for{' '}
            <a
              href={meta.project_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-700"
            >
              {meta.project}
            </a>
            , a project of mine:
          </p>
        </div>

        <section className="mb-6 rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="mb-3 text-xs font-bold tracking-wide text-slate-400 uppercase">
            How You Use Claude Code
          </h2>
          <div className="space-y-3">
            {how_you_use_claude_code.map((paragraph, i) => (
              <p
                key={i}
                className="text-[12.5px] leading-relaxed text-slate-600"
              >
                <HighlightedText text={paragraph} />
              </p>
            ))}
          </div>

          <div className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3">
            <p className="text-sm leading-relaxed font-medium text-emerald-900">
              <span className="font-semibold">Key pattern: </span>
              <HighlightedText text={key_pattern} />
            </p>
          </div>
        </section>

        {conclusion && (
          <p className="mb-6 text-sm leading-relaxed text-slate-700">
            {conclusion}
          </p>
        )}

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
