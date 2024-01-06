// This configuration only applies to the package manager root.
/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["design-token-exporter"],
  ignorePatterns: ["apps/**/*.*", "packages/**/*.*"],
};
