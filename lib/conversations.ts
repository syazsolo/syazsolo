import soloConversation from './data/conversations/solo.json';
import syazaniConversation from './data/conversations/syazani.json';

export interface QuickReply {
  text: string;
  nextState: string;
  message?: string | string[];
}

export interface ConversationState {
  // string = single; array = sequence; array items can be string | string[]
  message: string | Array<string | string[]>;
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

export type ConversationResponse =
  | { kind: 'single'; text: string; state: string }
  | { kind: 'sequence'; items: Array<string | string[]>; state: string };

export const getConversationResponse = (
  conversation: ConversationData,
  currentState: string
): ConversationResponse => {
  if (!conversation?.states) {
    return {
      kind: 'single',
      text: "Sorry, something went wrong. Let's start over.",
      state: conversation?.initialState || '',
    };
  }

  const state = conversation.states[currentState];
  if (!state?.message) {
    return {
      kind: 'single',
      text: "Sorry, I don't understand that. Let's start over.",
      state: conversation.initialState,
    };
  }

  if (Array.isArray(state.message)) {
    return {
      kind: 'sequence',
      items: state.message,
      state: currentState,
    };
  }

  return {
    kind: 'single',
    text: state.message,
    state: currentState,
  };
};

export const getInitialMessage = (
  message: string | Array<string | string[]>
): string => {
  if (!Array.isArray(message)) return message;
  const first = message[0];
  return Array.isArray(first) ? first[0] : first;
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
