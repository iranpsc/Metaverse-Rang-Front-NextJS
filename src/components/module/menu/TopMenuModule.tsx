import Image from "next/image";
import { LoginMenu } from "./../../svgs/index";

export default function TopMenuModule({ isCollapsed,menuData}:any) {

  const namesToKeep = ['meta rgb', 'metaverse rang'];

const filteredItems = menuData.filter((item:any) => namesToKeep.includes(item.name));

  return (
    <>
      <div
        className={`flex ${
          isCollapsed ? "ps-0" : "ps-5"
        } items-center gap-1 justify-center pb-[1rem]`}
      >
        <Image
          src="/cdlogo.png"
          width={1000}
          height={1000}
          alt=""
          className=" mx-1 xl:w-[40px] xl:h-[40px] lg:w-[33px] lg:h-[33px] max-lg:w-[30px] max-lg:h-[30px] object-cover rounded-[1rem]"
        />
        {!isCollapsed ? (
          <div className="inline-block w-full ">
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
    </>
  );
}
