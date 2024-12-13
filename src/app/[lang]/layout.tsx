import { azarMehr } from "@/components/utils/fonts";
import { rokh } from "@/components/utils/fonts";
import useServerDarkMode from "src/hooks/use-server-dark-mode";
import ToastProvider from "../../components/shared/toastProvider";
import { Suspense } from "react";
import Head from "next/head";

export default function LangLayout({ children, params }: any) {
  const theme = useServerDarkMode();

  return (
    <html className={theme} lang={params.lang}>
      <Head>
        {/* PRE-load */}
        <link rel="preload" as="image" href="/firstpage/replaced_pic.webp" />
        <link
          rel="preload"
          as="video"
          href="/firstpage/3d_rgb.irpsc.webm"
          type="video/mp4"
        />
        <link
          rel="preload"
          href="/fonts/AzarMehr-DS2-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Rokh-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <body
        className={`${azarMehr.variable} ${rokh.variable} h-screen light-scrollbar dark:dark-scrollbar`}
      >
        <ToastProvider />
        <Suspense
          fallback={<div className="text-center text-[20px]">Loading...</div>}
        >
          {children}
        </Suspense>
      </body>
    </html>
  );
}
