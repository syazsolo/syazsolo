'use client';

import { MessageNode, toEmbedSrc } from '@/lib/chat/conversations';
import { parseFormattedText } from '@/utils';
import React from 'react';

interface RenderNodeProps {
  node: MessageNode;
}

export const MessageNodeRenderer = ({ node }: RenderNodeProps) => {
  if (typeof node === 'string') {
    return (
      <>
        {parseFormattedText(node).map((part, index) => (
          <span
            key={index}
            className={`${part.italic ? 'italic' : ''} ${
              part.bold ? 'font-bold' : ''
            }`}
          >
            {part.text}
          </span>
        ))}
      </>
    );
  }

  if (Array.isArray(node)) {
    return (
      <div className="flex flex-col space-y-2">
        {node.map((n, i) => (
          <MessageNodeRenderer key={i} node={n} />
        ))}
      </div>
    );
  }

  if (node.type === 'embed' && node.provider === 'youtube') {
    const src = toEmbedSrc(node);
    return (
      <div className="bg-card text-foreground overflow-hidden rounded-2xl">
        <div className="w-full" style={{ aspectRatio: '16 / 9' }}>
          <iframe
            src={src}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      </div>
    );
  }

  // Note: RandomNode should be resolved in the conversation flow hook before rendering.
  // This is a fallback, though it's better to avoid it in production.
  if (node.type === 'random') {
    const choice = node.items[Math.floor(Math.random() * node.items.length)];
    return <MessageNodeRenderer node={choice} />;
  }

  return null;
};
