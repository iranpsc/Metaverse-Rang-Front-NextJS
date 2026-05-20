"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface News {
  image?: string | null;
  title: string;
  video?: string | null;
  slug?: string;
  categorySlug?: string;
}

interface Params {
  lang: string;
  category?: string;
}

interface NewsImageProps {
  news: News;
  params?: Params;
  mainData?: { mainData: string };
}

const NewsImage: React.FC<NewsImageProps> = ({ news, params, mainData }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const hasVideo = news.video && news.video !== "" && news.video !== null;

  const handlePlayVideo = () => {
    if (!hasVideo) return;
    setIsLoading(true);
    setShowVideo(true);
    setVideoError(false);
  };

  const handleVideoCanPlay = () => {
    setIsLoading(false);
    videoRef.current?.play().catch((err) => {
      console.error("Video play failed:", err);
      setIsLoading(false);
      setVideoError(true);
    });
  };

  const handleVideoError = () => {
    console.error("Video error:", news.video);
    setIsLoading(false);
    setVideoError(true);
    setShowVideo(false);
  };

  // اگر ویدیو خطا داشته باشد یا وجود نداشته باشد، فقط عکس نشان بده
  if (!hasVideo || videoError) {
    return (
      <div className="w-full">
        <div className="w-full h-[270px] md:h-[380px] xl:h-[450px] 2xl:h-[500px] 3xl:h-[600px] relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
          <Image
            src={news.image || "/images/fallback.jpg"}
            alt={news.title}
            unoptimized={true}
            fill
            className="object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full h-[270px] md:h-[380px] xl:h-[450px] 2xl:h-[500px] 3xl:h-[600px] relative overflow-hidden rounded-2xl bg-black">
        
        {/* نمایش عکس (قبل از کلیک روی پلی) */}
        {!showVideo && (
          <>
            <Image
              src={news.image || "/images/fallback.jpg"}
              alt={news.title}
              unoptimized={true}
              fill
              className="object-cover"
            />
            
            {/* دکمه پلی روی عکس */}
            <button
              onClick={handlePlayVideo}
              className="absolute inset-0 z-10 flex items-center justify-center bg-black/5 hover:bg-black/20 transition-all duration-300 group cursor-pointer"
              aria-label="Play video"
            >
              <div className="rounded-full bg-white/90 hover:bg-white dark:bg-black/30 flex items-center justify-center p-4 md:p-6 shadow-xl transition-all duration-300 group-hover:scale-110 aspect-square w-[80px] h-[80px]">
                <svg 
                  width="40" 
                  height="40" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 md:w-10 md:h-10"
                >
                  <path 
                    d="M5 3L19 12L5 21V3Z" 
                    fill="#1A1A18" 
                    stroke="#1A1A18" 
                    strokeWidth="1.5" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          </>
        )}

        {/* نمایش ویدیو (بعد از کلیک روی پلی) */}
        {showVideo && (
          <div className="relative w-full h-full">
            {isLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <video
              ref={videoRef}
              src={news.video || undefined}
              className="absolute inset-0 w-full h-full object-contain"
              controls
              playsInline
              preload="auto"
              onCanPlay={handleVideoCanPlay}
              onError={handleVideoError}
              poster={news.image || undefined}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsImage;