'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { Chat } from '@/components/Messaging/Chat';
import { ChatHeader } from '@/components/Messaging/ChatHeader';

interface FloatingChatDesktopProps {
  conversationId: string | null;
  onClose: () => void;
  offsetIndex?: number;
}

export const FloatingChatDesktop = ({
  conversationId,
  onClose,
  offsetIndex = 0,
}: FloatingChatDesktopProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    if (conversationId) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [conversationId]);

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
          className={`fixed z-50 bg-white border border-gray-300 shadow-2xl text-gray-900 flex flex-col ${
            isMaximized
              ? 'inset-0 w-full h-full rounded-none'
              : 'bottom-0 w-80 h-96 rounded-lg'
          }`}
          style={
            !isMaximized
              ? {
                  // Place windows to the left of the MessageBar
                  // baseRight = right margin (16px) + bar width (18rem=288px) + gap (16px) = 320px
                  // step = window width (20rem=320px) + gap (16px) = 336px
                  right: 320 + offsetIndex * 336,
                }
              : undefined
          }
          initial={{
            scale: 0.9,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
            borderRadius: isMaximized ? 0 : 8,
          }}
          exit={{
            scale: 0.9,
            opacity: 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 600,
            damping: 35,
          }}
        >
          <ChatHeader
            conversationId={conversationId}
            isMaximized={isMaximized}
            onClose={handleClose}
            onMinimize={handleClose}
            onToggleMaximize={() => setIsMaximized(!isMaximized)}
          />
          <div className="grow h-full overflow-hidden">
            <Chat conversationId={conversationId} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
