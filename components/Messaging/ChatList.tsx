"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Pencil, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Input } from "../ui/input";
import React from "react";
import { cn } from "@/lib/utils";

type Conversation = {
  id: string;
  name: string;
  message: string;
  avatar: string;
  date: string;
  unread?: number;
};

const conversations: Conversation[] = [
  {
    id: "bot",
    name: "Syazani's Assistant",
    message: "Ask me anything!",
    avatar: "/logo-dark.png",
    date: "Oct 27",
  },
  {
    id: "sponsored",
    name: "HP",
    message: "Sponsored: Get your HP Z Workstation from as low...",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/1200px-HP_logo_2012.svg.png",
    date: "Oct 16",
    unread: 1,
  },
  {
    id: "linkedin",
    name: "LinkedIn Offer",
    message: "Hi there, Syazani% We've recently seen...",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/600px-LinkedIn_logo_initials.png",
    date: "Oct 26",
  },
];

export const ChatList = ({ onSelectConvo }: { onSelectConvo: (id: string) => void }) => {
  const [selected, setSelected] = React.useState("bot");

  const handleSelect = (id: string) => {
    setSelected(id);
    onSelectConvo(id);
  };

  return (
    <div className="bg-[#1e1e1e] h-full flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Messaging</h2>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-700 rounded-full">
              <MoreHorizontal size={20} />
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-full">
              <Pencil size={20} />
            </button>
          </div>
        </div>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input placeholder="Search messages" className="pl-10 bg-[#383838] border-gray-600" />
        </div>
        <div className="mt-4 flex gap-2">
          <button className="px-4 py-2 text-sm font-semibold text-white bg-green-700 rounded-full">Focused</button>
          <button className="px-4 py-2 text-sm font-semibold text-gray-400 hover:bg-gray-700 rounded-full">Other</button>
        </div>
      </div>
      <div className="grow overflow-y-auto">
        {conversations.map((convo) => (
          <div
            key={convo.id}
            onClick={() => handleSelect(convo.id)}
            className={cn("flex items-start gap-4 p-4 cursor-pointer hover:bg-gray-800", {
              "bg-gray-700": selected === convo.id,
            })}
          >
            <Avatar className="w-12 h-12">
              <AvatarImage src={convo.avatar} alt={convo.name} />
              <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="grow">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{convo.name}</h3>
                <span className="text-xs text-gray-400">{convo.date}</span>
              </div>
              <p className="text-sm text-gray-400 truncate">{convo.message}</p>
            </div>
            {convo.unread && (
              <div className="flex items-center justify-center w-5 h-5 text-xs text-white bg-green-600 rounded-full">
                {convo.unread}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
