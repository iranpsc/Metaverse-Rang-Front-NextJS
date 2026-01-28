import BreadCrumb from "@/components/shared/BreadCrumb";
// import { articles } from "@/components/utils/articles";
import LatestArticlesSlider from "./components/LatestArticlesSlider";
import PopularArticlesSlider from "./components/PopularArticlesSlider";
import CategoriesGrid from "./components/CategoriesGrid";
import SearchComponent from "@/components/shared/SearchComponent";
import TopWritersArticles from "./components/TopWritersArticles"
import CustomErrorPage from "@/components/shared/CustomErrorPage";
import CleanAutoRetryParam  from "@/components/shared/CleanAutoRetryParam";
import {
  getTranslation,
  getMainFile,
  getLangArray,
} from "@/components/utils/actions";

import { findByUniqueId } from "@/components/utils/findByUniqueId";
const baseUrl = "https://rgb.irpsc.com"; // ← دامنه اصلی سایتت
const imageUrl = "https://rgb.irpsc.com/_next/image?url=%2Flogo.png&w=128&q=75";
// ✅ متادیتای داینامیک
export async function generateMetadata({ params }) {
  try {
  const lang = params.lang || "fa";
  const url = `${baseUrl}/${lang}/articles`;

  return {
    title:lang === "fa" ? "مقالات متاورس رنگ" : "Metarangs Metaverse Articles" ,
    description:lang=== "fa" ? "در این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنید": "The Metarangs Metaverse articles page is the main gateway to the written content of Metarang — Iran’s first national metaverse. In this section, you can access the latest content on science, technology, virtual commerce, and development news of this parallel world.",
    openGraph: {
      title:lang === "fa" ? "مقالات متاورس رنگ" : "Metarangs Metaverse Articles" ,
      description:lang=== "fa" ? "در این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنید": "The Metarangs Metaverse articles page is the main gateway to the written content of Metarang — Iran’s first national metaverse. In this section, you can access the latest content on science, technology, virtual commerce, and development news of this parallel world.",
      url,
      siteName: "Metaverse Rang",
      locale: lang === "fa" ? "fa_IR" : "en_US",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: "مقالات متاورس رنگ",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "مقالات متاورس رنگ",
      description:
        "در این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنید",
      images: [imageUrl],
    },
  };
} catch (error) {
    console.error("❌ Metadata error (LevelsPage):", error);

    return {
      title: "خطا",
      description: "مشکلی در بارگذاری صفحه رخ داده است",
    };
  }
}


export default async function ArticlesPage({ params }) {
    try {
  const [ langData] = await Promise.all([
    getTranslation(params.lang),
  ]);

  const mainData = await getMainFile(langData);

  const langPrefix = params.lang ? `/${params.lang}` : "";
  const fullPageUrl = `${baseUrl}${langPrefix}/articles`;

  // ✅ اسکیمای داینامیک معتبر
  // const schemaData = {
  //   "@context": "https://schema.org",
  //   "@graph": [
  //     {
  //       "@type": "BreadcrumbList",
  //       itemListElement: [
  //         {
  //           "@type": "ListItem",
  //           position: 1,
  //           name: "صفحه اصلی",
  //           item: `${baseUrl}${langPrefix}`,
  //         },
  //         {
  //           "@type": "ListItem",
  //           position: 2,
  //           name: "مقالات",
  //           item: fullPageUrl,
  //         },
  //       ],
  //     },
  //     {
  //       "@type": "CollectionPage",
  //       "@id": `${fullPageUrl}#webpage`,
  //       url: fullPageUrl,
  //       name: "مقالات متاورس رنگ",
  //       description:
  //         "در این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنیددر این صفحه شما میتوانید مقالات تهیه شده توسط متاورس رنگ را مشاهده کنید",
  //       isPartOf: {
  //         "@type": "WebSite",
  //         name: "Metaverse Rang",
  //         url: baseUrl,
  //       },
  //     },
  //     {
  //       "@type": "ItemList",
  //       name: "لیست مقالات متاورس رنگ",
  //       itemListOrder: "Descending",
  //       numberOfItems: articles.length,
  //       itemListElement: articles.map((a, index) => ({
  //         "@type": "ListItem",
  //         position: index + 1,
  //         url: `${baseUrl}${langPrefix}/articles/categories/${a.category}/${a.slug}`,
  //         name: a.title,
  //         image: a.image || undefined,
  //       })),
  //     },
  //   ],
  // };

  // ✅ محتوای اصلی (دقیقاً مثل نسخه‌ی خودت)
  return (
    <section
      className="w-full relative lg:pt-0 bg-[#f8f8f8] dark:bg-black "
      dir={langData.direction}
    >
      <div className="px-5 2xl:px-10 mt-[60px] lg:mt-0">
        <BreadCrumb params={params} />
      </div>

      <div className=" 2xl:px-10 mt-5">
        <h1 className="font-rokh font-bold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] text-center dark:text-white mt-[64px] mb-[16px]">
          {findByUniqueId(mainData, 1513)}
        </h1>
        <p className="text-lightGray  dark:text-lightGray font-azarMehr font-normal text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] text-center px-5 lg:px-10">
         {findByUniqueId(mainData, 1514)}
        </p>
      </div>

      <div className="mb-10 mt-[-50px] lg:mt-5 space-y-7">
        <div className="flex flex-col-reverse  lg:gap-5 lg:flex-row lg:justify-between lg:items-center w-full px-5 lg:pe-4">
          <h2 className="md:w-1/2 lg:ms-5 mt-5 lg:mt-0 lg:mb-[-45px] font-azarMehr text-lg md:text-2xl font-bold text-start dark:text-white text-black ps-[2px]">
           {findByUniqueId(mainData, 1516)}
          </h2>
          <SearchComponent
            searchLevel="articles"
            mainData={mainData}
            params={params}
          />
        </div>
        <div className="px-5 lg:pt-6 2xl:px-10">
          <CategoriesGrid params={params} mainData={mainData} />
        </div>
      </div>
      <div className="w-full h-fit mt-[60px] lg:mt-20">
        <TopWritersArticles params={params} mainData={mainData} />
      </div>
      <div className="ps-5 2xl:ps-10 space-y-14 mt-28">
        <PopularArticlesSlider params={params} mainData={mainData} />
        <LatestArticlesSlider params={params} mainData={mainData} />
      </div>

      {/* ✅ اسکیمای SSR معتبر و داینامیک */}
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      /> */}
    </section>
  );
}
catch (error) {
  const serializedError = {
    message:
      error instanceof Error ? error.message : "Unknown error",
    stack:
      error instanceof Error ? error.stack : null,
    name:
      error instanceof Error ? error.name : "Error",
  };

  console.error("❌ Error in EductionPage:", serializedError);

  return <CustomErrorPage error={serializedError} />;
}
}
