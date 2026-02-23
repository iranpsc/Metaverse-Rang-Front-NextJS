import BreadCrumb from "@/components/shared/BreadCrumb";
import LatestNews from "./components/LatestNews";
import PopularNews from "./components/PopularNews";
import SearchComponent from "@/components/shared/SearchComponent";
import BreakingNewsSlider from "./components/BreakingNewsSlider/BreakingNewsSlider.server";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay } from "swiper/modules";
import CustomErrorPage from "@/components/shared/CustomErrorPage";
import NewsCategoriesSection from "./components/NewsCategoriesSection";
import VideoNewsList from "./components/VideoNewsList";
import { supabase } from "@/utils/lib/supabaseClient";
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
    const newsUrl = `${baseUrl}/${params.lang}/news`;


    const { data: news } = await supabase
      .from("news")
      .select("id,title,slug,image,date,readingTime,stats")
      .order("date", { ascending: false })
      .limit(5);

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        /* ================= Breadcrumb ================= */
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "صفحه اصلی",
              "item": `${baseUrl}/${params.lang}`,
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "اخبار",
              "item": newsUrl,
            },
          ],
        },

        /* ================= Organization ================= */
        {
          "@type": "Organization",
          "@id": `${baseUrl}#organization`,
          "name": "MetaRang",
          "url": baseUrl,
          "logo": {
            "@type": "ImageObject",
            "url": imageUrl,
          },
        },

        /* ================= WebSite ================= */
        {
          "@type": "WebSite",
          "@id": `${baseUrl}#website`,
          "url": baseUrl,
          "name": "MetaRang",
          "publisher": {
            "@id": `${baseUrl}#organization`,
          },
          "inLanguage": params.lang === "fa" ? "fa-IR" : "en-US",
        },

        /* ================= Collection Page ================= */
        {
          "@type": "CollectionPage",
          "@id": `${newsUrl}#webpage`,
          "url": newsUrl,
          "name":
            params.lang === "fa"
              ? "اخبار متاورس رنگ"
              : "Metarang News",
          "description":
            params.lang === "fa"
              ? "آخرین اخبار و رویدادهای متاورس رنگ"
              : "Latest news and updates from Metarang Metaverse",
          "isPartOf": {
            "@id": `${baseUrl}#website`,
          },
          "about": {
            "@type": "Thing",
            "name": "News",
          },
          "inLanguage": params.lang === "fa" ? "fa-IR" : "en-US",
        },
      ],
    };


    return (
      <section
        className="w-full relative lg:pt-0 bg-[#f8f8f8] dark:bg-black"
        dir={langData.direction}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="px-5 2xl:px-10 mt-[60px] lg:mt-0">
          <BreadCrumb params={params} />
        </div>



        {/* ===== Search + Categories ===== */}
        <div className="mb-10 mt-[-50px] lg:mt-5 space-y-7 ps-5">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center w-full px-5 lg:pe-4">
            <h1 className="font-rokh text-center md:text-start font-bold w-full lg:w-1/2  text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px]  dark:text-white mt-[64px] mb-[16px]">
              {findByUniqueId(mainData, 255)}
            </h1>
            <p className="lg:hidden text-lightGray dark:text-lightGray font-azarMehr text-center lg:text-start text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] px-5 2xl:pe-28">
              {findByUniqueId(mainData, 1629) || "رجع تخصصی و مرکز نشر آخرین رویدادها، پیشرفت‌های فنی و اخبار توسعه دنیای موازی متارنگ؛ آگاهی از تازه‌ترین تحولات در حوزه‌ی فناوری، تجارت مجازی و حاکمیت غیرمتمرکز با ساختار بین المللی."}
            </p>
              <SearchComponent
              searchLevel="news"
              mainData={mainData}
              params={params}
              
            />
          </div>
          <p className="text-lightGray hidden lg:block dark:text-lightGray font-azarMehr text-center lg:text-start text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] px-5 2xl:pe-28">
            {findByUniqueId(mainData, 1629) || "رجع تخصصی و مرکز نشر آخرین رویدادها، پیشرفت‌های فنی و اخبار توسعه دنیای موازی متارنگ؛ آگاهی از تازه‌ترین تحولات در حوزه‌ی فناوری، تجارت مجازی و حاکمیت غیرمتمرکز با ساختار بین المللی."}
          </p>
        </div>

        <div className=" space-y-28 mt-28">

          <BreakingNewsSlider lang={params.lang} news={news} />
          <LatestNews params={params} mainData={mainData} />
          <VideoNewsList
            params={params}
            limit={6}
            title="اخبار ویدئویی داغ"
            mainData={mainData}
          />
          <NewsCategoriesSection lang={params.lang} mainData={mainData} />
          <PopularNews params={params} mainData={mainData} />
          <div className="w-full px-5 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="364" height="364" viewBox="0 0 364 364" fill="none" className="mb-[-140px] dark:hidden">
              <path d="M333.666 174.419V235.086C333.666 288.169 303.333 310.919 257.833 310.919H106.166C60.6663 310.919 30.333 288.169 30.333 235.086V128.919C30.333 75.8359 60.6663 53.0859 106.166 53.0859H182" stroke="url(#paint0_linear_4633_15252)" stroke-width="6" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M106.167 136.5L166.834 174.417C182.728 186.394 211.606 171.228 227.5 159.25" stroke="url(#paint1_linear_4633_15252)" stroke-width="6" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M280.097 47.0625C264.099 47.0625 251.097 60.0642 251.097 76.0625V90.0308C251.097 92.9792 249.84 97.4742 248.342 99.9875L242.784 109.219C239.352 114.923 241.72 121.254 248.004 123.381C268.835 130.341 291.31 130.341 312.142 123.381C317.99 121.448 320.552 114.536 317.362 109.219L311.804 99.9875C310.354 97.4742 309.097 92.9792 309.097 90.0308V76.0625C309.097 60.1125 296.047 47.0625 280.097 47.0625Z" stroke="url(#paint2_linear_4633_15252)" stroke-width="6" stroke-miterlimit="10" stroke-linecap="round" />
              <path d="M289.039 48.465C287.54 48.03 285.994 47.6917 284.399 47.4983C279.759 46.9183 275.312 47.2567 271.155 48.465C272.557 44.8883 276.037 42.375 280.097 42.375C284.157 42.375 287.637 44.8883 289.039 48.465Z" stroke="url(#paint3_linear_4633_15252)" stroke-width="6" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M294.597 125.125C294.597 133.1 288.072 139.625 280.097 139.625C276.133 139.625 272.46 137.982 269.85 135.372C267.24 132.762 265.597 129.088 265.597 125.125" stroke="url(#paint4_linear_4633_15252)" stroke-width="6" stroke-miterlimit="10" />
              <defs>
                <linearGradient id="paint0_linear_4633_15252" x1="182" y1="53.0859" x2="182" y2="310.919" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#00398E" />
                  <stop offset="1" stop-color="#0066FF" />
                </linearGradient>
                <linearGradient id="paint1_linear_4633_15252" x1="166.834" y1="136.5" x2="166.834" y2="178.788" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#00398E" />
                  <stop offset="1" stop-color="#0066FF" />
                </linearGradient>
                <linearGradient id="paint2_linear_4633_15252" x1="279.977" y1="47.0625" x2="279.977" y2="128.601" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#00398E" />
                  <stop offset="1" stop-color="#0066FF" />
                </linearGradient>
                <linearGradient id="paint3_linear_4633_15252" x1="280.097" y1="42.375" x2="280.097" y2="48.465" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#00398E" />
                  <stop offset="1" stop-color="#0066FF" />
                </linearGradient>
                <linearGradient id="paint4_linear_4633_15252" x1="280.097" y1="125.125" x2="280.097" y2="139.625" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#00398E" />
                  <stop offset="1" stop-color="#0066FF" />
                </linearGradient>
              </defs>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="364" height="364" viewBox="0 0 364 364" fill="none" className="mb-[-140px] hidden dark:block">
              <path d="M333.667 174.419V235.086C333.667 288.169 303.334 310.919 257.834 310.919H106.167C60.6673 310.919 30.334 288.169 30.334 235.086V128.919C30.334 75.8359 60.6673 53.0859 106.167 53.0859H182.001" stroke="url(#paint0_linear_4633_15270)" stroke-width="6" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M106.166 136.5L166.833 174.417C182.727 186.394 211.605 171.228 227.499 159.25" stroke="url(#paint1_linear_4633_15270)" stroke-width="6" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M280.096 47.0625C264.098 47.0625 251.096 60.0642 251.096 76.0625V90.0308C251.096 92.9792 249.839 97.4742 248.341 99.9875L242.783 109.219C239.351 114.923 241.719 121.254 248.003 123.381C268.834 130.341 291.309 130.341 312.141 123.381C317.989 121.448 320.551 114.536 317.361 109.219L311.803 99.9875C310.353 97.4742 309.096 92.9792 309.096 90.0308V76.0625C309.096 60.1125 296.046 47.0625 280.096 47.0625Z" stroke="url(#paint2_linear_4633_15270)" stroke-width="6" stroke-miterlimit="10" stroke-linecap="round" />
              <path d="M289.038 48.465C287.539 48.03 285.993 47.6917 284.398 47.4983C279.758 46.9183 275.311 47.2567 271.154 48.465C272.556 44.8883 276.036 42.375 280.096 42.375C284.156 42.375 287.636 44.8883 289.038 48.465Z" stroke="url(#paint3_linear_4633_15270)" stroke-width="6" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M294.596 125.125C294.596 133.1 288.071 139.625 280.096 139.625C276.132 139.625 272.459 137.982 269.849 135.372C267.239 132.762 265.596 129.088 265.596 125.125" stroke="url(#paint4_linear_4633_15270)" stroke-width="6" stroke-miterlimit="10" />
              <defs>
                <linearGradient id="paint0_linear_4633_15270" x1="182.001" y1="53.0859" x2="182.001" y2="310.919" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#997700" />
                  <stop offset="1" stop-color="#FFC700" />
                </linearGradient>
                <linearGradient id="paint1_linear_4633_15270" x1="166.833" y1="136.5" x2="166.833" y2="178.788" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#997700" />
                  <stop offset="1" stop-color="#FFC700" />
                </linearGradient>
                <linearGradient id="paint2_linear_4633_15270" x1="279.976" y1="47.0625" x2="279.976" y2="128.601" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#997700" />
                  <stop offset="1" stop-color="#FFC700" />
                </linearGradient>
                <linearGradient id="paint3_linear_4633_15270" x1="280.096" y1="42.375" x2="280.096" y2="48.465" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#997700" />
                  <stop offset="1" stop-color="#FFC700" />
                </linearGradient>
                <linearGradient id="paint4_linear_4633_15270" x1="280.096" y1="125.125" x2="280.096" y2="139.625" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#997700" />
                  <stop offset="1" stop-color="#FFC700" />
                </linearGradient>
              </defs>
            </svg>
            <div className=" bg-white dark:bg-[#0E0E0E] w-full max-w-7xl rounded-xl py-10 2xl:py-12 px-5 2xl:px-10 text-center flex flex-col items-center gap-4 mx-auto">
              <p className="text-2xl dark:text-white 2xl:text-[32px] font-rokh dark:text-wrap font-bold"> {findByUniqueId(mainData, 1626) || "خبرنامه متاورس"}</p>
              <p className="lg:text-lg dark:text-[#868B90] text-[#656565]">{findByUniqueId(mainData, 1627) || "برای اطلاع از آخرین اخبار، تحلیل ها و مطالب اختصاصی، می توانید در خبرنامه ما عضو شوید.هدف ما ارائه محتوای دقیق، معتبر و به روز است تا همواره از مهم ترین تحولات باخبر باشید. در صورت تمایل، کافی است آدرس ایمیل خود را وارد کنید تا از این پس، به روزترین محتواها و اطلاع رسانی های رسمی را بدون نیاز به مراجعه مداوم به وب سایت، دریافت کنید."}</p>
              <div className="w-full flex flex-col gap-2 gap-y-5 lg:flex-row max-w-3xl">
                <input type="text" name="" id="" placeholder={findByUniqueId(mainData, 1626) || "آدرس ایمیل"} className="bg-[#F5F5F5] w-full lg:w-[75%] dark:bg-black rounded-xl border-0 ring-1 ring-[#D9D9D9] dark:ring-[#434343] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-light-primary focus:dark:ring-dark-yellow focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-darkGray" />
                <button className="bg-light-primary font-bold dark:bg-dark-yellow text-white dark:text-black rounded-xl px-5 py-2 lg:w-[25%]">{findByUniqueId(mainData, 2)}</button>
              </div>
            </div>
          </div>
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
