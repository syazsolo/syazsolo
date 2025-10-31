import ednaConversation from './data/conversations/edna.json';
import soloConversation from './data/conversations/solo.json';
import syazaniConversation from './data/conversations/syazani.json';

export interface QuickReply {
  text: string;
  nextState?: string;
  message?: string | string[] | MessageNode;
}

export type MessageNode =
  | { type: 'single'; text: string }
  | { type: 'sequence'; items: string[] }
  | { type: 'random'; items: string[] };

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

// Directed graph schema (alternative JSON shape)
export interface GraphNode {
  id: string;
  message: MessageNode;
}

export interface GraphEdge {
  from: string;
  to?: string; // optional: omit to end the conversation after this reply
  label: string; // shown as quick reply text
  message?: string | string[] | MessageNode; // optional user echo before transition
}

export interface GraphConversationData {
  id: string;
  name: string;
  avatar: string;
  initialState: string; // should match a node id
  nodes: GraphNode[];
  edges: GraphEdge[];
}

const isGraphConversation = (data: any): data is GraphConversationData =>
  !!data && Array.isArray(data.nodes) && Array.isArray(data.edges);

const normalizeConversation = (data: any): ConversationData => {
  if (!isGraphConversation(data)) return data as ConversationData;

  const states: Record<string, ConversationState> = {};

  // Initialize states from nodes
  for (const node of data.nodes) {
    states[node.id] = { message: node.message, quickReplies: [] };
  }

  // Build quick replies from outgoing edges
  for (const edge of data.edges) {
    const fromState = states[edge.from];
    if (!fromState) continue;
    const reply: QuickReply = {
      text: edge.label,
      nextState: edge.to,
      message: edge.message,
    };
    fromState.quickReplies = [...(fromState.quickReplies ?? []), reply];
  }

  return {
    id: data.id,
    name: data.name,
    avatar: data.avatar,
    initialState: data.initialState,
    states,
  } as ConversationData;
};

export const expandMessageNode = (node: MessageNode): string[] => {
  if (node.type === 'single') {
    return [node.text];
  }
  if (node.type === 'sequence') {
    return node.items;
  }
  // random
  const items = node.items;
  const choice = items[Math.floor(Math.random() * items.length)] ?? '';
  return [choice];
};

const defaultConversationsData: Record<string, ConversationData> = {
  syazani: normalizeConversation(syazaniConversation),
  solo: normalizeConversation(soloConversation),
  edna: normalizeConversation(ednaConversation),
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
  const items = node.items;
  const choice = items[Math.floor(Math.random() * items.length)] ?? '';
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
  const choice =
    message.items[Math.floor(Math.random() * message.items.length)] ?? '';
  return choice;
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
