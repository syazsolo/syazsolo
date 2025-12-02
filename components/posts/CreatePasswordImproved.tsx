'use client';

import { useState } from 'react';

export const CreatePasswordImproved = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmFocused, setIsConfirmFocused] = useState(false);

  const validatePassword = (pwd: string) => {
    if (pwd.length < 8) {
      return false;
    }
    if (!/\d/.test(pwd)) {
      return false;
    }
    if (!/[A-Z]/.test(pwd)) {
      return false;
    }
    if (!/[a-z]/.test(pwd)) {
      return false;
    }
    return true;
  };

  const isPasswordValid = validatePassword(password);

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
    if (password && !isPasswordValid) {
      setPasswordError('does not pass the rules');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setConfirmError('');
  };

  const handleConfirmPasswordBlur = () => {
    if (confirmPassword && password !== confirmPassword) {
      setConfirmError('does not match with second field');
    } else {
      setConfirmError('');
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
              onChange={e => setPassword(e.target.value)}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={_e => {
                setIsPasswordFocused(false);
                handlePasswordBlur();
              }}
              readOnly={!isPasswordFocused}
              autoComplete="new-password"
              name="improved-password-field-1"
              id="improved-password-field-1"
              data-1p-ignore
              data-lpignore="true"
              className={`w-full border-none bg-transparent px-4 py-3 text-white outline-none ${
                passwordTouched && !isPasswordValid
                  ? 'rounded-t-lg ring-2 ring-red-500'
                  : passwordTouched && isPasswordValid
                    ? 'rounded-t-lg ring-2 ring-green-500'
                    : ''
              }`}
            />
          </div>

          <div className="relative">
            <input
              type="password"
              value={confirmPassword}
              onChange={e => handleConfirmPasswordChange(e.target.value)}
              onFocus={() => setIsConfirmFocused(true)}
              onBlur={_e => {
                setIsConfirmFocused(false);
                handleConfirmPasswordBlur();
              }}
              readOnly={
                !isConfirmFocused && isPasswordValid && !confirmPassword
              }
              disabled={!isPasswordValid}
              autoComplete="new-password"
              name="improved-password-field-2"
              id="improved-password-field-2"
              data-1p-ignore
              data-lpignore="true"
              className="w-full border-none bg-transparent px-4 py-3 text-white outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>

        {passwordError && (
          <p className="mt-4 text-left text-sm text-red-500">{passwordError}</p>
        )}

        {confirmError && (
          <p className="mt-4 text-left text-sm text-red-500">{confirmError}</p>
        )}

        <p className="mt-6 text-left text-xs leading-relaxed text-gray-500">
          Your password must be at least 8 characters long, include a number, an
          uppercase letter and a lowercase letter.
        </p>
      </div>
    </div>
  );
};
