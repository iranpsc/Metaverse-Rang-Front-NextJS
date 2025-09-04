"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  PlayIcon,
  PauseIcon,
  VolumeIcon,
  VolumeMuteIcon,
  FullScreenIcon,
} from "@/components/svgs/SvgEducation";

type VideoData = { video_url: string; image_url: string };
interface SingleVideoProps {
  DataVideo: VideoData;
  params?: any;
  mainData?: any;
}
const SingleVideoPlayModule:  React.FC<SingleVideoProps> = ({ DataVideo, params, mainData }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPosterLoaded, setIsPosterLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showIconPlaying, setShowIconPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0..100
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0); // ✅ نگه‌داری جدا از ref
  const [isMute, setIsMute] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // ✅ Lazy-load پوستر با چکِ وجود API و المنت
  useEffect(() => {
    if (!containerRef.current) return;

    // فقط در مرورگر و در صورت وجود API
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsPosterLoaded(true);
              observer.disconnect();
            }
          });
        },
        { root: null, rootMargin: "200px 0px", threshold: 0 } // کمی زودتر لود شود
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    } else {
      // اگر API نبود، مستقیم لود کن
      setIsPosterLoaded(true);
    }
  }, []);

  // ✅ مدت ویدیو را بعد از loadedmetadata ست می‌کنیم
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoadedMeta = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        setDuration(video.duration);
      }
    };
    const onTimeUpdate = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      const p = (video.currentTime / video.duration) * 100;
      // از NaN جلوگیری
      setProgress(Number.isFinite(p) ? p : 0);
      setCurrentTime(video.currentTime);
    };

    video.addEventListener("loadedmetadata", onLoadedMeta);
    video.addEventListener("timeupdate", onTimeUpdate);
    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMeta);
      video.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, []);

  const togglePlayPause = () => {
    setShowIconPlaying(true);
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => {
        setIsPlaying(true);
        setTimeout(() => setShowIconPlaying(false), 2000);
      }).catch(() => {
        // ممکنه autoplay یا policy اجازه نده — خطا را نادیده بگیر
      });
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v || !Number.isFinite(duration) || duration <= 0) return;
    const val = Number(e.target.value);
    const seekTo = (val / 100) * duration;
    v.currentTime = seekTo;
    setProgress(val);
    setCurrentTime(seekTo);
  };

  const formatDuration = (durationInSeconds: number) => {
    if (!Number.isFinite(durationInSeconds) || durationInSeconds < 0) return "00:00";
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    return `${hours > 0 ? `${hours}:` : ""}${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handlerVolume = () => setIsMute((s) => !s);

  const toggleFullScreen = () => {
    const v = videoRef.current as any;
    if (!v) return;

    if (!isFullscreen) {
      const req =
        v.requestFullscreen ||
        v.webkitEnterFullscreen ||
        v.webkitRequestFullscreen ||
        v.msRequestFullscreen;
      if (req) req.call(v);
    } else {
      const exit: any =
        document.exitFullscreen ||
        (document as any).webkitExitFullscreen ||
        (document as any).msExitFullscreen;
      if (exit) exit.call(document);
    }
    setIsFullscreen((s) => !s);
  };

  return (
    <div
      ref={containerRef}
      className="w-full relative pt-5 bg-white dark:bg-dark-background flex justify-center items-center"
    >
      <div className="relative w-full flex justify-center items-center px-3 lg:px-0">
        <video
          ref={videoRef}
          className="w-full aspect-video rounded-xl mx-10 object-fill z-30"
          src={DataVideo.video_url}
          poster={isPosterLoaded ? DataVideo.image_url : undefined} // ✅ لیزی‌لود پوستر
          width={1000}
          height={800}
          preload="metadata" // یا "none" اگر می‌خواید دانلود رو عقب بندازید
          muted={isMute}
          playsInline
        />
        <div
          className="absolute w-full h-full flex justify-center items-center z-40 top-0"
          onClick={togglePlayPause}
        >
          <motion.div
            className="bg-black/50 size-[100px] rounded-full flex justify-center items-center"
            initial={{ opacity: 1, scale: 0 }}
            animate={{
              opacity: showIconPlaying ? 1 : 0,
              scale: showIconPlaying ? 0.9 : 0.5,
            }}
            transition={{ duration: 0.4 }}
          >
            {!isPlaying ? (
              <PlayIcon className="size-[50px] select-none" alt="play-video" />
            ) : (
              <PauseIcon className="size-[50px] select-none" alt="pause-video" />
            )}
          </motion.div>
        </div>
      </div>

      <div
        dir="rtl"
        className="xl:w-[80%] lg:w-[80%] md:w-[90%] sm:w-[95%] xs:w-[95%] bg-white/80 dark:bg-dark-background flex flex-row justify-center items-center xl:gap-4 lg:gap-4 md:gap-4 sm:gap-1 xs:gap-1 h-[65px] xs:h-[45px] absolute bottom-7 rounded-[20px] select-none z-50"
      >
        <div className="size-[25px]" onClick={toggleFullScreen}>
          <FullScreenIcon className="size-[24px] fill-singleVideo-gray dark:fill-white cursor-pointer" />
        </div>

        <p className="font-azarMehr text-singleVideo-gray dark:text-white font-medium text-xs md:text-base" dir="ltr">
          {formatDuration(currentTime)} / {formatDuration(duration)}
        </p>

        <input
          dir="ltr"
          className="xl:w-[70%] lg:w-[70%] md:w-[70%] sm:w-[65%] xs:w-[60%] accent-blueLink dark:accent-dark-yellow border-none outline-none ring-0"
          type="range"
          min={0}
          max={100}
          value={Number.isFinite(progress) ? Math.max(0, Math.min(100, progress)) : 0} // ✅ از NaN جلوگیری
          onChange={handleSeek}
          aria-label="player input"
        />

        {isMute ? (
          <VolumeMuteIcon
            className="size-[24px] fill-singleVideo-gray dark:fill-white cursor-pointer"
            onClick={handlerVolume}
          />
        ) : (
          <VolumeIcon
            className="size-[24px] fill-singleVideo-gray dark:fill-white cursor-pointer"
            onClick={handlerVolume}
          />
        )}
      </div>
    </div>
  );
};

export default SingleVideoPlayModule;
