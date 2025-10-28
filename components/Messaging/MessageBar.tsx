'use client';

import { MessageBarContent } from './MessageBarContent';
import { MessageBarHeader } from './MessageBarHeader';

interface MessageBarProps {
  isOpen: boolean;
  onToggle: () => void;
  avatarSrc: string;
  onSelectConversation: (conversationId: string) => void;
}

export const MessageBar = ({
  isOpen,
  onToggle,
  avatarSrc,
  onSelectConversation,
}: MessageBarProps) => {
  return (
    <div className="fixed bottom-0 right-4 z-40 w-72 ml-4">
      <MessageBarHeader
        isOpen={isOpen}
        onToggle={onToggle}
        avatarSrc={avatarSrc}
      />
      <MessageBarContent
        isOpen={isOpen}
        onSelectConversation={onSelectConversation}
      />
    </div>
  );
};
