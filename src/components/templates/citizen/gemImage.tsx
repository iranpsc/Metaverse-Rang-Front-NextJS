"use client";
import Image from "next/image";

export default function CitizenClientImage({ item }: any) {
  return (
    <Image
      data-tooltip-id={item.name}
      src={item.image}
      width={27}
      height={27}
      alt={item.name}
      title={item.name}
      className="w-[30px] xl:w-[45px] 2xl:w-[50px] inline"
    />
  );
}
