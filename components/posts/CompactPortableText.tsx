import type { PortableTextComponents } from 'next-sanity';

import { QuoteBlock } from '@/components/posts/QuoteBlock';

export const compactPortableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-[18px] font-bold text-foreground mb-2 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-[16px] font-semibold text-foreground mb-1.5 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-[15px] font-semibold text-foreground mb-1 leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-[14px] font-semibold text-foreground mb-1 leading-snug">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-[14px] text-foreground leading-5 mb-2">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-primary pl-2 py-1 my-2 italic text-muted-foreground text-[13px]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-2 space-y-1 text-foreground">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-2 space-y-1 text-foreground">
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
      <strong className="font-bold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">
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

