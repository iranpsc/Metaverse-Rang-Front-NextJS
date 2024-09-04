import DynamicFooter from "@/components/module/footer/DynamicFooter";
import {
  getTransletion,
  getMainFile,
  findByModalName,
  findByTabName,
  getAllCitizen,
  getFooterData,
} from "@/components/utils/actions";
import SearchComponent from "@/components/shared/SearchComponent";
import BreadCrumb from "@/components/shared/BreadCrumb";
import CitizenList from "@/components/templates/citizen/citizenList";

export default async function CitizensPage({
  params,
}: {
  params: { lang: "en" | "fa" };
}) {
  const footerTabs = await getFooterData(params);
  const langData = await getTransletion(params.lang);
  const mainData = await getMainFile(langData);

  const Citizenship = await findByModalName(mainData, "Citizenship-profile");
  const citizenListArrayContent = await findByTabName(
    Citizenship,
    "list-citizen"
  );
  // to find in an array with key(_name)
  function localFind(_name: any) {
    return citizenListArrayContent.find((item: any) => item.name == _name)
      ?.translation;
  }

  // ****
  const levelModals = await findByModalName(mainData, "levels");
  const levelListArrayContent = await findByTabName(levelModals, "level-list");

  // let allCitizenArray = await getAllCitizen("1");

  return (
    <>
      {/* Breadcrumb */}
      <BreadCrumb />
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
      <div className="flex flex-row flex-wrap justify-center md:justify-start w-full no-scrollbar overflow-y-auto py-[20px]">
        <CitizenList
          // allCitizenArray={allCitizenArray?.data}
          // lastPage={allCitizenArray.meta.to}
          levelListArrayContent={levelListArrayContent}
          params={params}
          citizenListArrayContent={citizenListArrayContent}
        />
      </div>

      <div className="flex flex-col justify-center items-center">
        <DynamicFooter footerTabs={footerTabs} />
      </div>
    </>
  );
}
