import { useContext } from "react";
import Image from "next/image";

import { SideBarContext } from "@/components/context/SidebarContext";
import { CLoseIcon, MenuIcon } from "@/components/svgs";

export default function ProfileHeaderMobile() {

    const { isCollapsed, toggleCollapseHandler } = useContext(SideBarContext);
   

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
            className=" w-[45px] h-[50px] rounded-[1rem]"
          />
        </div>
      </div>
    </>
  );
}
