//"use client";
import DynamicFooter from "@/components/module/footer/DynamicFooter";
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
import useServerDarkMode from "src/hooks/use-server-dark-mode";
import { staticMenuToShow as MenuStaticData } from "@/components/utils/constants";
import VersionBox from "./components/versionBox";
import DescriptionBox from "./components/descriptionBox";
import Version from "./components/version"
export default async function CitizensPage({ params }: { params: any }) {
  const [footerTabs, langData, langArray] = await Promise.all([
    getFooterData(params),
    getTranslation(params.lang),
    getLangArray(),
  ]);

  const mainData = await getMainFile(langData);
  const defaultTheme = useServerDarkMode();

  const centralPageModal = await findByModalName(mainData, "central-page");
  const tabsMenu = await findByTabName(centralPageModal, "before-login");

  const staticMenuToShow = MenuStaticData;
  // add staticMenuToShow values to siblings tabsMenu values
  tabsMenu.forEach((tab: any) => {
    let findInStatic = staticMenuToShow.find((val) => tab.name == val.name);
    if (findInStatic) {
      tab.url = findInStatic.url;
      tab.order = findInStatic.order;
      tab.toShow = true;
    }
  });
  
  
  const versions = [
    {
        id: 1,
        title: "بهینه‌سازی عملکرد سیستم",
        version: "V 2.0.1.15",
        date: "1401/02/10",
        description: "افزایش سرعت پردازش داده‌ها و کاهش مصرف منابع سخت‌افزاری."
    },
    {
        id: 2,
        title: "رفع اشکالات گرافیکی",
        version: "V 1.3.5.22",
        date: "1402/06/08",
        description: "اصلاح نمایش عناصر در صفحه ورود و بهبود تجربه کاربری."
    },
    {
        id: 3,
        title: "افزودن حالت تاریک",
        version: "V 1.5.0.5",
        date: "1401/11/19",
        description: "قابلیت جدید برای تغییر به حالت تاریک جهت راحتی چشم کاربران."
    },
    {
        id: 4,
        title: "بهبود سیستم امنیتی",
        version: "V 2.1.0.30",
        date: "1403/01/25",
        description: "افزایش سطح امنیت رمزگذاری و محافظت در برابر حملات سایبری."
    },
    {
        id: 5,
        title: "افزودن قابلیت چت آنلاین",
        version: "V 1.8.2.12",
        date: "1402/07/14",
        description: "امکان چت مستقیم با پشتیبانی فنی از داخل برنامه."
    },
    {
        id: 6,
        title: "بهبود عملکرد موتور جستجو",
        version: "V 1.4.3.9",
        date: "1402/03/22",
        description: "افزایش دقت و سرعت نتایج جستجو در سیستم."
    },
    {
        id: 7,
        title: "افزودن قابلیت گزارش‌گیری",
        version: "V 1.9.1.7",
        date: "1401/12/30",
        description: "امکان ایجاد گزارش‌های سفارشی بر اساس داده‌های کاربران."
    },
    {
        id: 8,
        title: "بهینه‌سازی مصرف باتری",
        version: "V 2.0.0.11",
        date: "1403/02/14",
        description: "کاهش مصرف باتری در هنگام اجرای اپلیکیشن در پس‌زمینه."
    },
    {
        id: 9,
        title: "افزودن قابلیت احراز هویت دو مرحله‌ای",
        version: "V 1.7.3.5",
        date: "1402/05/10",
        description: "افزایش امنیت ورود کاربران با تأیید هویت دو مرحله‌ای."
    },
    {
        id: 10,
        title: "بهبود سیستم اعلان‌ها",
        version: "V 1.6.4.18",
        date: "1401/09/05",
        description: "بهینه‌سازی اعلان‌های برنامه برای دریافت به‌موقع پیام‌ها."
    },
      {
        id: 11,
        title: "بهینه‌سازی عملکرد سیستم",
        version: "V 2.0.1.15",
        date: "1401/02/10",
        description: "افزایش سرعت پردازش داده‌ها و کاهش مصرف منابع سخت‌افزاری."
    },
    {
        id: 12,
        title: "رفع اشکالات گرافیکی",
        version: "V 1.3.5.22",
        date: "1402/06/08",
        description: "اصلاح نمایش عناصر در صفحه ورود و بهبود تجربه کاربری."
    },
    {
        id: 13,
        title: "افزودن حالت تاریک",
        version: "V 1.5.0.5",
        date: "1401/11/19",
        description: "قابلیت جدید برای تغییر به حالت تاریک جهت راحتی چشم کاربران."
    },
    {
        id: 14,
        title: "بهبود سیستم امنیتی",
        version: "V 2.1.0.30",
        date: "1403/01/25",
        description: "افزایش سطح امنیت رمزگذاری و محافظت در برابر حملات سایبری."
    },
    {
        id: 15,
        title: "افزودن قابلیت چت آنلاین",
        version: "V 1.8.2.12",
        date: "1402/07/14",
        description: "امکان چت مستقیم با پشتیبانی فنی از داخل برنامه."
    },
    {
        id: 16,
        title: "بهبود عملکرد موتور جستجو",
        version: "V 1.4.3.9",
        date: "1402/03/22",
        description: "افزایش دقت و سرعت نتایج جستجو در سیستم."
    },
    {
        id: 17,
        title: "افزودن قابلیت گزارش‌گیری",
        version: "V 1.9.1.7",
        date: "1401/12/30",
        description: "امکان ایجاد گزارش‌های سفارشی بر اساس داده‌های کاربران."
    },
    {
        id: 18,
        title: "بهینه‌سازی مصرف باتری",
        version: "V 2.0.0.11",
        date: "1403/02/14",
        description: "کاهش مصرف باتری در هنگام اجرای اپلیکیشن در پس‌زمینه."
    },
    {
        id: 19,
        title: "افزودن قابلیت احراز هویت دو مرحله‌ای",
        version: "V 1.7.3.5",
        date: "1402/05/10",
        description: "افزایش امنیت ورود کاربران با تأیید هویت دو مرحله‌ای."
    },
    {
        id: 20,
        title: "بهبود سیستم اعلان‌ها",
        version: "V 1.6.4.18",
        date: "1401/09/05",
        description: "بهینه‌سازی اعلان‌های برنامه برای دریافت به‌موقع پیام‌ها."
    },  {
      id: 21,
      title: "بهینه‌سازی عملکرد سیستم",
      version: "V 2.0.1.15",
      date: "1401/02/10",
      description: "افزایش سرعت پردازش داده‌ها و کاهش مصرف منابع سخت‌افزاری."
  },
  {
      id: 22,
      title: "رفع اشکالات گرافیکی",
      version: "V 1.3.5.22",
      date: "1402/06/08",
      description: "اصلاح نمایش عناصر در صفحه ورود و بهبود تجربه کاربری."
  },
  {
      id: 23,
      title: "افزودن حالت تاریک",
      version: "V 1.5.0.5",
      date: "1401/11/19",
      description: "قابلیت جدید برای تغییر به حالت تاریک جهت راحتی چشم کاربران."
  },
  {
      id: 24,
      title: "بهبود سیستم امنیتی",
      version: "V 2.1.0.30",
      date: "1403/01/25",
      description: "افزایش سطح امنیت رمزگذاری و محافظت در برابر حملات سایبری."
  },
  {
      id: 25,
      title: "افزودن قابلیت چت آنلاین",
      version: "V 1.8.2.12",
      date: "1402/07/14",
      description: "امکان چت مستقیم با پشتیبانی فنی از داخل برنامه."
  },
  {
      id: 26,
      title: "بهبود عملکرد موتور جستجو",
      version: "V 1.4.3.9",
      date: "1402/03/22",
      description: "افزایش دقت و سرعت نتایج جستجو در سیستم."
  },
  {
      id: 27,
      title: "افزودن قابلیت گزارش‌گیری",
      version: "V 1.9.1.7",
      date: "1401/12/30",
      description: "امکان ایجاد گزارش‌های سفارشی بر اساس داده‌های کاربران."
  },
  {
      id: 28,
      title: "بهینه‌سازی مصرف باتری",
      version: "V 2.0.0.11",
      date: "1403/02/14",
      description: "کاهش مصرف باتری در هنگام اجرای اپلیکیشن در پس‌زمینه."
  },
  {
      id: 29,
      title: "افزودن قابلیت احراز هویت دو مرحله‌ای",
      version: "V 1.7.3.5",
      date: "1402/05/10",
      description: "افزایش امنیت ورود کاربران با تأیید هویت دو مرحله‌ای."
  },
];

  return (
    <>
      <div className=" flex h-screen overflow-hidden" dir={langData.direction}>
        <SideBar
          tabsMenu={tabsMenu}
          langData={langData}
          langArray={langArray}
          defaultTheme={defaultTheme}
          params={params}
          pageSide="citizen"
        />
        <section
          className={`overflow-y-auto w-full relative light-scrollbar dark:dark-scrollbar mt-[60px] lg:mt-0 lg:pt-0 bg-[#f8f8f8] dark:bg-black bg-opacity20`}
        >
          {/* Breadcrumb */}
          <div className="px-12">
            <BreadCrumb params={params} />
          </div>

          {/* PLZ code here without container */}
          <div className="mainContainer w-full  lg:h-auto dark:bg-black flex flex-col  gap-[10px] lg:flex-row lg:items-start lg:justify-between">
            <div className="centerItem w-[100%] h-[90%] lg:px-7">
              <div className="self-start justify-between flex pt-8 w-full h-full gap-8">
               <Version versions={versions}/>



              </div>
            </div>
          </div>
          <div className="xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
            <DynamicFooter footerTabs={footerTabs} />
          </div>
        </section>
      </div>
    </>
  );
}
