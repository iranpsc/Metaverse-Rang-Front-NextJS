import React from "react";
import Image from "next/image";
import IranRoundFlag from "../../../../../public/png/citizen/IranRoundFlag.png"
import Level from "../../../../../public/png/citizen/Level.png"

export interface ProfilePhotoMobileProps {
  src: string;
  name: string;
  levelName: string;
  levelSlug: string;
}

export default function ProfilePhotoMobile({ src, name, levelName, levelSlug }: ProfilePhotoMobileProps) {
  return (
    <div className="">
      <div className="relative flex justify-center">
        <Image
          style={{ filter: "drop-shadow(0px 0px 3px rgba(0,0,0,0.3 ))" }}
          src={src}
          width="250"
          height="250"
          alt="avatar"
          className="flex justify-center rounded-[8px] w-full max-w-[420px] rounded-bl-[75px]"
        />
        <span className="absolute bottom-[10px] right-[8vw]  sm:right-[28vw] inline-flex items-center justify-center py-1 text-gray bg-[#4F535D] bg-opacity-70 rounded-full text-white whitespace-nowrap">
          <Image
            src={IranRoundFlag}
            width="40"
            height="40"
            alt="avatar"
            className="w-[25px] h-[25px] lg:w-[30px] lg:h-[30px] right-0 ml-[5px]"
          />
          <h1 className="text-[12px]">{name}</h1>
        </span>
        <Image
          src={Level}
          width="150"
          height="150"
          alt="avatar"
          className="absolute top-[10px] left-[8vw] sm:left-[20vw] h-[80px] w-[80px] lg:h-[100px] lg:w-[100px] inline-flex ml-[5px]"
        />
        {levelName === "مشارکت کننده" ? (
            <h1
              style={{ textShadow: "2px 2px 3px #333333" }}
              className="absolute top-[50px] left-[13vw] sm:left-[22vw] text-[10px] md:text-[12px] inline-flex text-white"
            >
              {levelName}
            </h1>
          ) : (
            <h1
              style={{ textShadow: "2px 2px 3px #333333" }}
              className="absolute top-[50px] left-[15vw] sm:left-[24vw]  text-[10px] md:text-[12px] inline-flex text-white"
            >
              {levelName}
            </h1>
        )}

        <p
          style={{ textShadow: "0px 2px 3px #ccc" }}
          className="font-Orbitron absolute top-[30px] left-[17vw] sm:left-[26vw] text-[16px] inline-flex text-white md:text-[20px]"
        >
          {levelSlug}
        </p>
      </div>
  </div>
  );
}