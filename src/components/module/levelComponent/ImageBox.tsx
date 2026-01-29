"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useTabLoading } from "../../../app/[lang]/levels/citizen/[levelName]/[tabs]/TabLoadingProvider";

const Sample3D = dynamic(() => import("./Sample3D"), { ssr: false });
const ErrorBoundary = dynamic(() => import("@/components/utils/ErrorBoundary"));

function ImageBoxSkeleton() {
  return (
    <div className="w-full flex flex-col items-center animate-pulse">
      <div className="w-[90%] md:w-full aspect-[5/7] bg-bgLightGrey dark:bg-darkGray rounded-lg" />
      <div className="flex gap-3 mt-4">
        <div className="w-[63px] h-[44px] bg-bgLightGrey dark:bg-darkGray rounded-lg" />
        <div className="w-[63px] h-[44px] bg-bgLightGrey dark:bg-darkGray rounded-lg" />
        <div className="w-[63px] h-[44px] bg-bgLightGrey dark:bg-darkGray rounded-lg" />
      </div>
    </div>
  );
}

export default function ImageBox({ item, singleLevel }: any) {
  const { loading, setLoading } = useTabLoading();
  const [mode, setMode] = useState("png");

  const srcPng =
    item?.png_file || singleLevel?.data?.general_info?.png_file || "";
  const srcFbx = item?.fbx_file || "";
  const srcGif = item?.gif_file || "";

  /**
   * اگر اصلاً تصویری وجود نداشت
   * loading رو false کن
   */
  useEffect(() => {
    if (!srcPng && !srcGif && !srcFbx) {
      setLoading(false);
    }
  }, [srcPng, srcGif, srcFbx, setLoading]);

  if (loading) {
    return <ImageBoxSkeleton />;
  }

  return (
    <div className="w-full flex flex-col items-center sticky top-0">
      {mode === "png" && srcPng && (
        <div className="relative w-[90%] md:w-full aspect-[5/7]">
          <Image
            src={srcPng}
            alt="png"
            fill
            priority
            className="object-cover rounded-xl"
            onLoadingComplete={() => setLoading(false)}
          />
        </div>
      )}

      {mode === "gif" && srcGif && (
        <div className="relative w-full aspect-[5/7]">
          <Image
            src={srcGif}
            alt="gif"
            fill
            unoptimized
            className="object-cover"
            onLoadingComplete={() => setLoading(false)}
          />
        </div>
      )}

      {mode === "fbx" && srcFbx && (
        <div className="relative w-full aspect-[5/7]">
          <ErrorBoundary>
            <Sample3D url={srcFbx} />
          </ErrorBoundary>
        </div>
      )}

      <div className="flex gap-4 mt-4">
        {["png", "fbx", "gif"].map((type) => (
          <button
            key={type}
            onClick={() => setMode(type)}
            className={`px-4 py-2 rounded-lg font-bold ${mode === type
                ? "bg-light-primary text-white"
                : "bg-gray-200 dark:bg-gray-700"
              }`}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
