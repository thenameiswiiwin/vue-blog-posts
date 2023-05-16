/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true
  },
  plugins: ['vue'],
  parser: 'vue-eslint-parser',
  overrides: [
    {
      files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}', '*.vue'],
      parser: 'vue-eslint-parser',
      extends: ['plugin:cypress/recommended']
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'eslint-config-airbnb-base',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    'plugin:tailwindcss/recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'no-var': 'error',
    'no-new': 1,
    'no-shadow': 0,
    'no-console': 0,
    'no-underscore-dangle': 0,
    'no-confusing-arrow': 0,
    'no-plusplus': 0,
    'no-param-reassign': 0,
    'no-restricted-syntax': 0,
    'no-use-before-define': 0,
    'no-prototype-builtins': 0,
    'no-unneeded-ternary': 'error',
    'no-duplicate-imports': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-escape': 0,
    'no-continue': 0,
    indent: ['error', 2, { SwitchCase: 1 }],
    camelcase: 0,
    'class-methods-use-this': 0,
    'new-cap': 0,
    'func-style': 0,
    'max-len': 0,
    'consistent-return': 0,
    'default-case': 2,
    'rest-spread-spacing': 'error',
    'prefer-const': 'error',
    'arrow-spacing': 'error',
    'prefer-destructuring': ['error', { object: true, array: false }],
    'vue/multi-word-component-names': 0
  }
}
