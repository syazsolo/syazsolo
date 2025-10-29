'use client';

import {
  ConversationData,
  conversationsData,
  getConversationQuickReplies,
  getConversationResponse,
} from '@/lib/conversations';
import { useEffect, useRef, useState } from 'react';

import { MessageArea } from '@/components/Messaging/MessageArea';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

const BOT_RESPONSE_DELAY = 1000;
const SCROLL_DELAY = 50;

const getInitialMessage = (conversation: ConversationData) => {
  const initialState = conversation.initialState;
  const state = conversation.states[initialState];
  const message = Array.isArray(state.message)
    ? state.message[Math.floor(Math.random() * state.message.length)]
    : state.message;
  return { message, state: initialState };
};

export const Chat = ({
  conversationId = 'syazani',
}: {
  conversationId?: string;
}) => {
  const conversation: ConversationData =
    conversationsData[conversationId] || conversationsData.syazani;

  const [messages, setMessages] = useState<Message[]>(() => {
    const { message } = getInitialMessage(conversation);
    return [{ sender: 'bot', text: message }];
  });

  const [currentState, setCurrentState] = useState<string>(
    () => getInitialMessage(conversation).state
  );

  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastUserMessageRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="bg-background text-foreground h-full flex flex-col">
      <MessageArea
        messages={messages}
        conversation={conversation}
        lastUserMessageRef={lastUserMessageRef}
        messagesEndRef={messagesEndRef}
        quickReplies={currentQuickReplies}
        onQuickReply={handleQuickReply}
        isWaitingForResponse={isWaitingForResponse}
      />
    </div>
  );
};
