'use client';

import Section from '@/components/Section';
import { aboutContent } from '@/data/about';
import { useState } from 'react';

const About = () => {
  const [expanded, setExpanded] = useState(false);
  const collapsedItemCount = 2;

  const shouldCollapse = aboutContent.length > collapsedItemCount;
  const hasHiddenItems = shouldCollapse && !expanded;

  const itemsToRender =
    shouldCollapse && !expanded
      ? aboutContent.slice(0, collapsedItemCount)
      : aboutContent;

  const lastItem = itemsToRender[itemsToRender.length - 1];
  const canInlineToggle = typeof lastItem === 'string';

  return (
    <Section title="About" className="flex flex-col gap-3">
      {itemsToRender.map((item, index) => {
        const isLastVisibleItem = index === itemsToRender.length - 1;
        const showInlineToggle =
          hasHiddenItems && isLastVisibleItem && canInlineToggle;

        if (typeof item === 'string') {
          return (
            <p key={index} className="text-foreground text-[14px] leading-6">
              {item}
              {showInlineToggle && (
                <>
                  {' '}
                  <button
                    type="button"
                    onClick={() => setExpanded(true)}
                    className="text-muted-foreground hover:text-foreground inline-flex items-center text-[14px] leading-6"
                    aria-expanded={expanded}
                  >
                    ... see more
                  </button>
                </>
              )}
            </p>
          );
        }

        if (Array.isArray(item)) {
          return (
            <ul key={index} className="list-disc pl-4">
              {item.map(listItem => (
                <li
                  key={listItem.title}
                  className="text-foreground text-[14px] leading-6"
                >
                  <span className="font-medium">{listItem.title}</span> –{' '}
                  {listItem.description}
                </li>
              ))}
            </ul>
          );
        }
        return null;
      })}

      {hasHiddenItems && !canInlineToggle && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="text-muted-foreground hover:text-foreground text-left text-[14px] leading-6"
          aria-expanded={expanded}
        >
          ... see more
        </button>
      )}
    </Section>
  );
};

export default About;
