export const dynamic = "force-dynamic";
import {
  getTranslation,
  getMainFile,
} from "@/components/utils/actions";
import Version from "@/components/templates/verion/version";
import BreadCrumb from "@/components/shared/BreadCrumb";
import { Metadata } from "next";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import CustomErrorPage from "@/components/error/CustomErrorPage";
import CleanAutoRetryParam from "@/components/system/CleanAutoRetryParam";

interface VersionItem {
  id: number;
  title: string;
  description: string;
  date: string;
  version: string;
  customName?: string;
  image?: string;
}

// [[...version]] -> params.version یا undefined هست (روت /version)
// یا آرایه یک‌عضوی هست (روت /version/xxx)
interface VersionPageProps {
  params: Promise<{
    version?: string[];
    lang: string;
  }>;
}

const DEFAULT_IMAGE = `https://metarang.com/_next/image?url=%2Flogo.png&w=120&q=75`;

function stripHtmlTags(html: string): string {
  return html.replace(/<|>/g, "").trim();
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

function getVersionSlug(params: { version?: string[] }): string | null {
  if (!params.version || params.version.length === 0) return null;

  const raw = params.version[0];
  // اگه سگمنت خالی باشه (مثلا به‌خاطر / اضافه ته آدرس)، معادل نبودن اسلاگه
  if (!raw) return null;

  try {
    const decoded = decodeURIComponent(raw);
    return decoded.trim() || null;
  } catch {
    return raw.trim() || null;
  }
}

/** مقایسه‌ی امن اسلاگ با ورژن (هم decode شده، هم encode شده) */
function findBySlug<T extends { version: string }>(
  list: T[],
  slug: string | null
): T | undefined {
  if (!slug) return undefined;
  const s = slug.trim();
  return list.find((v) => {
    const ver = String(v.version).trim();
    return ver === s || encodeURIComponent(ver) === s;
  });
}

/** گرفتن یک صفحه از API؛ offset برای شماره‌گذاری درست customName در صفحه‌های بعدی */
async function fetchVersionsPage(
  page: number,
  offset: number
): Promise<VersionItem[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/calendar?type=version&page=${page}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`خطا در دریافت اطلاعات: ${response.statusText}`);
  }

  const data = await response.json();

  return Array.isArray(data.data)
    ? data.data.map((item: any, index: number) => ({
        id: item.id,
        title: item.title,
        description: (item.description || "").trim(),
        date: item.starts_at.split(" ")[0],
        version: String(item.version_title ?? "").trim(),
        customName: `نسخه ${offset + index + 1}`,
        image: item.image_url || DEFAULT_IMAGE,
      }))
    : [];
}

/**
 * بدون slug: فقط صفحه‌ی اول.
 * با slug: صفحه‌ها را پشت‌سرهم می‌گیرد تا ورژن مورد نظر پیدا شود
 * (برای ورژن‌هایی که زیر «مشاهده بیشتر» هستن و توی صفحه‌ی ۱ نیستن).
 */
async function fetchVersions(
  slug?: string | null,
  maxPages = 20
): Promise<VersionItem[]> {
  const all: VersionItem[] = [];

  for (let page = 1; page <= maxPages; page++) {
    const items = await fetchVersionsPage(page, all.length);
    if (items.length === 0) break; // صفحه‌ی خالی یعنی تمام شد

    // جلوگیری از تکراری شدن اگه API صفحه‌ی آخر رو تکرار کنه
    const existingIds = new Set(all.map((v) => v.id));
    const fresh = items.filter((v) => !existingIds.has(v.id));
    if (fresh.length === 0) break;

    all.push(...fresh);

    if (!slug || findBySlug(all, slug)) break;
  }

  return all;
}

