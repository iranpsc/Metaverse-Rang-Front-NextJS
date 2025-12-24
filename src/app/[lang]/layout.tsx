import { azarMehr, rokh } from '../../fonts/localFonts';
import useServerDarkMode from "src/hooks/use-server-dark-mode";
import ToastProvider from "../../components/shared/toastProvider";
import { Suspense } from "react";
import Head from "next/head";
import ReferralHandler from './ReferralHandler';
import VPNDetector from './VPNDetector';
import {
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getLangArray,
  getFooterData
} from "@/components/utils/actions";
import { getStaticMenu } from "@/components/utils/constants";
import ConditionalSidebar from "@/components/module/sidebar/ConditionalSidebar";
import FooterClient from "@/components/module/footer/FooterClient";

interface Tab {
  id: number;
  unique_id: number;
  url?: string;
  translation: string;
  order?: number;
  toShow?: boolean;
}

export default async function LangLayout({ children, params }: any) {
  const theme = useServerDarkMode();
  const [langArray, langData, footerTabs] = await Promise.all([
    getLangArray(),
    getTranslation(params.lang),
    getFooterData(params),
  ]);
  const mainData = await getMainFile(langData);
  const centralPageModal = await findByModalName(mainData, "central-page");
  const tabsMenu = await findByTabName(centralPageModal, "before-login");
  const staticMenuToShow = getStaticMenu(params.lang);



  const updatedTabsMenu = tabsMenu.map((tab: Tab) => {
    let findInStatic = staticMenuToShow.find((val) => tab.unique_id === val.unique_id);
    if (findInStatic) {
      return {
        ...tab,
        url: findInStatic.url,
        order: findInStatic.order,
        toShow: true,
      };
    }
    return tab;
  });

  return (
    <html className={theme} lang={params.lang}>
      <Head>
        {/* Preload تصاویر و ویدئو */}
        <link rel="preload" as="image" href="/firstpage/replaced_pic.webp" />
        <link
          rel="preload"
          as="video"
          href="/firstpage/3d_rgb.irpsc.webm"
          type="video/mp4"
        />

      </Head>

      <body className={`${azarMehr.variable} ${rokh.variable}   h-screen light-scrollbar dark:dark-scrollbar`}>
         {params.lang !== "en" && <VPNDetector />}
        <ReferralHandler />
        <ToastProvider />
        <main className="flex w-full h-screen overflow-hidden" dir={langData.direction}>
          <Suspense fallback={<div>Loading Sidebar...</div>}>
            <ConditionalSidebar
              tabsMenu={updatedTabsMenu}
              langData={langData}
              langArray={langArray}
              params={params}
              mainData={mainData}
            />
          </Suspense>

          <div className='flex flex-col w-full h-screen overflow-y-auto light-scrollbar dark:dark-scrollbar'>
            <Suspense fallback={
              <div className="container flex flex-col w-full h-screen items-center justify-center !bg-transparent">
                <div className="holder">
                  <div className="box"></div>
                </div>
                <div className="holder">
                  <div className="box"></div>
                </div>
                <div className="holder">
                  <div className="box"></div>
                </div>
              </div>}>
              {children}
     
                <div className="w-full xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1 bg-[#f8f8f8] dark:bg-black">
                  <FooterClient footerTabs={footerTabs} mainData={mainData} params={params} />
                </div>
              


            </Suspense>


          </div>
          <a
            href="https://discord.gg/sW6XCY96hh"
            aria-label="Join us on Discord"
            title="Discord"
            className="fixed rtl:left-10 ltr:right-10 bottom-[20px] z-[1000]"
          >
            {/* SVG Discord */}
            <svg
              className="size-[60px] bg-light-primary rounded-full dark:bg-dark-yellow"
              width="64"
              height="65"
              viewBox="0 0 64 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="0.404297" width="64" height="64" rx="32" />
              <g clipPath="url(#clip0_2090_145)">
                <path
                  className="dark:fill-black"
                  d="M42.6454 22.3634C40.6874 21.465 38.5878 20.8031 36.3925 20.424C36.3525 20.4166 36.3126 20.4349 36.292 20.4715C36.0219 20.9518 35.7228 21.5783 35.5134 22.0708C33.1522 21.7173 30.8031 21.7173 28.4903 22.0708C28.2808 21.5674 27.9708 20.9518 27.6996 20.4715C27.679 20.4361 27.6391 20.4179 27.5991 20.424C25.405 20.8018 23.3053 21.4638 21.3461 22.3634C21.3292 22.3707 21.3146 22.3829 21.305 22.3987C17.3224 28.3486 16.2314 34.1523 16.7666 39.884C16.769 39.912 16.7848 39.9388 16.8066 39.9559C19.4342 41.8855 21.9794 43.057 24.4774 43.8335C24.5174 43.8457 24.5598 43.8311 24.5852 43.7981C25.1761 42.9912 25.7029 42.1403 26.1545 41.2456C26.1812 41.1932 26.1557 41.131 26.1012 41.1103C25.2657 40.7933 24.4702 40.4069 23.7049 39.9681C23.6444 39.9327 23.6395 39.8462 23.6952 39.8047C23.8563 39.684 24.0173 39.5585 24.1711 39.4317C24.1989 39.4086 24.2377 39.4037 24.2704 39.4183C29.2979 41.7137 34.7408 41.7137 39.709 39.4183C39.7417 39.4025 39.7805 39.4073 39.8095 39.4305C39.9634 39.5573 40.1244 39.684 40.2866 39.8047C40.3423 39.8462 40.3387 39.9327 40.2782 39.9681C39.5129 40.4154 38.7173 40.7933 37.8806 41.1091C37.8261 41.1298 37.8019 41.1932 37.8286 41.2456C38.2899 42.1391 38.8166 42.9899 39.3966 43.7969C39.4209 43.8311 39.4644 43.8457 39.5044 43.8335C42.0145 43.057 44.5598 41.8855 47.1874 39.9559C47.2104 39.9388 47.225 39.9132 47.2274 39.8852C47.8679 33.2587 46.1545 27.5027 42.6854 22.3999C42.6769 22.3829 42.6624 22.3707 42.6454 22.3634ZM26.9053 36.394C25.3916 36.394 24.1445 35.0043 24.1445 33.2977C24.1445 31.5911 25.3675 30.2015 26.9053 30.2015C28.4552 30.2015 29.6903 31.6033 29.6661 33.2977C29.6661 35.0043 28.4431 36.394 26.9053 36.394ZM37.1129 36.394C35.5993 36.394 34.3521 35.0043 34.3521 33.2977C34.3521 31.5911 35.5751 30.2015 37.1129 30.2015C38.6629 30.2015 39.8979 31.6033 39.8737 33.2977C39.8737 35.0043 38.6629 36.394 37.1129 36.394Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_2090_145">
                  <rect width="30.72" height="30.72" fill="white" transform="translate(16.6396 17.0444)" />
                </clipPath>
              </defs>
            </svg>
          </a>

        </main>
      </body>
    </html>
  );
}
