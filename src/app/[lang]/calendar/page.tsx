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
    cache: "no-store",
  });

  const data = await res.json();
  const events = data.data;
  const Events: MappedEventItem[] = mapEvents(events);

  return (
    <div
      className="flex h-screen overflow-hidden min-w-[340px]"
      dir={langData.direction}
    >
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

        <div className="mainContainer w-full h-auto flex flex-col items-center lg:gap-0 font-['AzarMehr'] lg:flex-row lg:items-start">
          <div className="flex flex-col w-full items-center lg:px-10">
            <EventsCalendar
              token={token}
              mainData={mainData}
              params={params}
              events={Events}
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
