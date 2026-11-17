/**
 * Sanitizes API-provided rich text using a strict allowlist.
 * Keeps basic formatting while dropping unsafe elements and attributes.
 * This function is SSR-safe and does not depend on browser DOM APIs.
 */
const ALLOWED_TAGS = new Set([
  "b", "strong", "i", "em", "u", "s", "strike", "del", "sub", "sup",
  "br", "p", "div", "span", "blockquote",
  "ul", "ol", "li",
  "h1", "h2", "h3", "h4", "h5", "h6",
  "a",
]);

const DROP_WITH_CONTENT =
  /<(script|style|iframe|object|embed|noscript|template)\b[\s\S]*?<\/\1\s*>/gi;
const TOKEN = /<!--[\s\S]*?-->|<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g;
const SAFE_HREF = /^(https?:|mailto:|tel:)/i;

const escapeText = (t: string) => t.replace(/</g, "&lt;").replace(/>/g, "&gt;");

const getHref = (tag: string): string | null => {
  const m = tag.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
  const href = (m?.[1] ?? m?.[2] ?? m?.[3] ?? "").trim();
  return SAFE_HREF.test(href) ? href.replace(/"/g, "&quot;") : null;
};

export function sanitizeHtml(
  input: unknown,
  maxChars: number = Infinity
): { html: string; truncated: boolean } {
  if (!input) return { html: "", truncated: false };

  let src = String(input);
  let prev: string;
  do {
    prev = src;
    src = src.replace(DROP_WITH_CONTENT, "");
  } while (src !== prev);

  // متن ساده (بدون هیچ تگ): خط جدید → <br> تا اینتر حفظ شود
  if (!/<[a-zA-Z!/]/.test(src)) {
    src = escapeText(src.replace(/\r\n?/g, "\n")).replace(/\n/g, "<br>");
  }

  let out = "";
  let count = 0;
  let truncated = false;
  const stack: string[] = [];

  /* برمی‌گرداند false یعنی به سقف رسیدیم */
  const appendText = (raw: string): boolean => {
    const text = raw.replace(/\s+/g, " "); // مثل مرورگر، فاصله‌های پشت‌هم یکی می‌شوند
    if (!text.trim() && count >= maxChars) return true;

    const parts = text.split(/(&[a-zA-Z0-9#]+;)/);
    for (const part of parts) {
      if (!part) continue;

      if (/^&[a-zA-Z0-9#]+;$/.test(part)) {
        if (count >= maxChars) return false;
        out += part; // مثل &nbsp; (یک کاراکتر حساب می‌شود)
        count += 1;
      } else {
        const remaining = maxChars - count;
        if (part.length > remaining) {
          out += escapeText(part.slice(0, Math.max(remaining, 0)));
          count = maxChars;
          return false;
        }
        out += escapeText(part);
        count += part.length;
      }
    }
    return true;
  };

  const re = new RegExp(TOKEN.source, "g");
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(src))) {
    if (m.index > last && !appendText(src.slice(last, m.index))) {
      truncated = true;
      last = src.length;
      break;
    }
    last = re.lastIndex;

    const whole = m[0];
    const name = m[1]?.toLowerCase();
    if (!name || !ALLOWED_TAGS.has(name)) continue; // کامنت یا تگ غیرمجاز

    if (whole.startsWith("</")) {
      const idx = stack.lastIndexOf(name);
      if (idx === -1) continue; // تگ بستهٔ اضافی
      while (stack.length > idx) out += `</${stack.pop()}>`;
    } else if (name === "br") {
      out += "<br>";
    } else {
      if (name === "a") {
        const href = getHref(whole);
        out += href
          ? `<a href="${href}" target="_blank" rel="noopener noreferrer nofollow">`
          : "<a>";
      } else {
        out += `<${name}>`;
      }
      if (whole.endsWith("/>")) out += `</${name}>`;
      else stack.push(name);
    }
  }

  if (!truncated && last < src.length && !appendText(src.slice(last))) {
    truncated = true;
  }

  while (stack.length) out += `</${stack.pop()}>`;

  return { html: out, truncated };
}
