import SideBar from "@/components/module/sidebar/SideBar";
import {
  getTransletion,
  getMainFile,
  getLangArray,
  getAllLevels
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
  const levelArray = await getAllLevels();
console.log('levelArray -----1',levelArray);


  const levels = mainData.modals.find((x: any) => x.name == "levels");
  
  const tabsMenu = levels.tabs.find(
    (item:any) => item.name === "levels-menu"
  ).fields;
  const modalsProfile = mainData.modals.find(
    (modal:any) => modal.name === "Citizenship-profile"
  ).tabs;
  const tabsMenu1 = modalsProfile.find(
    (item:any) => item.name === "menu"
  ).fields;
  tabsMenu.push(tabsMenu1.find((item:any) => item.name === "meta rgb"))
  tabsMenu.push(tabsMenu1.find((item:any) => item.name === "metaverse rang"))
  console.log('tabsMenu',tabsMenu);
  

  

  return (
    <main className="flex dark:bg-black" dir={langData.direction}>
      <SideBar
        pageSide='level'
        languageSelected={params.lang}
        langData={langData}
        mainData={tabsMenu}
        defaultTheme={defaultTheme}
        params={params}
      />
      <div
        className={`no-scrollbar h-screen overflow-y-auto relative xs:pt-14 sm:pt-14 lg:pt-[0]`}
      >
        {children}
      </div>
    </main>
  );
}
