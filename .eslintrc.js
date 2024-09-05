module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', 'react/jsx-max-props-per-line', 'react/jsx-key'],
  rules: {
    'prettier/prettier': 'error',
  },
};
