// app/[lang]/calendar/page.tsx
import { Metadata } from "next";
import { cookies } from "next/headers";
import {
  getTranslation,
  getMainFile,
} from "@/components/utils/actions";
import BreadCrumb from "@/components/shared/BreadCrumb";
import EventsCalendarClient from "@/components/templates/envent/EventCalendarClient";
import { mapEvents, MappedEventItem } from "@/utils/mapEvents";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import CustomErrorPage from "@/components/error/CustomErrorPage";
import CleanAutoRetryParam from "@/components/system/CleanAutoRetryParam";
import FixLinks from "../../../components/templates/envent/FixLinks";

interface CalendarPageProps {
  params: Promise<{ lang: string }>;
}

// 📌 Utility: Jalali → Gregorian
const JalaliDate = {
  g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],
  jalaliToGregorian(j_y: number, j_m: number, j_d: number) {
    j_y = parseInt(j_y as any);
    j_m = parseInt(j_m as any);
    j_d = parseInt(j_d as any);

    let jy = j_y - 979;
    let jm = j_m - 1;
    let jd = j_d - 1;

    let j_day_no = 365 * jy + Math.floor(jy / 33) * 8 + Math.floor(((jy % 33) + 3) / 4);
    for (let i = 0; i < jm; ++i) j_day_no += this.j_days_in_month[i];
    j_day_no += jd;

    let g_day_no = j_day_no + 79;
    let gy = 1600 + 400 * Math.floor(g_day_no / 146097);
    g_day_no %= 146097;

    let leap = true;
    if (g_day_no >= 36525) {
      g_day_no--;
      gy += 100 * Math.floor(g_day_no / 36524);
      g_day_no %= 36524;

      if (g_day_no >= 365) g_day_no++;
      else leap = false;
    }

    gy += 4 * Math.floor(g_day_no / 1461);
    g_day_no %= 1461;

    if (g_day_no >= 365) {
      g_day_no--;
      gy += Math.floor(g_day_no / 365);
      g_day_no %= 365;
    }

    let i = 0;
    for (; g_day_no >= this.g_days_in_month[i] + (i === 1 && leap ? 1 : 0); i++)
      g_day_no -= this.g_days_in_month[i] + (i === 1 && leap ? 1 : 0);

    let gm = i + 1;
    let gd = g_day_no + 1;

    return [gy, gm, gd];
  },
};

function cleanDescription(html: string, limit = 200) {
  if (!html) return "";
  const text = html.replace(/<|>/g, "").trim();
  return text.length > limit ? text.slice(0, limit).trim() + "…" : text;
}

function toISODate(dateString: string): string {
  const [datePart, timePart] = dateString.split(" ");
  const [j_y, j_m, j_d] = datePart.split("/").map(Number);
  const [hour = 0, min = 0] = timePart ? timePart.split(":").map(Number) : [0, 0];
  const [g_y, g_m, g_d] = JalaliDate.jalaliToGregorian(j_y, j_m, j_d);
  return new Date(g_y, g_m - 1, g_d, hour, min).toISOString();
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
    const data = await res.json();
    return mapEvents(data.data);
  } catch (e) {
    console.error("❌ Error fetching public events for SEO:", e);
    return [];
  }
}

function buildEventSchema(events: MappedEventItem[], paramsLang: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "تقویم رویدادهای متاورس رنگ",
    description: "مشاهده جدیدترین رویدادها و برنامه‌های متاورس رنگ در تقویم ما.",
    image:
      events.length > 0
        ? events[0].image || "https://metarang.com/default-image.jpg"
        : "https://metarang.com/default-image.jpg",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    organizer: {
      "@type": "Organization",
      name: "متاورس رنگ",
      url: "https://metarang.com",
    },
    subEvents: events.map((event) => ({
      "@type": "Event",
      name: cleanDescription(event.title),
      startDate: toISODate(event.start),
      endDate: toISODate(event.end),
      description: cleanDescription(event.desc, 160),
      image: event.image || "https://metarang.com/default-image.jpg",
      url: event.link || `https://metarang.com/${paramsLang}/calendar/${event.id}`,
      location: {
        "@type": "Place",
        name: cleanDescription(event.title) || "Metaverse Rang",
        url: event.link || `https://metarang.com/${paramsLang}/calendar/${event.id}`,
      },
      offers: event.btnName
        ? {
            "@type": "Offer",
            price: "0",
            priceCurrency: "IRR",
            url: event.link || `https://metarang.com/${paramsLang}/calendar/${event.id}`,
            availability: "https://schema.org/InStock",
            validFrom: new Date().toISOString(),
          }
        : undefined,
    })),
  };
}

export async function generateMetadata({
  params,
}: CalendarPageProps): Promise<Metadata> {
  const { lang } = await params;

  try {
    const langData = await getTranslation(lang);
    const mainData = await getMainFile(langData);

    const title = findByUniqueId(mainData, 1463);
    const description = findByUniqueId(mainData, 1464);

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
    const eventSchema = buildEventSchema(publicEvents, lang);

    return (
      <div className="flex flex-col min-w-[340px] w-full" dir={langData.direction}>
        <FixLinks />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema, null, 2) }}
        />
        <CleanAutoRetryParam />
        <section className="w-full relative mt-[60px] lg:mt-0 lg:pt-0 bg-bg-primary bg-opacity20">
          <div className="px-12">
            <BreadCrumb params={resolvedParams} />
          </div>

          <div className="p-5 lg:px-10 space-y-3 mb-5">
            <h1 className="font-rokh font-bold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] text-center dark:text-white mt-[64px] mb-[16px]">
              {findByUniqueId(mainData, 1463)}
            </h1>
            <p className="text-matn-2 dark:text-matn-2 font-azarMehr font-normal text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] text-center px-5 lg:px-10">
              {findByUniqueId(mainData, 1464)}
            </p>
          </div>

          <div className="mainContainer w-full h-auto flex flex-col items-center lg:gap-0 font-azarMehr lg:flex-row lg:items-start p-5 lg:px-10">
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