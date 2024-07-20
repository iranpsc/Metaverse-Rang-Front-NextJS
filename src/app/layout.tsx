import "./../styles/global.css";
import { azarMehr } from "@/components/utils/fonts";
import { rokh } from "@/components/utils/fonts";
export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: any };
}) {
  return (
    <html lang="en" className="">
      <body className={`${azarMehr.variable} ${rokh.variable}`}>
        {children}
      </body>
    </html>
  );
}
