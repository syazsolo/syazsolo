import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { parseFormattedText } from '@/lib/utils';
import { MutableRefObject } from 'react';

interface UserMessageProps {
  text: string;
  userAvatarSrc: string;
  isLastUserMessage: boolean;
  lastUserMessageRef: MutableRefObject<HTMLDivElement | null>;
}

export const UserMessage = ({
  text,
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
          {parseFormattedText(text).map((part, index) => (
            <span
              key={index}
              className={`${part.italic ? 'italic' : ''} ${
                part.bold ? 'font-bold' : ''
              }`}
            >
              {part.text}
            </span>
          ))}
        </div>
      </div>
      <Avatar className="w-6 h-6">
        <AvatarImage src={userAvatarSrc} alt="You" />
        <AvatarFallback>Y</AvatarFallback>
      </Avatar>
    </div>
  );
};
