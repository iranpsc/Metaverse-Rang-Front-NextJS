import localFont from "next/font/local";

export const azarMehr = localFont({
  src: [
    // {
    //   path: "./../../../public/fonts/AzarMehr-DS2-Thin.woff2",
    //   weight: "100",
    //   style: "normal",
    // },
    {
      // path: "./../../../public/fonts/AzarMehr-DS1-FD-Light.ttf",
      path: "./../../../public/fonts/AzarMehr-DS1-FD-Medium.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./../../../public/fonts/AzarMehr-DS2-Medium.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./../../../public/fonts/AzarMehr-DS2-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./../../../public/fonts/AzarMehr-DS2-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    // {
    //   path: "./../../../public/fonts/AzarMehr-ExtraBold.woff2",
    //   weight: "800",
    //   style: "normal",
    // },
    // {
    //   path: "./../../../public/fonts/AzarMehr-DS2-Black.woff2",
    //   weight: "900",
    //   style: "normal",
    // },
    // {
    //   path: "./../../../public/fonts/AzarMehr-ExtraBlack.woff2",
    //   weight: "950",
    //   style: "normal",
    // },
  ],
  variable: "--font-font-azar",
  // fallback font while loading local fonts
  display: "swap",
});

export const rokh = localFont({
  src: [
    {
      path: "./../../../public/fonts/Rokh-Bold.woff2",
      weight: "950",
      style: "bold",
    },
  ],
  variable: "--font-font-rokh",
  display: "swap",
});
