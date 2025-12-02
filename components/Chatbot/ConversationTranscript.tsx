'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ConversationData,
  MessageNode,
  QuickReply,
} from '@/lib/chat/conversations';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

import { BotMessageBubble } from '@/components/Chatbot/BotMessageBubble';
import { Button } from '@/components/ui/button';
import { DisplayableMessage } from '@/lib/chat/state';
import { QuickReplies } from '@/components/Chatbot/QuickReplies';
import { TypingIndicator } from '@/components/Chatbot/TypingIndicator';
import { UserMessageBubble } from '@/components/Chatbot/UserMessageBubble';
import { getSharedAvatarUrl } from '@/utils/avatar';

interface ConversationTranscriptProps {
  messages: DisplayableMessage[];
  conversation: ConversationData;
  lastUserMessageRef: MutableRefObject<HTMLDivElement | null>;
  messagesEndRef: MutableRefObject<HTMLDivElement | null>;
  quickReplies: QuickReply[];
  onQuickReply: (
    text: string,
    nextState: string | undefined,
    message?: string | string[] | MessageNode
  ) => void;
  onRestart?: () => void;
  isWaitingForResponse: boolean;
  isUserTyping: boolean;
  areQuickRepliesVisible: boolean;
  isEndOfConversation?: boolean;
}

export const ConversationTranscript = ({
  messages,
  conversation,
  lastUserMessageRef,
  messagesEndRef,
  quickReplies,
  onQuickReply,
  onRestart,
  isWaitingForResponse,
  isUserTyping,
  areQuickRepliesVisible,
  isEndOfConversation,
}: ConversationTranscriptProps) => {
  const lastUserMessageIndex = messages.findLastIndex(
    m => m.type === 'message' && m.sender === 'user'
  );
  const containerRef = useRef<HTMLDivElement | null>(null);
  const atBottomRef = useRef(true);
  const [userAvatarSrc] = useState(() => getSharedAvatarUrl());
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) {
      return;
    }
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

  useEffect(() => {
    if (isEndOfConversation && !isWaitingForResponse && !isUserTyping) {
      const id = window.setTimeout(() => {
        setShowBackToTop(true);
      }, 1000);
      return () => {
        clearTimeout(id);
        setShowBackToTop(false);
      };
    }
    // Use startTransition to avoid synchronous setState warning
    // when transitioning from end state to active state
    const id = setTimeout(() => {
      setShowBackToTop(false);
    }, 0);
    return () => clearTimeout(id);
  }, [
    messages.length,
    isEndOfConversation,
    isWaitingForResponse,
    isUserTyping,
  ]);

  return (
    <div
      ref={containerRef}
      className="grow space-y-3 overflow-y-auto px-3 pt-4 pb-[calc(env(safe-area-inset-bottom)+12px)]"
      style={{ scrollBehavior: 'smooth' }}
    >
      {messages.map((msg, index) => {
        if (msg.type === 'divider') {
          return (
            <div key={index} className="py-2">
              <hr className="border-border border-t" />
            </div>
          );
        }

        const isLastUserMessage = index === lastUserMessageIndex;
        const isUser = msg.sender === 'user';

        if (isUser) {
          return (
            <UserMessageBubble
              key={index}
              content={msg.content}
              userAvatarSrc={userAvatarSrc}
              isLastUserMessage={isLastUserMessage}
              lastUserMessageRef={lastUserMessageRef}
            />
          );
        }

        return (
          <BotMessageBubble
            key={index}
            conversation={conversation}
            content={msg.content}
          />
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
          <Avatar className="h-6 w-6">
            <AvatarImage src={conversation.avatar} alt={conversation.name} />
            <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="bg-card text-foreground rounded-2xl px-3 py-2 text-sm">
            <TypingIndicator />
          </div>
        </div>
      )}
      {isUserTyping && (
        <div className="flex items-start justify-end gap-2">
          <div className="bg-primary text-primary-foreground rounded-2xl px-3 py-2 text-sm">
            <TypingIndicator />
          </div>
          <Avatar className="h-6 w-6">
            <AvatarImage src={userAvatarSrc} alt="You" />
            <AvatarFallback>Y</AvatarFallback>
          </Avatar>
        </div>
      )}
      {showBackToTop && (
        <div className="flex justify-center pt-2">
          <Button variant="ghost" size="sm" onClick={onRestart}>
            Back to top?
          </Button>
        </div>
      )}
      <div ref={messagesEndRef} className="h-32" />
    </div>
  );
};
