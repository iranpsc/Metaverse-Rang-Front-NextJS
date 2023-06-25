import React from "react";
import Link from "next/link";
import Image from "next/image";
import Divider from "../../common/divider";
import user from "../../../../../public/png/user.png"

export default function BestTrainers() {
  return (
    <>
      <Divider title="مربیان برتر"/>
      <div className="grid grid-cols-4 w-[95%] mr-[30px]">
        <div className="col-span-1 flex justify-center">
          <Image 
            src={user}
            width="100"
            height="100"
            alt="best trainers"
            className="rounded-full border border-[2px] border-orange h-[100px] w-[100px] md:h-[120px] md:w-[120px] lg:h-[200px] lg:w-[200px]"
          />
        </div>
        <div className="col-span-1  flex justify-center">
          <Image 
            src={user}
            width="200"
            height="200"
            alt="best trainers"
            className="rounded-full border border-[2px] border-orange h-[100px] w-[100px] md:h-[120px] md:w-[120px] lg:h-[200px] lg:w-[200px]"
          />
        </div>
        <div className="col-span-1  flex justify-center">
          <Image 
            src={user}
            width="200"
            height="200"
            alt="best trainers"
            className="rounded-full border border-[2px] border-orange h-[100px] w-[100px] md:h-[120px] md:w-[120px] lg:h-[200px] lg:w-[200px]"
          />
        </div>
        <div className="col-span-1 flex justify-center">
          <Image 
            src={user}
            width="200"
            height="200"
            alt="best trainers"
            className="rounded-full border border-[2px] border-orange h-[100px] w-[100px] md:h-[120px] md:w-[120px] lg:h-[200px] lg:w-[200px]"
          />
        </div>
      </div>
    </>
  );
}
