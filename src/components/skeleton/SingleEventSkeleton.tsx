"use client";

import React from "react";

export default function SingleEventSkeleton() {
  return (
    <div className="items flex flex-col justify-center gap-3 items-center w-full animate-pulse">
      {/* Event Image */}
      <div className="mt-4 w-[97%] lg:w-[95%] mx-auto rounded-[20px] overflow-hidden shadow-lg lg:mt-6">
        <div className="w-full h-[220px] sm:h-[300px] md:h-[380px] lg:h-[450px] bg-gray-200 dark:bg-white/10 rounded-[20px]" />
      </div>

      {/* Title + Like / Dislike / Views */}
      <div className="flex flex-col w-[97%] lg:w-[95%] gap-3 sm:gap-0 items-center sm:flex-row-reverse sm:justify-between">
        {/* Like / Dislike / Views */}
        <div className="w-[96%] sm:w-[350px] sm:ml-2 flex justify-between">
          <div className="h-5 w-12 rounded-md bg-gray-200 dark:bg-white/10" />
          <div className="h-5 w-12 rounded-md bg-gray-200 dark:bg-white/10" />
          <div className="h-5 w-12 rounded-md bg-gray-200 dark:bg-white/10" />
        </div>

        {/* Event title */}
        <div className="flex items-center justify-between w-full sm:w-[60%] my-2">
          <div className="flex items-center h-full w-full">
            <div className="h-7 xl:h-9 2xl:h-10 aspect-square rounded-lg bg-gray-200 dark:bg-white/10" />

            <div className="mx-2 h-7 w-[55%] sm:w-[65%] rounded-md bg-gray-200 dark:bg-white/10" />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="w-[97%] lg:w-[95%] mb-4 space-y-3">
        <div className="h-4 w-full rounded bg-gray-200 dark:bg-white/10" />
        <div className="h-4 w-[96%] rounded bg-gray-200 dark:bg-white/10" />
        <div className="h-4 w-[90%] rounded bg-gray-200 dark:bg-white/10" />
        <div className="h-4 w-[75%] rounded bg-gray-200 dark:bg-white/10" />
      </div>

      {/* Countdown */}
      <div
        className="
          px-4 mb-2 w-[97%] lg:w-[95%] lg:px-7
          rounded-xl lg:rounded-[32px]
          border border-gray-200 dark:border-white/10
          shadow-lg p-4
          flex flex-col sm:flex-row-reverse
          sm:h-[250px]
          bg-gray-100 dark:bg-white/5
        "
      >
        {/* Start date */}
        <div className="flex flex-col justify-start sm:order-1 sm:content-start sm:w-[30%] sm:min-w-[194px]">
          <div className="h-5 w-28 rounded-md bg-gray-200 dark:bg-white/10 mb-6 sm:mt-4" />

          <div className="flex justify-center lg:px-5 items-center">
            <div className="h-10 sm:h-12 w-36 rounded-md bg-gray-200 dark:bg-white/10" />
          </div>
        </div>

        {/* Countdown */}
        <div className="flex flex-col items-center mb-4 sm:w-[30%] sm:min-w-[194px]">
          <div className="h-5 w-28 rounded-md bg-gray-200 dark:bg-white/10 mb-6 sm:mt-4" />

          <div
            className="flex justify-between items-center w-full"
            dir="ltr"
          >
            {[1, 2, 3, 4].map((item) => (
              <React.Fragment key={item}>
                <div className="flex flex-col items-center">
                  <div className="h-10 w-11 lg:h-12 lg:w-14 rounded-md bg-gray-200 dark:bg-white/10" />
                  <div className="h-3 w-12 mt-2 rounded bg-gray-200 dark:bg-white/10" />
                </div>

                {item !== 4 && (
                  <span className="h-8 w-2 rounded bg-gray-200 dark:bg-white/10" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Button */}
        <div className="flex text-center sm:justify-center mt-4 sm:w-2/5">
          <div className="w-full sm:w-[60%] h-11 mb-2 self-end rounded-[28px] bg-gray-200 dark:bg-white/10" />
        </div>
      </div>

      {/* Bottom separator */}
      <div className="mt-6 w-full lg:w-[95%] h-[2px] bg-gray-200 dark:bg-white/10" />
    </div>
  );
}