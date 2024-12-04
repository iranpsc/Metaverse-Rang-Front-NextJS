"use client";
import React, { useState, useEffect } from "react";

export default function LazyLoadVideo() {
  // State to manage whether to show the image or the video
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // Set a timer to switch from the image to the video after 2 seconds
    const timer = setTimeout(() => {
      setShowVideo(true);
      clearTimeout(timer);
    }, 10000); // 2000ms = 2 seconds

    // Clear the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Initially render the image, then switch to video */}
      {!showVideo ? (
        <img
          loading="lazy"
          src="/firstpage/replaced_pic.png"
          alt="Initial image"
          className="absolute w-full h-full object-cover"
        />
      ) : (
        <video
          src="/firstpage/3d_rgb.irpsc.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute w-full h-full ltr:rotate-y-180 object-cover object-[-115px] sm:object-left"
        />
      )}
    </>
  );
}
