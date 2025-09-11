// calendarPage.tsx
import { Metadata } from "next";
import Footer from "@/components/module/footer/Footer";
import { cookies } from "next/headers";
import {
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getFooterData,
  getLangArray,
} from "@/components/utils/actions";
import BreadCrumb from "@/components/shared/BreadCrumb";
import SideBar from "@/components/module/sidebar/SideBar";
import { getStaticMenu } from "@/components/utils/constants";
import EventsCalendar from "./components/EventsCalendar";
import { mapEvents, MappedEventItem } from "@/utils/mapEvents";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

// تابع generateMetadata برای تولید متا تگ‌های دینامیک
export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
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
    next: { revalidate: 3600 }, // کش برای ۱ ساعت
  });

  const data = await res.json();
  const events = data.data;
  const Events: MappedEventItem[] = mapEvents(events);

  return {
    title: findByUniqueId(mainData, 1463),
    description: findByUniqueId(mainData, 1464),
    keywords: ["تقویم رویدادها", "رویدادهای [موضوع]", "برنامه‌های [نام سایت]", "رویدادهای مهم"],
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
      description:findByUniqueId(mainData, 1464),
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
}

export default async function calendarPage({ params }: { params: any }) {
  const [footerTabs, langData, langArray] = await Promise.all([
    getFooterData(params),
    getTranslation(params.lang),
    getLangArray(),
  ]);

  const mainData = await getMainFile(langData);

  const cookieStore = cookies();
  const rawAuth = cookieStore.get("auth")?.value;
  const token = rawAuth ? new URLSearchParams(rawAuth).get("token") : null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const centralPageModal = await findByModalName(mainData, "central-page");
  const tabsMenu = await findByTabName(centralPageModal, "before-login");

  const staticMenuToShow = getStaticMenu(params.id);
  const updatedTabsMenu = tabsMenu.map((tab: any) => {
    const staticTab = staticMenuToShow.find(
      (val) => val.unique_id === tab.unique_id
    );

    if (staticTab) {
      return {
        ...tab,
        url: staticTab.url,
        order: staticTab.order,
        toShow: true,
      };
    }
    return tab;
  });

  const res = await fetch("https://api.rgb.irpsc.com/api/calendar?type=event", {
    method: "GET",
    headers,
    next: { revalidate: 3600 }, // کش برای ۱ ساعت
  });

  const data = await res.json();
  const events = data.data;
  const Events: MappedEventItem[] = mapEvents(events);

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "تقویم رویدادهای [نام سایت]",
    description: "مشاهده جدیدترین رویدادها و برنامه‌های [نام سایت] در تقویم ما.",
    image: Events.length > 0 ? Events[0]?.image || "https://rgb.irpsc.com/default-image.jpg" : "https://rgb.irpsc.com/default-image.jpg",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    organizer: {
      "@type": "Organization",
      name: "[نام سازمان شما]",
      url: "https://rgb.irpsc.com",
    },
    subEvents: Events.map((event: MappedEventItem) => ({
      "@type": "Event",
      name: event.title,
      startDate: event.start,
      endDate: event.end,
      description: event.desc,
      image: event.image || "https://rgb.irpsc.com/default-image.jpg",
      url: event.link || `https://rgb.irpsc.com/${params.lang}/event/${event.id}`,
      location: {
        "@type": "VirtualLocation",
        url: event.link || `https://rgb.irpsc.com/${params.lang}/event/${event.id}`,
      },
      offers: event.btnName
        ? {
            "@type": "Offer",
            price: "مشخص نشده",
            priceCurrency: "IRR",
            url: event.link,
            availability: "https://schema.org/InStock",
          }
        : undefined,
    })),
  };

  return (
    <div
      className="flex h-screen overflow-hidden min-w-[340px]"
      dir={langData.direction}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />

      <SideBar
        tabsMenu={updatedTabsMenu}
        langData={langData}
        langArray={langArray}
        params={params}
        pageSide="citizen"
      />

      <section className="w-full overflow-y-auto relative light-scrollbar dark:dark-scrollbar mt-[60px] lg:mt-0 lg:pt-0 bg-[#f8f8f8] dark:bg-black bg-opacity20">
        <div className="px-12">
          <BreadCrumb params={params} />
        </div>
        <div className="p-5 lg:px-10">
          <h1 className="dark:text-white"> {findByUniqueId(mainData, 1463)}</h1>
          <p className="text-textGray dark:text-dark-gray"> {findByUniqueId(mainData, 1464)}</p>
        </div>

        <div className="mainContainer w-full h-auto flex flex-col items-center lg:gap-0 font-['AzarMehr'] lg:flex-row lg:items-start p-5 lg:px-10">
     
            <EventsCalendar
              token={token}
              mainData={mainData}
              params={params}
              events={Events}
            />

        </div>

        <div className="w-full xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
          <Footer footerTabs={footerTabs} mainData={mainData} />
        </div>
      </section>
    </div>
  );
}