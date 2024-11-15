import eslintConfigPrettier from "eslint-config-prettier";

// eslint.config.js
export default [
  {
    rules: {
      "no-console": "warn",
      "no-unused-vars": "error",
      "no-undef": "error",
    },
  },
  eslintConfigPrettier,
];
