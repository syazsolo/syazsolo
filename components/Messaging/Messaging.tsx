'use client';

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

import React from 'react';
import { conversationsData } from '@/lib/conversations';

export const Messaging = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedConversation, setSelectedConversation] = React.useState<
    string | null
  >(null);
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [isChatMaximized, setIsChatMaximized] = React.useState(false);

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversation(conversationId);
    if (conversationId === 'bot' || conversationId === 'sponsored') {
      setIsChatOpen(true);
    }
  };

  return (
    <>
      {/* LinkedIn-style Messaging Container - Fixed to bottom-right corner */}
      <div className="fixed bottom-0 right-4 z-40 w-auto ml-4">
        {/* Message Bar Header */}
        <div className="flex items-center h-12 px-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-t-lg shadow-lg transition-colors">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center flex-1 text-left"
            aria-label={isOpen ? 'Close messaging' : 'Open messaging'}
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
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
              aria-label={isOpen ? 'Minimize' : 'Expand'}
            >
              {isOpen ? (
                <ChevronDown size={16} className="text-gray-700" />
              ) : (
                <ChevronUp size={16} className="text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Expanded Messaging Box */}
        {isOpen && (
          <div className="w-72 h-96 bg-white border-l border-r border-gray-300 shadow-lg">
            <ChatList onSelectConvo={handleSelectConversation} />
          </div>
        )}
      </div>

      {/* Separate Chat Window */}
      {isChatOpen && (
        <div
          className={`fixed z-50 ${isChatMaximized ? 'inset-0' : 'bottom-4 right-80'}`}
        >
          <div
            className={`bg-white border border-gray-300 shadow-2xl text-gray-900 flex flex-col ${isChatMaximized ? 'w-full h-full' : 'w-80 h-96'} rounded-lg`}
          >
            <div className="flex items-center justify-between p-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <img
                  src={
                    conversationsData[selectedConversation || 'bot']?.avatar ||
                    '/acak.jpg'
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
                  onClick={() => setIsChatOpen(false)}
                  className="p-1 hover:bg-gray-200 rounded"
                  aria-label="Minimize"
                >
                  <Minus size={14} />
                </button>
                <button
                  onClick={() => setIsChatMaximized(!isChatMaximized)}
                  className="p-1 hover:bg-gray-200 rounded"
                  aria-label="Maximize"
                >
                  <Maximize size={14} />
                </button>
                <button
                  onClick={() => setIsChatOpen(false)}
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
          </div>
        </div>
      )}
    </>
  );
};
