'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Maximize, Minus, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { ChatWindow } from './ChatWindow';
import { MessageBar } from './MessageBar';
import { conversationsData } from '@/lib/conversations';
import { getMessagingHeaderAvatar } from '@/lib/avatar';

export const Messaging = () => {
  const [isMessageBarOpen, setIsMessageBarOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
  const [isChatBoxMaximized, setIsChatBoxMaximized] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState<string>('');

  // Generate avatar only after hydration to avoid SSR mismatch
  useEffect(() => {
    setAvatarSrc(getMessagingHeaderAvatar());
  }, []);

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversation(conversationId);
    setIsChatBoxOpen(true);
  };

  return (
    <>
      <MessageBar
        isOpen={isMessageBarOpen}
        onToggle={() => setIsMessageBarOpen(!isMessageBarOpen)}
        avatarSrc={avatarSrc}
        onSelectConversation={handleSelectConversation}
      />

      {/* ChatBox - Separate chat window */}
      <AnimatePresence>
        {isChatBoxOpen && (
          <motion.div
            className={`fixed z-50 ${isChatBoxMaximized ? 'inset-0' : 'bottom-0 right-80'}`}
            initial={{
              scale: 0.9,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0.9,
              opacity: 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 600,
              damping: 35,
              duration: 0.15,
            }}
          >
            <motion.div
              className={`bg-white border border-gray-300 shadow-2xl text-gray-900 flex flex-col ${
                isChatBoxMaximized
                  ? 'w-full h-full rounded-none'
                  : 'w-80 h-96 rounded-lg'
              }`}
              animate={{
                borderRadius: isChatBoxMaximized ? 0 : 8,
              }}
              transition={{
                duration: 0.2,
                ease: 'easeOut',
              }}
            >
              <div className="flex items-center justify-between p-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <img
                    src={
                      conversationsData[selectedConversation || 'bot']
                        ?.avatar || '/acak.jpg'
                    }
                    alt={
                      conversationsData[selectedConversation || 'bot']?.name ||
                      'Assistant'
                    }
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="font-semibold text-sm">
                    {conversationsData[selectedConversation || 'bot']?.name ||
                      "Syazani's Assistant"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsChatBoxOpen(false)}
                    className="p-1 hover:bg-gray-200 rounded"
                    aria-label="Minimize"
                  >
                    <Minus size={14} />
                  </button>
                  <button
                    onClick={() => setIsChatBoxMaximized(!isChatBoxMaximized)}
                    className="p-1 hover:bg-gray-200 rounded"
                    aria-label="Maximize"
                  >
                    <Maximize size={14} />
                  </button>
                  <button
                    onClick={() => setIsChatBoxOpen(false)}
                    className="p-1 hover:bg-red-100 rounded"
                    aria-label="Close"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
              <div className="grow h-full overflow-hidden">
                <ChatWindow conversationId={selectedConversation || 'bot'} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
