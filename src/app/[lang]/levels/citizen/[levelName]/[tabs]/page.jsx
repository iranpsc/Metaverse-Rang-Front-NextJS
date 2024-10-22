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
  findByModalName,
  findByTabName,
  getAllLevels
} from "@/components/utils/actions";
import DynamicFooter from "@/components/module/footer/DynamicFooter";
import { Features } from "@/components/module/levelComponent/Features";
import BreadCrumb from "@/components/shared/BreadCrumb";
import ImageBox from "@/components/module/levelComponent/ImageBox";
import { targetData } from "@/components/utils/targetDataName";

// SEO**
export async function generateMetadata({ params }) {

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
  const singleLevel = await getSingleLevel(levelId);
  const levelTabs = await getLevelTabs(params, levelId);

  const langData = await getTranslation(params.lang);
  const mainData = await getMainFile(langData);
  const levelsOld = mainData.modals.find((x) => x.name == "levels");
  const levelsTranslatePage = levelsOld.tabs.find(
    (x) => x.name == "levels-page"
  ).fields;

  //to make description less than 200 character
  async function makeLessCharacter(_desc) {
    let temp;
    if (_desc) {
      temp = _desc;
      temp = temp.slice(0, 200);
    } else temp = "";
    return temp;
  }

  const levels = await findByModalName(mainData, "levels");
  const levelPageArrayContent = await findByTabName(levels, "levels-page");
  const levelListArrayContent = await findByTabName(levels, "level-list");
  const concatArrayContent = levelPageArrayContent.concat(
    levelListArrayContent
  );

  function localFind2() {
    // HIN not good
    //item.name and _slug have fa/en number string
    //convert
    
    return concatArrayContent.find(
      (item) => Number(item.name) == Number(levelId)
    )?.translation;
  }

  async function tabNameConver(_tabName){
    switch (_tabName) {
      case "general-info":
        return "basic level information"
      case "licenses":
        return "permissions and access"
      case "gem":
        return "surface gem"
      case "gift":
        return "accompanying gift"
      case "prize":
        return "reward for reaching the level"
      default:
        break;
    }
  }

  return {
    openGraph: {
      type: 'website',
      description: await makeLessCharacter(levelTabs.data.description || singleLevel.data.general_info.description),      
      locale: params.lang == 'fa'? 'fa_IR' : 'en_US',
      title: `${await targetData(levelsTranslatePage,await tabNameConver(params.tabs))} ${localFind2()}`,
      url: `https://rgb.irpsc.com/${params.lang}/levels/citizen${params.levelName ? "/" + params.levelName:""}${params.tabs ? "/" + params.tabs:""}`,
      // keywords: `${await targetData(levelsTranslatePage,await tabNameConver(params.tabs))}، متاورس ایران، شهروند متاورس`,
      images: [
        {
          url: levelTabs.data.png_file || singleLevel.data.general_info.png_file,
          width: 800,
          height: 600,
        },
      ],
    },
    // twitter: {
    //   card: 'summary_large_image',
    //   title: post.title,
    //   description: post.description,
    //   images: [post.imageUrl],
    // },
  };
}

export default async function lavelSingelPage({ params }) {

  const footerTabs = await getFooterData(params);

  const langData = await getTranslation(params.lang);
  const mainData = await getMainFile(langData);
  const levelsOld = mainData.modals.find((x) => x.name == "levels");
  const levelsTranslatePage = levelsOld.tabs.find(
    (x) => x.name == "levels-page"
  ).fields;

  const levels = await findByModalName(mainData, "levels");
  const levelPageArrayContent = await findByTabName(levels, "levels-page");
  const levelListArrayContent = await findByTabName(levels, "level-list");
  const concatArrayContent = levelPageArrayContent.concat(
    levelListArrayContent
  );

  function localFind2() {
    // HIN not good
    //item.name and _slug have fa/en number string
    //convert
    
    return concatArrayContent.find(
      (item) => Number(item.name) == Number(levelId)
    )?.translation;
  }

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

  const singleLevel = await getSingleLevel(levelId);

  const levelTabs = await getLevelTabs(params, levelId);

  // another schema for this page are on this page's components(tabs)
  const secondSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": await targetData(levelsTranslatePage, "basic level information"),
        "item": `https://rgb.irpsc.com/${params.lang}/levels/citizen/${params.levelName}/general-info`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": targetData(levelsTranslatePage,"permissions and access"),
        "item": `https://rgb.irpsc.com/${params.lang}/levels/citizen/${params.levelName}/licenses`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": targetData(levelsTranslatePage,"surface gem"),
        "item": `https://rgb.irpsc.com/${params.lang}/levels/citizen/${params.levelName}/gem`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": targetData(levelsTranslatePage,"accompanying gift"),
        "item": `https://rgb.irpsc.com/${params.lang}/levels/citizen/${params.levelName}/gift`
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": targetData(levelsTranslatePage,"reward for reaching the level"),
        "item": `https://rgb.irpsc.com/${params.lang}/levels/citizen/${params.levelName}/prize`
      }
    ]
  }

  return (
    <>
      {/* SCHEMA** */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(secondSchema) }}
      />
      {/* schema END */}

      <div className="xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1 w-full font-azarMehr ">
        <div className="">
          <BreadCrumb params={params} />
        </div>
        <div className="flex flex-col flex-nowrap md:flex-row  dark:bg-[#080807] rounded-[20px] py-3 relative">
          <div className="w-full md:w-[60vw] xl:w-[65vw]">
            <div className="flex font-bold py-3 dark:text-white text-lg sm:text-xl lg:text-2xl 2xl:text-3xl 3xl:text-4xl">
              <h1>{localFind2()}</h1>
            </div>

            <div className="">
              <TabSelector
                params={params}
                levelsTranslatePage={levelsTranslatePage}
              />
            </div>

            {params.tabs == "general-info" && (
              <GeneralInfo
                levelTabs={levelTabs}
                levelsTranslatePage={levelsTranslatePage}
                singleLevel={singleLevel}
                params={params}
                concatArrayContent={concatArrayContent}
              />
            )}
            {params.tabs == "gem" && (
              <Gem
                levelsTranslatePage={levelsTranslatePage}
                levelTabs={levelTabs}
                singleLevel={singleLevel}
                params={params}
                concatArrayContent={concatArrayContent}
              />
            )}
            {params.tabs == "gift" && (
              <Gift
                levelsTranslatePage={levelsTranslatePage}
                levelTabs={levelTabs}
                singleLevel={singleLevel}
                params={params}
                concatArrayContent={concatArrayContent}
              />
            )}
            {params.tabs == "licenses" && (
              <Permission
                levelTabs={levelTabs}
                levelsTranslatePage={levelsTranslatePage}
                singleLevel={singleLevel}
                params={params}
                concatArrayContent={concatArrayContent}
              />
            )}
            {params.tabs == "prize" && (
              <Prize
                levelsTranslatePage={levelsTranslatePage}
                levelTabs={levelTabs} 
                singleLevel={singleLevel}
                params={params}
                concatArrayContent={concatArrayContent}
              />
            )}
          </div>
          <div className="flex-1">
            <ImageBox item={levelTabs.data} singleLevel={singleLevel} />
          </div>
        </div>
        <div>
          <Features levelsTranslatePage={levelsTranslatePage} />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
        <DynamicFooter footerTabs={footerTabs} />
      </div>
    </>
  );
}
