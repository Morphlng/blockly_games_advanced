module.exports = {
    root: true,
    env: {
        node: true,
        es6: true,
    },
    extends: ["plugin:jest/recommended", "eslint:recommended"],
    rules: {},
    parserOptions: {
        ecmaVersion: 8,
        parser: "@babel/eslint-parser",
    },
};
