// src/app/[lang]/layout.tsx
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
import Icon from "./Icon"
import CustomErrorPage from "@/components/shared/CustomErrorPage";

interface Tab {
  id: number;
  unique_id: number;
  url?: string;
  translation: string;
  order?: number;
  toShow?: boolean;
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'fa';

  // console.log("Resolved lang:", lang);

  try {
    const theme = useServerDarkMode();

    const [langArray, langData, footerTabs] = await Promise.all([
      getLangArray(),
      getTranslation(lang),
      getFooterData({ lang }),
    ]);

    // چک اضافی قبل از getMainFile
    if (!langData?.file_url) {
      throw new Error(`No file_url in langData for lang: ${lang}`);
    }

    const mainData = await getMainFile(langData);

    // چک مهم: اگر mainData معتبر نبود، کرش نکن – fallback یا error
    if (!mainData || !mainData.modals || !Array.isArray(mainData.modals)) {
      console.error("mainData is invalid or missing 'modals'", mainData);
      throw new Error("Failed to load main data structure");
    }

    const centralPageModal = await findByModalName(mainData, "central-page");
    if (!centralPageModal) {
      throw new Error("central-page modal not found in mainData");
    }

    const tabsMenu = await findByTabName(centralPageModal, "before-login");
    if (!tabsMenu) {
      throw new Error("before-login tab not found");
    }

    const staticMenuToShow = getStaticMenu(lang);

    const updatedTabsMenu = tabsMenu.map((tab: Tab) => {
      const findInStatic = staticMenuToShow.find((val) => tab.unique_id === val.unique_id);
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
      <html className={theme} lang={lang}>
        <Head>
          <link rel="preload" as="image" href="/firstpage/replaced_pic.webp" />
          <link rel="preload" as="video" href="/firstpage/3d_rgb.irpsc.webm" type="video/mp4" />
        </Head>

        <body className={`${azarMehr.variable} ${rokh.variable} h-screen light-scrollbar dark:dark-scrollbar`}>
          {lang !== "en" && <VPNDetector />}
          <ReferralHandler />
          <ToastProvider />
          <main className="flex w-full h-screen overflow-hidden" dir={langData.direction}>
            <Suspense fallback={<div>Loading Sidebar...</div>}>
              <ConditionalSidebar
                tabsMenu={updatedTabsMenu}
                langData={langData}
                langArray={langArray}
                params={resolvedParams}
                mainData={mainData}
              />
            </Suspense>

            <div className='flex flex-col w-full h-screen overflow-y-auto light-scrollbar dark:dark-scrollbar'>
              <Suspense fallback={<div>Loading Content...</div>}>
                {children}
                <div className="w-full xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1 bg-[#f8f8f8] dark:bg-black">
                  <FooterClient footerTabs={footerTabs} mainData={mainData} params={resolvedParams} />
                </div>
              </Suspense>
            </div>

            <a
              href="https://t.me/metargb"
              aria-label="Join us on Telegram"
              target='_blank'
              title="همکاری در توسعه متارنگ"
              className="fixed rtl:left-10 ltr:right-10 bottom-[20px] z-[1000]"
            >
              <Icon width={60} height={60} />
            </a>
          </main>
        </body>
      </html>
    );
  } catch (error) {
    console.error("❌ Error in LangLayout:", error);
    return <CustomErrorPage error={{ message: error.message || 'Unknown', stack: error.stack }} />;
  }
}