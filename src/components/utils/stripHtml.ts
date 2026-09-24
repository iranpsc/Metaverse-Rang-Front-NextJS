/**
 * حذف تگ‌های HTML و تبدیل entityهای رایج به متن ساده.
 *
 * چرا این فایل هست؟
 * نسخه‌ی قبلی (document.createElement("div").innerHTML = ...) روی سرور
 * وجود نداره (document تعریف نشده)، پس کارت‌ها موقع SSR خطا می‌دادن و
 * React مجبور می‌شد کل بخش رو دوباره سمت کلاینت رندر کنه.
 * این نسخه یک تابع خالصه و روی سرور و کلاینت خروجی یکسان می‌ده
 * (بدون hydration mismatch).
 */
export function stripHtml(html?: string | null): string {
  if (!html) return "";

  return String(html)
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "\x27")
    .replace(/&amp;/g, "&");
}
