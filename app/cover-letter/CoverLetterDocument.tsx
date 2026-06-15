'use client';

import { Printer } from 'lucide-react';

import { A4Paginator } from '@/components/ui/A4Paginator';
import { Button } from '@/components/ui/button';
import coverLetterData from '@/data/job-hunt/v4/cover-letter.json';

const HIGHLIGHTS = coverLetterData.highlights;

function HighlightedText({ text }: { text: string }) {
  const pattern = HIGHLIGHTS.map(highlight =>
    highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  ).join('|');
  const regex = new RegExp(`(${pattern})`, 'g');
  const parts = text.split(regex);
  const highlightSet = new Set(HIGHLIGHTS);

  return (
    <>
      {parts.map((part, index) =>
        highlightSet.has(part) ? (
          <mark
            key={index}
            className="cover-letter-highlight text-neutral-950"
          >
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
}

export default function CoverLetterDocument() {
  const { header, salutation, paragraphs, projects } = coverLetterData;

  return (
    <div className="min-h-screen bg-stone-50 py-8 print:bg-white print:p-0">
      <style>{`
        .cover-letter-highlight {
          background: linear-gradient(
            transparent 30%,
            rgba(255, 190, 82, 0.48) 30%,
            rgba(255, 190, 82, 0.48) 92%,
            transparent 92%
          );
          background-color: transparent;
          box-decoration-break: clone;
          -webkit-box-decoration-break: clone;
          print-color-adjust: exact;
          -webkit-print-color-adjust: exact;
        }

        @media print {
          .resume-page-content { padding: 12mm !important; }
          .cover-letter-highlight {
            background: #ffd88a !important;
            box-decoration-break: clone;
            -webkit-box-decoration-break: clone;
            box-shadow: 0 0 0 1px #ffd88a, inset 0 -0.62em 0 #ffd88a;
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>

      <PrintButton />

      <A4Paginator paddingMM={12}>
        <header className="mb-7">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-[25px] font-semibold text-neutral-950 uppercase">
                {header.name}
              </h1>
              <p className="mt-1 text-[13px] text-neutral-500">
                {header.title}
              </p>
            </div>

            <div className="text-right text-[12px] leading-relaxed text-neutral-600">
              <a href={`mailto:${header.email}`} className="block">
                {header.email}
              </a>
              <p>{header.phone}</p>
              <a
                href={`https://${header.portfolio}`}
                target="_blank"
                rel="noreferrer"
                className="block"
              >
                {header.portfolio}
              </a>
            </div>
          </div>
          <div className="mt-4 h-px w-full bg-neutral-200" />
        </header>

        <main className="max-w-[172mm]">
          <LetterParagraph text={salutation} className="mb-5" />

          <LetterParagraph text={paragraphs.opening} />
          <LetterParagraph text={paragraphs.reputation} />
          <LetterParagraph text={paragraphs.unemployed} />

          <ul className="my-5 list-disc space-y-1.5 pl-5">
            {projects.map(project => (
              <li
                key={project.name}
                className="text-[12.8px] leading-relaxed text-neutral-700"
              >
                <span className="font-semibold text-neutral-950">
                  {project.name}
                </span>
                {' - '}
                {project.description}
              </li>
            ))}
          </ul>

          <LetterParagraph text={paragraphs.reading} />
          <LetterParagraph text={paragraphs.energy} />
          <LetterParagraph text={paragraphs.assessment} />
          <LetterParagraph text={paragraphs.closing} />
          <p className="text-[13.5px] leading-relaxed text-neutral-800">
            {paragraphs.thanks}
          </p>
        </main>
      </A4Paginator>
    </div>
  );
}

function LetterParagraph({
  text,
  className = 'mb-4',
}: {
  text: string;
  className?: string;
}) {
  return (
    <p className={`${className} text-[13.5px] leading-[1.66] text-neutral-800`}>
      <HighlightedText text={text} />
    </p>
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
