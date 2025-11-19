'use client';

import { Experience as ExperienceType, experiences } from '@/data/experiences';

import Image from 'next/image';
import Section from '@/components/Section';

const FALLBACK_LOGO = '/fallback.jpg';

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

const ExperienceItem = ({ experience }: { experience: ExperienceType }) => {
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
        <h3 className="text-foreground text-[15px] font-semibold">
          {experience.title}
        </h3>
        <p className="text-foreground/80 text-[14px]">
          {experience.company} · {experience.employmentType}
        </p>
        <p className="text-muted-foreground text-[13px]">
          {experience.startDate} - {experience.endDate} · {experience.duration}
        </p>
        {experience.location && (
          <p className="text-muted-foreground text-[13px]">
            {experience.location}
          </p>
        )}
      </div>
    </div>
  );
};
