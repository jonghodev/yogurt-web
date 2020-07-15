module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': 'off',
    'keyword-spacing': 'off',
    'max-len': 'off',
    'object-curly-newline': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'class-methods-use-this': 'off',
    "no-trailing-spaces": "off",
    "no-restricted-syntax": "off",
    "no-tabs": "off",
    "indent": "off",
    "prefer-const": "off",
    "no-param-reassign": "off",
    "object-property-newline": "off",
    "@typescript-eslint/camelcase": "off",
    "comma-dangle": "off",
    "import/prefer-default-export": "off",
    "no-alert": "off"
  },
};
