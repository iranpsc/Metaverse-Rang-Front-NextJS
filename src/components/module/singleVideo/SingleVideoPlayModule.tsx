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

const SingleVideoPlayModule = ({ DataVideo }: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPosterLoaded, setIsPosterLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showIconPlaying, setShowIconPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMute, setIsMute] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // 🔹 Lazy Load Poster
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsPosterLoaded(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const updateProgress = () => {
    if (videoRef.current) {
      const value =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(value);
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleTimeUpdate = () => {
        updateProgress();
      };
      video.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, []);

  const togglePlayPause = () => {
    setShowIconPlaying(true);
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
        setTimeout(() => {
          setShowIconPlaying(false);
        }, 2000);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const seekTo =
        (Number(event.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = seekTo;
      setProgress(Number(event.target.value));
    }
  };

  const formatDuration = (durationInSeconds: number) => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    return `${
      hours > 0 ? `${hours}:` : ""
    }${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handlerVolume = () => {
    setIsMute(!isMute);
  };

  const toggleFullScreen = () => {
    if (!isFullscreen) {
      if (videoRef.current?.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      ref={containerRef}
      className="w-full relative pt-5 bg-white dark:bg-dark-background flex justify-center items-center"
    >
      <div className="relative w-full flex justify-center items-center px-3 lg:px-0">
        <video
          ref={videoRef}
          className="w-full aspect-video rounded-xl mx-10 object-fill z-30 "
          src={DataVideo.video_url}
          poster={isPosterLoaded ? DataVideo.image_url : undefined} // 🔹 لیزی‌لود
          width={1000}
          height={800}
          muted={isMute}
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
              <PauseIcon
                className="size-[50px] select-none"
                alt="pause-video"
              />
            )}
          </motion.div>
        </div>
      </div>

      {/* کنترل‌ها */}
      <div
        dir="rtl"
        className="xl:w-[80%] lg:w-[80%] md:w-[90%] sm:w-[95%] xs:w-[95%] bg-white/80 dark:bg-dark-background flex flex-row justify-center items-center xl:gap-4 lg:gap-4 md:gap-4 sm:gap-1 xs:gap-1 h-[65px] xs:h-[45px] absolute bottom-7 rounded-[20px] select-none z-50"
      >
        <div className="size-[25px]" onClick={toggleFullScreen}>
          <FullScreenIcon className="size-[24px] fill-singleVideo-gray dark:fill-white cursor-pointer" />
        </div>

        <p
          className="font-azarMehr text-singleVideo-gray dark:text-white font-medium text-xs md:text-base"
          dir="ltr"
        >
          {formatDuration(currentTime)} /{" "}
          {videoRef.current
            ? formatDuration(videoRef.current.duration)
            : "00:00"}
        </p>
        <input
          dir="ltr"
          className="xl:w-[70%] lg:w-[70%] md:w-[70%] sm:w-[65%] xs:w-[60%] accent-blueLink dark:accent-dark-yellow border-none outline-none ring-0"
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={handleSeek}
          aria-label="player input"
        />
        {isMute ? (
          <VolumeIcon
            className="size-[24px] fill-singleVideo-gray dark:fill-white cursor-pointer"
            onClick={handlerVolume}
          />
        ) : (
          <VolumeMuteIcon
            className="size-[24px] fill-singleVideo-gray dark:fill-white cursor-pointer"
            onClick={handlerVolume}
          />
        )}
      </div>
    </div>
  );
};

export default SingleVideoPlayModule;
