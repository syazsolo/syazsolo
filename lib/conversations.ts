import ednaConversation from './data/conversations/edna.json';
import soloConversation from './data/conversations/solo.json';
import syazaniConversation from './data/conversations/syazani.json';

export interface QuickReply {
  text: string;
  nextState?: string;
  message?: string | string[] | MessageNode;
}

// Minimal recursive message algebra
export type EmbedProvider = 'youtube';

export type EmbedNode = {
  type: 'embed';
  provider: EmbedProvider;
  url: string;
  preview?: string;
};

export type RandomNode = { type: 'random'; items: MessageNode[] };

export type MessageNode = string | EmbedNode | RandomNode | MessageNode[];

export interface ConversationState {
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
  from: string | string[];
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
    const fromNodes = Array.isArray(edge.from) ? edge.from : [edge.from];
    const reply: QuickReply = {
      text: edge.label,
      nextState: edge.to,
      message: edge.message,
    };
    for (const fromNode of fromNodes) {
      const fromState = states[fromNode];
      if (!fromState) continue;
      fromState.quickReplies = [...(fromState.quickReplies ?? []), reply];
    }
  }

  return {
    id: data.id,
    name: data.name,
    avatar: data.avatar,
    initialState: data.initialState,
    states,
  } as ConversationData;
};

// Helpers
export const isEmbedNode = (n: unknown): n is EmbedNode => {
  const e = n as EmbedNode | null;
  return (
    !!e &&
    (e as any).type === 'embed' &&
    (e as any).provider === 'youtube' &&
    typeof e.url === 'string' &&
    e.url.length > 0
  );
};

export const toEmbedSrc = (node: EmbedNode): string => {
  const url = node.url.trim();
  if (url.includes('embed')) return url;
  const short = url.match(/https?:\/\/youtu\.be\/([\w-]{6,})/i);
  if (short) return `https://www.youtube.com/embed/${short[1]}`;
  const id = url.match(/[?&]v=([\w-]{6,})/i);
  if (id) return `https://www.youtube.com/embed/${id[1]}`;
  return url;
};

export const validateMessageNode = (node: unknown): node is MessageNode => {
  const validate = (n: any): boolean => {
    if (typeof n === 'string') return n.length > 0;
    if (isEmbedNode(n)) return true;
    if (
      n &&
      n.type === 'random' &&
      Array.isArray(n.items) &&
      n.items.length > 0
    )
      return n.items.every(validate);
    if (Array.isArray(n)) return n.length > 0 && n.every(validate);
    return false;
  };
  return validate(node);
};

export const getNodePreview = (node: MessageNode): string => {
  const previewOf = (n: MessageNode): string => {
    if (typeof n === 'string') return n;
    if (Array.isArray(n)) {
      for (const child of n) {
        const p = previewOf(child);
        if (p) return p;
      }
      return '';
    }
    if ('type' in n && n.type === 'embed') {
      return n.preview ?? '';
    }
    if ('type' in n && n.type === 'random') {
      for (const child of n.items) {
        const p = previewOf(child);
        if (p) return p;
      }
      return '';
    }
    return '';
  };
  return previewOf(node);
};

const defaultConversationsData: Record<string, ConversationData> = {
  syazani: normalizeConversation(syazaniConversation),
  solo: normalizeConversation(soloConversation),
  edna: normalizeConversation(ednaConversation),
};

export const conversationsData = defaultConversationsData;

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
