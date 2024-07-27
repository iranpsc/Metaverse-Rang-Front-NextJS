import SideBar from "@/components/module/sidebar/SideBar";
import { getTransletion, getMainFile } from "@/components/utils/actions";
import useServerDarkMode from "src/hooks/use-server-dark-mode";

export default async function CitizensLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: "en" | "fa" };
}) {
  const languageSelected = params.lang === "en" ? "en" : "fa";
  const lang = params.lang;
  const selectedLangDir = lang === "en" ? "ltr" : "rtl";
  const defaultTheme = useServerDarkMode();

  //
  const langData = await getTransletion(languageSelected);
  const mainData = await getMainFile(langData);
  return (
    <main className="flex" dir={selectedLangDir}>
      <SideBar
        languageSelected={languageSelected}
        langData={langData}
        mainData={mainData}
        defaultTheme={defaultTheme}
      />
      <div className={`no-scrollbar h-screen overflow-y-auto relative`}>
        {children}
      </div>
    </main>
  );
}
