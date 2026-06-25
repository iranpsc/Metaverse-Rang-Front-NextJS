export const dynamic = "force-dynamic";

import NotFoundPage from "@/components/error/NotFoundPage";
import { supabase } from "@/utils/lib/supabaseClient";

import {
  getTranslation,
  getMainFile,
  getLangArray,
} from "@/components/utils/actions";
import BreadCrumb from "@/components/shared/BreadCrumb";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import AuthorSection from "../../../../../../components/features/MetaNews";
import NewsHeader from "../../../../../../components/ui/header/NewsHeader";
import NewsImage from "../../../../../../components/features/NewsImage";
import NewsContent from "../../../../../../components/features/NewsContent";
import SideCard from "../../../../../../components/features/NewsSideBar";
import PopularNews from "../../../../../../components/features/PopularNews";

import NewsStats from "../../../../../../components/features/NewsStats";
import PrevNextNews from "../../../../../../components/features/PrevNextNews";
import ShowSocialWrapper from "@/components/shared/ShowSocialWrapper";
import CustomErrorPage from "@/components/error/CustomErrorPage";
import CleanAutoRetryParam from "@/components/system/CleanAutoRetryParam";
import NewsTags from "../../../../../../components/features/NewsTags";
import fallbackNewsData from "@/components/utils/news.json";
import WindowsNews from "../../../../../../components/features/PromoNewsSection"
import Link from "next/link";

interface NewsPageProps {
  params: Promise<{
    lang: string;
    category: string;
    slug: string;
  }>;
}

// ─── تابع کمکی برای نرمالایز کردن دیتای دریافتی ───
type NormalizedNews = {
  id: number;
  title: string;
  slug: string;
  image?: string | null;
  date?: string | null;
  readingTime?: string | null;
  stats?: any;
  category?: string | null;
  categorySlug?: string;
  categoryImage?: string | null;
  categoryDec?: string | null;
  subCategory?: string | null;
  content: string;
  description?: string | null;
  author?: any;
  tags?: any;
  video?: string | null;
  excerpt?: string | null;
  gallery?: string[] | null;

};

function normalizeNewsItem(item: any): NormalizedNews {
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    image: item.image || null,
    date: item.date || null,
    readingTime: item.readingTime || null,
    stats: item.stats || null,
    category: item.category || null,
    categorySlug: item.categorySlug,
    categoryImage: item.categoryImage || null,
    categoryDec: item.categoryDec || null,
    subCategory: item.subCategory || null,
    content: item.content,
    description: item.description || null,
    author: item.author || null,
    tags: item.tags || null,
    video: item.video || null,
    excerpt: item.excerpt || null,
    gallery: item.gallery || null,
  };
}

// ─── تابع دریافت خبر با fallback به news.json ───
async function fetchNewsBySlugWithFallback(slug: string) {
  try {
    // تلاش برای دریافت از Supabase
    const { data: supabaseNews, error } = await supabase
      .from("news")
      .select("*")
      .eq("slug", slug)
      .single();

    // اگر خطایی رخ داد یا دیتایی نیامد، از fallback استفاده کن
    if (error || !supabaseNews) {
      if (error) {
        console.warn(`⚠️ [News:${slug}] Supabase error, using fallback news.json:`, error.message);
      } else if (!supabaseNews) {
        console.warn(`⚠️ [News:${slug}] No data from Supabase, using fallback news.json`);
      }

      // جستجو در دیتای news.json بر اساس slug
      const fallbackItem = fallbackNewsData.find((item: any) => item.slug === slug);

      if (fallbackItem) {
        return { data: normalizeNewsItem(fallbackItem), fromFallback: true };
      }

      return { data: null, fromFallback: true };
    }

    // نرمالایز کردن دیتای دریافتی از Supabase
    const normalizedData = normalizeNewsItem(supabaseNews);

    return { data: normalizedData, fromFallback: false };
  } catch (err) {
    // در صورت بروز هرگونه خطای غیرمنتظره، از fallback استفاده کن
    console.error(`❌ [News:${slug}] Unexpected error fetching news, using fallback:`, err);
    const fallbackItem = fallbackNewsData.find((item: any) => item.slug === slug);

    if (fallbackItem) {
      return { data: normalizeNewsItem(fallbackItem), fromFallback: true };
    }

    return { data: null, fromFallback: true };
  }
}

