'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { conversationsData, getInitialMessage } from '@/lib/conversations';
import { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { chatActivityStore } from '@/lib/chat-activity';
import { cn } from '@/lib/utils';

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
    message: getInitialMessage(convo.states[convo.initialState].message),
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
    <div className="bg-card text-foreground h-full flex flex-col">
      <div className="p-3 border-b border-border">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
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
              'flex items-start gap-3 p-3 cursor-pointer hover:bg-accent',
              {
                'bg-accent': selected === convo.id,
              }
            )}
          >
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarImage src={convo.avatar} alt={convo.name} />
                <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {chatActivityStore.isActive(convo.id) && (
                <span className="absolute -right-0.5 -bottom-0.5 block w-3 h-3 rounded-full bg-green-500 border-2 border-background" />
              )}
            </div>
            <div className="grow min-w-0">
              <h3 className="font-semibold text-sm truncate">{convo.name}</h3>
              <p className="text-xs text-muted-foreground truncate mt-1">
                {convo.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
