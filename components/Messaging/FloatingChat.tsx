'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { Chat } from '@/components/Messaging/Chat';
import { ChatHeader } from '@/components/Messaging/ChatHeader';
import { useFloatingChat } from './useFloatingChat';
import { useIsMobile } from '@/hooks/useIsMobile';

const EASE_MOBILE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const EASE_STANDARD: [number, number, number, number] = [0.4, 0.0, 0.2, 1];

const CHAT_WIDTH = 320;
const CHAT_GAP = 16;
const MESSAGE_BAR_WIDTH = 320;

interface FloatingChatProps {
  conversationId: string | null;
  onClose: () => void;
  offsetIndex?: number;
  totalChats?: number;
}

export const FloatingChat = ({
  conversationId,
  onClose,
  offsetIndex = 0,
  totalChats = 1,
}: FloatingChatProps) => {
  const isMobile = useIsMobile();
  const [isMaximized, setIsMaximized] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const { isOpen, handleClose, setIsVisible } = useFloatingChat({
    conversationId,
    onClose,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen, setIsVisible, isMobile]);

  const calculateRightOffset = () => {
    if (isMobile || isMaximized) return undefined;
    if (!windowWidth)
      return MESSAGE_BAR_WIDTH + offsetIndex * (CHAT_WIDTH + CHAT_GAP);

    const availableWidth = windowWidth - MESSAGE_BAR_WIDTH;
    const totalNeededWidth =
      totalChats * CHAT_WIDTH + (totalChats - 1) * CHAT_GAP;

    if (totalNeededWidth > availableWidth) {
      const adjustedGap =
        (availableWidth - totalChats * CHAT_WIDTH) / (totalChats - 1 || 1);
      return MESSAGE_BAR_WIDTH + offsetIndex * (CHAT_WIDTH + adjustedGap);
    }

    return MESSAGE_BAR_WIDTH + offsetIndex * (CHAT_WIDTH + CHAT_GAP);
  };

  if (!conversationId) {
    return null;
  }

  const motionVariants = isMobile
    ? {
        initial: { opacity: 0, y: '100%' },
        animate: { opacity: 1, y: 0 },
        exit: {
          opacity: 0,
          y: '100%',
          scale: 0.8,
          transition: {
            duration: 0.4,
            ease: EASE_MOBILE,
          },
        },
        transition: {
          duration: 0.3,
          ease: EASE_STANDARD,
        },
      }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: {
          opacity: 0,
          transition: { duration: 0.2, ease: EASE_STANDARD },
        },
        transition: { duration: 0.2, ease: EASE_STANDARD },
      };

  const isChatMaximized = isMobile || isMaximized;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className={`fixed flex flex-col overflow-hidden ${
            isChatMaximized
              ? 'z-60 inset-x-0 inset-y-4 mx-auto my-auto w-full max-w-4xl h-[90vh] rounded-lg bg-card border border-border shadow-2xl text-foreground'
              : 'z-50 bottom-0 w-80 h-96 rounded-lg bg-card border border-border shadow-2xl text-foreground'
          } ${isMobile ? 'inset-0 z-50 bg-background text-foreground' : ''}`}
          style={
            !isChatMaximized && !isMobile
              ? {
                  right: calculateRightOffset(),
                  willChange: 'transform, opacity',
                }
              : undefined
          }
          initial={motionVariants.initial}
          animate={motionVariants.animate}
          exit={motionVariants.exit}
          transition={motionVariants.transition}
          layout={!isMobile}
        >
          <ChatHeader
            conversationId={conversationId}
            isMaximized={isChatMaximized}
            onClose={handleClose}
            onToggleMaximize={() => !isMobile && setIsMaximized(!isMaximized)}
            showMaximize={!isMobile}
            onHeaderClick={isMobile ? handleClose : undefined}
          />
          <div className="grow h-full overflow-hidden">
            <Chat conversationId={conversationId} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
