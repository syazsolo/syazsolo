import { defineConfig, globalIgnores } from 'eslint/config';

import nextTs from 'eslint-config-next/typescript';
import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  {
    rules: {
      // Enforce braces for all control statements
      curly: ['error', 'all'],
      // Enforce consistent brace style
      'brace-style': ['error', '1tbs', { allowSingleLine: false }],
      // Remove unused imports and variables
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'no-unused-vars': 'off', // Turn off base rule as it can report incorrect errors
      // Additional rule for unused imports (if you have eslint-plugin-unused-imports)
      // 'unused-imports/no-unused-imports': 'error',
    },
  },
]);

export default eslintConfig;
