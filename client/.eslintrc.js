module.exports = {
  root: true,
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    // 'plugin:vue/recommended',
    'plugin:vue/vue3-recommended',
  ],
};
