/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: "jit", // or 'aot'
  purge: ["./src/**/*.{js,jsx,ts,tsx}"], // path to your application files
  darkMode: "class",
  theme: {
    colors: {
      black: "rgba(0, 0, 0, 1)",
      lightGray: "rgba(0, 0, 0, 0.09)",
      mediumGray: "rgba(116, 116, 116, 0.58)",
      gray: "rgba(133, 133, 133, 1)",
      extraGray: "rgba(86, 89, 89, 1)",
      white: "#ffffff",
      blueLink: "#0000FF",
      dark: {
        background: "#2C2C2C",
        gray: "#9A9A9A",
        yellow: "#FFC700",
        lightWhite: "rgba(255, 255, 255, 0.09)",
      },
    },
    extend: {
      fontFamily: {
        azarMehr: ["var(--font-font-azar)"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
