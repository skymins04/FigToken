/** @type {import('tailwindcss').Config} */
export default {
  presets: [require("../../libs/tailwind/index")],
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
  content: ["./src/ui/**/*.{js,ts,jsx,tsx}"],
};
