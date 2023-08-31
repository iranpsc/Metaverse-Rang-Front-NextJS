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

      error: "#ff0000",

      defaultButton: "#D4ECFF",
      activeButton: "#008BF8",

      defaultTextButton: "#008BF8",
      activeTextButton: "#D4ECFF",

      borderField: "#DADADA",
      Field: "#FCFCFC",
      dark: {
        background: "#2C2C2C",
        backgroundModules: "#000000",
        defaultButton: "#332800",
        activeButton: "#FFC700",
        gray: "#9A9A9A",
        yellow: "#FFC700",
        lightWhite: "rgba(255, 255, 255, 0.09)",
        borderField: "#282828",
        Field: "#2C2C2C",

        borderFieldError: "#930000",
        bgFieldError: "#380000",
        textFieldError: "rgba(201, 0, 0, 1)",

        
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
