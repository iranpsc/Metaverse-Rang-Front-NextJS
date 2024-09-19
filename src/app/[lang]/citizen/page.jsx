import DynamicFooter from "@/components/module/footer/DynamicFooter";
import {
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,
  getAllCitizen,
  getFooterData,
} from "@/components/utils/actions";
import SearchComponent from "@/components/shared/SearchComponent";
import BreadCrumb from "@/components/shared/BreadCrumb";
import CitizenList from "@/components/templates/citizen/citizenList";

// SEO**
export async function generateMetadata({ params }) {
  const langData = await getTranslation(params.lang);
  console.log("langData", langData);

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

  return {
    title: localFind("citizens of the metaverse"),
    description: localFind("description citizen list"),
    openGraph: {
      // type: 'article',
      // url: `https://yourwebsite.com/posts/${params.id}`,
      title: localFind("citizens of the metaverse"),
      description: localFind("description citizen list"),
      locale: params.code == "fa" ? "fa_IR" : "en_US",
      // site_name: متاورس رنگ,
      url: "",
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

  const Citizenship = await findByModalName(mainData, "Citizenship-profile");
  const citizenListArrayContent = await findByTabName(
    Citizenship,
    "list-citizen"
  );

  console.log("citizenListArrayContent", citizenListArrayContent);

  // to find in an array with key(_name)
  function localFind(_name) {
    return citizenListArrayContent.find((item) => item.name == _name)
      ?.translation;
  }

  // ****
  const levelModals = await findByModalName(mainData, "levels");
  const levelListArrayContent = await findByTabName(levelModals, "level-list");

  let allCitizenArray = await getAllCitizen("1");

  const citizenListSchema = {
    "@context": "https://schema.org/",
    "@type": "ProfessionalService",
    "name": `${localFind('citizens of the metaverse')}`,
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
    "description": localFind('description citizen list'),
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

      {/* Breadcrumb */}
      <BreadCrumb params={params} />
      <div className="">
        <h2 className="font-rokh font-bold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] text-center dark:text-white mt-[64px] mb-[16px]">
          {localFind("citizens of the metaverse")}
        </h2>
        <p className="text-lightGrey dark:text-lightGray font-azarMehr font-normal text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] text-center text-justify">
          {localFind("description citizen list")}
        </p>
        <div className="flex justify-center w-full">
          <SearchComponent
            citizenListArrayContent={citizenListArrayContent}
            params={params}
          />
          {""}
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

      <div className="">
        <DynamicFooter footerTabs={footerTabs} />
      </div>
    </>
  );
}
