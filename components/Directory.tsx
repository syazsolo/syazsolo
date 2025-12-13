'use client';

import { ArrowRight } from 'lucide-react';
import { Fragment } from 'react';
import Section from '@/components/Section';
import { animate } from 'framer-motion';

const DIRECTORY_ITEMS = [
  [
    { label: 'Posts', id: 'posts' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Education', id: 'education' },
  ],
  [{ label: 'Design Patterns', id: 'design-patterns' }],
];

export default function Directory() {
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (!element) {
      return;
    }

    // Get the scroll-margin-top defined in CSS (responsive)
    const style = window.getComputedStyle(element);
    const scrollMarginTop = parseInt(style.scrollMarginTop) || 0;

    // Calculate target position using the CSS-defined margin
    const targetY =
      element.getBoundingClientRect().top + window.scrollY - scrollMarginTop;

    // Custom smooth scroll using Framer Motion
    animate(window.scrollY, targetY, {
      duration: 0.8,
      ease: [0.32, 0.72, 0, 1], // Custom easing
      onUpdate: latest => window.scrollTo(0, latest),
    });
  };

  return (
    <Section title="Directory" className="pb-3">
      <div className="flex flex-col gap-3">
        {DIRECTORY_ITEMS.map((group, groupIndex) => (
          <Fragment key={groupIndex}>
            <div className="flex flex-wrap gap-2">
              {group.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={e => handleScroll(e, item.id)}
                  className="group hover:bg-muted bg-card hover:border-foreground/20 border-border flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-sm font-medium transition-all"
                >
                  <span className="text-foreground/80 group-hover:text-foreground">
                    {item.label}
                  </span>
                  <ArrowRight className="text-muted-foreground/60 group-hover:text-foreground h-4 w-4 transition-colors" />
                </a>
              ))}
            </div>
            {groupIndex < DIRECTORY_ITEMS.length - 1 && (
              <div className="flex items-center">
                <div className="border-border flex-1 border-t" />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </Section>
  );
}
