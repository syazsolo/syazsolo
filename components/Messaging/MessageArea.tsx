'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ConversationData, QuickReply } from '@/lib/conversations';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

import { BotMessage } from '@/components/Messaging/BotMessage';
import { QuickReplies } from '@/components/Messaging/QuickReplies';
import { TypingIndicator } from '@/components/Messaging/TypingIndicator';
import { UserMessage } from '@/components/Messaging/UserMessage';
import { getSharedAvatarUrl } from '@/lib/avatar';

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
    nextState: string | undefined,
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

        if (isUser) {
          return (
            <UserMessage
              key={index}
              text={msg.text}
              userAvatarSrc={userAvatarSrc}
              isLastUserMessage={isLastUserMessage}
              lastUserMessageRef={lastUserMessageRef}
            />
          );
        }

        return (
          <BotMessage key={index} conversation={conversation} text={msg.text} />
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
            <TypingIndicator />
          </div>
        </div>
      )}
      {isUserTyping && (
        <div className="flex items-start gap-2 justify-end">
          <div className="rounded-2xl px-3 py-2 text-sm bg-primary text-primary-foreground">
            <TypingIndicator />
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
