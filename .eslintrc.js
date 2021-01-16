module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["@typescript-eslint", "jsx-a11y"],
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
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react/react-in-jsx-scope": "off",
    "jsx-a11y/no-onchange": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
