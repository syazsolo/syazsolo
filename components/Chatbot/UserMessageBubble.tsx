import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MutableRefObject } from 'react';
import { MessageNode } from '@/lib/chat/conversations';

import { MessageNodeRenderer } from './MessageNodeRenderer';

interface UserMessageBubbleProps {
  content: MessageNode;
  userAvatarSrc: string;
  isLastUserMessage: boolean;
  lastUserMessageRef: MutableRefObject<HTMLDivElement | null>;
}

export const UserMessageBubble = ({
  content,
  userAvatarSrc,
  isLastUserMessage,
  lastUserMessageRef,
}: UserMessageBubbleProps) => {
  return (
    <div
      ref={isLastUserMessage ? lastUserMessageRef : null}
      className="flex scroll-mt-2 items-start justify-end gap-2"
    >
      <div className="flex max-w-[85%] flex-col sm:max-w-[80%]">
        <div className="bg-primary text-primary-foreground rounded-2xl px-3 py-2 text-sm">
          <MessageNodeRenderer node={content} />
        </div>
      </div>
      <Avatar className="h-6 w-6">
        <AvatarImage src={userAvatarSrc} alt="You" />
        <AvatarFallback>Y</AvatarFallback>
      </Avatar>
    </div>
  );
};
