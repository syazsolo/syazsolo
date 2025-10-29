'use client';

import { ConversationData, conversationsData } from '@/lib/conversations';
import {
  useAreQuickRepliesVisible,
  useChatActions,
  useChatMessages,
  useCurrentState,
  useIsUserTyping,
  useIsWaitingForResponse,
} from '@/lib/chat-state';
import { useEffect, useRef } from 'react';

import { useChatLogic } from '@/components/Messaging/useChatLogic';

const SCROLL_DELAY = 50;

export const useChat = (conversationId: string = 'syazani') => {
  const conversation: ConversationData =
    conversationsData[conversationId] || conversationsData.syazani;

  const messages = useChatMessages(conversationId);
  const currentState = useCurrentState(conversationId);
  const isWaitingForResponse = useIsWaitingForResponse(conversationId);
  const isUserTyping = useIsUserTyping(conversationId);
  const areQuickRepliesVisible = useAreQuickRepliesVisible(conversationId);
  const { setAreQuickRepliesVisible, init } = useChatActions(conversationId);

  const { handleQuickReply, currentQuickReplies } = useChatLogic(
    conversation,
    currentState,
    conversationId
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastUserMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (messages.length === 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (
      isWaitingForResponse ||
      isUserTyping ||
      currentQuickReplies.length === 0
    ) {
      setAreQuickRepliesVisible(false);
      return;
    }

    const id = window.setTimeout(() => {
      setAreQuickRepliesVisible(true);
    }, 1000);

    return () => clearTimeout(id);
  }, [
    isWaitingForResponse,
    isUserTyping,
    currentQuickReplies,
    setAreQuickRepliesVisible,
  ]);

  useEffect(() => {
    const scrollToUserMessage = () => {
      requestAnimationFrame(() => {
        lastUserMessageRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    };

    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender === 'user') {
        setTimeout(scrollToUserMessage, SCROLL_DELAY);
      }
    }
  }, [messages]);

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
