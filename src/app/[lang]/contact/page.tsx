import {
  getAllLevels,
  getFooterData,
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getLangArray,
} from "@/components/utils/actions";
import DynamicFooter from "@/components/module/footer/DynamicFooter";
import SideBar from "@/components/module/sidebar/SideBar";
import useServerDarkMode from "src/hooks/use-server-dark-mode";
import BreadCrumb from "@/components/shared/BreadCrumb";
import { staticMenuToShow as MenuStaticData } from "@/components/utils/constants";
import { WhatsAppIcon, ContactDownArrow } from "@/components/svgs";
import Form from "./components/form";
import Social from "./components/social";

// SEO**
export async function generateMetadata({ params }: any) {
  return {
    openGraph: {
      type: "website",
      title: params.lang.toLowerCase() == "fa" ? "تماس با ما" : "Contact Us",
      description:
        params.lang.toLowerCase() == "fa"
          ? "ما در متاورس رنگ معتقدیم که توسعه این دنیای موازی و مجازی تنها با مشارکت و همفکری عمومی امکان‌پذیر است. زیرساخت‌های این جهان بر پایه‌ی واحد حدتاثیر بنا شده‌اند تا بتوانند نظرات و ایده‌های شما را به بهترین شکل در مسیر توسعه هدایت کنند. ارتباط با انجمن متاورس ایران و دانشگاه متاورس ایران از طریق این پلتفرم به راحتی امکان‌پذیر است."
          : "",
      url: `https://rgb.irpsc.com/${params.lang}/contact`,
      images: [
        {
          url: "/team.jpg",
          width: 800,
          height: 600,
          alt: "تیم متاورس رنگ",
        },
      ],
      locale: params.lang.toLowerCase() == "fa" ? "fa_IR" : "en_US",
    },
  };
}

