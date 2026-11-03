import Image from "next/image";

import {
  HomeIcon,
  SingleCitizenMenu,
  LevelIcon,
  // Belongings,
  // Connections,
  // Dynasty,
  // Infractions,
  Invitations,
  // Permissions,
  // Property,
  // RealEstate,
  // Reward,
  // Structures,
  // Transaction,
  Language,
  Citizens,
  Docs,
  WhitePaper,
  Buildings,
  Wallet,
  PropertyS,

  
} from "@/components/svgs";

import {

  News,
  Articles,
  // Competitions,
  Trainings,
  About,
  Contact,
  Version,
  // Overview,
  Calender,
  Categories,
  Trainers,
  RandId
} from "@/components/svgs/SvgEducation";

export default function SvgIcon({ unique_id, color, name }: any) {
  return (
    <>
      {/* with name */}
      {name === "categories" && (
        <Categories className={`${color} stroke-1 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
            {name === "docs" && (
        <Docs className={`${color}  stroke-2   mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
                  {name === "whitepaper" && (
        <WhitePaper className={`${color} stroke-2   mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
      {/* with name */}
      {name === "trainers" && (
        <Trainers className={`${color} stroke-1 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
            {name === "trainings" && (
        <Trainings className={`${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
      {/* with unique_id */}
       {name === "buildings" && (
        <Buildings className={`${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
      {name === "summary" && (
        <PropertyS className={`${color} stroke-[32px] mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
             {name === "wallet" && (
        <Wallet className={`${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
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
      {unique_id === 1490 && (
        <RandId className={`${color} stroke-[7px] mx-[10px] 3xl:w-7 3xl:h-7  stroke-[#888888] dark:stroke-[#868B90] `} />
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
      {unique_id === 1462 && (
        <Trainings className={`${color} stroke-2 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
      {unique_id === 1414 && (
        <Language className={`${color} stroke-1 mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}
      {unique_id === 1458 && (
        <Version className={`${color} stroke-1 fill-[#888888]  mx-[10px] 3xl:w-7 3xl:h-7`} />
      )}

      {unique_id === 382 && (
        <Image src="/svg/level/citizen.png" alt="Citizen" width={30} height={40} loading="lazy" className="mx-2" />
      )}
      {unique_id === 383 && (
        <Image src="/svg/level/reporter.png" alt="Reporter" width={30} height={40} loading="lazy" className="mx-2" />
      )}
      {unique_id === 589 && (
        <Image src="/svg/level/participation.png" alt="Participation" width={30} height={40} loading="lazy" className="mx-2" />
      )}
      {unique_id === 68 && (
        <Image src="/svg/level/developer.png" alt="Developer" width={30} height={40} loading="lazy" className="mx-2" />
      )}
      {unique_id === 69 && (
        <Image src="/svg/level/inspector.png" alt="Inspector" width={30} height={40} loading="lazy" className="mx-2" />
      )}
      {unique_id === 590 && (
        <Image src="/svg/level/businessman.png" alt="Businessman" width={30} height={40} loading="lazy" className="mx-2" />
      )}
      {unique_id === 71 && (
        <Image src="/svg/level/lawyer.png" alt="Lawyer" width={30} height={40} loading="lazy" className="mx-2" />
      )}
      {unique_id === 591 && (
        <Image src="/svg/level/city-council.png" alt="City Council" width={30} height={40} loading="lazy" className="mx-2" />
      )}
      {unique_id === 592 && (
        <Image src="/svg/level/the-mayor.png" alt="Mayor" width={30} height={40} loading="lazy" className="mx-2" />
      )}
      {unique_id === 74 && (
        <Image src="/svg/level/governor.png" alt="Governor" width={30} height={40} loading="lazy" className="mx-2" />
      )}
      {unique_id === 75 && (
        <Image src="/svg/level/minister.png" alt="Minister" width={30} height={40} loading="lazy" className="mx-2" />
      )}
      {unique_id === 76 && (
        <Image src="/svg/level/judge.png" alt="Judge" width={30} height={40} loading="lazy" className="mx-2" />
      )}
      {unique_id === 77 && (
        <Image src="/svg/level/legislator.png" alt="Legislator" width={30} height={40} loading="lazy" className="mx-2" />
      )}

    </>
  );
}

