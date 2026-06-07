import dynamic from "next/dynamic";
import { Suspense } from "react";
import NotFoundPage from "@/components/shared/NotFoundPage";

const BreadCrumb = dynamic(() => import("@/components/shared/BreadCrumb"),);

const CategoryPageSection = dynamic(
  () => import("@/components/templates/PageTemplate/CategoryPageSection"),

);


import {
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getLangArray,
  getEducationSingleCategory,
} from "@/components/utils/actions";

import { findByUniqueId } from "@/components/utils/findByUniqueId";
import CustomErrorPage from "@/components/shared/CustomErrorPage";
import CleanAutoRetryParam from "@/components/shared/CleanAutoRetryParam";
// ✅ تابع ساخت متن کوتاه سمت سرور
async function makeLessCharacter(_desc: any, limit: number = 200) {
  return _desc ? _desc.slice(0, limit) : "";
}
interface EducationCategoryProps {
  params: Promise<{
    category(category: any): any; lang: string
  }>;
}
export default async function EducationCategory({ params }: EducationCategoryProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  try {
    const [langData, langArray] = await Promise.all([
      getTranslation(lang),
      getLangArray(),
    ]);

    const mainData = await getMainFile(langData);

    let CategoryData: any;
    try {
      CategoryData = await getEducationSingleCategory(resolvedParams.category);
    } catch (error: any) {
      if (error.message?.startsWith("404")) {
        return (
          <NotFoundPage
            lang={lang}
            params={resolvedParams}
            langData={langData}
            langArray={langArray}
            mainData={mainData}
          />
        );
      }
      throw error;
    }

    if (!CategoryData) {
      return (
        <NotFoundPage
          lang={lang}
          params={resolvedParams}
          langData={langData}
          langArray={langArray}
          mainData={mainData}
        />
      );
    }

    // ✅ اضافه کردن متن کوتاه سمت سرور
    CategoryData.shortDescription = await makeLessCharacter(CategoryData.description, 200);

    const educationSingleCategorySchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      url: `https://metarang.com/${lang}/education/category/${CategoryData.slug}`,
      name: findByUniqueId(mainData, 455) + " " + CategoryData.name,
      description: CategoryData.shortDescription,
      mainEntityOfPage: `https://metarang.com/${lang}/education/category/${CategoryData.slug}`,
      itemListElement: CategoryData.subcategories.map((item: any, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://metarang.com/${lang}/education/category/${resolvedParams.category}/${item.slug}`,
        name: lang.toLowerCase() === "fa" ? item.name : item.slug,
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
        <CleanAutoRetryParam />
        <div className="flex  w-full bg-[#f8f8f8] dark:bg-black bg-opacity20" dir={langData.direction}>
          <section className="w-full overflow-y-auto relative l mt-[60px] lg:mt-0 lg:pt-0  xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
            <div className="ps-4 lg:ps-5">
              <BreadCrumb params={resolvedParams} />
            </div>
            <CategoryPageSection params={resolvedParams} CategoryData={CategoryData} mainData={mainData} />
          </section>
        </div>
      </>
    );
  } catch (error) {
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

export async function generateMetadata({ params }: EducationCategoryProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  try {
    const langData = await getTranslation(lang);
    const mainData = await getMainFile(langData);
    const CategoryData = await getEducationSingleCategory(resolvedParams.category);

    return {
      title: findByUniqueId(mainData, 455) + " " + CategoryData.name,
      description: await makeLessCharacter(CategoryData.description),
      openGraph: {
        type: "website",
        title: findByUniqueId(mainData, 455) + " " + CategoryData.name,
        description: await makeLessCharacter(CategoryData.description),
        locale: lang == "fa" ? "fa_IR" : "en_US",
        url: `https://metarang.com/${lang}/education/category/${resolvedParams.category}`,
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
      title: "خطایی رخ داده است صفحه یافت نشد",
      description: "دسته بندی یافت نشد",
    };
  }
}
