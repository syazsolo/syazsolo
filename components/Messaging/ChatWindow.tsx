"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Paperclip, Send, Smile } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { qnaData } from "@/lib/qna";

type Message = {
  sender: "syazani" | "visitor";
  text: string;
};

export const ChatWindow = ({ compact = false }: { compact?: boolean }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestionId, setCurrentQuestionId] = useState("start");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ sender: "syazani", text: qnaData.start.answer }]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleOptionClick = (optionId: string) => {
    const selectedOption = qnaData[optionId];

    setMessages((prev) => [
      ...prev,
      { sender: "visitor", text: selectedOption.question },
    ]);

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "syazani", text: "…" }]);

      setTimeout(() => {
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            sender: "syazani",
            text: selectedOption.answer,
          };
          return newMessages;
        });
        setCurrentQuestionId(optionId);
      }, 500);
    }, 250);
  };

  const currentOptions = qnaData[currentQuestionId]?.followUp?.map(
    (id) => qnaData[id]
  );

  return (
    <div className="bg-[#1e1e1e] h-full flex flex-col">
      <div className="p-3 md:p-4 border-b border-gray-700 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/solo.jpg" alt="Syazani" />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-bold text-sm md:text-base">Chat with Syazani</h3>
            <p className="text-[10px] md:text-xs text-gray-400">Typically replies fast</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-700 rounded-full">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="grow p-3 md:p-4 overflow-y-auto space-y-3 md:space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 ${
              msg.sender === "visitor" ? "justify-end" : ""
            }`}
          >
            {msg.sender === "syazani" && (
              <Avatar className="w-7 h-7 md:w-8 md:h-8">
                <AvatarImage src="/solo.jpg" alt="Syazani" />
                <AvatarFallback>S</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`rounded-2xl px-3 py-2 md:px-4 md:py-2 max-w-[80%] md:max-w-sm ${
                msg.sender === "syazani"
                  ? "bg-gray-700 text-white"
                  : "bg-blue-600 text-white"
              }`}
            >
              {msg.text}
            </div>
            {msg.sender === "visitor" && (
              <Avatar className="w-7 h-7 md:w-8 md:h-8">
                <AvatarImage src="/logo.png" alt="You" />
                <AvatarFallback>Y</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 md:p-4 border-t border-gray-700">
        <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
          {currentOptions?.map((option) => (
            <Button
              key={option.id}
              variant="outline"
              className="bg-gray-700 border-gray-600 hover:bg-gray-600 text-xs md:text-sm"
              onClick={() => handleOptionClick(option.id)}
            >
              {option.question}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Paperclip size={18} className="text-gray-400 hidden md:block" />
          <Smile size={18} className="text-gray-400 hidden md:block" />
          <div className="relative grow">
            <input
              type="text"
              placeholder="Type a message (predefined)"
              className="w-full bg-[#383838] border-gray-600 rounded-full py-2 px-4 text-sm"
              disabled
            />
          </div>
          <Send size={18} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};
