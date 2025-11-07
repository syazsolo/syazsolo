import { dataset, projectId } from '@/lib/sanity';

import { CreatePasswordImproved } from '@/components/posts/CreatePasswordImproved';
import { CreatePasswordMock } from '@/components/posts/CreatePasswordMock';
import { Isolated } from '@/components/posts/Isolated';
import type { PortableTextComponents } from 'next-sanity';
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
      <h1 className="text-3xl font-bold text-foreground mt-8 mb-4 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-foreground mt-6 mb-3 leading-snug">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-foreground mt-5 mb-2 leading-snug">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-foreground mt-4 mb-2">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-[16px] text-foreground leading-7 mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 py-2 my-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-foreground">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-foreground">
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
      <strong className="font-bold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
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
        ? urlFor(value.image)?.width(1200).height(800).url()
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
            <figcaption className="text-sm text-muted-foreground mt-2 text-center italic">
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
  },
};

const MissingComponent = ({
  componentName,
  caption,
}: {
  componentName?: string;
  caption?: string;
}) => (
  <div className="my-6 p-6 bg-muted rounded-lg border-2 border-dashed border-border">
    <div className="text-center">
      <p className="text-sm font-semibold text-foreground mb-2">
        Custom Component: {componentName || 'Unknown component'}
      </p>
      {caption && <p className="text-xs text-muted-foreground">{caption}</p>}
    </div>
  </div>
);
