import CategoryItemsGrid from "@/components/features/CategoryItemsGrid";
import { supabase } from "@/utils/lib/supabaseClient";
import fallbackNewsData from "@/components/utils/news.json";

interface NewsCategoryContentProps {
  categorySlug: string;
  category: string;
  params: any;
  mainData: any;
}

type NormalizedNews = {
  id: number;
  title: string;
  slug: string;
  image?: string | null;
  date?: string | null;
  readingTime?: string | null;
  stats?: any;
  category: string;
  categorySlug: string;
  categoryImage?: string | null;
  categoryDec?: string | null;
  subCategory: string;
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
    category: item.category || "",
    categorySlug: item.categorySlug || "",
    categoryImage: item.categoryImage || null,
    categoryDec: item.categoryDec || null,
    subCategory: item.subCategory || "",
    content: item.content || null,
    description: item.description || null,
    author: item.author || null,
    tags: item.tags || null,
    video: item.video || null,
  };
}

/**
 * این کامپوننت عمداً یک Query مستقل از صفحه اصلی می‌زند.
 *
 * دلیل:
 * - CategoryHeader در page.tsx فچ بلاک‌کننده خودش را دارد.
 * - این کامپوننت باید یک async boundary واقعی برای Suspense ایجاد کند.
 * - در نتیجه CategorySortedSkeleton قبل از آماده شدن لیست اخبار
 *   می‌تواند واقعاً نمایش داده شود.
 *
 * اگر newsData را مستقیماً از page.tsx به این کامپوننت پاس بدهیم،
 * Suspense عملاً فایده‌ای برای این بخش نخواهد داشت.
 *
 * در صورت خطا یا خالی بودن نتیجه Supabase، همان fallback قبلی
 * یعنی news.json استفاده می‌شود.
 */
async function fetchNewsByCategoryWithFallback(
  categorySlug: string
): Promise<NormalizedNews[]> {
  try {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("categorySlug", categorySlug)
      .order("date", { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map((item: any) => normalizeNewsItem(item));
    }

    if (error) {
      console.warn(
        `⚠️ [NewsCategoryContent:${categorySlug}] Supabase error, using fallback news.json:`,
        error.message
      );
    } else {
      console.warn(
        `⚠️ [NewsCategoryContent:${categorySlug}] No data from Supabase, using fallback news.json`
      );
    }

    return fallbackNewsData
      .map((item: any) => normalizeNewsItem(item))
      .filter(
        (item: NormalizedNews) => item.categorySlug === categorySlug
      );
  } catch (error) {
    console.error(
      `❌ [NewsCategoryContent:${categorySlug}] Unexpected error, using fallback news.json:`,
      error
    );

    return fallbackNewsData
      .map((item: any) => normalizeNewsItem(item))
      .filter(
        (item: NormalizedNews) => item.categorySlug === categorySlug
      );
  }
}

export default async function NewsCategoryContent({
  categorySlug,
  category,
  params,
  mainData,
}: NewsCategoryContentProps) {
  const newsData = await fetchNewsByCategoryWithFallback(categorySlug);

  return (
    <CategoryItemsGrid
      params={params}
      category={category}
      articles={newsData as any}
      mainData={mainData}
    />
  );
}