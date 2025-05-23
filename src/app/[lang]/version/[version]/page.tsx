import DynamicFooter from "@/components/module/footer/DynamicFooter";
import Footer from "@/components/module/footer/Footer";
import {
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getAllCitizen,
  getFooterData,
  getLangArray,
} from "@/components/utils/actions";
import Version from "../components/version";
import BreadCrumb from "@/components/shared/BreadCrumb";
import SideBar from "@/components/module/sidebar/SideBar";
import { getStaticMenu } from "@/components/utils/constants";
import { Metadata } from "next";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

interface VersionData {
  title: string;
  description: string;
  version: string;
  url: string;
  lang: string;
}
interface VersionItem {
  id: number;
  title: string;
  description: string;
  date: string;
  version: string;
  customName?: string;
  image?: string;
}


function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}



function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { lang, version } = params;

  const apiUrl = "https://api.rgb.irpsc.com/api/calendar?type=version&page=1";

  const localeMap: Record<string, string> = {
    fa: "fa_IR",
    en: "en_US",
  };
  const locale = localeMap[lang] || "en_US";

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();

    const versions = Array.isArray(data.data)
      ? data.data.map((item: any) => ({
        title: item.title,
        description: truncateText(stripHtmlTags(item.description), 200),
        version: item.version_title,
        image: item.image_url || `https://rgb.irpsc.com/_next/image?url=%2Flogo.png&w=120&q=75`,
      }))
      : [];

    const currentVersion = versions.find((v: { version: string }) => v.version === version);

    if (!currentVersion) {
      return {
        title: "نسخه یافت نشد",
        description: "نسخه مورد نظر در دسترس نیست.",
        openGraph: {
          locale,
        },
      };
    }

    const title = `${currentVersion.title} - نسخه ${currentVersion.version}`;
    const description = currentVersion.description;

    const siteUrl = process.env.SITE_URL || "https://rgb.irpsc.com";
    const pageUrl = `${siteUrl}/${lang}/version/${encodeURIComponent(version)}`;
    const image = currentVersion.image;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: pageUrl,
        locale,
        type: "website",
        images: [
          {
            url: image,
            alt: title,
            width: 1200,
            height: 630,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
      alternates: {
        canonical: pageUrl,
        languages: {
          [lang]: pageUrl,
        },
      },
    };
  } catch (error) {
    console.error("generateMetadata Error:", error);
    return {
      title: "خطا در بارگذاری صفحه",
      description: "متاسفانه مشکلی در بارگذاری داده‌ها پیش آمد.",
      openGraph: {
        locale,
      },
    };
  }
}




export default async function VersionPage({ params }: { params: any }) {
  const [footerTabs, langData, langArray] = await Promise.all([
    getFooterData(params),
    getTranslation(params.lang),
    getLangArray(),
  ]);

  const mainData = await getMainFile(langData);

  const centralPageModal = await findByModalName(mainData, "central-page");
  const tabsMenu = await findByTabName(centralPageModal, "before-login");

  const staticMenuToShow = getStaticMenu(params.id);
  const updatedTabsMenu = tabsMenu.map((tab: any) => {
    let findInStatic = staticMenuToShow.find(
      (val) => tab.unique_id === val.unique_id
    );

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

  let versions: any = [];
  try {
    const response = await fetch(
      "https://api.rgb.irpsc.com/api/calendar?type=version&page=1",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`خطا در دریافت اطلاعات: ${response.statusText}`);
    }

    const data = await response.json();
    interface VersionItem {
      id: number;
      title: string;
      description: string;
      starts_at: string;
      version_title: string;
    }

    versions = Array.isArray(data.data)
      ? data.data.map((item: VersionItem, index: number) => ({
        id: item.id,
        title: item.title,
        description: item.description.trim(),
        date: item.starts_at.split(" ")[0],
        version: item.version_title,
        customName: `نسخه ${index + 1}`,
      }))
      : [];

  } catch (error) {
    console.error("خطا در دریافت داده از API:", error);
    versions = [];
  }
  {/* SCHEMA** */ }
  const versionSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": findByUniqueId(mainData, 256) || "نام نرم‌افزار یا پروژه",
    "url": `https://rgb.irpsc.com/${params.lang}/version/${encodeURIComponent(params.version || '')}`,
    "description": versions.length > 0
      ? stripHtmlTags(
        versions.find((v: VersionItem) => v.version === params.version)?.description || "صفحه نسخه‌های نرم‌افزار"
      )
      : "صفحه نسخه‌های نرم‌افزار",

    "author": {
      "@type": "Organization",
      "name": "RGB IRPSC"
    },
    "datePublished": versions.length > 0
      ? versions.find((v: VersionItem) => v.version === params.version)?.date || new Date().toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10),
    "softwareVersion": params.version || (versions.length > 0 ? versions[0].version : ""),
    "version": versions.map((v: VersionItem) => ({
      "@type": "CreativeWork",
      "name": v.title,
      "datePublished": v.date,
      "description": stripHtmlTags(v.description)

    })),
    "image": versions.length > 0
      ? versions.find((v: VersionItem) => v.version === params.version)?.image || "https://rgb.irpsc.com/_next/image?url=%2Flogo.png&w=120&q=75"
      : "https://rgb.irpsc.com/_next/image?url=%2Flogo.png&w=120&q=75",
      "applicationCategory": "GameApplication",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.6",  
        "ratingCount": "7",    
      }
  };
  {/*END SCHEMA** */ }



  return (
    <>
      {/* SCHEMA** */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(versionSchema) }}
      />
      {/* schema END */}

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
          <div className="px-12">
            <BreadCrumb params={params} />
          </div>
          <div className="mainContainer w-full lg:h-auto dark:bg-black flex flex-col gap-[10px] lg:flex-row lg:items-start lg:justify-between">
            <div className="centerItem w-full lg:px-7">
              <div className="self-center justify-between flex pt-8 w-full gap-8">
                <Version
                  versions={versions}
                  params={params}
                  mainData={mainData}
                  initialVersion={params.version || (versions.length > 0 ? versions[0].version : null)}
                />
              </div>
            </div>
          </div>
          <div className="w-full xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
            {/* <DynamicFooter footerTabs={footerTabs} mainData={mainData} /> */}
            <Footer footerTabs={footerTabs} mainData={mainData} />
          </div>
        </section>
      </div>
    </>
  );
}
