import { useContext } from "react";
import Image from "next/image";

import { SideBarContext } from "@/components/context/SidebarContext";
import { CLoseIcon, MenuIcon } from "@/components/svgs";
import { LogoRgbMobile, LogoRgb, EyeHidden } from "./../../svgs/index";

export default function ProfileHeaderMobile() {

    const { isCollapsed, toggleCollapseHandler } = useContext(SideBarContext);
   

  return (
    <>
      <div className=" dark:bg-dark-background xl:hidden lg:hidden md:hidden sm:flex xs:flex transition-all duration-300 ease-linear z-50 w-full h-[59px] bg-white flex-rows justify-between items-center">
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

        <div className="flex flex-rows justify-center items-center">
          <div className=" ml-1">
            <p className=" dark:text-white md:text-[16px] block font-azarMehr  font-bold text-xl text-black">
              Meta Rgb
            </p>
            <p className="dark: text-dark-gray  md:text-[11px] font-normal text-mediumGray">
              Metaverse Rang
            </p>
          </div>
          <Image
            src="/clogo.svg"
            width={1000}
            height={1000}
            alt=""
            className=" w-[45px] h-[50px] sm:mx-1 sm:w-[50px] sm:h-[50px] xs:w-[40px] xs:h-[40px] xs:mx-1"
          />
        </div>
      </div>
    </>
  );
}
