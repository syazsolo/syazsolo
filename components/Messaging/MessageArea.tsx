'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ConversationData, QuickReply } from '@/lib/conversations';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

import { QuickReplies } from '@/components/Messaging/QuickReplies';
import { getSharedAvatarUrl } from '@/lib/avatar';
import { parseFormattedText } from '@/lib/utils';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

interface MessageAreaProps {
  messages: Message[];
  conversation: ConversationData;
  lastUserMessageRef: MutableRefObject<HTMLDivElement | null>;
  messagesEndRef: MutableRefObject<HTMLDivElement | null>;
  quickReplies: QuickReply[];
  onQuickReply: (
    text: string,
    nextState: string,
    message?: string | string[]
  ) => void;
  isWaitingForResponse: boolean;
  isUserTyping: boolean;
  areQuickRepliesVisible: boolean;
}

export const MessageArea = ({
  messages,
  conversation,
  lastUserMessageRef,
  messagesEndRef,
  quickReplies,
  onQuickReply,
  isWaitingForResponse,
  isUserTyping,
  areQuickRepliesVisible,
}: MessageAreaProps) => {
  const lastUserMessageIndex = messages.findLastIndex(m => m.sender === 'user');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const atBottomRef = useRef(true);
  const [userAvatarSrc] = useState(() => getSharedAvatarUrl());

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const distanceFromBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight;
      atBottomRef.current = distanceFromBottom < 48; // treat as "near bottom"
    };
    el.addEventListener('scroll', onScroll);
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (atBottomRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isWaitingForResponse, messagesEndRef]);

  return (
    <div
      ref={containerRef}
      className="grow px-3 pt-4 pb-[calc(env(safe-area-inset-bottom)+12px)] overflow-y-auto space-y-3"
      style={{ scrollBehavior: 'smooth' }}
    >
      {messages.map((msg, index) => {
        const isLastUserMessage = index === lastUserMessageIndex;
        const isUser = msg.sender === 'user';

        return (
          <div
            key={index}
            ref={isLastUserMessage ? lastUserMessageRef : null}
            className={`flex items-start gap-2 scroll-mt-2 ${isUser ? 'justify-end' : ''}`}
          >
            {!isUser && (
              <Avatar className="w-6 h-6">
                <AvatarImage
                  src={conversation.avatar}
                  alt={conversation.name}
                />
                <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            <div className="flex flex-col sm:max-w-[80%] max-w-[85%]">
              <div
                className={`rounded-2xl px-3 py-2 text-sm ${
                  isUser
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-foreground'
                }`}
              >
                {parseFormattedText(msg.text).map((part, index) => (
                  <span
                    key={index}
                    className={`${part.italic ? 'italic' : ''} ${part.bold ? 'font-bold' : ''}`}
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            </div>
            {isUser && (
              <Avatar className="w-6 h-6">
                <AvatarImage src={userAvatarSrc} alt="You" />
                <AvatarFallback>Y</AvatarFallback>
              </Avatar>
            )}
          </div>
        );
      })}
      {areQuickRepliesVisible && (
        <div className="pt-2">
          <QuickReplies
            quickReplies={quickReplies}
            onQuickReply={onQuickReply}
          />
        </div>
      )}
      {isWaitingForResponse && (
        <div className="flex items-start gap-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src={conversation.avatar} alt={conversation.name} />
            <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="rounded-2xl px-3 py-2 text-sm bg-card text-foreground">
            <span className="typing">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </span>
          </div>
        </div>
      )}
      {isUserTyping && (
        <div className="flex items-start gap-2 justify-end">
          <div className="rounded-2xl px-3 py-2 text-sm bg-primary text-primary-foreground">
            <span className="typing">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </span>
          </div>
          <Avatar className="w-6 h-6">
            <AvatarImage src={userAvatarSrc} alt="You" />
            <AvatarFallback>Y</AvatarFallback>
          </Avatar>
        </div>
      )}
      <div ref={messagesEndRef} className="h-32" />
    </div>
  );
};
