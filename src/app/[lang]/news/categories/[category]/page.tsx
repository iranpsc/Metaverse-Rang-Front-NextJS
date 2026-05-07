import Link from "next/link";
import BreadCrumb from "@/components/shared/BreadCrumb";
import CategoryHeader from "../../../articles/categories/[category]/components/CategoryHeader";
import CategoryItemsGrid from "./components/CategoryItemsGrid";
import SearchComponent from "@/components/shared/SearchComponent";
import { getTranslation, getMainFile } from "@/components/utils/actions";
import { supabase } from "@/utils/lib/supabaseClient";
import CustomErrorPage from "@/components/shared/CustomErrorPage";
import CleanAutoRetryParam from "@/components/shared/CleanAutoRetryParam";

// ایمپورت دیتای استاتیک به عنوان fallback
import fallbackNewsData from "@/components/utils/news.json";

interface NewsCategoryPageProps {
  params: Promise<{ lang: string; category: string; }>;
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
  categorySlug?: string | null;
  categoryImage?: string | null;
  categoryDec?: string | null;
  subCategory?: string | null;
  content?: string | null;
  description?: string | null;
  author?: any;
  tags?: any;
  video?: string | null;
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
    categorySlug: item.categorySlug || null,
    categoryImage: item.categoryImage || null,
    categoryDec: item.categoryDec || null,
    subCategory: item.subCategory || null,
    content: item.content || null,
    description: item.description || null,
    author: item.author || null,
    tags: item.tags || null,
    video: item.video || null,
  };
}

// ─── تابع دریافت دیتا با fallback به news.json ───
async function fetchNewsByCategoryWithFallback(categorySlug: string) {
  try {
    // تلاش برای دریافت از Supabase
    const { data: supabaseNews, error } = await supabase
      .from("news")
      .select("*")
      .eq("categorySlug", categorySlug)
      .order("date", { ascending: false });

    // اگر خطایی رخ داد یا دیتایی نیامد، از fallback استفاده کن
    if (error || !supabaseNews || supabaseNews.length === 0) {
      if (error) {
        console.warn(`⚠️ [Category:${categorySlug}] Supabase error, using fallback news.json:`, error.message);
      } else if (!supabaseNews || supabaseNews.length === 0) {
        console.warn(`⚠️ [Category:${categorySlug}] No data from Supabase, using fallback news.json`);
      }
      
      // تبدیل دیتای news.json به فرمت مناسب و فیلتر بر اساس categorySlug
      const fallbackData = fallbackNewsData
        .map((item: any) => normalizeNewsItem(item))
        .filter((item: NormalizedNews) => item.categorySlug === categorySlug);
      
      return { data: fallbackData, fromFallback: true };
    }

    // نرمالایز کردن دیتای دریافتی از Supabase
    const normalizedData = supabaseNews.map((item: any) => normalizeNewsItem(item));
    
    return { data: normalizedData, fromFallback: false };
  } catch (err) {
    // در صورت بروز هرگونه خطای غیرمنتظره، از fallback استفاده کن
    console.error(`❌ [Category:${categorySlug}] Unexpected error fetching news, using fallback:`, err);
    const fallbackData = fallbackNewsData
      .map((item: any) => normalizeNewsItem(item))
      .filter((item: NormalizedNews) => item.categorySlug === categorySlug);
    
    return { data: fallbackData, fromFallback: true };
  }
}

/* ================= METADATA ================= */
export async function generateMetadata({ params }: NewsCategoryPageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  try {
    const categorySlug = decodeURIComponent(resolvedParams.category);
    const siteUrl = "https://metarang.com";

    // تلاش برای دریافت از Supabase با fallback
    const { data } = await fetchNewsByCategoryWithFallback(categorySlug);

    if (!data || data.length === 0) {
      return {
        title: `دسته ${categorySlug} | اخبار`,
        description: `خبری در این دسته یافت نشد`,
        alternates: {
          canonical: `${siteUrl}/${lang}/news/categories/${categorySlug}`,
        },
      };
    }

    const { category, categoryDec, categoryImage } = data[0];

    return {
      title: `${category} | اخبار`,
      description: categoryDec || `اخبار مرتبط با ${category}`,
      alternates: {
        canonical: `${siteUrl}/${lang}/news/categories/${categorySlug}`,
      },
      openGraph: {
        title: `${category} | اخبار`,
        description: categoryDec,
        url: `${siteUrl}/${lang}/news/categories/${categorySlug}`,
        siteName: "MetaRang",
        type: "website",
        locale: lang === "fa" ? "fa_IR" : "en_US",
        images: [
          {
            url: categoryImage || "/default.png",
            width: 1200,
            height: 630,
            alt: category,
          },
        ],
      },
    };
  } catch {
    return {
      title: "خطا",
      description: "مشکلی رخ داده است",
    };
  }
}

