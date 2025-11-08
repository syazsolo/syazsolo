'use client';

import { useState } from 'react';

import Image from 'next/image';

import Section from '@/components/Section';
import { educationHistory } from '@/data/education';
import type { Education } from '@/data/education';

const FALLBACK_LOGO = '/fallback.jpg';

const EducationItem = ({ item }: { item: Education }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="flex gap-3 p-3 -mx-3 text-left w-full">
      <div className="shrink-0">
        <div className="w-12 h-12 bg-muted overflow-hidden flex items-center justify-center">
          {hasError ? (
            <span className="text-lg font-semibold text-muted-foreground">
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
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-[15px] text-foreground">
          {item.institution}
        </h3>
        <p className="text-[14px] text-foreground/80">{item.program}</p>
        <p className="text-[13px] text-muted-foreground">
          {item.startYear} - {item.endYear}
        </p>
        {item.grade && (
          <p className="text-[13px] text-muted-foreground">
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
      <div className="flex flex-col -mt-2 divide-y divide-border">
        {educationHistory.map(item => (
          <EducationItem key={item.id} item={item} />
        ))}
      </div>
    </Section>
  );
};

export default Education;
