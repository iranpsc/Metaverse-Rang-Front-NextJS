import BreadCrumb from "@/components/shared/BreadCrumb";
import LatestNews from "./components/LatestNews";
import PopularNews from "./components/PopularNews";
import SearchComponent from "@/components/shared/SearchComponent";
import BreakingNewsSlider from "./components/BreakingNewsSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import CustomErrorPage from "@/components/shared/CustomErrorPage";
import NewsCategoriesSection from "./components/NewsCategoriesSection";
import VideoNewsList from "./components/VideoNewsList";
import {
  getTranslation,
  getMainFile,
} from "@/components/utils/actions";

import { findByUniqueId } from "@/components/utils/findByUniqueId";

const baseUrl = "https://rgb.irpsc.com";
const imageUrl =
  "https://rgb.irpsc.com/_next/image?url=%2Flogo.png&w=128&q=75";

// =====================
// ✅ Dynamic Metadata
// =====================
export async function generateMetadata({ params }: { params: any }) {
  try {
    const lang = params.lang || "fa";
    const url = `${baseUrl}/${lang}/news`;

    return {
      title: lang === "fa" ? "اخبار متاورس رنگ" : "Metarangs Metaverse News",
      description:
        lang === "fa"
          ? "آخرین اخبار و بروزرسانی‌های متاورس رنگ را در این صفحه دنبال کنید."
          : "Follow the latest news and updates of Metarang — Iran’s first national metaverse.",
      openGraph: {
        title:
          lang === "fa"
            ? "اخبار متاورس رنگ"
            : "Metarangs Metaverse News",
        description:
          lang === "fa"
            ? "آخرین اخبار و بروزرسانی‌های متاورس رنگ را در این صفحه دنبال کنید."
            : "Follow the latest news and updates of Metarang — Iran’s first national metaverse.",
        url,
        siteName: "Metaverse Rang",
        locale: lang === "fa" ? "fa_IR" : "en_US",
        type: "website",
        images: [
          {
            url: imageUrl,
            width: 800,
            height: 600,
            alt: "اخبار متاورس رنگ",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title:
          lang === "fa"
            ? "اخبار متاورس رنگ"
            : "Metarangs Metaverse News",
        description:
          lang === "fa"
            ? "آخرین اخبار متاورس رنگ"
            : "Latest Metarangs Metaverse News",
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error("❌ Metadata error (NewsPage):", error);
    return {
      title: "خطا",
      description: "مشکلی در بارگذاری صفحه رخ داده است",
    };
  }
}

// =====================
// ✅ Page Component
// =====================
export default async function NewsPage({ params }: { params: any }) {
  try {
    const [langData] = await Promise.all([
      getTranslation(params.lang),
    ]);

    const mainData = await getMainFile(langData);

    return (
      <section
        className="w-full relative lg:pt-0 bg-[#f8f8f8] dark:bg-black"
        dir={langData.direction}
      >
        <div className="px-5 2xl:px-10 mt-[60px] lg:mt-0">
          <BreadCrumb params={params} />
        </div>



        {/* ===== Search + Categories ===== */}
        <div className="mb-10 mt-[-50px] lg:mt-5 space-y-7 ps-5">
          <div className="flex flex-col-reverse lg:flex-row lg:justify-between lg:items-center w-full px-5 lg:pe-4">
            <h1 className="font-rokh text-start font-bold w-full lg:w-1/2  text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px]  dark:text-white mt-[64px] mb-[16px]">
              {findByUniqueId(mainData, 255)}
            </h1>

            <SearchComponent
              searchLevel="news"
              mainData={mainData}
              params={params}
            />
          </div>
          <p className="text-lightGray dark:text-lightGray font-azarMehr text-center text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] px-5 lg:px-10">
            {findByUniqueId(mainData, 1629)}
          </p>
        </div>

        <div className=" space-y-28 mt-28">

          <BreakingNewsSlider lang={params.lang} mainData={mainData} />
          <LatestNews params={params} mainData={mainData} />
          <VideoNewsList
            params={params}
            limit={6}
            title="اخبار ویدئویی داغ"
            mainData={mainData}
          />
          <NewsCategoriesSection lang={params.lang} mainData={mainData} />
          <PopularNews params={params} mainData={mainData} />

        </div>
      </section>
    );
  } catch (error) {
    const serializedError = {
      message:
        error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : null,
      name: error instanceof Error ? error.name : "Error",
    };

    console.error("❌ Error in NewsPage:", serializedError);
    return <CustomErrorPage error={serializedError} />;
  }
}
