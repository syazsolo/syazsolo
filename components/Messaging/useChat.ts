'use client';

import {
  ConversationData,
  conversationsData,
  getConversationQuickReplies,
  getConversationResponse,
} from '@/lib/conversations';
import { useEffect, useRef, useState } from 'react';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

const BOT_RESPONSE_DELAY = 1000;
const SCROLL_DELAY = 50;

const getInitialMessage = (conversation: ConversationData) => {
  const initialState = conversation.initialState;
  const state = conversation.states[initialState];
  // If the initial state's message is a sequence, start with the first item deterministically
  const message = Array.isArray(state.message)
    ? (() => {
        const first = state.message[0];
        return Array.isArray(first) ? first[0] : first;
      })()
    : state.message;
  return { message, state: initialState };
};

export const useChat = (conversationId: string = 'syazani') => {
  const conversation: ConversationData =
    conversationsData[conversationId] || conversationsData.syazani;

  const [messages, setMessages] = useState<Message[]>([]);
  const [currentState, setCurrentState] = useState<string>('');
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastUserMessageRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<number[]>([]);
  const lastScheduledConversationIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (messages.length === 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    return () => {
      // Cleanup any pending timeouts on unmount
      timeoutsRef.current.forEach(id => clearTimeout(id));
      timeoutsRef.current = [];
    };
  }, []);

  // Reset and schedule initial sequence whenever the conversation changes
  useEffect(() => {
    // cancel any pending timeouts from previous conversation
    timeoutsRef.current.forEach(id => clearTimeout(id));
    timeoutsRef.current = [];

    const { message, state: initialState } = getInitialMessage(conversation);
    setMessages([{ sender: 'bot', text: message }]);
    setCurrentState(initialState);

    const initial = conversation.states[conversation.initialState];
    if (!Array.isArray(initial.message) || initial.message.length <= 1) {
      lastScheduledConversationIdRef.current = conversation.id;
      return;
    }

    lastScheduledConversationIdRef.current = conversation.id;
    setIsWaitingForResponse(true);
    let accumulatedDelay = BOT_RESPONSE_DELAY;
    const remaining = initial.message.slice(1);
    remaining.forEach((item, index) => {
      const id = window.setTimeout(() => {
        const text = Array.isArray(item) ? item[0] : item;
        setMessages(prev => [...prev, { sender: 'bot', text }]);
        if (index === remaining.length - 1) {
          setIsWaitingForResponse(false);
        }
      }, accumulatedDelay);
      timeoutsRef.current.push(id);
      accumulatedDelay += BOT_RESPONSE_DELAY;
    });
  }, [conversation.id]);

  const scrollToUserMessage = () => {
    requestAnimationFrame(() => {
      lastUserMessageRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  const handleQuickReply = (replyText: string, nextState: string) => {
    // Cancel any in-flight scheduled messages
    timeoutsRef.current.forEach(id => clearTimeout(id));
    timeoutsRef.current = [];

    setIsWaitingForResponse(true);

    setMessages(prev => [
      ...prev,
      {
        sender: 'user',
        text: replyText,
      },
    ]);

    const response = getConversationResponse(conversation, nextState);
    setCurrentState(response.state);

    if (response.kind === 'single') {
      const id = window.setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            sender: 'bot',
            text: response.text,
          },
        ]);

        setIsWaitingForResponse(false);
        setTimeout(scrollToUserMessage, SCROLL_DELAY);
      }, BOT_RESPONSE_DELAY);
      timeoutsRef.current.push(id);
      return;
    }

    // Sequence: schedule each item one second apart
    let accumulatedDelay = BOT_RESPONSE_DELAY;
    response.items.forEach((item, index) => {
      const id = window.setTimeout(() => {
        const text = Array.isArray(item)
          ? item[Math.floor(Math.random() * item.length)]
          : item;

        setMessages(prev => [
          ...prev,
          {
            sender: 'bot',
            text,
          },
        ]);

        if (index === response.items.length - 1) {
          setIsWaitingForResponse(false);
          setTimeout(scrollToUserMessage, SCROLL_DELAY);
        }
      }, accumulatedDelay);
      timeoutsRef.current.push(id);
      accumulatedDelay += BOT_RESPONSE_DELAY;
    });
  };

  const currentQuickReplies = getConversationQuickReplies(
    conversation,
    currentState
  );

  return {
    conversation,
    messages,
    isWaitingForResponse,
    messagesEndRef,
    lastUserMessageRef,
    currentQuickReplies,
    handleQuickReply,
  };
};
