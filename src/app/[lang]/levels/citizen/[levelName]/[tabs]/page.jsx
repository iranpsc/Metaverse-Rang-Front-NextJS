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
} from "@/components/utils/actions";
import DynamicFooter from "@/components/module/footer/DynamicFooter";
import { Features } from "@/components/module/levelComponent/Features";
import BreadCrumb from "@/components/shared/BreadCrumb";
import ImageBox from "@/components/module/levelComponent/ImageBox";

// SEO**
export async function generateMetadata({ params }) {
  const langData = await getTranslation(params.lang);
  const mainData = await getMainFile(langData);
  const centralPageModal = await findByModalName(mainData, "central-page");
  const firstPageArrayContent = await findByTabName(centralPageModal, "first-page");



  return {
    // title: await localFind('metaverse rang'),
    // description: await makeLessCharacter(),
    // openGraph: {
    //   site_name:'metaverseTest',
    //   type: 'website',
    //   // url: `https://yourwebsite.com/posts/${params.id}`,
    //   title: await localFind('metaverse rang'),
    //   description: await makeLessCharacter(),
    //   locale: params.code == 'fa'? 'fa_IR' : 'en_US',
    //   url: `https://rgb.irpsc.com/${params.lang}`,
    //   images: [
    //     {
    //       url: '/logo.png',
    //       width: 800,
    //       height: 600,
    //       alt: localFind('metaverse rang'),
    //     },
    //   ],
    // },
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

  async function singleLeveldefaultInfo() {
    const res = await fetch(`https://api.rgb.irpsc.com/api/levels/1`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  }
  

  const level = await getSingleLevel(levelId);
  console.log("level123456", level);

  
  const levelTabs = await getLevelTabs(params, levelId);
  console.log("123123", levelTabs);

  //to make description less than 200 character
  async function makeLessCharacter(){
    let temp;
    if(levelTabs.data?.description){
      temp = levelTabs.data.description
      temp = temp.slice(0,200)
    }else(
      temp = ""
    )
    return temp
  }
  
  
  const singleLevelSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "MetaRang Level citizen Information",
    "description": await makeLessCharacter(levelTabs.data.description),
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": levelTabs.data.rank,
        "levelName": "test",
        "description": "پس از ثبت‌نام در متاورس رنگ، کاربران می‌توانند اولین سطح که سطح شهروندی است را به دست آورند. با بیش از 10 ساعت فعالیت در محیط متارنگ، خرید و فروش VOD، افزایش دنبال‌کنندگان و کسب ورودی ارزی، امتیاز کسب می‌کنید. این سطح دارای 6 رتبه مختلف است و با کسب رتبه اول، یک هدیه دریافت خواهید کرد که به شما کمک می‌کند درب‌های جدیدی را باز کنید.",
        "requiredPoints": 10,
        "levelModelSize": "37.5 MB",
        "levelRank": 1,
        "pointsUsedInLevelModel": 1033890,
        "subCategories": 5,
        "levelModelLines": 2055911,
        "creationDate": "1401-08-15",
        "animation": 0,
        "persianFont": "LMN Alex Normal",
        "levelDesigner": "HM-2000001",
        "englishFont": "Bell MT Italic.010",
        "3DModelDesigner": "HM-2000003",
        "usedColors": [
          "#092003",
          "#CCC800",
          "#C0FF3E",
          "#F7FF92"
        ]
      }
    ]
  }
  function localFind2(_slug) {
    // HIN not good
    //item.name and _slug have fa/en number string
    //convert

    return allLevelArrayContent.find(
      (item) => Number(item.name) == Number(_slug)
    )?.translation;
  }
  return (
    <>
      {/* SCHEMA** */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(singleLevelSchema) }}
      />
      {/* schema END */}

      <div className="xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1 w-full font-azarMehr ">
        <div className="">
          <BreadCrumb params={params} />
        </div>
        <div className="flex flex-col flex-nowrap md:flex-row  dark:bg-[#080807] rounded-[20px] py-3 relative">
          <div className="w-full md:w-[60vw] xl:w-[65vw]">
            <div className="flex font-bold py-3 dark:text-white text-lg sm:text-xl lg:text-2xl 2xl:text-3xl 3xl:text-4xl">
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
      <div className="flex flex-col justify-center items-center xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
        <DynamicFooter footerTabs={footerTabs} />
      </div>
    </>
  );
}
