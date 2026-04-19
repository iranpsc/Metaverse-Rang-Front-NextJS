import { Metadata } from "next";
import { cookies } from "next/headers";
import {
  getTranslation,
  getMainFile,
  getLangArray,
} from "@/components/utils/actions";
import BreadCrumb from "@/components/shared/BreadCrumb";
import { mapEvents, MappedEventItem } from "@/utils/mapEvents";
import EventCalendarClient from "../components/EventCalendarClient";
import htmlTruncate from "html-truncate";
import CustomErrorPage from "@/components/shared/CustomErrorPage";
import CleanAutoRetryParam  from "@/components/shared/CleanAutoRetryParam";
interface EventPageProps {
  params: Promise<{
    id: string; lang: string 
}>;
}
// 📌 Utility: Jalali → Gregorian
const JalaliDate = {
  g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],
  jalaliToGregorian(j_y: number, j_m: number, j_d: number): [number, number, number] {
    j_y = parseInt(j_y as any);
    j_m = parseInt(j_m as any);
    j_d = parseInt(j_d as any);

    let jy = j_y - 979;
    let jm = j_m - 1;
    let jd = j_d - 1;

    let j_day_no =
      365 * jy + Math.floor(jy / 33) * 8 + Math.floor(((jy % 33) + 3) / 4);
    for (let i = 0; i < jm; ++i) j_day_no += JalaliDate.j_days_in_month[i];
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
    for (; g_day_no >= JalaliDate.g_days_in_month[i] + (i === 1 && leap ? 1 : 0); i++)
      g_day_no -= JalaliDate.g_days_in_month[i] + (i === 1 && leap ? 1 : 0);

    let gm = i + 1;
    let gd = g_day_no + 1;

    return [gy, gm, gd];
  },
};

// 📌 Clean HTML & truncate text
function stripHtml(html: string, limit = 200) {
  if (!html) return "";

  let text = "";

  if (typeof window === "undefined") {
    // SSR / Node.js
    text = html.replace(/<|>/g, "");
  } else {
    // Browser
    const div = document.createElement("div");
    div.innerHTML = html;
    text = div.textContent || div.innerText || "";
  }

  text = text.trim();

  return text.length > limit
    ? text.slice(0, limit).trim() + "…"
    : text;
}

// 📌 Convert Jalali date to ISO8601
function toISODate(dateString: string | undefined): string {
  if (!dateString) return new Date().toISOString();
  const [datePart, timePart] = dateString.split(" ");
  const [j_y, j_m, j_d] = datePart.split("/").map(Number);
  const [hour = 0, min = 0] = timePart ? timePart.split(":").map(Number) : [0, 0];
  const [g_y, g_m, g_d] = JalaliDate.jalaliToGregorian(j_y, j_m, j_d);
  return new Date(g_y, g_m - 1, g_d, hour, min).toISOString();
}

// 📌 Build Event Schema exactly like sample but fully dynamic
function buildEventSchema(selectedEvent: MappedEventItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: stripHtml(selectedEvent.title),
    startDate: toISODate(selectedEvent.start),
    endDate: toISODate(selectedEvent.end),
    description: stripHtml(selectedEvent.desc, 160),
    image: selectedEvent.image || "https://metarang.com/default-image.jpg",
    url: selectedEvent.link || "https://metarang.com",
    location: {
      "@type": "Place",
      name: (selectedEvent as any).locationName || "Metaverse Rang",
      url: selectedEvent.link || "https://metarang.com",
    },
    organizer: {
      "@type": "Organization",
      name: (selectedEvent as any).organizerName || "IRPSC",
      url: (selectedEvent as any).organizerUrl || "https://metarang.com/",
    },
    eventStatus: "https://schema.org/EventScheduled",
    offers: {
      "@type": "Offer",
      price: (selectedEvent as any).price ?? "0",
      priceCurrency: (selectedEvent as any).priceCurrency || "IRR",
      url: (selectedEvent as any).offerUrl || (selectedEvent as any).link || "https://metarang.com",
      availability: "https://schema.org/InStock",
      validFrom: (selectedEvent as any).validFrom ? toISODate((selectedEvent as any).validFrom) : new Date().toISOString(),
    },
  };
}

