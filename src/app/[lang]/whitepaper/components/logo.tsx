"use client";

import ClipSection from "@/components/shared/ClipContainer";

export default function PressureCenter() {
  return (
<div className="h-full w-full">
      <ClipSection corner={"br"} className="w-full h-full flex items-center justify-center text-white dark:text-[#1A1A18] rounded-[40px] overflow-hidden shadow-xl">
      {/* محتوای وسط */}
      <div className="flex items-center justify-center w-full h-full">
        <video src="/whitepaper/video.mp4"></video>
      </div>
    </ClipSection>
</div>
  );
}                       