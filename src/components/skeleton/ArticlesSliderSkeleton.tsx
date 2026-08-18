import { VideoCardSkeleton as ArticleCardSkeleton } from "@/components/skeleton/VideoCardSkeleton";

/**
 * اسکلت بدنه‌ی اسلایدرهای مقاله (بدون هدر — چون هدر به mainData وابسته‌ست
 * نه به فچ دیتا، پس خود کامپوننت اصلی هدر واقعیش رو نگه می‌داره و فقط
 * این بخش رو جایگزین می‌کنه).
 *
 * چون Swiper واقعی با ssr:false ایمپورت می‌شه و اصلاً روی سرور رندر
 * نمی‌شه، این اسکلت یه ردیف افقی ساده (flex + overflow-hidden) هست،
 * نه یه Swiper واقعی — سبک‌تره و نیازی به لود کتابخونه‌ی swiper نداره.
 *
 * قابل‌استفاده برای هر دو اسلایدر مشابه (Popular/Latest) چون ساختارشون
 * یکیه.
 */
export default function ArticlesSliderSkeleton() {
  return (
    <>
      {/* ردیف کارت‌ها — عرض هر کارت تقریباً معادل breakpoint های Swiper واقعی */}
      <div className="flex flex-nowrap gap-5 overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex-shrink-0 w-[85%] sm:w-1/2 lg:w-[28%]">
            <ArticleCardSkeleton />
          </div>
        ))}
      </div>

      {/* کنترل‌ها (فلش‌ها + دات‌ها) */}
      <div className="mt-4 w-full flex items-center justify-center md:justify-start gap-2">
        <div className="w-5 h-5 rounded-full bg-transparent" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="w-5 h-1 rounded-sm bg-dark-gray dark:bg-dark-placeholder opacity-40"
            />
          ))}
        </div>
        <div className="w-5 h-5 rounded-full bg-transparent" />
      </div>
    </>
  );
}
