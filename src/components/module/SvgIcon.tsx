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

export default function SvgIcon({ name, color }: any) {

  return (
    <>
      {name === "home" && (
        <HomeIcon
          stroke="#ff0000"
          className={` ${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`}
        />
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
          className={` ${color} stroke-[1px] mx-[10px] 3xl:w-7 3xl:h-7`}
        />
      )}
      {name === "competitions" && (
        <Competitions
          stroke="#ff0000"
          className={` ${color} stroke-[1px] mx-[10px] 3xl:w-7 3xl:h-7`}
        />
      )}
      {name === "trainings" && (
        <Trainings
          stroke="#ff0000"
          className={` ${color} stroke-[1px] mx-[10px] 3xl:w-7 3xl:h-7`}
        />
      )}
      {name === "about" && (
        <About
          stroke="#ff0000"
          className={` ${color} stroke-[1px] mx-[10px] 3xl:w-7 3xl:h-7`}
        />
      )}
      {name === "contact" && (
        <Contact
          stroke="#ff0000"
          className={` ${color} stroke-[1px] mx-[10px] 3xl:w-7 3xl:h-7`}
        />
      )}
      {name === "calendar" && (
        <Calender
          stroke="#ff0000"
          className={` ${color} stroke-[1px] mx-[10px] 3xl:w-7 3xl:h-7`}
        />
      )}
      {name === "overview" && (
        <Overview
          stroke="#ff0000"
          className={` ${color} stroke-[1px] mx-[10px] 3xl:w-7 3xl:h-7`}
        />
      )}
      {name === "version" && (
        <Version
          stroke="#ff0000"
          className={` ${color} stroke-[1px] mx-[10px] 3xl:w-7 3xl:h-7`}
        />
      )}
      {name === "belongings" && (
        <Belongings className={` ${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
      {name === "connections" && (
        <Connections className={` ${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
      {name === "dynasty" && (
        <Dynasty className={` ${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
      {name === "citizens" && (
        <Dynasty className={` ${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
      {name === "crimes" && (
        <Infractions className={` ${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
      {name === "invitations" && (
        <Invitations className={` ${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
      {name === "permissions" && (
        <Permissions className={` ${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
      {name === "property" && (
        <Property className={` ${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
      {name === "real estate" && (
        <RealEstate className={` ${color} stroke-2 mx-[10px] group 3xl:w-7 3xl:h-7`} />
      )}
      {name === "reward" && (
        <Reward className={` ${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
      {name === "structures" && (
        <Structures
          className={` ${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`}
        />
      )}
      {name === "transaction" && (
        <Transaction
          className={` ${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`}
        />
      )}
      {name === "language" && (
        <Language
          className={` ${color} stroke-1 mx-[10px] me-1 3xl:w-7 3xl:h-7`}
        />
      )}
    </>
  );
}