// ─── تابع دریافت اخبار همان دسته برای Prev/Next با fallback ───
async function fetchCategoryNewsWithFallback(categorySlug: string, currentSlug: string) {
  try {
    // تلاش برای دریافت از Supabase
    const { data: supabaseNews, error } = await supabase
      .from("news")
      .select("*")
      .eq("categorySlug", categorySlug)
      .order("date", { ascending: true });

    // اگر خطایی رخ داد یا دیتایی نیامد، از fallback استفاده کن
    if (error || !supabaseNews || supabaseNews.length === 0) {
      if (error) {
        console.warn(`⚠️ [Category:${categorySlug}] Supabase error for Prev/Next, using fallback`);
      }

      // دریافت از fallback و فیلتر بر اساس categorySlug
      const fallbackData = fallbackNewsData
        .map((item: any) => normalizeNewsItem(item))
        .filter((item: NormalizedNews) => item.categorySlug === categorySlug)
        .sort((a: NormalizedNews, b: NormalizedNews) => {
          // مرتب‌سازی ساده بر اساس تاریخ (فرمت شمسی)
          const dateA = a.date ? parseInt(a.date.replace(/\//g, "")) : 0;
          const dateB = b.date ? parseInt(b.date.replace(/\//g, "")) : 0;
          return dateA - dateB;
        });

      return { data: fallbackData, fromFallback: true };
    }

    // نرمالایز کردن دیتای دریافتی از Supabase
    const normalizedData = supabaseNews.map((item: any) => normalizeNewsItem(item));

    return { data: normalizedData, fromFallback: false };
  } catch (err) {
    console.error(`❌ [Category:${categorySlug}] Error fetching category news for Prev/Next:`, err);
    const fallbackData = fallbackNewsData
      .map((item: any) => normalizeNewsItem(item))
      .filter((item: NormalizedNews) => item.categorySlug === categorySlug);

    return { data: fallbackData, fromFallback: true };
  }
}

// ======================================
// Metadata (SEO + 404 امن)
// ======================================
export async function generateMetadata({ params }: NewsPageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  try {
    function cleanDescription(html: any, limit = 255) {
      if (!html) return "";

      let text = "";

      if (typeof window === "undefined") {
        // SSR / Node.js
        text = html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
      } else {
        // Browser
        const div = document.createElement("div");
        div.innerHTML = html;
        text = div.textContent || div.innerText || "";
      }

      text = text.trim();

      return text.length > limit
        ? text.slice(0, limit).trim() + "…"
        : text;
    }

    const { slug, category } = resolvedParams;

    // دریافت خبر با fallback
    const { data: news } = await fetchNewsBySlugWithFallback(slug);

    if (!news) {
      return {
        title: "خبر یافت نشد",
        description: "خبر مورد نظر وجود ندارد",
        robots: { index: false, follow: false },
      };
    }

    if (category !== news.categorySlug) {
      return {
        title: "خبر یافت نشد",
        description: "آدرس خبر معتبر نیست",
        robots: { index: false, follow: false },
      };
    }

    const canonicalUrl = `https://metarang.com/${lang}/news/categories/${news.categorySlug}/${news.slug}`;

    return {
      title: news.title,
      description: cleanDescription(news.description || "اخبار متاورس رنگ"),
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: news.title,
        description: cleanDescription(news.description || "اخبار متاورس رنگ"),
        url: canonicalUrl,
        type: "article",
        images: news.image ? [{ url: news.image }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: news.title,
        description: cleanDescription(news.description || "اخبار متاورس رنگ"),
        images: news.image ? [news.image] : [],
      },
      robots: { index: true, follow: true },
    };
  } catch (error) {
    console.error("❌ Metadata error (NewsPage):", error);

    return {
      title: "خطا",
      description: "مشکلی در بارگذاری صفحه رخ داده است",
    };
  }
}

// ======================================
// Static Paths - بر اساس دیتای استاتیک news.json
// ======================================
export async function generateStaticParams() {
  try {
    if (!fallbackNewsData || fallbackNewsData.length === 0) return [];

    // فقط فارسی (طبق دیتای موجود، همه اخبار فارسی هستند)
    return fallbackNewsData.map((news: any) => ({
      lang: "fa",
      category: news.categorySlug,
      slug: news.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// هر ۱۰ دقیقه یکبار صفحات استاتیک رو به‌روزرسانی کنه (ISR)

export const dynamicParams = true; // اجازه می‌ده اخبار جدید بدون rebuild هم کار کنن

// ======================================
// صفحه اصلی خبر
// ======================================
export default async function NewsPage({ params }: NewsPageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  try {
    function cleanDescription(html: any, limit = 100) {
      if (!html) return "";

      // Normalize to string
      let text = String(html);

      // Remove any angle brackets to prevent partial tags (e.g., "<script")
      text = text.replace(/[<>]/g, "");

      // Remove HTML tags
      text = text.replace(/<[^>]*>/g, "");

      // Collapse consecutive whitespace and trim
      text = text.replace(/\s+/g, " ").trim();

      return text.length > limit
        ? text.slice(0, limit).trim() + "…"
        : text;
    }

    const { slug, category } = resolvedParams;

    // دریافت خبر اصلی با fallback
    const { data: news, fromFallback: newsFromFallback } = await fetchNewsBySlugWithFallback(slug);

    if (!news) {
      const [langData, langArray, mainData] = await Promise.all([
        getTranslation(lang),
        getLangArray(),
        getMainFile(await getTranslation(lang)),
      ]);

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

    // چک کردن category
    if (category !== news.categorySlug) {
      const [langData, langArray, mainData] = await Promise.all([
        getTranslation(lang),
        getLangArray(),
        getMainFile(await getTranslation(lang)),
      ]);

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

    // هشدار در صورت استفاده از fallback
    if (newsFromFallback) {
      console.log(`ℹ️ [News:${slug}] News data is currently being served from fallback JSON file`);
    }

    // اخبار همان دسته برای Prev/Next با fallback
    const { data: categoryNews, fromFallback: categoryFromFallback } = await fetchCategoryNewsWithFallback(
      news.categorySlug || "",
      slug
    );

    if (categoryFromFallback && categoryNews && categoryNews.length > 0) {
      console.log(`ℹ️ [Category:${news.categorySlug}] Category news for Prev/Next from fallback`);
    }

    const [langData, langArray, mainData] = await Promise.all([
      getTranslation(lang),
      getLangArray(),
      getMainFile(await getTranslation(lang)),
    ]);

    // JSON-LD Schema
    const schema = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: news.title,
      description: cleanDescription(news.description || "اخبار متاورس رنگ"),
      image: news.image ? [news.image] : undefined,
      author: {
        "@type": "Person",
        name: news.author?.name ?? "نویسنده",
      },
      datePublished: news.date,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://metarang.com/${lang}/news/categories/${category}/${slug}`,
      },
      publisher: {
        "@type": "Organization",
        name: "متاورس رنگ",
        logo: {
          "@type": "ImageObject",
          url: "https://metarang.com/logo.png",
        },
      },
    };

    return (
      <div className="w-full relative bg-[#f8f8f8] dark:bg-black" dir={langData.direction}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <div className="fixed z-[1000] end-10 bottom-[100px]">
          <Link aria-label="SocialLink" href={"#em"} className="bg-light-primary dark:bg-dark-yellow rounded-full w-[60px] h-[60px]  flex items-center justify-center">

            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className="stroke-white dark:stroke-black" d="M22 11.5V15.5C22 19 20 20.5 17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H12" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path className="stroke-white dark:stroke-black" d="M7 9L11 11.5C12.048 12.2897 13.952 11.2897 15 10.5" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M19.0062 1.96875C17.9029 1.96875 17.0062 2.86542 17.0062 3.96875V4.93208C17.0062 5.13542 16.9195 5.44542 16.8162 5.61875L16.4329 6.25542C16.1962 6.64875 16.3595 7.08542 16.7929 7.23208C18.2295 7.71208 19.7795 7.71208 21.2162 7.23208C21.6195 7.09875 21.7962 6.62208 21.5762 6.25542L21.1929 5.61875C21.0929 5.44542 21.0062 5.13542 21.0062 4.93208V3.96875C21.0062 2.86875 20.1062 1.96875 19.0062 1.96875Z" stroke="#18C08F" stroke-miterlimit="10" stroke-linecap="round" />
              <path className="stroke-white dark:stroke-black" d="M19.623 2.06844C19.5196 2.03844 19.413 2.0151 19.303 2.00177C18.983 1.96177 18.6763 1.9851 18.3896 2.06844C18.4863 1.82177 18.7263 1.64844 19.0063 1.64844C19.2863 1.64844 19.5263 1.82177 19.623 2.06844Z" stroke-width="0.8" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path className="stroke-white dark:stroke-black" d="M20.0068 7.35156C20.0068 7.90156 19.5568 8.35156 19.0068 8.35156C18.7335 8.35156 18.4802 8.23823 18.3002 8.05823C18.1202 7.87823 18.0068 7.6249 18.0068 7.35156" stroke-miterlimit="10" />
            </svg>

          </Link>
        </div>
        <CleanAutoRetryParam />
        <section className="w-full  bg-[#f8f8f8] dark:bg-black mt-[60px] lg:mt-0">
          <div className="px-5 2xl:px-10">
            <BreadCrumb params={resolvedParams} title={news.title} articleCat={news.category || ""} />
          </div>

          <div className="mainContainer w-full flex flex-col gap-5 items-center lg:flex-row lg:items-start px-5 lg:px-10 ">
            {/* محتوای اصلی */}
            <div className="lg:w-[70%] 3xl:w-[80%]">
              <div className="flex flex-col gap-10 w-full items-center rounded-xl bg-white dark:bg-[#1A1A18] shadow-lg p-5 xl:p-10">
                <AuthorSection
                  author={news.author}
                  // date={news.date}
                  title={news.title}
                  content={news.content}
                  stats={news.stats}
                  mainData={mainData}
                  lang={lang}
                />
                <NewsHeader
                  title={news.title}
                  author={news.author}
                  date={news.date}
                  description={news.description}
                />
                <NewsImage
                  news={{
                    image: news.image,
                    title: news.title,
                    video: news.video, // اگر ویدیو داشته باشد
                    slug: news.slug,
                    categorySlug: news.categorySlug
                  }}
                  params={resolvedParams}
                  mainData={mainData}
                />
                <NewsContent content={news.content} gallery={news.gallery} params={resolvedParams} />
                <NewsStats
                  stats={news.stats}
                  category={news.category}
                  categorySlug={news.categorySlug}
                  date={news.date}
                  // readingTime={news.readingTime}
                  mainData={mainData}
                  lang={lang}
                  className="mb-4"
                  showIcons={true}
                />
              </div>
              <NewsTags
                tags={news.tags}
                showIcon={true}
              />
              <div className="w-full mt-10 space-y-28">
                <ShowSocialWrapper
                  params={resolvedParams}
                  mainData={mainData}
                  content={news}
                />
                <PrevNextNews params={resolvedParams} news={categoryNews || []} mainData={mainData} />

              </div>
            </div>

            <div className="w-full hidden lg:block lg:w-[30%] 3xl:w-[20%] sticky self-start z-10 top-5">
              <SideCard params={resolvedParams} mainData={mainData} />
            </div>
          </div>
          <div className="lg:w-[70%] 3xl:w-[80%] lg:px-10 mb-10 mt-20">
            <WindowsNews />
          </div>
          <div className="ps-5 lg:ps-10 w-full flex items-center mt-14 lg:mt-20 flex-col gap-14">

            <PopularNews params={resolvedParams} mainData={mainData} initialNews={[]} />
          </div>
          <div id="em" className="w-full px-5 flex flex-col items-center mt-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="364" height="364" viewBox="0 0 364 364" fill="none" className="mb-[-140px] dark:hidden">
              <path d="M333.666 174.419V235.086C333.666 288.169 303.333 310.919 257.833 310.919H106.166C60.6663 310.919 30.333 288.169 30.333 235.086V128.919C30.333 75.8359 60.6663 53.0859 106.166 53.0859H182" stroke="url(#paint0_linear_4633_15252)" strokeWidth="6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M106.167 136.5L166.834 174.417C182.728 186.394 211.606 171.228 227.5 159.25" stroke="url(#paint1_linear_4633_15252)" strokeWidth="6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M280.097 47.0625C264.099 47.0625 251.097 60.0642 251.097 76.0625V90.0308C251.097 92.9792 249.84 97.4742 248.342 99.9875L242.784 109.219C239.352 114.923 241.72 121.254 248.004 123.381C268.835 130.341 291.31 130.341 312.142 123.381C317.99 121.448 320.552 114.536 317.362 109.219L311.804 99.9875C310.354 97.4742 309.097 92.9792 309.097 90.0308V76.0625C309.097 60.1125 296.047 47.0625 280.097 47.0625Z" stroke="url(#paint2_linear_4633_15252)" strokeWidth="6" strokeMiterlimit="10" strokeLinecap="round" />
              <path d="M289.039 48.465C287.54 48.03 285.994 47.6917 284.399 47.4983C279.759 46.9183 275.312 47.2567 271.155 48.465C272.557 44.8883 276.037 42.375 280.097 42.375C284.157 42.375 287.637 44.8883 289.039 48.465Z" stroke="url(#paint3_linear_4633_15252)" strokeWidth="6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M294.597 125.125C294.597 133.1 288.072 139.625 280.097 139.625C276.133 139.625 272.46 137.982 269.85 135.372C267.24 132.762 265.597 129.088 265.597 125.125" stroke="url(#paint4_linear_4633_15252)" strokeWidth="6" strokeMiterlimit="10" />
              <defs>
                <linearGradient id="paint0_linear_4633_15252" x1="182" y1="53.0859" x2="182" y2="310.919" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00398E" />
                  <stop offset="1" stopColor="#0066FF" />
                </linearGradient>
                <linearGradient id="paint1_linear_4633_15252" x1="166.834" y1="136.5" x2="166.834" y2="178.788" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00398E" />
                  <stop offset="1" stopColor="#0066FF" />
                </linearGradient>
                <linearGradient id="paint2_linear_4633_15252" x1="279.977" y1="47.0625" x2="279.977" y2="128.601" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00398E" />
                  <stop offset="1" stopColor="#0066FF" />
                </linearGradient>
                <linearGradient id="paint3_linear_4633_15252" x1="280.097" y1="42.375" x2="280.097" y2="48.465" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00398E" />
                  <stop offset="1" stopColor="#0066FF" />
                </linearGradient>
                <linearGradient id="paint4_linear_4633_15252" x1="280.097" y1="125.125" x2="280.097" y2="139.625" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00398E" />
                  <stop offset="1" stopColor="#0066FF" />
                </linearGradient>
              </defs>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="364" height="364" viewBox="0 0 364 364" fill="none" className="mb-[-140px] hidden dark:block">
              <path d="M333.667 174.419V235.086C333.667 288.169 303.334 310.919 257.834 310.919H106.167C60.6673 310.919 30.334 288.169 30.334 235.086V128.919C30.334 75.8359 60.6673 53.0859 106.167 53.0859H182.001" stroke="url(#paint0_linear_4633_15270)" strokeWidth="6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M106.166 136.5L166.833 174.417C182.727 186.394 211.605 171.228 227.499 159.25" stroke="url(#paint1_linear_4633_15270)" strokeWidth="6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M280.096 47.0625C264.098 47.0625 251.096 60.0642 251.096 76.0625V90.0308C251.096 92.9792 249.839 97.4742 248.341 99.9875L242.783 109.219C239.351 114.923 241.719 121.254 248.003 123.381C268.834 130.341 291.309 130.341 312.141 123.381C317.989 121.448 320.551 114.536 317.361 109.219L311.803 99.9875C310.353 97.4742 309.096 92.9792 309.096 90.0308V76.0625C309.096 60.1125 296.046 47.0625 280.096 47.0625Z" stroke="url(#paint2_linear_4633_15270)" strokeWidth="6" strokeMiterlimit="10" strokeLinecap="round" />
              <path d="M289.038 48.465C287.539 48.03 285.993 47.6917 284.398 47.4983C279.758 46.9183 275.311 47.2567 271.154 48.465C272.556 44.8883 276.036 42.375 280.096 42.375C284.156 42.375 287.636 44.8883 289.038 48.465Z" stroke="url(#paint3_linear_4633_15270)" strokeWidth="6" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M294.596 125.125C294.596 133.1 288.071 139.625 280.096 139.625C276.132 139.625 272.459 137.982 269.849 135.372C267.239 132.762 265.596 129.088 265.596 125.125" stroke="url(#paint4_linear_4633_15270)" strokeWidth="6" strokeMiterlimit="10" />
              <defs>
                <linearGradient id="paint0_linear_4633_15270" x1="182.001" y1="53.0859" x2="182.001" y2="310.919" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#997700" />
                  <stop offset="1" stopColor="#FFC700" />
                </linearGradient>
                <linearGradient id="paint1_linear_4633_15270" x1="166.833" y1="136.5" x2="166.833" y2="178.788" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#997700" />
                  <stop offset="1" stopColor="#FFC700" />
                </linearGradient>
                <linearGradient id="paint2_linear_4633_15270" x1="279.976" y1="47.0625" x2="279.976" y2="128.601" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#997700" />
                  <stop offset="1" stopColor="#FFC700" />
                </linearGradient>
                <linearGradient id="paint3_linear_4633_15270" x1="280.096" y1="42.375" x2="280.096" y2="48.465" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#997700" />
                  <stop offset="1" stopColor="#FFC700" />
                </linearGradient>
                <linearGradient id="paint4_linear_4633_15270" x1="280.096" y1="125.125" x2="280.096" y2="139.625" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#997700" />
                  <stop offset="1" stopColor="#FFC700" />
                </linearGradient>
              </defs>
            </svg>
            <div className="bg-white dark:bg-[#0E0E0E] w-full max-w-7xl rounded-xl py-10 2xl:py-12 px-5 2xl:px-10 text-center flex flex-col items-center gap-4 mx-auto">
              <p className="text-2xl dark:text-white 2xl:text-[32px] font-rokh dark:text-wrap font-bold">{findByUniqueId(mainData, 1626) || "خبرنامه متاورس"}</p>
              <p className="lg:text-lg dark:text-[#868B90] text-[#656565]">{findByUniqueId(mainData, 1627) || "برای اطلاع از آخرین اخبار، تحلیل ها و مطالب اختصاصی، می توانید در خبرنامه ما عضو شوید.هدف ما ارائه محتوای دقیق، معتبر و به روز است تا همواره از مهم ترین تحولات باخبر باشید. در صورت تمایل، کافی است آدرس ایمیل خود را وارد کنید تا از این پس، به روزترین محتواها و اطلاع رسانی های رسمی را بدون نیاز به مراجعه مداوم به وب سایت، دریافت کنید."}</p>
              <div className="w-full flex flex-col gap-2 gap-y-5 lg:flex-row max-w-3xl">
                <input type="text" name="" id="" placeholder={findByUniqueId(mainData, 1626) || "آدرس ایمیل"} className="bg-[#F5F5F5] w-full lg:w-[75%] dark:bg-black rounded-xl border-0 ring-1 ring-[#D9D9D9] dark:ring-[#434343] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-light-primary focus:dark:ring-dark-yellow focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-darkGray" />
                <button className="bg-light-primary font-bold dark:bg-dark-yellow text-white dark:text-black rounded-xl px-5 py-2 lg:w-[25%]">{findByUniqueId(mainData, 2)}</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    const serializedError = {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : null,
      name: error instanceof Error ? error.name : "Error",
    };

    console.error("❌ Error in NewsPage:", serializedError);

    return <CustomErrorPage error={serializedError} />;
  }
}