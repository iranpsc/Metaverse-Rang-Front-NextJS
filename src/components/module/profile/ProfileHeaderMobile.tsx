import { useContext ,useState,useEffect} from "react";
import { SideBarContext } from "@/components/context/SidebarContext";
import { CLoseIcon, MenuIcon, LogoRgbMobile } from "@/components/svgs";

export default function ProfileHeaderMobile({ menuData, profileData, profileName }: any) {
  const { isCollapsed, toggleCollapseHandler } = useContext(SideBarContext);
  const [title, SetTitle] = useState<any>([]);
  const [desc, setDesc] = useState<any>([]);

  const namesToKeep = ["meta rgb", "metaverse rang"];

  useEffect(() => {
    if (menuData) {
      SetTitle(
        menuData.data.menu.find((item: any) => item.name === "meta rgb")
      );
      setDesc(
        menuData.data.menu.find((item: any) => item.name === "metaverse rang")
      );
    }
  }, [menuData]);

  return (
    <>
      <div className=" dark:bg-dark-background xl:hidden lg:hidden md:hidden sm:flex xs:flex  z-50 w-full h-[59px] bg-white flex-rows justify-between items-center">
        <div className="">
          {!isCollapsed ? (
            <CLoseIcon
              className="fill-[#2B2B2B] dark:fill-gray cursor-pointer w-[25px]"
              onClick={toggleCollapseHandler}
              alt="closeIcon"
            />
          ) : (
            <>
              <MenuIcon
                className="stroke-[#2B2B2B] dark:stroke-gray cursor-pointer w-[35px]"
                onClick={toggleCollapseHandler}
                alt="menuIcon"
              />
            </>
          )}
        </div>

        <div className="flex flex-rows justify-center items-center ">
          <div className=" ml-1 flex flex-col ">
            <p className=" dark:text-white md:text-[16px] block font-azarMehr text-end  font-bold text-[18px] mt-1 text-black sm:text-center">
              {title?.translation}
            </p>
            <p className="dark: text-dark-gray mt-[-5px] md:text-[11px] font-normal text-mediumGray ">
              {desc?.translation}
            </p>
          </div>
          <LogoRgbMobile
            className="w-[40px] h-[40px] mx-1 "
            alt="rgb metaverse"
          />
        </div>
      </div>
    </>
  );
}
