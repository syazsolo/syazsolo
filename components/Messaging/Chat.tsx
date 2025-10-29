'use client';

import { MessageArea } from '@/components/Messaging/MessageArea';
import { useChat } from './useChat';

export const Chat = ({
  conversationId = 'syazani',
}: {
  conversationId?: string;
}) => {
  const {
    conversation,
    messages,
    isWaitingForResponse,
    messagesEndRef,
    lastUserMessageRef,
    currentQuickReplies,
    handleQuickReply,
  } = useChat(conversationId);

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
      />
    </div>
  );
};
