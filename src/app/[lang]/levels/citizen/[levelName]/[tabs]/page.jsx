import React, { Suspense } from "react";
import dynamic from "next/dynamic";

// import GeneralInfo from "@/components/module/levelComponent/GeneralInfo"
const GeneralInfo = dynamic(() => import('@/components/module/levelComponent/GeneralInfo'))
const TabSelector = dynamic(() => import('@/components/module/levelComponent/TabSelector'))
const Gem = dynamic(() => import('@/components/module/levelComponent/Gem'))
const Gift = dynamic(() => import('@/components/module/levelComponent/Gift'))
const Permission = dynamic(() => import('@/components/module/levelComponent/Permissions'))
const Prize = dynamic(() => import('@/components/module/levelComponent/Prize'))
const DynamicFooter = dynamic(() => import('@/components/module/footer/DynamicFooter'))
const BreadCrumb = dynamic(() => import('@/components/shared/BreadCrumb'))
const ImageBox = dynamic(() => import('@/components/module/levelComponent/ImageBox'))

import { targetData } from "@/components/utils/targetDataName";
import {
  getFooterData,
  getTranslation,
  getMainFile,
  getSingleLevel,
  getLevelTabs,
  findByModalName,
  findByTabName,
} from "@/components/utils/actions";
import { Features } from "@/components/module/levelComponent/Features";
import Head from "next/head";
import { findByUniqueId } from "@/components/utils/findByUniqueId";


