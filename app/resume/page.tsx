'use client';

import { Printer } from 'lucide-react';

import { A4Paginator } from '@/components/ui/A4Paginator';
import { Button } from '@/components/ui/button';
import resumeData from '@/data/job-hunt/v4/resume.json';

type Experience = (typeof resumeData.experience)[number];
type ResumeProject = (typeof resumeData.projects)[number];

export default function ResumePage() {
  const { header, one_liner, experience, projects, skills, education } =
    resumeData;

  return (
    <div className="min-h-screen bg-gray-50 py-8 print:bg-white print:p-0">
      <style>{`
        @media print {
          .resume-page-content { padding: 8mm !important; }
        }
      `}</style>
      <PrintButton />

      <A4Paginator paddingMM={10}>
        <header className="mb-3 border-b-2 border-slate-900 pb-3">
          <h1 className="text-[26px] font-bold tracking-tight text-slate-900 uppercase">
            {header.name}
          </h1>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-slate-600">
            <span>{header.title}</span>
            <Separator />
            <span>{header.location}</span>
            <Separator />
            <a href={`mailto:${header.email}`} className="hover:text-slate-900">
              {header.email}
            </a>
            <Separator />
            <span>{header.phone}</span>
            <Separator />
            <ExternalLink href={`https://${header.portfolio}`}>
              {header.portfolio}
            </ExternalLink>
            <Separator />
            <ExternalLink href={`https://${header.github}`}>
              {header.github}
            </ExternalLink>
            <Separator />
            <ExternalLink href={`https://${header.linkedin}`}>
              {header.linkedin}
            </ExternalLink>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 italic">
            {one_liner}
          </p>
        </header>

        <section className="mb-4">
          <SectionHeader title="Experience" />
          <div className="space-y-3">
            {experience.map(item => (
              <ExperienceItem key={item.company} experience={item} />
            ))}
          </div>
        </section>

        <section className="mb-4">
          <SectionHeader title="Projects" />
          <div className="space-y-3">
            {projects.map(project => (
              <ProjectItem key={project.name} project={project} />
            ))}
          </div>
        </section>

        <section className="mb-4 break-inside-avoid">
          <SectionHeader title="Skills" />
          <div className="space-y-1 text-sm">
            <SkillRow
              groups={[
                ['Backend', skills.Backend],
                ['Database', skills.Database],
              ]}
            />
            <SkillRow
              groups={[
                ['Frontend', skills.Frontend],
                ['Tools', skills.Tools],
              ]}
            />
          </div>
        </section>

        <section className="break-inside-avoid">
          <SectionHeader title="Education" />
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-bold text-slate-900">
              {education.institution}
            </span>
            <span className="text-xs text-slate-500">{education.years}</span>
          </div>
          <p className="text-sm text-slate-600">
            {education.program} &middot; {education.grade} &middot;{' '}
            {education.note}
          </p>
        </section>
      </A4Paginator>
    </div>
  );
}

function ExperienceItem({ experience }: { experience: Experience }) {
  return (
    <div className="break-inside-avoid">
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-bold text-slate-900">
            {experience.company}
          </span>
          <span className="text-xs text-slate-400">{experience.location}</span>
        </div>
        <span className="shrink-0 text-xs text-slate-500 tabular-nums">
          {experience.period}
        </span>
      </div>
      <p className="mb-1 text-xs font-medium text-slate-500 italic">
        {experience.title}
      </p>
      <BulletList bullets={experience.bullets} />
    </div>
  );
}

function ProjectItem({ project }: { project: ResumeProject }) {
  return (
    <div className="break-inside-avoid">
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-sm">
          <span className="font-bold text-slate-900">{project.name}</span>
          {project.url ? (
            <ExternalLink
              href={project.url}
              className="text-xs text-slate-400 hover:text-slate-700 hover:underline"
            >
              {project.url}
            </ExternalLink>
          ) : null}
          {'stack' in project ? (
            <>
              <span className="text-xs text-slate-400">&middot;</span>
              <span className="text-xs text-slate-500">{project.stack}</span>
            </>
          ) : null}
        </div>
        {'period' in project ? (
          <span className="shrink-0 text-xs text-slate-500 tabular-nums">
            {project.period}
          </span>
        ) : null}
      </div>
      <ProjectBullets bullets={project.bullets} />
    </div>
  );
}

function ProjectBullets({ bullets }: { bullets: string[] }) {
  if (bullets.length === 1) {
    return (
      <p className="mt-1 text-sm leading-relaxed text-slate-700">
        {bullets[0]}
      </p>
    );
  }

  return <BulletList bullets={bullets} className="mt-1" />;
}

function BulletList({
  bullets,
  className = '',
}: {
  bullets: string[];
  className?: string;
}) {
  return (
    <ul className={`ml-4 list-outside list-disc space-y-0.5 ${className}`}>
      {bullets.map((bullet, index) => (
        <li key={index} className="text-sm leading-relaxed text-slate-700">
          {bullet}
        </li>
      ))}
    </ul>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="mb-1.5 border-b border-slate-200 pb-0.5 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
      {title}
    </h2>
  );
}

function SkillRow({ groups }: { groups: [string, string[]][] }) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-0.5">
      {groups.map(([category, items]) => (
        <span key={category} className="text-slate-600">
          <span className="font-semibold text-slate-800">{category}</span>
          {': '}
          {items.join(', ')}
        </span>
      ))}
    </div>
  );
}

function ExternalLink({
  href,
  children,
  className = 'hover:text-slate-900',
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  );
}

function Separator() {
  return <span className="text-slate-300">|</span>;
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
