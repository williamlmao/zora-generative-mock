/** @type {import('tailwindcss').Config} */
const headerHeight = "80px";

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}",
    "node_modules/daisyui/dist/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {},
      height: {
        header: headerHeight,
        screenLessHeader: `[calc(100vh_-_80px)]`,
      },
      padding: {
        header: headerHeight,
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "#000000",
          "primary-focus": "#4D4D4D",
          "primary-hover": "#4D4D4D",
          secondary: "#a7a7a7",

          "base-200": "#F2F2F2",
        },
      },
    ],
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
