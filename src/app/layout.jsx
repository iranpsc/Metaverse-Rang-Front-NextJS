import "./../styles/global.css";
import { azarMehr } from "@/components/utils/fonts";
import { rokh } from "@/components/utils/fonts";
import useServerDarkMode from "src/hooks/use-server-dark-mode";
import ToastProvider from '../components/shared/toastProvider';

export const metadata = {
  // SEO** adding to all pages
  openGraph: {
    // type: 'website',
  },
  other: {
    "google-site-verification": "lmf8kBJQgLHew_wXcxGQwJQWiOSFy8odEBRTLOoX7Q4",
  },
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
        {children}
      </body>
    </html>
  );
}
