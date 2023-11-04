import { LogoRgb,ArrowMenu } from "@/svgs/index";

export default function HeaderMenuEducationModule({
  isCollapsed,
  menuData,
  toggleCollapseHandler,
}: {
  isCollapsed: boolean;
  menuData: any[];
  toggleCollapseHandler: () => void;
}) {
 
  return (
    <>
      <div className="flex flex-row justify-between items-center ">
        <div
          className={`flex ${
            isCollapsed ? "ms-3" : "ms-4"
          } items-center gap-3 justify-center my-1 pb-1`}
        >
          <LogoRgb
            className={`${
              isCollapsed
                ? "xl:w-[40px]  xl:h-[45px]"
                : "xl:w-[80px]  xl:h-[55px]"
            }  lg:w-[33px] lg:h-[33px] md:w-[30px] md:h-[30px] sm:w-[30px] sm:h-[30px] xs:w-[30px] xs:h-[30px] rounded-[1rem]`}
          />
          {!isCollapsed ? (
            <div className="inline-block w-full  ">
              {menuData && menuData.length > 0 && (
                <p className="visible dark:text-white block font-azarMehr font-bold xl:text-[16px] lg:text-md max-lg:text-md text-black pb-[2px] ">
                  {menuData[0].translation}
                </p>
              )}
              {menuData && menuData.length > 1 && (
                <p className="dark:text-dark-gray visible font-normal text-mediumGray xl:text-[14px] lg:text-sm max-lg:text-sm ">
                  {menuData[1].translation} 
                </p>
              )}
            </div>
          ) : null}
        </div>
        <div
          className={` ${
            isCollapsed ? "invisible" : "visible"
          } w-[35px] h-[35px] cursor-pointer rounded-full bg-[#efefef] dark:bg-black flex justify-center items-center me-3`}
          onClick={toggleCollapseHandler}
        >
          <ArrowMenu className="w-[7px] h-[13px] stroke-[#2C2F32] dark:stroke-white" />
        </div>
      </div>
      <hr
        className={`${
          isCollapsed ? "mx-5" : "mx-2"
        } border-[1px] border-[#00000017] dark:border-[#3F3F3F]`}
      />
    </>
  );
}


