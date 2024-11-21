import DynamicFooter from "@/components/module/footer/DynamicFooter";
import {
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getAllCitizen,
  getFooterData,
  getLangArray
} from "@/components/utils/actions";
import SearchComponent from "@/components/shared/SearchComponent";
import BreadCrumb from "@/components/shared/BreadCrumb";
import SideBar from "@/components/module/sidebar/SideBar";
import CitizenList from "@/components/templates/citizen/citizenList";
import useServerDarkMode from "src/hooks/use-server-dark-mode";
import { staticMenuToShow as MenuStaticData } from "@/components/utils/constants";

// SEO**
export async function generateMetadata({ params }) {
  const langData = await getTranslation(params.lang);

  const mainData = await getMainFile(langData);
  // const centralPageModal = await findByModalName(mainData, "central-page");
  // const firstPageArrayContent = await findByTabName(
  //   centralPageModal,
  //   "first-page"
  // );

  const Citizenship = await findByModalName(mainData, "Citizenship-profile");
  const citizenListArrayContent = await findByTabName(
    Citizenship,
    "list-citizen"
  );
  // to find in an array with key(_name)
  function localFind(_name) {
    return citizenListArrayContent.find((item) => item.name == _name)
      ?.translation;
  }

  //to make description less than 200 character
  async function makeLessCharacter(){
    let temp = await localFind("description citizen list")
    temp = temp.slice(0,200)
    return temp
  }

  return {
    title: await localFind("citizens of the metaverse"),
    description: await makeLessCharacter(),
    openGraph: {
      type: 'website',
      // url: `https://yourwebsite.com/posts/${params.id}`,
      title: await localFind("citizens of the metaverse"),
      description: await makeLessCharacter(),
      locale: params.lang == "fa" ? "fa_IR" : "en_US",
      // site_name: متاورس رنگ,
      url: `https://rgb.irpsc.com/${params.lang}/citizen`,
      images: [
        {
          url: "/logo.png",
          width: 800,
          height: 600,
          // alt: post.title,
        },
      ],
    },
    // twitter: {
    //   card: 'summary_large_image',
    //   title: post.title,
    //   description: post.description,
    //   images: [post.imageUrl],
    // },
  };
}

export default async function CitizensPage({ params }) {
  const footerTabs = await getFooterData(params);
  const langData = await getTranslation(params.lang);
  const mainData = await getMainFile(langData);
  const langArray = await getLangArray();
  const defaultTheme = useServerDarkMode();


  const Citizenship = await findByModalName(mainData, "Citizenship-profile");
  const citizenListArrayContent = await findByTabName(
    Citizenship,
    "list-citizen"
  );


  // to find in an array with key(_name)
  function localFind(_name) {
    return citizenListArrayContent.find((item) => item.name == _name)
      ?.translation;
  }

  // ****
  const levelModals = await findByModalName(mainData, "levels");
  const levelListArrayContent = await findByTabName(levelModals, "level-list");

  let allCitizenArray = await getAllCitizen("1");

  //to make description less than 200 character
  async function makeLessCharacter(){
    let temp = await localFind("description citizen list")
    temp = temp.slice(0,200)
    return temp
  }
  
  const centralPageModal = await findByModalName(mainData, "central-page");
  const tabsMenu = await findByTabName(centralPageModal, "before-login");

  const staticMenuToShow = MenuStaticData;

  // add staticMenuToShow values to siblings tabsMenu values
  tabsMenu.forEach((tab) => {
    let findInStatic = staticMenuToShow.find((val) => tab.name == val.name);
    if (findInStatic) {
      tab.url = findInStatic.url;
      tab.order = findInStatic.order;
      tab.toShow = true;
    }
  });

  const citizenListSchema = {
    "@context": "https://schema.org/",
    "@type": "ProfessionalService",
    "name": `${await makeLessCharacter()}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "میرداماد، 824H+JG2",
      "addressCountry": "ایران",
      "addressRegion": "استان قزوین",
      "addressLocality": "قزوین"
    },
    "image": 'https://rgb.irpsc.com/logo.png',
    "telephone": "09120820120",
    "url": `https://rgb.irpsc.com/${params.lang}/citizen`,
    "logo": `https://rgb.irpsc.com/logo.png`,
    "email": "info@rgb.irpsc.com",
    "description": await makeLessCharacter(),
    "alternateName": "MetaRGB"
  }

  return (
    <>
      {/* SCHEMA** */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(citizenListSchema),
        }}
      />
      <div className="flex h-screen overflow-hidden" dir={langData.direction}>
        <SideBar
          tabsMenu={tabsMenu}
          langData={langData}
          langArray={langArray}
          defaultTheme={defaultTheme}
          params={params}
          pageSide="citizen"
        />
        <section
          className={`overflow-y-auto relative light-scrollbar dark:dark-scrollbar mt-[60px] lg:mt-0 lg:pt-0 bg-[#f8f8f8] dark:bg-black bg-opacity20`}
        >
          {/* Breadcrumb */}
          <div className="px-12">
              <BreadCrumb params={params} />
            </div>
          <div className="mt-[60px] lg:mt-[40px] xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
            <h2 className="font-rokh font-bold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] text-center dark:text-white mt-[64px] mb-[16px]">
              {localFind("citizens of the metaverse")}
            </h2>
            <p className="text-lightGray dark:text-lightGray font-azarMehr font-normal text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] text-center text-justify">
              {localFind("description citizen list")}
            </p>
            <div className="flex justify-center w-full">
              <SearchComponent
                citizenListArrayContent={citizenListArrayContent}
                params={params}
              />
            </div>
          </div>
          {/* CITIZEN box Container */}
          <div className="flex flex-row flex-wrap justify-center md:justify-center w-full no-scrollbar overflow-y-auto py-[20px]">
            <CitizenList
              allCitizenArray={allCitizenArray.data}
              // lastPage={allCitizenArray.meta.to}
              levelListArrayContent={levelListArrayContent}
              params={params}
              citizenListArrayContent={citizenListArrayContent}
            />
          </div>

          <div className="xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
            <DynamicFooter footerTabs={footerTabs} />
          </div>
        </section>
      </div>
    </>
  );
}
