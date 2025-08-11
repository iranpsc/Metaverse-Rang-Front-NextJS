import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

import NotFoundPage from "@/components/shared/NotFoundPage";
import {
  getFooterData,
  getTranslation,
  getMainFile,
  getSingleLevel,
  getLevelTabs,
  findByModalName,
  findByTabName,
} from "@/components/utils/actions";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

const GeneralInfo = dynamic(() => import('@/components/module/levelComponent/GeneralInfo'));
const TabSelector = dynamic(() => import('@/components/module/levelComponent/TabSelector'));
const Gem = dynamic(() => import('@/components/module/levelComponent/Gem'));
const Gift = dynamic(() => import('@/components/module/levelComponent/Gift'));
const Permission = dynamic(() => import('@/components/module/levelComponent/Permissions'));
const Prize = dynamic(() => import('@/components/module/levelComponent/Prize'));
const DynamicFooter = dynamic(() => import('@/components/module/footer/DynamicFooter'));
const BreadCrumb = dynamic(() => import('@/components/shared/BreadCrumb'));
const ImageBox = dynamic(() => import('@/components/module/levelComponent/ImageBox'));
import { Features } from "@/components/module/levelComponent/Features";

const STATIC_ROUTE_NAMES = [
  { id: 1, unique_id: 382, route_name: "citizen-baguette" },
  { id: 2, unique_id: 383, route_name: "reporter-baguette" },
  { id: 3, unique_id: 589, route_name: "participation-baguette" },
  { id: 4, unique_id: 68, route_name: "developer-baguette" },
  { id: 5, unique_id: 69, route_name: "inspector-baguette" },
  { id: 6, unique_id: 590, route_name: "businessman-baguette" },
  { id: 7, unique_id: 71, route_name: "lawyer-baguette" },
  { id: 8, unique_id: 591, route_name: "city-council-baguette" },
  { id: 9, unique_id: 592, route_name: "the-mayor-baguette" },
  { id: 10, unique_id: 74, route_name: "governor-baguette" },
  { id: 11, unique_id: 75, route_name: "minister-baguette" },
  { id: 12, unique_id: 76, route_name: "judge-baguette" },
  { id: 13, unique_id: 77, route_name: "legislator-baguette" },
];

async function fetchData(params) {
  const levelMeta = STATIC_ROUTE_NAMES.find(x => x.route_name === params.levelName);
  const levelId = levelMeta?.id;
  const levelUniqueId = levelMeta?.unique_id;

  const [
    langData,
    footerTabs,
    singleLevel,
    levelTabs,
    mainData,
  ] = await Promise.all([
    getTranslation(params.lang),
    getFooterData(params),
    getSingleLevel(levelId),
    getLevelTabs(params, levelId),
    getMainFile(await getTranslation(params.lang)),
  ]);

  return {
    langData,
    footerTabs,
    singleLevel,
    levelTabs,
    mainData,
    levelUniqueId,
  };
}

function getLevelTitle(concatArrayContent, uniqueId) {
  return concatArrayContent.find(item => Number(item.unique_id) === Number(uniqueId))?.translation || '';
}

function buildBreadcrumbSchema(mainData, params) {
  const baseUrl = `https://rgb.irpsc.com/${params.lang}/levels/citizen/${params.levelName}`;
  const ids = [387, 388, 389, 390, 391];
  const urls = ['general-info', 'licenses', 'gem', 'gift', 'prize'];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": ids.map((id, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: findByUniqueId(mainData, id),
      item: `${baseUrl}/${urls[index]}`
    }))
  };
}

