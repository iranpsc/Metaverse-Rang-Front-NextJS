import dynamic from "next/dynamic";
import { Suspense } from "react";
import { cache } from "react"; // اضافه کردن cache از React

const DynamicFooter = dynamic(
  () => import("@/components/module/footer/DynamicFooter"),
  { suspense: true }
);
const BreadCrumb = dynamic(() => import("@/components/shared/BreadCrumb"), {
  suspense: true,
});

import {
  getTranslation,
  getMainFile,
  // findByModalName,
  // findByTabName,
  getFooterData,
  getLangArray,
  getSubcategoryData,
  getSingleVideoData,
  getAllCategoryVideos,
  getVideoComments,
} from "@/components/utils/actions";

import VideoSection from "@/components/templates/singleVideo/VideoSection";
import ListVideos from "@/components/module/singleVideo/listVideos/ListVideos";

import NotFoundPage from "@/components/shared/NotFoundPage"; // فرض کردم صفحه 404 اینجاست

// Cache کردن getSingleVideoData برای جلوگیری از درخواست‌های تکراری در generateMetadata و صفحه اصلی
const getCachedSingleVideoData = cache(async (videoId: string) => {
  return await getSingleVideoData(videoId);
});

export default async function EducationVideo({ params }: { params: any }) {
  const [footerTabs, langData, langArray] = await Promise.all([
    getFooterData(params),
    getTranslation(params.lang),
    getLangArray(),
  ]);

  const mainData = await getMainFile(langData);

  // استفاده از cached function برای DataVideo
  const DataVideo = await getCachedSingleVideoData(params.videoId);
 
  // اگر ویدئو پیدا نشد، 404 نمایش بده
  if (!DataVideo) {
    return <NotFoundPage
      lang={params.lang}
      params={params}
      langData={langData}
      langArray={langArray}
      footerTabs={footerTabs}
      mainData={mainData} />;
  }

  const newEducationsVideos = await getAllCategoryVideos();

  const dataCommentsVideo = await getVideoComments(DataVideo.id);

  const DataVideos = await getSubcategoryData(
    params.category,
    params.subcategory
  );

function stripHtmlTags(str: string): string {
  return str ? str.replace(/<[^>]*>/g, "") : "";
}

async function makeLessCharacter(_desc: any) {
  const clean = stripHtmlTags(_desc);
  return clean.slice(0, 200);
}



  const singleVideoSchema = {
    "@context": "http://schema.org",
    "@type": "WebSite",
    name: DataVideo.title,
    url: `https://rgb.irpsc.com/${params.lang}/education/category/${decodeURIComponent(
      params.category
    )}/${params.subcategory}/${DataVideo.slug}`,
    description: await makeLessCharacter(DataVideo.description),
    mainEntity: {
      "@type": "VideoObject",
      name: DataVideo.title,
      thumbnailUrl: DataVideo.image_url,
      contentUrl: `https://rgb.irpsc.com/${params.lang}/education/category/${decodeURIComponent(
        params.category
      )}/${params.subcategory}/${DataVideo.slug}`,
      uploadDate: DataVideo.upload_date || "",
      publisher: {
        "@type": "Organization",
        name: DataVideo.creator.name || DataVideo.creator.code,
      },
      interactionStatistic: [
        {
          "@type": "InteractionCounter",
          interactionType: "http://schema.org/LikeAction",
          userInteractionCount: DataVideo.likes_count,
        },
        {
          "@type": "InteractionCounter",
          interactionType: "http://schema.org/DislikeAction",
          userInteractionCount: DataVideo.dislikes_count,
        },
        {
          "@type": "InteractionCounter",
          interactionType: "http://schema.org/WatchAction",
          userInteractionCount: DataVideo.views_count,
        },
      ],
    },
  };

  const relatedVideosSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Related Videos",
    itemListElement: DataVideos.videos.map((video: any, index: number) => ({
      "@type": "VideoObject",
      position: index + 1,
      name: video.title,
      thumbnailUrl: video.image_url,
      contentUrl: `https://rgb.irpsc.com/${params.lang}/education/category/${decodeURIComponent(
        params.category
      )}/${params.subcategory}/${video.slug}`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(singleVideoSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(relatedVideosSchema) }}
      />
      <div className="flex w-full h-screen overflow-hidden" dir={langData.direction}>

        <section
          className={`w-full overflow-y-auto relative light-scrollbar dark:dark-scrollbar mt-[60px] lg:mt-0 lg:pt-0 bg-[#F5F5F5] dark:bg-black bg-opacity20 xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1`}
        >
          <section
            className={`w-full relative overflow-y-auto overflow-x-clip flex flex-col justify-start items-center`}
          >
            <VideoSection
              mainData={mainData}
              params={params}
              DataVideo={DataVideo}
              newEducationsVideos={newEducationsVideos}
              dataCommentsVideo={dataCommentsVideo}
            />
          <ListVideos DataVideos={DataVideos} params={params} DataVideo={DataVideo}   />
          </section>
          <div className="xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
            <Suspense fallback={<div className="text-center text-[20px]">loading...</div>}>
              <DynamicFooter footerTabs={footerTabs} mainData={mainData} params={params} />
            </Suspense>
          </div>
        </section>
      </div>
    </>
  );
}

// SEO
export async function generateMetadata({ params }: { params: any }) {
  // استفاده از cached function برای DataVideo
  const DataVideo = await getCachedSingleVideoData(params.videoId);

function stripHtmlTags(str: string): string {
  return str ? str.replace(/<[^>]*>/g, "") : "";
}

async function makeLessCharacter(_desc: any) {
  const clean = stripHtmlTags(_desc);
  return clean.slice(0, 200);
}


  if (!DataVideo) {
    return {
      title: "ویدئو یافت نشد",
      description: "ویدئو مورد نظر یافت نشد",
      openGraph: {
        type: "website",
        title: "ویدئو یافت نشد",
        description: "ویدئو مورد نظر یافت نشد",
        locale: params.lang.toLowerCase() === "fa" ? "fa_IR" : "en_US",
        url: `https://rgb.irpsc.com/${params.lang}/education/category/${params.category}/${params.subcategory}/${params.videoId}`,
      },
    };
  }

  return {
    title: DataVideo.title,
    description: await makeLessCharacter(DataVideo.description),
    openGraph: {
      type: "website",
      title: DataVideo.title,
      description: await makeLessCharacter(DataVideo.description),
      locale: params.lang.toLowerCase() === "fa" ? "fa_IR" : "en_US",
      url: `https://rgb.irpsc.com/${params.lang}/education/category/${params.category}/${params.subcategory}/${params.videoId}`,
      images: [
        {
          url: DataVideo.image_url,
          width: 400,
          height: 400,
        },
      ],
    },
  };
}