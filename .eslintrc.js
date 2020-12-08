module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  plugins: ["jsx-a11y"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
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
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/no-onchange": "off",
  },
};
