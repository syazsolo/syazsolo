'use client';

import { ChatBox } from '@/components/Messaging/ChatBox';
import { MessageBar } from '@/components/Messaging/MessageBar';
import { useState } from 'react';

export const Messaging = () => {
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);

  const handleCloseChat = () => {
    setSelectedConversation(null);
  };

  return (
    <>
      <MessageBar onSelectConversation={setSelectedConversation} />
      <ChatBox
        conversationId={selectedConversation}
        onClose={handleCloseChat}
      />
    </>
  );
};
