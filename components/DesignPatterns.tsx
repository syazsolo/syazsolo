'use client';

import Section from '@/components/Section';
import { cn } from '@/utils';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import patternsData from '@/data/designPatterns.json';

interface Pattern {
  name: string;
  lastStudied: string | null;
}

interface Category {
  category: string;
  patterns: Pattern[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const DesignPatterns = ({ id }: { id?: string }) => {
  const categories: Category[] = patternsData;

  return (
    <Section id={id} title="Design Patterns" className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-foreground/80 max-w-lg text-sm leading-relaxed">
          A commitment device for my technical growth. I’ve made this tracker
          public to ensure I stay disciplined in revisiting and internalizing
          the classic design patterns.
        </p>

        <div className="bg-muted/30 flex shrink-0 items-center gap-3 rounded-lg border px-3 py-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-green-500"></span>
            <span className="text-muted-foreground">Last studied</span>
          </div>
          <div className="bg-border h-3 w-px"></div>
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-zinc-300 dark:bg-zinc-600"></span>
            <span className="text-muted-foreground">To study</span>
          </div>
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(category => (
          <div key={category.category} className="space-y-3">
            <h3 className="text-foreground border-border border-b pb-1 text-sm font-medium">
              {category.category}
            </h3>
            <motion.ul
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-50px' }}
              className="space-y-2"
            >
              {category.patterns.map(pattern => (
                <motion.li
                  key={pattern.name}
                  variants={item}
                  className="group flex items-center justify-between text-sm"
                >
                  <span className="text-foreground/70 group-hover:text-foreground transition-colors">
                    {pattern.name}
                  </span>
                  <span
                    className={cn(
                      'rounded px-1.5 py-0.5 text-[10px] font-medium tracking-wider uppercase',
                      pattern.lastStudied
                        ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {pattern.lastStudied
                      ? format(new Date(pattern.lastStudied), 'MMM d, yyyy')
                      : 'Not yet'}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default DesignPatterns;
