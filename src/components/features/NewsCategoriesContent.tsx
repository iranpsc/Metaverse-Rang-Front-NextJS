import JsonLdScript from "@/schemas/json-ld/JsonLdScript";
import SearchComponent from "@/components/Search/SearchComponent";
import CategoriesList from "@/components/features/CategoriesList";
import { supabase } from "@/utils/lib/supabaseClient";
import fallbackNewsData from "@/components/utils/news.json";

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

async function fetchNewsWithFallback() {
  try {
    const { data: supabaseNews, error } = await supabase
      .from("news")
      .select("*")
      .order("date", { ascending: false });

    if (error || !supabaseNews || supabaseNews.length === 0) {
      if (error) {
        console.warn("⚠️ [Categories] Supabase error, using fallback news.json:", error.message);
      } else {
        console.warn("⚠️ [Categories] No data from Supabase, using fallback news.json");
      }
      const fallbackData = fallbackNewsData.map((item: any) => normalizeNewsItem(item));
      return { data: fallbackData, fromFallback: true };
    }

    const normalizedData = supabaseNews.map((item: any) => normalizeNewsItem(item));
    return { data: normalizedData, fromFallback: false };
  } catch (err) {
    console.error("❌ [Categories] Unexpected error fetching news, using fallback:", err);
    const fallbackData = fallbackNewsData.map((item: any) => normalizeNewsItem(item));
    return { data: fallbackData, fromFallback: true };
  }
}

interface NewsCategoriesContentProps {
  lang: string;
  mainData: any;
  params: any;
}

/**
 * فچ اخبار (که قبلاً بالای page.tsx بود و کل صفحه رو بلاک می‌کرد) الان
 * زیر <Suspense> رندر می‌شه. SearchComponent هم اینجاست چون به همون
 * news وابسته‌ست (articles={news}).
 */
export default async function NewsCategoriesContent({
  lang,
  mainData,
  params,
}: NewsCategoriesContentProps) {
  const { data: newsData, fromFallback } = await fetchNewsWithFallback();

  if (!newsData || newsData.length === 0) {
    console.error("❌ [Categories] No news data available from both Supabase and fallback");
    return (
      <div className="text-center py-20">
        <p className="text-xl dark:text-white">هیچ دسته‌بندی یافت نشد</p>
      </div>
    );
  }

  if (fromFallback) {
    console.log("ℹ️ [Categories] News data is currently being served from fallback JSON file");
  }

  const news = newsData;

  const categories = [...new Set(news.map((n: NormalizedNews) => n.category).filter(Boolean))];

  const categoryImages: Record<string, string> = {};
  const categorySlugs: Record<string, string> = {};
  const subcategoryCounts: Record<string, number> = {};

  news.forEach((n: NormalizedNews) => {
    if (n.category) {
      if (n.categoryImage && !categoryImages[n.category]) {
        categoryImages[n.category] = n.categoryImage;
      }
      categorySlugs[n.category] = n.categorySlug ? n.categorySlug : encodeURIComponent(n.category);
    }
  });

  news.forEach((n: NormalizedNews) => {
    if (n.category && n.subCategory) {
      subcategoryCounts[n.category] = (subcategoryCounts[n.category] || 0) + 1;
    }
  });

  const baseUrl = "https://metarang.com";
  const langPrefix = lang ? `/${lang}` : "";
  const fullPageUrl = `${baseUrl}${langPrefix}/news/categories`;

  const categoryItems = categories
    .filter((category) => Boolean(category && categorySlugs[category as string]))
    .map((category, index) => ({
      "@type": "ListItem", position: index + 1,
      item: { "@type": "CollectionPage", name: category,
        url: `${baseUrl}${langPrefix}/news/categories/${categorySlugs[category as string]}` },
    }));

  return (
    <>
      <JsonLdScript schemaId="breadcrumb" values={{ items: [
        { "@type": "ListItem", position: 1, name: lang === "fa" ? "صفحه اصلی" : "Home", item: `${baseUrl}${langPrefix}` },
        { "@type": "ListItem", position: 2, name: lang === "fa" ? "اخبار" : "News", item: `${baseUrl}${langPrefix}/news` },
        { "@type": "ListItem", position: 3, name: lang === "fa" ? "دسته‌بندی اخبار" : "News categories", item: fullPageUrl },
      ] }} />
      {categoryItems.length > 0 ? <JsonLdScript schemaId="item-list" values={{
        name: lang === "fa" ? "دسته‌بندی‌های اخبار" : "News categories", canonicalUrl: fullPageUrl,
        numberOfItems: categoryItems.length, items: categoryItems,
      }} /> : null}

      <div className="my-8">
        <SearchComponent searchLevel="news" articles={news} params={params} mainData={mainData} />
      </div>

      <CategoriesList
        categories={categories as any}
        categoryImages={categoryImages}
        categorySlugs={categorySlugs}
        subcategoryCounts={subcategoryCounts}
        params={params}
        mainData={mainData}
      />
    </>
  );
}
