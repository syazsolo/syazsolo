import { defineConfig, globalIgnores } from 'eslint/config';

import nextTs from 'eslint-config-next/typescript';
import nextVitals from 'eslint-config-next/core-web-vitals';
import prettierConfig from 'eslint-config-prettier';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierConfig,
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
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "NewExpression[callee.name='Date'][arguments.0.type='Literal'][arguments.0.value=/^.+$/]",
          message:
            'Do not parse strings with `new Date()` — behavior is implementation-defined (e.g. iOS Safari rejects "Apr 2026"). Use `parseISO` from date-fns on ISO 8601 strings, or `parse(str, format, ref)` for custom formats.',
        },
        {
          selector:
            "NewExpression[callee.name='Date'][arguments.0.type='TemplateLiteral']",
          message:
            'Do not parse strings with `new Date()` — behavior is implementation-defined. Use `parseISO` from date-fns on ISO 8601 strings, or `parse(str, format, ref)` for custom formats.',
        },
        {
          selector:
            "NewExpression[callee.name='Date'][arguments.0.type='Identifier']",
          message:
            'If this Date receives a string, behavior is implementation-defined (iOS Safari is strict). Prefer `parseISO(str)` from date-fns. If the argument is a number/Date, ignore this rule with an inline disable.',
        },
      ],
    },
  },
]);

export default eslintConfig;
