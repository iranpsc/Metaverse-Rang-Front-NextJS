import GeneralInfo from "@/components/module/levelComponent/GeneralInfo"
import TabSelector from "@/components/module/levelComponent/TabSelector";
import Gem from "@/components/module/levelComponent/Gem";
import Gift from "@/components/module/levelComponent/Gift";
import Permission from "@/components/module/levelComponent/Permissions";
import Prize from "@/components/module/levelComponent/Prize";
import {
  getFooterData,
  getTransletion,
  getMainFile,
} from "@/components/utils/actions";
import DynamicFooter from "@/components/module/footer/DynamicFooter";
import { Features } from "@/components/module/levelComponent/Features";

export default async function lavelSingelPage({ params }) {
  const footerTabs = await getFooterData(params);
  const langData = await getTransletion(params.lang);
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

  async function singleLevel() {
    const res = await fetch(`https://api.rgb.irpsc.com/api/levels/${levelId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  }
  const level = await singleLevel();

  return (
    <>
      <div className="px-7 w-full font-azarMehr ">
        <div className=" w-auto dark:bg-[#080807] rounded-[20px] p-3 relative">
          <div className="flex w-full font-bold sm:w-4/5 py-3 dark:text-white text-lg sm:text-xl lg:text-2xl 2xl:text-3xl 3xl:text-4xl">
            <h1>{level.data.name}</h1>
          </div>
          <div className="w-full sm:w-4/5 ">
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
              langData={langData}
              levelsTranslatePage={levelsTranslatePage}
              params={params}
            />
          )}
          {params.tabs == "gift" && (
            <Gift
              levelId={levelId}
              langData={langData}
              levelsTranslatePage={levelsTranslatePage}
              params={params}
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
