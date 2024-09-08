import {
  getAllLevels,
  getFooterData,
  getTransletion,
  getMainFile,
  findByModalName,
  findByTabName,
  getLangArray,
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
  const staticData = [
    {
      url: "/svg/level/citizen.png",
      score: 10,
      id: 1,
      route_name: "citizen-baguette",
    },
    {
      url: "/svg/level/reporter.png",
      score: 990,
      id: 2,
      route_name: "reporter-baguette",
    },
    {
      url: "/svg/level/participation.png",
      score: 3000,
      id: 3,
      route_name: "participation-baguette",
    },
    {
      url: "/svg/level/developer.png",
      score: 8000,
      id: 4,
      route_name: "developer-baguette",
    },
    {
      url: "/svg/level/inspector.png",
      score: 18000,
      id: 5,
      route_name: "inspector-baguette",
    },
    {
      url: "/svg/level/businessman.png",
      score: 36000,
      id: 6,
      route_name: "businessman-baguette",
    },
    {
      url: "/svg/level/lawyer.png",
      score: 76000,
      id: 7,
      route_name: "lawyer-baguette",
    },
    {
      url: "/svg/level/city-council.png",
      score: 166000,
      id: 8,
      route_name: "city-council-baguette",
    },
    {
      url: "/svg/level/the-mayor.png",
      score: 366000,
      id: 9,
      route_name: "the-mayor-baguette",
    },
    {
      url: "/svg/level/governor.png",
      score: 796000,
      id: 10,
      route_name: "governor-baguette",
    },
    {
      url: "/svg/level/minister.png",
      score: 1696000,
      id: 11,
      route_name: "minister-baguette",
    },
    {
      url: "/svg/level/judge.png",
      score: 3696000,
      id: 12,
      route_name: "judge-baguette",
    },
    {
      url: "/svg/level/legislator.png",
      score: 7896000,
      id: 13,
      route_name: "legislator-baguette",
    },
  ];
  const defaultTheme = useServerDarkMode();

  const levelArray = await getAllLevels();

  const footerTabs = await getFooterData(params);

  const langArray = await getLangArray();

  const langData = await getTransletion(params.lang);
  const mainData = await getMainFile(langData);
  const levels = await findByModalName(mainData, "levels");

  const levelPageArrayContent = await findByTabName(levels, "levels-page");
  const levelListArrayContent = await findByTabName(levels, "level-list");
  const concatArrayContent = levelPageArrayContent.concat(
    levelListArrayContent
  );
  const modalsProfile = await findByModalName(mainData, "Citizenship-profile");

  const tabsMenu = await findByTabName(modalsProfile, "menu");
  const staticMenuToShow = [
    { name: "home", url: "", order: "-1" },
    { name: "citizens", url: "/citizen", order: "-1" },
    // { name: "list of levels", url: "/levels/citizen", order: "-1" },
    { name: "property", url: "" },
    { name: "real estate", url: "" },
    { name: "structures", url: "" },
    { name: "belongings", url: "" },
    { name: "permissions", url: "" },
    { name: "invitations", url: "" },
    { name: "transaction", url: "" },
    { name: "reward", url: "" },
    { name: "dynasty", url: "" },
    { name: "connections", url: "" },
    { name: "crimes", url: "" },
    { name: "news", url: "" },
    { name: "articles", url: "" },
    { name: "trainings", url: "" },
    { name: "about", url: "" },
    { name: "contact", url: "" },
    { name: "version", url: "" },
    { name: "calendar", url: "" },
    { name: "overview", url: "" },
  ];

  // add staticMenuToShow values to siblings tabsMenu values
  tabsMenu.forEach((tab: any) => {
    let findInStatic = staticMenuToShow.find((val) => tab.name == val.name);
    if (findInStatic) {
      tab.url = findInStatic.url;
      tab.order = findInStatic.order;
      tab.toShow = true;
    }
  });

  function localFind(_name: any) {
    return concatArrayContent.find((item: any) => item.name == _name)
      .translation;
  }

  levelArray.forEach((el1: any) => {
    staticData.forEach((el2: any) => {
      if (el1.id == el2.id) {
        el1.photo = el2.url;
        el1.rank = 1;
        el1.score = el2.score;
        el1.route_name = el2.route_name;
      }
    });
  });

  return (
    <>
      <div className={`flex dark:bg-black `} dir={langData.direction}>
        <SideBar
          langArray={langArray}
          langData={langData}
          tabsMenu={tabsMenu}
          defaultTheme={defaultTheme}
          params={params}
          pageSide="citizen"
        />
        <section
          // id={`${
          //   themeDataActive == "dark" ? "dark-scrollbar" : "light-scrollbar"
          // }`}

          className={`h-screen overflow-y-auto relative light-scrollbar dark:dark-scrollbar`}
        >
          <div className="px-5 pb-10 lg:pb-20">
            <h2 className="font-rokh font-bold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] text-center dark:text-white mt-[110px] lg:mt-[64px] mb-[16px]">
              {localFind("levels of citizens of the metaverse")}
            </h2>
            <p className="text-lightGray font-azarMehr font-normal text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] text-center">
              {localFind(`the levels of "metaverse rang" in the parallel`)}
            </p>
          </div>
          <div className="flex justify-center flex-wrap ">
            {levelArray.map((item: any) => (
              <LevelCard
                item={item}
                allLevelArrayContent={concatArrayContent}
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
