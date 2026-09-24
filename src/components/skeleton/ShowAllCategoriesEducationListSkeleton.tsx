import EducationCategoryCardSkeleton from "@/components/skeleton/EducationCategoryCardSkeleton";

// معادل visibleCount اولیه (۹) توی ShowAllCategoriesEducationList
const INITIAL_COUNT = 9;

/**
 * بدون "use client" — چون فقط از Skeleton (CSS محض) استفاده می‌کنه، می‌تونه
 * Server Component خالص باشه؛ صفر جاوااسکریپت اضافه برای fallback.
 */
export default function ShowAllCategoriesEducationListSkeleton() {
  return (
    <section className="p-2">
      <div className="mt-12 gap-[64px] grid md:grid-cols-2 xl:grid-cols-3 w-full">
        {Array.from({ length: INITIAL_COUNT }).map((_, i) => (
          <EducationCategoryCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
