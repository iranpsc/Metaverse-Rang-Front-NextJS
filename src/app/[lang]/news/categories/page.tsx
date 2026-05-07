// src/app/[lang]/news/categories/page.tsx

import BreadCrumb from "@/components/shared/BreadCrumb";
import CategoriesList from "./CategoriesList";
import SearchComponent from "@/components/shared/SearchComponent";
import { supabase } from "@/utils/lib/supabaseClient";
import { getTranslation, getMainFile } from "@/components/utils/actions";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import CustomErrorPage from "@/components/shared/CustomErrorPage";
import CleanAutoRetryParam from "@/components/shared/CleanAutoRetryParam";

// ایمپورت دیتای استاتیک به عنوان fallback
import fallbackNewsData from "@/components/utils/news.json";

interface NewsCategoriesPageProps {
  params: Promise<{ lang: string }>;
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
    subCategory: item.subCategory || null,
    content: item.content || null,
    description: item.description || null,
    author: item.author || null,
    tags: item.tags || null,
    video: item.video || null,
  };
}

// ─── تابع دریافت دیتا با fallback به news.json ───
async function fetchNewsWithFallback() {
  try {
    // تلاش برای دریافت از Supabase
    const { data: supabaseNews, error } = await supabase
      .from("news")
      .select("*")
      .order("date", { ascending: false });

    // اگر خطایی رخ داد یا دیتایی نیامد، از fallback استفاده کن
    if (error || !supabaseNews || supabaseNews.length === 0) {
      if (error) {
        console.warn("⚠️ [Categories] Supabase error, using fallback news.json:", error.message);
      } else if (!supabaseNews || supabaseNews.length === 0) {
        console.warn("⚠️ [Categories] No data from Supabase, using fallback news.json");
      }
      
      // تبدیل دیتای news.json به فرمت مناسب
      const fallbackData = fallbackNewsData.map((item: any) => normalizeNewsItem(item));
      
      return { data: fallbackData, fromFallback: true };
    }

    // نرمالایز کردن دیتای دریافتی از Supabase
    const normalizedData = supabaseNews.map((item: any) => normalizeNewsItem(item));
    
    return { data: normalizedData, fromFallback: false };
  } catch (err) {
    // در صورت بروز هرگونه خطای غیرمنتظره، از fallback استفاده کن
    console.error("❌ [Categories] Unexpected error fetching news, using fallback:", err);
    const fallbackData = fallbackNewsData.map((item: any) => normalizeNewsItem(item));
    
    return { data: fallbackData, fromFallback: true };
  }
}

export async function generateMetadata({ params }: NewsCategoriesPageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  try {
    const baseUrl = "https://metarang.com";
    const langPrefix = lang ? `/${lang}` : "";
    const fullPageUrl = `${baseUrl}${langPrefix}/news/categories`;

    const title = "دسته‌بندی اخبار متاورس رنگ";
    const description =
      "در بخش دسته‌بندی اخبار متاورس رنگ، جدیدترین اخبار فناوری، متاورس، بلاک‌چین و هوش مصنوعی را دنبال کنید.";

    return {
      title,
      description,
      alternates: { canonical: fullPageUrl },
      openGraph: {
        title,
        description,
        url: fullPageUrl,
        siteName: "MetaRang",
        images: "https://metarang.com/_next/image?url=%2Flogo.png&w=128&q=75",
        locale: lang === "fa" ? "fa_IR" : "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: "https://metarang.com/_next/image?url=%2Flogo.png&w=128&q=75",
      },
    };
  } catch (error) {
    return {
      title: "خطا",
      description: "مشکلی در بارگذاری صفحه رخ داده است",
    };
  }
}

export const revalidate = 0;

