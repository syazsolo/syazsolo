'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { ChatList } from './ChatList';

interface MessageBarContentProps {
  isOpen: boolean;
  onSelectConversation: (conversationId: string) => void;
}

export const MessageBarContent = ({
  isOpen,
  onSelectConversation,
}: MessageBarContentProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="w-72 h-96 bg-white border-l border-r border-b border-gray-300 shadow-lg"
          initial={{
            height: 0,
            opacity: 0,
          }}
          animate={{
            height: '24rem',
            opacity: 1,
          }}
          exit={{
            height: 0,
            opacity: 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 25,
            duration: 0.3,
          }}
        >
          <ChatList onSelectConvo={onSelectConversation} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
