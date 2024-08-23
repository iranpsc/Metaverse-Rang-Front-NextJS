import {
  getAllLevels,
  getFooterData,
  getTransletion,
  getMainFile,
  findByModalName,
  findByTabName,
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
  const levels = await findByModalName(mainData, "levels");
  
  const levelPageArrayContent = await findByTabName(levels, "levels-page")
  const levelListArrayContent = await findByTabName(levels, "level-list")
  const concatArrayContent= levelPageArrayContent.concat(levelListArrayContent)
  const modalsProfile = await findByModalName(mainData, "Citizenship-profile")
  const tabsMenu =await findByTabName(modalsProfile, "menu")
  function localFind(_name: any) {
    return concatArrayContent.find((item: any) => item.name == _name)
      .translation;
  }
  
  const staticData = [
    {
      url: "/svg/level/citizen.png",
      score:10,
      id:1

    },
    {
      url: "/svg/level/reporter.png",
      score:990,
      id:2
    },
    {
      url: "/svg/level/participation.png",
      score:3000,
      id:3
    },
    {
      url: "/svg/level/developer.png",
      score:8000,
      id:4
    },
    {
      url: "/svg/level/inspector.png",
      score:18000,
      id:5
    },
    {
      url: "/svg/level/businessman.png",
      score:36000,
      id:6
    },
    {
      url: "/svg/level/lawyer.png",
      score:76000,
      id:7
    },
    {
      url: "/svg/level/city-council.png",
      score:166000,
      id:8
    },
    {
      url: "/svg/level/the-mayor.png",
      score:366000,
      id:9
    },
    {
      url: "/svg/level/governor.png",
      score:796000,
      id:10
    },
    {
      url: "/svg/level/minister.png",
      score:1696000,
      id:11
    },
    {
      url: "/svg/level/judge.png",
      score:3696000,
      id:12
    },
    {
      url: "/svg/level/legislator.png",
      score:7896000,
      id:13
    },
  ];
  levelArray.forEach((el1:any)=>{
    staticData.forEach((el2:any)=>{
      if(el1.id == el2.id){
        el1.photo = el2.url
        el1.rank = 1
        el1.score = el2.score
      }
    })
  })
  console.log("concatArrayContent",concatArrayContent);
  
  return (
    <>
      <div className={`flex dark:bg-black `} dir={langData.direction}>
        <SideBar
          languageSelected={params.lang}
          langData={langData}
          mainData={tabsMenu}
          defaultTheme={defaultTheme}
          params={params}
          pageSide="citizen"
        />
        <section
          // id={`${
          //   themeDataActive == "dark" ? "dark-scrollbar" : "light-scrollbar"
          // }`}

          className={`h-screen overflow-y-auto relative`}
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
