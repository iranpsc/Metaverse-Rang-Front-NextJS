import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically Import Components

const BreadCrumb = dynamic(() => import("@/components/shared/BreadCrumb"), {
  suspense: true,
});
const SearchComponent = dynamic(
  () => import("@/components/shared/SearchComponent"),
  { suspense: true }
);
const ShowAllCategoriesComponent = dynamic(
  () => import("@/components/templates/categories/ShowAllCategoriesComponent"),
  { ssr: false, suspense: true }
);

import {
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getLangArray,
  getAllCategories,
} from "@/components/utils/actions";

import { findByUniqueId } from "@/components/utils/findByUniqueId";

export default async function EducationCategoryAll({
  params,
}: {
  params: any;
}) {
  const [ langData, langArray, categoriesData] = await Promise.all([
  
    getTranslation(params.lang),
    getLangArray(),
    getAllCategories(),
  ]);

  const mainData = await getMainFile(langData);




  const educationAllCategorySchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url: `https://rgb.irpsc.com/${params.lang}/education/category`,
    name: findByUniqueId(mainData, 340),
    description: findByUniqueId(mainData, 340),
    mainEntityOfPage: `https://rgb.irpsc.com/${params.lang}/education/category`,
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

      <div className="flex w-full" dir={langData.direction}>

        <section
          className={`w-full mt-[60px] lg:mt-0 lg:pt-0 bg-[#f8f8f8] dark:bg-black bg-opacity20 xl:px-32 lg:px-32 px-5 `}
        >
          {/* Breadcrumb */}
          <div className="ps-2 lg:ps-4">
            <Suspense
              fallback={
                <div className="text-center text-[20px]">loading...</div>
              }
            >
              <BreadCrumb params={params} />
            </Suspense>
          </div>

          <div className="mt-[60px] lg:mt-[40px] xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
            <h1 className="font-rokh font-bold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] text-center dark:text-white mt-[64px] mb-[16px]">
              {findByUniqueId(mainData, 340)}
            </h1>
            <p className="text-lightGray  dark:text-lightGray font-azarMehr font-normal text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] text-center px-5 lg:px-10">
              {findByUniqueId(mainData, 1466)}
            </p>
            <div className="mt-[-60px] md:mt-0 px-2">
              <Suspense
                fallback={<div className="text-center text-[20px] ">loading...</div>}
              >
                <SearchComponent
                  searchLevel="education"
                  mainData={mainData}
                  params={params}
                />
              </Suspense>
            </div>
          </div>
          <Suspense
            fallback={<div className="text-center text-[20px]">loading...</div>}
          >
            <ShowAllCategoriesComponent
              params={params}
              categoriesData={categoriesData}
              mainData={mainData}
            />
          </Suspense>

         
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
      // url: `https://rgb.irpsc.com/posts/${params.id}`,
      title: findByUniqueId(mainData, 340),
      description: findByUniqueId(mainData, 340),
      locale: params.lang == "fa" ? "fa_IR" : "en_US",
      // site_name: متاورس رنگ,
      url: `https://rgb.irpsc.com/${params.lang}/education/category`,
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
