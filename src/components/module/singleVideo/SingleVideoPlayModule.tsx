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
  const intervalRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState<any>(false);
  const [showIconPlaying, setShowIconPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [isMute, setIsMute] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const updateProgress = () => {
    if (videoRef.current) {
      const value =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(value);
    }
  };

  const startProgressLoop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      updateProgress();
    }, 1000);
  };

  const stopProgressLoop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const togglePlayPause = () => {
    setShowIconPlaying(true);
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
        startProgressLoop();
        setTimeout(() => {
          setShowIconPlaying(false); // به این ترتیب آیکون پخش/مکث متوقف می‌شود
        }, 2000);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
        stopProgressLoop();
      }
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      //videoRef.current.play();
      startProgressLoop();
    }
  }, []);

  useEffect(() => {}, [isMute]);

  const handleSeek = (event: any) => {
    if (videoRef.current) {
      const seekTo = (event.target.value / 100) * videoRef.current.duration;
      videoRef.current.currentTime = seekTo;
      setProgress(event.target.value);
    }
  };

  const formatDuration = (durationInSeconds: any) => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = Math.floor(durationInSeconds % 60);

    return `${hours > 0 ? `${hours}:` : ""}${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const handlerVolume = () => {
    if (isMute) {
      setIsMute(false);
    } else {
      setIsMute(true);
    }
  };

  const toggleFullScreen = () => {
    if (!isFullscreen) {
      if (videoRef.current?.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="w-full relative  pt-5 bg-white dark:bg-dark-background flex justify-center items-center">
      <div className="relative w-full flex justify-center items-center ">
        <video
          ref={videoRef}
          className="w-full xl:h-[700px] lg:h-[600px] md:h-[500px] sm:h-[300px] xs:h-[300px]  rounded-xl mx-10 object-fill z-30"
          src={DataVideo.video_url}
          poster={DataVideo.image_url}
          onPlay={startProgressLoop}
          onPause={stopProgressLoop}
          width={1000}
          height={1000}
          muted={isMute}
        />
        <div
          className="absolute w-full h-full flex justify-center items-center z-40  top-0"
          onClick={togglePlayPause}
        >
          <motion.div
            className="bg-black/50 size-[100px] rounded-full flex justify-center items-center"
            initial={{ opacity: 1, scale: 0 }}
            animate={{
              opacity: isPlaying ? 0 : 1,
              scale: isPlaying ? 0.5 : 0.9,
            }}
            transition={{ duration: 0.4 }}
          >
            {!isPlaying ? (
              <>
                {" "}
                <PlayIcon
                  className="size-[50px] select-none"
                  alt="play-video"
                />
              </>
            ) : (
              <>
                {" "}
                <PauseIcon
                  className="size-[50px] select-none"
                  alt="play-video"
                />
              </>
            )}
          </motion.div>
        </div>
      </div>

      <div className="xl:w-[80%] lg:w-[80%] md:w-[90%] sm:w-[95%] xs:w-[95%] bg-white/80 dark:bg-dark-background flex flex-row justify-center items-center xl:gap-4 lg:gap-4 md:gap-4 sm:gap-1 xs:gap-1 h-[65px] xs:h-[45px] absolute bottom-7 rounded-[20px] select-none z-50">
        <div className="size-[25px]" onClick={toggleFullScreen}>
          <FullScreenIcon className="size-[24px]  fill-singleVideo-gray dark:fill-white cursor-pointer" />
        </div>

        <p className="font-azarMehr text-singleVideo_medium text-singleVideo-gray dark:text-white font-medium">
          {videoRef.current
            ? formatDuration(videoRef.current.duration)
            : "00:00"}
        </p>
        <input
          dir="ltr"
          className="xl:w-[70%] lg:w-[70%] md:w-[70%] sm:w-[65%] xs:w-[60%] accent-blueLink dark:accent-dark-yellow  border-none outline-none ring-0"
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={handleSeek}
          aria-label="player input"
        />
        {isMute ? (
          <VolumeIcon
            className="size-[24px] fill-singleVideo-gray dark:fill-white"
            onClick={handlerVolume}
          />
        ) : (
          <VolumeMuteIcon
            className="size-[24px] fill-singleVideo-gray dark:fill-white"
            onClick={handlerVolume}
          />
        )}
      </div>
    </div>
  );
};

export default SingleVideoPlayModule;
