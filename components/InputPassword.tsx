'use client';

import * as React from 'react';

import { Input } from '@/components/ui/input';
import { cn } from '@/utils';

export type InputPasswordProps = React.InputHTMLAttributes<HTMLInputElement>;

const maskedPasswordStyle = {
  WebkitTextSecurity: 'disc',
} as React.CSSProperties;

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ className, type: _type, style, autoComplete, name, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        // Force text input so browsers don't treat this as a credential field
        type="text"
        name={name ?? 'private-access-code'}
        autoComplete={autoComplete ?? 'off'}
        className={cn(className)}
        style={{ ...maskedPasswordStyle, ...style }}
        {...props}
      />
    );
  }
);

InputPassword.displayName = 'InputPassword';

export { InputPassword };
