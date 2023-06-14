module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
    plugins: ['@typescript-eslint'],
    rules: {
        '@typescript-eslint/no-explicit-any': 'error',
        'quotes': ['error', 'single'],
    },
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
    },
};
