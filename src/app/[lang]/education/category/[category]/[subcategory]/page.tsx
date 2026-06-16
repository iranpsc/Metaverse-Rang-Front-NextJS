import dynamic from "next/dynamic";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import NotFoundPage from "@/components/shared/NotFoundPage";
import {
  getTranslation,
  getMainFile,
  getLangArray,
  getSubcategoryData,
} from "@/components/utils/actions";
import CustomErrorPage from "@/components/shared/CustomErrorPage";
import CleanAutoRetryParam  from "@/components/shared/CleanAutoRetryParam";
async function makeLessCharacter(_desc: any) {
  return _desc ? _desc.slice(0, 200) : "";
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

    const subCategorySchema = {
      "@context": "http://schema.org",
      "@type": "WebSite",
      name: `${subCategoryData.name}`,
      url: `https://metarang.com/${lang}/education/category/${decodeURIComponent(
        resolvedParams.category
      )}/${resolvedParams.subcategory}`,
      description: await makeLessCharacter(subCategoryData.description),
      mainEntity: subCategoryData.videos.map((video: any) => ({
        "@type": "VideoObject",
        name: video.title,
        thumbnailUrl: video.image_url,
        contentUrl: `https://metarang.com/${lang}/education/category/${decodeURIComponent(
          resolvedParams.category
        )}/${resolvedParams.subcategory}/video/${video.slug}`,
        uploadDate: video.upload_date || "",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(subCategorySchema) }}
        />
        <div className="flex  w-full" dir={langData.direction}>
          <CleanAutoRetryParam />
          <section className="w-full  mt-[60px] lg:mt-0 lg:pt-0 bg-[#f8f8f8] dark:bg-black bg-opacity20 xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
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
      title: findByUniqueId(mainData, 455) + " " + subCategoryData.name,
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
