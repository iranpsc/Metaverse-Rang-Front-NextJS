import GeneralInfo from "@/components/module/levelComponent/GeneralInfo"
import TabSelector from "@/components/module/levelComponent/TabSelector";
import Gem from "@/components/module/levelComponent/Gem";
import Gift from "@/components/module/levelComponent/Gift";
import Permission from "@/components/module/levelComponent/Permissions";
import Prize from "@/components/module/levelComponent/Prize";
import {
  getFooterData,
  getTranslation,
  getMainFile,
  getSingleLevel,
  getLevelTabs,
} from "@/components/utils/actions";
import DynamicFooter from "@/components/module/footer/DynamicFooter";
import { Features } from "@/components/module/levelComponent/Features";
import BreadCrumb from "@/components/shared/BreadCrumb";
import ImageBox from "@/components/module/levelComponent/ImageBox";


export default async function lavelSingelPage({ params }) {
  const footerTabs = await getFooterData(params);
  const langData = await getTranslation(params.lang);
  const mainData = await getMainFile(langData);
  const levels = mainData.modals.find((x) => x.name == "levels");
  const levelsTranslatePage = levels.tabs.find(
    (x) => x.name == "levels-page"
  ).fields;
  const staticRouteNames = [
    { id: 1, route_name: "citizen-baguette" },
    { id: 2, route_name: "reporter-baguette" },
    { id: 3, route_name: "participation-baguette" },
    { id: 4, route_name: "developer-baguette" },
    { id: 5, route_name: "inspector-baguette" },
    { id: 6, route_name: "businessman-baguette" },
    { id: 7, route_name: "lawyer-baguette" },
    { id: 8, route_name: "city-council-baguette" },
    { id: 9, route_name: "the-mayor-baguette" },
    { id: 10, route_name: "governor-baguette" },
    { id: 11, route_name: "minister-baguette" },
    { id: 12, route_name: "judge-baguette" },
    { id: 13, route_name: "legislator-baguette" },
  ];
  const levelId = staticRouteNames.find(x => x.route_name === params.levelName)?.id


  const level = await getSingleLevel(levelId);

  const levelTabs = await getLevelTabs(params, levelId);
  console.log('122333333', level);
  

  return (
    <>
      <div className="px-6 w-full font-azarMehr ">
        <div className="px-6">
          <BreadCrumb params={params} />
        </div>
        <div className="flex flex-col flex-nowrap md:flex-row  dark:bg-[#080807] rounded-[20px] p-3 relative">
          <div className="w-full md:w-[60vw] xl:w-[65vw]">
            <div className="flex font-bold py-3 dark:text-white text-lg sm:text-xl lg:text-2xl 2xl:text-3xl 3xl:text-4xl mx-3">
              <h1>{level.data.name}</h1>
            </div>

            <div className="">
              <TabSelector
                levelId={levelId}
                params={params}
                levelsTranslatePage={levelsTranslatePage}
              />
            </div>

            {params.tabs == "general-info" && (
              <GeneralInfo
                levelId={levelId}
                langData={langData}
                levelsTranslatePage={levelsTranslatePage}
                params={params}
              />
            )}
            {params.tabs == "gem" && (
              <Gem
                levelId={levelId}
                levelsTranslatePage={levelsTranslatePage}
                params={params}
                levelTabs={levelTabs}

              />
            )}
            {params.tabs == "gift" && (
              <Gift
                levelId={levelId}
                levelsTranslatePage={levelsTranslatePage}
                levelTabs={levelTabs}
              />
            )}
            {params.tabs == "licenses" && (
              <Permission
                levelId={levelId}
                levelsTranslatePage={levelsTranslatePage}
                params={params}
              />
            )}
            {params.tabs == "prize" && (
              <Prize
                levelId={levelId} levelsTranslatePage={levelsTranslatePage} params={params} />
            )}
          </div>
          <div className="flex-1">
            <ImageBox item={levelTabs.data} langData={langData} />
          </div>
        </div>
        <div>
          <Features levelsTranslatePage={levelsTranslatePage} />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <DynamicFooter footerTabs={footerTabs} />
      </div>
    </>
  );
}
