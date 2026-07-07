"use client";

import React from "react";

export default function PressureCenter() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-white dark:bg-[#1A1A18] rounded-[40px] overflow-hidden shadow-xl">
      {/* محتوای وسط */}
      <div className="flex items-center justify-center w-full h-full">
        <video src="/whitepaper/video.mp4"></video>

      </div>
    </div>
  );
}