// SEO**
export async function generateMetadata({ params }) {

  const staticRouteNames = [
    { id: 1,unique_id:382, route_name: "citizen-baguette" },
    { id: 2,unique_id:383, route_name: "reporter-baguette" },
    { id: 3,unique_id:589, route_name: "participation-baguette" },
    { id: 4,unique_id:68, route_name: "developer-baguette" },
    { id: 5,unique_id:69, route_name: "inspector-baguette" },
    { id: 6,unique_id:590, route_name: "businessman-baguette" },
    { id: 7,unique_id:71, route_name: "lawyer-baguette" },
    { id: 8,unique_id:591, route_name: "city-council-baguette" },
    { id: 9,unique_id:592, route_name: "the-mayor-baguette" },
    { id: 10,unique_id:74, route_name: "governor-baguette" },
    { id: 11,unique_id:75, route_name: "minister-baguette" },
    { id: 12,unique_id:76, route_name: "judge-baguette" },
    { id: 13,unique_id:77, route_name: "legislator-baguette" },
  ];
  const levelId = staticRouteNames.find(x => x.route_name === params.levelName)?.id
  const levelUniqueId = staticRouteNames.find(x => x.route_name === params.levelName)?.unique_id
  
  const [singleLevel, levelTabs, langData] = await Promise.all([
    getSingleLevel(levelId),
    getLevelTabs(params, levelId),
    getTranslation(params.lang)
  ])

  const mainData = await getMainFile(langData);

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

  const [levelPageArrayContent, levelListArrayContent] = await Promise.all([
    findByTabName(levels, "levels-page"),
    findByTabName(levels, "level-list")
  ])

  const concatArrayContent = levelPageArrayContent.concat(
    levelListArrayContent
  );

  function localFind2() {
    // HIN not good
    //item.name and _slug have fa/en number string
    //convert
    let temp = concatArrayContent.find(
      (item) => Number(item.unique_id) == Number(levelUniqueId)
    );
    
    return temp?.translation
  }


  async function tabNameConvert(_tabName){
    switch (_tabName) {
      case "general-info":
        // return "basic level information"
        return 387
      case "licenses":
        // return "permissions and access"
        return 388
      case "gem":
        // return "surface gem"
        return 389
      case "gift":
        // return "accompanying gift"
        return 390
      case "prize":
        // return "reward for reaching the level"
        return 391
      default:
        break;
    }
  }

  return {
    title:`${localFind2()}`,
    description:await makeLessCharacter(levelTabs.data.description || singleLevel.data.general_info.description),
    openGraph: {
      type: 'website',
      description: await makeLessCharacter(levelTabs.data.description || singleLevel.data.general_info.description),      
      locale: params.lang == 'fa'? 'fa_IR' : 'en_US',
      title: `${localFind2()}`,
      url: `https://rgb.irpsc.com/${params.lang}/levels/citizen${params.levelName ? "/" + params.levelName:""}${params.tabs ? "/" + params.tabs:""}`,
      // keywords: `${await targetData(levelsTranslatePage,await tabNameConvert(params.tabs))}، متاورس ایران، شهروند متاورس`,
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
   const staticRouteNames = [
    { id: 1,unique_id:382, route_name: "citizen-baguette" },
    { id: 2,unique_id:383, route_name: "reporter-baguette" },
    { id: 3,unique_id:589, route_name: "participation-baguette" },
    { id: 4,unique_id:68, route_name: "developer-baguette" },
    { id: 5,unique_id:69, route_name: "inspector-baguette" },
    { id: 6,unique_id:590, route_name: "businessman-baguette" },
    { id: 7,unique_id:71, route_name: "lawyer-baguette" },
    { id: 8,unique_id:591, route_name: "city-council-baguette" },
    { id: 9,unique_id:592, route_name: "the-mayor-baguette" },
    { id: 10,unique_id:74, route_name: "governor-baguette" },
    { id: 11,unique_id:75, route_name: "minister-baguette" },
    { id: 12,unique_id:76, route_name: "judge-baguette" },
    { id: 13,unique_id:77, route_name: "legislator-baguette" },
  ];

  const levelId = staticRouteNames.find(x => x.route_name === params.levelName)?.id
  const levelUniqueId = staticRouteNames.find(x => x.route_name === params.levelName)?.unique_id


  const [langData, footerTabs, singleLevel, levelTabs] = await Promise.all([
    getTranslation(params.lang),
    getFooterData(params),
    getSingleLevel(levelId),
    getLevelTabs(params, levelId)
  ]);
  
  // add unique_id according to staticRouteNames to use in component for translate
  staticRouteNames.map((item)=>{
    if(item.id == singleLevel.data.slug){
      singleLevel.data.unique_id = item.unique_id
    }
  })

  const mainData = await getMainFile(langData);
  const levelsOld = mainData.modals.find((x) => x.name == "levels");
  
  const levelsTranslatePage = levelsOld.tabs.find(
    (x) => x.name == "levels-page"
  ).fields;


  const levels = await findByModalName(mainData, "levels");

  // const levelPageArrayContent = await findByTabName(levels, "levels-page");
  // const levelListArrayContent = await findByTabName(levels, "level-list");

  const [levelPageArrayContent, levelListArrayContent] = await Promise.all([
    findByTabName(levels, "levels-page"),
    findByTabName(levels, "level-list"),
  ]);

  const concatArrayContent = levelPageArrayContent.concat(
    levelListArrayContent
  );

  function localFind(_slug) {
    
    return concatArrayContent.find(
      (item) => item.name == _slug
    )?.translation;
  }
  function localFind2() {
    // HIN not good
    //item.name and _slug have fa/en number string
    //convert
    return concatArrayContent.find(
      (item) => Number(item.unique_id) == Number(levelUniqueId)
    )?.translation;
  }

  // another schema for this page are on this page's components(tabs)
  const secondSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        // "name": await targetData(levelsTranslatePage, "basic level information"),
        name: findByUniqueId(mainData,387),
        "item": `https://rgb.irpsc.com/${params.lang}/levels/citizen/${params.levelName}/general-info`
      },
      {
        "@type": "ListItem",
        "position": 2,
        // "name": targetData(levelsTranslatePage,"permissions and access"),
        name: findByUniqueId(mainData,388),
        "item": `https://rgb.irpsc.com/${params.lang}/levels/citizen/${params.levelName}/licenses`
      },
      {
        "@type": "ListItem",
        "position": 3,
        // "name": targetData(levelsTranslatePage,"surface gem"),
        name: findByUniqueId(mainData,389),
        "item": `https://rgb.irpsc.com/${params.lang}/levels/citizen/${params.levelName}/gem`
      },
      {
        "@type": "ListItem",
        "position": 4,
        // "name": targetData(levelsTranslatePage,"accompanying gift"),
        name: findByUniqueId(mainData,390),
        "item": `https://rgb.irpsc.com/${params.lang}/levels/citizen/${params.levelName}/gift`
      },
      {
        "@type": "ListItem",
        "position": 5,
        // "name": targetData(levelsTranslatePage,"reward for reaching the level"),
        name: findByUniqueId(mainData,391),
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

      <Head>
        <link
          rel="preload"
          href={singleLevel.data.general_info.png_file}
          as="image"
          type="image/png"
          crossorigin="anonymous"
        />
        {levelTabs.data.png_file && <link
          rel="preload"
          href={levelTabs.data.png_file}
          as="image"
          type="image/png"
          crossorigin="anonymous"
        />}
      </Head>

      <div className="xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-3 w-full font-azarMehr ">
        <div className="">
          <BreadCrumb params={params} />
        </div>
        
        <div className="grid-container gap-x-7 bg-white dark:bg-[#080807] rounded-[20px] p-5 3xl:p-[30px] relative">
          {/* __________1 Btn + Title*/}
          <div className=" self-start md:order-none w-full md:min-w-[65vw] xl:min-w-[65vw] flex items-center justify-between font-bold pt-[3px] pb-5 dark:text-white text-lg sm:text-xl lg:text-2xl 2xl:text-3xl 3xl:text-4xl">
            <h1 className="text-[36px]">{localFind2()}</h1>
            <button className="w-max py-3 px-5 text-[14px] dark:bg-bgLightGrey2 bg-bgLightGrey dark:text-white font-bold text-textGray rounded-[12px]">
              {/* {localFind('list of recipients')} */}
              {findByUniqueId(mainData,392)}
            </button>
          </div>
          {/* __________2 Tab Selector*/}

          <div className="grid-second overflow-hidden mb-5 self-start w-full md:min-w-[65vw] xl:min-w-[65vw] ">
            <TabSelector
              params={params}
              // levelsTranslatePage={levelsTranslatePage}
              mainData={mainData}
            />
          </div>
          {/* __________3 Content*/}

          <div className="grid-third w-full md:min-w-[65vw] xl:min-w-[65vw] px-1 ">
            {params.tabs == "general-info" && (
              <GeneralInfo
                mainData={mainData}
                levelTabs={levelTabs}
                // levelsTranslatePage={levelsTranslatePage}
                singleLevel={singleLevel}
                params={params}
                concatArrayContent={concatArrayContent}
              />
            )}
            {params.tabs == "gem" && (
              <Gem
                mainData={mainData}
                // levelsTranslatePage={levelsTranslatePage}
                levelTabs={levelTabs}
                singleLevel={singleLevel}
                params={params}
                concatArrayContent={concatArrayContent}
              />
            )}
            {params.tabs == "gift" && (
              <Gift
                mainData={mainData}
                // levelsTranslatePage={levelsTranslatePage}
                levelTabs={levelTabs}
                singleLevel={singleLevel}
                params={params}
                concatArrayContent={concatArrayContent}
              />
            )}
            {params.tabs == "licenses" && (
              <Permission
                mainData={mainData}
                levelTabs={levelTabs}
                // levelsTranslatePage={levelsTranslatePage}
                singleLevel={singleLevel}
                params={params}
              />
            )}
            {params.tabs == "prize" && (
              <Prize
                
                levelTabs={levelTabs} 
                singleLevel={singleLevel}
                params={params}
                mainData={mainData}
                concatArrayContent={concatArrayContent}
              />
            )}
          </div>
          {/* __________4 Image*/}
          <div className="grid-forth flex-1 relative !mt-[-2px]">
            <Suspense fallback={<div>image box loading ...</div>} >
              <ImageBox item={levelTabs.data} singleLevel={singleLevel} />
            </Suspense>
          </div>
        </div>
        <div>
          <Features  mainData={mainData} params={params}/>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
        <DynamicFooter footerTabs={footerTabs} mainData={mainData} />
      </div>
    </>
  );
}
