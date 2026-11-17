import JsonLdScript from "@/schemas/json-ld/JsonLdScript";
import EducationList from "@/components/list/EducationList";
import { getAllCategoryVideos } from "@/components/utils/actions";

interface EducationListContentProps {
  lang: string;
  mainData: any;
  params: any;
}

/**
 * ⚠️ نکته مهم درباره‌ی بهینه‌سازی: قبلاً allCatVideos (از getAllCategoryVideos)
 * فقط برای ساخت schema استفاده می‌شد، و EducationList (کلاینت) خودش با
 * useEffect دوباره صفحه‌ی ۱ ویدیوها رو از /api/tutorials?page=1 فچ می‌کرد —
 * یه round-trip اضافه‌ی کامل بعد از هیدریت، فقط برای دیتایی که سرور به‌
 * احتمال زیاد از قبل داشت.
 *
 * الان همون allCatVideos به‌عنوان initialVideos به EducationList پاس داده
 * می‌شه تا دیگه نیازی به فچ اولیه‌ی کلاینتی نباشه (فقط "مشاهده بیشتر"
 * صفحه‌ی بعد رو فچ می‌کنه). *باید* مطمئن بشی getAllCategoryVideos("1")
 * واقعاً همون شکل داده‌ای هست که /api/tutorials?page=1 برمی‌گردونه —
 * اگه "1" اینجا id دسته‌بندی باشه نه شماره صفحه، ممکنه این دو دیتای
 * متفاوتی باشن. اگه این‌طور بود، initialVideos رو پاس نده (undefined
 * بذار) تا EducationList به رفتار فچ خودش برگرده؛ چیز دیگه‌ای خراب نمی‌شه.
 */
export default async function EducationListContent({
  lang,
  mainData,
  params,
}: EducationListContentProps) {
  const allCatVideos = await getAllCategoryVideos("1");

  const videoPageItems = (Array.isArray(allCatVideos) ? allCatVideos : [])
    .filter((video: any) => Boolean(video?.title))
    .map((video: any, index: number) => ({
      "@type": "ListItem", position: index + 1,
      item: { "@type": "WebPage", name: video.title },
    }));

  return (
    <>
      {videoPageItems.length > 0 ? <JsonLdScript schemaId="item-list" values={{
        name: lang === "fa" ? "فهرست ویدئوهای آموزشی" : "Educational video list",
        canonicalUrl: `https://metarang.com/${lang}/education`, numberOfItems: videoPageItems.length, items: videoPageItems,
      }} /> : null}
      <EducationList
        mainData={mainData}
        params={params}
        initialVideos={allCatVideos}
      />
    </>
  );
}
