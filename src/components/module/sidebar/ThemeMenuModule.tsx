"use client";
import useDarkMode from "src/hooks/use-dark-mode";

import { Dark, Light } from "@/svgs/index";
//CONTEXT

const ThemeMenuModule = ({ isClosed, defaultTheme, params }: any) => {
  const { theme, toggoleTheme } = useDarkMode(defaultTheme);

  return (
    <div
      className={`${
        isClosed ? "w-[70px] hidden" : "w-[90%] "
      }   flex justify-center items-center transition-all `}
    >
      {isClosed ? (
        <div
          className={` ${
            theme === "dark" ? "bg-black" : "bg-[#e9eef8]"
          } w-[40px] mx-2 h-[40px] rounded-full  flex justify-center items-center `}
          onClick={toggoleTheme}
        >
          {theme === "dark" ? (
            <Dark
              className={` ${
                theme === "dark" ? "stroke-white" : "stroke-gray"
              }  stroke-[2px] `}
            />
          ) : (
            <Light
              className={` ${
                theme === "dark"
                  ? "stroke-gray fill-gray"
                  : "stroke-black fill-black"
              }`}
            />
          )}
        </div>
      ) : (
        // <div className="bg-[#e9eef8] dark:bg-black w-[90%] rounded-full flex flex-row  justify-center items-center gap-3">
        //   <div
        //     className={`
        //   ${theme === "dark" ? "#1A1A18" : "bg-[#fcfcfc]"}
        //   w-[135px] h-[28px] my-1 ms-1 rounded-full flex flex-row  justify-center items-center cursor-pointer `}
        //     onClick={toggoleTheme}
        //   >
        //     <Light
        //       className={` ${
        //         theme === "dark"
        //           ? "stroke-[#F8F8F8] fill-[#F8F8F8]"
        //           : "stroke-black fill-black"
        //       }`}
        //     />
        //     <p
        //       className={` ${
        //         theme === "dark" ? "text-[#F8F8F8]" : "text-black"
        //       } font-azarMehr font-medium xl:text-[14px] lg:text-[14px] md:text-[14px] xs:text-[12px] sm:text-[12px] mb-1  ms-2 `}
        //     >
        //       {/* {state.dataTheme[0]?.name && state.dataTheme[0].translation} */}
        //       {params.lang == "fa" ? "روشن" : "on"}
        //     </p>
        //   </div>

        //   <div
        //     className={`
        //   ${theme === "dark" ? "bg-[#1A1A18]" : ""}
        //   w-[135px] h-[28px] my-1 rounded-full flex flex-row  justify-center items-center gap-3 me-1  cursor-pointer `}
        //     onClick={toggoleTheme}
        //   >
        //     <Dark
        //       className={` ${
        //         theme === "dark" ? "stroke-[#F8F8F8]" : "stroke-gray"
        //       }  stroke-[2px] `}
        //     />
        //     <p
        //       className={` ${
        //         theme === "dark" ? "text-[#F8F8F8]" : "text-black"
        //       } font-azarMehr xl:text-[14px] lg:text-[14px] md:text-[14px] xs:text-[12px] sm:text-[12px] font-medium  `}
        //     >
        //       {/* {state.dataTheme[1]?.name && state.dataTheme[1].translation} */}
        //       {params.lang == "fa" ? "تاریک" : "off"}
        //     </p>
        //   </div>
        // </div>
               <div
          className={` ${
            theme === "dark" ? "bg-black" : "bg-[#e9eef8]"
          } w-[31px] h-[31px] md:w-[25px] md:h-[25px] xl:w-[31px] xl:h-[31px] rounded-full  flex justify-center items-center  cursor-pointer`}
          onClick={toggoleTheme}
        >
          {theme === "dark" ? (
            <Dark
              className={` ${
                theme === "dark" ? "stroke-white" : "stroke-gray"
              }  stroke-[2px] `}
            />
          ) : (
            <Light
              className={` ${
                theme === "dark"
                  ? "stroke-gray fill-gray"
                  : "stroke-black fill-black"
              }`}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ThemeMenuModule;
