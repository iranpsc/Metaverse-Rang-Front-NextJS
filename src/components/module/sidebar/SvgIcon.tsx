import Image from "next/image";

import {
  HomeIcon,
  SingleCitizenMenu,
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
  Citizens,
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
  Categories,
  Trainers,
} from "@/components/svgs/SvgEducation";

export default function SvgIcon({ unique_id, color, name }: any) {
  return (
    <>
      {/* with name */}
      {name === "categories" && (
        <Categories className={`${color} stroke-1 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
      {/* with name */}
      {name === "trainers" && (
        <Trainers className={`${color} stroke-1 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
      {/* with unique_id */}
      {unique_id === 1374 && (
        <SingleCitizenMenu className={`${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
            {unique_id === 262 && (
        <Calender className={`${color} stroke-1 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
      {unique_id === 1419 && (
        <Invitations className={`${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}

      {unique_id === 149 && (
        <HomeIcon className={`${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
      {unique_id === 303 && (
        <HomeIcon className={`${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
      {unique_id === 903 && (
        <LevelIcon className={`${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
      {unique_id === 263 && (
        <Citizens className={`${color} stroke-1 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
      {unique_id === 255 && (
        <News className={`${color} stroke-1 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
      {unique_id === 258 && (
        <Articles className={`${color} stroke-1 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
      {unique_id === 259 && (
        <About className={`${color} stroke-1 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
      {unique_id === 260 && (
        <Contact className={`${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
      {unique_id === 87 && (
        <Trainings className={`${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
      {unique_id === 1414 && (
        <Language className={`${color} stroke-1 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
      {unique_id === 1458 && (
        <Version className={`${color} stroke-1 fill-[#888888]  mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}

      {unique_id === 382 && (
        <Image src={Citizen} alt="Citizen" width={40} height={40} loading="lazy" className="mx-2"/>
      )}
      {unique_id === 68 && (
        <Image src={Developer} alt="Developer" width={40} height={40} loading="lazy" className="mx-2"/>
      )}

      {unique_id === 383 && (
        <Image src={Reporter} alt="Reporter" width={40} height={40} loading="lazy" className="mx-2"/>
      )}
      {unique_id === 331 && (
        <Image src={Participation} alt="Participation" width={40} height={40} loading="lazy" className="mx-2"/>
      )}
      {unique_id === 69 && (
        <Image src={Inspector} alt="Inspector" width={40} height={40} loading="lazy" className="mx-2"/>
      )}
      {unique_id === 70 && (
        <Image src={Businessman} alt="Businessman" width={40} height={40} loading="lazy" className="mx-2"/>
      )}
      {unique_id === 71 && (
        <Image src={Lawyer} alt="Lawyer" width={40} height={40} loading="lazy" className="mx-2"/>
      )}
      {unique_id === 72 && (
        <Image src={CityCouncil} alt="CityCouncil" width={40} height={40} loading="lazy" className="mx-2"/>
      )}
      {unique_id === 73 && (
        <Image src={Mayor} alt="Mayor" width={40} height={40} loading="lazy" className="mx-2"/>
      )}
      {unique_id === 74 && (
        <Image src={Governor} alt="Governor" width={40} height={40} loading="lazy" className="mx-2"/>
      )}
      {unique_id === 75 && (
        <Image src={Minister} alt="Minister" width={40} height={40} loading="lazy" className="mx-2"/>
      )}
      {unique_id === 76 && (
        <Image src={Judge} alt="Judge" width={40} height={40} loading="lazy" className="mx-2"/>
      )}
      {unique_id === 77 && (
        <Image src={Legislator} alt="Legislator" width={40} height={40} loading="lazy" className="mx-2"/>
      )}

    </>
  );
}