/* ================= PAGE ================= */
export default async function NewsCategoryPage({ params }: NewsCategoryPageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  try {
    const categorySlug = decodeURIComponent(resolvedParams.category);

    const langData = await getTranslation(lang);
    const mainData = await getMainFile(langData);

    // ─── دریافت اخبار با قابلیت fallback ───
    const { data: newsData, fromFallback } = await fetchNewsByCategoryWithFallback(categorySlug);

    // هشدار در صورت استفاده از fallback (اختیاری)
    if (fromFallback && newsData && newsData.length > 0) {
      console.log(`ℹ️ [Category:${categorySlug}] News data is currently being served from fallback JSON file`);
    }

    if (!newsData || newsData.length === 0) {
      return (
        <div className="text-center py-20 text-gray-500">
          <h2 className="text-2xl font-semibold dark:text-white">
            خبری در این دسته پیدا نشد 😕
          </h2>
          <Link
            href={`/${lang}/news`}
            className="text-blue-600 hover:underline"
          >
            بازگشت به اخبار
          </Link>
        </div>
      );
    }

    const {
      category,
      subCategory,
      categoryImage,
      categoryDec,
    } = newsData[0];

    const totalViews = newsData.reduce(
      (sum, n) => sum + (n.stats?.views ?? 0),
      0
    );
    const baseUrl = "https://metarang.com";
    const categoryUrl = `${baseUrl}/${lang}/news/categories/${categorySlug}`;

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
              "item": `${baseUrl}/${lang}`,
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "اخبار",
              "item": `${baseUrl}/${lang}/news`,
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": category,
              "item": categoryUrl,
            },
          ],
        },

        /* ================= Collection Page ================= */
        {
          "@type": "CollectionPage",
          "@id": `${categoryUrl}#webpage`,
          "url": categoryUrl,
          "name": `${category} | اخبار`,
          "description": categoryDec || `آخرین اخبار مرتبط با ${category}`,
          "isPartOf": {
            "@type": "WebSite",
            "name": "MetaRang",
            "url": baseUrl,
          },
          "inLanguage": lang === "fa" ? "fa-IR" : "en-US",
        },

        /* ================= News List ================= */
        {
          "@type": "ItemList",
          "name": `اخبار دسته ${category}`,
          "itemListOrder": "Descending",
          "numberOfItems": newsData.length,
          "itemListElement": newsData.map((n, index) => {
            // تبدیل تاریخ شمسی به ISO (اگر تاریخ به فرمت شمسی باشد)
            let publishedDate = new Date().toISOString();
            if (n.date) {
              // اگر تاریخ به فرمت "1404.09.05" باشد
              const parts = n.date.split(/[-/.]/);
              if (parts.length === 3) {
                // تبدیل تقریبی - توجه: این یک تبدیل دقیق نیست، فقط برای جلوگیری از خطا
                publishedDate = `${parseInt(parts[0]) - 621}/${
                  parts[1].padStart(2, "0")
                }/${parts[2].padStart(2, "0")}T00:00:00Z`;
              } else {
                publishedDate = n.date;
              }
            }

            return {
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "NewsArticle",
                "headline": n.title,
                "description":
                  n.description || categoryDec || "خبر جدید از متاورس رنگ",
                "url": `${baseUrl}/${lang}/news/${n.slug}`,
                "datePublished": publishedDate,
                "dateModified": publishedDate,
                "image": n.image || `${baseUrl}/default.png`,
                "author": {
                  "@type": "Organization",
                  "name": "MetaRang",
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "MetaRang",
                  "logo": {
                    "@type": "ImageObject",
                    "url": `${baseUrl}/_next/image?url=%2Flogo.png&w=120&q=75`,
                  },
                },
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": `${baseUrl}/${lang}/news/${n.slug}`,
                },
                "inLanguage": lang === "fa" ? "fa-IR" : "en-US",
                "isAccessibleForFree": true,
              },
            };
          }),
        },
      ],
    };

    return (
      <section className="w-full bg-[#f8f8f8] dark:bg-black">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CleanAutoRetryParam />

        <div className="px-5 mt-[60px] lg:mt-0">
          <BreadCrumb params={params} articleCat={category} />
        </div>

        {/* 🔹 HEADER (همون کامپوننت مقالات) */}
        <CategoryHeader
          data={{
            category,
            subCategory,
            categoryImage: categoryImage || "/default.png",
            categoryDec: categoryDec || "توضیحی برای این دسته وجود ندارد",
            totalLikes: 0,
            totalDislikes: 0,
            totalViews,
            totalArticles: newsData.length,
          }}
          mainData={mainData}
        />

        <div className="flex flex-col-reverse lg:flex-row gap-5 px-5">
          <SearchComponent
            searchLevel="news"
            params={resolvedParams}
            mainData={mainData}
          />
        </div>

        {/* 🔹 لیست اخبار */}
        <div className="px-5">
          <CategoryItemsGrid
            params={resolvedParams}
            category={category}
            articles={newsData}
            mainData={mainData}
          />
        </div>
      </section>
    );
  } catch (error) {
    console.error("❌ NewsCategoryPage Error:", error);
    return <CustomErrorPage />;
  }
}