import { useContext, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { CLoseIcon, LogoRgb } from "@/svgs/index";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { LangContext } from "@/context/LangContext";
//ANIMATION
import { motion } from "framer-motion";
import { SideBarContext } from "../context/SidebarContext";
import MenuItemsCard from "../module/MenuItemsCard";


export default function MenuItemPage() {
  const { data } = useContext(LangContext);
  const { ActiveItemMenu, setActiveItemMenu } = useContext(SideBarContext);
  const { theme } = useTheme();
  const router = useRouter();
  const lang = router.query.lang;



  return (
    <div className="absolute backdrop-blur-sm bg-blackTransparent/30 z-50 top-0 w-full h-screen ">
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
            className="xl:w-[40%] lg:w-[40%] md:w-[40%] min-h-[350px] h-[500px]  rounded-[15px] flex flex-col relative me-[250px] sm:me-0 sm:w-[90%] xs:me-0 xs:w-[90%] justify-start xl:mt-0 lg:mt-0 md:mt-0 
              mt-[100px]  items-center bg-white dark:bg-dark-background  shadow-md"
          >
            <div className=" bg-[#fff] w-full h-[75px] relative shadow-md rounded-[10px] flex flex-row justify-between items-center">
              <CLoseIcon
                className="w-[15px] h-[15px] cursor-pointer stroke-2 m-2 stroke-gray ms-3"
                onClick={() => setActiveItemMenu("")}
                alt="Close"
              />
              <div>
                <h1 className="font-azarMehr text-center text-[18px] text-[#000] font-bold">
                  دارای (درحال توسعه)
                </h1>
                <p className="w-full text-center text-[16px] text-gray font-bold">
                  با سلام به دنیای دارایی شهروندان! 🌟
                </p>
              </div>
              <LogoRgb
                className="w-[40px] h-[40px] me-3"
                onClick={() => setActiveItemMenu("")}
                alt="Metaverse RGB"
              />
            </div>

            <div className="bg-white w-[99%] h-full overflow-y-scroll overflow-x-clip">
           
              <MenuItemsCard/>
               
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
