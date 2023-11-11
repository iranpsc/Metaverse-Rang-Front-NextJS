import { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import axios from "axios";
//SVGS
import { CLoseIcon, MenuIcon } from "@/svgs/index";
import { useRouter } from "next/router";
interface HeaderMenuModuleProps {
  isCollapsed: boolean;
  toggleCollapseHandler: () => void;
  profileData: any;
  titleData: any;
}

const HeaderMenuModule: React.FC<HeaderMenuModuleProps> = ({
  isCollapsed,
  toggleCollapseHandler,
  profileData,
  titleData,
}) => {
  
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const { lang, userId } = router.query;
  const [HeaderTitleData, setHeaderTitleData] = useState("");




  return (
    <>
      <div className=" flex justify-between mt-2 flex-row items-center p-2 pb-4">
        {!isCollapsed ? null : ( // /> //   onClick={toggleCollapseHandler} //   className="fill-[#2B2B2B] dark:fill-gray ms-5  cursor-pointer w-[27px]" // <CLoseIcon
          <MenuIcon
            className="stroke-[#2B2B2B] dark:stroke-gray cursor-pointer w-full"
            onClick={toggleCollapseHandler}
            alt={titleData}
          />
        )}
        <Image
          src={theme === "dark" ? "/light.png" : "/moon.png"}
          alt={titleData}
          width={20}
          height={20}
          className={`${
            isCollapsed ? "hidden" : "visible cursor-pointer mx-4 hidden"
          }`}
          onClick={() =>
            theme == "dark" ? setTheme("light") : setTheme("dark")
          }
        />
      </div>
    </>
  );
};

export default HeaderMenuModule;



