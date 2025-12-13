"use client";

import React, { useState } from "react";

type SectionVideoProps = {
  params: {
    lang: string;
  };
};

const SectionVideo: React.FC<SectionVideoProps> = ({ params }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false); // کنترل لود ویدیو
  const isFa = params.lang?.toLowerCase() === "fa"; // بررسی زبان
  const videoSrc = isFa ? "/firstpage/section-fa.mp4" : "/vidfirstpageeos/section-en.mp4";
  const posterSrc = isFa ? "/firstpage/videoFaposter.webp" : "/firstpage/videoEnposter.webp";

  // تابع برای بارگذاری ویدیو
  const handlePlayClick = () => {
    setIsVideoLoaded(true); // تغییر حالت برای بارگذاری ویدیو
  };

  return (
    <div className="relative w-full flex justify-center items-center rounded-3xl lg:rounded-[72px] overflow-hidden">
      {!isVideoLoaded ? (
        // نمایش پوستر و دکمه
        <div className="relative w-full h-full bg-black">
          <img
            src={posterSrc}
            alt="Video Poster"
            className="w-full h-full object-cover rounded-3xl lg:rounded-[72px]"
          />
          <div className="w-full h-full   absolute top-0 z-10 flex justify-center items-center">
            <button aria-label="playBtn"
              className="w-fit hover:scale-105 duration-100 bg-transparent"
                onClick={handlePlayClick}
            >
              <svg width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect className="fill-black/70" width="78" height="78" rx="39" fillOpacity="0.51" />
                <path className="fill-white " d="M54 34.3039C58 36.6133 58 42.3868 54 44.6962L35.25 55.5215C31.25 57.8309 26.25 54.9441 26.25 50.3253V28.6747C26.25 24.0559 31.25 21.1691 35.25 23.4785L54 34.3039Z" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        // ویدیو فقط بعد از کلیک بارگذاری می‌شود
        <video
          className="w-full aspect-video  bg-black"
          controls
          preload="none"
          playsInline
          poster={posterSrc}
          autoPlay
        >
          <source src={videoSrc} type="video/mp4" />
          مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
        </video>
      )}
    </div>
  );
};

export default SectionVideo;
