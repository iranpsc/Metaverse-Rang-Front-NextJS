import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically Import Components
const DynamicFooter = dynamic(
  () => import("@/components/module/footer/DynamicFooter"),
  { suspense: true }
);
const SideBar = dynamic(() => import("@/components/module/sidebar/SideBar"), {
  suspense: true,
});
const BreadCrumb = dynamic(() => import("@/components/shared/BreadCrumb"), {
  suspense: true,
});
const SearchComponent = dynamic(
  () => import("@/components/shared/SearchComponent"),
  { suspense: true }
);
const ShowAllCategoriesComponent = dynamic(
  () => import("@/components/templates/categories/ShowAllCategoriesComponent"),
  { suspense: true }
);

import {
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getFooterData,
  getLangArray,
  getAllCategories,
} from "@/components/utils/actions";

import { getStaticMenu } from "@/components/utils/constants";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

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

  const staticMenuToShow = getStaticMenu(params);
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
    "@context": "https://schema.org",
    "@type": "ItemList",
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
        <Suspense
          fallback={<div className="text-center text-[20px]">loading...</div>}
        >
          <SideBar
            tabsMenu={updatedTabsMenu}
            langData={langData}
            langArray={langArray}
            params={params}
            pageSide="citizen"
          />
        </Suspense>
        <section
          className={`w-full overflow-y-auto relative light-scrollbar dark:dark-scrollbar mt-[60px] lg:mt-0 lg:pt-0 bg-[#f8f8f8] dark:bg-black bg-opacity20 xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1`}
        >
          {/* Breadcrumb */}
          <div className="">
            <Suspense
              fallback={
                <div className="text-center text-[20px]">loading...</div>
              }
            >
              <BreadCrumb params={params} />
            </Suspense>
          </div>

          <h1 className="mt-10 text-center font-azarMehr whitespace-nowrap dark:text-white text-black font-bold 3xl:text-[24px] xl:text-[24px] lg:text-[22px] md:text-[20px] sm:text-[18px] xs:text-[14px]">
            {findByUniqueId(mainData, 340)}
          </h1>
          <Suspense
            fallback={<div className="text-center text-[20px]">loading...</div>}
          >
            <SearchComponent
              searchLevel="education"
              mainData={mainData}
              params={params}
            />
          </Suspense>
          <Suspense
            fallback={<div className="text-center text-[20px]">loading...</div>}
          >
            <ShowAllCategoriesComponent
              params={params}
              categoriesData={categoriesData}
            />
          </Suspense>

          <div className="xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
            <Suspense
              fallback={
                <div className="text-center text-[20px]">loading...</div>
              }
            >
              <DynamicFooter footerTabs={footerTabs} mainData={mainData} />
            </Suspense>
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
