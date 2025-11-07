'use client';

import { Experience as ExperienceType, experiences } from '@/data/experiences';

import Image from 'next/image';
import Section from '@/components/Section';

const FALLBACK_LOGO = '/companies/fallback.jpg';

export default function Experience() {
  return (
    <Section title="Experience">
      <div className="flex flex-col -mt-2 divide-y divide-border">
        {experiences.map(experience => (
          <ExperienceItem key={experience.id} experience={experience} />
        ))}
      </div>
    </Section>
  );
}

const ExperienceItem = ({ experience }: { experience: ExperienceType }) => {
  return (
    <div className="flex gap-3 p-3 -mx-3 text-left w-full">
      <div className="shrink-0">
        <div className="w-12 h-12 bg-muted overflow-hidden flex items-center justify-center">
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
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-[15px] text-foreground">
          {experience.title}
        </h3>
        <p className="text-[14px] text-foreground/80">
          {experience.company} · {experience.employmentType}
        </p>
        <p className="text-[13px] text-muted-foreground">
          {experience.startDate} - {experience.endDate} · {experience.duration}
        </p>
        {experience.location && (
          <p className="text-[13px] text-muted-foreground">
            {experience.location}
          </p>
        )}
      </div>
    </div>
  );
};
