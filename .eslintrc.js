// This configuration only applies to the package manager root.
/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["fig-token"],
  ignorePatterns: ["apps/**/*.*", "packages/**/*.*"],
};
