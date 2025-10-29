import {
  ConversationData,
  getConversationQuickReplies,
  getConversationResponse,
  getInitialMessage,
} from '@/lib/conversations';
import { useEffect, useRef } from 'react';

import { useChatActions } from '@/lib/chat-state';

const BOT_RESPONSE_DELAY_BASE = 600;
const BOT_RESPONSE_DELAY_PER_CHAR = 20;
const BOT_RESPONSE_DELAY_MAX = 3000;

const calculateTypingDelay = (text: string): number => {
  const charCount = text.length;
  const delay =
    BOT_RESPONSE_DELAY_BASE + charCount * BOT_RESPONSE_DELAY_PER_CHAR;
  return Math.min(delay, BOT_RESPONSE_DELAY_MAX);
};

export const useChatLogic = (
  conversation: ConversationData,
  currentState: string,
  conversationId: string
) => {
  const {
    setMessages,
    addMessage,
    setCurrentState,
    setIsWaitingForResponse,
    setIsUserTyping,
    setAreQuickRepliesVisible,
    reset,
  } = useChatActions(conversationId);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(id => clearTimeout(id));
      timeoutsRef.current = [];
    };
  }, []);

  useEffect(() => {
    reset();
    const initialState = conversation.initialState;
    const state = conversation.states[initialState];
    const message = getInitialMessage(state.message);
    setMessages([{ sender: 'bot', text: message }]);
    setCurrentState(initialState);

    if (!Array.isArray(state.message) || state.message.length <= 1) {
      return;
    }

    setIsWaitingForResponse(true);
    let accumulatedDelay = 0;
    const remaining = state.message.slice(1);
    remaining.forEach((item, index) => {
      const text = Array.isArray(item) ? item[0] : item;
      const delay = calculateTypingDelay(text);
      accumulatedDelay += delay;
      const id = window.setTimeout(() => {
        addMessage({ sender: 'bot', text });
        if (index === remaining.length - 1) {
          setIsWaitingForResponse(false);
        }
      }, accumulatedDelay);
      timeoutsRef.current.push(id);
    });
  }, [conversation.id]);

  const handleQuickReply = (
    replyText: string,
    nextState: string | undefined,
    message?: string | string[]
  ) => {
    setAreQuickRepliesVisible(false);
    timeoutsRef.current.forEach(id => clearTimeout(id));
    timeoutsRef.current = [];

    const userMessages = Array.isArray(message)
      ? message
      : message
        ? [message]
        : [replyText];

    if (userMessages.length > 1) {
      setIsUserTyping(true);
    }

    let accumulatedDelay = 0;
    userMessages.forEach((msg, index) => {
      const isLastUserMessage = index === userMessages.length - 1;
      const delay = userMessages.length > 1 ? calculateTypingDelay(msg) : 0;
      accumulatedDelay += delay;

      const userMessageTimeoutId = window.setTimeout(() => {
        addMessage({ sender: 'user', text: msg });

        if (isLastUserMessage) {
          if (userMessages.length > 1) {
            setIsUserTyping(false);
          }
          if (nextState) {
            processBotResponse(nextState);
          }
        }
      }, accumulatedDelay);
      timeoutsRef.current.push(userMessageTimeoutId);
    });
  };

  const processBotResponse = (nextState: string) => {
    setIsWaitingForResponse(true);
    const response = getConversationResponse(conversation, nextState);
    setCurrentState(response.state);

    if (response.kind === 'single') {
      const botDelay = calculateTypingDelay(response.text);
      const botResponseTimeoutId = window.setTimeout(() => {
        addMessage({ sender: 'bot', text: response.text });
        setIsWaitingForResponse(false);
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
        addMessage({ sender: 'bot', text });
        if (isLastBotMessage) {
          setIsWaitingForResponse(false);
        }
      }, botAccumulatedDelay);
      timeoutsRef.current.push(botSequenceTimeoutId);
    });
  };

  const currentQuickReplies = getConversationQuickReplies(
    conversation,
    currentState
  );

  return {
    handleQuickReply,
    currentQuickReplies,
  };
};
