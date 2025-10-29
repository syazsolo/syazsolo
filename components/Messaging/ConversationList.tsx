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
  unread?: number;
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
    unread: 1,
  },
];

export const ConversationList = ({
  onSelectConvo,
}: {
  onSelectConvo: (id: string) => void;
}) => {
  const [selected, setSelected] = useState('syazani');
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
    <div className="bg-white h-full flex flex-col">
      <div className="p-3 border-b border-gray-200">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <Input
            placeholder="Search messages"
            className="pl-9 bg-gray-50 border-gray-200 text-sm"
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
              'flex items-start gap-3 p-3 cursor-pointer hover:bg-gray-50',
              {
                'bg-blue-50': selected === convo.id,
              }
            )}
          >
            <Avatar className="w-10 h-10">
              <AvatarImage src={convo.avatar} alt={convo.name} />
              <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="grow min-w-0">
              <h3 className="font-semibold text-sm text-gray-900 truncate">
                {convo.name}
              </h3>
              <p className="text-xs text-gray-500 truncate mt-1">
                {convo.message}
              </p>
            </div>
            {convo.unread && (
              <div className="flex items-center justify-center w-4 h-4 text-xs text-white bg-blue-600 rounded-full">
                {convo.unread}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
