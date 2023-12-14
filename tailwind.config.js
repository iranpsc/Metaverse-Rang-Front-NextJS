/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit", // or 'aot'
  purge: ["./src/**/*.{js,jsx,ts,tsx}"], // path to your application files
  darkMode: "class",
  theme: {
    screens: {
      xs: { max: "639px" },
      ...defaultTheme.screens,
      "3xl": "1900px",
    },
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
        background: "#1E1E1E",
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
        textFieldError: "#fa2323",
      },
      education: {
        backWhite: "#FFFFFF",
        back: "#F8F8F8",
        blue200: "#0066FF",
        blue100: "#157EFB",
        primary200: "#4C4C4C",
        primary100: "#515151",
        dark: {
          yellow: "#FFC700",
          background: "#1A1A18",
          primary300: "#FFFFFF",
          primary200: "#C9C9C9",
          primary100: "#868B90",
        },
      },
    },
    extend: {
      fontFamily: {
        azarMehr: ["var(--font-font-azar)"],
      },
    },
    fontSize: {
      //sm
      smUser: ["15px"],
      smTitle: ["13px"],
      smDesc: ["13px"],
      //md
      mdUser: ["22px"],
      mdTitle: ["20px"],
      mdDesc: ["20px"],
      //lg
      lgUser: ["15px"],
      lgTitle: ["12px"],
      lgDesc: ["12px"],
      //xl
      xlUser: ["18px"],
      xlTitle: ["14px"],
      xlDesc: ["14px"],
      //3xl
      xl3User: ["24px"],
      xl3Title: ["20px"],
      xl3Desc: ["20px"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
