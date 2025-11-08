'use client';

import { useEffect, useState } from 'react';

import { chatActivityStore } from '@/lib/chat/activity';

interface UseFloatingChatProps {
  conversationId: string | null;
  onClose: () => void;
}

export const useFloatingChat = ({
  conversationId,
  onClose,
}: UseFloatingChatProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const isOpen = !!conversationId;

  // Activate online status when window opens
  useEffect(() => {
    if (isOpen && conversationId) {
      const timer = setTimeout(() => {
        chatActivityStore.activate(conversationId);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, conversationId]);

  const handleClose = () => {
    setIsVisible(false);
    // Deactivate with 1-second delay
    if (conversationId) {
      setTimeout(() => {
        chatActivityStore.deactivate(conversationId);
      }, 1000);
    }

    // Delay the close to allow exit animation to complete
    setTimeout(() => {
      onClose();
      // Reset so if reopened it animates in again
      setIsVisible(true);
    }, 400);
  };

  return { isVisible, isOpen, handleClose, setIsVisible };
};
