'use client';

import { useEffect, useState } from 'react';

import { ChatbotWindow } from '@/components/Chatbot/ChatbotWindow';
import dynamic from 'next/dynamic';
import { useIsMobile } from '@/hooks/useIsMobile';

const ChatbotLauncher = dynamic(
  () =>
    import('@/components/Chatbot/ChatbotLauncher').then(
      mod => mod.ChatbotLauncher
    ),
  { ssr: false }
);

export const Chatbot = () => {
  const [openConversations, setOpenConversations] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const isSmallScreen = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  const openConversation = (conversationId: string) => {
    setOpenConversations(prev => {
      if (isSmallScreen) {
        return [conversationId];
      }

      if (prev.includes(conversationId)) {
        return prev;
      }

      const next = [...prev, conversationId];

      if (next.length > 3) {
        next.shift();
      }

      return next;
    });
  };

  const closeConversation = (conversationId: string) => {
    setOpenConversations(prev => prev.filter(id => id !== conversationId));
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <ChatbotLauncher onSelectConversation={openConversation} />

      {isSmallScreen ? (
        <ChatbotWindow
          conversationId={openConversations[0] ?? null}
          onClose={() => setOpenConversations([])}
        />
      ) : (
        openConversations.map((id, index) => (
          <ChatbotWindow
            key={id}
            conversationId={id}
            onClose={() => closeConversation(id)}
            offsetIndex={index}
            totalChats={openConversations.length}
          />
        ))
      )}
    </>
  );
};
