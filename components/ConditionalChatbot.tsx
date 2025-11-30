'use client';

import { usePathname } from 'next/navigation';
import { Chatbot } from '@/components/Chatbot';

export function ConditionalChatbot() {
  const pathname = usePathname();

  if (pathname === '/resume') {
    return null;
  }

  return (
    <div className="print:hidden">
      <Chatbot />
    </div>
  );
}
