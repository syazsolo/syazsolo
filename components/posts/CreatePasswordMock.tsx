'use client';

import { useState } from 'react';

export const CreatePasswordMock = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmFocused, setIsConfirmFocused] = useState(false);

  const validatePassword = (pwd: string) => {
    if (pwd.length < 8) return false;
    if (!/\d/.test(pwd)) return false;
    if (!/[A-Z]/.test(pwd)) return false;
    if (!/[a-z]/.test(pwd)) return false;
    return true;
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setError('');
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setError('');
  };

  const handleBlur = () => {
    if (password && confirmPassword) {
      if (!validatePassword(password)) {
        setError('does not pass the rules');
      } else if (password !== confirmPassword) {
        setError('does not match with second field');
      } else {
        setError('');
      }
    }
  };

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center bg-[#1c1c1e] p-8">
      <h2 className="mb-8 text-2xl font-semibold text-white">
        Enter New Password
      </h2>

      <div className="w-full max-w-[320px]">
        <div className="overflow-hidden rounded-lg bg-[#2c2c2e]">
          <div className="relative border-b border-[#3a3a3c]">
            <input
              type="password"
              value={password}
              onChange={e => handlePasswordChange(e.target.value)}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={e => {
                setIsPasswordFocused(false);
                handleBlur();
              }}
              readOnly={!isPasswordFocused}
              autoComplete="new-password"
              name="new-password-field-1"
              id="new-password-field-1"
              data-1p-ignore
              data-lpignore="true"
              className="w-full border-none bg-transparent px-4 py-3 text-white outline-none"
            />
          </div>

          <div className="relative">
            <input
              type="password"
              value={confirmPassword}
              onChange={e => handleConfirmPasswordChange(e.target.value)}
              onFocus={() => setIsConfirmFocused(true)}
              onBlur={e => {
                setIsConfirmFocused(false);
                handleBlur();
              }}
              readOnly={!isConfirmFocused}
              autoComplete="new-password"
              name="new-password-field-2"
              id="new-password-field-2"
              data-1p-ignore
              data-lpignore="true"
              className="w-full border-none bg-transparent px-4 py-3 text-white outline-none"
            />
          </div>
        </div>

        {error && (
          <p className="mt-4 text-left text-sm text-red-500">{error}</p>
        )}

        <p className="mt-6 text-left text-xs leading-relaxed text-gray-500">
          Your password must be at least 8 characters long, include a number, an
          uppercase letter and a lowercase letter.
        </p>
      </div>
    </div>
  );
};
