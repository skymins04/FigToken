/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "plugin:@typescript-eslint/eslint-recommended",
    "prettier",
    "eslint-config-turbo",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["unused-imports"],
  ignorePatterns: [
    ".*.js",
    ".*.cjs",
    "node_modules",
    "dist",
    ".eslintrc.cjs",
    ".eslintrc.js",
    ".eslintrc.json",
    ".eslintrc",
  ],
  rules: {
    "no-console": ["error", { allow: ["debug", "warn", "error"] }],
    "unused-imports/no-unused-imports": "error",
  },
};
