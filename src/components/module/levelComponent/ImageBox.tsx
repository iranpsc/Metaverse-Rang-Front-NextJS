"use client";
import Image from "next/image";
import { useState } from "react";
// import { Sample3D } from "./Sample3D";
import ErrorBoundary from "@/components/utils/ErrorBoundary";

export default function ImageBox({ item, langData }: any) {
  const srcPng = item?.png_file ? item?.png_file : "";
  const srcFbx = item?.fbx_file ? item?.fbx_file : "";
  const srcGif = item?.gif_file ? item?.gif_file : "";
  const [mode, setMode] = useState("png");

  const changeMode = (event: any) => {
    setMode(event);
  };
  return (
    <>
      <div
        className={`w-full sm:w-1/5 sm:absolute top-0 ${
          langData.direction == "rtl" ? "left-0" : "right-0"
        }  flex flex-col flex-wrap`}
      >
        <div className="w-full  h-[200px] xl:h-[300px] flex items-center justify-center">
          {mode == "png" ? (
            <Image
              src={srcPng}
              alt="png"
              width={100}
              height={180}
              className=" w-full h-full object-contain"
            />
          ) : (
            ""
          )}

          {mode == "gif" ? (
            <Image
              src={srcGif}
              alt="gif"
              width={100}
              height={180}
              className=" h-full w-full  object-contain"
            />
          ) : (
            ""
          )}
          {mode == "fbx" ? (
            <ErrorBoundary>
              {/* <Sample3D url={srcFbx as any} /> */}
            </ErrorBoundary>
          ) : (
            ""
          )}
        </div>
        <div className="w-full flex flex-wrap justify-around">
          {srcPng && (
            <button
              className={`px-5 py-2 mb-2 rounded font-[700] ${
                mode == "png"
                  ? "dark:bg-dark-yellow dark:text-darkGray bg-light-primary text-white"
                  : "dark:bg-darkGray bg-light-newColors-otherColors-themeBtn text-light-newColors-otherColors-themeBtn"
              }`}
              onClick={() => changeMode("png")}
            >
              PNG
            </button>
          )}

          {srcFbx && (
            <button
              className={`px-5 py-2 mb-2 rounded font-[700] ${
                mode == "fbx"
                  ? "dark:bg-dark-yellow dark:text-darkGray bg-light-primary text-white"
                  : "dark:bg-darkGray bg-light-newColors-otherColors-themeBtn text-light-newColors-otherColors-themeBtn"
              }`}
              onClick={() => changeMode("fbx")}
            >
              FBX
            </button>
          )}
          {srcGif && (
            <button
              className={`  
                px-5 py-2 mb-2 rounded font-[700] ${
                  mode == "gif"
                    ? "dark:bg-dark-yellow dark:text-darkGray bg-light-primary text-white"
                    : "dark:bg-darkGray bg-light-newColors-otherColors-themeBtn text-light-newColors-otherColors-themeBtn"
                }`}
              onClick={() => changeMode("gif")}
            >
              GIF
            </button>
          )}
        </div>
      </div>
    </>
  );
}
