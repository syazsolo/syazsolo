'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { ConversationList } from '@/components/Chatbot/ConversationList';
import { getSharedAvatarUrl } from '@/utils/avatar';
import { useState } from 'react';

interface ChatbotLauncherProps {
  onSelectConversation: (conversationId: string) => void;
}

export const ChatbotLauncher = ({
  onSelectConversation,
}: ChatbotLauncherProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarSrc] = useState(() => getSharedAvatarUrl());

  return (
    <div className="fixed right-0 bottom-0 left-0 z-40 w-full px-2 sm:right-4 sm:left-auto sm:w-72 sm:px-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-card hover:bg-accent border-border text-foreground flex h-12 w-full cursor-pointer items-center rounded-t-lg border-t border-r border-l px-2 text-left shadow-lg transition-colors"
        aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
      >
        <div className="relative mr-2">
          <img
            src={avatarSrc}
            alt="random user avatar"
            className="bg-background h-8 w-8 rounded-full"
          />
          <span className="border-background absolute -right-0.5 -bottom-0.5 block h-3 w-3 rounded-full border-2 bg-green-500" />
        </div>
        <span className="mr-1 flex-1 text-sm font-semibold">Chatbot</span>
        <div className="flex items-center gap-1">
          {isOpen ? (
            <ChevronDown size={16} className="text-muted-foreground" />
          ) : (
            <ChevronUp size={16} className="text-muted-foreground" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="bg-card border-border h-[min(70vh,24rem)] w-full border-r border-b border-l shadow-lg sm:h-96 sm:w-72"
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: 'min(70vh, 24rem)',
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
            <ConversationList onSelectConvo={onSelectConversation} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
