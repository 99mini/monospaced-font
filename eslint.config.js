import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import parser from '@typescript-eslint/parser';
import globals from 'globals';

export default {
  files: ['**/*.{ts,tsx}'], // ESLint가 적용될 파일 패턴
  ignores: ['dist', '.yarn/**/*', 'node_modules', '.pnp.*'], // 무시할 경로
  languageOptions: {
    ecmaVersion: 'latest', // 최신 ECMAScript 기능 사용
    sourceType: 'module', // ECMAScript 모듈
    parser,
    globals: {
      ...globals.browser, // 브라우저 전역 객체
      ...globals.node, // Node.js 전역 객체
    },
  },
  plugins: {
    react, // React 플러그인
    'react-hooks': reactHooks,
    prettier, // Prettier 플러그인
    '@typescript-eslint': tsPlugin, // TypeScript ESLint 플러그인
  },
  rules: {
    ...js.configs.recommended.rules, // JavaScript 추천 규칙
    ...react.configs.recommended.rules, // React 추천 규칙
    ...reactHooks.configs.recommended.rules, // React Hooks 추천 규칙
    ...tsPlugin.configs.recommended.rules, // TypeScript 추천 규칙
    'prettier/prettier': 'error', // Prettier 규칙
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
  },
  settings: {
    react: {
      version: 'detect', // React 버전 자동 감지
    },
  },
};
