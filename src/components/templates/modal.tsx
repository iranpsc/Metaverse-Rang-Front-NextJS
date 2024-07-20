import { useContext, useState, useEffect } from "react";
import { CLoseIcon } from "@/svgs/index";
import { useTheme } from "next-themes";
// import { LangContext } from "@/context/LangContext";
//ANIMATION

import { motion } from "framer-motion";
//data
// import { Items, ItemsENG } from "../utils/items";
// import { SideBarContext } from "../context/SidebarContext";

export default function MenuItemPage({ dataObject, close }: any) {
  const { theme } = useTheme();

  // useEffect(() => {
  //   if (languageSelected.code === "fa") {
  //     setData(Items.filter((item: any) => item.id == state.showMenuItem));
  //   } else {
  //     setData(ItemsENG.filter((item: any) => item.id == state.showMenuItem));
  //   }
  // }, [state.showMenuItem, languageSelected.code]);

  // useEffect(() => {
  //   setShowAuthCard(false);
  // }, [state.showMenuItem !== 0]);

  // const setActiveItemMenu = (value: number) => {
  //   dispatch({ type: "SET_SHOW_MENU_ITEM", payload: value });
  // };

  return (
    <div
      id={`${theme === "dark" ? "dark-scrollbar" : "light-scrollbar"}`}
      className="fixed w-screen h-screen backdrop-blur-sm bg-black/30 z-[1000] top-0 w-full h-screen  "
    >
      {dataObject && (
        <div className="w-full h-full overflow-clip">
          <motion.div
            initial={{ rotate: 0, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ opacity: 1, scale: 0 }}
            transition={{
              duration: 0.5,
              ease: "backInOut",
            }}
            className="  flex flex-col justify-center   items-center w-full h-full"
          >
            <div
              className="xl:w-[40%] lg:w-[40%] md:w-[70%]  min-h-[350px] h-[500px] shadow-xl  rounded-[15px] flex flex-col relative me-[250px] sm:me-0 sm:w-[90%] xs:me-0 xs:w-[90%] justify-start xl:mt-0 lg:mt-0 md:mt-0 
              mt-[100px] items-center bg-white dark:bg-dark-background "
              onClick={close}
            >
              <div className=" w-full h-[75px] relative shadow-md rounded-t-[10px] flex flex-row justify-center items-center">
                <CLoseIcon
                  className="absolute z-50  w-[15px] h-[15px] cursor-pointer stroke-2 m-2 stroke-gray dark:stroke-white start-2"
                  alt="Close"
                />
                <div>
                  <h1 className="font-azarMehr text-center text-[18px] text-black dark:text-white font-bold">
                    {dataObject.title}
                  </h1>
                  <p className="w-full text-center ms-[16px] 3xl:text-[16px] xl:text-[16px] lg:text-[16px] md:text-[14px] sm:text-[12px] xs:text-[12px] text-black dark:text-white font-bold">
                    {dataObject.hello}
                  </p>
                </div>
              </div>

              <div className="bg-white dark-scrollbar dark:bg-dark-background w-[100%] px-2 h-full overflow-y-scroll overflow-x-clip  pb-10">
                <p className="w-full text-center text-[16px] font-azarMehr font-semibold 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle md:text-mdTitle  sm:text-smTitle xs:text-smTitle mt-5">
                  {dataObject.desc}
                </p>
                <p className="w-full text-center font-azarMehr font-bold 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle md:text-mdTitle  sm:text-smTitle xs:text-smTitle  mt-5">
                  {dataObject.subtitleItems}
                </p>
                {dataObject.subItems.map((item: any) => (
                  <ul key={item.id} className="mt-5">
                    <li>
                      <p className="font-azarMehr font-bold 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle md:text-mdTitle  sm:text-smTitle xs:text-smTitle ">
                        {item.title}
                      </p>
                    </li>
                    <p className="ms-5 mt-3 font-azarMehr font-medium 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle md:text-mdTitle  sm:text-smTitle xs:text-smTitle ">
                      {item.desc}
                    </p>
                  </ul>
                ))}
                <p className="w-full text-center mt-7 font-azarMehr font-bold 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle md:text-mdTitle  sm:text-smTitle xs:text-smTitle ">
                  {dataObject?.time[0]?.title}
                </p>
                <p className="mt-1 text-start font-azarMehr font-medium 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle md:text-mdTitle  sm:text-smTitle xs:text-smTitle ">
                  {dataObject?.time[0]?.desc}
                </p>

                <p className="mt-10 font-azarMehr font-extrabold 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle md:text-mdTitle  sm:text-smTitle xs:text-smTitle ">
                  {dataObject.end1}
                </p>
                <p className="mt-5 font-azarMehr font-extrabold 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle md:text-mdTitle  sm:text-smTitle xs:text-smTitle">
                  {dataObject.end2}
                </p>
                <p className="mt-5 font-azarMehr font-extrabold 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle md:text-mdTitle  sm:text-smTitle xs:text-smTitle">
                  {dataObject.end3}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
