// import dynamic from "next/dynamic";
// import { Suspense } from "react";
import { cache } from "react"; // اضافه کردن cache از React
import {
  getTranslation,
  getMainFile,
  getLangArray,
  getSubcategoryData,
  getSingleVideoData,
  getAllCategoryVideos,
  getVideoComments,
} from "@/components/utils/actions";

import VideoSection from "@/components/templates/PageTemplate/VideoSection";
import ListVideos from "@/components/features/video/listVideos/ListVideos";
import CustomErrorPage from "@/components/error/CustomErrorPage";
import CleanAutoRetryParam from "@/components/system/CleanAutoRetryParam";
import NotFoundPage from "@/components/error/NotFoundPage"; // فرض کردم صفحه 404 اینجاست
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import JsonLdScript from "../../../../../../../schemas/json-ld/JsonLdScript";

function toAbsoluteHttpUrl(value: unknown): string | undefined {
  if (typeof value !== "string" || !value.trim()) return undefined;
  try {
    const parsed = new URL(value, "https://metarang.com");
    return parsed.protocol === "https:" || parsed.protocol === "http:" ? parsed.toString() : undefined;
  } catch {
    return undefined;
  }
}

function toGoogleIsoDate(value: unknown): string | undefined {
  if (
    typeof value !== "string" ||
    !/^(19|20|21)\d{2}-\d{2}-\d{2}(?:T.*)?$/.test(value)
  ) {
    return undefined;
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

// Cache کردن getSingleVideoData برای جلوگیری از درخواست‌های تکراری در generateMetadata و صفحه اصلی
const getCachedSingleVideoData = cache(async (videoId: string) => {
  return await getSingleVideoData(videoId);
});
interface EducationVideoProps {
  params: Promise<{
    [x: string]: string; lang: string 
}>;
}
export default async function EducationVideo({ params }: EducationVideoProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  try {
    const [langData, langArray] = await Promise.all([
      getTranslation(lang),
      getLangArray(),
    ]);

    const mainData = await getMainFile(langData);

    // استفاده از cached function برای DataVideo
    const DataVideo = await getCachedSingleVideoData(resolvedParams.videoId);

    // اگر ویدئو پیدا نشد، 404 نمایش بده
    if (!DataVideo) {
      return <NotFoundPage
        lang={lang}
        params={resolvedParams}
        langData={langData}
        langArray={langArray}
        mainData={mainData} />;
    }

    const newEducationsVideos = await getAllCategoryVideos();

    const dataCommentsVideo = await getVideoComments(String(DataVideo.id));

    const DataVideos = await getSubcategoryData(
      resolvedParams.category,
      resolvedParams.subcategory
    );

    function stripHtmlTags(str: string): string {
      if (!str) return "";

      // SSR / Node
      if (typeof window === "undefined") {
        return str.replace(/<|>/g, "").trim();
      }

      // Browser
      const div = document.createElement("div");
      div.innerHTML = str;

      return (div.textContent || div.innerText || "").trim();
    }


    async function makeLessCharacter(_desc: any) {
      const clean = stripHtmlTags(_desc);
      return clean.slice(0, 200);
    }



    const videoPageUrl = `https://metarang.com/${lang}/education/category/${decodeURIComponent(
      resolvedParams.category
    )}/${resolvedParams.subcategory}/${DataVideo.slug}`;
    const videoThumbnailUrl = toAbsoluteHttpUrl(DataVideo.image_url);
    const videoUploadDate = toGoogleIsoDate(DataVideo.upload_date);
    const videoDescription = await makeLessCharacter(DataVideo.description);

    const relatedVideoItems = (Array.isArray(DataVideos?.videos) ? DataVideos.videos : [])
      .filter((video: any) => typeof video?.title === "string" && video.title.trim() && video.slug)
      .map((video: any, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "WebPage",
          name: video.title,
          url: `https://metarang.com/${lang}/education/category/${decodeURIComponent(
            resolvedParams.category
          )}/${resolvedParams.subcategory}/${video.slug}`,
        },
      }));

    return (
      <>
        {DataVideo.title?.trim() && videoDescription && videoThumbnailUrl && videoUploadDate ? (
          <JsonLdScript
            schemaId="video-object"
            values={{
              name: DataVideo.title,
              description: videoDescription,
              thumbnailUrl: videoThumbnailUrl,
              uploadDate: videoUploadDate,
            }}
          />
        ) : null}
        {relatedVideoItems.length > 0 ? (
          <JsonLdScript
            schemaId="item-list"
            values={{
              name: lang === "fa" ? "ویدئوهای مرتبط" : "Related Videos",
              canonicalUrl: videoPageUrl,
              numberOfItems: relatedVideoItems.length,
              items: relatedVideoItems,
            }}
          />
        ) : null}
        <CleanAutoRetryParam />
        <div className="flex w-full" dir={langData.direction}>

          <section
            className={`w-full relative mt-[60px] lg:mt-0 lg:pt-0 bg-bg-primary xl:px-8 lg:px-8 md:px-5 sm:px-5 xs:px-1`}
          >
            <section
              className={`w-full relative overflow-y-auto overflow-x-clip flex flex-col justify-start items-center`}
            >
              <VideoSection
                mainData={mainData}
                params={resolvedParams}
                DataVideo={DataVideo}
                newEducationsVideos={newEducationsVideos}
                dataCommentsVideo={dataCommentsVideo}
              />
              <ListVideos DataVideos={DataVideos} params={resolvedParams} DataVideo={DataVideo} />
            </section>

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

    console.error("❌ Error in EductionCategoryPage:", serializedError);

    return <CustomErrorPage error={serializedError} />;
  }
}

// SEO
export async function generateMetadata({ params }:EducationVideoProps) {
       const resolvedParams = await params;
  const { lang } = resolvedParams;
    const [ langData] = await Promise.all([
    getTranslation(lang),
  ]);
  const mainData = await getMainFile(langData);
  try {
    // استفاده از cached function برای DataVideo
    const DataVideo = await getCachedSingleVideoData(resolvedParams.videoId);

    function stripHtmlTags(str: string): string {
      if (!str) return "";

      // SSR / Node
      if (typeof window === "undefined") {
        return str.replace(/<|>/g, "").trim();
      }

      // Browser
      const div = document.createElement("div");
      div.innerHTML = str;

      return (div.textContent || div.innerText || "").trim();
    }

    async function makeLessCharacter(_desc: any) {
      const clean = stripHtmlTags(_desc);
      return clean.slice(0, 155);
    }


    if (!DataVideo) {
      return {
        title: "ویدئو یافت نشد",
        description: "ویدئو مورد نظر یافت نشد",
        openGraph: {
          type: "website",
          title: "ویدئو یافت نشد",
          description: "ویدئو مورد نظر یافت نشد",
          locale: lang.toLowerCase() === "fa" ? "fa_IR" : "en_US",
          url: `https://metarang.com/${lang}/education/category/${resolvedParams.category}/${resolvedParams.subcategory}/${resolvedParams.videoId}`,
        },
      };
    }

    return {
      title: `${DataVideo.title} | ${findByUniqueId(mainData, 148)}`,
      description: await makeLessCharacter(DataVideo.description),
      openGraph: {
        type: "website",
        title: DataVideo.title,
        description: await makeLessCharacter(DataVideo.description),
        locale: lang.toLowerCase() === "fa" ? "fa_IR" : "en_US",
        url: `https://metarang.com/${lang}/education/category/${resolvedParams.category}/${resolvedParams.subcategory}/${resolvedParams.videoId}`,
        images: [
          {
            url: DataVideo.image_url,
            width: 400,
            height: 400,
          },
        ],
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