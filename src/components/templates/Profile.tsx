import { useContext } from "react";
import Image from "next/image"
import { LangContext } from "@/components/context/LangContext";
import {  targetData } from "@/components/utils/targetDataName";
import { SideBarContext } from "@/components/context/SidebarContext";
import SvgIcon from "@/components/module/SvgIcon";
import {
  ActiveMenuIcon,
  CLoseIcon,
  HomeIcon,
  MenuIcon,
} from "@/components/svgs";


export default function Profile(){
  const {  selectedProfileData,profileData } = useContext(LangContext);
   const { isCollapsed, toggleCollapseHandler } = useContext(SideBarContext);
   
   
   const imgs0 = profileData && profileData.profilePhotos && profileData.profilePhotos[0] && profileData?.profilePhotos[0]?.url;
   const imgs1 = profileData && profileData.profilePhotos && profileData.profilePhotos[1] && profileData?.profilePhotos[1]?.url;
   
    return (
      <>
        <div className=" dark:bg-dark-background hidden max-lg:visible transition-all duration-300 ease-linear z-50 w-full h-[59px] bg-white max-lg:flex flex-rows justify-between items-center">
          <div className="">
            {!isCollapsed ? (
              <CLoseIcon
                className="fill-[#2B2B2B] dark:fill-gray cursor-pointer w-[25px]"
                onClick={toggleCollapseHandler}
              />
            ) : (
              <MenuIcon
                className="stroke-[#2B2B2B] dark:stroke-gray cursor-pointer w-[35px]"
                onClick={toggleCollapseHandler}
              />
            )}
          </div>

          <div className="flex flex-rows">
            <div className=" ml-1 ">
              <p className="visible dark:text-white  block font-azarMehr  font-bold text-xl text-black">
                Meta Rgb
              </p>
              <p className="dark: text-dark-gray visible font-normal text-mediumGray">
                Metaverse Rang
              </p>
            </div>
            <Image
              src="/cdlogo.png"
              width={1000}
              height={1000}
              alt=""
              className=" w-[3rem] h-[3rem] object-cover rounded-[1rem]"
            />
          </div>
        </div>

        <div className="dark:bg-dark-background transition-all duration-300 ease-linear flex flex-col mt-1 bg-white justify-center  items-center rounded-md">
          <section className="w-full   flex flex-nowrap justify-around px-4 md:px-1 max-lg:px-0 items-center">
            <Image
              src={imgs0 || "/profile/lock.png"}
              width={100}
              height={100}
              alt="profile"
              className="  inline-block rounded-full p-1 xl:w-14 xl:h-14 lg:w-14 lg:h-14 md:w-10 md:h-10 max-lg:w-14 max-lg:h-14 object-cover"
            />
            <p className=" dark:text-white break-all inline-block xl:mx-1 lg:mx-1 md:mx-0 md:text-xs font-medium font-azarMehr text-black xl:text-md text-start">
              {profileData?.name}
            </p>
            <hr className="xl:w-10 lg:w-10 md:w-4 inline-block mx-1  text-lightGray dark:text-dark-lightWhite" />

            <Image
              src={profileData?.kyc?.nationality || "/profile/lock.png"}
              width={100}
              height={100}
              alt="profile"
              className="inline-block rounded-full xl:w-9 xl:h-9 lg:w-9 lg:h-9 md:w-6 md:h-6 max-lg:w-12 max-lg:h-12 object-cover"
            />
            <hr className="xl:w-10 lg:w-10 md:w-4 inline-block mx-1  text-lightGray dark:text-dark-lightWhite" />
            <p className=" dark:text-white md:text-xs xl:text-md lg=text-md inline-block mx-1 font-bold font-azarMehr text-extraGray">
              {profileData?.level?.name}
            </p>
            <div className=" relative text-center flex items-center justify-center">
              <Image
                src="/profile/citizennumber.svg"
                width={100}
                height={100}
                alt="profile"
                className="inline-block rounded-full xl:w-10 xl:h-10 lg:w-10 lg:h-10 max-lg:w-12 max-lg:h-12 "
              />
              <p className="dark:text-black absolute md:text-xs text-white font-azarMehr font-black text-lg">
                {profileData?.level?.slug}
              </p>
            </div>
          </section>
        </div>

        <section className="dark:bg-dark-background  relative bg-white transition-all duration-300 ease-linear mt-2 rounded-md flex flex-row max-lg:flex-col ">
          <div className=" dark:bg-dark-background bg-white  flex justify-center basis-3/4 items-center">
            <Image
              src={imgs1 || "/profile/lock.png"}
              width={1000}
              height={1000}
              alt="profile"
              className=" object-cover rounded-md w-full h-[280px]"
            />
          </div>

          <div className=" basis-1/4  flex flex-row max-lg:flex-col max-lg:mb-2  gap-2 justify-center items-center">
            <hr
              className="h-[90%] w-[1px] max-lg:w-[99%] max-lg:h-[1px] max-lg:mt-2 
             dark:bg-gradient-to-b dark:from-[#222] dark:via-[#444] dark:to-[#222]
              bg-gradient-to-b from-[#f4f4f4] via-[#DADADA] to-[#f4f4f4]"
            />
            <div className="h-full flex flex-col max-lg:flex-row max-lg:w-full max-lg:gap-6 justify-center items-center">
              <Image
                src={imgs0 || "/profile/lock.png"}
                width={100}
                height={100}
                alt="profile"
                className="  inline-block rounded-full object-cover 
                xl:w-12 xl:h-12
                lg:w-10 lg:h-10
                 max-lg:w-12 max-lg:h-12
                "
              />
              <Image
                src={imgs0 || "/profile/lock.png"}
                width={100}
                height={100}
                alt="profile"
                className="  inline-block rounded-full object-cover
                 xl:w-12 xl:h-12
                lg:w-10 lg:h-10
                  max-lg:w-12 max-lg:h-12
                "
              />
              <Image
                src="/profile/lock.png"
                width={100}
                height={100}
                alt="profile"
                className="  inline-block rounded-full 
                 xl:w-12 xl:h-12
               lg:w-10 lg:h-10
                 max-lg:w-12 max-lg:h-12"
              />
              <Image
                src="/profile/lock.png"
                width={100}
                height={100}
                alt="profile"
                className="  inline-block rounded-full
                 xl:w-12 xl:h-12
               lg:w-10 lg:h-10
                  max-lg:w-12 max-lg:h-12"
              />
              <Image
                src="/profile/lock.png"
                width={100}
                height={100}
                alt="profile"
                className="  inline-block rounded-full 
                 xl:w-12 xl:h-12
              lg:w-10 lg:h-10
                   max-lg:w-12 max-lg:h-12"
              />
            </div>
          </div>
        </section>

        <section className="dark:bg-dark-background h-full xl:px-6 lg:px-6 md:px-2  bg-white transition-all duration-300 ease-linear mt-2 relative  flex flex-col gap-4 justify-start items-center">
          <div className="flex flex-row   justify-between  w-full items-center mt-6">
            <p className="font-azarMehr font-bold xl:text-xl lg:text-xl md:text-md">
              {targetData(selectedProfileData, "citizenship id")}
            </p>
            <p className="font-azarMehr font-bold  xl:text-xl lg:text-xl max-lg:text-md">
              {profileData?.code}
            </p>
          </div>

          <div className="flex flex-nowrap  justify-between py-[2px] w-full items-center ">
            <p className="font-azarMehr font-medium xl:text-sm lg:text-sm max-lg:text-md break-all	 text-gray">
              {targetData(selectedProfileData, "citizenship name")}
            </p>
            <hr className="w-[40%] h-[1px] border border-dashed  text-lightGray dark:text-dark-lightWhite" />
            <p className="dark:text-dark-gray font-azarMehr font-medium xl:text-sm lg:text-sm md:text-md break-all text-black">
              {profileData?.name}
            </p>
          </div>

          <div className="flex flex-nowrap justify-between py-[2px] w-full items-center ">
            <p className="font-azarMehr font-medium xl:text-sm lg:text-sm max-lg:text-md break-all text-gray">
              {targetData(selectedProfileData, "entry date")}
            </p>
            <hr className="w-[40%] h-[1px] border border-dashed  text-lightGray dark:text-dark-lightWhite" />
            <p className="dark:text-dark-gray font-azarMehr font-medium xl:text-sm lg:text-sm md:text-xs break-all text-black">
              {profileData?.registered_at}
            </p>
          </div>

          <div className="flex flex-nowrap justify-between py-[2px]  w-full items-center ">
            <p className="dark:text-dark-gray  font-azarMehr font-medium xl:text-sm lg:text-sm md:text-xs break-all text-gray">
              {targetData(selectedProfileData, "responsibility")}
            </p>
            <hr className="w-[40%] h-[1px] border border-dashed   text-lightGray dark:text-dark-lightWhite" />
            <p className="dark:text-dark-gray bg-[#ff0000] font-azarMehr font-medium xl:text-sm lg:text-sm md:text-xs break-all text-black">
              Parrallel Manegment
            </p>
          </div>

          <div className="flex flex-nowrap justify-between py-[2px] w-full items-center ">
            <p className="font-azarMehr font-medium xl:text-sm lg:text-sm md:text-xs break-all text-gray">
              {targetData(selectedProfileData, "achieved score")}
            </p>
            <hr className="w-[30%] h-[1px] border border-dashed  text-lightGray dark:text-dark-lightWhite " />
            <div className="w-[40%] bg-gray-200 xl:h-[32px] lg:h-[32px] md:h-[26px]  rounded-full bg-lightGray flex justify-end">
              <div
                className="bg-[#ffa600] flex items-center  p-3 leading-none rounded-full"
                style={{ width: "50%" }}
              >
                <span className="w-full bg-[#ff0000]  xl:text-md lg:text-md md:text-sm break-all font-medium text-black dark:text-white text-center">
                  {profileData?.score}
                </span>
              </div>
            </div>
          </div>

          <hr className="h-[2px] w-[95%]   bg-gradient-to-r from-lightGray via-[#dadada] to-lightGray text-lightGray " />

          <div className=" w-[75%]  flex flex-nowrap items-center justify-evenly pb-3">
            <Image
              src="/profile/medal1.png"
              width={100}
              height={100}
              alt="profile"
              className="  inline-block rounded-full 
              xl:w-14 xl:h-14
              lg:w-14 xl:h-14
              md:w-12 xl:h-12
              "
            />
            <Image
              src="/profile/medal3.png"
              width={100}
              height={100}
              alt="profile"
              className="  inline-block rounded-full 
              xl:w-14 xl:h-14
              lg:w-14 xl:h-14
              md:w-12 xl:h-12
              "
            />
            <Image
              src="/profile/medal2.png"
              width={100}
              height={100}
              alt="profile"
              className="  inline-block rounded-full 
              xl:w-14 xl:h-14
              lg:w-14 xl:h-14
              md:w-12 xl:h-12
              "
            />
            <Image
              src="/profile/medal1.png"
              width={100}
              height={100}
              alt="profile"
              className="  inline-block rounded-full 
              xl:w-14 xl:h-14
              lg:w-14 xl:h-14
              md:w-12 xl:h-12
              "
            />
            <Image
              src="/profile/medal3.png"
              width={100}
              height={100}
              alt="profile"
              className="  inline-block rounded-full 
              xl:w-14 xl:h-14
              lg:w-14 xl:h-14
              md:w-12 xl:h-12
              
              "
            />
          </div>
        </section>
      </>
    );

}