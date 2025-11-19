"use client";
// import { useContext, useState, useEffect } from "react";
// import { SideBarContext } from "@/components/context/SidebarContext";
import { CLoseIcon, MenuIcon } from "@/components/svgs";
import Image from "next/image";
import { getTranslation, getMainFile } from "@/components/utils/actions";
import Link from "next/link";

export default function ProfileHeaderMobile({  isClosed, toggleSide ,params}) {
  // const { state, toggleCollapseHandler } = useContext(SideBarContext);
  // const [title, SetTitle] = useState<any>([]);
  // const [desc, setDesc] = useState<any>([]);
const lang = params.lang;
  // ترجمه‌های دستی
  const translations = {
    fa: { title: "متارنگ", subtitle: "متاورس رنگ" },
    en: { title: "Meta RANG", subtitle: "Metaverse RANG" },
  };

  // انتخاب ترجمه با توجه به زبان، پیش‌فرض فارسی
  const t = translations[lang] || translations.fa;


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
      <div className="xs:fixed px-5  sm:fixed top-0 dark:bg-dark-background shadow-md xl:hidden lg:hidden md:flex sm:flex xs:flex z-[51] w-full sm:h-[60px] xs:h-[60px] bg-white flex-rows justify-between items-center">
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

        <Link href={`/${params.lang}`} className="flex flex-rows justify-center items-center ">
          <div className=" ml-1 flex flex-col  justify-center items-center py-2">
            <p className=" dark:text-white block font-azarMehr  font-bold  mb-[-3px] text-black sm:text-center">
             {t.title}
            </p>
            <p className="dark:text-dark-gray  text-[12px] font-normal text-[#5A5858]">
             {t.subtitle}
            </p>
          </div>
          <Image
            src="/logo.png"
            width={71}
            height={70}
            className="xs:w-[40px] xs:h-[40px] sm:w-[40px] sm:h-[40px] md:w-[50px] md:h-[50px] mx-1 "
            alt="rgb metaverse"
          />
        </Link>
      </div>
    </>
  );
}
