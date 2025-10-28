'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ConversationData,
  conversationsData,
  getConversationQuickReplies,
  getConversationResponse,
} from '@/lib/conversations';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';

type Message = {
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
};

export const ChatWindow = ({
  conversationId = 'bot',
}: {
  conversationId?: string;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentState, setCurrentState] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversation: ConversationData =
    conversationsData[conversationId] || conversationsData.bot;

  useEffect(() => {
    setMessages(conversation.messages);
    setCurrentState(conversation.initialState);
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleQuickReply = (replyId: string) => {
    // Get current quick replies to find the text
    const quickReplies = getConversationQuickReplies(
      conversationId,
      currentState
    );
    const reply = quickReplies.find(r => r.id === replyId);
    const replyText = reply?.text || replyId;

    // Add user message
    setMessages(prev => [
      ...prev,
      {
        sender: 'user',
        text: replyText,
        timestamp: 'Just now',
      },
    ]);

    // Get bot response from conversation data
    setTimeout(() => {
      const response = getConversationResponse(
        conversationId,
        replyId,
        currentState
      );

      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: response.text,
          timestamp: 'Just now',
        },
      ]);

      // Update state if there's a next state
      if (response.nextState) {
        setCurrentState(response.nextState);
      }
    }, 1000);
  };

  // Get current quick replies based on state
  const currentQuickReplies = getConversationQuickReplies(
    conversationId,
    currentState
  );

  return (
    <div className="bg-white h-full flex flex-col">
      <div className="grow p-3 overflow-y-auto space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 ${
              msg.sender === 'user' ? 'justify-end' : ''
            }`}
          >
            {msg.sender === 'bot' && (
              <Avatar className="w-6 h-6">
                <AvatarImage
                  src={conversation.avatar}
                  alt={conversation.name}
                />
                <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            <div className="flex flex-col max-w-[80%]">
              <div
                className={`rounded-2xl px-3 py-2 text-sm ${
                  msg.sender === 'bot'
                    ? 'bg-gray-100 text-gray-900'
                    : 'bg-blue-600 text-white'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-xs text-gray-500 mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
            {msg.sender === 'user' && (
              <Avatar className="w-6 h-6">
                <AvatarImage src="/logo.png" alt="You" />
                <AvatarFallback>Y</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}

        {/* Quick Reply Options */}
        {currentQuickReplies && currentQuickReplies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {currentQuickReplies.map(reply => (
              <Button
                key={reply.id}
                variant="outline"
                className="bg-gray-100 border-gray-300 hover:bg-gray-200 text-xs text-gray-700"
                onClick={() => handleQuickReply(reply.id)}
              >
                {reply.text}
              </Button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
