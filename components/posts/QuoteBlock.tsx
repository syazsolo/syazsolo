import type { HTMLAttributes } from 'react';

interface QuoteBlockProps extends HTMLAttributes<HTMLDivElement> {
  quote?: string | null;
  source?: string | null;
  variant?: 'default' | 'compact';
}

export const QuoteBlock = ({
  quote,
  source,
  variant = 'default',
  className = '',
  ...rest
}: QuoteBlockProps) => {
  if (!quote && !source) {
    return null;
  }

  const isCompact = variant === 'compact';

  return (
    <figure
      className={`
        my-12 relative group
        ${className}
      `.trim()}
      {...rest}
    >
      <div className="relative">
        <div
          className={`
            absolute left-0 top-0 bottom-0
            ${isCompact ? 'w-1' : 'w-1.5'}
            bg-linear-to-b from-primary/60 via-primary to-primary/40
            rounded-full
            group-hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)]
            transition-all duration-500
          `}
        />

        <div
          className={`
            ${isCompact ? 'pl-8 pr-4 py-6' : 'pl-12 pr-6 py-8'}
            relative
          `}
        >
          <svg
            className={`
              absolute left-6 top-4
              ${isCompact ? 'w-8 h-8' : 'w-12 h-12'}
              text-primary/10
              group-hover:text-primary/20
              transition-colors duration-300
            `}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>

          {quote && (
            <blockquote
              className={`
                relative
                ${isCompact ? 'text-lg leading-relaxed' : 'text-xl leading-relaxed'}
                font-serif italic
                text-foreground/90
                group-hover:text-foreground
                transition-colors duration-300
                whitespace-pre-line
              `}
            >
              {quote}
            </blockquote>
          )}

          {source && (
            <figcaption
              className={`
                ${isCompact ? 'mt-4 text-sm' : 'mt-6 text-base'}
                font-medium
                text-muted-foreground
                group-hover:text-foreground/70
                transition-colors duration-300
                tracking-wider
                uppercase
                text-xs
                letter-spacing-wide
              `}
            >
              <span className="inline-block mr-2 text-primary/60">—</span>
              {source}
            </figcaption>
          )}
        </div>

        <div
          className={`
            absolute inset-0
            bg-linear-to-r from-primary/2 to-transparent
            rounded-r-lg
            opacity-0 group-hover:opacity-100
            transition-opacity duration-500
            pointer-events-none
          `}
        />
      </div>
    </figure>
  );
};

QuoteBlock.displayName = 'QuoteBlock';