export default async function AboutPage({ params }: any) {
  function convertPersianToEnglishNumber(slug: any) {
    // Replace Persian/Arabic digits with English digits using regex
    return Number(
      slug.replace(/[۰-۹]/g, (char: any) => char.charCodeAt(0) - 1776)
    );
  }

  const defaultTheme = useServerDarkMode();

  const levelArray = await getAllLevels();

  // convert persian digit to eng digit in DATA
  levelArray.forEach((item: any) => {
    item.slug = convertPersianToEnglishNumber(item.slug);
  });

  const footerTabs = await getFooterData(params);

  const langArray = await getLangArray();

  const langData = await getTranslation(params.lang);
  const mainData = await getMainFile(langData);

  const centralPageModal = await findByModalName(mainData, "central-page");
  const tabsMenu = await findByTabName(centralPageModal, "before-login");

  const Citizenship = await findByModalName(mainData, "Citizenship-profile");
  const citizenListArrayContent = await findByTabName(
    Citizenship,
    "list-citizen"
  );

  const levelModals = await findByModalName(mainData, "levels");
  const levelListArrayContent = await findByTabName(levelModals, "level-list");

  function localFind1(_name: any) {
    return citizenListArrayContent.find((item: any) => item.name == _name)
      ?.translation;
  }
  function localFind2(_name: any) {
    return levelListArrayContent.find((item: any) => item.name == _name)
      ?.translation;
  }

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
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: params.lang.toLowerCase() === "fa" ? "تماس با ما" : "Contact Us",
    description:
      params.lang.toLowerCase() === "fa"
        ? "ما در متاورس رنگ معتقدیم که توسعه این دنیای موازی و مجازی تنها با مشارکت و همفکری عمومی امکان‌پذیر است. زیرساخت‌های این جهان بر پایه‌ی واحد حدتاثیر بنا شده‌اند تا بتوانند نظرات و ایده‌های شما را به بهترین شکل در مسیر توسعه هدایت کنند. ارتباط با انجمن متاورس ایران و دانشگاه متاورس ایران از طریق این پلتفرم به راحتی امکان‌پذیر است."
        : "", // Add English description if needed
    url: `https://rgb.irpsc.com/${params.lang}/contact`,

    contentLocation: {
      "@type": "Place",
      // Name of the location (e.g., Organization name)
      name: "Metaverse Rang",
      // Alternate Name (e.g., other business or location name)
      alternateName: "Metaverse Rang Headquarters",
      // URL that points to the same entity
      sameAs: "https://rgb.irpsc.com",
      // Global Location Number (use a valid GLN if you have one)
      globalLocationNumber: "1234567890", // Replace with actual GLN
      // Maximum Attendee Capacity (could be used for events or location capacity)
      maximumAttendeeCapacity: 100, // This is an example; replace with actual number
      // Map URL for location
      map: "https://www.google.com/maps?q=میرداماد،+824H+JG2,+قزوین",
      // Branch Code (if applicable, e.g., for sub-branches)
      branchCode: "RGB-QV01",
      // Telephone associated with the content location (branch or office)
      telephone: "+02833647125",
      // ISIC V4 code (International Standard Industry Classification)
      isicV4: "6201", // Example, you can replace with the appropriate ISIC code for your business
      // Slogan for your company/organization
      slogan: "Transforming the Virtual World Together",
      // Maps to (provide a URL pointing to a map, could be a digital map link)
      maps: "https://www.google.com/maps?q=میرداماد،+824H+JG2,+قزوین",
      // Fax Number (if applicable)
      faxNumber: "+02833647126",
    },

    mainEntity: {
      "@type": "Organization",
      // Postal Address
      address: {
        "@type": "PostalAddress",
        streetAddress: "میرداماد، 824H+JG2",
        addressLocality: "قزوین",
        addressRegion: "استان قزوین",
        addressCountry: "ایران",
      },

      // Contact Point (Customer Service)
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+989120820120",
        contactType: "customer service",
        availableLanguage: ["Persian", "English"],
      },
    },

    // Optional: General contact number
    telephone: "+02833647125",
  };

  return (
    <>
      {/* SCHEMA** */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutSchema),
        }}
      />
      <div className={`flex`} dir={langData.direction}>
        <SideBar
          langArray={langArray}
          langData={langData}
          tabsMenu={tabsMenu}
          defaultTheme={defaultTheme}
          params={params}
          pageSide="citizen"
        />
        <section
          // id={`${
          //   themeDataActive == "dark" ? "dark-scrollbar" : "light-scrollbar"
          // }`}

          className={`h-[calc(100vh-60px)] lg:h-screen overflow-y-auto relative light-scrollbar dark:dark-scrollbar mt-[60px] lg:mt-0`}
        >
          {/* Breadcrumb */}
          <div className="px-12">
            <BreadCrumb params={params} />
          </div>
          <section className="mx-auto px-4 lg:px-9">
            <h1 className="font-rokh font-bold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] text-center dark:text-white mt-[64px] mb-[16px]">
              تماس با ما
            </h1>
            <div className="flex flex-col gap-10 ">
              <div>
                <h3 className="dark:text-white text-black text-lg md:text-2xl font-bold font-rohk">
                  تماس با ما - متاورس رنگ (متارنگ)
                </h3>
                <p className="text-lightGray font-medium text-justify text-sm md:text-lg mt-5 leading-10">
                  ما در متاورس رنگ معتقدیم که توسعه این دنیای موازی و مجازی تنها
                  با مشارکت و همفکری عمومی امکان‌پذیر است. زیرساخت‌های این جهان
                  بر پایه‌ی واحد حدتاثیر بنا شده‌اند تا بتوانند نظرات و ایده‌های
                  شما را به بهترین شکل در مسیر توسعه هدایت کنند. ارتباط با انجمن
                  متاورس ایران و دانشگاه متاورس ایران از طریق این پلتفرم به
                  راحتی امکان‌پذیر است. همچنین، شما می‌توانید با تیم پیشرو در
                  توسعه زیرساخت‌های مشارکت همگانی در ارتباط باشید تا با
                  هم‌افزایی و همکاری، آینده‌ای بهتر برای این جهان مجازی بسازیم.
                  نظرات و پیشنهادات شما، نیروی محرکه‌ی این تحول عظیم است و به ما
                  در ایجاد جهانی بهتر و نوآورانه کمک می‌کند.
                </p>
              </div>
            </div>
            <div>
              <main className="overflow-x-hidden w-[85%] m-auto bg-white dark:bg-[#1A1A18] rounded-xl dark:text-white p-5 lg:p-7 mt-10">
                <h1 className="text-lg md:text-xl text-black dark:text-white font-bold py-5 text-center lg:text-right">
                  تماس باما
                </h1>

                <div className="flex-col flex gap-7 lg:flex-row w-full">
                  <div className="flex flex-col gap-2 md:gap-7 w-full lg:w-1/2 justify-center lg:justify-start">
                    <div>
                      <p className="text-darkGray dark:text-Field py-1 text-center lg:text-right text-sm md:text-base">
                        پیام شما میتواند شروع یک مکالمه سازنده باشد.
                      </p>
                    </div>

                    <div>
                      <Form />
                    </div>
                  </div>
                  <div className="flex flex-col gap-7 w-full lg:w-1/2 justify-center lg:justify-start ">
                    <div className="flex flex-col lg:flex-row lg:flex-wrap w-full items-center justify-between gap-6 ">
                      <div className="flex gap-3">
                        <WhatsAppIcon width={27} height={27} />
                        <a
                          className="font-bold text-2xl leading-[40px] text-black dark:text-light-newColors-shades-bg2 font-rokh"
                          href="tel:۰۹۳۳۷۸۵۰۴۲۴"
                        >
                          ۰۹۳۳۷۸۵۰۴۲۴
                        </a>
                      </div>
                      <div className="flex gap-3 text-center lg:text-right">
                        <a
                          className="text-light-newColors-shades-50 dark:text-white font-medium text-[16px] md:text-[25px] leading-[32px] font-rokh"
                          href="mailto:3dmeta.irpsc@gmail.com"
                        >
                          3dmeta.irpsc@gmail.com
                        </a>
                        <ContactDownArrow width={27} height={27} />
                      </div>
                    </div>
                    <div className="aspect-[5/4]">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12860.972378290073!2d50.0287883!3d36.3064114!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8b5551db33af95%3A0xa19dc982418e7204!2sMetaRgb!5e0!3m2!1sen!2s!4v1732341818636!5m2!1sen!2s"
                        style={{ border: "0" }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full"
                      ></iframe>
                    </div>
                  </div>
                </div>
                <div className="w-full h-[1px] bg-dark-newColors-shades-100 mt-[38px] mb-[28px]"></div>
                <div className="flex flex-wrap justify-center gap-[5px]">
                  <Social />
                </div>
              </main>
            </div>
          </section>
          <div className="lg:px-32 md:px-5 sm:px-5 xs:px-1">
            <DynamicFooter footerTabs={footerTabs} />
          </div>
        </section>
      </div>
    </>
  );
}
