"use client";
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";

const Sample3D = dynamic(() => import("./Sample3D"));
const ErrorBoundary = dynamic(() => import("@/components/utils/ErrorBoundary"));

export default function ImageBox({ item, singleLevel }: any) {
  const srcPng =
    item?.png_file || singleLevel?.data?.general_info?.png_file || "";
  const srcFbx = item?.fbx_file || "";
  const srcGif = item?.gif_file || "";
  const [mode, setMode] = useState("png");

  const changeMode = (event: any) => {
    setMode(event);
  };

  return (
    <div className={`w-full flex flex-col flex-wrap items-center sticky top-0`}>
      {srcPng && mode === "png" && (
        <div
          className={`relative w-[60%] sm:w-[40%] md:w-full aspect-[5/7] md:aspect-[5/7] ${
            !item?.png_file ? "block" : "block"
          }`}
        >
          <Image
            src={srcPng}
            alt="png"
            fill
            sizes="(max-width: 400px) 220px,(max-width: 768px) 320px, 320px"
            priority={true}
            fetchPriority="high"
            quality={100}
            className="object-cover w-full"
          />
        </div>
      )}
      {mode === "fbx" && srcFbx && (
        <div className="relative w-full sm:w-3/5 md:w-full aspect-[5/7] md:aspect-[5/7]">
          <ErrorBoundary>
            <Sample3D url="/models/test.glb" />
          </ErrorBoundary>
        </div>
      )}
      {mode === "gif" && srcGif && (
        <div className="relative w-full sm:w-3/5 md:w-full aspect-[5/7] md:aspect-[5/7]">
          <Image
            src={srcGif}
            alt="gif"
            width={500}
            height={700}
            unoptimized
            className="absolute top-1/2 left-1/2 w-full h-[100%] object-cover transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      )}
      <div className="w-full flex justify-center flex-wrap mt-3 mb-5 gap-x-5">
        {["png", "fbx", "gif"].map((type) => (
          <button
            key={type}
            className={` min-w-[70px] px-4 py-2 mb-2 rounded-[10px] font-[700] ${
              mode === type
                ? "dark:bg-dark-yellow dark:text-darkGray bg-light-primary text-white"
                : "dark:bg-darkGray bg-light-newColors-otherColors-themeBtn dark:text-light-newColors-otherColors-themeBtn"
            }`}
            onClick={() => changeMode(type)}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
