import "./../styles/global.css";
import { azarMehr } from "@/components/utils/fonts";
import { rokh } from "@/components/utils/fonts";
import useServerDarkMode from "src/hooks/use-server-dark-mode";
import ToastProvider from '../components/shared/toastProvider';
import { Suspense } from 'react';


export const metadata = {
  // SEO** adding to all pages
  openGraph: {
    // type: 'website',
  },
  other: {
    "google-site-verification": "lmf8kBJQgLHew_wXcxGQwJQWiOSFy8odEBRTLOoX7Q4",
  },
  // links: [
  //   // Preload AzarMehr fonts
  //   {
  //     rel: 'preload',
  //     href: '/fonts/AzarMehr-DS2-Thin.woff2',
  //     as: 'font',
  //     type: 'font/woff2',
  //     crossorigin: 'anonymous',
  //   },
  //   {
  //     rel: 'preload',
  //     href: '/fonts/AzarMehr-DS1-FD-Medium.ttf',
  //     as: 'font',
  //     type: 'font/woff2',
  //     crossorigin: 'anonymous',
  //   },
  //   {
  //     rel: 'preload',
  //     href: '/fonts/AzarMehr-DS2-Medium.woff2',
  //     as: 'font',
  //     type: 'font/woff2',
  //     crossorigin: 'anonymous',
  //   },
  //   {
  //     rel: 'preload',
  //     href: '/fonts/AzarMehr-DS2-Bold.woff2',
  //     as: 'font',
  //     type: 'font/woff2',
  //     crossorigin: 'anonymous',
  //   },
  //   {
  //     rel: 'preload',
  //     href: '/fonts/AzarMehr-ExtraBold.woff2',
  //     as: 'font',
  //     type: 'font/woff2',
  //     crossorigin: 'anonymous',
  //   },
  //   {
  //     rel: 'preload',
  //     href: '/fonts/AzarMehr-DS2-Black.woff2',
  //     as: 'font',
  //     type: 'font/woff2',
  //     crossorigin: 'anonymous',
  //   },
  //   {
  //     rel: 'preload',
  //     href: '/fonts/AzarMehr-ExtraBlack.woff2',
  //     as: 'font',
  //     type: 'font/woff2',
  //     crossorigin: 'anonymous',
  //   },
  //   // Preload Rokh font
  //   {
  //     rel: 'preload',
  //     href: '/fonts/Rokh-Bold.woff2',
  //     as: 'font',
  //     type: 'font/woff2',
  //     crossorigin: 'anonymous',
  //   },
  // ],
};

export default function RootLayout({
  children,
  params,
}
// : {
//   children: React.ReactNode;
//   params: { lang: any };
// }
) {
  const theme = useServerDarkMode();
  return (
    <html lang={params.lang} className={theme}>
      <body className={`${azarMehr.variable} ${rokh.variable} h-screen light-scrollbar dark:dark-scrollbar`}>
      <ToastProvider />
        <Suspense fallback={<div className="text-center text-[20px]">Loading...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
