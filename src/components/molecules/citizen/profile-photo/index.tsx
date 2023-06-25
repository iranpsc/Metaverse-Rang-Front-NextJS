import React, { useState } from "react";
import Image from "next/image";
import IranRoundFlag from "../../../../../public/png/citizen/IranRoundFlag.png";
import Level from "../../../../../public/png/citizen/Level.png";
import Lock from "../../../../../public/png/citizen/lock.png";

export interface ProfilePhotoProps {
  src: string;
  name: string;
  levelName: string;
  levelSlug: string;
}

export default function ProfilePhoto({
  src,
  name,
  levelName,
  levelSlug,
}: ProfilePhotoProps) {
  const [activeSlide, setActiveSlide] = useState(5);

  return (
    <div style={{ height: "45vh" }}>
      <div className="relative flex justify-center">
        <Image
          style={{ filter: "drop-shadow(0px 0px 3px rgba(0,0,0,0.3 ))" }}
          src={src}
          width="250"
          height="250"
          alt="avatar"
          className="flex justify-center rounded-[8px] h-[38vh] w-[38vw]"
        />
        <span className="absolute bottom-[10px] right-[20px] inline-flex items-center justify-center py-1 text-gray bg-[#4F535D] bg-opacity-70 rounded-full text-white whitespace-nowrap">
          <Image
            src={IranRoundFlag}
            width="40"
            height="40"
            alt="avatar"
            className="w-[25px] h-[25px] lg:w-[30px] lg:h-[30px] right-0 ml-[5px]"
          />
          <h1 className="text-[11px] pl-[5px]">{name}</h1>
        </span>
        <Image
          src={Level}
          width="150"
          height="150"
          alt="avatar"
          className="absolute -bottom-[10px] left-[0px] h-[80px] w-[80px] lg:h-[100px] lg:w-[100px] inline-flex ml-[5px]"
        />
        {levelName === "مشارکت کننده" ? (
            <h1
              style={{ textShadow: "2px 2px 3px #333333" }}
              className="absolute bottom-[20px] left-[20px] text-[10px] md:text-[12px] inline-flex text-white"
            >
              {levelName}
            </h1>
          ) : (
            <h1
              style={{ textShadow: "2px 2px 3px #333333" }}
              className="absolute bottom-[20px] left-[32px] text-[10px] md:text-[12px] inline-flex text-white"
            >
              {levelName}
            </h1>
        )}

        <p
          style={{ textShadow: "0px 2px 3px #ccc" }}
          className="font-Orbitron absolute bottom-[32px] left-[50px] text-[16px] inline-flex text-white md:text-[20px]"
        >
          {levelSlug}
        </p>
      </div>
      <div className={`flex items-center my-[10px]`}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${
              activeSlide === index ? "active" : ""
            } flex justify-center mx-auto`}
            onClick={() => setActiveSlide(index)}
          >
            {index < 2 && slide && slide.imageFromApi ? (
              <Image
                src={slide.imageFromApi}
                height="50"
                width="50"
                alt="gallery"
                className={`rounded-full ${(activeSlide == index) ? ' w-[59px] h-[59px] ring ring-[2px] ring-white mb-[15px]' : ' w-[49px] h-[49px]'}`}
              />
            ) : (
              <Image
                src={index === 5 ? src : Lock}
                height="50"
                width="50"
                alt="gallery"
                className={`rounded-full ${( activeSlide == index) ? ' w-[59px] h-[59px] ing ring-[2px] ring-white mb-[15px]' : ' w-[49px] h-[49px]'}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
const slides = [
  {
    imageFromApi: "/png/citizen/lock.png",
  },
  {
    imageFromApi: "/png/citizen/lock.png",
  },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
];
