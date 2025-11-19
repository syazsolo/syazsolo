'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { conversationsData, getNodePreview } from '@/lib/chat/conversations';
import { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { chatActivityStore } from '@/lib/chat/activity';
import { cn } from '@/utils';

type Conversation = {
  id: string;
  name: string;
  message: string;
  avatar: string;
};

const conversations: Conversation[] = Object.values(conversationsData).map(
  convo => ({
    id: convo.id,
    name: convo.name,
    avatar: convo.avatar,
    message: getNodePreview(convo.states[convo.initialState].message),
  })
);

export const ConversationList = ({
  onSelectConvo,
}: {
  onSelectConvo: (id: string) => void;
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [, force] = useState(0);

  useEffect(() => {
    const unsubscribe = chatActivityStore.subscribe(() => {
      // Force re-render on store updates
      force(v => v + 1);
    });
    return unsubscribe;
  }, []);

  const handleSelect = (id: string) => {
    setSelected(id);
    onSelectConvo(id);
  };

  const filteredConversations = conversations.filter(convo => {
    const query = searchQuery.toLowerCase();
    return (
      convo.name.toLowerCase().includes(query) ||
      convo.message.toLowerCase().includes(query)
    );
  });

  return (
    <div className="bg-card text-foreground flex h-full flex-col">
      <div className="border-border border-b p-3">
        <div className="relative">
          <Search
            className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
            size={16}
          />
          <Input
            placeholder="Search messages"
            className="pl-9 text-sm"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="grow overflow-y-auto">
        {filteredConversations.map(convo => (
          <div
            key={convo.id}
            onClick={() => handleSelect(convo.id)}
            className={cn(
              'hover:bg-accent flex cursor-pointer items-start gap-3 p-3',
              {
                'bg-accent': selected === convo.id,
              }
            )}
          >
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={convo.avatar} alt={convo.name} />
                <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {chatActivityStore.isActive(convo.id) && (
                <span className="border-background absolute -right-0.5 -bottom-0.5 block h-3 w-3 rounded-full border-2 bg-green-500" />
              )}
            </div>
            <div className="min-w-0 grow">
              <h3 className="truncate text-sm font-semibold">{convo.name}</h3>
              <p className="text-muted-foreground mt-1 truncate text-xs">
                {convo.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
