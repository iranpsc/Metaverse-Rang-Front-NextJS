import DynamicFooter from "@/components/module/footer/DynamicFooter";
import {
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getAllCategoryVideos,
  getFooterData,
  getLangArray,
  getEducationSingleCategory,
} from "@/components/utils/actions";
import BreadCrumb from "@/components/shared/BreadCrumb";
import SideBar from "@/components/module/sidebar/SideBar";
import { getStaticMenu } from "@/components/utils/constants";
import SearchComponent from "@/components/shared/SearchComponent";
import TopTrainersFirstPage from "@/components/templates/firstpage/TopTrainersFirstPage";
import EducationCategories from "@/components/templates/education/categories";
import EducationList from "@/components/templates/education/EducationList";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import ShowAllCategoriesComponent from "@/components/templates/categories/ShowAllCategoriesComponent";
import CategoryComponent from "@/components/templates/categories/CategoryComponent";

export default async function EducationCategory({ params }: { params: any }) {
  const [footerTabs, langData, langArray, allCatVideos, CategoryData] =
    await Promise.all([
      getFooterData(params),
      getTranslation(params.lang),
      getLangArray(),
      getAllCategoryVideos("1"),
      getEducationSingleCategory(params.category),
    ]);

  const mainData = await getMainFile(langData);

  const centralPageModal = await findByModalName(mainData, "central-page");
  const tabsMenu = await findByTabName(centralPageModal, "before-login");

  const staticMenuToShow = getStaticMenu(params.id);
  // add staticMenuToShow values to siblings tabsMenu values
  const updatedTabsMenu = tabsMenu.map((tab: any) => {
    let findInStatic = staticMenuToShow.find(
      (val) => tab.unique_id === val.unique_id
    );

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
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(educationAllCategorySchema),
        }}
      /> */}
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

          <h1 className="text-center mt-10 font-azarMehr dark:text-white text-black whitespace-nowrap font-bold 3xl:text-[24px] xl:text-[24px] lg:text-[22px] md:text-[20px] sm:text-[18px] xs:text-[14px]">
            {findByUniqueId(mainData, 455)} {CategoryData.name}
          </h1>

          <SearchComponent
            searchLevel="education"
            mainData={mainData}
            params={params}
          />
          <CategoryComponent
            // translates={translates}
            params={params}
            CategoryData={CategoryData}
            mainData={mainData}
            // translateData={translateData}
          />

          <div className="xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
            <DynamicFooter footerTabs={footerTabs} mainData={mainData} />
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

  const CategoryData = await getEducationSingleCategory(params.category);

  //to make description less than 200 character
  async function makeLessCharacter(_input: string) {
    return _input.slice(0, 200);
  }

  return {
    title: findByUniqueId(mainData, 455) + " " + CategoryData.name,
    description: await makeLessCharacter(CategoryData.description),
    openGraph: {
      type: "website",
      // url: `https://yourwebsite.com/posts/${params.id}`,
      title: findByUniqueId(mainData, 455) + " " + CategoryData.name,
      description: await makeLessCharacter(CategoryData.description),
      locale: params.lang == "fa" ? "fa_IR" : "en_US",
      // site_name: متاورس رنگ,
      url: `https://rgb.irpsc.com/${params.lang}/education/category/${params.category}`,
      images: [
        {
          url: CategoryData.image,
          width: 800,
          height: 400,
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
