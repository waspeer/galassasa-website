module.exports = {
  extends: ['../node_modules/poetic/config/eslint/eslint-config.js'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'import/no-duplicates': 'off',
    'import/order': [
      'error',
      {
        alphabetize: {},
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        pathGroups: [{ pattern: '~/**', group: 'internal' }],
      },
    ],
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
  },
};
