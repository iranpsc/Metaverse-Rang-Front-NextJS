import {
  getAllLevels,
  getFooterData,
  getTransletion,
  getMainFile,
} from "@/components/utils/actions";
import DynamicFooter from "@/components/module/footer/DynamicFooter";
import LevelCard from "@/components/module/levelComponent/LevelCard";
import SideBar from "@/components/module/sidebar/SideBar";
import useServerDarkMode from "src/hooks/use-server-dark-mode";

export default async function LevelsPage({
  params,
}: {
  params: { lang: "en" | "fa" };
}) {
  const defaultTheme = useServerDarkMode();

  const levelArray = await getAllLevels();
  const footerTabs = await getFooterData(params);

  const langData = await getTransletion(params.lang);
  const mainData = await getMainFile(langData);
  const levels = mainData.modals.find((x: any) => x.name == "levels");
  console.log('levelslevels',levels);
  const levelsTranslatePage = levels.tabs.find(
    (x: any) => x.name == "levels-page"
  ).fields;
  
  const modalsProfile = mainData.modals.find(
    (modal:any) => modal.name === "Citizenship-profile"
  ).tabs;
  const tabsMenu = modalsProfile.find(
    (item:any) => item.name === "menu"
  ).fields;
  
  return (
    <>
    
    <div className={`flex dark:bg-black `} dir={langData.direction} >

      <SideBar
        languageSelected={params.lang}
        langData={langData}
        mainData={tabsMenu}
        defaultTheme={defaultTheme}
        params={params}
        pageSide ='citizen'
      />
      <section
        // id={`${
        //   themeDataActive == "dark" ? "dark-scrollbar" : "light-scrollbar"
        // }`}

        className={`h-screen overflow-y-auto relative pt-[60px] sm:pt-10`}
      >
      <div className="flex justify-center flex-wrap ">
        {levelArray.data.map((item: any) => (
          <LevelCard
            item={item}
            levelsTranslatePage={levelsTranslatePage}
            params={params}
          />
        ))}
      </div>
      <div className="flex flex-col justify-center items-center">
        <DynamicFooter footerTabs={footerTabs} />
      </div>
      </section>
      </div>
    </>
  );
}
