import { Metadata } from "next";
import { cookies } from "next/headers";
import {
  getTranslation,
  getMainFile,
} from "@/components/utils/actions";
import BreadCrumb from "@/components/shared/BreadCrumb";
import { mapEvents, MappedEventItem, EventItem } from "@/utils/mapEvents";
import SingleEventCalendarClient from "@/components/templates/envent/SingleEventCalendarClient";
// import htmlTruncate from "html-truncate";
import CustomErrorPage from "@/components/error/CustomErrorPage";
import CleanAutoRetryParam  from "@/components/system/CleanAutoRetryParam";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import JsonLdScript from "@/schemas/json-ld/JsonLdScript";
interface EventPageProps {
  params: Promise<{
    id: string; lang: string 
}>;
}
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

// 📌 Fetch single event
async function getEvent(id: string): Promise<MappedEventItem> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/calendar/${id}`, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(`Calendar event request failed with HTTP ${res.status}`);
  }

  const json: unknown = await res.json();
  const event = json && typeof json === "object"
    ? (json as { data?: unknown }).data
    : undefined;

  if (!event || typeof event !== "object" || Array.isArray(event)) {
    throw new TypeError(`Invalid calendar API response for event ${id}: expected an event object`);
  }

  const mapped = mapEvents([event as EventItem]);
  if (!mapped[0]) {
    throw new TypeError(`Calendar API returned no event for id ${id}`);
  }
  return mapped[0];
}

// 📌 Fetch all events
async function getEvents(): Promise<MappedEventItem[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/calendar`, { next: { revalidate: 3600 } });
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
  const cleanDescription = stripHtml(event.desc, 150);
    const [ langData] = await Promise.all([
    getTranslation(lang),

  ]);
const mainData = await getMainFile(langData);
  return {
    title: `${cleanTitle} | ${findByUniqueId(mainData, 148)}` ,
    description: cleanDescription,
    keywords: [cleanTitle, "رویداد", "تقویم رویدادها", "برنامه‌های متاورس رنگ", "رویدادهای مهم"],
    openGraph: {
      title: `${cleanTitle} | ${findByUniqueId(mainData, 148)}`,
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
  const [ langData, events, selectedEvent] = await Promise.all([
    getTranslation(lang),
    getEvents(),
    getEvent(resolvedParams.id),
  ]);

  const mainData = await getMainFile(langData);
  const cookieStore = await cookies();
  const rawAuth = cookieStore.get("auth")?.value;
  const token: string | null = rawAuth ? new URLSearchParams(rawAuth).get("token") : null;

  const cleanTitle = stripHtml(selectedEvent.title);
  const filteredEvents = events.filter((event: MappedEventItem) => event.id !== selectedEvent.id);

  return (
    <>
      <JsonLdScript schemaId="webpage" values={{
        name: cleanTitle,
        canonicalUrl: `https://metarang.com/${lang}/calendar/${encodeURIComponent(resolvedParams.id)}`,
        description: stripHtml(selectedEvent.desc, 150),
        lang: lang === "fa" ? "fa-IR" : "en-US",
        websiteUrl: "https://metarang.com",
      }} />
      <div className="flex flex-col  min-w-[340px] w-full" dir={langData.direction}>
        <section className="w-full relative mt-[60px] lg:mt-0 lg:pt-0 bg-bg-primary  bg-opacity20">
          <CleanAutoRetryParam />
          <div className="px-12">
            <BreadCrumb params={resolvedParams} eventTitle={cleanTitle} />
          </div>

          <div className=" w-full h-auto flex flex-col items-center lg:gap-0 font-['AzarMehr'] lg:flex-row lg:items-start">
            <div className="flex flex-col w-full items-center py-5 lg:px-10">
              <SingleEventCalendarClient
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
