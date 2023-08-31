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
} from "../svgs";
import { LangContext } from "../context/LangContext";
import { SideBarContext } from "../context/SidebarContext";;

export default function SvgIcon({ name, color }: any) {

  const { languageSelected } = useContext(LangContext);
  const { isCollapsed  } =useContext(SideBarContext);
  return (
    <>
      {name === "home" && (
        <HomeIcon stroke="#ff0000" className={` ${color} stroke-2 mx-[10px]`} />
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
      {name === "infractions" && (
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
        <RealEstate className={` ${color} stroke-2 mx-[10px]`} />
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
      {name === "language" &&  (
        languageSelected.icon ?  
        <Image src={languageSelected.icon} alt="" width={100} height={100} className={`${isCollapsed ? 'w-[90%] ps-5':'w-10 h-7'}`}/>
         :
         (<Language className={` ${color} stroke-1 mx-[10px]`} />)
       
      )}
    </>
  );
}