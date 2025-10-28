import syazaniConversation from './data/conversations/syazani.json';
import soloConversation from './data/conversations/solo.json';

export interface ConversationState {
  message: string | string[];
  quickReplies: Array<{
    text: string;
    nextState: string;
  }>;
}

export interface ConversationData {
  id: string;
  name: string;
  avatar: string;
  initialState: string;
  states: Record<string, ConversationState>;
}

export const getConversationResponse = (
  conversationId: string,
  nextState: string
): { text: string; nextState: string } => {
  const conversation = conversationsData[conversationId];
  if (!conversation?.states) {
    return { text: 'Thanks for your message!', nextState: '' };
  }

  const state = conversation.states[nextState];
  if (!state?.message) {
    return { text: 'Thanks for your message!', nextState: '' };
  }

  if (Array.isArray(state.message)) {
    const randomIndex = Math.floor(Math.random() * state.message.length);
    return {
      text: state.message[randomIndex],
      nextState,
    };
  }

  return {
    text: state.message,
    nextState,
  };
};

export const getConversationQuickReplies = (
  conversationId: string,
  currentState: string
): Array<{ text: string; nextState: string }> => {
  const conversation = conversationsData[conversationId];
  if (!conversation?.states) {
    return [];
  }

  const state = conversation.states[currentState];
  return state?.quickReplies || [];
};

export const conversationsData: Record<string, ConversationData> = {
  syazani: syazaniConversation as ConversationData,
  solo: soloConversation as ConversationData,
  ...(process.env.NODE_ENV === 'test' && {
    'test-bot':
      require('../__tests__/fixtures/mock-conversation.json') as ConversationData,
  }),
};
