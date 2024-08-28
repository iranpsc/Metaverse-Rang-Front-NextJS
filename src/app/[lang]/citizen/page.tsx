import { Text } from "@/components/svgs/SvgEducation";
import { translateFooter } from "@/components/utils/education";
import DynamicFooter from "@/components/module/footer/DynamicFooter";
import Link from "next/link";
import {
  getTransletion,
  getMainFile,
  findByModalName,
  findByTabName,
  getAllCitizen,
  getFooterData,
} from "@/components/utils/actions";
import GemImage from "@/components/templates/citizen/gemImage";
import SearchComponent from "@/components/shared/SearchComponent";

export default async function CitizensPage({
  params,
}: {
  params: { lang: "en" | "fa" };
}) {
  const footerTabs = await getFooterData(params);
  const langData = await getTransletion(params.lang);
  const mainData = await getMainFile(langData);

  // find specific modal
  const Citizenship = await findByModalName(mainData, "Citizenship-profile");
  // const Citizenship = await findByModalName(mainData, "Citizenship-profile");

  // find inside modal and return its fields(result is array)
  const citizenListArrayContent = await findByTabName(
    Citizenship,
    "list-citizen"
  );

  // to find in an array with key(_name)
  function localFind(_name: any) {
    return citizenListArrayContent.find((item: any) => item.name == _name)
      ?.translation;
  }

  const allCitizenArray = await getAllCitizen();

  return (
    <>
      <div className="px-5">
        <h2 className="font-rokh font-bold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] text-center dark:text-white mt-[64px] mb-[16px]">
          {localFind("citizens of the metaverse")}
        </h2>
        <p className="text-lightGrey dark:text-white font-azarMehr font-normal text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] text-center">
          {localFind("description citizen list")}
        </p>
        <div className="flex justify-center w-full">
          <SearchComponent
            citizenListArrayContent={citizenListArrayContent}
            params={params}
          />{" "}
        </div>
      </div>
      {/* CITIZEN box Container */}
      <div className="flex flex-row flex-wrap justify-evenly w-full no-scrollbar overflow-y-auto py-[20px]">
        {allCitizenArray.map((item: any) => (
          <div className="w-[280px] sm:w-1/3 lg:w-1/4 2xl:w-1/5 3xl:w-1/6 hover:scale-105 base-transition-1 mx-3">
            <div
              key={item.id}
              className="cursor-pointer shadow-lg mt-10 relative bg-[#fff] dark:bg-[#1A1A18] flex flex-col justify-between gap-1 sm:gap-3 py-3 sm:py-4 md:py-5 items-center rounded-[20px]"
            >
              <img
                src={item.profile_photo || "/temp.png"}
                alt={"citizen image"}
                width={120}
                height={120}
                loading="lazy"
                className="w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] shadow-md transition-all duration-300 shadow-gray rounded-full"
              />
              <p
                // data-atropos-offset="-5"
                className="font-bold text-[14px] sm:text-16 md:text-[18px] 2xl:text-[20px] dark:text-white font-azarMehr sm:mt-2"
              >
                {item.name}
              </p>

              {/* <Link
              href={`https://rgb.irpsc.com/${params.lang}/citizen/${item.code}`}
              target="_blank"
            > */}
              <span
                // data-atropos-offset="-1"
                className="text-blueLink font-medium font-azarMehr text-[12px] sm:text-[16px]"
              >
                {item.code}
              </span>
              {/* </Link> */}

              <span className="dark:text-[#969696] text-[12px] sm:text-[14px] md:text-[16px] 2xl:text-[18px]">
                سطح توسعه دهنده
              </span>

              <div className="w-full overflow-auto no-scrollbar">
                <div className="w-fit flex m-auto">
                  {item.levels?.previous?.map((item: any) => (
                    <GemImage item={item} />
                  ))}
                </div>
              </div>
              <Link
                href={`/${params.lang}/citizen/${item.code}`}
                className="w-[80%]"
              >
                <div
                  // data-atropos-offset="5"
                  className="w-full h-[40px] sm:h-[50px] md:h-[55px] bg-[#f5f9ff] dark:bg-[#000000] px-3 sm:px-6 rounded-[10px] flex flex-row justify-between items-center"
                >
                  <span className="text-blueLink dark:text-dark-yellow font-azarMehr font-medium text-[10px] sm:text-[14px]">
                    {translateFooter(citizenListArrayContent, "citizen page")}
                  </span>

                  <Text className="w-[14px] h-[14px] sm:w-[24px] sm:h-[24px] stroke-blueLink dark:stroke-dark-yellow" />
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col justify-center items-center">
        <DynamicFooter footerTabs={footerTabs} />
      </div>
    </>
  );
}
