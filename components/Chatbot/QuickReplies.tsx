'use client';

import { Button } from '@/components/ui/button';
import { QuickReply, type MessageNode } from '@/lib/chat/conversations';
import { parseFormattedText } from '@/utils';

interface QuickRepliesProps {
  quickReplies: QuickReply[];
  onQuickReply: (
    text: string,
    nextState: string | undefined,
    message?: string | string[] | MessageNode
  ) => void;
}

export const QuickReplies = ({
  quickReplies,
  onQuickReply,
}: QuickRepliesProps) => {
  if (!quickReplies || quickReplies.length === 0) {
    return null;
  }

  const handleQuickReply = (reply: QuickReply) => {
    onQuickReply(reply.text, reply.nextState, reply.message);
  };

  return (
    <div className="flex w-full flex-col items-end gap-2">
      <div className="text-muted-foreground/70 pr-1 text-[11px] tracking-wide uppercase">
        Quick reply
      </div>
      <div className="flex w-full flex-wrap justify-end gap-2">
        {quickReplies.map((reply, index) => (
          <Button
            key={`${reply.nextState}-${index}`}
            variant="outline"
            size="sm"
            className="bg-accent/60 hover:bg-accent text-foreground h-auto min-h-8 max-w-full border-dashed px-4 py-2 text-left leading-snug wrap-break-word whitespace-normal sm:max-w-[75%]"
            onClick={() => handleQuickReply(reply)}
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
