import DynamicFooter from "@/components/module/footer/DynamicFooter";
import {
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getAllCategoryVideos,
  getFooterData,
  getLangArray,
  getAllCategories,
} from "@/components/utils/actions";
import BreadCrumb from "@/components/shared/BreadCrumb";
import SideBar from "@/components/module/sidebar/SideBar";
import { getStaticMenu } from "@/components/utils/constants";
import SearchComponent from "@/components/shared/SearchComponent";
import TopTrainersFirstPage from "@/components/templates/firstpage/TopTrainersFirstPage";
import EducationCategories from "@/components/templates/education/categories";
import EducationList from "@/components/templates/education/EducationList";

export default async function CitizensPage({ params }: { params: any }) {
  const [footerTabs, langData, langArray, allCatVideos, categoriesData] =
    await Promise.all([
      getFooterData(params),
      getTranslation(params.lang),
      getLangArray(),
      getAllCategoryVideos("1"),
      getAllCategories(),
    ]);

  const mainData = await getMainFile(langData);

  const centralPageModal = await findByModalName(mainData, "central-page");
  const tabsMenu = await findByTabName(centralPageModal, "before-login");

  const Citizenship = await findByModalName(mainData, "Citizenship-profile");
  const citizenListArrayContent = await findByTabName(
    Citizenship,
    "list-citizen"
  );

  const levelModals = await findByModalName(mainData, "levels");
  const levelListArrayContent = await findByTabName(levelModals, "level-list");

  const trainingModal = await findByModalName(mainData, "training");
  // console.log("trainingModal", trainingModal);
  const trainingArrayContent = await findByTabName(
    trainingModal,
    "central-school"
  );

  // to find in an array with key(_name)
  function localFind(_name: any) {
    return trainingArrayContent.find((item: any) => item.name == _name)
      .translation;
  }

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

  const educationAllCategorySchema = {
    "@context": "http://schema.org",
    "@type": "WebPage",
    mainEntity: allCatVideos.map((video: any) => ({
      "@type": "VideoObject",
      name: video.title,
      // description: video.description,
      thumbnailUrl: video.image_url,
      contentUrl: `https://rgb.irpsc.com/${params.lang}/education/category/${video.sub_category.slug}`,
      uploadDate: "",
      publisher: {
        "@type": "Organization",
        name: video.creator.name || video.creator.code,
      },
      interactionStatistic: [
        {
          "@type": "InteractionCounter",
          interactionType: "http://schema.org/LikeAction",
          userInteractionCount: video.likes_count,
        },
        {
          "@type": "InteractionCounter",
          interactionType: "http://schema.org/DislikeAction",
          userInteractionCount: video.dislikes_count,
        },
        {
          "@type": "InteractionCounter",
          interactionType: "http://schema.org/WatchAction",
          userInteractionCount: video.views_count,
        },
      ],
    })),
  };

  return (
    <>
      {/* SCHEMA** */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(educationAllCategorySchema),
        }}
      />
      <div className="flex h-screen overflow-hidden" dir={langData.direction}>
        <SideBar
          tabsMenu={updatedTabsMenu}
          langData={langData}
          langArray={langArray}
          params={params}
          pageSide="citizen"
        />
        <section
          className={`w-full overflow-y-auto relative light-scrollbar dark:dark-scrollbar mt-[60px] lg:mt-0 lg:pt-0 bg-[#f8f8f8] dark:bg-black bg-opacity20 xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1`}
        >
          {/* Breadcrumb */}
          <div className="">
            <BreadCrumb params={params} />
          </div>

          <h1 className="mt-[70px] text-center  text-gray dark:text-dark-gray font-azarMehr font-bold 2xl:text-[26px] xl:text-[26px] lg:text-[22px] md:text-[20px] sm:text-[18px] xs:text-[16px] w-full">
            {localFind("page title")}
          </h1>
          <div className="flex flex-col items-center justify-center">
            <p className=" 2xl:w-[30%] xl:w-[30%] lg:w-[40%] md:w-[40%] sm:w-[50%] xs:w-[50%] mt-5 font-azarMehr font-normal text-gray dark:text-dark-gray 2xl:text-[14px] xl:text-[14px] lg:text-[13px] md:text-[12px] sm:text-[12px] xs:text-[10px]   text-center">
              {localFind("description")}
            </p>

            <SearchComponent
              searchLevel="education"
              citizenListArrayContent={trainingArrayContent}
              mainData={mainData}
            />
          </div>

          <div className="h-fit mt-[60px] xl:mt-[100px] 2xl:mt-[180px]">
            <TopTrainersFirstPage
              firstPageArrayContent={trainingArrayContent}
              params={params}
              citizenListArrayContent={citizenListArrayContent}
              levelListArrayContent={levelListArrayContent}
            />
          </div>

          <EducationCategories
            categoriesData={categoriesData}
            categoriesTranslateData={trainingArrayContent}
            params={params}
          />

          <EducationList allCatVideos={allCatVideos} params={params} />

          <div className="xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
            <DynamicFooter footerTabs={footerTabs} />
          </div>
        </section>
      </div>
    </>
  );
}

// SEO**
export async function generateMetadata({ params }: { params: any }) {
  const langData = await getTranslation(params.lang);

  const mainData = await getMainFile(langData);
  // const centralPageModal = await findByModalName(mainData, "central-page");
  // const firstPageArrayContent = await findByTabName(
  //   centralPageModal,
  //   "first-page"
  // );

  const trainingModal = await findByModalName(mainData, "training");
  // console.log("trainingModal", trainingModal);
  const trainingArrayContent = await findByTabName(
    trainingModal,
    "central-school"
  );
  // to find in an array with key(_name)
  function localFind(_name: any) {
    return trainingArrayContent.find((item: any) => item.name == _name)
      ?.translation;
  }

  //to make description less than 200 character
  async function makeLessCharacter() {
    let temp = await localFind("description");
    temp = temp.slice(0, 200);
    return temp;
  }

  return {
    title: await localFind("key phrase"),
    description: await makeLessCharacter(),
    openGraph: {
      type: "website",
      // url: `https://yourwebsite.com/posts/${params.id}`,
      title: await localFind("citizens of the metaverse"),
      description: await makeLessCharacter(),
      locale: params.lang == "fa" ? "fa_IR" : "en_US",
      // site_name: متاورس رنگ,
      url: `https://rgb.irpsc.com/${params.lang}/education`,
      images: [
        {
          url: "/logo.png",
          width: 800,
          height: 600,
          // alt: post.title,
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
