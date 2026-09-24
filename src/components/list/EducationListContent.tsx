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

  const educationVideoSchema = {
    "@context": "http://schema.org",
    "@type": "WebSite",
    mainEntity: allCatVideos.map((video: any) => ({
      "@type": "VideoObject",
      name: video.title,
      thumbnailUrl: video.image_url,
      contentUrl: `https://metarang.com/${lang}/education/category/${video.sub_category.slug}`,
      uploadDate: "",
      publisher: {
        "@type": "Organization",
        name: video.creator.name || video.creator.code,
      },
      interactionStatistic: [
        {
          "@type": "InteractionCounter",
          interactionType: "http://schema.org/LikeAction",
          userInteractionCount: video.likes_count,
        },
        {
          "@type": "InteractionCounter",
          interactionType: "http://schema.org/DislikeAction",
          userInteractionCount: video.dislikes_count,
        },
        {
          "@type": "InteractionCounter",
          interactionType: "http://schema.org/WatchAction",
          userInteractionCount: video.views_count,
        },
      ],
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(educationVideoSchema) }}
      />
      <EducationList
        mainData={mainData}
        params={params}
        initialVideos={allCatVideos}
      />
    </>
  );
}
