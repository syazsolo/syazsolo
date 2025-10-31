import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ConversationData } from '@/lib/conversations';
import { MessageNode } from '@/lib/conversations';
import { RenderNode } from './RenderNode';

interface BotMessageProps {
  conversation: ConversationData;
  content: MessageNode;
}

export const BotMessage = ({ conversation, content }: BotMessageProps) => {
  return (
    <div className="flex items-start gap-2">
      <Avatar className="w-6 h-6">
        <AvatarImage src={conversation.avatar} alt={conversation.name} />
        <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col sm:max-w-[80%] max-w-[85%]">
        <div className="rounded-2xl px-3 py-2 text-sm bg-card text-foreground">
          <RenderNode node={content} />
        </div>
      </div>
    </div>
  );
};
