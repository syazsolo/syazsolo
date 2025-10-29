'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { Chat } from '@/components/Messaging/Chat';
import { ChatHeader } from '@/components/Messaging/ChatHeader';
import { useFloatingChat } from './useFloatingChat';
import { useState } from 'react';

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
  const [isMaximized, setIsMaximized] = useState(false);
  const { isVisible, isOpen, handleClose } = useFloatingChat({
    conversationId,
    onClose,
  });

  if (!conversationId) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className={`fixed bg-card border border-border shadow-2xl text-foreground flex flex-col overflow-hidden ${
            isMaximized
              ? 'z-60 inset-x-0 inset-y-4 mx-auto my-auto w-full max-w-4xl h-[90vh] rounded-lg'
              : 'z-50 bottom-0 w-80 h-96 rounded-lg'
          }`}
          style={
            !isMaximized
              ? {
                  right: 320 + offsetIndex * 336,
                  willChange: 'transform, opacity',
                }
              : undefined
          }
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.2, ease: [0.4, 0.0, 0.2, 1] },
          }}
          transition={{ duration: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
          layout
        >
          <ChatHeader
            conversationId={conversationId}
            isMaximized={isMaximized}
            onClose={handleClose}
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
