import type { AppProps } from "next/app";
import "./../styles/global.css";
import { ThemeProvider } from "next-themes";
//CONTEXT
import SidebarProvider from "@/context/SidebarContext";
import LangProvider from "@/context/LangContext";
import AuthProvider from "@/context/AuthContext";
//FONTS
import {azarMehr} from '@/utils/fonts'




export default function App({ Component, pageProps }: AppProps) {
  
  return (
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
  );
}
