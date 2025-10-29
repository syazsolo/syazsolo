type Listener = () => void;

class ChatActivityStore {
  private activeConversations = new Set<string>();
  private listeners = new Set<Listener>();

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener());
  }

  activate(conversationId: string) {
    if (!this.activeConversations.has(conversationId)) {
      this.activeConversations.add(conversationId);
      this.notify();
    }
  }

  deactivate(conversationId: string) {
    if (this.activeConversations.has(conversationId)) {
      this.activeConversations.delete(conversationId);
      this.notify();
    }
  }

  isActive(conversationId: string): boolean {
    return this.activeConversations.has(conversationId);
  }
}

export const chatActivityStore = new ChatActivityStore();
