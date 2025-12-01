'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Github,
  Link as LinkIcon,
  Linkedin,
  Mail,
  Phone,
  Printer,
} from 'lucide-react';
import { differenceInMonths, format, parse } from 'date-fns';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import React from 'react';
import { ResumePaginator } from '@/components/resume/ResumePaginator';
import { cn } from '@/utils';
import { experiences } from '@/data/experiences';
import resumeData from '@/data/resume.json';

// ============================================================================
// Utility Functions
// ============================================================================

function getSkillColor(skill: string) {
  const skillMetadata = resumeData.skillMetadata as Record<
    string,
    { bg: string; text: string; border: string }
  >;
  return (
    skillMetadata[skill] || {
      bg: '#E2E8F0',
      text: '#475569',
      border: '#CBD5E1',
    }
  );
}

function parseDate(dateStr: string): Date {
  return parse(dateStr, 'MMM yyyy', new Date());
}

function calculateDuration(startDate: string, endDate: string): string {
  const start = parseDate(startDate);
  const end = parseDate(endDate);
  const months = differenceInMonths(end, start) + 1;

  if (months < 12) {
    return `${months} ${months === 1 ? 'month' : 'months'}`;
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (remainingMonths === 0) {
    return `${years} ${years === 1 ? 'year' : 'years'}`;
  }

  return `${years} ${years === 1 ? 'year' : 'years'} ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
}

function calculateProjectDuration(startDate: string, endDate: string): string {
  if (endDate === 'current') {
    const start = parseDate(startDate);
    const end = new Date();
    const months = differenceInMonths(end, start) + 1;

    if (months < 12) {
      return `${months} ${months === 1 ? 'month' : 'months'}`;
    }

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (remainingMonths === 0) {
      return `${years} ${years === 1 ? 'year' : 'years'}`;
    }

    return `${years} ${years === 1 ? 'year' : 'years'} ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
  }

  return calculateDuration(startDate, endDate);
}

function calculateTotalDuration(
  experiences: typeof resumeData.experience
): string {
  if (experiences.length === 0) return '';

  const sorted = [...experiences].sort((a, b) => {
    const dateA = parseDate(a.startDate);
    const dateB = parseDate(b.startDate);
    return dateA.getTime() - dateB.getTime();
  });

  const earliestStart = parseDate(sorted[0].startDate);
  const latestEnd = sorted.reduce((latest, exp) => {
    const end = parseDate(exp.endDate);
    return end > latest ? end : latest;
  }, parseDate(sorted[0].endDate));

  const startStr = format(earliestStart, 'MMM yyyy');
  const endStr = format(latestEnd, 'MMM yyyy');

  return calculateDuration(startStr, endStr);
}

// ============================================================================
// Component Helper Functions
// ============================================================================

function getCompanyLogo(companyName: string): string | undefined {
  const experience = experiences.find(
    exp =>
      exp.company === companyName ||
      exp.id ===
        companyName
          .toLowerCase()
          .replace(/\s+/g, '')
          .replace(/[^a-z0-9]/g, '')
  );
  return experience?.logo;
}

type Description = string | { type: 'ul' | 'ol'; items: Description[] };

function renderDescriptionItem(item: Description): React.ReactNode {
  if (typeof item === 'string') {
    return item;
  }

  const ListTag = item.type === 'ul' ? 'ul' : 'ol';
  const listStyle =
    item.type === 'ul'
      ? 'list-disc list-outside space-y-0.5 ml-6 pl-1'
      : 'list-decimal list-outside space-y-0.5 ml-6 pl-1';

  return (
    <ListTag className={`text-sm leading-relaxed text-slate-600 ${listStyle}`}>
      {item.items.map((nestedItem, index) => (
        <li key={index}>{renderDescriptionItem(nestedItem)}</li>
      ))}
    </ListTag>
  );
}

