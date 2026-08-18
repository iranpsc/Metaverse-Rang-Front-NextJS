// این کامپوننت "use client" نداره — چون Skeleton فقط CSS/شیمره و هیچ
// hook یا state ای لازم نداره، Server Component خالصه: صفر بایت JS
// اضافه به کلاینت وقتی به‌عنوان fallback یه Suspense استفاده بشه.
// import { Skeleton } from "@/components/ui/skeleton";
import { UserCardSkeleton } from "@/components/skeleton/UserCardSkeleton";

// دقیقاً به تعداد codes توی getTopWritersUsers (۲ کاربر)
const WRITERS_COUNT = 2;

export default function TopWritersSkeleton() {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 pb-10 lg:px-7 items-center">
      {Array.from({ length: WRITERS_COUNT }).map((_, i) => (
        <div key={i} style={{ minWidth: "280px" }}>
          <UserCardSkeleton minWidth="280px" />
        </div>
      ))}
    </div>
  );
}
