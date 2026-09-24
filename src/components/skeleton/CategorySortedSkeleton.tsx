import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { VideoCardSkeleton as ArticleCardSkeleton } from "@/components/skeleton/VideoCardSkeleton";

// معادل visibleCount اولیه (۹) توی CategoryClient
const INITIAL_COUNT = 9;

/**
 * اسکلت CategoryClient (گرید مقالات یک دسته‌بندی).
 * دکمه‌های فیلتر ساب‌کتگوری رو نمی‌تونیم دقیق بسازیم چون تعدادشون از
 * خود articles استخراج می‌شه (که هنوز نداریم) — برای اسکلت، ۳ تا دکمه‌ی
 * عمومی گذاشتم که فقط شکل رو حفظ کنه.
 */
function CategorySortedSkeletonBase() {
  return (
    <section className="w-full pb-5 lg:py-10 px-6">
      {/* دکمه‌های فیلتر ساب‌کتگوری */}
      <div className="flex flex-wrap gap-3 lg:gap-4 mb-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-[42px] w-20 rounded-lg" />
        ))}
      </div>

      {/* عنوان */}
      <Skeleton className="h-6 md:h-7 w-48 mt-14 mb-9 rounded-md" />

      {/* گرید مقالات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-10">
        {Array.from({ length: INITIAL_COUNT }).map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

export default memo(CategorySortedSkeletonBase);
