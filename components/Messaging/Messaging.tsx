'use client';

import { ChatBox } from './ChatBox';
import { MessageBar } from './MessageBar';
import { useState } from 'react';

export const Messaging = () => {
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);

  return (
    <>
      <MessageBar onSelectConversation={setSelectedConversation} />
      <ChatBox conversationId={selectedConversation} />
    </>
  );
};
