import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { parseFormattedText } from '@/lib/utils';
import { MutableRefObject } from 'react';
import { MessageNode } from '@/lib/conversations';
import { RenderNode } from './RenderNode';

interface UserMessageProps {
  content: MessageNode;
  userAvatarSrc: string;
  isLastUserMessage: boolean;
  lastUserMessageRef: MutableRefObject<HTMLDivElement | null>;
}

export const UserMessage = ({
  content,
  userAvatarSrc,
  isLastUserMessage,
  lastUserMessageRef,
}: UserMessageProps) => {
  return (
    <div
      ref={isLastUserMessage ? lastUserMessageRef : null}
      className="flex items-start gap-2 scroll-mt-2 justify-end"
    >
      <div className="flex flex-col sm:max-w-[80%] max-w-[85%]">
        <div className="rounded-2xl px-3 py-2 text-sm bg-primary text-primary-foreground">
          <RenderNode node={content} />
        </div>
      </div>
      <Avatar className="w-6 h-6">
        <AvatarImage src={userAvatarSrc} alt="You" />
        <AvatarFallback>Y</AvatarFallback>
      </Avatar>
    </div>
  );
};
