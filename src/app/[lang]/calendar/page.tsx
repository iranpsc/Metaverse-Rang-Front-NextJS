import { Metadata } from "next";
import { cookies } from "next/headers";
import {
  getTranslation,
  getMainFile,
  getLangArray,
} from "@/components/utils/actions";
import BreadCrumb from "@/components/shared/BreadCrumb";
import EventsCalendar from "./components/EventsCalendar";
import { mapEvents, MappedEventItem } from "@/utils/mapEvents";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import htmlTruncate from "html-truncate";
import CustomErrorPage from "@/components/shared/CustomErrorPage";
import CleanAutoRetryParam  from "@/components/shared/CleanAutoRetryParam";
// 📌 Utility: Jalali → Gregorian
const JalaliDate = {
  g_days_in_month: [31,28,31,30,31,30,31,31,30,31,30,31],
  j_days_in_month: [31,31,31,31,31,31,30,30,30,30,30,29],
  jalaliToGregorian(j_y: number, j_m: number, j_d: number) {
    j_y = parseInt(j_y as any);
    j_m = parseInt(j_m as any);
    j_d = parseInt(j_d as any);

    let jy = j_y - 979;
    let jm = j_m - 1;
    let jd = j_d - 1;

    let j_day_no = 365 * jy + Math.floor(jy / 33) * 8 + Math.floor(((jy % 33) + 3)/4);
    for (let i=0; i<jm; ++i) j_day_no += this.j_days_in_month[i];
    j_day_no += jd;

    let g_day_no = j_day_no + 79;
    let gy = 1600 + 400 * Math.floor(g_day_no/146097);
    g_day_no %= 146097;

    let leap = true;
    if (g_day_no >= 36525) {
      g_day_no--;
      gy += 100 * Math.floor(g_day_no/36524);
      g_day_no %= 36524;

      if (g_day_no >= 365) g_day_no++;
      else leap = false;
    }

    gy += 4 * Math.floor(g_day_no/1461);
    g_day_no %= 1461;

    if (g_day_no >= 365) {
      g_day_no--;
      gy += Math.floor(g_day_no/365);
      g_day_no %= 365;
    }

    let i=0;
    for (; g_day_no >= this.g_days_in_month[i] + (i===1 && leap?1:0); i++)
      g_day_no -= this.g_days_in_month[i] + (i===1 && leap?1:0);

    let gm = i+1;
    let gd = g_day_no + 1;

    return [gy, gm, gd];
  }
};

// 📌 Clean HTML & truncate text
const stripHtml = (html: string, maxLength: number = 160): string => {
  const text = htmlTruncate(html, maxLength, { ellipsis: "..." });
  return text.replace(/<[^>]+>/g, "");
};

