import dynamic from "next/dynamic";
import { Suspense } from "react";
import NotFoundPage from "@/components/shared/NotFoundPage";

const DynamicFooter = dynamic(() => import("@/components/module/footer/DynamicFooter"), { suspense: true });
const BreadCrumb = dynamic(() => import("@/components/shared/BreadCrumb"), { suspense: true });
const SearchComponent = dynamic(() => import("@/components/shared/SearchComponent"), { suspense: true });
const SubcategoryComponent = dynamic(() => import("@/components/templates/categories/SubcategoryComponent"), { suspense: true });

import {
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getFooterData,
  getLangArray,
  getSubcategoryData,
} from "@/components/utils/actions";

import { findByUniqueId } from "@/components/utils/findByUniqueId";

async function makeLessCharacter(_desc: any) {
  return _desc ? _desc.slice(0, 200) : "";
}

export default async function EducationSubcategory({ params }: { params: any }) {
  try {
    const [footerTabs, langData, langArray] = await Promise.all([
      getFooterData(params),
      getTranslation(params.lang),
      getLangArray(),
    ]);

    const mainData = await getMainFile(langData);


    let subCategoryData: any;
    try {
      subCategoryData = await getSubcategoryData(params.category, params.subcategory);
    } catch (error: any) {
      if (error.message?.startsWith("404")) {
        return (
          <NotFoundPage
            lang={params.lang}
            params={params}
            langData={langData}
            langArray={langArray}
            footerTabs={footerTabs}
            mainData={mainData}
          />
        );
      }
      throw error;
    }

    if (!subCategoryData) {
      return (
        <NotFoundPage
          lang={params.lang}
          params={params}
          langData={langData}
          langArray={langArray}
          footerTabs={footerTabs}
          mainData={mainData}
        />
      );
    }

    const subCategorySchema = {
      "@context": "http://schema.org",
      "@type": "WebSite",
      name: ` ${subCategoryData.name}`,
      url: `https://rgb.irpsc.com/${params.lang}/education/category/${decodeURIComponent(params.category)}/${params.subcategory}`,
      description: await makeLessCharacter(subCategoryData.description),
      mainEntity: subCategoryData.videos.map((video: any) => ({
        "@type": "VideoObject",
        name: video.title,
        thumbnailUrl: video.image_url,
        contentUrl: `https://rgb.irpsc.com/${params.lang}/education/category/${decodeURIComponent(params.category)}/${params.subcategory}/video/${video.slug}`,
        uploadDate: video.upload_date || "",
        publisher: {
          "@type": "Organization",
          name: video.creator.name || video.creator.code,
        },
        interactionStatistic: [
          { "@type": "InteractionCounter", interactionType: "http://schema.org/LikeAction", userInteractionCount: video.likes_count },
          { "@type": "InteractionCounter", interactionType: "http://schema.org/DislikeAction", userInteractionCount: video.dislikes_count },
          { "@type": "InteractionCounter", interactionType: "http://schema.org/WatchAction", userInteractionCount: video.views_count },
        ],
      })),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(subCategorySchema) }}
        />
        <div className="flex h-screen overflow-hidden w-full" dir={langData.direction}>
          <section className="w-full overflow-y-auto relative light-scrollbar dark:dark-scrollbar mt-[60px] lg:mt-0 lg:pt-0 bg-[#f8f8f8] dark:bg-black bg-opacity20 xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
            <div>
              <Suspense fallback={<div className="text-center text-[20px]">loading...</div>}>
                <BreadCrumb params={params} />
              </Suspense>
            </div>

            <p className="text-center mt-10 font-azarMehr dark:text-white text-black font-bold 3xl:text-[24px] xl:text-[24px] lg:text-[22px] md:text-[20px] sm:text-[18px] xs:text-[14px]">
              {findByUniqueId(mainData, 455)} {subCategoryData.name}
            </p>

            <Suspense fallback={<div className="text-center text-[20px]">loading...</div>}>
              <SearchComponent searchLevel="education" mainData={mainData} params={params} />
            </Suspense>

            <Suspense fallback={<div className="text-center text-[20px]">loading...</div>}>
              <SubcategoryComponent subCategoryData={subCategoryData} params={params} mainData={mainData} />
            </Suspense>

            <div className="xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
              <Suspense fallback={<div className="text-center text-[20px]">loading...</div>}>
                <DynamicFooter footerTabs={footerTabs} mainData={mainData} />
              </Suspense>
            </div>
          </section>
        </div>
      </>
    );
  } catch (error) {
    return (
      <div className="text-center text-red-600 mt-20 p-5 text-base">
        خطایی رخ داد: {String(error)}
      </div>
    );
  }
}

export async function generateMetadata({ params }: { params: any }) {
  try {
    const langData = await getTranslation(params.lang);
    const mainData = await getMainFile(langData);
    const subCategoryData = await getSubcategoryData(params.category, params.subcategory);

    return {
      title: findByUniqueId(mainData, 455) + " " + subCategoryData.name,
      description: await makeLessCharacter(subCategoryData.description),
      openGraph: {
        type: "website",
        title: findByUniqueId(mainData, 455) + " " + subCategoryData.name,
        description: await makeLessCharacter(subCategoryData.description),
        locale: params.lang == "fa" ? "fa_IR" : "en_US",
        url: `https://rgb.irpsc.com/${params.lang}/education/category/${params.category}`,
        images: [
          { url: subCategoryData.image, width: 800, height: 400 },
        ],
      },
    };
  } catch {
    return {
      title: "صفحه یافت نشد",
      description: "زیر دسته یافت نشد",
    };
  }
}
