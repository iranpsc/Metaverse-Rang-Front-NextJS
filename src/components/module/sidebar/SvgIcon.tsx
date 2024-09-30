import Image from "next/image";

import {
  HomeIcon,
  LevelIcon,
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
  Mayor,
  Reporter,
  Participation,
  Lawyer,
  Inspector,
  Governor,
  Developer,
  CityCouncil,
  Citizen,
  Businessman,
  Judge,
  Legislator,
  Minister,
} from "@/components/svgs";

import {
  News,
  Articles,
  Competitions,
  Trainings,
  About,
  Contact,
  Version,
  Overview,
  Calender,
} from "@/components/svgs/SvgEducation";

export default function SvgIcon({ name, color }: any) {
  return (
    <>
      {name === "home" && (
        <HomeIcon
          stroke="#ff0000"
          className={` ${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`}
        />
      )}
      {name === "list of levels" && (
        <LevelIcon
          stroke="#ff0000"
          className={` ${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`}
        />
      )}
      {name === "news" && (
        <News className={` ${color} stroke-4 mx-[10px]  3xl:w-7 3xl:h-7`} />
      )}
      {name === "articles" && (
        <Articles
          stroke="#ff0000"
          className={` ${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`}
        />
      )}
      {name === "competitions" && (
        <Competitions
          className={` ${color} stroke-2 mx-[10px]  3xl:w-7 3xl:h-7 `}
        />
      )}
      {name === "trainings" && (
        <Trainings
          stroke="#ff0000"
          className={` ${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`}
        />
      )}
      {name === "about" && (
        <About className={` ${color} stroke-4 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
      {name === "contact" && (
        <Contact
          stroke="#ff0000"
          className={` ${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`}
        />
      )}
      {name === "calendar" && (
        <Calender
          stroke="#ff0000"
          className={` ${color}   stroke-[1.5px] mx-[10px] 3xl:w-7 3xl:h-7`}
        />
      )}
      {name === "overview" && (
        <Overview
          stroke="#ff0000"
          className={` ${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`}
        />
      )}
      {name === "version" && (
        <Version
          stroke="#ff0000"
          className={` ${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`}
        />
      )}
      {name === "belongings" && (
        <Belongings
          className={` ${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`}
        />
      )}
      {name === "connections" && (
        <Connections
          className={` ${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`}
        />
      )}
      {name === "dynasty" && (
        <Dynasty className={` ${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
      {name === "citizens" && (
        <Dynasty className={` ${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
      {name === "crimes" && (
        <Infractions
          className={` ${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`}
        />
      )}
      {name === "invitations" && (
        <Invitations
          className={` ${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`}
        />
      )}
      {name === "permissions" && (
        <Permissions
          className={` ${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`}
        />
      )}
      {name === "property" && (
        <Property className={` ${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
      {name === "real estate" && (
        <RealEstate
          className={` ${color} stroke-2 mx-[10px] group 3xl:w-7 3xl:h-7`}
        />
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
      {name === "home page" && (
        <HomeIcon className={` ${color} stroke-1 mx-[7px]  3xl:w-7 3xl:h-7`} />
      )}
      {name === "citizen" && (
        <Image src={Citizen} alt="" width={30} height={30} loading="lazy" />
      )}
      {name === "journalist" && (
        <Image src={Reporter} alt="" width={30} height={30} loading="lazy" />
      )}
      {name === "participant" && (
        <Image
          src={Participation}
          alt=""
          width={30}
          height={30}
          loading="lazy"
        />
      )}
      {name === "developer" && (
        <Image src={Developer} alt="" width={30} height={30} loading="lazy" />
      )}
      {name === "inspector" && (
        <Image src={Inspector} alt="" width={30} height={30} loading="lazy" />
      )}
      {name === "businessman" && (
        <Image src={Businessman} alt="" width={30} height={30} loading="lazy" />
      )}
      {name === "lawyer" && (
        <Image src={Lawyer} alt="" width={30} height={30} loading="lazy" />
      )}
      {name === "city council" && (
        <Image src={CityCouncil} alt="" width={30} height={30} loading="lazy" />
      )}
      {name === "the mayor" && (
        <Image src={Mayor} alt="" width={30} height={30} loading="lazy" />
      )}
      {name === "governor" && (
        <Image src={Governor} alt="" width={30} height={30} loading="lazy" />
      )}
      {name === "minister" && (
        <Image src={Minister} alt="" width={30} height={30} loading="lazy" />
      )}{" "}
      {name === "legislator" && (
        <Image src={Legislator} alt="" width={30} height={30} loading="lazy" />
      )}{" "}
      {name === "judge" && (
        <Image src={Judge} alt="" width={30} height={30} loading="lazy" />
      )}
    </>
  );
}
