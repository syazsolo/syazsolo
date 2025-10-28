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
};

export const ChatWindow = ({
  conversationId = 'syazani',
}: {
  conversationId?: string;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentState, setCurrentState] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversation: ConversationData =
    conversationsData[conversationId] || conversationsData.syazani;

  useEffect(() => {
    const initialState = conversation.initialState;
    const state = conversation.states[initialState];
    const initialMessage = Array.isArray(state.message)
      ? state.message[Math.floor(Math.random() * state.message.length)]
      : state.message;

    setMessages([
      {
        sender: 'bot',
        text: initialMessage,
      },
    ]);
    setCurrentState(initialState);
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleQuickReply = (replyText: string, nextState: string) => {
    setMessages(prev => [
      ...prev,
      {
        sender: 'user',
        text: replyText,
      },
    ]);

    setTimeout(() => {
      const response = getConversationResponse(conversationId, nextState);

      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: response.text,
        },
      ]);

      setCurrentState(response.nextState);
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
            </div>
            {msg.sender === 'user' && (
              <Avatar className="w-6 h-6">
                <AvatarImage src="/logo.png" alt="You" />
                <AvatarFallback>Y</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}

        {currentQuickReplies && currentQuickReplies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {currentQuickReplies.map((reply, index) => (
              <Button
                key={`${reply.nextState}-${index}`}
                variant="outline"
                className="bg-gray-100 border-gray-300 hover:bg-gray-200 text-xs text-gray-700"
                onClick={() => handleQuickReply(reply.text, reply.nextState)}
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
