'use client';

import { Maximize, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import { chatActivityStore } from '@/lib/chat/activity';
import { conversationsData } from '@/lib/chat/conversations';
import { useConversationProgress } from '@/lib/chat/progress';
import { ConversationProgress } from '@/components/Chatbot/ConversationProgress';

interface ChatbotHeaderProps {
  conversationId: string;
  isMaximized: boolean;
  onClose: () => void;
  onToggleMaximize: () => void;
  showMaximize?: boolean;
  onHeaderClick?: () => void;
}

export const ChatbotHeader = ({
  conversationId,
  onClose,
  onToggleMaximize,
  showMaximize = true,
  onHeaderClick,
}: ChatbotHeaderProps) => {
  const conversation = conversationsData[conversationId];
  const [isOnline, setIsOnline] = useState(false);
  const { percent, visitedCount, totalStates } =
    useConversationProgress(conversationId);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(chatActivityStore.isActive(conversationId));
    };

    updateOnlineStatus();

    const unsubscribe = chatActivityStore.subscribe(updateOnlineStatus);

    return unsubscribe;
  }, [conversationId]);

  return (
    <div
      className={`bg-card border-border flex items-center justify-between border-b p-3 ${onHeaderClick ? 'cursor-pointer' : 'cursor-default'}`}
      onClick={onHeaderClick}
    >
      <div className="flex items-center gap-2">
        <div className="relative h-6 w-6">
          <Image
            src={conversation.avatar}
            alt={conversation.name}
            className="rounded-full object-cover"
            fill
            sizes="24px"
          />
          {isOnline && (
            <span className="border-background absolute -right-0.5 -bottom-0.5 block h-3 w-3 rounded-full border-2 bg-green-500 z-10" />
          )}
        </div>
        <span className="text-sm font-semibold">{conversation.name}</span>
        <ConversationProgress
          progress={percent}
          label={`${visitedCount}/${totalStates} states visited`}
        />
      </div>
      <div className="flex items-center gap-1">
        {showMaximize && (
          <button
            onClick={onToggleMaximize}
            className="hover:bg-accent cursor-pointer rounded-full p-1"
            aria-label="Maximize"
          >
            <Maximize size={14} />
          </button>
        )}
        <button
          onClick={e => {
            e.stopPropagation();
            onClose();
          }}
          className="hover:bg-destructive/15 cursor-pointer rounded-full p-1"
          aria-label="Close"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
