import { useContext, useState,useEffect } from "react";
import { CLoseIcon, LogoRgb } from "@/svgs/index";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { LangContext } from "@/context/LangContext";
//ANIMATION

import { motion } from "framer-motion";
//data
import { Items, ItemsENG } from "../utils/items";

export default function MenuItemPage({ activeItem, SetActiveItem }: any) {
   const { theme } = useTheme();
  const {languageSelected} = useContext(LangContext);
  const [data, setData] = useState<any>([]);

useEffect(() => {
  if(languageSelected.code==="fa"){
    setData(Items.filter((item: any) => item.id == activeItem));
  }else{
    setData(ItemsENG.filter((item: any) => item.id == activeItem));

  }
}, [activeItem,languageSelected.code]);
  
  return (
    <div
      id={`${theme === "dark" ? "dark-scrollbar" : "light-scrollbar"}`}
      className="absolute backdrop-blur-sm bg-blackTransparent/30 3xl:z-50 xl:z-50 lg:z-50 md:z-[200] sm:z-[200] xs:z-[200] top-0 w-full h-screen  "
    >
      {data.length>0 &&
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
          >
            <div className=" w-full h-[75px] relative shadow-md rounded-t-[10px] flex flex-row justify-center items-center">
              <CLoseIcon
                className="absolute z-50  w-[15px] h-[15px] cursor-pointer stroke-2 m-2 stroke-gray start-2"
                onClick={() => SetActiveItem(0)}
                alt="Close"
              />
              <div>
                <h1 className="font-azarMehr text-center text-[18px] text-black dark:text-white font-bold">
                  {data && data[0].title}
                </h1>
                <p className="w-full text-center 3xl:text-[16px] xl:text-[16px] lg:text-[16px] md:text-[14px] sm:text-[12px] xs:text-[12px] text-black dark:text-white font-bold">
                  {data && data[0].hello}
                </p>
              </div>
            </div>

            <div className="bg-white dark-scrollbar dark:bg-dark-background w-[100%] px-2 h-full overflow-y-scroll overflow-x-clip  pb-10">
              <p className="w-full text-center text-[16px] font-azarMehr font-semibold 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle md:text-mdTitle  sm:text-smTitle xs:text-smTitle mt-5">
                { data && data[0].desc}
              </p>
              <p className="w-full text-center font-azarMehr font-bold 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle md:text-mdTitle  sm:text-smTitle xs:text-smTitle  mt-5">
                { data && data[0].subtitleItems}
              </p>
              {data && data[0].subItems.map((item: any) => (
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
                { data && data[0]?.time[0]?.title}
              </p>
              <p className="mt-1 text-start font-azarMehr font-medium 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle md:text-mdTitle  sm:text-smTitle xs:text-smTitle ">
                {data && data[0]?.time[0]?.desc}
              </p>

              <p className="mt-10 font-azarMehr font-extrabold 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle md:text-mdTitle  sm:text-smTitle xs:text-smTitle ">
                { data && data[0].end1}
              </p>
              <p className="mt-5 font-azarMehr font-extrabold 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle md:text-mdTitle  sm:text-smTitle xs:text-smTitle">
                { data && data[0].end2}
              </p>
              <p className="mt-5 font-azarMehr font-extrabold 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle md:text-mdTitle  sm:text-smTitle xs:text-smTitle">
                { data && data[0].end3}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
}
    </div>
  );
}