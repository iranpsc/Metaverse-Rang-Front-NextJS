"use client";
import Image from "next/image";
import { Tooltip as ReactTooltip } from "react-tooltip";

export default function CitizenClientImage({ item }: any) {
  return (
    <>
      <Image
        data-tooltip-id={item.name}
        src={item.image}
        width={64}
        height={64}
        alt={item.name}
        className="w-[30px] xl:w-[40px] 2xl:w-[50px] inline"
      />
      <ReactTooltip
        id={item.name}
        place="top"
        className="tooltip-bg-color text-center"
        content={item.name}
      />
    </>
  );
}
