'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';

interface MessageBarHeaderProps {
  isOpen: boolean;
  onToggle: () => void;
  avatarSrc: string;
}

export const MessageBarHeader = ({
  isOpen,
  onToggle,
  avatarSrc,
}: MessageBarHeaderProps) => {
  return (
    <div className="flex items-center h-12 px-2 bg-white hover:bg-gray-50 border-l border-r border-t border-gray-300 rounded-t-lg shadow-lg transition-colors">
      <button
        onClick={onToggle}
        className="flex items-center flex-1 text-left cursor-pointer"
        aria-label={isOpen ? 'Close messaging' : 'Open messaging'}
      >
        <div className="relative mr-2">
          <img
            src={
              avatarSrc ||
              'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNmM2Y0ZjYiLz4KPC9zdmc+'
            }
            alt="Messaging"
            className="w-8 h-8 rounded-full"
          />
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <span className="text-sm font-semibold text-gray-900 mr-1">
          Messaging
        </span>
      </button>
      <div className="flex items-center gap-1">
        <button
          onClick={onToggle}
          className="p-1.5 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
          aria-label={isOpen ? 'Minimize' : 'Expand'}
        >
          {isOpen ? (
            <ChevronDown size={16} className="text-gray-700" />
          ) : (
            <ChevronUp size={16} className="text-gray-700" />
          )}
        </button>
      </div>
    </div>
  );
};
