'use client';

import {
  ConversationData,
  expandMessageNode,
  getConversationQuickReplies,
  getConversationResponse,
  getInitialMessage,
} from '@/lib/conversations';
import { useEffect, useRef } from 'react';

import { calculateTypingDelay } from '@/lib/typing-utils';
import { useChatActions } from '@/lib/chat-state';

export const useConversationFlow = (
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
    setIsTerminal,
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
    setIsTerminal(false);
    const initialState = conversation.initialState;
    const state = conversation.states[initialState];
    const messages = expandMessageNode(state.message);
    setMessages([{ sender: 'bot', text: messages[0] ?? '' }]);
    setCurrentState(initialState);

    if (messages.length <= 1) {
      return;
    }

    setIsWaitingForResponse(true);
    let accumulatedDelay = 0;
    const remaining = messages.slice(1);
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
  }, [
    conversation.id,
    reset,
    setMessages,
    setCurrentState,
    setIsWaitingForResponse,
    setIsTerminal,
  ]);

  const handleQuickReply = (
    replyText: string,
    nextState: string | undefined,
    message?: string | string[] | import('@/lib/conversations').MessageNode
  ) => {
    setAreQuickRepliesVisible(false);
    timeoutsRef.current.forEach(id => clearTimeout(id));
    timeoutsRef.current = [];

    let userMessages: string[];
    if (!message) {
      userMessages = [replyText];
    } else if (Array.isArray(message)) {
      userMessages = message;
    } else if (typeof message === 'string') {
      userMessages = [message];
    } else {
      userMessages = expandMessageNode(message);
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
        addMessage({ sender: 'user', text: msg });

        if (isLastUserMessage) {
          if (userMessages.length > 1) {
            setIsUserTyping(false);
          }
          if (nextState) {
            setIsTerminal(false);
            processBotResponse(nextState);
          } else {
            // No next state: mark conversation as terminal without mutating currentState
            setIsTerminal(true);
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

    if (response.type === 'single') {
      const single = response as {
        type: 'single';
        text: string;
        state: string;
      };
      const botDelay = calculateTypingDelay(single.text);
      const botResponseTimeoutId = window.setTimeout(() => {
        addMessage({ sender: 'bot', text: single.text });
        setIsWaitingForResponse(false);
      }, botDelay);
      timeoutsRef.current.push(botResponseTimeoutId);
      return;
    }

    let botAccumulatedDelay = 0;
    const sequence = response as {
      type: 'sequence';
      items: Array<string | string[]>;
      state: string;
    };
    sequence.items.forEach((item: string | string[], botIndex: number) => {
      const isLastBotMessage = botIndex === sequence.items.length - 1;
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

  const restartConversation = () => {
    const initialState = conversation.initialState;
    const state = (conversation as any).states?.[initialState];
    if (!state?.message) return;

    addMessage({ sender: 'bot', text: '__divider__' });
    setCurrentState(initialState);
    setAreQuickRepliesVisible(false);
    setIsTerminal(false);

    const messages = expandMessageNode(state.message);
    const first = messages[0] ?? '';
    addMessage({ sender: 'bot', text: first });

    const remaining = messages.slice(1);
    if (remaining.length > 0) {
      setIsWaitingForResponse(true);
      let accumulated = 0;
      remaining.forEach((item: string | string[], index: number) => {
        const text = Array.isArray(item) ? item[0] : item;
        const delay = calculateTypingDelay(text);
        accumulated += delay;
        window.setTimeout(() => {
          addMessage({ sender: 'bot', text });
          if (index === remaining.length - 1) {
            setIsWaitingForResponse(false);
          }
        }, accumulated);
      });
    }
  };

  return {
    handleQuickReply,
    currentQuickReplies,
    restartConversation,
  };
};
