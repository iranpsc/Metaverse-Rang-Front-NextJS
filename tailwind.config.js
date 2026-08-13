/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: ["class", ".dark"], // ✅ برای class "dark" روی html
  theme: {
    screens: {
      xs: { max: "639px" },
      ...defaultTheme.screens,
      "3xl": "1900px",
      "4xl": "2500px",
      tall0: { raw: "(max-height: 500px)" },
      tall: { raw: "(min-height: 1000px)" },
      tall2: { raw: "(min-height: 1200px)" },
    },
    extend: {
      keyframes: {
        rtlMarquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        ltrMarquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        rtlMarquee: 'rtlMarquee 5s linear infinite',
        ltrMarquee: 'ltrMarquee 5s linear infinite',
      },
colors: {
  // رنگ‌های قدیمی پروژه
  blueLink: "#0066ff",

  // ============================
  // Design System Tokens
  // با پشتیبانی opacity در Tailwind
  // ============================

  /* Primary */
  primary: "rgb(var(--color-primary) / <alpha-value>)",
  "primary-tint-1":
    "rgb(var(--color-primary-tint-1) / <alpha-value>)",
  "primary-tint-2":
    "rgb(var(--color-primary-tint-2) / <alpha-value>)",
  "primary-shade-1":
    "rgb(var(--color-primary-shade-1) / <alpha-value>)",
  "primary-shade-2":
    "rgb(var(--color-primary-shade-2) / <alpha-value>)",


  /* Accent */
  "accent-1":
    "rgb(var(--color-accent-1) / <alpha-value>)",
  "accent-2":
    "rgb(var(--color-accent-2) / <alpha-value>)",


  /* Secondary */
  secondary:
    "rgb(var(--color-secondary) / <alpha-value>)",


  /* Background */
  "bg-primary":
    "rgb(var(--color-bg) / <alpha-value>)",


  /* Gray Scale */
  "gray-1":
    "rgb(var(--color-gray-1) / <alpha-value>)",

  "gray-2":
    "rgb(var(--color-gray-2) / <alpha-value>)",

  "gray-3":
    "rgb(var(--color-gray-3) / <alpha-value>)",


  /* Text */
  "matn-1":
    "rgb(var(--color-text-1) / <alpha-value>)",

  "matn-2":
    "rgb(var(--color-text-2) / <alpha-value>)",

  "matn-3":
    "rgb(var(--color-text-3) / <alpha-value>)",


  /* Titles */
  "title-1":
    "rgb(var(--color-title-1) / <alpha-value>)",

  "title-2":
    "rgb(var(--color-title-2) / <alpha-value>)",


  /* Line & Icon */
  "line-color":
    "rgb(var(--color-line) / <alpha-value>)",

  "icon-color":
    "rgb(var(--color-icon) / <alpha-value>)",


  /* States */
  "state-green":
    "rgb(var(--color-state-green) / <alpha-value>)",

  "state-red":
    "rgb(var(--color-state-red) / <alpha-value>)",

  "state-yellow":
    "rgb(var(--color-state-yellow) / <alpha-value>)",



  // ============================
  // Legacy colors (موقت)
  // ============================

  light: {
    test: "#2503f1",
    primary: "#0066FF",
    placeholder: "#BEBFC9",

    shades: {
      100: "#FFFFFF",
      99: "#FDFAFF",
      98: "#F9F7FF",
      95: "#ECEEFF",
      90: "#D7DDFF",
      80: "#AFBEFD",
      70: "#889FFC",
      60: "#6182FC",
      50: "#3865FB",
      40: "#264DCD",
      35: "#2143B2",
      30: "#1C3998",
      25: "#18307F",
      20: "#132768",
      10: "#0C183F",
    },

    newColors: {
      primaryText: "#fafbfc",
      shades: {
        100: "#FEFEFE",
        bg1: "#FCFCFC",
        bgOn: "#FCFCFC",
        bg2: "#F6F6F6",
        90: "#DEDEE9",
        80: "#BEBFC9",
        70: "#A0A0AB",
        matn2: "#84858F",
        60: "#6A6B74",
        50: "#52545C",
        40: "#3E3E46",
        title: "#333538",
        30: "#2A2B32",
        20: "#191B21",
      },
    },
  },


  dark: {
    test: "#ff0000",
    primary: "#FFC700",
    placeholder: "#84858F",
    background: "#1E1E1E",
    backgroundModules: "#000000",
    defaultButton: "#332800",
    activeButton: "#FFC700",
    gray: "#ABABAB",
    yellow: "#FFC700",

    shades: {
      100: "#FFFFFF",
      99: "#FEBFFF",
      98: "#FDF7EF",
      95: "#FAECCB",
      90: "#F6DA8D",
      80: "#E5B623",
      70: "#C29B1E",
      60: "#A08019",
      50: "#816614",
      40: "#655010",
      35: "#57460E",
      30: "#4A3C0C",
      25: "#3F3A0A",
      20: "#342A09",
      10: "#201A06",
    },
  },
},
      // spacing: {
      //   8: "8px",
      //   16: "16px",
      //   24: "24px",
      //   32: "32px",
      //   40: "40px",
      //   56: "56px",
      //   72: "72px",
      //   80: "80px",
      //   96: "96px",
      //   120: "120px",
      // },
      fontFamily: {
        azarMehr: ['var(--font-azarMehr)','ui-sans-serif', 'system-ui' ],
        rokh: ['var(--font-rokh)'],
      },
      boxShadow: {
        "3xl": "0px 35px 60px 15px rgba(0, 0, 0, 0.6)",
        dark: "0px 0px 10px rgba(255, 255, 255, 0.1)",
        darkSearch: "0px 0px 10px 0px rgba(255, 255, 255, 0.07)",
        left: "-1px 0px 10px 0px rgba(75, 75, 75, 0.1)",
        leftDark: "-1px 0px 10px 0px rgba(255, 255, 255, 0.1)",
      },
      fontSize: {
        smUser: ["15px"],
        smTitle: ["13px"],
        smDesc: ["13px"],
        mdUser: ["22px"],
        mdTitle: ["20px"],
        mdDesc: ["20px"],
        lgUser: ["15px"],
        lgTitle: ["12px"],
        lgDesc: ["12px"],
        xlUser: ["18px"],
        xlTitle: ["14px"],
        xlDesc: ["14px"],
        xl3User: ["24px"],
        xl3Title: ["20px"],
        xl3Desc: ["20px"],
        singleVideo_medium: ["16px"],
        singleVideo_title: ["32px"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("tailwindcss"), 
    require("autoprefixer"), 
    require('@tailwindcss/typography'),
  ],
  corePlugins: {
    preflight: false,
  },
}