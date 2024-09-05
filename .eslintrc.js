// module.exports = {
//   extends: [
//     'eslint:recommended',
//     'plugin:react/recommended',
//     'plugin:prettier/recommended',
//   ],
//   plugins: ['prettier'],
//   rules: {
//     'prettier/prettier': 'error',
//   },
// };

module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module' 
  },
  env: {
    es6: true, 
    browser: true, 
    node: true, 
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'next'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
};

