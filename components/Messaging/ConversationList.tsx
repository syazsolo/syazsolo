'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { conversationsData } from '@/lib/conversations';
import { useState } from 'react';

type Conversation = {
  id: string;
  name: string;
  message: string;
  avatar: string;
};

const syazani = conversationsData.syazani;
const solo = conversationsData.solo;

const getInitialMessage = (message: string | string[]): string => {
  return Array.isArray(message) ? message[0] : message;
};

const conversations: Conversation[] = [
  {
    id: syazani.id,
    name: syazani.name,
    message: getInitialMessage(syazani.states[syazani.initialState].message),
    avatar: syazani.avatar,
  },
  {
    id: solo.id,
    name: solo.name,
    message: getInitialMessage(solo.states[solo.initialState].message),
    avatar: solo.avatar,
  },
];

export const ConversationList = ({
  onSelectConvo,
}: {
  onSelectConvo: (id: string) => void;
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

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
            <Avatar className="w-10 h-10">
              <AvatarImage src={convo.avatar} alt={convo.name} />
              <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
            </Avatar>
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
