import type { AppProps } from "next/app";
import "./../styles/global.css";
import { ThemeProvider } from "next-themes";
//CONTEXT
import SidebarProvider from "@/context/SidebarContext";
import LangProvider from "@/context/LangContext";
import AuthProvider from "@/context/AuthContext";
import { TokenProvider } from "@/components/context/TokenContext";
//FONTS
import { azarMehr } from "@/utils/fonts";
import { rokh } from "@/utils/fonts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme="dark" enableSystem={false} attribute="class">
      <LangProvider>
        <TokenProvider>
          <AuthProvider>
            <main className={`${azarMehr.variable} ${rokh.variable}`}>
              <SidebarProvider>
                <Component {...pageProps} />
              </SidebarProvider>
            </main>
          </AuthProvider>
        </TokenProvider>
      </LangProvider>
    </ThemeProvider>
  );
}