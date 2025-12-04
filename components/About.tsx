'use client';

import Section from '@/components/Section';
import { SeeMoreButton } from '@/components/ui/SeeMoreButton';
import aboutContentData from '@/data/about.json';
import { useState } from 'react';

const aboutContent: (
  | string
  | { title: string; description: string }[]
)[] = aboutContentData;

const About = () => {
  const [expanded, setExpanded] = useState(false);
  const collapsedItemCount = 2;

  const shouldCollapse = aboutContent.length > collapsedItemCount;

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
          shouldCollapse && isLastVisibleItem && canInlineToggle;

        if (typeof item === 'string') {
          return (
            <p key={index} className="text-foreground text-[14px] leading-6">
              {item}
              {showInlineToggle && !expanded && (
                <>
                  {' '}
                  <SeeMoreButton
                    onClick={() => setExpanded(!expanded)}
                    expanded={expanded}
                    className="inline-flex items-center"
                    collapsible={false}
                  />
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

      {shouldCollapse && !canInlineToggle && !expanded && (
        <SeeMoreButton
          onClick={() => setExpanded(!expanded)}
          expanded={expanded}
          className="text-left"
          collapsible={false}
        />
      )}
    </Section>
  );
};

export default About;