export default async function NewsCategoriesPage({ params }: NewsCategoriesPageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  try {
    const [langData] = await Promise.all([getTranslation(lang)]);
    const mainData = await getMainFile(langData);

    // ─── دریافت اخبار با قابلیت fallback ───
    const { data: newsData, fromFallback } = await fetchNewsWithFallback();

    // اگر هیچ دیتایی از هیچ منبعی نیامد
    if (!newsData || newsData.length === 0) {
      console.error("❌ [Categories] No news data available from both Supabase and fallback");
      return (
        <section className="w-full bg-[#f8f8f8] dark:bg-black px-5 3xl:px-10 min-h-screen">
          <div className="mb-6 mt-[60px] lg:mt-0">
            <BreadCrumb params={resolvedParams} />
          </div>
          <div className="text-center py-20">
            <p className="text-xl dark:text-white">هیچ دسته‌بندی یافت نشد</p>
          </div>
        </section>
      );
    }

    // هشدار در صورت استفاده از fallback (اختیاری)
    if (fromFallback) {
      console.log("ℹ️ [Categories] News data is currently being served from fallback JSON file");
    }

    const news = newsData;

    // ─── دسته‌بندی‌ها ───
    const categories = [...new Set(news.map((n: NormalizedNews) => n.category).filter(Boolean))];

    const categoryImages: Record<string, string> = {};
    const categorySlugs: Record<string, string> = {};
    const subcategoryCounts: Record<string, number> = {};
    
    news.forEach((n: NormalizedNews) => {
      if (n.category) {
        if (n.categoryImage && !categoryImages[n.category]) {
          categoryImages[n.category] = n.categoryImage;
        }

        categorySlugs[n.category] = n.categorySlug
          ? n.categorySlug
          : encodeURIComponent(n.category);
      }
    });

    news.forEach((n: NormalizedNews) => {
      if (n.category && n.subCategory) {
        subcategoryCounts[n.category] =
          (subcategoryCounts[n.category] || 0) + 1;
      }
    });

    const baseUrl = "https://metarang.com";
    const langPrefix = lang ? `/${lang}` : "";
    const fullPageUrl = `${baseUrl}${langPrefix}/news/categories`;

    // JSON-LD
    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "صفحه اصلی", "item": `${baseUrl}${langPrefix}` },
            { "@type": "ListItem", "position": 2, "name": "اخبار", "item": `${baseUrl}${langPrefix}/news` },
            { "@type": "ListItem", "position": 3, "name": "دسته‌بندی اخبار", "item": fullPageUrl },
          ],
        },
        {
          "@type": "CollectionPage",
          "@id": `${fullPageUrl}#webpage`,
          "url": fullPageUrl,
          "name": "دسته‌بندی اخبار متاورس رنگ",
          "isPartOf": { "@type": "WebSite", "name": "MetaRang", "url": baseUrl },
        },
        {
          "@type": "ItemList",
          "name": "دسته‌بندی‌های اخبار",
          "numberOfItems": categories.length,
          "itemListElement": categories.map((cat, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `${baseUrl}${langPrefix}/news/categories/${categorySlugs[cat as string]}`,
            "name": cat,
            "image": categoryImages[cat as string] || undefined,
          })),
        },
      ],
    };

    return (
      <section className="w-full bg-[#f8f8f8] dark:bg-black px-5 3xl:px-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <CleanAutoRetryParam />

        <div className="mb-6 mt-[60px] lg:mt-0">
          <BreadCrumb params={resolvedParams} />
        </div>

        <div className="text-center mt-5">
          <h1 className="font-rokh font-bold text-[30px] dark:text-white">
            {findByUniqueId(mainData, 1516) || "دسته‌بندی اخبار"}
          </h1>
          <p className="text-lightGray text-lg mt-2">
            {findByUniqueId(mainData, 1592)}
          </p>
        </div>

        <div className="my-8">
          <SearchComponent
            searchLevel="news"
            articles={news}
            params={resolvedParams}
            mainData={mainData}
          />
        </div>

        <CategoriesList
          categories={categories}
          categoryImages={categoryImages}
          categorySlugs={categorySlugs}
          subcategoryCounts={subcategoryCounts}
          params={resolvedParams}
          mainData={mainData}
        />
      </section>
    );
  } catch (error) {
    console.error("❌ [Categories] Error in NewsCategoriesPage:", error);
    return <CustomErrorPage />;
  }
}