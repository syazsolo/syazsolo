'use client';

import { Maximize, X } from 'lucide-react';

import { conversationsData } from '@/lib/conversations';

interface ChatHeaderProps {
  conversationId: string;
  isMaximized: boolean;
  onClose: () => void;
  onToggleMaximize: () => void;
  showMaximize?: boolean;
  onHeaderClick?: () => void;
}

export const ChatHeader = ({
  conversationId,
  onClose,
  onToggleMaximize,
  showMaximize = true,
  onHeaderClick,
}: ChatHeaderProps) => {
  const conversation = conversationsData[conversationId];

  return (
    <div
      className={`flex items-center justify-between p-3 bg-card border-b border-border ${onHeaderClick ? 'cursor-pointer' : 'cursor-default'}`}
      onClick={onHeaderClick}
    >
      <div className="flex items-center gap-2">
        <img
          src={conversation.avatar}
          alt={conversation.name}
          className="w-6 h-6 rounded-full"
        />
        <span className="font-semibold text-sm">{conversation.name}</span>
      </div>
      <div className="flex items-center gap-1">
        {showMaximize && (
          <button
            onClick={onToggleMaximize}
            className="p-1 hover:bg-accent rounded-full cursor-pointer"
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
          className="p-1 hover:bg-destructive/15 rounded-full cursor-pointer"
          aria-label="Close"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
