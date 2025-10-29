'use client';

import { Maximize, Minus, X } from 'lucide-react';

import { conversationsData } from '@/lib/conversations';

interface ChatHeaderProps {
  conversationId: string;
  isMaximized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
}

export const ChatHeader = ({
  conversationId,
  onClose,
  onMinimize,
  onToggleMaximize,
}: ChatHeaderProps) => {
  const conversation = conversationsData[conversationId];

  return (
    <div className="flex items-center justify-between p-3 border-b border-gray-200">
      <div className="flex items-center gap-2">
        <img
          src={conversation.avatar}
          alt={conversation.name}
          className="w-6 h-6 rounded-full"
        />
        <span className="font-semibold text-sm">{conversation.name}</span>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={onMinimize}
          className="p-1 hover:bg-gray-200 rounded hidden sm:inline-flex"
          aria-label="Minimize"
        >
          <Minus size={14} />
        </button>
        <button
          onClick={onToggleMaximize}
          className="p-1 hover:bg-gray-200 rounded hidden sm:inline-flex"
          aria-label="Maximize"
        >
          <Maximize size={14} />
        </button>
        <button
          onClick={onClose}
          className="p-1 hover:bg-red-100 rounded"
          aria-label="Close"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
