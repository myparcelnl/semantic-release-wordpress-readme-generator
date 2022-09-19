module.exports = {
  root: true,
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 2022,
  },
  env: {
    node: true,
  },
  extends: [
    'plugin:prettier/recommended',
  ],
};
