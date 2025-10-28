'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChatList, ChatWindow } from '@/components/Messaging';
import {
  ChevronDown,
  ChevronUp,
  Maximize,
  Minus,
  MoreHorizontal,
  Pencil,
  X,
} from 'lucide-react';

import { conversationsData } from '@/lib/conversations';
import { useState } from 'react';

export const Messaging = () => {
  const [isMessageBarOpen, setIsMessageBarOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
  const [isChatBoxMaximized, setIsChatBoxMaximized] = useState(false);

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversation(conversationId);
    if (conversationId === 'bot' || conversationId === 'sponsored') {
      setIsChatBoxOpen(true);
    }
  };

  return (
    <>
      {/* MessageBar - Fixed to bottom-right corner */}
      <div className="fixed bottom-0 right-4 z-40 w-72 ml-4">
        {/* MessageBar Header */}
        <div className="flex items-center h-12 px-2 bg-white hover:bg-gray-50 border-l border-r border-t border-gray-300 rounded-t-lg shadow-lg transition-colors">
          <button
            onClick={() => setIsMessageBarOpen(!isMessageBarOpen)}
            className="flex items-center flex-1 text-left"
            aria-label={isMessageBarOpen ? 'Close messaging' : 'Open messaging'}
          >
            <div className="relative mr-2">
              <img
                src="/acak.jpg"
                alt="Syazani"
                className="w-8 h-8 rounded-full"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <span className="text-sm font-semibold text-gray-900 mr-1">
              Messaging
            </span>
          </button>
          <div className="flex items-center gap-1">
            <button
              className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
              aria-label="More options"
            >
              <MoreHorizontal size={16} className="text-gray-700" />
            </button>
            <button
              className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
              aria-label="New message"
            >
              <Pencil size={16} className="text-gray-700" />
            </button>
            <button
              onClick={() => setIsMessageBarOpen(!isMessageBarOpen)}
              className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
              aria-label={isMessageBarOpen ? 'Minimize' : 'Expand'}
            >
              {isMessageBarOpen ? (
                <ChevronDown size={16} className="text-gray-700" />
              ) : (
                <ChevronUp size={16} className="text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* MessageBar Expanded List - with snappy animation */}
        <AnimatePresence>
          {isMessageBarOpen && (
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
              <ChatList onSelectConvo={handleSelectConversation} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ChatBox - Separate chat window */}
      <AnimatePresence>
        {isChatBoxOpen && (
          <motion.div
            className={`fixed z-50 ${isChatBoxMaximized ? 'inset-0' : 'bottom-4 right-80'}`}
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
