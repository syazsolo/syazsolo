'use client';

import {
  ConversationData,
  conversationsData,
  getConversationQuickReplies,
  getConversationResponse,
  getInitialMessage,
} from '@/lib/conversations';
import { useEffect, useRef, useState } from 'react';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

const BOT_RESPONSE_DELAY_BASE = 600;
const BOT_RESPONSE_DELAY_PER_CHAR = 20;
const BOT_RESPONSE_DELAY_MAX = 3000;
const SCROLL_DELAY = 50;

const calculateTypingDelay = (text: string): number => {
  const charCount = text.length;
  const delay =
    BOT_RESPONSE_DELAY_BASE + charCount * BOT_RESPONSE_DELAY_PER_CHAR;
  return Math.min(delay, BOT_RESPONSE_DELAY_MAX);
};

export const useChat = (conversationId: string = 'syazani') => {
  const conversation: ConversationData =
    conversationsData[conversationId] || conversationsData.syazani;

  const [messages, setMessages] = useState<Message[]>([]);
  const [currentState, setCurrentState] = useState<string>('');
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [areQuickRepliesVisible, setAreQuickRepliesVisible] = useState(false);

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

    const initialState = conversation.initialState;
    const state = conversation.states[initialState];
    const message = getInitialMessage(state.message);
    setMessages([{ sender: 'bot', text: message }]);
    setCurrentState(initialState);

    const initial = conversation.states[conversation.initialState];
    if (!Array.isArray(initial.message) || initial.message.length <= 1) {
      lastScheduledConversationIdRef.current = conversation.id;
      return;
    }

    lastScheduledConversationIdRef.current = conversation.id;
    setIsWaitingForResponse(true);
    let accumulatedDelay = 0;
    const remaining = initial.message.slice(1);
    remaining.forEach((item, index) => {
      const text = Array.isArray(item) ? item[0] : item;
      const delay = calculateTypingDelay(text);
      accumulatedDelay += delay;
      const id = window.setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'bot', text }]);
        if (index === remaining.length - 1) {
          setIsWaitingForResponse(false);
        }
      }, accumulatedDelay);
      timeoutsRef.current.push(id);
    });
  }, [conversation.id]);

  useEffect(() => {
    const quickReplies = getConversationQuickReplies(
      conversation,
      currentState
    );

    if (isWaitingForResponse || isUserTyping || quickReplies.length === 0) {
      setAreQuickRepliesVisible(false);
      return;
    }

    const id = window.setTimeout(() => {
      setAreQuickRepliesVisible(true);
    }, 1000); // Delay before showing quick replies

    return () => clearTimeout(id);
  }, [isWaitingForResponse, isUserTyping, currentState, conversation]);

  const scrollToUserMessage = () => {
    requestAnimationFrame(() => {
      lastUserMessageRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  const handleQuickReply = (
    replyText: string,
    nextState: string,
    message?: string | string[]
  ) => {
    setAreQuickRepliesVisible(false);
    timeoutsRef.current.forEach(id => clearTimeout(id));
    timeoutsRef.current = [];

    const userMessages: string[] = [];
    if (message) {
      userMessages.push(...(Array.isArray(message) ? message : [message]));
    } else {
      userMessages.push(replyText);
    }

    if (userMessages.length > 1) {
      setIsUserTyping(true);
    }

    let accumulatedDelay = 0;
    userMessages.forEach((msg, index) => {
      const isLastUserMessage = index === userMessages.length - 1;
      const delay = userMessages.length > 1 ? calculateTypingDelay(msg) : 0;
      accumulatedDelay += delay;

      const userMessageTimeoutId = window.setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'user', text: msg }]);

        if (isLastUserMessage) {
          if (userMessages.length > 1) {
            setIsUserTyping(false);
          }

          if (!nextState) {
            return;
          }

          setIsWaitingForResponse(true);

          const response = getConversationResponse(conversation, nextState);
          setCurrentState(response.state);

          if (response.kind === 'single') {
            const botDelay = calculateTypingDelay(response.text);
            const botResponseTimeoutId = window.setTimeout(() => {
              setMessages(prev => [
                ...prev,
                { sender: 'bot', text: response.text },
              ]);
              setIsWaitingForResponse(false);
              setTimeout(scrollToUserMessage, SCROLL_DELAY);
            }, botDelay);
            timeoutsRef.current.push(botResponseTimeoutId);
            return;
          }

          let botAccumulatedDelay = 0;
          response.items.forEach((item, botIndex) => {
            const isLastBotMessage = botIndex === response.items.length - 1;
            const text = Array.isArray(item)
              ? item[Math.floor(Math.random() * item.length)]
              : item;
            const botDelay = calculateTypingDelay(text);
            botAccumulatedDelay += botDelay;
            const botSequenceTimeoutId = window.setTimeout(() => {
              setMessages(prev => [...prev, { sender: 'bot', text }]);
              if (isLastBotMessage) {
                setIsWaitingForResponse(false);
                setTimeout(scrollToUserMessage, SCROLL_DELAY);
              }
            }, botAccumulatedDelay);
            timeoutsRef.current.push(botSequenceTimeoutId);
          });
        }
      }, accumulatedDelay);
      timeoutsRef.current.push(userMessageTimeoutId);
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
    isUserTyping,
    areQuickRepliesVisible,
    messagesEndRef,
    lastUserMessageRef,
    currentQuickReplies,
    handleQuickReply,
  };
};
