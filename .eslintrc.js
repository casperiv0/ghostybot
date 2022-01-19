module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "@casper124578/eslint-config",
    "@casper124578/eslint-config-react",
    "@casper124578/eslint-config-next",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "no-template-curly-in-string": "off",
    "@next/next/no-page-custom-font": "off",
    "@typescript-eslint/consistent-type-imports": "off",
  },
  overrides: [
    {
      files: ["src/interactions/**"],
      rules: {
        "no-restricted-globals": [
          "error",
          {
            /* eslint-disable */
            name: "fetch",
            message: 'Import request from `undici` instead (`import { request } from "undici"`)',
          },
        ],
      },
    },
  ],
};
