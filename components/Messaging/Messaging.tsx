'use client';

import { useEffect, useState } from 'react';

import { FloatingChatDesktop } from '@/components/Messaging/FloatingChatDesktop';
import { FloatingChatMobile } from '@/components/Messaging/FloatingChatMobile';
import dynamic from 'next/dynamic';

const MessageBar = dynamic(
  () => import('@/components/Messaging/MessageBar').then(mod => mod.MessageBar),
  { ssr: false }
);

export const Messaging = () => {
  const [openConversations, setOpenConversations] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mql = window.matchMedia('(max-width: 639px)');
    const update = () => setIsSmallScreen(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

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

  if (!mounted) {
    return null;
  }

  return (
    <>
      <MessageBar onSelectConversation={openConversation} />

      {isSmallScreen && (
        <div className="sm:hidden">
          <FloatingChatMobile
            conversationId={openConversations[0] ?? null}
            onClose={() => setOpenConversations([])}
          />
        </div>
      )}

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
