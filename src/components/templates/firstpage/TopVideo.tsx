"use client";
import { useState } from "react";
import Image from "next/image";

export default function LandingTopVideo() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };
  return (
    <>
      {!videoLoaded && (
        <Image
          src="/firstpage/replaced_pic.png" // Optimized poster
          alt="Poster Placeholder"
          layout="fill"
          objectFit="cover"
          quality={50}
          priority
        />
      )}
      {/* <video
        src="/firstpage/3d_rgb.irpsc.mp4"
        autoPlay
        muted
        loop
        playsInline
        className={`absolute w-full h-full object-cover ${
          videoLoaded ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onCanPlayThrough={handleVideoLoad}
      /> */}
    </>
  );
}
