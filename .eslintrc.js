module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["@casper124578/eslint-config", "@casper124578/eslint-config-react", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "no-undef": "off",
    "no-template-curly-in-string": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
};
