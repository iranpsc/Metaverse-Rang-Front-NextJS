
/**
 * حذف تگ‌های HTML و تبدیل Entityهای رایج به متن ساده.
 *
 * این تابع مستقل از DOM است و در SSR و Client اجرا می‌شود؛
 * بنابراین به document وابسته نیست و باعث hydration mismatch نمی‌شود.
 *
 * نکته: خروجی برای نمایش متن ساده است، نه استفاده در HTML خام.
 */

const HTML_TAG_PATTERN = /<\/?[a-zA-Z][^>]*>/g;

export function stripHtml(html?: string | null): string {
  if (!html) return "";

  let result = String(html);

  // Entityها را به ترتیب امن decode می‌کنیم.
  // &amp; باید آخر تبدیل شود تا Entityهای تو در تو دوباره decode نشوند.
  result = result
    .replace(/&nbsp;/gi, " ")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&amp;/gi, "&");

  // حذف تگ‌ها به‌صورت تکراری برای پوشش ورودی‌های تو در تو.
  let previous: string;

  do {
    previous = result;
    result = result.replace(HTML_TAG_PATTERN, "");
  } while (result !== previous);

  return result.trim();
}
