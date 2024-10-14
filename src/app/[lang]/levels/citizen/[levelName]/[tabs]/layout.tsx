import SideBar from "@/components/module/sidebar/SideBar";
import {
  getTranslation,
  getMainFile,
  getLangArray,
  findByTabName,
  findByModalName,
} from "@/components/utils/actions";
import useServerDarkMode from "src/hooks/use-server-dark-mode";

export default async function CitizensLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const defaultTheme = useServerDarkMode();

  //
  const langData = await getTranslation(params.lang);
  const mainData = await getMainFile(langData);
  const levels = await findByModalName(mainData, "levels");
  const langArray = await getLangArray();
  const modalsProfile = await findByModalName(mainData, "Citizenship-profile");
  const activetabsMenu = await findByTabName(levels, "levels-menu");
  const tabsMenu1 = await findByTabName(modalsProfile, "menu");
  const tabsMenu = activetabsMenu.map((x: any) => ({
    ...x,
    menuItem: true,
  }));
  tabsMenu.push(tabsMenu1.find((item: any) => item.name === "meta rgb"));
  tabsMenu.push(tabsMenu1.find((item: any) => item.name === "metaverse rang"));

  return (
    <main className="flex dark:bg-black" dir={langData.direction}>
      <SideBar
        pageSide="level"
        langArray={langArray}
        langData={langData}
        tabsMenu={tabsMenu}
        defaultTheme={defaultTheme}
        params={params}
      />
      <div
        className={`light-scrollbar dark:dark-scrollbar h-screen overflow-y-auto relative xs:pt-14 sm:pt-14 lg:pt-[0]`}
      >
        {children}
      </div>
    </main>
  );
}
