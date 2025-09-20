"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
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

const SingleVideoPlayModule: React.FC<SingleVideoProps> = ({ DataVideo }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showIconPlaying, setShowIconPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMute, setIsMute] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const onLoadedMeta = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (Number.isFinite(video.duration) && video.duration > 0) {
      setDuration(video.duration);
    }
  };

  const onTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (!Number.isFinite(video.duration) || video.duration <= 0) return;

    if (duration <= 0) {
      setDuration(video.duration);
    }

    const p = (video.currentTime / video.duration) * 100;
    setProgress(Number.isFinite(p) ? p : 0);
    setCurrentTime(video.currentTime);
  };

  const togglePlayPause = () => {
    setShowIconPlaying(true);
    const v = videoRef.current;
    if (!v) return;

    if (v.paused) {
      v.play()
        .then(() => {
          if (!isMountedRef.current) return;
          setIsPlaying(true);
          setHasStarted(true);
          setTimeout(() => {
            if (isMountedRef.current) setShowIconPlaying(false);
          }, 2000);
        })
        .catch(() => {});
    } else {
      setIsPlaying(false);
      v.pause();
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
    if (!Number.isFinite(durationInSeconds) || durationInSeconds < 0)
      return "00:00";
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    return `${hours > 0 ? `${hours}:` : ""}${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
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
      className="w-full relative pt-5 px-5 bg-white dark:bg-dark-background flex justify-center items-center"
    >
      <div className="relative w-full flex justify-center items-center px-3 rounded-xl overflow-hidden lg:px-0">
        {!hasStarted && (
          <Image
            src={DataVideo.image_url}
            alt="video-poster"
            priority
            width={830}
            height={470}
            sizes="(max-width: 600px) 360px, (max-width: 1200px) 800px, 1200px"
            className="absolute top-0 left-0 w-full aspect-video object-fill z-30 cursor-pointer"
            onClick={togglePlayPause}
          />
        )}

        <video
          ref={videoRef}
          className="w-full aspect-video rounded-xl object-fill z-20"
          src={DataVideo.video_url}
          preload="metadata"
          muted={isMute}
          playsInline
          onLoadedMetadata={onLoadedMeta}
          onTimeUpdate={onTimeUpdate}
          // @ts-ignore
          fetchpriority="high"
        />

        <div
          className="absolute w-full h-full flex justify-center items-center z-40 top-0 cursor-pointer"
          onClick={togglePlayPause}
        >
          <motion.div
            className="bg-black/50 size-[100px] rounded-full flex justify-center items-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: showIconPlaying ? 1 : 0,
              scale: showIconPlaying ? 0.9 : 0,
            }}
            transition={{ duration: 0.4 }}
          >
            {!isPlaying ? (
              <PlayIcon className="size-[50px] fill-white select-none" />
            ) : (
              <PauseIcon className="size-[50px] fill-white select-none" />
            )}
          </motion.div>
        </div>
      </div>

      {isPlaying && (
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
            {formatDuration(currentTime)} / {formatDuration(duration)}
          </p>

          <input
            dir="ltr"
            className="xl:w-[70%] lg:w-[70%] md:w-[70%] sm:w-[65%] xs:w-[60%] accent-blueLink dark:accent-dark-yellow border-none outline-none ring-0"
            type="range"
            min={0}
            max={100}
            value={
              Number.isFinite(progress)
                ? Math.max(0, Math.min(100, progress))
                : 0
            }
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
      )}
    </div>
  );
};

export default SingleVideoPlayModule;