// 📌 Convert Jalali date to ISO8601
function toISODate(dateString: string): string {
  const [datePart, timePart] = dateString.split(" ");
  const [j_y, j_m, j_d] = datePart.split("/").map(Number);
  const [hour = 0, min = 0] = timePart ? timePart.split(":").map(Number) : [0,0];
  const [g_y, g_m, g_d] = JalaliDate.jalaliToGregorian(j_y, j_m, j_d);
  return new Date(g_y, g_m-1, g_d, hour, min).toISOString();
}
export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  try{
  const [langData] = await Promise.all([
    getTranslation(params.lang),
  ]);

  const mainData = await getMainFile(langData);

  const cookieStore = cookies();
  const rawAuth = cookieStore.get("auth")?.value;
  const token = rawAuth ? new URLSearchParams(rawAuth).get("token") : null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const res = await fetch("https://api.rgb.irpsc.com/api/calendar?type=event", {
    method: "GET",
    headers,
    next: { revalidate:  0}, // کش برای ۱ دقیقه
  });

  const data = await res.json();
  const events = data.data;
  const Events: MappedEventItem[] = mapEvents(events);

  return {
    title: findByUniqueId(mainData, 1463),
    description: findByUniqueId(mainData, 1464),
    keywords: ["تقویم رویدادها", "رویدادهای متاورس",  "رویدادهای مهم"],
    openGraph: {
      title: findByUniqueId(mainData, 1463),
      description: findByUniqueId(mainData, 1464),
      url: `https://rgb.irpsc.com/${params.lang}/calendar`,
      type: "website",
      locale: params.lang === "fa" ? "fa_IR" : "en_US",
      images: [
        {
          url: Events.length > 0 ? Events[0]?.image || "https://rgb.irpsc.com/default-image.jpg" : "https://rgb.irpsc.com/default-image.jpg",
          width: 1200,
          height: 630,
          alt: "تصویر اولین رویداد",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: findByUniqueId(mainData, 1463),
      description: findByUniqueId(mainData, 1464),
      images: [
        Events.length > 0 ? Events[0]?.image || "https://rgb.irpsc.com/default-image.jpg" : "https://rgb.irpsc.com/default-image.jpg",
      ],
    },
    alternates: {
      languages: {
        "fa-IR": `https://rgb.irpsc.com/fa/calendar`,
        "en-US": `https://rgb.irpsc.com/en/calendar`,
      },
    },
  };
 } catch (error) {
    console.error("❌ Metadata error (LevelsPage):", error);

    return {
      title: "خطا",
      description: "مشکلی در بارگذاری صفحه رخ داده است",
    };
  }
}

// 📌 Build dynamic Event Schema for rich results
function buildEventSchema(events: MappedEventItem[], paramsLang: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "تقویم رویدادهای متاورس رنگ",
    description: "مشاهده جدیدترین رویدادها و برنامه‌های متاورس رنگ در تقویم ما.",
    image: events.length > 0 ? events[0].image || "https://rgb.irpsc.com/default-image.jpg" : "https://rgb.irpsc.com/default-image.jpg",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    organizer: {
      "@type": "Organization",
      name: "متاورس رنگ",
      url: "https://rgb.irpsc.com",
    },
    subEvents: events.map(event => ({
      "@type": "Event",
      name: stripHtml(event.title),
      startDate: toISODate(event.start),
      endDate: toISODate(event.end),
      description: stripHtml(event.desc, 160),
      image: event.image || "https://rgb.irpsc.com/default-image.jpg",
      url: event.link || `https://rgb.irpsc.com/${paramsLang}/calendar/${event.id}`,
      location: {
        "@type": "Place",
        name: stripHtml(event.title) || "Metaverse Rang",
        url: event.link || `https://rgb.irpsc.com/${paramsLang}/calendar/${event.id}`
      },
      offers: event.btnName ? {
        "@type": "Offer",
        price: "0",
        priceCurrency: "IRR",
        url: event.link || `https://rgb.irpsc.com/${paramsLang}/calendar/${event.id}`,
        availability: "https://schema.org/InStock",
        validFrom: new Date().toISOString()
      } : undefined
    }))
  };
}

// 📌 Page Component
export default async function CalendarPage({ params }: { params: { lang: string } }) {
    try {
  const [ langData, langArray] = await Promise.all([
    getTranslation(params.lang),
    getLangArray(),
  ]);

  const mainData = await getMainFile(langData);

  const cookieStore = cookies();
  const rawAuth = cookieStore.get("auth")?.value;
  const token: string | null = rawAuth ? new URLSearchParams(rawAuth).get("token") : null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const res = await fetch("https://api.rgb.irpsc.com/api/calendar?type=event", {
    method: "GET",
    headers,
    next: { revalidate: 60 },
  });

  const data = await res.json();
  const Events: MappedEventItem[] = mapEvents(data.data);

  const eventSchema = buildEventSchema(Events, params.lang);

  return (
    <div className="flex flex-col min-w-[340px] w-full" dir={langData.direction}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema, null, 2) }} />
<CleanAutoRetryParam />
      <section className="w-full relative mt-[60px] lg:mt-0 lg:pt-0 bg-[#f8f8f8] dark:bg-black bg-opacity20">
        <div className="px-12">
          <BreadCrumb params={params} />
        </div>

        <div className="p-5 lg:px-10 space-y-3 mb-5">
          <h1 className="font-rokh font-bold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] text-center dark:text-white mt-[64px] mb-[16px]">{findByUniqueId(mainData, 1463)}</h1>
          <p className="text-lightGray  dark:text-lightGray font-azarMehr font-normal text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] text-center px-5 lg:px-10">{findByUniqueId(mainData, 1464)}</p>
        </div>

        <div className="mainContainer w-full h-auto flex flex-col items-center lg:gap-0 font-azarMehr lg:flex-row lg:items-start p-5 lg:px-10">
          <EventsCalendar token={token} mainData={mainData} params={params} events={Events} />
        </div>
      </section>
    </div>
  );
}
catch (error) {
  const serializedError = {
    message:
      error instanceof Error ? error.message : "Unknown error",
    stack:
      error instanceof Error ? error.stack : null,
    name:
      error instanceof Error ? error.name : "Error",
  };

  console.error("❌ Error in EventsPage:", serializedError);

  return <CustomErrorPage error={serializedError} />;
}
}
