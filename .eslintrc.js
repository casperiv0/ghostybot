module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: "eslint:recommended",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-multi-spaces": ["error"],
    eqeqeq: ["warn", "always"],
    "no-unused-vars": ["error"],
    "no-duplicate-case": ["error"],
    "no-extra-semi": ["error"],
    "no-unreachable": ["error"],
    "default-case": ["warn"],
    "default-case-last": ["error"],
    "no-useless-catch": ["warn"],
  },
};
