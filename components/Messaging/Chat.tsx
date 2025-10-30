'use client';

import { MessageArea } from '@/components/Messaging/MessageArea';
import { useChatViewModel } from '@/components/Messaging/useChatViewModel';

export const Chat = ({
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
  } = useChatViewModel(conversationId);

  return (
    <div className="bg-background text-foreground h-full flex flex-col">
      <MessageArea
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
