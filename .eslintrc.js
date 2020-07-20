module.exports = {
    env: {
        es6: true,
        node: true,
    },
    extends: "eslint:recommended",
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
    },
    // parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
    },
    // plugins: [],
    rules: {
        "no-console": "off", // "warn" // "off"
    },
    settings: {},
};