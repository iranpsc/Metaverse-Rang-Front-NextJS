"use client";

import { useEffect, useRef } from "react";
import ClipSection from "@/components/shared/ClipContainer";

const VIDEO_SOURCES = [
  "https://s3.metarang.com/metarang/videos/metarang-onepage1.mp4",
  "https://s3.metarang.com/metarang/videos/metarang-onepage2.mp4",
  "https://s3.metarang.com/metarang/videos/metarang-onepage3.mp4",
  "https://s3.metarang.com/metarang/videos/metarang-onepage4.mp4",
  "https://s3.metarang.com/metarang/videos/metarang-onepage5.mp4",
];

export default function PressureCenter() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const indexRef = useRef(0);

  const safePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true; // مطمئن می‌شیم property واقعی هم ست شده
    const p = el.play();
    if (p && typeof p.catch === "function") {
      p.catch((err) => console.error("video play() failed:", err));
    }
  };

  const handleEnded = () => {
    const el = videoRef.current;
    if (!el) return;

    indexRef.current = (indexRef.current + 1) % VIDEO_SOURCES.length;
    el.src = VIDEO_SOURCES[indexRef.current];
    el.load(); // ضروری بعد از تغییر دستی src
    safePlay();
  };

  useEffect(() => {
    safePlay();
  }, []);

  return (
    <div className="h-full w-full">
      <ClipSection
        corner={"br"}
        className="w-full h-full flex items-center justify-center text-white dark:text-[#1A1A18] rounded-[40px] overflow-hidden shadow-xl"
      >
        <div className="flex items-center justify-center w-full ">
          <video
            ref={videoRef}
            src={VIDEO_SOURCES[0]}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleEnded}
            className="max-w-[600px]"
          />
        </div>
      </ClipSection>
    </div>
  );
}