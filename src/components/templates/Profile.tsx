import { useContext } from "react";
import Image from "next/image"

import { motion } from "framer-motion";
import Persian from "persianjs";
import { LangContext } from "@/context/LangContext";
import {  targetData } from "@/utils/targetDataName";
import ProfileHeaderMobile from "@/module/profile/ProfileHeaderMobile";
import ProfileTopMobile from "@/module/profile/ProfileTopMobile";
import ProfileImages from "@/module/profile/ProfileImages";

export default function Profile(){
  const { data, profileData, languageSelected } = useContext(LangContext);

   
     
    
    const numberScore = (100 - parseInt(profileData?.score_percentage_to_next_level))
    const percent = (numberScore/100) * 100;


    return (
      <>
        <ProfileHeaderMobile />
        <ProfileTopMobile />
        <ProfileImages />

        <section className="dark:bg-dark-background  xl:h-[54%] lg:h-full xl:px-6 lg:px-6 md:px-2 sm:px-1 xs:px-3  bg-white transition-all duration-300 ease-linear mt-[6px] rounded-[10px] relative  flex flex-col xl:gap-3 lg:gap-3 md:gap-4 sm:gap-4 xs:gap-4 justify-start items-center ">
          <div className="flex flex-row justify-between  w-full items-center mt-6 xl:py-0 lg:py-0 md:py-0 sm:py-2 xs:py-2">
            <p className="font-azarMehr font-bold xl:text-xl lg:text-xl md:text-md">
              {targetData(data.data.selectedProfileData, "citizenship id")}
            </p>
            <p className="font-azarMehr font-bold  xl:text-xl lg:text-xl max-lg:text-md uppercase">
              {profileData?.code}
            </p>
          </div>

          <div className="flex flex-nowrap max-sm:px-1 justify-between  mt-3 w-full items-center max-sm:py-2">
            <p className="font-azarMehr dark:text-white font-medium xl:text-[14px] lg:text-[13px] md:text-[13px] max-lg:text-md break-all max-sm:text-[13px]	 text-gray">
              {targetData(data.data.selectedProfileData, "citizenship name")}
            </p>
            <hr className="w-[40%] md:w-[30%] xl:block lg:block md:block sm:hidden xs:hidden h-[1px] border border-dashed  text-[#bdbbbb] dark:text-[#6e6d6d]" />
            <p className="dark:text-dark-gray  font-azarMehr font-medium md:text-[13px]  medium xl:text-[14px] lg:text-[13px] md:text-md break-all max-sm:text-[13px] text-black">
              {profileData?.name}
            </p>
          </div>

          <div className="flex flex-nowrap max-sm:px-1  justify-between mt-3 w-full items-center max-sm:py-2">
            <p className="font-azarMehr dark:text-white font-medium medium xl:text-[14px] lg:text-[13px] md:text-[13px] max-lg:text-md break-all text-gray max-sm:text-[13px]">
              {targetData(data.data.selectedProfileData, "entry date")}
            </p>
            <hr className="w-[40%]  md:w-[30%] xl:block lg:block md:block sm:hidden xs:hidden h-[1px] border border-dashed  text-[#bdbbbb] dark:text-[#6e6d6d]" />
            <p className="dark:text-dark-gray font-azarMehr font-medium medium xl:text-[14px] lg:text-[13px] md:text-[13px] break-all text-black max-sm:text-[13px]">
              {profileData?.registered_at}
            </p>
          </div>

          <div className="flex flex-nowrap max-sm:px-1 justify-between mt-3 w-full items-center max-sm:py-2">
            <p className=" dark:text-white font-azarMehr font-medium medium xl:text-[14px] lg:text-[13px] md:text-xs break-all text-gray max-sm:text-[13px]">
              {targetData(data.data.selectedProfileData, "responsibility")}
            </p>
            <hr className="w-[40%] md:w-[30%] xl:block lg:block md:block sm:hidden xs:hidden h-[1px] border border-dashed   text-[#bdbbbb] dark:text-[#6e6d6d]" />
            <p className="dark:text-dark-gray font-azarMehr font-medium medium xl:text-[14px] lg:text-[13px] md:text-xs break-all text-black max-sm:text-[13px]">
              {profileData?.position}
            </p>
          </div>

          <div className="flex flex-nowrap max-sm:px-1 justify-between xl:mt-3 lg:mt-0 w-full items-center max-sm:py-2">
            <p className="font-azarMehr dark:text-white font-medium medium xl:text-[14px] lg:text-[13px] md:text-xs break-all text-gray max-sm:text-[13px]">
              {targetData(data.data.selectedProfileData, "achieved score")}
            </p>
            <hr className="w-[30%] md:w-[30%] xl:block lg:block md:block sm:hidden xs:hidden h-[1px] border border-dashed  text-[#bdbbbb] dark:text-[#6e6d6d] " />
            <div className="w-[40%] relative bg-[#E9EEF8] dark:bg-[#3F3F3F]  xl:h-[27px] lg:h-[32px] md:h-[26px]  rounded-full  flex justify-end">
              <div
                className={`bg-[#ffa600] flex items-center  p-3 leading-none rounded-full`}
                style={{ width: `${percent}%` }}
              >
                <span className="  end-[35%] absolute  xl:text-[18px] lg:text-md md:text-sm break-all font-medium text-[#0E0E0E] dark:text-white text-center">
                  {languageSelected?.code && languageSelected?.code !== "fa"
                    ? profileData?.score
                    : profileData &&
                      Persian(profileData?.score).englishNumber().toString()}
                </span>
              </div>
            </div>
          </div>

          <hr className="h-[2px] w-[95%] xl:mt-5 lg:mt-1 bg-gradient-to-r from-[#DADADA00] via-[#b3b3b3] to-[#DADADA00] text-lightGray " />

          {profileData && profileData.current_level && (
          <motion.div
            initial={{ rotate: 180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className=" w-[75%]  flex flex-nowrap xl:mt-2 lg:mt-2 md:mt-0 items-center justify-evenly pb-3 max-sm:pb-5"
          >
            {profileData?.achieved_levels?.map((item: any, index: any) => (
              <Image
                key={index}
                src={item.image}
                width={100}
                height={100}
                alt="profile"
                className=" inline-block shadow hover:mt-[-10px] cursor-pointer 
              xl:w-14 xl:h-14
              lg:w-14 
              md:w-12 
              sm:w-14
              xs:w-14
              
              "
              />
            ))}
            {profileData && profileData.current_level && (
              <Image
                src={profileData.current_level.image}
                width={200}
                height={200}
                alt="profile"
                className=" inline-block shadow hover:mt-[-10px] cursor-pointer 
              xl:w-14 xl:h-14
              lg:w-14 
              md:w-12 
              sm:w-14
              xs:w-14
              
              "
              />
            )}
          </motion.div>
           )} 
        </section>
      </>
    );

}