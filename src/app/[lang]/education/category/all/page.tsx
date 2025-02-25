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
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import ShowAllCategoriesComponent from "@/components/templates/categories/ShowAllCategoriesComponent";

export default async function EducationCategoryAll({
  params,
}: {
  params: any;
}) {
  const [footerTabs, langData, langArray, categoriesData] = await Promise.all([
    getFooterData(params),
    getTranslation(params.lang),
    getLangArray(),
    getAllCategories(),
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

  console.log("categoriesData", categoriesData);

  const educationAllCategorySchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: `https://rgb.irpsc.com/${params.lang}/education/category/all`,
    name: findByUniqueId(mainData, 340),
    description: findByUniqueId(mainData, 340),
    mainEntityOfPage: `https://rgb.irpsc.com/${params.lang}/education/category/all`,
    itemListElement: categoriesData.map((item: any, index: any) => {
      return {
        "@type": "ListItem",
        position: index + 1,
        url: `https://rgb.irpsc.com/${params.lang}/education/category/${item.slug}`,
        name: params.lang.toLowerCase() === "fa" ? item.name : item.slug,
        description: "", // If no description, leave blank
      };
    }),
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

          <h1 className="mt-10 text-center font-azarMehr whitespace-nowrap dark:text-white text-black font-bold 3xl:text-[24px] xl:text-[24px] lg:text-[22px] md:text-[20px] sm:text-[18px] xs:text-[14px]">
            {findByUniqueId(mainData, 340)}
          </h1>

          <SearchComponent
            searchLevel="education"
            mainData={mainData}
            params={params}
          />

          <ShowAllCategoriesComponent
            params={params}
            categoriesData={categoriesData}
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

  //to make description less than 200 character
  async function makeLessCharacter() {
    let temp = findByUniqueId(mainData, 164);
    temp = temp.slice(0, 200);

    return temp;
  }

  return {
    title: findByUniqueId(mainData, 340),
    description: findByUniqueId(mainData, 340),
    openGraph: {
      type: "website",
      // url: `https://yourwebsite.com/posts/${params.id}`,
      title: findByUniqueId(mainData, 340),
      description: findByUniqueId(mainData, 340),
      locale: params.lang == "fa" ? "fa_IR" : "en_US",
      // site_name: متاورس رنگ,
      url: `https://rgb.irpsc.com/${params.lang}/education/category/all`,
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
