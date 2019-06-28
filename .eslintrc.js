module.exports = {
  rules: {
    'no-var': 'warn',
    'no-unused-vars': 'warn',
    'no-undef': 'error',
  },
  parser: 'babel-eslint',
  env: {
    jest: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 8, // optional, recommended 6+
  },
}
