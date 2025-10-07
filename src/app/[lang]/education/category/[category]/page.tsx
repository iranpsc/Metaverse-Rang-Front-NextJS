import dynamic from "next/dynamic";
import { Suspense } from "react";
import NotFoundPage from "@/components/shared/NotFoundPage";

const DynamicFooter = dynamic(() => import("@/components/module/footer/DynamicFooter"), { suspense: true });
const BreadCrumb = dynamic(() => import("@/components/shared/BreadCrumb"), { suspense: true });

const CategoryComponent = dynamic(
  () => import("@/components/templates/categories/CategoryComponent"),
  { ssr: false }
);


import {
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getFooterData,
  getLangArray,
  getEducationSingleCategory,
} from "@/components/utils/actions";

import { findByUniqueId } from "@/components/utils/findByUniqueId";

// ✅ تابع ساخت متن کوتاه سمت سرور
async function makeLessCharacter(_desc: any, limit: number = 200) {
  return _desc ? _desc.slice(0, limit) : "";
}

export default async function EducationCategory({ params }: { params: any }) {
  try {
    const [footerTabs, langData, langArray] = await Promise.all([
      getFooterData(params),
      getTranslation(params.lang),
      getLangArray(),
    ]);

    const mainData = await getMainFile(langData);

    let CategoryData: any;
    try {
      CategoryData = await getEducationSingleCategory(params.category);
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

    if (!CategoryData) {
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

    // ✅ اضافه کردن متن کوتاه سمت سرور
    CategoryData.shortDescription = await makeLessCharacter(CategoryData.description, 200);

    const educationSingleCategorySchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      url: `https://rgb.irpsc.com/${params.lang}/education/category/${CategoryData.slug}`,
      name: findByUniqueId(mainData, 455) + " " + CategoryData.name,
      description: CategoryData.shortDescription,
      mainEntityOfPage: `https://rgb.irpsc.com/${params.lang}/education/category/${CategoryData.slug}`,
      itemListElement: CategoryData.subcategories.map((item: any, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://rgb.irpsc.com/${params.lang}/education/category/${params.category}/${item.slug}`,
        name: params.lang.toLowerCase() === "fa" ? item.name : item.slug,
        description: "",
      })),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(educationSingleCategorySchema),
          }}
        />
        <div className="flex h-screen overflow-hidden w-full bg-[#f8f8f8] dark:bg-black bg-opacity20" dir={langData.direction}>
          <section className="w-full overflow-y-auto relative light-scrollbar dark:dark-scrollbar mt-[60px] lg:mt-0 lg:pt-0  xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
            <div className="ps-4 lg:ps-5">
              <Suspense fallback={<div className="text-center text-[20px]">loading...</div>}>
                <BreadCrumb params={params} />
              </Suspense>
            </div>

            <Suspense fallback={<div className="text-center text-[20px]">loading...</div>}>
              <CategoryComponent params={params} CategoryData={CategoryData} mainData={mainData} />
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
    const CategoryData = await getEducationSingleCategory(params.category);

    return {
      title: findByUniqueId(mainData, 455) + " " + CategoryData.name,
      description: await makeLessCharacter(CategoryData.description),
      openGraph: {
        type: "website",
        title: findByUniqueId(mainData, 455) + " " + CategoryData.name,
        description: await makeLessCharacter(CategoryData.description),
        locale: params.lang == "fa" ? "fa_IR" : "en_US",
        url: `https://rgb.irpsc.com/${params.lang}/education/category/${params.category}`,
        images: [
          {
            url: CategoryData.image,
            width: 800,
            height: 400,
          },
        ],
      },
    };
  } catch {
    return {
      title: "صفحه یافت نشد",
      description: "دسته بندی یافت نشد",
    };
  }
}
