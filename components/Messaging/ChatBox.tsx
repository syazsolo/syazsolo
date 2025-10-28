'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Maximize, Minus, X } from 'lucide-react';

import { ChatWindow } from './ChatWindow';
import { conversationsData } from '@/lib/conversations';

interface ChatBoxProps {
  isOpen: boolean;
  conversationId: string | null;
  isMaximized: boolean;
  onClose: () => void;
  onToggleMaximize: () => void;
}

export const ChatBox = ({
  isOpen,
  conversationId,
  isMaximized,
  onClose,
  onToggleMaximize,
}: ChatBoxProps) => {
  if (!conversationId) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed z-50 bg-white border border-gray-300 shadow-2xl text-gray-900 flex flex-col ${
            isMaximized
              ? 'inset-0 w-full h-full rounded-none'
              : 'bottom-0 right-80 w-80 h-96 rounded-lg'
          }`}
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
          <div className="flex items-center justify-between p-3 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <img
                src={conversationsData[conversationId].avatar}
                alt={conversationsData[conversationId].name}
                className="w-6 h-6 rounded-full"
              />
              <span className="font-semibold text-sm">
                {conversationsData[conversationId].name}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-200 rounded"
                aria-label="Minimize"
              >
                <Minus size={14} />
              </button>
              <button
                onClick={onToggleMaximize}
                className="p-1 hover:bg-gray-200 rounded"
                aria-label="Maximize"
              >
                <Maximize size={14} />
              </button>
              <button
                onClick={onClose}
                className="p-1 hover:bg-red-100 rounded"
                aria-label="Close"
              >
                <X size={14} />
              </button>
            </div>
          </div>
          <div className="grow h-full overflow-hidden">
            <ChatWindow conversationId={conversationId} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
