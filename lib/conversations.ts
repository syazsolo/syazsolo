import soloConversation from './data/conversations/solo.json';
import syazaniConversation from './data/conversations/syazani.json';

export interface QuickReply {
  text: string;
  nextState?: string;
  message?: string | string[];
}

export type MessageNode =
  | { type: 'single'; text: string }
  | { type: 'sequence'; items: string[] }
  | { type: 'random'; options: string[] };

export interface ConversationState {
  // New explicit message node schema
  message: MessageNode;
  quickReplies?: QuickReply[];
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
  | { type: ConversationType; text: string; state: string }
  | { type: ConversationType; items: Array<string | string[]>; state: string };

export const CONVERSATION_TYPE = {
  SINGLE: 'single',
  SEQUENCE: 'sequence',
} as const;

export type ConversationType =
  (typeof CONVERSATION_TYPE)[keyof typeof CONVERSATION_TYPE];

export const getConversationResponse = (
  conversation: ConversationData,
  currentState: string
): ConversationResponse => {
  if (!conversation?.states) {
    return {
      type: CONVERSATION_TYPE.SINGLE,
      text: "Sorry, something went wrong. Let's start over.",
      state: conversation?.initialState || '',
    };
  }

  const state = conversation.states[currentState];
  if (!state?.message) {
    return {
      type: CONVERSATION_TYPE.SINGLE,
      text: "Sorry, I don't understand that. Let's start over.",
      state: conversation.initialState,
    };
  }

  const node = state.message;
  if (node.type === 'single') {
    return {
      type: CONVERSATION_TYPE.SINGLE,
      text: node.text,
      state: currentState,
    };
  }
  if (node.type === 'sequence') {
    return {
      type: CONVERSATION_TYPE.SEQUENCE,
      items: node.items,
      state: currentState,
    };
  }
  // random -> pick one
  const options = node.options;
  const choice = options[Math.floor(Math.random() * options.length)] ?? '';
  return {
    type: CONVERSATION_TYPE.SINGLE,
    text: choice,
    state: currentState,
  };
};

export const getInitialMessage = (message: MessageNode): string => {
  if (message.type === 'single') return message.text;
  if (message.type === 'sequence') return message.items[0] ?? '';
  // random
  return message.options[0] ?? '';
};

export const getConversationQuickReplies = (
  conversation: ConversationData,
  currentState: string
): QuickReply[] => {
  if (!conversation?.states) {
    return [];
  }

  const state = conversation.states[currentState];
  return state?.quickReplies || [];
};