function renderDescription(description: Description): React.ReactNode {
  if (typeof description === 'string') {
    return (
      <p className="mb-1 text-sm leading-relaxed text-slate-600">
        {description}
      </p>
    );
  }

  const ListTag = description.type === 'ul' ? 'ul' : 'ol';
  const listStyle =
    description.type === 'ul'
      ? 'list-disc list-outside space-y-0.5 mb-3 ml-6 pl-1'
      : 'list-decimal list-outside space-y-0.5 mb-3 ml-6 pl-1';

  return (
    <ListTag className={`text-sm leading-relaxed text-slate-600 ${listStyle}`}>
      {description.items.map((item, index) => (
        <li key={index}>{renderDescriptionItem(item)}</li>
      ))}
    </ListTag>
  );
}

function renderContactLink(
  href: string,
  icon: React.ReactNode,
  label: string,
  isExternal = false
) {
  const className =
    'flex items-center gap-2 hover:text-slate-900 text-sm text-slate-500';
  const content = (
    <>
      <span>{label}</span>
      {icon}
    </>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <a href={href} className={className}>
      {content}
    </a>
  );
}

function renderSkillBadge(skill: string) {
  const colors = getSkillColor(skill);
  return (
    <Badge
      key={skill}
      variant="secondary"
      className="rounded-sm px-2 py-0.5 text-xs font-normal print:border"
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        borderColor: colors.border,
      }}
    >
      {skill}
    </Badge>
  );
}

