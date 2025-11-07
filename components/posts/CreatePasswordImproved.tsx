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
    if (pwd.length < 8) return false;
    if (!/\d/.test(pwd)) return false;
    if (!/[A-Z]/.test(pwd)) return false;
    if (!/[a-z]/.test(pwd)) return false;
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
    <div className="bg-[#1c1c1e] p-8 min-h-[400px] flex flex-col items-center justify-center">
      <h2 className="text-white text-2xl font-semibold mb-8">
        Enter New Password
      </h2>

      <div className="w-full max-w-[320px]">
        <div className="bg-[#2c2c2e] rounded-lg overflow-hidden">
          <div className="relative border-b border-[#3a3a3c]">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={(e) => {
                setIsPasswordFocused(false);
                handlePasswordBlur();
              }}
              readOnly={!isPasswordFocused}
              autoComplete="new-password"
              name="improved-password-field-1"
              id="improved-password-field-1"
              data-1p-ignore
              data-lpignore="true"
              className={`w-full bg-transparent text-white px-4 py-3 border-none outline-none ${
                passwordTouched && !isPasswordValid
                  ? 'ring-2 ring-red-500 rounded-t-lg'
                  : passwordTouched && isPasswordValid
                    ? 'ring-2 ring-green-500 rounded-t-lg'
                    : ''
              }`}
            />
          </div>

          <div className="relative">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e.target.value)}
              onFocus={() => setIsConfirmFocused(true)}
              onBlur={(e) => {
                setIsConfirmFocused(false);
                handleConfirmPasswordBlur();
              }}
              readOnly={!isConfirmFocused && isPasswordValid && !confirmPassword}
              disabled={!isPasswordValid}
              autoComplete="new-password"
              name="improved-password-field-2"
              id="improved-password-field-2"
              data-1p-ignore
              data-lpignore="true"
              className="w-full bg-transparent text-white px-4 py-3 border-none outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {passwordError && (
          <p className="text-red-500 text-sm text-left mt-4">
            {passwordError}
          </p>
        )}

        {confirmError && (
          <p className="text-red-500 text-sm text-left mt-4">
            {confirmError}
          </p>
        )}

        <p className="text-gray-500 text-xs text-left leading-relaxed mt-6">
          Your password must be at least 8 characters long, include a number,
          an uppercase letter and a lowercase letter.
        </p>
      </div>
    </div>
  );
};

