import SideBar from "@/components/module/sidebar/SideBar";
import {
  getTransletion,
  getMainFile,
  getLangArray,
} from "@/components/utils/actions";
import useServerDarkMode from "src/hooks/use-server-dark-mode";

export default async function CitizensLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: "en" | "fa" };
}) {
  const defaultTheme = useServerDarkMode();

  //
  const langData = await getTransletion(params.lang);
  const mainData = await getMainFile(langData);
  const langArray = await getLangArray();
  const modalsProfile = mainData.modals.find(
    (modal:any) => modal.name === "Citizenship-profile"
  ).tabs;
  const tabsMenu = modalsProfile.find(
    (item:any) => item.name === "menu"
  ).fields;
  return (
    <main className="flex" dir={langData.direction}>
      <SideBar
        languageSelected={params.lang}
        langData={langData}
        mainData={tabsMenu}
        defaultTheme={defaultTheme}
        params={params}
        pageSide ='citizen'

      />
      <div
        className={`no-scrollbar h-screen overflow-y-auto relative xs:pt-14 sm:pt-14 lg:pt-[0]`}
      >
        {children}
      </div>
    </main>
  );
}
