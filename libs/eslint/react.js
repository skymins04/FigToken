/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["./index.js"],
  plugins: ["react-refresh"],
  rules: {
    "react/display-name": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
