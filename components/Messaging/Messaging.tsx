'use client';

import { useEffect, useState } from 'react';

import { FloatingChatDesktop } from '@/components/Messaging/FloatingChatDesktop';
import { FloatingChatMobile } from '@/components/Messaging/FloatingChatMobile';
import { MessageBar } from '@/components/Messaging/MessageBar';

export const Messaging = () => {
  const [openConversations, setOpenConversations] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openConversation = (conversationId: string) => {
    setOpenConversations(prev => {
      if (isMobile) {
        return [conversationId];
      }
      if (prev.includes(conversationId)) {
        return prev;
      }
      const next = [...prev, conversationId];
      if (next.length > 3) next.shift();
      return next;
    });
  };

  const closeConversation = (conversationId: string) => {
    setOpenConversations(prev => prev.filter(id => id !== conversationId));
  };

  return (
    <>
      <MessageBar onSelectConversation={openConversation} />
      {isMobile ? (
        <FloatingChatMobile
          conversationId={openConversations[0] ?? null}
          onClose={() => setOpenConversations([])}
        />
      ) : (
        openConversations.map((id, index) => (
          <FloatingChatDesktop
            key={id}
            conversationId={id}
            onClose={() => closeConversation(id)}
            offsetIndex={index}
          />
        ))
      )}
    </>
  );
};