// 📌 Fetch single event
async function getEvent(id: string): Promise<MappedEventItem> {
  const res = await fetch(`https://api.metarang.com/api/calendar/${id}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch event");
  const json = await res.json();
  return mapEvents([json.data])[0];
}

// 📌 Fetch all events
async function getEvents(): Promise<MappedEventItem[]> {
  const res = await fetch("https://api.metarang.com/api/calendar", { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch events");
  const json = await res.json();
  return mapEvents(json.data);
}

// 📌 Dynamic metadata
export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
          const resolvedParams = await params;
    const { lang } = resolvedParams;
  try {
  const event = await getEvent(resolvedParams.id);
  const cleanTitle = stripHtml(event.title);
  const cleanDescription = stripHtml(event.desc, 160);

  return {
    title: cleanTitle,
    description: cleanDescription,
    keywords: [cleanTitle, "رویداد", "تقویم رویدادها", "برنامه‌های متاورس رنگ", "رویدادهای مهم"],
    openGraph: {
      title: cleanTitle,
      description: cleanDescription,
      url: `https://metarang.com/${lang}/calendar/${resolvedParams.id}`,
      type: "website",
      images: [{ url: event.image || "https://metarang.com/default-image.jpg", width: 1200, height: 630, alt: cleanTitle }],
      locale: lang === "fa" ? "fa_IR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: cleanTitle,
      description: cleanDescription,
      images: [event.image || "https://metarang.com/default-image.jpg"],
    },
    alternates: {
      languages: {
        "fa-IR": `https://metarang.com/fa/calendar/${resolvedParams.id}`,
        "en-US": `https://metarang.com/en/calendar/${resolvedParams.id}`,
      },
    },
  };
}
catch (error) {
    console.error("❌ Metadata error (LevelsPage):", error);

    return {
      title: "خطا",
      description: "مشکلی در بارگذاری صفحه رخ داده است",
    };
  }
}

// 📌 Page Component
export default async function EventPage({ params }: EventPageProps ) {
          const resolvedParams = await params;
    const { lang } = resolvedParams;
    try {
  const [ langData, langArray, events, selectedEvent] = await Promise.all([
    getTranslation(lang),
    getLangArray(),
    getEvents(),
    getEvent(resolvedParams.id),
  ]);

  const mainData = await getMainFile(langData);
  const cookieStore = await cookies();
  const rawAuth = cookieStore.get("auth")?.value;
  const token: string | null = rawAuth ? new URLSearchParams(rawAuth).get("token") : null;

  const cleanTitle = stripHtml(selectedEvent.title);
  const eventSchema = buildEventSchema(selectedEvent);
  const filteredEvents = events.filter((e) => e.id !== selectedEvent.id);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema, null, 2) }} />
      <div className="flex flex-col  min-w-[340px] w-full" dir={langData.direction}>
        <section className="w-full relative mt-[60px] lg:mt-0 lg:pt-0 bg-[#f8f8f8] dark:bg-black bg-opacity20">
          <CleanAutoRetryParam />
          <div className="px-12">
            <BreadCrumb params={params} eventTitle={cleanTitle} />
          </div>

          <div className=" w-full h-auto flex flex-col items-center lg:gap-0 font-['AzarMehr'] lg:flex-row lg:items-start">
            <div className="flex flex-col w-full items-center p-5 lg:px-10">
              <EventCalendarClient
                events={filteredEvents}
                mainData={mainData}
                params={resolvedParams}
                token={token}
                selectedEvent={selectedEvent}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
} catch (error) {
  const serializedError = {
    message:
      error instanceof Error ? error.message : "Unknown error",
    stack:
      error instanceof Error ? error.stack : null,
    name:
      error instanceof Error ? error.name : "Error",
  };

  console.error("❌ Error in EvenntPage:", serializedError);

  return <CustomErrorPage error={serializedError} />;
}
}
