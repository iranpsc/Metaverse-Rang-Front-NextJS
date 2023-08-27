import { useContext } from "react";
import Image from "next/image";
import { LangContext } from "@/components/context/LangContext";
import { targetData } from "@/components/utils/targetDataName";
import  ModalCard  from "@/components/templates/ModalCard";

export default function ProfileDetails({ setShowModal }:any) {
  const { selectedProfileData, profileData } = useContext(LangContext);

  const itemsProfileDetails = [
    {
      id: 1,
      key: targetData(selectedProfileData, "date of birth"),
      value: profileData?.kyc?.birth_date,
    },
    {
      id: 2,
      key: targetData(selectedProfileData, "phone number"),
      value: "091278555049",
    },
    {
      id: 3,
      key: targetData(selectedProfileData, "email"),
      value: profileData?.kyc?.email,
    },
    {
      id: 4,
      key: targetData(selectedProfileData, "address"),
      value: profileData?.kyc?.address,
    },
    {
      id: 5,
      key: targetData(selectedProfileData, "job"),
      value: "Developer",
    },
    {
      id: 6,
      key: targetData(selectedProfileData, "education"),
      value: "Student",
    },
  ];

  const itemsInterestedProfileDetails = [
    {
      id: 1,
      key: targetData(selectedProfileData, "i love this city"),
      value: profileData?.customs?.loved_city,
    },
    {
      id: 2,
      key: targetData(selectedProfileData, "i am interested in this country"),
      value: profileData?.customs?.loved_country,
    },
    {
      id: 3,
      key: targetData(selectedProfileData, "i am interested in this language"),
      value: profileData?.customs?.loved_language,
    },
  ];
  return (
    <div className=" flex flex-col justify-between xl:gap-0 lg:gap-2 h-full max-md:h-fit max-md:gap-3">
      <section className="dark:bg-dark-background xl:basis-0 lg:basis-2/5 md:basis-2/4 flex flex-col justify-evenly items-center max-md:gap-4 transition-all duration-300 ease-linear bg-white w-full rounded-md pb-5 lg:pb-3">
        {itemsProfileDetails.map((item: any): any => (
          <div
            key={item.id}
            className="flex flex-nowrap px-3 py-[3px] xl:mt-3 lg:mt-3  justify-between w-full items-center "
          >
            <p className="font-azarMehr font-medium xl:text-sm lg:text-[12px] md:text-[11px] break-all text-gray">
              {item.key}
            </p>
            <hr className="xl:w-[30%] lg:w-[30%] md:w-[20%] h-[1px] border border-dashed text-lightGray dark:text-dark-lightWhite" />
            <p className="dark:text-dark-gray font-azarMehr font-medium  xl:text-sm lg:lg:text-[12px] md:text-[11px] break-all text-black">
              {item.value}
            </p>
          </div>
        ))}
      </section>

      <section className="dark:bg-dark-background lg:basis-3/12 md:basis-2/12 flex flex-col justify-evenly max-md:gap-4 transition-all duration-300 ease-linear bg-white w-full rounded-md">
        {itemsInterestedProfileDetails.map((item: any): any => (
          <div
            key={item.id}
            className="flex flex-nowrap px-3 py-[6px] xl:mt-3 lg:mt-1 xl:mb-3 lg:mb-0 md:mt-0 md:mb-0 justify-between items-center "
          >
            <p className="font-azarMehr font-medium  xl:text-sm lg:text-[12px] md:text-[12px] break-all text-gray">
              {item.key}
            </p>
            <hr className="xl:w-[20%] lg:w-[20%] md:w-[15%] h-[1px] border border-dashed  text-lightGray dark:text-dark-lightWhite" />
            <p className="dark:text-dark-gray font-azarMehr font-medium  xl:text-sm lg:text-[12px] md:text-[11px] break-all text-black">
              {item.value}
            </p>
          </div>
        ))}
      </section>

      <section className="dark:bg-dark-background transition-all duration-300 ease-linear bg-white w-full rounded-md ">
        <div className="flex flex-nowrap xl:p-4 lg:p-4 md:py-2 max-md:p-4  justify-between w-full items-center ">
          <p className="font-azarMehr font-medium text-gray  xl:text-sm lg:text-[12px] md:text-[10px] break-all">
            {targetData(
              selectedProfileData,
              "if you had the ability to solve a problem, what would it be?"
            )}
          </p>
          <span
            className="dark:text-dark-yellow font-azarMehr cursor-pointer text-blueLink font-medium  xl:text-sm lg:text-[12px] md:text-[13px] "
            onClick={() => setShowModal(true)}
          >
            view
          </span>
        </div>
      </section>

      <section className="dark:bg-dark-background transition-all duration-300 ease-linear bg-white   w-full rounded-md">
        <div className="flex flex-nowrap justify-between xl:p-4 lg:p-4 md:py-2 max-md:p-4 w-full items-center ">
          <p className="font-azarMehr font-medium text-gray xl:text-sm lg:text-[12px] md:text-[10px] break-all">
            {targetData(selectedProfileData, "forecast 2022")}
          </p>
          <span
            className="dark:text-dark-yellow font-azarMehr cursor-pointer text-blueLink font-medium  xl:text-sm lg:text-[12px] md:text-[13px]"
            onClick={() => setShowModal(true)}
          >
            view
          </span>
        </div>
      </section>

      <section className="dark:bg-dark-background  transition-all duration-300 ease-linear bg-white  w-full rounded-md">
        <div className="flex flex-nowrap justify-between  xl:p-4 lg:p-4 md:py-2 max-md:p-4 w-full items-center  ">
          <p className="font-azarMehr font-medium text-gray xl:text-sm lg:text-[12px] md:text-[10px] break-all">
            {targetData(selectedProfileData, "pleasant memory")}
          </p>
          <span
            className="dark:text-dark-yellow font-azarMehr cursor-pointer text-blueLink font-medium  xl:text-sm lg:text-[12px] md:text-[13px]"
            onClick={() => setShowModal(true)}
          >
            view
          </span>
        </div>
      </section>

      <section className="dark:bg-dark-background bg-white  transition-all duration-300 ease-linear  w-full rounded-md">
        <div className="flex flex-nowrap justify-between  xl:p-4 lg:p-4 max-md:p-4 md:px-1 w-full items-center ">
          <p className="font-azarMehr font-medium text-gray xl:text-sm lg:text-[12px] md:text-[10px] break-all">
            {targetData(selectedProfileData, "forecast 2022")}
          </p>
          <span
            className="dark:text-dark-yellow cursor-pointer font-azarMehr text-blueLink font-medium xl:text-sm lg:text-[12px] md:text-[13px]"
            onClick={() => setShowModal(true)}
          >
            view
          </span>
        </div>
      </section>
    </div>
  );
}
