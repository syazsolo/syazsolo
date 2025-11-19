'use client';

import { ConversationTranscript } from '@/components/Chatbot/ConversationTranscript';
import { useChatbotViewModel } from '@/components/Chatbot/useChatbotViewModel';

export const ChatbotConversation = ({
  conversationId = 'syazani',
}: {
  conversationId?: string;
}) => {
  const {
    conversation,
    messages,
    isWaitingForResponse,
    isUserTyping,
    areQuickRepliesVisible,
    messagesEndRef,
    lastUserMessageRef,
    currentQuickReplies,
    handleQuickReply,
    endOfConversation,
    restartConversation,
  } = useChatbotViewModel(conversationId);

  return (
    <div className="bg-background text-foreground flex h-full flex-col">
      <ConversationTranscript
        messages={messages}
        conversation={conversation}
        lastUserMessageRef={lastUserMessageRef}
        messagesEndRef={messagesEndRef}
        quickReplies={currentQuickReplies}
        onQuickReply={handleQuickReply}
        isWaitingForResponse={isWaitingForResponse}
        isUserTyping={isUserTyping}
        areQuickRepliesVisible={areQuickRepliesVisible}
        isEndOfConversation={endOfConversation}
        onRestart={restartConversation}
      />
    </div>
  );
};
