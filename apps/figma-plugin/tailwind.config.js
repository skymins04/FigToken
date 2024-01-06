/** @type {import('tailwindcss').Config} */
export default {
  presets: [require("@design-token-exporter/tailwind")],
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
  content: ["./src/ui/**/*.{js,ts,jsx,tsx}"],
};