export async function generateMetadata({
  params,
}: VersionPageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const { lang } = resolvedParams;
    const versionSlug = getVersionSlug(resolvedParams);

    const localeMap: Record<string, string> = {
      fa: "fa_IR",
      en: "en_US",
    };
    const locale = localeMap[lang] || "en_US";

    try {
      const rawVersions = await fetchVersions(versionSlug);

      const versions = rawVersions.map((item) => ({
        title: item.title,
        description: truncateText(stripHtmlTags(item.description), 200),
        version: item.version,
        image: item.image,
      }));

      const currentVersion =
        findBySlug(versions, versionSlug) || versions[0];

      if (!currentVersion) {
        return {
          title: "نسخه یافت نشد",
          description: "نسخه مورد نظر در دسترس نیست.",
          openGraph: { locale },
        };
      }

      const langData = await getTranslation(lang);
      const mainData = await getMainFile(langData);

      // برای /version تایتل کلی صفحه، برای /version/xxx تایتل مخصوص همون نسخه
      const title = versionSlug
        ? `${currentVersion.title} - نسخه ${currentVersion.version} | ${findByUniqueId(mainData, 148)}`
        : `${findByUniqueId(mainData, 1458)} | ${findByUniqueId(mainData, 148)}`;
      const description = versionSlug
        ? currentVersion.description.slice(0, 155)
        : findByUniqueId(mainData, 1452).slice(0, 155);

      const siteUrl = process.env.SITE_URL || "https://metarang.com";
      const pageUrl = versionSlug
        ? `${siteUrl}/${lang}/version/${encodeURIComponent(versionSlug)}`
        : `${siteUrl}/${lang}/version`;
      const image = currentVersion.image;

      return {
        title,
        description,
        openGraph: {
          title,
          description,
          url: pageUrl,
          locale,
          type: "website",
          images: [
            {
              url: image || "",
              alt: title,
              width: 1200,
              height: 630,
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title,
          description,
          images: [image || ""],
        },
        alternates: {
          canonical: pageUrl,
          languages: {
            [lang]: pageUrl,
          },
        },
      };
    } catch (error) {
      console.error("generateMetadata Error:", error);
      return {
        title: "خطا در بارگذاری صفحه",
        description: "متاسفانه مشکلی در بارگذاری داده‌ها پیش آمد.",
        openGraph: { locale },
      };
    }
  } catch (error) {
    console.error("❌ Metadata error (VersionPage):", error);
    return {
      title: "خطا",
      description: "مشکلی در بارگذاری صفحه رخ داده است",
    };
  }
}

export default async function VersionPage({ params }: VersionPageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  const versionSlug = getVersionSlug(resolvedParams);

  // params نرمال‌شده برای کامپوننت‌های فرزند (BreadCrumb و ...) که انتظار
  // version به‌صورت string دارن، نه آرایه‌ی catch-all
  const normalizedParams = { ...resolvedParams, version: versionSlug || undefined };

  try {
    const langData = await getTranslation(lang);
    const mainData = await getMainFile(langData);

    let versions: VersionItem[] = [];
    try {
      versions = await fetchVersions(versionSlug);
    } catch (error) {
      console.error("خطا در دریافت داده از API:", error);
      versions = [];
    }

    const matchedVersion = findBySlug(versions, versionSlug);
    const currentVersion = matchedVersion || versions[0];

    // مقدار دقیقی که در لیست هست (نه رشته‌ی خام URL) به کلاینت داده میشه
    const initialVersion = matchedVersion
      ? matchedVersion.version
      : versions.length > 0
        ? versions[0].version
        : null;

    {/* SCHEMA** */}
    const versionSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: `${findByUniqueId(mainData, 1458)} | ${findByUniqueId(mainData, 148)}`,
      url: `https://metarang.com/${lang}/version${
        versionSlug ? `/${encodeURIComponent(versionSlug)}` : ""
      }`,
      description: currentVersion
        ? stripHtmlTags(currentVersion.description).slice(0, 155)
        : "صفحه نسخه‌های نرم‌افزار",
      author: {
        "@type": "Organization",
        name: "RGB IRPSC",
      },
      datePublished: currentVersion
        ? currentVersion.date
        : new Date().toISOString().slice(0, 10),
      softwareVersion: versionSlug || (versions.length > 0 ? versions[0].version : ""),
      version: versions.map((v) => ({
        "@type": "CreativeWork",
        name: v.title,
        datePublished: v.date,
        description: stripHtmlTags(v.description),
      })),
      image: currentVersion?.image || DEFAULT_IMAGE,
      applicationCategory: "GameApplication",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.5",
        ratingCount: "15",
        reviewCount: "27",
      },
    };
    {/*END SCHEMA** */}

    return (
      <>
        {/* SCHEMA** */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(versionSchema) }}
        />
        {/* schema END */}
        <CleanAutoRetryParam />
        <div className="flex w-full" dir={langData.direction}>
          <section
            className={`w-full relative mt-[60px] lg:mt-0 lg:pt-0 bg-bg-primary  bg-opacity20`}
          >
            {/* Breadcrumb */}
            <div className="px-12">
              <BreadCrumb params={normalizedParams} />
            </div>

            <div className="mainContainer w-full lg:h-auto  flex flex-col gap-[10px] lg:flex-row lg:items-start lg:justify-between">
              <div className="centerItem w-full   lg:px-7">
                <div className="self-center justify-between flex pt-8 w-full  gap-8">
                  <Version
                    versions={versions}
                    params={normalizedParams}
                    mainData={mainData}
                    initialVersion={initialVersion}
                    isVersionSelected={!!versionSlug && !!matchedVersion}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  } catch (error) {
    const serializedError = {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : null,
      name: error instanceof Error ? error.name : "Error",
    };

    console.error("❌ Error in VersionPage:", serializedError);

    return <CustomErrorPage error={serializedError} />;
  }
}
