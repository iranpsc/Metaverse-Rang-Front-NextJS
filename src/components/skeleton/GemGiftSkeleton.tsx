import { DetailItemSkeleton } from "./DetailItemSkeleton";
import { AccordionSkeleton } from "./AccordionSkeleton";

/**
 * اسکلت دقیق Gem — مطابق کد واقعی:
 * ۱ Accordion (توضیحات) + ۱۰ DetailItem
 * (thread, color, volume, png_file, subcategories, fbx_file, lines,
 * encryption, has_animation, designer)
 */
export function GemSkeleton() {
  return (
    <div className="w-full flex flex-col-reverse sm:flex-row flex-wrap">
      <div className="w-full flex flex-wrap justify-between">
        <AccordionSkeleton />
        {Array.from({ length: 10 }).map((_, i) => (
          <DetailItemSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

/**
 * اسکلت دقیق Gift — مطابق کد واقعی:
 * ۲ Accordion (توضیحات + ویژگی‌های هدیه موبایل) + ۱۳ DetailItem
 * (monthly_capacity_count, sell_capacity, three_d_model_volume, sell,
 * three_d_model_points, rent, three_d_model_lines, seller_link,
 * has_animation, designer, store_capacity, png_file, fbx_file)
 */
export function GiftSkeleton() {
  return (
    <div className="w-full flex flex-col-reverse sm:flex-row flex-nowrap">
      <div className="w-full flex flex-wrap justify-between">
        <AccordionSkeleton />
        <AccordionSkeleton />
        {Array.from({ length: 13 }).map((_, i) => (
          <DetailItemSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
