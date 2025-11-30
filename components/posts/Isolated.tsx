'use client';

import { ReactNode } from 'react';

interface IsolatedProps {
  children: ReactNode;
}

export const Isolated = ({ children }: IsolatedProps) => {
  return (
    <div className="my-6 flex justify-center">
      <div className="border-border w-full max-w-[375px] overflow-hidden rounded-lg border shadow-lg">
        {children}
      </div>
    </div>
  );
};
