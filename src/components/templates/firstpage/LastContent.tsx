import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { getHomeArticles } from "./homeData";
import LastContentClient from "./LastContentClient";

interface LastContentProps {
  params: { lang: string };
  mainData?: any;
}

/**
 * Server Component: داده‌ی مقاله‌ها روی سرور (کش‌شده) گرفته می‌شود.
 * قبلاً این بخش کاملاً کلاینتی بود (ssr:false + supabase.select("*") در مرورگر
 * که ~۴۷۸KB داده‌ی content هم می‌آورد و دو بار هم صدا زده می‌شد).
 *
 * به کلاینت فقط ۳ مقاله‌ی سبک + دو رشته‌ی متنی می‌رسد، نه کل mainData.
 */
export default async function LastContent({
  params,
  mainData,
}: LastContentProps) {
  const articles = await getHomeArticles(3);

  if (articles.length === 0) {
    return (
      <div className="py-6 text-center matn-2-500">
        هیچ مقاله‌ای برای نمایش موجود نیست.
      </div>
    );
  }

  return (
    <LastContentClient
      articles={articles}
      params={params}
      title={findByUniqueId(mainData, 497)}
      moreLabel={findByUniqueId(mainData, 171)}
    />
  );
}
