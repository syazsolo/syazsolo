import soloConversation from './data/conversations/solo.json';
import syazaniConversation from './data/conversations/syazani.json';

export interface QuickReply {
  text: string;
  nextState: string;
}

export interface ConversationState {
  message: string | string[];
  quickReplies: QuickReply[];
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
): { text: string; state: string } => {
  if (!conversation?.states) {
    return {
      text: "Sorry, something went wrong. Let's start over.",
      state: conversation?.initialState || '',
    };
  }

  const state = conversation.states[currentState];
  if (!state?.message) {
    return {
      text: "Sorry, I don't understand that. Let's start over.",
      state: conversation.initialState,
    };
  }

  if (Array.isArray(state.message)) {
    const randomIndex = Math.floor(Math.random() * state.message.length);
    return {
      text: state.message[randomIndex],
      state: currentState,
    };
  }

  return {
    text: state.message,
    state: currentState,
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
