'use client';

import { useEffect, useState } from 'react';

import { ChatBox } from './ChatBox';
import { MessageBar } from './MessageBar';
import { getMessagingHeaderAvatar } from '@/lib/avatar';

export const Messaging = () => {
  const [isMessageBarOpen, setIsMessageBarOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
  const [isChatBoxMaximized, setIsChatBoxMaximized] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState<string>('');

  // Generate avatar only after hydration to avoid SSR mismatch
  useEffect(() => {
    setAvatarSrc(getMessagingHeaderAvatar());
  }, []);

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversation(conversationId);
    setIsChatBoxOpen(true);
  };

  return (
    <>
      <MessageBar
        isOpen={isMessageBarOpen}
        onToggle={() => setIsMessageBarOpen(!isMessageBarOpen)}
        avatarSrc={avatarSrc}
        onSelectConversation={handleSelectConversation}
      />

      <ChatBox
        isOpen={isChatBoxOpen}
        conversationId={selectedConversation}
        isMaximized={isChatBoxMaximized}
        onClose={() => setIsChatBoxOpen(false)}
        onToggleMaximize={() => setIsChatBoxMaximized(!isChatBoxMaximized)}
      />
    </>
  );
};
