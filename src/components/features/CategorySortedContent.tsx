import CategorySorted from "@/components/features/ArticleCategorySorted";
import { supabase } from "@/utils/lib/supabaseClient";

interface CategorySortedContentProps {
  categorySlug: string;
  category: string;
  params: any;
  mainData: any;
}

/**
 * ⚠️ این کامپوننت عمداً یه کوئری جدا و مستقل از همون articles می‌زنه
 * (همون فیلتر categorySlug که بالای page.tsx هم هست) — یعنی یه درخواست
 * اضافه به Supabase نسبت به قبل. علتش اینه که CategoryHeader (چون
 * تصویرش LCP هست) باید فچ خودش رو بلاک‌کننده و سینک نگه داره، و چون
 * هر دو از یه دیتای از قبل resolve‌شده استفاده می‌کردن، هیچ Suspense ای
 * روی CategorySorted واقعاً کار نمی‌کرد (fallback هیچ‌وقت دیده نمی‌شد).
 * با این فچ مستقل، الان واقعاً یه gap async داریم که اسکلت روش معنا داره.
 *
 * اگه این هزینه‌ی یه کوئری اضافه رو نمی‌خوای، جایگزینش اینه که
 * categoryArticles رو مستقیم (بدون Suspense) به CategorySorted پاس بدی،
 * دقیقاً مثل قبل — که در اون صورت اسکلت لازم نیست.
 */
export default async function CategorySortedContent({
  categorySlug,
  category,
  params,
  mainData,
}: CategorySortedContentProps) {
  const { data: articlesData, error } = await supabase
    .from("articles")
    .select("*")
    .eq("categorySlug", categorySlug)
    .order("date", { ascending: false });

  if (error) console.error("Supabase fetch error (CategorySortedContent):", error);

  const categoryArticles = articlesData || [];

  return (
    <CategorySorted
      params={params}
      category={category}
      articles={categoryArticles}
      mainData={mainData}
    />
  );
}
