'use client';

import { ReactNode } from 'react';

interface IsolatedProps {
  children: ReactNode;
}

export const Isolated = ({ children }: IsolatedProps) => {
  return (
    <div className="my-6 flex justify-center">
      <div className="w-full max-w-[375px] rounded-lg border border-border shadow-lg overflow-hidden">
        {children}
      </div>
    </div>
  );
};

