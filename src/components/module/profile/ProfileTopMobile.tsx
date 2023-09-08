import { useContext } from "react";
import Image from "next/image";

import Persian from "persianjs";

import { LangContext } from "@/components/context/LangContext";
import { Shahrvand } from "@/components/svgs";

export default function ProfileTopMobile() {

      const {profileData, languageSelected } = useContext(LangContext);
       const imgs0 = profileData && profileData.profilePhotos && profileData.profilePhotos[0] && profileData?.profilePhotos[0]?.url;
  return (
    <>
      <div className="dark:bg-dark-background transition-all xl:mt-0 lg:mt-0 md:mt-1 duration-300 sm:mt-1 xs:mt-1 ease-linear flex flex-col bg-white justify-center  items-center rounded-[10px]">
        <section className="w-full flex flex-nowrap justify-around px-4 md:px-1 sm:px-0 xs:px-0 items-center">
          <div className="group relative flex justify-center items-center">
            <Image
              src={imgs0 || "/temp.png"}
              width={100}
              height={100}
              alt="profile"
              className="  inline-block rounded-full p-1 xl:w-14 xl:h-14 lg:w-14 lg:h-14 md:w-10 md:h-10 sm:w-14 sm:h-14 xs:w-14 xs:h-14 object-cover"
            />
            <p className="sm:bottom-[-25px] xs:bottom-[-25px] sm:start-1 xs:start-1 rounded-sm bg-white dark:bg-dark-background  w-max p-1 sm:scale-100 xs:scale-100  text-xs  text-black dark:text-white group-hover:scale-100 break-all  inline-block xl:mx-1 lg:mx-1 md:mx-0 md:text-xs font-medium font-azarMehr xl:text-[18px] text-start">
              {profileData?.name}
            </p>
          </div>

          <hr className="xl:w-12 lg:w-12 md:w-4  max-sm:hidden  inline-block mx-1  text-lightGray dark:text-dark-lightWhite" />

          <Image
            src={profileData?.kyc?.nationality || "/profile/lock.png"}
            width={100}
            height={100}
            alt="profile"
            className="inline-block rounded-full xl:w-9 xl:h-9 lg:w-9 lg:h-9 md:w-7 md:h-7 sm:w-12 sm:h-12 xs:w-12 xs:h-12 object-cover"
          />
          <hr className="xl:w-12 lg:w-12 md:w-4 inline-block mx-1  text-lightGray dark:text-dark-lightWhite" />
          <p className=" dark:text-white sm:text-[15px] xs:text-[15px] md:text-[15px] lg:text-[15px] xl:text-[15px]  inline-block mx-1 font-bold font-azarMehr text-extraGray">
            {profileData?.level?.name}
          </p>
          <div className=" relative text-center flex items-center justify-center">
            <Shahrvand
              src="/profile/citizennumber.svg"
              width={100}
              height={100}
              alt="profile"
              className="inline-block rounded-full xl:w-10 xl:h-10 lg:w-10 lg:h-10 md:w-7 sm:w-12 sm:h-12 xs:w-12 xs:h-12 "
            />
            <p className="dark:text-black absolute md:text-xs text-white font-azarMehr font-black xl:text-lg sm:text-[14px] xs:text-[14px]">
              {languageSelected.code === "fa"
                ? Persian(profileData?.level?.slug).englishNumber().toString()
                : profileData?.level?.slug}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
