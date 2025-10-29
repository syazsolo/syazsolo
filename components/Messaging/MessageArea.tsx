'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ConversationData, QuickReply } from '@/lib/conversations';

import { MutableRefObject } from 'react';
import { QuickReplies } from '@/components/Messaging/QuickReplies';

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
  onQuickReply: (text: string, nextState: string) => void;
  isWaitingForResponse: boolean;
}

export const MessageArea = ({
  messages,
  conversation,
  lastUserMessageRef,
  messagesEndRef,
  quickReplies,
  onQuickReply,
  isWaitingForResponse,
}: MessageAreaProps) => {
  const lastUserMessageIndex = messages.findLastIndex(m => m.sender === 'user');

  return (
    <div className="grow px-3 pt-4 pb-[calc(env(safe-area-inset-bottom)+12px)] overflow-y-auto space-y-3">
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
                {msg.text}
              </div>
            </div>
            {isUser && (
              <Avatar className="w-6 h-6">
                <AvatarImage src="/logo.png" alt="You" />
                <AvatarFallback>Y</AvatarFallback>
              </Avatar>
            )}
          </div>
        );
      })}
      {!isWaitingForResponse && (
        <div className="pt-2">
          <QuickReplies
            quickReplies={quickReplies}
            onQuickReply={onQuickReply}
          />
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
