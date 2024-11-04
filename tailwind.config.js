/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "verde-claro": "#A5D4A9",
        "verde-escuro": "#659455",
      },
    },
  },
  plugins: [],
};
