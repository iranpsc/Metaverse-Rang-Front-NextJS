import { DetailItemSkeleton } from "./DetailItemSkeleton";
import { AccordionSkeleton } from "./AccordionSkeleton";

// معادل دقیق GeneralInfo: Accordion + ۱۲ DetailItem معمولی + ۱ fullBox
export default function GeneralInfoSkeleton() {
  return (
    <div className="w-full flex flex-wrap justify-between">
      {/* Accordion (توضیحات) */}
      <AccordionSkeleton />

      {/* ۱۲ آیتم: امتیاز، حجم فایل، رتبه، پوینت‌ها، زیردسته‌ها، خطوط،
          تاریخ ساخت، انیمیشن، فونت فارسی، طراح، فونت انگلیسی، طراح مدل */}
      {Array.from({ length: 12 }).map((_, i) => (
        <DetailItemSkeleton key={i} />
      ))}

      {/* fullBox: رنگ‌های استفاده‌شده */}
      <DetailItemSkeleton fullBox />
    </div>
  );
}