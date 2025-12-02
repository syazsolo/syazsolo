export interface EndConversationParams {
  currentQuickRepliesCount: number;
  isWaitingForResponse: boolean;
  isUserTyping: boolean;
}

export function isEndOfConversation({
  currentQuickRepliesCount,
  isWaitingForResponse,
  isUserTyping,
}: EndConversationParams): boolean {
  if (isWaitingForResponse || isUserTyping) {
    return false;
  }

  const noMoreReplies = currentQuickRepliesCount === 0;
  if (!noMoreReplies) {
    return false;
  }

  // If there are no more quick replies and no one is typing/waiting,
  // consider the conversation ended regardless of who sent the last message.
  return true;
}
