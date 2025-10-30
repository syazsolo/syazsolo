'use client';

import { useEffect, useState } from 'react';
import { FloatingChat } from '@/components/Messaging/FloatingChat';
import dynamic from 'next/dynamic';
import { useIsMobile } from '@/hooks/useIsMobile';

const MessageBar = dynamic(
  () => import('@/components/Messaging/MessageBar').then(mod => mod.MessageBar),
  { ssr: false }
);

export const Messaging = () => {
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
      <MessageBar onSelectConversation={openConversation} />

      {isSmallScreen ? (
        <FloatingChat
          conversationId={openConversations[0] ?? null}
          onClose={() => setOpenConversations([])}
        />
      ) : (
        openConversations.map((id, index) => (
          <FloatingChat
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
