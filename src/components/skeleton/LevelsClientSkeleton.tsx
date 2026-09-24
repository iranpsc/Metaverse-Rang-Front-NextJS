import LevelCardSkeleton from "@/components/skeleton/LevelCardSkeleton";

// دقیقاً به تعداد staticData توی page.tsx (۱۳ سطح ثابت)
const LEVELS_COUNT = 13;

/**
 * چون این فایل هیچ hook/state ای نداره، نیازی به "use client" نداره —
 * می‌تونه یه Server Component خالص باشه (صفر جاوااسکریپت اضافه به
 * کلاینت، بهترین حالت برای LCP اگه به‌عنوان fallback یه Suspense
 * استفاده بشه).
 */
export default function LevelsClientSkeleton() {
  return (
    <div className="flex justify-center flex-wrap mt-[20px]">
      {Array.from({ length: LEVELS_COUNT }).map((_, i) => (
        <LevelCardSkeleton key={i} />
      ))}
    </div>
  );
}
