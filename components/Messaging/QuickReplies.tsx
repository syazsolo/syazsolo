'use client';

import { Button } from '@/components/ui/button';
import { QuickReply } from '@/lib/conversations';

interface QuickRepliesProps {
  quickReplies: QuickReply[];
  onQuickReply: (text: string, nextState: string) => void;
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
            className="border-dashed bg-accent/60 hover:bg-accent text-foreground"
            onClick={() => onQuickReply(reply.text, reply.nextState)}
          >
            {reply.text}
          </Button>
        ))}
      </div>
    </div>
  );
};
