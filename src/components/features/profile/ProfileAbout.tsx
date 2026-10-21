"use client";
import ModalCard from "@/components/modal/ModalCard";
import Image from "next/image";
import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import { useState, useRef } from "react";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

/* ------------------------------------------------------------------ */
/*                        SAFE HTML (SSR-friendly)                      */
/* ------------------------------------------------------------------ */
/* به‌جای حذف همهٔ تگ‌ها، فقط تگ‌های «نگارشی» نگه داشته می‌شوند
   (bold, italic, underline, br, p, لیست، تیتر، لینک و ...) و بقیه
   (script, style, iframe, onclick=..., style=... و هر attribute دیگر)
   حذف می‌شود. این کد به DOM نیاز ندارد، پس روی سرور هم کار می‌کند.

   خروجی: { html, truncated }
   - maxChars: برش بر اساس «تعداد حروف متن» (نه طول HTML)؛ تگ‌های باز
     هم خودکار بسته می‌شوند تا ساختار خراب نشود. */

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

function sanitizeHtml(
  input: unknown,
  maxChars: number = Infinity
): { html: string; truncated: boolean } {
  if (!input) return { html: "", truncated: false };

  let src = String(input).replace(DROP_WITH_CONTENT, "");

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

/* استایل محتوای HTML (Tailwind preflight استایل لیست/تیتر را برمی‌دارد) */
const RICH_TEXT_CLASSES =
  "[&_b]:font-bold [&_strong]:font-bold [&_i]:italic [&_em]:italic [&_u]:underline " +
  "[&_s]:line-through [&_del]:line-through " +
  "[&_p]:min-h-[1em] [&_p]:mb-2 [&_div]:min-h-[1em] " +
  "[&_ul]:list-disc [&_ol]:list-decimal [&_ul]:ps-6 [&_ol]:ps-6 [&_li]:mb-1 " +
  "[&_:is(h1,h2,h3,h4,h5,h6)]:font-bold [&_:is(h1,h2,h3,h4,h5,h6)]:mb-2 " +
  "[&_blockquote]:border-s-4 [&_blockquote]:ps-3 [&_blockquote]:opacity-80 " +
  "[&_a]:text-primary [&_a]:underline break-words";

const PREVIEW_CHARS = 275;

export default function ProfileAbout({
  titleData,
  mainData,
  profileData,
  params,
}: any) {
  const userId = params.id;
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [dataModal, setDataModal] = useState({});

  const [inView] = useState(true);
  const iframeContainerRef2 = useRef<HTMLDivElement | null>(null);

  const aboutRaw = profileData.data?.customs?.about;
  const preview = aboutRaw ? sanitizeHtml(aboutRaw, PREVIEW_CHARS) : null;

  const submitModalCart = (item: any) => {
    setDataModal({
      title: findByUniqueId(mainData, 95),
      // HTML تمیزشده (bold / اینتر / لیست حفظ می‌شود)
      data: sanitizeHtml(item).html,
      isHtml: true,
    });
    setShowModal(true);
  };

  const submitCart = (dataItem: any) => {
    if (dataItem) {
      submitModalCart(dataItem);
    }
  };

  return (
    <section
      ref={iframeContainerRef2}
      className="flex flex-col justify-start gap-[10px] items-center h-screen"
    >
      {inView && (
        <>
          <div className="dark:bg-dark-background w-full h-[37vh] overflow-hidden shadow-md transition-all duration-300 ease-linear bg-white px-1 rounded-[10px]">
            <h1 className="dark:text-white font-azarMehr font-medium text-matn-2 mx-2 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle md:text-mdTitle sm:text-smDesc xs:text-smDesc py-5">
              {findByUniqueId(mainData, 95)}
            </h1>

            {preview && preview.html && (
              <>
                <div
                  className={`font-azarMehr text-justify 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle md:text-mdTitle xl:leading-[30px] sm:text-smDesc xs:text-smDesc lg:leading-[20px] md:leading-[35px] xs:leading-[30px] sm:leading-[30px] mx-1 font-medium text-matn-2 ${RICH_TEXT_CLASSES}`}
                  dangerouslySetInnerHTML={{ __html: preview.html }}
                />

                {preview.truncated && (
                  <div className="mx-1 mt-1">
                    <span className="font-azarMehr font-medium xl:text-[12px] text-matn-2">
                      ...
                    </span>
                    <span
                      className="mx-2 text-primary font-azarMehr font-medium cursor-pointer 3xl:text-xl3Desc xl:text-xlDesc lg:text-lgTitle md:text-mdTitle sm:text-smTitle xs:text-smTitle"
                      onClick={() => submitCart(aboutRaw)}
                    >
                      {findByUniqueId(mainData, 195)}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="dark:bg-dark-background h-[60vh] overflow-hidden shadow-md bg-white transition-all duration-300 ease-linear items-center flex flex-col justify-center w-full rounded-[10px] p-2 md:p-0">
            {userId && userId === "hm-2000003" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  ease: "backInOut",
                }}
              >
                <Image
                  src="/profile/alizadeh.png"
                  width={400}
                  height={500}
                  alt={titleData}
                  className="3xl:w-[180px] xl:w-[145px] lg:w-[120px] md:w-[170px] sm:w-[140px] xs:w-[130px] "
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  ease: "backInOut",
                }}
              >
                <Image
                  src="/profile/position.png"
                  width={1000}
                  height={1000}
                  alt={titleData}
                  className="3xl:w-[175px] xl:w-[145px] lg:w-[120px] md:w-[170px] sm:w-[140px] xs:w-[130px]"
                />
              </motion.div>
            )}
          </div>

          <AnimatePresence>
            {showModal && (
              <ModalCard
                dataModal={dataModal}
                setShowModal={setShowModal}
                profileData={profileData}
                mainData={mainData}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </section>
  );
}