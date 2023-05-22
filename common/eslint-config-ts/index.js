module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['next', 'turbo', 'prettier', 'plugin:@typescript-eslint/recommended'],
  plugins: [
      '@typescript-eslint'
  ],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'quotes': ['error', 'single'],
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
};
