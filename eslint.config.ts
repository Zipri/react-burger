import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default defineConfig([
  js.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx,js,jsx}'],
    ignores: ['node_modules/**', 'dist/**', 'build/**'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
      'unused-imports': unusedImports,
      react,
    },
    rules: {
      // Требует новую строку в конце файла
      'eol-last': ['error', 'always'],
      '@typescript-eslint/*': 'off',

      'no-prototype-builtins': 'off',
      'no-extra-boolean-cast': 'off',
      'no-undef': 'off',
      'no-empty': 'off',
      'no-useless-catch': 'off',
      'no-case-declarations': 'off',
      'no-unused-vars': 'off',

      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',

      'unused-imports/no-unused-imports': 'warn',
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
]);
