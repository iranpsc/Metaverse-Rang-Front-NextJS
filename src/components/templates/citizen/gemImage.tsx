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
      className="w-[60px] sm:w-[27px] md:w-[30px] lg:w-[35px] xl:w-[40px] 2xl:w-[45px]"
    />
  );
}
