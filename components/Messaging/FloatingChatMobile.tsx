'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { Chat } from '@/components/Messaging/Chat';
import { ChatHeader } from '@/components/Messaging/ChatHeader';
import { useEffect } from 'react';
import { useFloatingChat } from './useFloatingChat';

interface FloatingChatMobileProps {
  conversationId: string | null;
  onClose: () => void;
}

export const FloatingChatMobile = ({
  conversationId,
  onClose,
}: FloatingChatMobileProps) => {
  const { isVisible, isOpen, handleClose, setIsVisible } = useFloatingChat({
    conversationId,
    onClose: () => {
      // we need to override the default behavior a bit here
      onClose();
    },
  });

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen, setIsVisible]);

  if (!conversationId) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-background text-foreground flex flex-col"
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: '100%',
            scale: 0.8,
            transition: {
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            },
          }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0.0, 0.2, 1],
          }}
        >
          <ChatHeader
            conversationId={conversationId}
            isMaximized={true}
            onClose={handleClose}
            onToggleMaximize={() => {}}
            showMaximize={false}
            onHeaderClick={handleClose}
          />
          <div className="grow h-full overflow-hidden">
            <Chat conversationId={conversationId} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
