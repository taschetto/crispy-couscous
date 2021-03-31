module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/default-props-match-prop-types': ['error'],
    'react/no-unused-prop-types': ['error'],
    'react/sort-prop-types': ['error'],
    'react/display-name': ['off'],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'linebreak-style': ['error', 'unix'],
    'prefer-template': 'error',
    curly: 'warn',
    'no-alert': 'warn',
    'no-console': 'warn',
    'no-template-curly-in-string': 'error',
    'default-param-last': ['error'],
    'dot-location': ['error', 'property'],
    'prefer-regex-literals': ['warn'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
