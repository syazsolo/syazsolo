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

const BOT_RESPONSE_DELAY = 1000;
const SCROLL_DELAY = 50;

export const ChatWindow = ({
  conversationId = 'syazani',
}: {
  conversationId?: string;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentState, setCurrentState] = useState<string>('');
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastUserMessageRef = useRef<HTMLDivElement>(null);
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
    if (messages.length === 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const scrollToUserMessage = () => {
    requestAnimationFrame(() => {
      lastUserMessageRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  const handleQuickReply = (replyText: string, nextState: string) => {
    setIsWaitingForResponse(true);

    setMessages(prev => [
      ...prev,
      {
        sender: 'user',
        text: replyText,
      },
    ]);

    setTimeout(() => {
      const response = getConversationResponse(conversation, nextState);

      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: response.text,
        },
      ]);

      setCurrentState(response.state);
      setIsWaitingForResponse(false);

      setTimeout(scrollToUserMessage, SCROLL_DELAY);
    }, BOT_RESPONSE_DELAY);
  };

  const currentQuickReplies = getConversationQuickReplies(
    conversation,
    currentState
  );

  const lastUserMessageIndex = messages.findLastIndex(m => m.sender === 'user');

  return (
    <div className="bg-white h-full flex flex-col">
      <div className="grow px-3 pt-4 pb-3 overflow-y-auto space-y-3">
        {messages.map((msg, index) => {
          const isLastUserMessage = index === lastUserMessageIndex;
          const isUser = msg.sender === 'user';

          return (
            <div
              key={index}
              ref={isLastUserMessage ? lastUserMessageRef : null}
              className={`flex items-start gap-2 ${
                isUser ? 'justify-end' : ''
              }`}
            >
              {!isUser && (
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
                    isUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
              {isUser && (
                <Avatar className="w-6 h-6">
                  <AvatarImage src="/logo.png" alt="You" />
                  <AvatarFallback>Y</AvatarFallback>
                </Avatar>
              )}
            </div>
          );
        })}

        {!isWaitingForResponse &&
          currentQuickReplies &&
          currentQuickReplies.length > 0 && (
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
