import {
  getTranslation,
  getMainFile,
  getLangArray,
} from "@/components/utils/actions";
import BreadCrumb from "@/components/shared/BreadCrumb";
// import { WhatsAppIcon, ContactDownArrow } from "@/components/svgs";
import Form from "./components/form";
// import Social from "./components/social";
import CommunicationRoutes from "./components/CommunicationRoutes";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import CustomErrorPage from "@/components/shared/CustomErrorPage";
import CleanAutoRetryParam from "@/components/shared/CleanAutoRetryParam";
// SEO**
export async function generateMetadata({ params }: any) {
  try {
    return {
      title: params.lang.toLowerCase() == "fa" ? "تماس با ما" : "Contact Us",
      description:
        params.lang.toLowerCase() == "fa"
          ? "ما در متاورس رنگ معتقدیم که توسعه این دنیای موازی و مجازی تنها با مشارکت و همفکری عمومی امکان‌پذیر است. زیرساخت‌های این جهان بر پایه‌ی واحد حدتاثیر بنا شده‌اند تا بتوانند نظرات و ایده‌های شما را به بهترین شکل در مسیر توسعه هدایت کنند. ارتباط با انجمن متاورس ایران و دانشگاه متاورس ایران از طریق این پلتفرم به راحتی امکان‌پذیر است."
          : "We at Metaverse Rang believe that the development of this parallel and virtual world is only possible with public participation and consensus. The infrastructure of this world is built on the basis of the Haddtashtir unit so that it can best guide your opinions and ideas on the path of development. Communication with the Iranian Metaverse Association and the Iranian Metaverse University is easily possible through this platform.",
      openGraph: {
        type: "website",
        title: params.lang.toLowerCase() == "fa" ? "تماس با ما" : "Contact Us",
        description:
          params.lang.toLowerCase() == "fa"
            ? "ما در متاورس رنگ معتقدیم که توسعه این دنیای موازی و مجازی تنها با مشارکت و همفکری عمومی امکان‌پذیر است. زیرساخت‌های این جهان بر پایه‌ی واحد حدتاثیر بنا شده‌اند تا بتوانند نظرات و ایده‌های شما را به بهترین شکل در مسیر توسعه هدایت کنند. ارتباط با انجمن متاورس ایران و دانشگاه متاورس ایران از طریق این پلتفرم به راحتی امکان‌پذیر است."
            : "We at Metaverse Rang believe that the development of this parallel and virtual world is only possible with public participation and consensus. The infrastructure of this world is built on the basis of the Haddtashtir unit so that it can best guide your opinions and ideas on the path of development. Communication with the Iranian Metaverse Association and the Iranian Metaverse University is easily possible through this platform.",
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
  } catch (error) {
    console.error("❌ Metadata error (LevelsPage):", error);

    return {
      title: "خطا",
      description: "مشکلی در بارگذاری صفحه رخ داده است",
    };
  }
}

export default async function AboutPage({ params }: any) {
  try {
    // const langArray = await getLangArray();
    const langData = await getTranslation(params.lang);
    const mainData = await getMainFile(langData);


    const aboutSchema = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: findByUniqueId(mainData, 260),
      description:
        findByUniqueId(mainData, 1535),
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
        // globalLocationNumber: "1234567890", // Replace with actual GLN
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
        maps: "https://maps.app.goo.gl/63ayLgtcRGZEBhmf7",
        // Fax Number (if applicable)
        faxNumber: "+02833647125",
        image: "https://rgb.irpsc.com/_next/image?url=%2Flogo.png&w=128&q=75",
        address: {
          "@type": "PostalAddress",
          streetAddress: "میرداماد، 824H+JG2",
          addressLocality: "قزوین",
          addressRegion: "استان قزوین",
          addressCountry: "ایران",
        },
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
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+989301916023",
            "contactType": findByUniqueId(mainData, 1536),
            "availableLanguage": ["Persian", "English"]
          },
          {
            "@type": "ContactPoint",
            "telephone": "+0989370820120",
            "contactType": findByUniqueId(mainData, 1538),
            "availableLanguage": ["Persian", "English"]
          },
          {
            "@type": "ContactPoint",
            "telephone": "+989337850575",
            "contactType": findByUniqueId(mainData, 1540),
            "availableLanguage": ["Persian", "English"]
          },
          {
            "@type": "ContactPoint",
            "telephone": "+989337850445",
            "contactType": findByUniqueId(mainData, 1542),
            "availableLanguage": ["Persian", "English"]
          },
          {
            "@type": "ContactPoint",
            "telephone": "+989337850435",
            "contactType": findByUniqueId(mainData, 1544),
            "availableLanguage": ["Persian", "English"]
          },
        ],


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
          <CleanAutoRetryParam />
          <section
            // id={`${
            //   themeDataActive == "dark" ? "dark-scrollbar" : "light-scrollbar"
            // }`}
            className={` relative mt-[60px] lg:mt-0`}
          >
            {/* Breadcrumb */}
            <div className="px-12">
              <BreadCrumb params={params} />
            </div>
            <section className="mx-auto px-3 lg:px-9">
              <h1 className="font-rokh font-bold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] text-center dark:text-white mt-[64px] mb-[16px]">
                {findByUniqueId(mainData, 1536)}
              </h1>
              <div className="flex flex-col gap-10 ">
                <div>
                  <p className="text-lightGray  dark:text-lightGray font-azarMehr font-normal text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] text-center px-5 lg:px-10">
                    {findByUniqueId(mainData, 1535)}
                  </p>
                </div>
              </div>
              <div>
                <div className="w-full mt-[60px] "> <CommunicationRoutes params={params} mainData={mainData} /></div>
                <div className="text-center mx-auto text-xl md:text-2xl space-y-2 mt-7 md:my-14">
                  <p className="font-rokh font-bold dark:text-white text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px]"> {findByUniqueId(mainData, 260)}</p>
                  <p className="text-lightGray  text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] px-5"> {findByUniqueId(mainData, 1551)}</p>
                </div>
                <main className="overflow-x-hidden w-full bg-white dark:bg-[#1A1A18] rounded-xl dark:text-white py-5 px-2 md:px-4 lg:p-7 mt-7">
                  <div className="flex-col flex gap-7 lg:flex-row w-full">
                    <div className="flex flex-col gap-2 md:gap-7 w-full lg:w-1/2 justify-center lg:justify-start">
                      <div>
                        <p
                          className={`${params.lang.toLowerCase() == "fa"
                            ? "lg:text-right"
                            : "lg:text-left"
                            } text-darkGray dark:text-Field py-1 text-center text-sm md:text-base pb-4 md:pb-0`}
                        >
                          {findByUniqueId(mainData, 1552)}
                        </p>
                      </div>
                      <div>
                        <Form lang={params.lang} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-7 w-full lg:w-1/2 justify-center lg:justify-start w-full">
                      <div className="flex flex-col md:flex-row md:flex-wrap w-full items-center justify-between gap-6 ">
                      </div>
                      <div className="aspect-[5/3] w-full md:mt-[32px]">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12860.972378290073!2d50.0287883!3d36.3064114!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8b5551db33af95%3A0xa19dc982418e7204!2sMetaRgb!5e0!3m2!1sen!2s!4v1732341818636!5m2!1sen!2s"
                          style={{ border: "0" }}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="w-full h-full rounded-xl dark:invert dark:brightness-95 dark:hue-rotate-180"
                          title={
                            params.lang.toLowerCase() == "fa" ? "نقشه" : "map"
                          }
                        ></iframe>
                      </div>
                    </div>
                  </div>
                  {/* <div className="w-full h-[1px] bg-dark-newColors-shades-100 mt-[38px] mb-[28px]"></div>
                <div className="flex justify-center gap-[5px]">

                </div> */}
                </main>
              </div>
            </section>
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

    console.error("❌ Error in EductionPage:", serializedError);

    return <CustomErrorPage error={serializedError} />;
  }
}