export default async function LevelSinglePage({ params }) {
  const {
    langData,
    footerTabs,
    singleLevel,
    levelTabs,
    mainData,
    levelUniqueId
  } = await fetchData(params);

  // اگر داده‌ها ناقص بودند، صفحه 404 نمایش داده شود
  if (!singleLevel?.data || !levelTabs?.data) {
    return (
      <NotFoundPage
        lang={params.lang}
        params={params}
        langData={langData}
        langArray={mainData?.languages || []}
        updatedTabsMenu={mainData?.tabsMenu || []}
        footerTabs={footerTabs}
        mainData={mainData}
        hideSidebar={true}
      />
    );
  }

  // افزودن unique_id در صورت نیاز
  STATIC_ROUTE_NAMES.forEach(item => {
    if (item.id === singleLevel.data.slug) {
      singleLevel.data.unique_id = item.unique_id;
    }
  });

  const levels = await findByModalName(mainData, "levels");
  const [levelPageArrayContent, levelListArrayContent] = await Promise.all([
    findByTabName(levels, "levels-page"),
    findByTabName(levels, "level-list"),
  ]);
  const concatArrayContent = [...levelPageArrayContent, ...levelListArrayContent];

  const pageTitle = getLevelTitle(concatArrayContent, levelUniqueId);
  const breadcrumbSchema = buildBreadcrumbSchema(mainData, params);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Head>
        {singleLevel.data.general_info?.png_file && (
          <link
            rel="preload"
            href={singleLevel.data.general_info.png_file}
            as="image"
            type="image/png"
            crossOrigin="anonymous"
          />
        )}
        {levelTabs.data?.png_file && (
          <link
            rel="preload"
            href={levelTabs.data.png_file}
            as="image"
            type="image/png"
            crossOrigin="anonymous"
          />
        )}
      </Head>

      <div className="xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-3 w-full font-azarMehr ">
        <BreadCrumb params={params} />

        <div className="grid-container gap-x-7 bg-white dark:bg-[#080807] rounded-[20px] p-5 3xl:p-[30px] relative">
          <div className="self-start md:order-none w-full md:min-w-[65vw] xl:min-w-[65vw] flex items-center justify-between font-bold pt-[3px] pb-5 dark:text-white text-lg sm:text-xl lg:text-2xl 2xl:text-3xl 3xl:text-4xl">
            <h1 className="text-[36px]">{pageTitle}</h1>
            <button className="w-max py-3 px-5 text-[14px] dark:bg-bgLightGrey2 bg-bgLightGrey dark:text-white font-bold text-textGray rounded-[12px]">
              {findByUniqueId(mainData, 392)}
            </button>
          </div>

          <div className="grid-second overflow-hidden mb-5 self-start w-full md:min-w-[65vw] xl:min-w-[65vw]">
            <TabSelector params={params} mainData={mainData} />
          </div>

          <div className="grid-third w-full md:min-w-[65vw] xl:min-w-[65vw] px-1">
            {params.tabs === "general-info" && (
              <GeneralInfo
                mainData={mainData}
                levelTabs={levelTabs}
                singleLevel={singleLevel}
                params={params}
                concatArrayContent={concatArrayContent}
              />
            )}
            {params.tabs === "gem" && (
              <Gem
                mainData={mainData}
                levelTabs={levelTabs}
                singleLevel={singleLevel}
                params={params}
                concatArrayContent={concatArrayContent}
              />
            )}
            {params.tabs === "gift" && (
              <Gift
                mainData={mainData}
                levelTabs={levelTabs}
                singleLevel={singleLevel}
                params={params}
                concatArrayContent={concatArrayContent}
              />
            )}
            {params.tabs === "licenses" && (
              <Permission
                mainData={mainData}
                levelTabs={levelTabs}
                singleLevel={singleLevel}
                params={params}
              />
            )}
            {params.tabs === "prize" && (
              <Prize
                levelTabs={levelTabs}
                singleLevel={singleLevel}
                params={params}
                mainData={mainData}
                concatArrayContent={concatArrayContent}
              />
            )}
          </div>

          <div className="grid-forth flex-1 relative !mt-[-2px]">
            <Suspense fallback={<div>image box loading ...</div>}>
              <ImageBox item={levelTabs.data} singleLevel={singleLevel} />
            </Suspense>
          </div>
        </div>

        <Features mainData={mainData} params={params} />
      </div>

      <div className="flex flex-col justify-center items-center xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
        <DynamicFooter footerTabs={footerTabs} mainData={mainData} />
      </div>
    </>
  );
}
export async function generateMetadata({ params }) {
  const staticRouteNames = [
    { id: 1, unique_id: 382, route_name: "citizen-baguette" },
    { id: 2, unique_id: 383, route_name: "reporter-baguette" },
    // بقیه موارد ...
  ];

  const levelMeta = staticRouteNames.find(x => x.route_name === params.levelName);
  const levelId = levelMeta?.id;
  const levelUniqueId = levelMeta?.unique_id;

  const [singleLevel, levelTabs, langData] = await Promise.all([
    getSingleLevel(levelId),
    getLevelTabs(params, levelId),
    getTranslation(params.lang),
  ]);

  const mainData = await getMainFile(langData);

  function makeLessCharacter(desc) {
    return desc ? desc.slice(0, 200) : "";
  }

  // اگر داده‌ها موجود نبودند، متادیتای پیش‌فرض 404 برگردون
  if (!singleLevel?.data || !levelTabs?.data) {
    return {
      title: "صفحه یافت نشد",
      description: "",
      openGraph: {
        type: 'website',
        title: "صفحه یافت نشد",
        description: "",
        locale: params.lang === 'fa' ? 'fa_IR' : 'en_US',
        url: `https://rgb.irpsc.com/${params.lang}/levels/citizen${params.levelName ? "/" + params.levelName : ""}${params.tabs ? "/" + params.tabs : ""}`,
        images: [],
      },
    };
  }

  const levels = await findByModalName(mainData, "levels");
  const [levelPageArrayContent, levelListArrayContent] = await Promise.all([
    findByTabName(levels, "levels-page"),
    findByTabName(levels, "level-list"),
  ]);
  const concatArrayContent = [...levelPageArrayContent, ...levelListArrayContent];

  const pageTitle = concatArrayContent.find(item => Number(item.unique_id) === Number(levelUniqueId))?.translation || "";

  return {
    title: pageTitle,
    description: makeLessCharacter(levelTabs.data.description || singleLevel.data.general_info.description),
    openGraph: {
      type: 'website',
      title: pageTitle,
      description: makeLessCharacter(levelTabs.data.description || singleLevel.data.general_info.description),
      locale: params.lang === 'fa' ? 'fa_IR' : 'en_US',
      url: `https://rgb.irpsc.com/${params.lang}/levels/citizen${params.levelName ? "/" + params.levelName : ""}${params.tabs ? "/" + params.tabs : ""}`,
      images: [
        {
          url: levelTabs.data.png_file || singleLevel.data.general_info.png_file,
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

