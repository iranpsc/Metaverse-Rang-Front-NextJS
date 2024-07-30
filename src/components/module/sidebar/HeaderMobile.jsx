"use client";
// import { useContext, useState, useEffect } from "react";
// import { SideBarContext } from "@/components/context/SidebarContext";
import { CLoseIcon, MenuIcon } from "@/components/svgs";
import Image from "next/image";
import { getTransletion, getMainFile } from "@/components/utils/actions";

export default function ProfileHeaderMobile({ tabsMenu, isClosed, toggleSide }) {
  // const { state, toggleCollapseHandler } = useContext(SideBarContext);
  // const [title, SetTitle] = useState<any>([]);
  // const [desc, setDesc] = useState<any>([]);

  const namesToKeep = ["meta rgb", "metaverse rang"];

  const title = tabsMenu.find((item) => item.name === "meta rgb");
  const desc = tabsMenu.find((item) => item.name === "metaverse rang");


  // useEffect(() => {
  //   if (menuData) {
  //     SetTitle(
  //       menuData.data.menu.find((item: any) => item.name === "meta rgb")
  //     );
  //     setDesc(
  //       menuData.data.menu.find((item: any) => item.name === "metaverse rang")
  //     );
  //   }
  // }, [menuData]);

  return (
    <>
      <div className="xs:fixed px-1 sm:fixed dark:bg-dark-background shadow-md xl:hidden lg:hidden md:flex sm:flex xs:flex  z-50 w-full sm:h-[60px] xs:h-[60px] bg-white flex-rows justify-between items-center">
        <div className="">
          {/* {!state.isCollapsed ? ( */}
          {!isClosed ? (
            <CLoseIcon
              className="fill-[#2B2B2B] dark:fill-dark-gray cursor-pointer sm:w-[25px] xs:w-[25px] md:w-[40px]"
              onClick={toggleSide}
              alt="closeIcon"
            />
          ) : (
            <>
              <MenuIcon
                className="stroke-[#2B2B2B] dark:stroke-white cursor-pointer sm:w-[35px] sm:h-[20px] xs:w-[35px] xs:h-[20px] md:w-[50px] md:h-[30px]"
                onClick={toggleSide}
                alt="menuIcon"
              />
            </>
          )}
        </div>

        <div className="flex flex-rows justify-center items-center ">
          <div className=" ml-1 flex flex-col  justify-between items-center ">
            <p className=" dark:text-white md:text-[16px] block font-azarMehr text-end  font-bold text-[18px] mt-1 text-black sm:text-center">
              {title?.translation}
            </p>
            <p className="dark:text-dark-gray mt-[-5px] md:text-[11px] font-normal text-[#5A5858] ">
              {desc?.translation}
            </p>
          </div>
          <Image
            src="/logo.png"
            width={500}
            height={500}
            className="xs:w-[40px] xs:h-[40px] sm:w-[40px] sm:h-[40px] md:w-[50px] md:h-[50px] mx-1 "
            alt="rgb metaverse"
          />
        </div>
      </div>
    </>
  );
}
