import Image from "next/image";
import { useRouter } from "next/router";
import { MenuIcon, ArrowMenu } from "@/svgs/index";
import { useContext } from "react";
import { SideBarContext } from "@/components/context/SidebarContext";
export default function HeaderMenuEducationModule() {
  const { state, toggleCollapseHandler } = useContext(SideBarContext);
  const router = useRouter();
  const { lang } = router.query;
  return (
    <>
      {!state.isCollapsed ? null : (
        <MenuIcon
          className="stroke-[#2B2B2B] dark:stroke-white cursor-pointer w-full mb-2"
          onClick={toggleCollapseHandler}
          alt="toggle"
        />
      )}
      <div className="flex flex-row justify-between items-center relative ">
        <div
          className={`flex ${
            state.isCollapsed ? "ms-3" : "ms-[1px]"
          } items-center gap-3 justify-center my-1 pb-1 `}
        >
          <Image
            src="/logo.png"
            alt="rgb metaverse"
            width={500}
            height={500}
            className={`${
              state.isCollapsed
                ? "xl:w-[45px] xl:h-[45px] ms-0"
                : "xl:w-[80px] xl:h-[50px] ms-2"
            }  lg:w-[40px] lg:h-[35px] md:w-[30px] md:h-[30px] sm:w-[45px] sm:h-[45px] xs:w-[50px] xs:h-[50px] `}
          />
          {!state.isCollapsed ? (
            <div className="inline-block w-full  ">
              {state.dataHeader && state.dataHeader.length > 0 && (
                <p className="visible  dark:text-white whitespace-nowrap	 block font-azarMehr font-bold xl:text-[16px] lg:text-[14px] md:text-[13px] sm:text-[12px] xs:text-[12px] text-black pb-[2px] ">
                  {state.dataHeader[0].translation}
                </p>
              )}
              {state.dataHeader && state.dataHeader.length > 1 && (
                <p className="dark:text-dark-gray visible font-azarMehr font-normal text-gray xl:text-[14px] lg:text-[11px] md:text-[13px] sm:text-[10px] xs:text-[10px] ">
                  {state.dataHeader[1].translation}
                </p>
              )}
            </div>
          ) : null}
        </div>
        <div
          className={` ${state.isCollapsed ? "invisible" : "visible"}
           xl:w-[35px] xl:h-[35px] 
           lg:w-[30px] lg:h-[30px] 
           md:w-[35px] md:h-[35px] 
           sm:w-[30px] sm:h-[30px] 
           xs:w-[30px] xs:h-[30px] 
           
          
          
        absolute ${
          lang === "en" ? "end-[-7px]" : "end-0"
        }  cursor-pointer rounded-full bg-[#efefef] dark:bg-mediumGray flex justify-center items-center me-2`}
          onClick={toggleCollapseHandler}
        >
          <ArrowMenu
            className={`w-[7px] ${
              lang === "en" ? "rotate-180" : "rotate-0"
            } h-[13px] stroke-gray dark:stroke-white`}
          />
        </div>
      </div>
      <hr
        className={`${
          state.isCollapsed ? "mx-5" : "mx-2"
        } border-[1px] border-[#00000017] dark:border-[#3F3F3F] my-1`}
      />
    </>
  );
}
