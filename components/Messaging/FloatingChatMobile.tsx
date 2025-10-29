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
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (conversationId) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [conversationId]);

  useEffect(() => {
    if (isOpen) {
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
    setIsOpen(false);
    onClose();
  };

  if (!conversationId) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-white text-gray-900 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <ChatHeader
            conversationId={conversationId}
            isMaximized={true}
            onClose={handleClose}
            onMinimize={handleClose}
            onToggleMaximize={() => {}}
          />
          <div className="grow h-full overflow-hidden">
            <Chat conversationId={conversationId} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
