import { useContext } from "react";
import Image from "next/image"

import Persian from "persianjs";
import { LangContext } from "@/components/context/LangContext";
import {  targetData } from "@/components/utils/targetDataName";
import ProfileHeaderMobile from "../module/profile/ProfileHeaderMobile";
import ProfileTopMobile from "../module/profile/ProfileTopMobile";
import ProfileImages from "../module/profile/ProfileImages";

export default function Profile(){
  const { selectedProfileData, profileData, languageSelected } = useContext(LangContext);

   
     
    
    const numberScore = (100 - parseInt(profileData?.score_percentage_to_next_level))
    const percent = (numberScore/100) * 100;
     

    return (
      <>
       
         
          <ProfileHeaderMobile/>
          <ProfileTopMobile/>
          <ProfileImages/>
          
      

       

        <section className="dark:bg-dark-background h-full xl:px-6 lg:px-6 md:px-2 max-sm:px-1  bg-white transition-all duration-300 ease-linear mt-2 relative  flex flex-col gap-4 justify-start items-center">
          <div className="flex flex-row   justify-between  w-full items-center mt-6">
            <p className="font-azarMehr font-bold xl:text-xl lg:text-xl md:text-md">
              {targetData(selectedProfileData, "citizenship id")}
            </p>
            <p className="font-azarMehr font-bold  xl:text-xl lg:text-xl max-lg:text-md">
              {profileData?.code}
            </p>
          </div>

          <div className="flex flex-nowrap  justify-between py-[2px] w-full items-center ">
            <p className="font-azarMehr font-medium xl:text-sm lg:text-sm max-lg:text-md break-all max-sm:text-[13px]	 text-gray">
              {targetData(selectedProfileData, "citizenship name")}
            </p>
            <hr className="w-[40%] h-[1px] border border-dashed  text-lightGray dark:text-dark-lightWhite" />
            <p className="dark:text-dark-gray font-azarMehr font-medium xl:text-sm lg:text-sm md:text-md break-all max-sm:text-[13px] text-black">
              {profileData?.name}
            </p>
          </div>

          <div className="flex flex-nowrap justify-between py-[2px] w-full items-center ">
            <p className="font-azarMehr font-medium xl:text-sm lg:text-sm max-lg:text-md break-all text-gray max-sm:text-[13px]">
              {targetData(selectedProfileData, "entry date")}
            </p>
            <hr className="w-[40%] h-[1px] border border-dashed  text-lightGray dark:text-dark-lightWhite" />
            <p className="dark:text-dark-gray font-azarMehr font-medium xl:text-sm lg:text-sm md:text-xs break-all text-black max-sm:text-[13px]">
              {profileData?.registered_at}
            </p>
          </div>

          <div className="flex flex-nowrap justify-between py-[2px]  w-full items-center ">
            <p className="dark:text-dark-gray  font-azarMehr font-medium xl:text-sm lg:text-sm md:text-xs break-all text-gray max-sm:text-[13px]">
              {targetData(selectedProfileData, "responsibility")}
            </p>
            <hr className="w-[40%] h-[1px] border border-dashed   text-lightGray dark:text-dark-lightWhite" />
            <p className="dark:text-dark-gray font-azarMehr font-medium xl:text-sm lg:text-sm md:text-xs break-all text-black max-sm:text-[13px]">
              {profileData?.position}
            </p>
          </div>

          <div className="flex flex-nowrap justify-between py-[2px] w-full items-center ">
            <p className="font-azarMehr font-medium xl:text-sm lg:text-sm md:text-xs break-all text-gray max-sm:text-[13px]">
              {targetData(selectedProfileData, "achieved score")}
            </p>
            <hr className="w-[30%] h-[1px] border border-dashed  text-lightGray dark:text-dark-lightWhite " />
            <div className="w-[40%] relative bg-[#E9EEF8] dark:bg-[#3F3F3F]  xl:h-[27px] lg:h-[32px] md:h-[26px]  rounded-full  flex justify-end">
              <div
                className={`bg-[#ffa600] flex items-center  p-3 leading-none rounded-full`}
                style={{ width: `${percent}%` }}
              >
                <span className="  end-2 absolute  xl:text-[18px] lg:text-md md:text-sm break-all font-medium text-[#0E0E0E] dark:text-white text-center">
                  {languageSelected?.code !== "IR"
                    ? profileData?.score
                    : Persian(profileData?.score).englishNumber().toString()}
                </span>
              </div>
            </div>
          </div>

          <hr className="h-[2px] w-[95%]   bg-gradient-to-r from-[#DADADA00] via-[#dadada] to-[#DADADA00] text-lightGray " />

          <div className=" w-[75%]  flex flex-nowrap items-center justify-evenly pb-3">
            {profileData?.level?.levels_images?.images.map(
              (item: any, index: any) => (
                <Image
                  key={index}
                  src={item}
                  width={100}
                  height={100}
                  alt="profile"
                  className="  inline-block rounded-full 
              xl:w-14 xl:h-14
              lg:w-14 
              md:w-12 "
                />
              )
            )}
          </div>
        </section>
      </>
    );

}