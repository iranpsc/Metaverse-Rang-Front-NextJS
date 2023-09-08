import { useContext } from "react";
import type { AppProps } from "next/app";
import "./../styles/global.css";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";

import SidebarProvider from "@/components/context/SidebarContext";
import LangProvider from "@/components/context/LangContext";
import AuthProvider from "@/components/context/AuthContext";



const azarMehr = localFont({
  src: [
    {
      path: "../../public/fonts/AzarMehr-DS2-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/AzarMehr-DS2-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/AzarMehr-DS2-Medium.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/AzarMehr-DS2-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/AzarMehr-DS2-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/AzarMehr-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/AzarMehr-DS2-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/AzarMehr-ExtraBlack.woff2",
      weight: "950",
      style: "normal",
    },
  ],
  variable: "--font-font-azar",
});

export default function App({ Component, pageProps }: AppProps) {
  
  return (
<<<<<<< HEAD
    <>
      <Head>
        <link  href="/fonts/BebasNeue-Regular.ttf" rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link href="/fonts/BrunoAceSC-Regular.ttf" rel="preload" as="font" type="font/woff" crossOrigin="anonymous" />
        <link href="/fonts/DigiHamisheBold.ttf" rel="preload" as="font" type="font/woff" crossOrigin="anonymous" />
        <link href="/fonts/DigiHamisheRegular.ttf" rel="preload" as="font" type="font/woff" crossOrigin="anonymous" />
        <link href="/fonts/JannaLTBold.ttf" rel="preload" as="font" type="font/woff" crossOrigin="anonymous" />
        <link href="/fonts/Sans.ttf" rel="preload" as="font" type="font/woff" crossOrigin="anonymous" />
      </Head>
      <Component {...pageProps} />
    </>
=======
    <ThemeProvider attribute="class">
      <LangProvider>
        <AuthProvider>
        <main className={`${azarMehr.variable}`}>
          <SidebarProvider>
            <Component {...pageProps} />
          </SidebarProvider>
        </main>
        </AuthProvider>
      </LangProvider>
    </ThemeProvider>
>>>>>>> f1bc425b24d33901425b278d097fa688f9081c71
  );
}
