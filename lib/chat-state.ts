import { create } from 'zustand';
import { useMemo } from 'react';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

interface ConversationState {
  messages: Message[];
  currentState: string;
  isWaitingForResponse: boolean;
  isUserTyping: boolean;
  areQuickRepliesVisible: boolean;
  isTerminal: boolean;
}

interface RootChatStore {
  conversations: Record<string, ConversationState>;
  actions: {
    init: (id: string) => void;
    setMessages: (id: string, messages: Message[]) => void;
    addMessage: (id: string, message: Message) => void;
    setCurrentState: (id: string, state: string) => void;
    setIsWaitingForResponse: (id: string, isWaiting: boolean) => void;
    setIsUserTyping: (id: string, isTyping: boolean) => void;
    setAreQuickRepliesVisible: (id: string, isVisible: boolean) => void;
    setIsTerminal: (id: string, isTerminal: boolean) => void;
    reset: (id: string) => void;
  };
}

const createEmptyConversation = (): ConversationState => ({
  messages: [],
  currentState: '',
  isWaitingForResponse: false,
  isUserTyping: false,
  areQuickRepliesVisible: false,
  isTerminal: false,
});

const EMPTY_MESSAGES: Message[] = [];

const useChatStore = create<RootChatStore>(set => ({
  conversations: {},
  actions: {
    init: id =>
      set(state => ({
        conversations: state.conversations[id]
          ? state.conversations
          : { ...state.conversations, [id]: createEmptyConversation() },
      })),
    setMessages: (id, messages) =>
      set(state => ({
        conversations: {
          ...state.conversations,
          [id]: {
            ...(state.conversations[id] ?? createEmptyConversation()),
            messages,
          },
        },
      })),
    addMessage: (id, message) =>
      set(state => {
        const prev = state.conversations[id] ?? createEmptyConversation();
        return {
          conversations: {
            ...state.conversations,
            [id]: { ...prev, messages: [...prev.messages, message] },
          },
        };
      }),
    setCurrentState: (id, currentState) =>
      set(state => ({
        conversations: {
          ...state.conversations,
          [id]: {
            ...(state.conversations[id] ?? createEmptyConversation()),
            currentState,
          },
        },
      })),
    setIsWaitingForResponse: (id, isWaitingForResponse) =>
      set(state => ({
        conversations: {
          ...state.conversations,
          [id]: {
            ...(state.conversations[id] ?? createEmptyConversation()),
            isWaitingForResponse,
          },
        },
      })),
    setIsUserTyping: (id, isUserTyping) =>
      set(state => ({
        conversations: {
          ...state.conversations,
          [id]: {
            ...(state.conversations[id] ?? createEmptyConversation()),
            isUserTyping,
          },
        },
      })),
    setAreQuickRepliesVisible: (id, areQuickRepliesVisible) =>
      set(state => ({
        conversations: {
          ...state.conversations,
          [id]: {
            ...(state.conversations[id] ?? createEmptyConversation()),
            areQuickRepliesVisible,
          },
        },
      })),
    setIsTerminal: (id, isTerminal) =>
      set(state => ({
        conversations: {
          ...state.conversations,
          [id]: {
            ...(state.conversations[id] ?? createEmptyConversation()),
            isTerminal,
          },
        },
      })),
    reset: id =>
      set(state => ({
        conversations: {
          ...state.conversations,
          [id]: createEmptyConversation(),
        },
      })),
  },
}));

export const useChatMessages = (id: string) =>
  useChatStore(state => state.conversations[id]?.messages ?? EMPTY_MESSAGES);
export const useCurrentState = (id: string) =>
  useChatStore(state => state.conversations[id]?.currentState ?? '');
export const useIsWaitingForResponse = (id: string) =>
  useChatStore(state => state.conversations[id]?.isWaitingForResponse ?? false);
export const useIsUserTyping = (id: string) =>
  useChatStore(state => state.conversations[id]?.isUserTyping ?? false);
export const useAreQuickRepliesVisible = (id: string) =>
  useChatStore(
    state => state.conversations[id]?.areQuickRepliesVisible ?? false
  );
export const useIsTerminal = (id: string) =>
  useChatStore(state => state.conversations[id]?.isTerminal ?? false);

export const useChatActions = (id: string) => {
  const actions = useChatStore(state => state.actions);
  return useMemo(
    () => ({
      setMessages: (messages: Message[]) => actions.setMessages(id, messages),
      addMessage: (message: Message) => actions.addMessage(id, message),
      setCurrentState: (stateStr: string) =>
        actions.setCurrentState(id, stateStr),
      setIsWaitingForResponse: (isWaiting: boolean) =>
        actions.setIsWaitingForResponse(id, isWaiting),
      setIsUserTyping: (isTyping: boolean) =>
        actions.setIsUserTyping(id, isTyping),
      setAreQuickRepliesVisible: (isVisible: boolean) =>
        actions.setAreQuickRepliesVisible(id, isVisible),
      setIsTerminal: (isTerminal: boolean) =>
        actions.setIsTerminal(id, isTerminal),
      reset: () => actions.reset(id),
      init: () => actions.init(id),
    }),
    [id, actions]
  );
};
