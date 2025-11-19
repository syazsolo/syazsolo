import type { PortableTextComponents } from 'next-sanity';

import { QuoteBlock } from '@/components/posts/QuoteBlock';

export const compactPortableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-foreground mb-2 text-[18px] leading-tight font-bold">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-foreground mb-1.5 text-[16px] leading-tight font-semibold">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-foreground mb-1 text-[15px] leading-tight font-semibold">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-foreground mb-1 text-[14px] leading-snug font-semibold">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-foreground mb-2 text-[14px] leading-5">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-primary text-muted-foreground my-2 border-l-2 py-1 pl-2 text-[13px] italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="text-foreground mb-2 list-inside list-disc space-y-1">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="text-foreground mb-2 list-inside list-decimal space-y-1">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-[13px] leading-5">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-[13px] leading-5">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="text-foreground font-bold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-muted rounded px-1 py-0.5 font-mono text-xs">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline"
      >
        {children}
      </a>
    ),
  },
  types: {
    imageWithCaption: () => null,
    customComponent: () => null,
    quoteBlock: ({ value }) => (
      <QuoteBlock
        quote={value?.quote}
        source={value?.source}
        variant="compact"
      />
    ),
  },
};
