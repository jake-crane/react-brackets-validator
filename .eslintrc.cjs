module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-wrap-multilines': ['warn', { return: 'parens-new-line' }],
    'react/button-has-type': ['warn'],
    'react/jsx-first-prop-new-line': ['warn'],
    'react/jsx-max-props-per-line': ['warn', { 'maximum': 1, 'when': 'multiline' }],
    'react/jsx-closing-bracket-location': ['warn'],
    'semi': [1, 'always'],
    'quotes': [1, 'single'],
    'comma-dangle': ['warn', 'never'],
    '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
    'jsx-quotes': ['warn'],
    'max-len': ['warn', { 'code': 120, ignoreTemplateLiterals: true }]
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};