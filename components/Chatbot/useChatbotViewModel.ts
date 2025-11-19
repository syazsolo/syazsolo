'use client';

import { ConversationData, conversationsData } from '@/lib/chat/conversations';
import {
  useAreQuickRepliesVisible,
  useChatActions,
  useChatMessages,
  useCurrentState,
  useIsUserTyping,
  useIsWaitingForResponse,
  useIsTerminal,
} from '@/lib/chat/state';
import { useEffect, useRef } from 'react';

import { isEndOfConversation } from '@/lib/chat/utils';
import { useChatbotConversationFlow } from '@/components/Chatbot/useChatbotConversationFlow';

const SCROLL_DELAY = 50;

export const useChatbotViewModel = (conversationId: string = 'syazani') => {
  const conversation: ConversationData =
    conversationsData[conversationId] || conversationsData.syazani;

  const messages = useChatMessages(conversationId);
  const currentState = useCurrentState(conversationId);
  const isWaitingForResponse = useIsWaitingForResponse(conversationId);
  const isUserTyping = useIsUserTyping(conversationId);
  const areQuickRepliesVisible = useAreQuickRepliesVisible(conversationId);
  const isTerminal = useIsTerminal(conversationId);
  const { setAreQuickRepliesVisible, init } = useChatActions(conversationId);

  const { handleQuickReply, currentQuickReplies, restartConversation } =
    useChatbotConversationFlow(conversation, currentState, conversationId);

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
      if (lastMessage.type === 'message' && lastMessage.sender === 'user') {
        setTimeout(scrollToUserMessage, SCROLL_DELAY);
      }
    }
  }, [messages]);

  const endOfConversation = isEndOfConversation({
    currentQuickRepliesCount: currentQuickReplies.length,
    isWaitingForResponse,
    isUserTyping,
    lastMessageSender:
      messages[messages.length - 1]?.type === 'message'
        ? (messages[messages.length - 1] as any).sender
        : undefined,
  });
  const effectiveEndOfConversation = isTerminal || endOfConversation;

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
    endOfConversation: effectiveEndOfConversation,
    restartConversation,
  };
};
