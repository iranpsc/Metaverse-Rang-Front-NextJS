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
          <div className="relative w-full overflow-hidden aspect-[5/5] md:aspect-[5/7]">
            {mode == "png" ? (
              <Image
                src={srcPng || singleLevel.data.general_info.png_file}
                alt="png"
                width={512}
                height={512}
                className="absolute top-1/2 left-1/2 w-full h-[105%] object-cover transform -translate-x-1/2 -translate-y-1/2"
              />
            ) : (
              ""
            )}

            {mode == "gif" ? (
              <Image
                src={srcGif || singleLevel.data.general_info.png_file}
                alt="gif"
                width={512}
                height={512}
                className="absolute top-1/2 left-1/2 w-full h-[105%] object-cover transform -translate-x-1/2 -translate-y-1/2"
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
          <div className="w-full flex flex-nowrap justify-around mt-3 mb-5 gap-x-2">
            {
              <button
                className={`w-full px-5 py-2 mb-2 rounded font-[700] ${
                  mode == "png"
                    ? "dark:bg-dark-yellow dark:text-darkGrey bg-light-primary text-white"
                    : "dark:bg-darkGrey bg-light-newColors-otherColors-themeBtn dark:text-light-newColors-otherColors-themeBtn"
                }`}
                onClick={() => changeMode("png")}
              >
                PNG
              </button>
            }

            {
              <button
                className={`w-full px-5 py-2 mb-2 rounded font-[700] ${
                  mode == "fbx"
                    ? "dark:bg-dark-yellow dark:text-darkGrey bg-light-primary text-white"
                    : "dark:bg-darkGrey bg-light-newColors-otherColors-themeBtn dark:text-light-newColors-otherColors-themeBtn"
                }`}
                onClick={() => changeMode("fbx")}
              >
                FBX
              </button>
            }
            {
              <button
                className={`  
                w-full px-5 py-2 mb-2 rounded font-[700] ${
                  mode == "gif"
                    ? "dark:bg-dark-yellow dark:text-darkGrey bg-light-primary text-white"
                    : "dark:bg-darkGrey bg-light-newColors-otherColors-themeBtn dark:text-light-newColors-otherColors-themeBtn"
                }`}
                onClick={() => changeMode("gif")}
              >
                GIF
              </button>
            }
          </div>
        </div>
      )}
    </>
  );
}
