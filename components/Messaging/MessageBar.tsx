'use client';

import { useEffect, useState } from 'react';

import { MessageBarContent } from './MessageBarContent';
import { MessageBarHeader } from './MessageBarHeader';
import { getMessagingHeaderAvatar } from '@/lib/avatar';

interface MessageBarProps {
  onSelectConversation: (conversationId: string) => void;
}

export const MessageBar = ({ onSelectConversation }: MessageBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState<string>('');

  useEffect(() => {
    setAvatarSrc(getMessagingHeaderAvatar());
  }, []);

  return (
    <div className="fixed bottom-0 right-4 z-40 w-72 ml-4">
      <MessageBarHeader
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        avatarSrc={avatarSrc}
      />
      <MessageBarContent
        isOpen={isOpen}
        onSelectConversation={onSelectConversation}
      />
    </div>
  );
};
