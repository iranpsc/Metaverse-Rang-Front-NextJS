import { azarMehr } from "@/components/utils/fonts";
import { rokh } from "@/components/utils/fonts";
import useServerDarkMode from "src/hooks/use-server-dark-mode";
import ToastProvider from "../../components/shared/toastProvider";
import { Suspense } from "react";

export default function LangLayout({ children, params }: any) {
  const theme = useServerDarkMode();

  return (
    <html className={theme} lang={params.lang}>
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
