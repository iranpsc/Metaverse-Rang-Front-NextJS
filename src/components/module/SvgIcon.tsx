import { useContext } from "react";
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
Lang
 const {  selectedProfileData } = useContext(LangContext);


export default function SvgIcon({ name,color }: any) {
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
      {name === "real-estate" && (
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
      {name === "language" && (
        <Language className={` ${color} stroke-1 mx-[10px]`} />
      )}
    </>
  );
}
