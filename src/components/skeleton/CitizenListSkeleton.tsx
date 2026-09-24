import { UserCardSkeleton } from "@/components/skeleton/UserCardSkeleton";

// تعداد کارت اسکلت برای صفحه‌ی اول لیست شهروندان — با تعداد معمول آیتم‌های
// یک صفحه (getAllCitizen("1")) تنظیم کن؛ فعلاً یه عدد معقول (۸) گذاشتیم.
const SKELETON_COUNT = 8;

/**
 * این فایل "use client" نداره — چون فقط از Skeleton (که خودش CSS محضه)
 * استفاده می‌کنه، می‌تونه یه Server Component خالص باشه و به‌عنوان fallback
 * سریع‌ترین حالت ممکن رو داشته باشه (صفر JS اضافه برای کلاینت).
 * توجه: چون خودِ ظرف flex-wrap توی page.tsx (والد <Suspense>) از قبل
 * تعریف شده، اینجا فقط کارت‌ها رو برمی‌گردونیم، بدون wrapper اضافه.
 */
export default function CitizenListSkeleton() {
  return (
    <>
      {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
        <UserCardSkeleton key={i} minWidth="280px" />
      ))}
    </>
  );
}
