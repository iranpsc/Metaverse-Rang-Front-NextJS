import { LogoRgb } from "@/svgs/SvgLogoWeb";

export default function TopMenuModule({
  isCollapsed,
  menuData,
}: {
  isCollapsed: boolean;
  menuData: any[];
}) {
  const namesToKeep = ["meta rgb", "metaverse rang"];

  const filteredItems = menuData.filter((item: any) =>
    namesToKeep.includes(item.name)
  );

  return (
    <>
      <div
        className={`flex ${
          isCollapsed ? "ps-0" : "ps-5"
        } items-center gap-1 justify-center pb-3`}
      >
        <LogoRgb
          className={`mx-1  ${
            isCollapsed
              ? "xl:w-[45px]  xl:h-[50px]"
              : "xl:w-[60px]  xl:h-[65px]"
          }  lg:w-[33px] lg:h-[33px] md:w-[30px] md:h-[30px] sm:w-[30px] sm:h-[30px] xs:w-[30px] xs:h-[30px] rounded-[1rem]`}
        />
        {!isCollapsed ? (
          <div className="inline-block w-full mt-1 ">
            {filteredItems && filteredItems.length > 0 && (
              <p className="visible dark:text-white block font-azarMehr font-bold xl:text-xl lg:text-md max-lg:text-md text-black">
                {filteredItems[0].translation}
              </p>
            )}
            {filteredItems && filteredItems.length > 1 && (
              <p className="dark:text-dark-gray visible font-normal text-mediumGray xl:text-lg lg:text-sm max-lg:text-sm">
                {filteredItems[1].translation}
              </p>
            )}
          </div>
        ) : null}
      </div>
      <hr className="mx-7 border-[1px] border-[#00000017] dark:border-[#3F3F3F]" />
    </>
  );
}
