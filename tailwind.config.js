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
      "4xl": "2500px",
      tall0: { raw: "(max-height: 500px)" },
      tall: { raw: "(min-height: 1000px)" },
      tall2: { raw: "(min-height: 1200px)" },
    },
    // colors: {
    //   black: "rgba(0, 0, 0, 1)",
    //   lightGrey: "rgba(0, 0, 0, 0.09)",
    //   mediumGray: "rgba(116, 116, 116, 0.58)",
    //   mediumGrayFull: "rgba(116, 116, 116)",
    //   gray: "#151b30",*
    //   extraGray: "rgba(86, 89, 89, 1)",

    //   white: "#ffffff",

    //   blueLink: "#0000FF",*

    //   error: "#ff0000",*

    //   defaultButton: "#D4ECFF",
    //   activeButton: "#008BF8",*

    //   defaultTextButton: "#008BF8",
    //   activeTextButton: "#D4ECFF",

    //   borderField: "#DADADA",
    //   Field: "#FCFCFC",
    //   dark: {
    //     background: "#1E1E1E",
    //     backgroundModules: "#000000",
    //     defaultButton: "#332800",
    //     activeButton: "#FFC700",
    //     gray: "#ABABAB",
    //     yellow: "#FFC700",
    //     lightWhite: "rgba(255, 255, 255, 0.09)",
    //     borderField: "#282828",
    //     Field: "#2C2C2C",

    //     borderFieldError: "#930000",
    //     bgFieldError: "#380000",
    //     textFieldError: "#fa2323",
    //   },
    //   education: {
    //     backWhite: "#FFFFFF",
    //     back: "#F8F8F8",
    //     blue200: "#0066FF",
    //     blue100: "#157EFB",
    //     primary200: "#4C4C4C",
    //     primary100: "#515151",
    //     dark: {
    //       yellow: "#FFC700",
    //       background: "#1A1A18",
    //       primary300: "#FFFFFF",
    //       primary200: "#C9C9C9",
    //       primary100: "#868B90",
    //     },
    //   },

    //   singleVideo: {
    //     gray: "#414040",
    //     backgroundInput: "#ECECEC",
    //     textInput: "#868B90",
    //     dark: {
    //       background: "#080807",
    //       text: "868B90",
    //     },
    //   },
    // },
    extend: {
      colors: {
        // *** this project custome START
        black: "rgba(0, 0, 0, 1)",
        lightGray: "#868B90",
        darkGray:"#484950",
        bgLightGrey:"#E9E9E9",
        textGray:'#33353B',
        bgGray:'#F4F4F4',
        bgLightGrey2:"#3B3B3B",
        mediumGray: "rgba(116, 116, 116, 0.58)",
        mediumGrayFull: "rgba(116, 116, 116)",
        gray: "#151b30",
        extraGray: "rgba(86, 89, 89, 1)",
        white: "#ffffff",
        blueLink: "#0066ff",
        error: "#ff0000",
        defaultButton: "#D4ECFF",
        activeButton: "#008BF8",
        defaultTextButton: "#008BF8",
        activeTextButton: "#D4ECFF",
        borderField: "#DADADA",
        Field: "#FCFCFC",
        darkGrey: "#1A1A18",
        darkGrey_1:"#10100F",
        grayLight:"#F8F8F8",
        activeGrey:"#626262",
        divider:"#2d2d2a38",
        // *** this project custome END
        light: {
          test: "#2503f1",
          primary: "#0066FF",
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
            otherColors: {
              green: "#18C08F",
              red: "#F03A47",
              yellow: "#FFC107",
              menuBg: "#FFFFFF",
              themeBtn: "#F4F4F4",
              textBtn:"#868B90",
            },
          },
        },
        dark: {
          test: "#ff0000",
          primary: "#FFC700",
          // *** this project custome START
          background: "#1E1E1E",
          backgroundModules: "#000000",
          defaultButton: "#332800",
          activeButton: "#FFC700",
          gray: "#ABABAB",
          yellow: "#FFC700",
          lightWhite: "rgba(255, 255, 255, 0.09)",
          borderField: "#282828",
          Field: "#2C2C2C",
          borderFieldError: "#930000",
          bgFieldError: "#380000",
          textFieldError: "#fa2323",
          // *** this project custome END
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
          newColors: {
            primaryText: "#0066FF",
            shades: {
              100: "#DEDEE9",
              bg1: "#BEBFC9",
              bgOn: "#A0A0AB",
              bg2: "#84858F",
              90: "#6A6B74",
              80: "#52545C",
              70: "#3E3E46",
              matn2: "#333538",
              60: "#2A2B32",
              50: "#191B21",
              40: "#141619",
              title: "#101215",
              30: "#0C0E11",
              20: "#08090A",
            },
            otherColors: {
              green: "#18C08F",
              red: "#F03A47",
              yellow: "#FFC107",
              menuBg: "#1A1A18",
              themeBtn: "#000000",
            },
          },
        },
      },
      spacing: {
        8: "8px",
        16: "16px",
        24: "24px",
        32: "32px",
        40: "40px",
        56: "56px",
        72: "72px",
        80: "80px",
        96: "96px",
        120: "120px",
      },
      fontFamily: {
        azarMehr: ["var(--font-font-azar)"],
        rokh: ["var(--font-font-rokh)"],
      },
      boxShadow: {
        "3xl": "0px 35px 60px 15px rgba(0, 0, 0, 0.6)",
        dark: "0px 0px 10px rgba(255, 255, 255, 0.1)",
        darkSearch: "0px 0px 10px 0px rgba(255, 255, 255, 0.07)",
        left: "-1px 0px 10px 0px rgba(75, 75, 75, 0.1)",
        leftDark: "-1px 0px 10px 0px rgba(255, 255, 255, 0.1)",
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

        singleVideo_medium: ["16px"],
        singleVideo_title: ["32px"],
      },
    },

  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
  corePlugins: {
    preflight: false,
},
};
