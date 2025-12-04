'use client';

import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Section from '@/components/Section';
import { SeeMoreButton } from '@/components/ui/SeeMoreButton';
import experiencesData from '@/data/experiences.json';
import skillMetadata from '@/data/skillMetadata.json';
import { useState } from 'react';

interface Experience {
  id: string;
  company: string;
  title: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  duration: string;
  location?: string;
  description?: {
    type: 'ul' | 'ol';
    items: string[];
  };
  skills?: string[];
  logo?: string;
}

const experiences: Experience[] = experiencesData;

const FALLBACK_LOGO = '/fallback.jpg';

function getSkillColor(skill: string) {
  const metadata = skillMetadata as Record<
    string,
    { bg: string; text: string; border: string }
  >;
  return (
    metadata[skill] || {
      bg: '#E2E8F0',
      text: '#475569',
      border: '#CBD5E1',
    }
  );
}

export default function Experience() {
  return (
    <Section title="Experience">
      <div className="divide-border -mt-2 flex flex-col divide-y">
        {experiences.map(experience => (
          <ExperienceItem key={experience.id} experience={experience} />
        ))}
      </div>
    </Section>
  );
}

const ExperienceItem = ({ experience }: { experience: Experience }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="-mx-3 flex w-full gap-3 p-3 text-left">
      <div className="shrink-0">
        <div className="bg-muted flex h-12 w-12 items-center justify-center overflow-hidden">
          <Image
            src={experience.logo ?? FALLBACK_LOGO}
            alt={`${experience.company} logo`}
            width={48}
            height={48}
            className="object-cover"
            onError={e => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              if (target.parentElement) {
                target.parentElement.innerHTML = `<span class="text-lg font-semibold text-muted-foreground">${experience.company.charAt(0)}</span>`;
              }
            }}
          />
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="text-foreground text-[15px] font-semibold">
              {experience.title}
            </h3>
            <p className="text-foreground/80 text-[14px]">
              {experience.company} · {experience.employmentType}
            </p>
            <p className="text-muted-foreground text-[13px]">
              {experience.startDate} - {experience.endDate} ·{' '}
              {experience.duration}
            </p>
            {experience.location && (
              <p className="text-muted-foreground text-[13px]">
                {experience.location}
              </p>
            )}
          </div>
          {experience.skills && experience.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:justify-end">
              {experience.skills.map(skill => {
                const colors = getSkillColor(skill);
                return (
                  <Badge
                    key={skill}
                    className="border text-[12px] font-normal"
                    style={{
                      backgroundColor: colors.bg,
                      color: colors.text,
                      borderColor: colors.border,
                    }}
                  >
                    {skill}
                  </Badge>
                );
              })}
            </div>
          )}
        </div>
        {experience.description && (
          <>
            {expanded && (
              <ul className="text-foreground/90 mt-3 ml-5 list-outside list-disc space-y-1.5 pl-1 text-[14px] leading-relaxed">
                {experience.description.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
            <div className="mt-3">
              <SeeMoreButton
                onClick={() => setExpanded(!expanded)}
                expanded={expanded}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
