"use client";
import Image from "next/image";
import { useState } from "react";
// import { Sample3D } from "./Sample3D";
import ErrorBoundary from "@/components/utils/ErrorBoundary";

export default function ImageBox({ item, singleLevel }: any) {
  const srcPng = item?.png_file ? item?.png_file : "";
  const srcFbx = item?.fbx_file ? item?.fbx_file : "";
  const srcGif = item?.gif_file ? item?.gif_file : "";
  const [mode, setMode] = useState("png");

  const changeMode = (event: any) => {
    setMode(event);
  };
  return (
    <>
      {(srcPng || srcFbx || srcGif || singleLevel) && (
        <div className={`w-full sm:w-full flex flex-col flex-wrap`}>
          <div className="w-full h-[200px] xl:h-[300px] flex items-center justify-center">
            {mode == "png" ? (
              <Image
                src={srcPng || singleLevel.data.general_info.png_file}
                alt="png"
                width={250}
                height={350}
                className=" w-full h-full object-contain"
              />
            ) : (
              ""
            )}

            {mode == "gif" ? (
              <Image
                src={srcGif}
                alt="gif"
                width={250}
                height={350}
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
                className={`w-[100px] px-5 py-2 mb-2 rounded font-[700] ${
                  mode == "png"
                    ? "dark:bg-dark-yellow dark:text-darkGrey bg-light-primary text-white"
                    : "dark:bg-darkGrey bg-light-newColors-otherColors-themeBtn dark:text-light-newColors-otherColors-themeBtn"
                }`}
                onClick={() => changeMode("png")}
              >
                PNG
              </button>
            )}

            {srcFbx && (
              <button
                className={`w-[100px] px-5 py-2 mb-2 rounded font-[700] ${
                  mode == "fbx"
                    ? "dark:bg-dark-yellow dark:text-darkGrey bg-light-primary text-white"
                    : "dark:bg-darkGrey bg-light-newColors-otherColors-themeBtn dark:text-light-newColors-otherColors-themeBtn"
                }`}
                onClick={() => changeMode("fbx")}
              >
                FBX
              </button>
            )}
            {srcGif && (
              <button
                className={`  
                w-[100px] px-5 py-2 mb-2 rounded font-[700] ${
                  mode == "gif"
                    ? "dark:bg-dark-yellow dark:text-darkGrey bg-light-primary text-white"
                    : "dark:bg-darkGrey bg-light-newColors-otherColors-themeBtn dark:text-light-newColors-otherColors-themeBtn"
                }`}
                onClick={() => changeMode("gif")}
              >
                GIF
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
