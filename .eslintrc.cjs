module.exports = {
  root: true,
  parserOptions: {
    requireConfigFile: false,
  },
  env: {
    node: true
  },
  extends: [
    '@myparcel/eslint-config/preset-es6',
    'plugin:prettier/recommended',
  ],
};