function SectionHeader({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn('mt-6 mb-2 first:mt-0', className)}>
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="border-b-2 border-slate-900 pb-1.5 text-lg font-bold tracking-wide text-slate-900 uppercase">
          {title}
        </h2>
        {subtitle && (
          <>
            <div className="mx-2 h-px flex-1 bg-slate-300"></div>
            <span className="relative top-[3px] shrink-0 text-xs text-slate-400">
              {subtitle}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export default function ResumePage() {
  const { profile, about, experience, projects, education, skills } =
    resumeData;
  const totalDuration = calculateTotalDuration(experience);

  return (
    <div className="min-h-screen bg-gray-50 py-8 print:bg-white print:p-0">
      <PrintButton />

      <ResumePaginator>
        {/* Split Header Section */}
        <header className="mb-4 border-b border-slate-200 pb-4">
          <div className="flex flex-row items-start justify-between gap-4">
            {/* Left Side: Name & Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-light tracking-tight text-slate-900 uppercase">
                {profile.name}
              </h1>
              <p className="mt-1 text-lg font-medium text-slate-600">
                {profile.headline}
              </p>
              <div className="mt-1 flex items-center gap-3 text-sm text-slate-500">
                {profile.location && <span>{profile.location}</span>}
                {profile.birthday && profile.age && (
                  <span>
                    {profile.birthday} ({profile.age} years old)
                  </span>
                )}
              </div>
            </div>

            {/* Right Side: Contact */}
            <div className="flex flex-col items-end gap-1.5 text-sm">
              {profile.contact.email &&
                renderContactLink(
                  `mailto:${profile.contact.email}`,
                  <Mail className="h-4 w-4" />,
                  profile.contact.email
                )}
              {profile.contact.phone && (
                <div className="flex items-center gap-2 text-slate-500 hover:text-slate-900">
                  <span>{profile.contact.phone}</span>
                  <Phone className="h-4 w-4" />
                </div>
              )}
              {profile.contact.portfolio &&
                renderContactLink(
                  `https://${profile.contact.portfolio}`,
                  <LinkIcon className="h-4 w-4" />,
                  profile.contact.portfolio,
                  true
                )}
              {profile.contact.linkedin &&
                renderContactLink(
                  `https://${profile.contact.linkedin}`,
                  <Linkedin className="h-4 w-4" />,
                  profile.contact.linkedin,
                  true
                )}
              {profile.contact.github &&
                renderContactLink(
                  `https://${profile.contact.github}`,
                  <Github className="h-4 w-4" />,
                  profile.contact.github,
                  true
                )}
            </div>
          </div>
        </header>

        {/* About Section */}
        <section className="mb-4">
          <SectionHeader title="About" />
          <div className="space-y-2 text-sm leading-relaxed text-slate-700">
            {about.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <SectionHeader title="Experience" subtitle={totalDuration} />

        {experience.map((exp, index) => (
          <div
            key={exp.id}
            className={`break-inside-avoid ${index > 0 ? 'mt-4 border-t border-slate-200 pt-3' : 'mb-3'}`}
          >
            <div className="mb-1 flex items-baseline justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6 shrink-0 rounded">
                  <AvatarImage
                    src={getCompanyLogo(exp.company)}
                    alt={`${exp.company} logo`}
                  />
                  <AvatarFallback>
                    <img
                      src="/fallback.jpg"
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {exp.company}
                  </h3>
                  <span className="text-xs text-slate-400">{exp.location}</span>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-slate-500">
                  {exp.startDate} – {exp.endDate}
                </span>
                <span className="text-xs text-slate-400">
                  {calculateDuration(exp.startDate, exp.endDate)}
                </span>
              </div>
            </div>
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-slate-700 italic">
                {exp.title}
              </span>
              {exp.skills && (
                <div className="flex flex-wrap gap-1.5">
                  {exp.skills.map(renderSkillBadge)}
                </div>
              )}
            </div>
            <div className="mb-1">
              {renderDescription(exp.description as Description)}
            </div>
            {exp.reference && (
              <div className="text-xs text-slate-500">
                Reference: {exp.reference.name}, {exp.reference.title} •{' '}
                {exp.reference.phone}
              </div>
            )}
          </div>
        ))}

        {/* Projects Section */}
        <SectionHeader title="Projects" />

        {projects.map(project => (
          <div key={project.title} className="mb-4 break-inside-avoid">
            <div className="mb-2 flex items-baseline justify-between">
              <div className="flex flex-wrap items-baseline gap-3">
                <h3 className="text-base font-semibold text-slate-900">
                  {project.title}
                </h3>
                {project.url && (
                  <a
                    href={`https://${project.url}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-slate-500 hover:text-slate-900 hover:underline"
                  >
                    {project.url}
                  </a>
                )}
                {project.skills && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.skills.map(renderSkillBadge)}
                  </div>
                )}
              </div>
              {'startDate' in project &&
                project.startDate &&
                'endDate' in project &&
                project.endDate && (
                  <span className="text-sm text-slate-500">
                    {project.startDate} –{' '}
                    {project.endDate === 'current'
                      ? 'ongoing'
                      : project.endDate}
                  </span>
                )}
            </div>
            <div className="mb-2">
              {renderDescription(project.description as Description)}
            </div>
          </div>
        ))}

        {/* Skills Section */}
        <section className="mb-6 break-inside-avoid">
          <SectionHeader title="Skills" />
          <div className="grid grid-cols-1 gap-y-3 text-sm sm:grid-cols-[100px_1fr] sm:gap-x-2">
            {Object.entries(skills).map(([category, categorySkills]) => (
              <React.Fragment key={category}>
                <div className="font-semibold text-slate-900">{category}</div>
                <div className="flex flex-wrap gap-1.5">
                  {categorySkills.map(renderSkillBadge)}
                </div>
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <SectionHeader title="Education" />

        {education.map(edu => (
          <div key={edu.id} className="break-inside-avoid">
            <div className="flex items-baseline justify-between">
              <h3 className="text-base font-semibold text-slate-900">
                {edu.institution}
              </h3>
              <span className="text-sm text-slate-500">
                {edu.startYear} – {edu.endYear}
              </span>
            </div>
            <div className="mt-1 text-sm text-slate-600">{edu.program}</div>
            {edu.description && (
              <div className="mt-1 text-sm text-slate-500">
                {edu.description}
              </div>
            )}
            {edu.grade && (
              <div className="mt-1 text-xs text-slate-400">
                CGPA: {edu.grade}
              </div>
            )}
          </div>
        ))}
      </ResumePaginator>
    </div>
  );
}

// ============================================================================
// Sub-components
// ============================================================================

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
