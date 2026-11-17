import dynamic from "next/dynamic";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import NotFoundPage from "@/components/error/NotFoundPage";
import {
  getTranslation,
  getMainFile,
  getLangArray,
  getSubcategoryData,
} from "@/components/utils/actions";
import CustomErrorPage from "@/components/error/CustomErrorPage";
import CleanAutoRetryParam  from "@/components/system/CleanAutoRetryParam";
import JsonLdScript from "@/schemas/json-ld/JsonLdScript";
async function makeLessCharacter(_desc: any) {
  return _desc ? _desc.slice(0, 155) : "";
}


const BreadCrumb = dynamic(
  () => import("@/components/shared/BreadCrumb"),

);
const SubcategoryPageSection = dynamic(
  () => import("@/components/templates/PageTemplate/SubcategoryPageSection"),

);
interface EducationSubcategoryProps {
  params: Promise<{
    [x: string]: any; lang: string 
}>;
}
export default async function EducationSubcategory({ params }:EducationSubcategoryProps) {
       const resolvedParams = await params;
  const { lang } = resolvedParams;
  try {
    const [langData, langArray] = await Promise.all([
      getTranslation(lang),
      getLangArray(),
    ]);

    const mainData = await getMainFile(langData);

    let subCategoryData: any;
    try {
      subCategoryData = await getSubcategoryData(resolvedParams.category, resolvedParams.subcategory);
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

    if (!subCategoryData) {
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

    const subcategoryUrl = `https://metarang.com/${lang}/education/category/${encodeURIComponent(resolvedParams.category)}/${encodeURIComponent(resolvedParams.subcategory)}`;
    const videoPageItems = (Array.isArray(subCategoryData.videos) ? subCategoryData.videos : [])
      .filter((video: any) => Boolean(video?.title && video?.slug))
      .map((video: any, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "WebPage",
          name: video.title,
          url: `${subcategoryUrl}/${encodeURIComponent(video.slug)}`,
        },
      }));
    const subcategoryDescription = await makeLessCharacter(subCategoryData.description);

    return (
      <>
        <JsonLdScript schemaId="collection-page" values={{
          name: `${subCategoryData.name} | ${findByUniqueId(mainData, 148)}`,
          canonicalUrl: subcategoryUrl,
          description: subcategoryDescription,
          lang: lang === "fa" ? "fa-IR" : "en-US",
        }} />
        {videoPageItems.length > 0 ? <JsonLdScript schemaId="item-list" values={{
          name: subCategoryData.name,
          canonicalUrl: subcategoryUrl,
          numberOfItems: videoPageItems.length,
          items: videoPageItems,
        }} /> : null}
        <div className="flex  w-full" dir={langData.direction}>
          <CleanAutoRetryParam />
          <section className="w-full  mt-[60px] lg:mt-0 lg:pt-0 bg-bg-primary  bg-opacity20 xl:px-8 lg:px-8 md:px-5 sm:px-5 xs:px-1">
            <div className="ps-4 lg:ps-5">
              <BreadCrumb params={resolvedParams} />
            </div>

            <SubcategoryPageSection
              subCategoryData={subCategoryData}
              params={resolvedParams}
              mainData={mainData}
            />

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

export async function generateMetadata({ params }:EducationSubcategoryProps) {
       const resolvedParams = await params;
  const { lang } = resolvedParams;
  try {
    const langData = await getTranslation(lang);
    const mainData = await getMainFile(langData);
    const subCategoryData = await getSubcategoryData(resolvedParams.category, resolvedParams.subcategory);

    return {
      title: findByUniqueId(mainData, 455) + " " + subCategoryData.name + " | " + findByUniqueId(mainData, 148),
      description: await makeLessCharacter(subCategoryData.description),
      openGraph: {
        type: "website",
        title: findByUniqueId(mainData, 455) + " " + subCategoryData.name,
        description: await makeLessCharacter(subCategoryData.description),
        locale: lang == "fa" ? "fa_IR" : "en_US",
        url: `https://metarang.com/${lang}/education/category/${resolvedParams.category}`,
        images: [{ url: subCategoryData.image, width: 800, height: 400 }],
      },
    };
  } catch {
    return {
      title: " خطایی رخ داده است صفحه یافت نشد",
      description: "زیر دسته یافت نشد",
    };
  }
}
