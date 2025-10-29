'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { Chat } from '@/components/Messaging/Chat';
import { ChatHeader } from '@/components/Messaging/ChatHeader';

interface FloatingChatMobileProps {
  conversationId: string | null;
  onClose: () => void;
}

export const FloatingChatMobile = ({
  conversationId,
  onClose,
}: FloatingChatMobileProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const isOpen = !!conversationId;

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
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    // Delay the close to allow exit animation to complete
    setTimeout(() => {
      onClose();
    }, 400); // Match the exit animation duration
  };

  if (!conversationId) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 bg-white text-gray-900 flex flex-col"
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
