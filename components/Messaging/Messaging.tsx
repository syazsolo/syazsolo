"use client";

import { Maximize, MessageSquare, Minus, X } from "lucide-react";

import { ChatWindow } from "@/components/Messaging";
import React from "react";

export const Messaging = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [isMaximized, setIsMaximized] = React.useState(false);

  const wrapperClass = isMaximized
    ? "fixed inset-0 z-50 flex items-end md:items-end md:justify-end"
    : "fixed bottom-4 right-4 z-50";

  const panelSizeClass = isMaximized
    ? "w-full h-full md:w-[900px] md:h-[700px] md:rounded-lg rounded-none"
    : "w-[calc(100vw-2rem)] sm:w-[420px] md:w-[720px] h-[70vh] md:h-[620px] rounded-lg";

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-full shadow-lg"
        aria-label="Open chat"
      >
        <MessageSquare size={18} />
        <span className="hidden sm:inline">Ask me</span>
      </button>
    );
  }

  return (
    <div className={wrapperClass}>
      <div className={`bg-[#222222] border border-gray-700 shadow-2xl text-white flex flex-col ${panelSizeClass}`}>
        <div className="flex items-center justify-between p-2 bg-[#363636] rounded-t-lg">
          <div className="flex items-center gap-2">
            <img src="/logo-dark.png" alt="logo" className="w-5 h-5" />
            <span className="font-semibold">Ask Syazani</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-700 rounded"
              aria-label="Minimize"
            >
              <Minus size={16} />
            </button>
            <button
              onClick={() => setIsMaximized((v) => !v)}
              className="p-1 hover:bg-gray-700 rounded"
              aria-label="Maximize"
            >
              <Maximize size={16} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-red-500 rounded"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>
        <div className="grow h-full overflow-hidden">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
};
