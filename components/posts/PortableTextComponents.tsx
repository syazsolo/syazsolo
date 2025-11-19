import { dataset, projectId } from '@/lib/sanity';

import { CreatePasswordImproved } from '@/components/posts/CreatePasswordImproved';
import { CreatePasswordMock } from '@/components/posts/CreatePasswordMock';
import type { PortableTextComponents } from 'next-sanity';
import { QuoteBlock } from '@/components/posts/QuoteBlock';
import type { ReactElement } from 'react';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import imageUrlBuilder from '@sanity/image-url';

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-foreground mt-8 mb-4 text-3xl leading-tight font-bold">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-foreground mt-6 mb-3 text-2xl leading-snug font-semibold">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-foreground mt-5 mb-2 text-xl leading-snug font-semibold">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-foreground mt-4 mb-2 text-lg font-semibold">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-foreground mb-4 text-[16px] leading-7">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-primary text-muted-foreground my-4 border-l-4 py-2 pl-4 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="text-foreground mb-4 list-inside list-disc space-y-2">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="text-foreground mb-4 list-inside list-decimal space-y-2">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-[16px] leading-7">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-[16px] leading-7">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="text-foreground font-bold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-sm">
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
    imageWithCaption: ({ value }) => {
      const imageUrl = value.image
        ? urlFor(value.image)
            ?.ignoreImageParams()
            .width(1200)
            .fit('max')
            .auto('format')
            .url()
        : null;

      if (!imageUrl) return null;

      return (
        <figure className="my-6">
          <img
            src={imageUrl}
            alt={value.alt || value.caption || ''}
            className="w-full rounded-lg"
          />
          {value.caption && (
            <figcaption className="text-muted-foreground mt-2 text-center text-sm italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    customComponent: ({ value }) => {
      const componentMap: Record<string, ReactElement> = {
        CreatePasswordMock: (
          <MissingComponent
            componentName="CreatePasswordMock"
            caption="To be implemented"
          />
          // <Isolated>
          //   <CreatePasswordMock />
          // </Isolated>
        ),
        CreatePasswordImproved: (
          <MissingComponent
            componentName="CreatePasswordImproved"
            caption="To be implemented"
          />
          // <Isolated>
          //   <CreatePasswordImproved />
          // </Isolated>
        ),
      };

      const component = componentMap[value.componentName];

      if (component) {
        return component;
      }

      return (
        <MissingComponent
          componentName={value.componentName}
          caption={value.caption}
        />
      );
    },
    quoteBlock: ({ value }) => (
      <QuoteBlock quote={value?.quote} source={value?.source} />
    ),
  },
};

const MissingComponent = ({
  componentName,
  caption,
}: {
  componentName?: string;
  caption?: string;
}) => (
  <div className="bg-muted border-border my-6 rounded-lg border-2 border-dashed p-6">
    <div className="text-center">
      <p className="text-foreground mb-2 text-sm font-semibold">
        Custom Component: {componentName || 'Unknown component'}
      </p>
      {caption && <p className="text-muted-foreground text-xs">{caption}</p>}
    </div>
  </div>
);
