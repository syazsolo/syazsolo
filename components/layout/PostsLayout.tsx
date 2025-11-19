import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import { ReactNode } from 'react';
import ScrollActionBar from '@/components/ScrollActionBar';

interface PostsLayoutProps {
  children: ReactNode;
  leftSidebar?: ReactNode;
  rightSidebar?: ReactNode;
}

export default function PostsLayout({
  children,
  leftSidebar,
  rightSidebar,
}: PostsLayoutProps) {
  return (
    <div className="bg-background relative min-h-screen pt-[52px] transition-colors">
      <Header />
      <ScrollActionBar />
      <div className="container-width mx-auto py-3 md:px-6 md:py-6">
        <div className="grid grid-cols-1 gap-4 min-[770px]:grid-cols-[25%_75%] min-[995px]:grid-cols-[22%_53%_25%]">
          {leftSidebar && (
            <div className="hidden min-[770px]:block">{leftSidebar}</div>
          )}

          <div className="flex flex-col gap-4 md:gap-2">{children}</div>

          {rightSidebar && (
            <div className="hidden min-[995px]:block">{rightSidebar}</div>
          )}
        </div>
      </div>
    </div>
  );
}
