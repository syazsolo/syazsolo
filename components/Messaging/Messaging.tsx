'use client';

import { FloatingChatDesktop } from '@/components/Messaging/FloatingChatDesktop';
import { FloatingChatMobile } from '@/components/Messaging/FloatingChatMobile';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const MessageBar = dynamic(
  () => import('@/components/Messaging/MessageBar').then(mod => mod.MessageBar),
  { ssr: false }
);

export const Messaging = () => {
  const [openConversations, setOpenConversations] = useState<string[]>([]);

  const openConversation = (conversationId: string) => {
    setOpenConversations(prev => {
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

  return (
    <>
      <MessageBar onSelectConversation={openConversation} />

      <div className="sm:hidden">
        <FloatingChatMobile
          conversationId={openConversations[0] ?? null}
          onClose={() => setOpenConversations([])}
        />
      </div>

      <div className="hidden sm:block">
        {openConversations.map((id, index) => (
          <FloatingChatDesktop
            key={id}
            conversationId={id}
            onClose={() => closeConversation(id)}
            offsetIndex={index}
          />
        ))}
      </div>
    </>
  );
};
