import { useContext } from "react";
import Image from "next/image";
import {
  HomeIcon,
  Belongings,
  Connections,
  Dynasty,
  Infractions,
  Invitations,
  Permissions,
  Property,
  RealEstate,
  Reward,
  Structures,
  Transaction,
  Language,
  News,
  Articles,
  Competitions,
  Trainings,
  About,
  Contact,
  Version,
  Overview,
  Calender,
} from "../svgs";
import { LangContext } from "@/context/LangContext";
import { SideBarContext } from "@/context/SidebarContext";;

export default function SvgIcon({ name, color }: any) {

  const { languageSelected } = useContext(LangContext);
  const { isCollapsed  } =useContext(SideBarContext);
  return (
    <>
      {name === "home" && (
        <HomeIcon stroke="#ff0000" className={` ${color} stroke-2 mx-[10px]`} />
      )}
      {name === "news" && (
        <News
          stroke="#ff0000"
          className={` ${color} stroke-[1px] mx-[10px] hover:text-[#0000ffd9] dark:hover:text-dark-yellow`}
        />
      )}
      {name === "articles" && (
        <Articles
          stroke="#ff0000"
          className={` ${color} stroke-[1px] mx-[10px]`}
        />
      )}
      {name === "competitions" && (
        <Competitions
          stroke="#ff0000"
          className={` ${color} stroke-[1px] mx-[10px]`}
        />
      )}
      {name === "trainings" && (
        <Trainings
          stroke="#ff0000"
          className={` ${color} stroke-[1px] mx-[10px]`}
        />
      )}
      {name === "about" && (
        <About
          stroke="#ff0000"
          className={` ${color} stroke-[1px] mx-[10px]`}
        />
      )}
      {name === "contact" && (
        <Contact
          stroke="#ff0000"
          className={` ${color} stroke-[1px] mx-[10px]`}
        />
      )}
      {name === "calendar" && (
        <Calender
          stroke="#ff0000"
          className={` ${color} stroke-[1px] mx-[10px]`}
        />
      )}
      {name === "overview" && (
        <Overview
          stroke="#ff0000"
          className={` ${color} stroke-[1px] mx-[10px]`}
        />
      )}
      {name === "version" && (
        <Version
          stroke="#ff0000"
          className={` ${color} stroke-[1px] mx-[10px]`}
        />
      )}
      {name === "belongings" && (
        <Belongings className={` ${color} stroke-2 mx-[10px]`} />
      )}
      {name === "connections" && (
        <Connections className={` ${color} stroke-2 mx-[10px]`} />
      )}
      {name === "dynasty" && (
        <Dynasty className={` ${color} stroke-2 mx-[10px]`} />
      )}
      {name === "citizens" && (
        <Dynasty className={` ${color} stroke-2 mx-[10px]`} />
      )}
      {name === "crimes" && (
        <Infractions className={` ${color} stroke-2 mx-[10px]`} />
      )}
      {name === "invitations" && (
        <Invitations className={` ${color} stroke-2 mx-[10px]`} />
      )}
      {name === "permissions" && (
        <Permissions className={` ${color} stroke-2 mx-[10px]`} />
      )}
      {name === "property" && (
        <Property className={` ${color} stroke-2 mx-[10px]`} />
      )}
      {name === "real estate" && (
        <RealEstate
          className={` ${color} stroke-2 mx-[10px] group`}
        />
      )}
      {name === "reward" && (
        <Reward className={` ${color} stroke-2 mx-[10px]`} />
      )}
      {name === "structures" && (
        <Structures className={` ${color} stroke-2 mx-[10px]`} />
      )}
      {name === "transaction" && (
        <Transaction className={` ${color} stroke-2 mx-[10px]`} />
      )}
      {name === "language" && (
        <Language className={` ${color} stroke-1 mx-[10px] `} />
      )}
    </>
  );
}