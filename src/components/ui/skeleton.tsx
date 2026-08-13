import { HTMLAttributes } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * اگر تابع cn (clsx + tailwind-merge) از قبل توی پروژه دارید (مثلاً
 * lib/utils.ts طبق الگوی shadcn)، این تابع رو پاک کنید و به‌جاش
 * import { cn } from "@/lib/utils"; رو بذارید — دقیقاً همین کار رو می‌کنه.
 *
 * چرا twMerge لازمه: بدون اون، وقتی هم‌زمان یک کلاس از variant (مثلاً
 * h-12 برای circle) و هم یک کلاس سایز از className مصرف‌کننده (مثلاً
 * h-[33px]) پاس داده بشه، هر دو توی خروجی HTML می‌مونن و ترتیب نهایی‌شون
 * توی CSS تولیدشده‌ی Tailwind (نه ترتیب توی class="...") تعیین می‌کنه کدوم
 * برنده می‌شه — که غیرقابل پیش‌بینیه، برای همین مجبور بودید همه‌جا از
 * "!" استفاده کنید. twMerge کلاس‌های هم‌گروه (مثلاً همه‌ی کلاس‌های height)
 * رو تشخیص می‌ده و فقط آخرین‌شون رو نگه می‌داره، پس className که خودتون
 * پاس می‌دید همیشه درست override می‌کنه، بدون نیاز به !important.
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type SkeletonVariant = "line" | "title" | "circle" | "rect" | "button" | "badge";

/**
 * tone="surface" (پیش‌فرض): وقتی اسکلت داخل یک سطح با پس‌زمینه‌ی متفاوت از
 * پس‌زمینه‌ی صفحه قرار داره (مثل کارت‌های bg-white / bg-gray-1). اینجا
 * gray-3 خودش به‌تنهایی کنتراست کافی داره.
 *
 * tone="standalone": وقتی اسکلت مستقیم روی پس‌زمینه‌ی صفحه (--color-bg)
 * قرار می‌گیره، بدون هیچ کارت یا سطح رنگی دورش. توی این حالت gray-3 با
 * bg صفحه (مخصوصاً توی دارک‌مود که هر دو تقریباً مشکی‌ان) قاطی می‌شه و
 * اسکلت عملاً دیده نمی‌شه. برای همین این tone به‌جای gray-3 از --color-icon
 * (که توی سیستم دیزاین برای کنتراست خوب روی هر دو پس‌زمینه طراحی شده)
 * استفاده می‌کنه تا روشن‌تر و واضح‌تر بشه؛ بدون بوردر و بدون رنگ برند.
 */
type SkeletonTone = "surface" | "standalone";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  tone?: SkeletonTone;
  width?: string | number;
  height?: string | number;
}

const variantClasses: Record<SkeletonVariant, string> = {
  line: "h-3 w-full rounded-md",
  title: "h-5 w-1/2 rounded-md",
  circle: "h-12 w-12 rounded-full",
  rect: "h-40 w-full rounded-2xl",
  button: "h-9 w-24 rounded-lg",
  badge: "h-5 w-16 rounded-full",
};

const toneClasses: Record<SkeletonTone, string> = {
  surface: "bg-[rgb(var(--color-gray-3))]",
  standalone: "bg-[rgb(var(--color-gray-1))]",
};

export function Skeleton({
  variant = "line",
  tone = "surface",
  width,
  height,
  className,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="در حال بارگذاری"
      className={cn(
        "relative overflow-hidden",
        toneClasses[tone],
        // لایه شیمر روی pseudo-element
        "after:absolute after:inset-0 after:-translate-x-full after:animate-shimmer",
        "after:bg-gradient-to-r after:from-transparent",
        "after:via-[rgb(var(--color-gray-1)/55%)] after:to-transparent",
        "dark:after:via-[rgb(var(--color-text-3)/35%)]",
        // موشن ریدیوس رعایت‌شده
        "motion-reduce:after:animate-none",
        variantClasses[variant],
        className
      )}
      style={{ width, height, ...style }}
      {...props}
    />
  );
}

export default Skeleton;