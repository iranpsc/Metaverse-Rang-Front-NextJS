"use client";
import { targetData } from "@/components/utils/targetDataName";
import { Development, Income, Orders, Update } from "@/components/svgs";
import React, { useState, useEffect, useRef } from "react";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import {
  LevelIncome,
  LevelOrders,
  LevelDevelopment,
  LevelUpdate,
} from "@/components/svgs/SvgLevels";

export const Features = ({ levelsTranslatePage, mainData }: any) => {
  const [inView, setInView] = useState(false);
  // *HINT* useRef WON'T trigger re-render unlike useState.
  const featuresRef = useRef<HTMLDivElement | null>(null);

  // IntersectionObserver to load iframe when it's in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setInView(true); // Trigger iframe load when in view
        }
      },
      {
        rootMargin: "0px",
        threshold: 0.1, // Trigger when 10% of the iframe is in view
      }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current); // Observe the iframe container
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current); // Cleanup observer
      }
    };
  }, []);

  // If not in view, render a placeholder (or null to defer rendering entirely)
  if (!inView) {
    return <div ref={featuresRef} style={{ minHeight: "500px" }} />;
  }
  return (
    <div
      ref={featuresRef}
      className="pt-8 flex flex-wrap justify-center dark:text-white"
    >
      <div className="flex justify-center items-end px-3 sm:px-4 2xl:px-6 h-[300px] xl:h-[400px] w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
        <div className="w-[90%] relative rounded-[20px] cursor-cell p-3 pb-[15%] pt-[95px] xl:pt-[120px] 2xl:pt-[130px] 3xl:pt-[150px] h-[195px] lg:h-[210px] xl:h-[260px] 2xl:h-[280px] 2xl flex flex-col justify-center items-center dark:bg-[#080807] bg-white base-shadow-1 hover:shadow-[0_0px_20px_rgba(0,0,0,0.45)] dark:hover:shadow-[0_0px_33px_-11px_rgba(255,255,255,255.9)] border-solid border border-transparent hover:border-solid hover:border-blueLink hover:dark:border-dark-yellow hover:scale-110 base-transition-1">
          <div className="absolute bottom-[calc(100%-70px)]">
            <div className="w-[140px] h-[140px] flex justify-center items-center bg-bgLightGrey dark:bg-darkGrey_1 rounded-full">
              <LevelIncome className="w-[100px] h-[100px]" />
            </div>
          </div>
          <span className="text-xl xl:text-2xl font-bold py-2">
            {findByUniqueId(mainData, 406)}
          </span>
          <p className="text-center text-base 2xl:text-xl font-[400]">
            {findByUniqueId(mainData, 407)}
          </p>
        </div>
      </div>

      <div className="flex justify-center items-end px-3 sm:px-4 2xl:px-6 h-[300px] xl:h-[400px] w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
        <div className="w-[90%] relative rounded-[20px] cursor-cell p-3 pb-[15%] pt-[95px] xl:pt-[120px] 2xl:pt-[130px] 3xl:pt-[150px] h-[195px] lg:h-[210px] xl:h-[260px] 2xl:h-[280px] 2xl flex flex-col justify-center items-center dark:bg-[#080807] bg-white base-shadow-1 hover:shadow-[0_0px_20px_rgba(0,0,0,0.45)] dark:hover:shadow-[0_0px_33px_-11px_rgba(255,255,255,255.9)]  border-solid border border-transparent hover:border-solid hover:border-blueLink hover:dark:border-dark-yellow hover:scale-110 base-transition-1">
          <div className="absolute bottom-[calc(100%-70px)]">
            <div className="w-[140px] h-[140px] flex justify-center items-center bg-bgLightGrey dark:bg-darkGrey_1 rounded-full">
              <LevelOrders className="w-[100px] h-[100px]" />
            </div>
          </div>
          <span className="text-xl xl:text-2xl font-bold py-2">
            {findByUniqueId(mainData, 408)}
          </span>
          <p className="text-center text-base 2xl:text-xl font-[400]">
            {findByUniqueId(mainData, 409)}
          </p>
        </div>
      </div>

      <div className="flex justify-center items-end px-3 sm:px-4 2xl:px-6 h-[300px] xl:h-[400px] w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
        <div className="w-[90%] relative rounded-[20px] cursor-cell p-3 pb-[15%] pt-[95px] xl:pt-[120px] 2xl:pt-[130px] 3xl:pt-[150px] h-[195px] lg:h-[210px] xl:h-[260px] 2xl:h-[280px] 2xl flex flex-col justify-center items-center dark:bg-[#080807] bg-white base-shadow-1 hover:shadow-[0_0px_20px_rgba(0,0,0,0.45)] dark:hover:shadow-[0_0px_33px_-11px_rgba(255,255,255,255.9)]  border-solid border border-transparent hover:border-solid hover:border-blueLink hover:dark:border-dark-yellow hover:scale-110 base-transition-1">
          <div className="absolute bottom-[calc(100%-70px)]">
            <div className="w-[140px] h-[140px] flex justify-center items-center bg-bgLightGrey dark:bg-darkGrey_1 rounded-full">
              <LevelDevelopment className="w-[100px] h-[100px]" />
            </div>
          </div>
          <span className="text-xl xl:text-2xl font-bold py-2">
            {findByUniqueId(mainData, 502)}
          </span>
          <p className="text-center text-base 2xl:text-xl font-[400]">
            {findByUniqueId(mainData, 410)}
          </p>
        </div>
      </div>

      <div className="flex justify-center items-end px-3 sm:px-4 2xl:px-6 h-[300px] xl:h-[400px] w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
        <div className="w-[90%] relative rounded-[20px] cursor-cell p-3 pb-[15%] pt-[95px] xl:pt-[120px] 2xl:pt-[130px] 3xl:pt-[150px] h-[195px] lg:h-[210px] xl:h-[260px] 2xl:h-[280px] 2xl flex flex-col justify-center items-center dark:bg-[#080807] bg-white base-shadow-1 hover:shadow-[0_0px_20px_rgba(0,0,0,0.45)] dark:hover:shadow-[0_0px_33px_-11px_rgba(255,255,255,255.9)]  border-solid border border-transparent hover:border-solid hover:border-blueLink hover:dark:border-dark-yellow hover:scale-110 base-transition-1">
          <div className="absolute bottom-[calc(100%-70px)]">
            <div className="w-[140px] h-[140px] flex justify-center items-center bg-bgLightGrey dark:bg-darkGrey_1 rounded-full">
              <LevelUpdate className="w-[100px] h-[100px]" />
            </div>
          </div>
          <span className="text-xl xl:text-2xl font-bold py-2">
            {findByUniqueId(mainData, 411)}
          </span>
          <p className="text-center text-base 2xl:text-xl font-[400]">
            {findByUniqueId(mainData, 412)}
          </p>
        </div>
      </div>
    </div>
  );
};