import { Skeleton } from "@/components/ui/skeleton";
import EducationCategoryCardSkeleton from "@/components/skeleton/EducationCategoryCardSkeleton";

// معادل visibleCount اولیه (۹) توی ListSubCategories
const INITIAL_COUNT = 9;

/**
 * ⚠️ ساختار دقیق DashboardHeaderModule رو نداشتم — یه بلوک متنی تقریبی
 * (چند خط + یه دکمه) براش گذاشتم. اگه کدش رو بفرستی دقیقش می‌کنم.
 */
function DashboardHeaderModuleSkeleton() {
  return (
    <div className="w-full flex flex-col gap-3 justify-center">
      <Skeleton tone="standalone" className="h-6 w-3/4 rounded-md" />
      <Skeleton tone="standalone" className="h-4 w-full rounded-md" />
      <Skeleton tone="standalone" className="h-4 w-full rounded-md" />
      <Skeleton tone="standalone" className="h-4 w-2/3 rounded-md" />
      <Skeleton tone="standalone" className="h-10 w-32 rounded-[12px] mt-2" />
    </div>
  );
}

export default function EducationCategorySkeleton() {
  return (
    <section className="w-full h-fit flex flex-col justify-start items-center relative mt-10">
      <section className="w-full h-fit flex flex-col justify-center items-center">
        {/* تصویر + هدر داشبورد */}
        <div className="relative w-full px-4 gap-5 lg:gap-10 flex flex-col lg:flex-row">
          <div className="w-full md:w-1/2 lg:w-[35%] 3xl:w-[30%] h-max">
            <Skeleton tone="standalone" className="w-full h-[365px] 3xl:h-[400px] rounded-xl" />
          </div>
          <DashboardHeaderModuleSkeleton />
        </div>

        {/* عنوان و سرچ */}
        <div className="w-full h-fit pt-5 flex flex-col justify-center items-center gap-[24px]">
          <div className="flex flex-col-reverse lg:gap-5 lg:flex-row lg:justify-between items-center w-full px-5 lg:px-0">
            <Skeleton tone="standalone" className="md:w-1/2 lg:ms-5 mt-5 h-7 w-1/2 rounded-md" />
            <Skeleton tone="standalone" className="h-10 w-full lg:w-64 rounded-[12px]" />
          </div>

          {/* گرید زیردسته‌ها */}
          <div className="w-full flex flex-col justify-center items-center px-4 3xl:pe-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[64px] w-full h-fit">
              {Array.from({ length: INITIAL_COUNT }).map((_, i) => (
                <EducationCategoryCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
