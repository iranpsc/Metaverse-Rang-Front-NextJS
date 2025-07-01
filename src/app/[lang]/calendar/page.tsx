import DynamicFooter from "@/components/module/footer/DynamicFooter";
import Footer from "@/components/module/footer/Footer";
import { cookies } from "next/headers";

import {
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getAllCitizen,
  getFooterData,
  getLangArray,
} from "@/components/utils/actions";
import BreadCrumb from "@/components/shared/BreadCrumb";
import SideBar from "@/components/module/sidebar/SideBar";
import { getStaticMenu } from "@/components/utils/constants";
import EventCalendar from "./components/Calendar";
import EventsCalendar from "./components/EventsCalendar";
import { Search } from "@/components/svgs/SvgEducation";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { switchDigits } from "@/components/utils/DigitSwitch";
import EventList from "./components/EventList"; // کامپوننت کلاینتی که خواهیم ساخت
export interface EventItem {
  id: number;
  title: string;
  description: string;
  desc: string;
  starts_at: string;
  ends_at: string;
  start: string; // ✅ اضافه کن
  end: string; // ✅ اضافه کن
  btn_link?: string;
  link?: string;
  btn_name?: string;
  color?: string;
  disLikes: any;
  dislikes: any;
  likes: any;
  image?: string;
  views: number;
  staticEvent: any;
  userLiked: any;
  userDisLiked: any;
  user_interaction: any;
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
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const centralPageModal = await findByModalName(mainData, "central-page");
  const tabsMenu = await findByTabName(centralPageModal, "before-login");

  const staticMenuToShow = getStaticMenu(params.id);
  // add staticMenuToShow values to siblings tabsMenu values
  const updatedTabsMenu = tabsMenu.map((tab: any) => {
    let findInStatic = staticMenuToShow.find(
      (val) => tab.unique_id === val.unique_id
    );

    if (findInStatic) {
      // Return a new tab object with updated properties
      return {
        ...tab, // Spread the original tab properties
        url: findInStatic.url,
        order: findInStatic.order,
        toShow: true,
      };
    }

    // If no match found, return the original tab
    return tab;
  });

  const res = await fetch("https://api.rgb.irpsc.com/api/calendar?type=event", {
    method: "GET",
    headers: headers,
    cache: "no-store", // جلوگیری از کش شدن در حالت توسعه
  });

  const data = await res.json();
  const events = data.data;
  const Events = events.map((item: EventItem) => ({
    id: item.id,
    title: item.title,
    image: item.image,
    link: item.btn_link,
    desc: item.description,
    start: item.starts_at,
    end: item.ends_at,
    color: item.color,
    views: item.views,
    likes: item.likes,
    disLikes: item.dislikes,
    userLiked: item.user_interaction?.has_liked ?? false, // اگر undefined بود مقدار پیش‌فرض ""
    userDisLiked: item.user_interaction?.has_disliked ?? false, // اگر undefined بود مقدار پیش‌فرض ""

    // userInteraction:item
  }));

  return (
    <>
      <div className="flex h-screen overflow-hidden" dir={langData.direction}>
        <SideBar
          tabsMenu={updatedTabsMenu}
          langData={langData}
          langArray={langArray}
          params={params}
          pageSide="citizen"
        />
        <section
          className={`w-full overflow-y-auto relative light-scrollbar dark:dark-scrollbar mt-[60px] lg:mt-0 lg:pt-0 bg-[#f8f8f8] dark:bg-black bg-opacity20`}
        >
          {/* Breadcrumb */}
          <div className="px-12">
            <BreadCrumb params={params} />
          </div>

          {/* PLZ code here without container */}
          {/* aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa*/}

          <div className=" mainContainer w-full  h-auto    flex flex-col items-center  lg:gap-0   font-['AzarMehr'] lg:flex-row   lg:items-start  ">
            <div className="flex flex-col w-full items-center lg:px-10">
              <EventsCalendar
                mainData={mainData}
                params={params}
                events={Events}
              />
            </div>
          </div>

          {/* aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa*/}

          <div className="w-full xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
            {/* <DynamicFooter footerTabs={footerTabs} mainData={mainData} /> */}
            <Footer footerTabs={footerTabs} mainData={mainData} />
          </div>
        </section>
      </div>
    </>
  );
}
