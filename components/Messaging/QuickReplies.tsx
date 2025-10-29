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
    <div className="flex flex-wrap gap-2">
      {quickReplies.map((reply, index) => (
        <Button
          key={`${reply.nextState}-${index}`}
          variant="outline"
          className="bg-gray-100 border-gray-300 hover:bg-gray-200 text-xs text-gray-700"
          onClick={() => onQuickReply(reply.text, reply.nextState)}
        >
          {reply.text}
        </Button>
      ))}
    </div>
  );
};
