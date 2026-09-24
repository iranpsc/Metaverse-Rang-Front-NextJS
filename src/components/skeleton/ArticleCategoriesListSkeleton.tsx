import { Skeleton } from "@/components/ui/skeleton";
import ArticleCategoryCardSkeleton from "@/components/skeleton/ArticleCategoryCardSkeleton";

// معادل visibleCount اولیه (۱۲) توی CategoriesGridClient
const INITIAL_COUNT = 8;

/**
 * چون SearchComponent به articles (که از همین فچ میاد) وابسته‌ست، جای
 * سرچ هم اینجا اسکلت می‌شه. ساختار دقیق SearchComponent رو نداشتم، یه
 * نوار جستجوی ساده تقریب زدم.
 */
export default function ArticleCategoriesListSkeleton() {
  return (
    <>
      <div className="my-8">
        <Skeleton tone="standalone" className="w-full h-12 md:h-14 rounded-[12px] max-w-2xl mx-auto" />
      </div>

      <div className="w-full mt-[70px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 3xl:gap-10 mt-10">
          {Array.from({ length: INITIAL_COUNT }).map((_, i) => (
            <ArticleCategoryCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </>
  );
}
