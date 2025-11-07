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
    <figure className={`my-8 relative ${className}`.trim()} {...rest}>
      <div
        className={`
        relative
        ${isCompact ? 'px-8 py-6' : 'px-12 py-10'}
        bg-linear-to-br from-background to-muted/20
        border border-border/50
        rounded-lg
        shadow-sm
      `}
      >
        <div
          className={`
          absolute top-4 left-4
          ${isCompact ? 'text-5xl' : 'text-6xl'}
          font-serif font-bold
          text-primary/20
          leading-none
        `}
        >
          "
        </div>

        {quote && (
          <blockquote
            className={`
            relative
            ${isCompact ? 'text-base leading-7' : 'text-xl leading-9'}
            font-serif
            text-foreground
            text-center
            whitespace-pre-line
            px-4
          `}
          >
            {quote}
          </blockquote>
        )}

        <div
          className={`
          absolute bottom-4 right-4
          ${isCompact ? 'text-5xl' : 'text-6xl'}
          font-serif font-bold
          text-primary/20
          leading-none
        `}
        >
          "
        </div>
      </div>

      {source && (
        <figcaption
          className={`
          mt-4
          ${isCompact ? 'text-sm' : 'text-base'}
          text-muted-foreground
          text-center
          tracking-wide
        `}
        >
          - {source} -
        </figcaption>
      )}
    </figure>
  );
};

QuoteBlock.displayName = 'QuoteBlock';
