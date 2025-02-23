import {
  getAllLevels,
  getFooterData,
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getLangArray,
} from "@/components/utils/actions";
import DynamicFooter from "@/components/module/footer/DynamicFooter";
import LevelCard from "@/components/module/levelComponent/LevelCard";
import SideBar from "@/components/module/sidebar/SideBar";
import BreadCrumb from "@/components/shared/BreadCrumb";
import { getStaticMenu } from "@/components/utils/constants";
// SEO**
export async function generateMetadata({ params }: any) {
  const levelArray = await getAllLevels();

  const langData = await getTranslation(params.lang);
  const mainData = await getMainFile(langData);
  const levels = await findByModalName(mainData, "levels");

  const levelPageArrayContent = await findByTabName(levels, "levels-page");
  const levelListArrayContent = await findByTabName(levels, "level-list");
  const concatArrayContent = levelPageArrayContent.concat(
    levelListArrayContent
  );

  // to find in an array with key(_name)
  async function localFind(_name: any) {
    let temp = await concatArrayContent.find((item: any) => item.name == _name);
    if (temp) return temp.translation;
    else return "";
  }
  //to make description less than 200 character
  async function makeLessCharacter() {
    let temp = await localFind(
      'the levels of "metaverse rang" in the parallel'
    );
    temp = temp.slice(0, 200);
    return temp;
  }

  return {
    title: await localFind("levels of citizens of the metaverse"),
    description: await makeLessCharacter(),
    openGraph: {
      type: "website",
      // url: `https://yourwebsite.com/posts/${params.id}`,
      title: await localFind("levels of citizens of the metaverse"),
      description: await makeLessCharacter(),
      locale: params.lang == "fa" ? "fa_IR" : "en_US",
      url: `https://rgb.irpsc.com/${params.lang}/levels/citizen`,
      images: [
        {
          url: `${levelArray[0].image}`,
          width: 800,
          height: 600,
          alt: await localFind("levels of citizens of the metaverse"),
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

export default async function LevelsPage({ params }: any) {
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
  function convertPersianToEnglishNumber(slug: any) {
    // Replace Persian/Arabic digits with English digits using regex
    return Number(
      slug.replace(/[۰-۹]/g, (char: any) => char.charCodeAt(0) - 1776)
    );
  }

  const levelArray = await getAllLevels();
  // convert persian digit to eng digit in DATA
  levelArray.forEach((item: any) => {
    item.slug = convertPersianToEnglishNumber(item.slug);
  });

  const footerTabs = await getFooterData(params);

  const langArray = await getLangArray();

  const langData = await getTranslation(params.lang);
  const mainData = await getMainFile(langData);
  const levels = await findByModalName(mainData, "levels");

  const levelPageArrayContent = await findByTabName(levels, "levels-page");
  const levelListArrayContent = await findByTabName(levels, "level-list");

  const concatArrayContent = levelPageArrayContent.concat(
    levelListArrayContent
  );
  const centralPageModal = await findByModalName(mainData, "central-page");
  const tabsMenu = await findByTabName(centralPageModal, "before-login");

  const staticMenuToShow = getStaticMenu(params.id);

  // add staticMenuToShow values to siblings tabsMenu values
  const updatedTabsMenu = tabsMenu.map((tab: any) => {
    let findInStatic = staticMenuToShow.find((val) => tab.name === val.name);

    if (findInStatic) {
      // Return a new tab object with updated properties
      return {
        ...tab, // Spread the original tab properties
        url: findInStatic.url,
        order: findInStatic.order,
        toShow: true,
      };
    }

    // If no match found, return the original tab
    return tab;
  });

  function localFind(_name: any) {
    let temp = concatArrayContent.find((item: any) => item.name == _name);
    if (temp) return temp.translation;
    else return "";
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

  const levelsSchema = {
    "@context": "https://schema.org/",
    "@type": "ItemList",
    itemListElement: levelArray.map((item: any) => {
      return {
        "@type": "ListItem",
        position: `${item.id}`,
        name: `${item.name}`,
        url: `${item.image}`,
      };
    }),
    // {
    //   "@type": "ListItem",
    //   position: "1",
    //   name: "",
    // },
  };
  return (
    <>
      {/* SCHEMA** */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(levelsSchema) }}
      />
      {/* schema END */}
      <div
        className={`flex h-screen dark:bg-black overflow-hidden`}
        dir={langData.direction}
      >
        <SideBar
          langArray={langArray}
          langData={langData}
          tabsMenu={updatedTabsMenu}
          params={params}
          pageSide="citizen"
        />
        <section
          // id={`${
          //   themeDataActive == "dark" ? "dark-scrollbar" : "light-scrollbar"
          // }`}

          className={`h-[calc(100vh-60px)] lg:h-screen overflow-y-auto relative light-scrollbar dark:dark-scrollbar mt-[60px] lg:mt-0`}
        >
          <div className="xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
            <BreadCrumb params={params} />
          </div>

          <div className="mt-[60px] lg:mt-[40px] xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
            <h2 className="font-rokh font-bold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] text-center dark:text-white mb-[16px]">
              {localFind("levels of citizens of the metaverse")}
            </h2>
            <p className="text-lightGrey dark:text-lightGray font-azarMehr font-normal text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] text-center text-justify">
              {localFind(`the levels of "metaverse rang" in the parallel`)}
            </p>
          </div>
          <div className="flex justify-center flex-wrap mt-[20px]">
            {levelArray.map((item: any, index: any) => (
              <LevelCard
                key={index}
                item={item}
                allLevelArrayContent={concatArrayContent}
                params={params}
              />
            ))}
          </div>
          <div className="flex flex-col justify-center items-center xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
            <DynamicFooter footerTabs={footerTabs} mainData={mainData} />
          </div>
        </section>
      </div>
    </>
  );
}
