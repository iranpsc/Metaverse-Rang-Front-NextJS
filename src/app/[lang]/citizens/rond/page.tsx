
import {
  getTranslation,
  getMainFile,
  findByModalName,
  findByTabName,

  getLangArray
} from "@/components/utils/actions";
import SearchComponent from "@/components/shared/SearchComponent";
import BreadCrumb from "@/components/shared/BreadCrumb";
import useServerDarkMode from "src/hooks/use-server-dark-mode";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

import FreeId from "./components/FreeId";
// SEO**
export async function generateMetadata({ params }: { params: { lang: string } }) {
  const langData = await getTranslation(params.lang);

  const mainData = await getMainFile(langData);
  

  const Citizenship = await findByModalName(mainData, "Citizenship-profile");
  const citizenListArrayContent = await findByTabName(
    Citizenship,
    "list-citizen"
  );


  //to make description less than 200 character
  async function makeLessCharacter(){
    let temp = findByUniqueId(mainData, 596)
    return await temp.slice(0,200)
  }

  return {
    title: findByUniqueId(mainData, 1484),
    description: await makeLessCharacter(),
    openGraph: {
      type: 'website',
      // url: `https://rgb.irpsc.com/posts/${params.id}`,
      title: findByUniqueId(mainData, 593),
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

export default async function RounPage({ params }: { params: { lang: string } }) {
  const [ langData, langArray] = await Promise.all([

  getTranslation(params.lang), 
  getLangArray(),
]);
  
  const mainData = await getMainFile(langData);
  const defaultTheme = useServerDarkMode();


 



  

  return (
    <>
      {/* SCHEMA** */}
     
      <div className=" w-full" dir={langData.direction}>

        <section
          className={`w-full mt-[60px] lg:mt-0 lg:pt-0 bg-[#f8f8f8] dark:bg-black bg-opacity20`}
        >
          {/* Breadcrumb */}
          <div className="xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
              <BreadCrumb params={params} />
            </div>
          <div className="mt-[60px] lg:mt-[40px] xl:px-32 lg:px-32 md:px-5 sm:px-5 xs:px-1">
            <h1 className="font-rokh font-bold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] text-center dark:text-white mt-[64px] mb-[16px]">
              {findByUniqueId(mainData, 1484)}
            </h1>
            <p className="text-lightGray  dark:text-lightGray font-azarMehr font-normal text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] text-center px-5 lg:px-10">
              {findByUniqueId(mainData, 596)}
            </p>
            <div className="flex justify-center w-full px-5 lg:px-0">
              <SearchComponent
                searchLevel='citizen'
                mainData={mainData}
                params={params}
              />
            </div>
          </div>
          <div>
            <FreeId/>
          </div>
   

        
        </section>
      </div>
    </>
  );
}
