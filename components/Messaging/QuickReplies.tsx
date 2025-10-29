'use client';

import { Button } from '@/components/ui/button';
import { QuickReply } from '@/lib/conversations';
import { parseFormattedText } from '@/lib/utils';

interface QuickRepliesProps {
  quickReplies: QuickReply[];
  onQuickReply: (
    text: string,
    nextState: string,
    message?: string | string[]
  ) => void;
}

export const QuickReplies = ({
  quickReplies,
  onQuickReply,
}: QuickRepliesProps) => {
  if (!quickReplies || quickReplies.length === 0) {
    return null;
  }

  return (
    <div className="flex w-full flex-col items-end gap-2">
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground/70 pr-1">
        Quick reply
      </div>
      <div className="flex w-full flex-wrap justify-end gap-2">
        {quickReplies.map((reply, index) => (
          <Button
            key={`${reply.nextState}-${index}`}
            variant="outline"
            size="sm"
            className="border-dashed bg-accent/60 hover:bg-accent text-foreground max-w-full sm:max-w-[75%] h-auto min-h-8 whitespace-normal wrap-break-word text-left leading-snug px-4 py-2"
            onClick={() =>
              onQuickReply(reply.text, reply.nextState, reply.message)
            }
          >
            {parseFormattedText(reply.text).map((part, i) => (
              <span
                key={i}
                className={`${part.italic ? 'italic' : ''} ${part.bold ? 'font-bold' : ''}`}
              >
                {part.text}
              </span>
            ))}
          </Button>
        ))}
      </div>
    </div>
  );
};
