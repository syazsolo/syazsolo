import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ConversationData, MessageNode } from '@/lib/chat/conversations';

import { MessageNodeRenderer } from './MessageNodeRenderer';

interface BotMessageBubbleProps {
  conversation: ConversationData;
  content: MessageNode;
}

export const BotMessageBubble = ({
  conversation,
  content,
}: BotMessageBubbleProps) => {
  return (
    <div className="flex items-start gap-2">
      <Avatar className="h-6 w-6">
        <AvatarImage src={conversation.avatar} alt={conversation.name} />
        <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex max-w-[85%] flex-col sm:max-w-[80%]">
        <div className="bg-card text-foreground rounded-2xl px-3 py-2 text-sm">
          <MessageNodeRenderer node={content} />
        </div>
      </div>
    </div>
  );
};
