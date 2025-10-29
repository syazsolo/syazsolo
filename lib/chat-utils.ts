export interface EndConversationParams {
  currentQuickRepliesCount: number;
  isWaitingForResponse: boolean;
  isUserTyping: boolean;
  lastMessageSender?: 'user' | 'bot';
}

export function isEndOfConversation({
  currentQuickRepliesCount,
  isWaitingForResponse,
  isUserTyping,
  lastMessageSender,
}: EndConversationParams): boolean {
  if (isWaitingForResponse || isUserTyping) {
    return false;
  }

  const noMoreReplies = currentQuickRepliesCount === 0;
  if (!noMoreReplies) {
    return false;
  }

  // Optional guard: ensure bot had the last word
  if (lastMessageSender && lastMessageSender !== 'bot') {
    return false;
  }

  return true;
}
