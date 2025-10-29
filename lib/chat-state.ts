import { create } from 'zustand';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

interface ChatState {
  messages: Message[];
  currentState: string;
  isWaitingForResponse: boolean;
  isUserTyping: boolean;
  areQuickRepliesVisible: boolean;
  actions: {
    setMessages: (messages: Message[]) => void;
    addMessage: (message: Message) => void;
    setCurrentState: (state: string) => void;
    setIsWaitingForResponse: (isWaiting: boolean) => void;
    setIsUserTyping: (isTyping: boolean) => void;
    setAreQuickRepliesVisible: (isVisible: boolean) => void;
    reset: () => void;
  };
}

const useChatStore = create<ChatState>(set => ({
  messages: [],
  currentState: '',
  isWaitingForResponse: false,
  isUserTyping: false,
  areQuickRepliesVisible: false,
  actions: {
    setMessages: messages => set({ messages }),
    addMessage: message =>
      set(state => ({ messages: [...state.messages, message] })),
    setCurrentState: currentState => set({ currentState }),
    setIsWaitingForResponse: isWaitingForResponse =>
      set({ isWaitingForResponse }),
    setIsUserTyping: isUserTyping => set({ isUserTyping }),
    setAreQuickRepliesVisible: areQuickRepliesVisible =>
      set({ areQuickRepliesVisible }),
    reset: () =>
      set({
        messages: [],
        currentState: '',
        isWaitingForResponse: false,
        isUserTyping: false,
        areQuickRepliesVisible: false,
      }),
  },
}));

export const useChatMessages = () => useChatStore(state => state.messages);
export const useCurrentState = () => useChatStore(state => state.currentState);
export const useIsWaitingForResponse = () =>
  useChatStore(state => state.isWaitingForResponse);
export const useIsUserTyping = () => useChatStore(state => state.isUserTyping);
export const useAreQuickRepliesVisible = () =>
  useChatStore(state => state.areQuickRepliesVisible);
export const useChatActions = () => useChatStore(state => state.actions);
