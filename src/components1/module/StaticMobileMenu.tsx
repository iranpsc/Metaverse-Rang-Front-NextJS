import { useContext } from "react";
import { Property, HomeIcon, Transaction, Reward, Connections } from "../svgs";
import { SideBarContext } from "../context/SidebarContext";
import { LangContext } from "@/context/LangContext";

const StaticMobileMenu: React.FC<any> = () => {
  const { state, dispatch } = useContext(SideBarContext);
  const { languageSelected } = useContext(LangContext);

  const setActiveMenuItem = (value: number) => {
    dispatch({ type: "SET_SHOW_MENU_ITEM", payload: value });
  };

  return (
    <div className="flex flex-row justify-evenly  items-center md:h-[75px] xs:h-[50px] sm:h-[50px]  ">
      <Connections
        className="stroke-gray dark:stroke-dark-gray md:w-[40px] md:h-[40px] sm:w-[25px] xs:w-[25px] sm:h-[25px] xs:h-[25px] cursor-pointer"
        onClick={() =>
          setActiveMenuItem(languageSelected.code === "en" ? 1882 : 1883)
        }
      />
      <div className="h-[50%] w-[1px] bg-gray dark:bg-dark-gray bg-opacity-30" />
      <Transaction
        className="stroke-gray dark:stroke-dark-gray  md:w-[40px] md:h-[40px] sm:w-[25px] xs:w-[25px] sm:h-[25px] xs:h-[25px] cursor-pointer"
        onClick={() =>
          setActiveMenuItem(languageSelected.code === "en" ? 1870 : 1871)
        }
      />
      <div className="h-[50%] w-[1px] bg-gray dark:bg-dark-gray bg-opacity-30" />
      <HomeIcon className="stroke-blueLink dark:stroke-dark-activeButton md:w-[40px] md:h-[40px] sm:w-[25px] xs:w-[25px] sm:h-[25px] xs:h-[25px] cursor-pointer " />
      <div className="h-[50%] w-[1px] bg-gray dark:bg-dark-gray bg-opacity-30 cursor-pointer" />
      <Reward
        className="stroke-gray dark:stroke-dark-gray  md:w-[40px] md:h-[40px] sm:w-[25px] xs:w-[25px] sm:h-[25px] xs:h-[25px] cursor-pointer"
        onClick={() =>
          setActiveMenuItem(languageSelected.code === "en" ? 1874 : 1875)
        }
      />
      <div className="h-[50%] w-[1px] bg-gray dark:bg-dark-gray  bg-opacity-30" />
      <Property
        className="stroke-gray dark:stroke-dark-gray ] md:w-[40px] md:h-[40px] sm:w-[25px] xs:w-[25px] sm:h-[25px] xs:h-[25px] cursor-pointer"
        onClick={() =>
          setActiveMenuItem(languageSelected.code === "en" ? 1846 : 1847)
        }
      />
    </div>
  );
};

export default StaticMobileMenu;