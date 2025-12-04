'use client';

import Image from 'next/image';
import Section from '@/components/Section';
import educationData from '@/data/education.json';
import { useState } from 'react';

interface Education {
  id: string;
  institution: string;
  program: string;
  startYear: string;
  endYear: string;
  grade?: string;
  description?: string;
  logo?: string;
}

const educationHistory: Education[] = educationData;

const FALLBACK_LOGO = '/fallback.jpg';

const EducationItem = ({ item }: { item: Education }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="-mx-3 flex w-full gap-3 p-3 text-left">
      <div className="shrink-0">
        <div className="bg-muted flex h-12 w-12 items-center justify-center overflow-hidden">
          {hasError ? (
            <span className="text-muted-foreground text-lg font-semibold">
              {item.institution.charAt(0)}
            </span>
          ) : (
            <Image
              src={item.logo ?? FALLBACK_LOGO}
              alt={`${item.institution} logo`}
              width={48}
              height={48}
              className="object-cover"
              onError={() => setHasError(true)}
            />
          )}
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-foreground text-[15px] font-semibold">
          {item.institution}
        </h3>
        <p className="text-foreground/80 text-[14px]">{item.program}</p>
        <p className="text-muted-foreground text-[13px]">
          {item.startYear} - {item.endYear}
        </p>
        {item.grade && (
          <p className="text-muted-foreground text-[13px]">
            Grade: {item.grade}
          </p>
        )}
      </div>
    </div>
  );
};

const Education = () => {
  return (
    <Section title="Education">
      <div className="divide-border -mt-2 flex flex-col divide-y">
        {educationHistory.map(item => (
          <EducationItem key={item.id} item={item} />
        ))}
      </div>
    </Section>
  );
};

export default Education;
