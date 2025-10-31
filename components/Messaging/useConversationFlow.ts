'use client';

import {
  ConversationData,
  MessageNode,
  RandomNode,
  getConversationQuickReplies,
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
  const isProcessingRef = useRef<boolean>(false);

  const clearTimeouts = () => {
    timeoutsRef.current.forEach(id => clearTimeout(id));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    return clearTimeouts;
  }, []);

  const processNode = (node: MessageNode) => {
    setIsWaitingForResponse(true);

    const schedule = (n: MessageNode, baseDelay: number): number => {
      if (typeof n === 'string' || (n as any).type === 'embed') {
        const text = typeof n === 'string' ? n : ''; // No typing delay for embeds
        const delay = calculateTypingDelay(text);
        const totalDelay = baseDelay + delay;
        const id = window.setTimeout(() => {
          addMessage({ type: 'message', sender: 'bot', content: n });
        }, totalDelay);
        timeoutsRef.current.push(id);
        return delay;
      }

      if (Array.isArray(n)) {
        let accumulatedSequenceDelay = 0;
        for (const subNode of n) {
          accumulatedSequenceDelay += schedule(
            subNode,
            baseDelay + accumulatedSequenceDelay
          );
        }
        return accumulatedSequenceDelay;
      }

      if ((n as any).type === 'random') {
        const choice = (n as RandomNode).items[
          Math.floor(Math.random() * (n as RandomNode).items.length)
        ];
        return schedule(choice, baseDelay);
      }
      return 0;
    };

    const totalDuration = schedule(node, 0);

    const finalTimeoutId = window.setTimeout(() => {
      setIsWaitingForResponse(false);
    }, totalDuration);
    timeoutsRef.current.push(finalTimeoutId);
  };

  useEffect(() => {
    reset();
    setIsTerminal(false);
    const initialState = conversation.initialState;
    const state = conversation.states[initialState];
    if (state) {
      setCurrentState(initialState);
      processNode(state.message);
    }
  }, [conversation.id, reset, setCurrentState, setIsTerminal]);

  const handleQuickReply = (
    replyText: string,
    nextState: string | undefined,
    message?: string | string[] | MessageNode
  ) => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;

    setAreQuickRepliesVisible(false);
    clearTimeouts();

    const transitionTo = (state: string | undefined) => {
      if (state) {
        setCurrentState(state);
        setIsTerminal(false);
        const nextNode = conversation.states[state]?.message;
        if (nextNode) {
          processNode(nextNode);
        }
      } else {
        setIsTerminal(true);
      }
      isProcessingRef.current = false;
    };

    if (Array.isArray(message) && message.every(m => typeof m === 'string')) {
      setIsUserTyping(true);
      let accumulatedDelay = 0;
      (message as string[]).forEach(part => {
        const delay = calculateTypingDelay(part);
        const timeoutId = window.setTimeout(
          () => addMessage({ type: 'message', sender: 'user', content: part }),
          accumulatedDelay + delay
        );
        timeoutsRef.current.push(timeoutId);
        accumulatedDelay += delay;
      });

      const finalTimeoutId = window.setTimeout(() => {
        setIsUserTyping(false);
        transitionTo(nextState);
      }, accumulatedDelay);
      timeoutsRef.current.push(finalTimeoutId);
    } else {
      const userMessageContent: MessageNode =
        typeof message === 'string' ? message : replyText;
      addMessage({
        type: 'message',
        sender: 'user',
        content: userMessageContent,
      });
      transitionTo(nextState);
    }
  };

  const restartConversation = () => {
    const initialState = conversation.initialState;
    const state = (conversation as any).states?.[initialState];
    if (!state?.message) return;

    addMessage({ type: 'divider' });
    setCurrentState(initialState);
    setAreQuickRepliesVisible(false);
    setIsTerminal(false);
    processNode(state.message);
  };

  const currentQuickReplies = getConversationQuickReplies(
    conversation,
    currentState
  );

  return {
    handleQuickReply,
    currentQuickReplies,
    restartConversation,
  };
};
