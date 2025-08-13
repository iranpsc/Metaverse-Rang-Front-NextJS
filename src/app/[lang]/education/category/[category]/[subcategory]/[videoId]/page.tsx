import dynamic from "next/dynamic";
import { Suspense } from "react";

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

import {
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getFooterData,
  getLangArray,
  getSubcategoryData,
  getSingleVideoData,
  getAllCategoryVideos,
  getVideoComments,
} from "@/components/utils/actions";

import { getStaticMenu } from "@/components/utils/constants";
import VideoSection from "@/components/templates/singleVideo/VideoSection";
import ListVideos from "@/components/module/singleVideo/listVideos/ListVideos";

import NotFoundPage from "@/components/shared/NotFoundPage"; // فرض کردم صفحه 404 اینجاست

export default async function EducationVideo({ params }: { params: any }) {
  const [footerTabs, langData, langArray] = await Promise.all([
    getFooterData(params),
    getTranslation(params.lang),
    getLangArray(),
  ]);

  const mainData = await getMainFile(langData);

  const centralPageModal = await findByModalName(mainData, "central-page");
  const tabsMenu = await findByTabName(centralPageModal, "before-login");

  const DataVideo = await getSingleVideoData(params.videoId);
  const staticMenuToShow = getStaticMenu(params.id);
  const updatedTabsMenu = tabsMenu.map((tab: any) => {
    const findInStatic = staticMenuToShow.find(
      (val) => tab.unique_id === val.unique_id
    );
    if (findInStatic) {
      return {
        ...tab,
        url: findInStatic.url,
        order: findInStatic.order,
        toShow: true,
      };
    }
    return tab;
  });
  // اگر ویدئو پیدا نشد، 404 نمایش بده
  if (!DataVideo) {
    return <NotFoundPage
      lang={params.lang}
      params={params}
      langData={langData}
      langArray={langArray}
      updatedTabsMenu={updatedTabsMenu}
      footerTabs={footerTabs}
      mainData={mainData} />;
  }

  const newEducationsVideos = await getAllCategoryVideos();

  const dataCommentsVideo = await getVideoComments(DataVideo.id);

  const DataVideos = await getSubcategoryData(
    params.category,
    params.subcategory
  );

  async function makeLessCharacter(_desc: any) {
    if (_desc) return _desc.slice(0, 200);
    return "";
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
      <div className="flex h-screen overflow-hidden" dir={langData.direction}>
        <Suspense fallback={<div className="text-center text-[20px]">loading...</div>}>
          <SideBar
            tabsMenu={updatedTabsMenu}
            langData={langData}
            langArray={langArray}
            params={params}
            pageSide="citizen"
          />
        </Suspense>
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
            <ListVideos DataVideos={DataVideos} params={params} />
          </section>
          <div className="xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
            <Suspense fallback={<div className="text-center text-[20px]">loading...</div>}>
              <DynamicFooter footerTabs={footerTabs} mainData={mainData} />
            </Suspense>
          </div>
        </section>
      </div>
    </>
  );
}

// SEO
export async function generateMetadata({ params }: { params: any }) {
  const DataVideo = await getSingleVideoData(params.videoId);

  async function makeLessCharacter(_input: string | undefined | null): Promise<string> {
    return _input && typeof _input === "string" ? _input.slice(0, 200) : "";
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
