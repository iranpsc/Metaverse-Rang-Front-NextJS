import { Metadata } from "next";
import Footer from "@/components/module/footer/Footer";
import { cookies } from "next/headers";
import {
  getTranslation,
  getMainFile,
  getFooterData,
  getLangArray,
} from "@/components/utils/actions";
import BreadCrumb from "@/components/shared/BreadCrumb";
import { mapEvents, MappedEventItem } from "@/utils/mapEvents";
import EventCalendarClient from "../components/EventCalendarClient";
import htmlTruncate from "html-truncate";

// تابع برای پاکسازی HTML و کوتاه کردن متن
const stripHtml = (html: string, maxLength: number = 160): string => {
  const text = htmlTruncate(html, maxLength, { ellipsis: "..." });
  return text.replace(/<[^>]+>/g, "");
};

// تابع برای دریافت رویداد خاص
async function getEvent(id: string) {
  const res = await fetch(`https://api.rgb.irpsc.com/api/calendar/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch event");
  const json = await res.json();
  return mapEvents([json.data])[0];
}

// تابع برای دریافت تمام رویدادها
async function getEvents() {
  const res = await fetch("https://api.rgb.irpsc.com/api/calendar", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch events");
  const json = await res.json();
  return mapEvents(json.data);
}

// تابع generateMetadata برای متا دیتای دینامیک
export async function generateMetadata({
  params,
}: {
  params: { lang: string; id: string };
}): Promise<Metadata> {
  const event = await getEvent(params.id);

  const cleanTitle = stripHtml(event.title);
  const cleanDescription = stripHtml(event.desc, 160);

  return {
    title: cleanTitle,
    description: cleanDescription,
    keywords: [
      cleanTitle,
      "رویداد",
      "تقویم رویدادها",
      "برنامه‌های متاورس رنگ",
      "رویدادهای مهم",
    ],
    openGraph: {
      title: cleanTitle,
      description: cleanDescription,
      url: `https://rgb.irpsc.com/${params.lang}/calendar/${params.id}`,
      type: "website",
      images: [
        {
          url: event.image || "https://rgb.irpsc.com/default-image.jpg",
          width: 1200,
          height: 630,
          alt: cleanTitle,
        },
      ],
      locale: params.lang === "fa" ? "fa_IR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: cleanTitle,
      description: cleanDescription,
      images: [event.image || "https://rgb.irpsc.com/default-image.jpg"],
    },
    alternates: {
      languages: {
        "fa-IR": `https://rgb.irpsc.com/fa/calendar/${params.id}`,
        "en-US": `https://rgb.irpsc.com/en/calendar/${params.id}`,
      },
    },
  };
}

export default async function EventPage({
  params,
}: {
  params: { lang: string; id: string };
}) {
  const [footerTabs, langData, langArray, events, selectedEvent] = await Promise.all([
    getFooterData(params),
    getTranslation(params.lang),
    getLangArray(),
    getEvents(),
    getEvent(params.id),
  ]);

  const mainData = await getMainFile(langData);

  const cookieStore = cookies();
  const rawAuth = cookieStore.get("auth")?.value;
  const token = rawAuth ? new URLSearchParams(rawAuth).get("token") : null;

  const cleanTitle = stripHtml(selectedEvent.title);

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: cleanTitle,
    startDate: selectedEvent.start,
    endDate: selectedEvent.end,
    description: stripHtml(selectedEvent.desc, 160),
    image: selectedEvent.image || "https://rgb.irpsc.com/default-image.jpg",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    organizer: {
      "@type": "Organization",
      name: "متاورس رنگ",
      url: "https://rgb.irpsc.com",
    },
    location: {
      "@type": "VirtualLocation",
      url: selectedEvent.link || `https://rgb.irpsc.com/${params.lang}/calendar/${params.id}`,
    },
    offers: selectedEvent.btnName
      ? {
          "@type": "Offer",
          price: "مشخص نشده",
          priceCurrency: "IRR",
          url: selectedEvent.link || `https://rgb.irpsc.com/${params.lang}/calendar/${params.id}`,
          availability: "https://schema.org/InStock",
        }
      : undefined,
  };

  const filteredEvents = events.filter((event) => event.id !== selectedEvent.id);

  return (
    <div
      className="flex flex-col h-screen overflow-hidden min-w-[340px] w-full"
      dir={langData.direction}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />

      <section className="w-full overflow-y-auto relative light-scrollbar dark:dark-scrollbar mt-[60px] lg:mt-0 lg:pt-0 bg-[#f8f8f8] dark:bg-black bg-opacity20">
        <div className="px-12">
          <BreadCrumb params={params} eventTitle={cleanTitle} />
        </div>

        <div className="mainContainer w-full h-auto flex flex-col items-center lg:gap-0 font-['AzarMehr'] lg:flex-row lg:items-start">
          <div className="flex flex-col w-full items-center p-5 lg:px-10">
            <EventCalendarClient
              events={filteredEvents}
              mainData={mainData}
              params={params}
              token={token}
              selectedEvent={selectedEvent}
            />
          </div>
        </div>

        <div className="w-full xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
          <Footer footerTabs={footerTabs} mainData={mainData} />
        </div>
      </section>
    </div>
  );
}