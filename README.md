<p align="center">
  <img src="./libs/assets/figma-logo-orig.svg" height="200px" alt="FigToken Logo"/>
</p>
<h1 align="center">FigToken</h1>
<p align="center">
   Toolchain for continuous integration of Figma Design Token and CodeBase
</p>
<p align="center">
  <a aria-label="last commit" href="https://github.com/skymins04/FigToken/commits/main">
    <img alt="" src="https://img.shields.io/github/last-commit/skymins04/FigToken.svg" />
  </a>
  <a aria-label="license" href="https://github.com/skymins04/FigToken/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/skymins04/FigToken.svg" alt="">
  </a>
  <img alt="Language" src="https://img.shields.io/badge/Language-Typescript-blue?logo=typescript"/>
</p>

## Key Features

- **_Export to Code from Figma Variable / Style Design Token_**: The FigToken provides Figma Plugin and CLI for exporting the Figma Variable / Style. FigToken Figma Plugin and CLI support different formats for exporting Figma Variable / Style into code. You can export Figma design tokens in the form of Pure-CSS, JS-wrapped-CSS-Variable, Emotion-theme, Tailwind-theme, etc.

  - Support Export Formats:
    - Pure CSS
    - JS wrapped CSS Variables
    - Emotion theme
    - Tailwind theme

- **_Provides GitHub Marketplace Action for Continued Integration of Design Tokens_**: By adding FigToken Marketplace Action to the GitHub Action workflow, you can automate the integration of design tokens and code bases through the CI pipeline. This action works with FigToken Figma Plugin and FigToken CLI.

## Monorepo Apps

- [**_figma-plugin_**](./apps/figma-plugin): This is a monorepo app for developing Figma Plugin from FigToken.
- **_github-action_**: This is a monorepo app for developing GitHub Marketplace Action from FigToken.
- **_cli_**: This is a monorepo app for developing CLI from FigToken.
