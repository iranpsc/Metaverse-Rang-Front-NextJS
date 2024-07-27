import "./../styles/global.css";
import { azarMehr } from "@/components/utils/fonts";
import { rokh } from "@/components/utils/fonts";
import useServerDarkMode from "src/hooks/use-server-dark-mode";
export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: any };
}) {
  const theme = useServerDarkMode();
  return (
    <html lang="en" className={theme}>
      <body className={`${azarMehr.variable} ${rokh.variable}`}>
        {children}
      </body>
    </html>
  );
}
