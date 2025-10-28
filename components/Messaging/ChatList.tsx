'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { messages } from '@/lib/messages';
import { useState } from 'react';

type Conversation = {
  id: string;
  name: string;
  message: string;
  avatar: string;
  unread?: number;
};

const conversations: Conversation[] = [
  {
    id: 'bot',
    name: messages.bot.identity.name,
    message: messages.bot.identity.welcome,
    avatar: messages.bot.identity.avatar,
  },
  {
    id: 'sponsored',
    name: messages.solo.identity.name,
    message: messages.solo.identity.welcome,
    avatar: messages.solo.identity.avatar,
    unread: 1,
  },
];

export const ChatList = ({
  onSelectConvo,
}: {
  onSelectConvo: (id: string) => void;
}) => {
  const [selected, setSelected] = useState('bot');

  const handleSelect = (id: string) => {
    setSelected(id);
    onSelectConvo(id);
  };

  return (
    <div className="bg-white h-full flex flex-col">
      {/* Search Bar */}
      <div className="p-3 border-b border-gray-200">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <Input
            placeholder={messages.ui.chatList.searchPlaceholder}
            className="pl-9 bg-gray-50 border-gray-200 text-sm"
          />
        </div>
        <div className="mt-3 flex gap-2">
          <button className="px-3 py-1.5 text-xs font-semibold text-white bg-green-600 rounded-full">
            {messages.ui.chatList.focusedTab}
          </button>
          <button className="px-3 py-1.5 text-xs font-semibold text-gray-500 hover:bg-gray-100 rounded-full">
            {messages.ui.chatList.otherTab}
          </button>
        </div>
      </div>
      <div className="grow overflow-y-auto">
        {conversations.map(convo => (
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
