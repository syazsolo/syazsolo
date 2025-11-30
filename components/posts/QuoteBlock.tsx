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
    <figure className={`group relative my-12 ${className} `.trim()} {...rest}>
      <div className="relative">
        <div
          className={`absolute top-0 bottom-0 left-0 ${isCompact ? 'w-1' : 'w-1.5'} from-primary/60 via-primary to-primary/40 rounded-full bg-linear-to-b transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)]`}
        />

        <div
          className={` ${isCompact ? 'py-6 pr-4 pl-8' : 'py-8 pr-6 pl-12'} relative`}
        >
          <svg
            className={`absolute top-4 left-6 ${isCompact ? 'h-8 w-8' : 'h-12 w-12'} text-primary/10 group-hover:text-primary/20 transition-colors duration-300`}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>

          {quote && (
            <blockquote
              className={`relative ${isCompact ? 'text-lg leading-relaxed' : 'text-xl leading-relaxed'} text-foreground/90 group-hover:text-foreground font-serif whitespace-pre-line italic transition-colors duration-300`}
            >
              {quote}
            </blockquote>
          )}

          {source && (
            <figcaption
              className={` ${isCompact ? 'mt-4 text-sm' : 'mt-6 text-base'} text-muted-foreground group-hover:text-foreground/70 letter-spacing-wide text-xs font-medium tracking-wider uppercase transition-colors duration-300`}
            >
              <span className="text-primary/60 mr-2 inline-block">—</span>
              {source}
            </figcaption>
          )}
        </div>

        <div
          className={`from-primary/2 pointer-events-none absolute inset-0 rounded-r-lg bg-linear-to-r to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
        />
      </div>
    </figure>
  );
};

QuoteBlock.displayName = 'QuoteBlock';
