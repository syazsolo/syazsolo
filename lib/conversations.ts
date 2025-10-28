import soloConversation from './data/conversations/solo.json';
import syazaniConversation from './data/conversations/syazani.json';

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

const defaultConversationsData: Record<string, ConversationData> = {
  syazani: syazaniConversation as ConversationData,
  solo: soloConversation as ConversationData,
};

export const conversationsData = defaultConversationsData;

export const getConversationResponse = (
  conversation: ConversationData,
  currentState: string
): { text: string; nextState: string } => {
  if (!conversation?.states) {
    return { text: 'Thanks for your message!', nextState: '' };
  }

  const state = conversation.states[currentState];
  if (!state?.message) {
    return { text: 'Thanks for your message!', nextState: '' };
  }

  if (Array.isArray(state.message)) {
    const randomIndex = Math.floor(Math.random() * state.message.length);
    return {
      text: state.message[randomIndex],
      nextState: currentState,
    };
  }

  return {
    text: state.message,
    nextState: currentState,
  };
};

export const getConversationQuickReplies = (
  conversation: ConversationData,
  currentState: string
): Array<{ text: string; nextState: string }> => {
  if (!conversation?.states) {
    return [];
  }

  const state = conversation.states[currentState];
  return state?.quickReplies || [];
};
