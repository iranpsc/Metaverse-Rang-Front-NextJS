// app/[lang]/calendar/page.tsx
import { Metadata } from "next";
import {
  getTranslation,
  getMainFile,
} from "@/components/utils/actions";
import BreadCrumb from "@/components/shared/BreadCrumb";
import EventsCalendarClient from "@/components/templates/envent/EventCalendarClient";
import { mapEvents, MappedEventItem, EventItem } from "@/utils/mapEvents";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import CustomErrorPage from "@/components/error/CustomErrorPage";
import CleanAutoRetryParam from "@/components/system/CleanAutoRetryParam";
import FixLinks from "../../../components/templates/envent/FixLinks";
import JsonLdScript from "@/schemas/json-ld/JsonLdScript";

interface CalendarPageProps {
  params: Promise<{ lang: string }>;
}

function cleanDescription(html: string, limit = 200) {
  if (!html) return "";
  const text = html.replace(/<|>/g, "").trim();
  return text.length > limit ? text.slice(0, limit).trim() + "…" : text;
}


async function fetchPublicEvents(): Promise<MappedEventItem[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/calendar?type=event`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) {
      throw new Error(`Calendar API request failed with HTTP ${res.status}`);
    }

    const data: unknown = await res.json();
    if (!data || typeof data !== "object" || !Array.isArray((data as { data?: unknown }).data)) {
      throw new TypeError("Invalid calendar API response: expected data to be an events array");
    }

    return mapEvents((data as { data: EventItem[] }).data);
  } catch (e) {
    console.error("❌ Error fetching public events for SEO:", e);
    return [];
  }
}

export async function generateMetadata({
  params,
}: CalendarPageProps): Promise<Metadata> {
  const { lang } = await params;

  try {
    const langData = await getTranslation(lang);
    const mainData = await getMainFile(langData);

    const title = `${findByUniqueId(mainData, 1463)} | ${findByUniqueId(mainData, 148)}` ;
    const description = findByUniqueId(mainData, 1464).slice(0, 150);

    const canonicalUrl = `https://metarang.com/${lang}/calendar`;

    return {
      title,
      description,

      keywords: [
        "تقویم رویدادها",
        "رویدادهای متاورس",
        "رویدادهای مهم",
      ],

      alternates: {
        canonical: canonicalUrl,
        languages: {
          "fa-IR": "https://metarang.com/fa/calendar",
          "en-US": "https://metarang.com/en/calendar",
        },
      },

      openGraph: {
        title,
        description,
        url: canonicalUrl,
        siteName: "متاورس رنگ",
        type: "website",
        locale: lang === "fa" ? "fa_IR" : "en_US",
      },

      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  } catch (error) {
    console.error("❌ Calendar generateMetadata error:", error);

    return {
      title: "تقویم رویدادها | متاورس رنگ",
      description:
        "مشاهده جدیدترین رویدادها و برنامه‌های متاورس رنگ در تقویم رویدادها.",
    };
  }
}

export default async function CalendarPage({ params }: CalendarPageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams;
  try {
    const [langData] = await Promise.all([getTranslation(lang)]);
    const mainData = await getMainFile(langData);

    // فچ سبک و عمومی فقط برای schema (بدون هدر auth) — این fetch سریع و
    // کش‌شونده‌ست (revalidate: 60) پس بلاک‌کننده‌ی جدی برای LCP نیست
    const publicEvents = await fetchPublicEvents();
    const calendarUrl = `https://metarang.com/${lang}/calendar`;
    const calendarItems = publicEvents
      .filter((event) => Boolean(event?.id && event?.title))
      .map((event, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "WebPage",
          name: cleanDescription(event.title, 120),
          url: `${calendarUrl}/${encodeURIComponent(String(event.id))}`,
        },
      }));

    return (
      <div className="flex flex-col  w-full" dir={langData.direction}>
        <FixLinks />
        <JsonLdScript schemaId="collection-page" values={{
          name: findByUniqueId(mainData, 1463),
          canonicalUrl: calendarUrl,
          description: findByUniqueId(mainData, 1464),
          lang: lang === "fa" ? "fa-IR" : "en-US",
        }} />
        {calendarItems.length > 0 ? <JsonLdScript schemaId="item-list" values={{
          name: findByUniqueId(mainData, 1463),
          canonicalUrl: calendarUrl,
          numberOfItems: calendarItems.length,
          items: calendarItems,
        }} /> : null}
        <CleanAutoRetryParam />
        <section className="w-full relative mt-[60px] lg:mt-0 lg:pt-0 bg-bg-primary bg-opacity20">
          <div className="px-12">
            <BreadCrumb params={resolvedParams} />
          </div>

          <div className="space-y-3 mb-5">
            <h1 className="font-rokh font-bold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] text-center dark:text-white mt-[64px] mb-[16px]">
              {findByUniqueId(mainData, 1463)}
            </h1>
            <p className="text-matn-2 dark:text-matn-2 font-azarMehr font-normal text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] text-center px-5 lg:px-10">
              {findByUniqueId(mainData, 1464)}
            </p>
          </div>

          <div className="mainContainer w-full h-auto flex flex-col items-center lg:gap-0 font-azarMehr lg:flex-row lg:items-start lg:px-10">
            <EventsCalendarClient lang={lang} mainData={mainData} params={resolvedParams} />
          </div>
        </section>
      </div>
    );
  } catch (error) {
    const serializedError = {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : null,
      name: error instanceof Error ? error.name : "Error",
    };
    console.error("❌ Error in EventsPage:", serializedError);
    return <CustomErrorPage error={serializedError} />;
  }
}
