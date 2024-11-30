"use client";
import React, { useState, useEffect } from "react";

const Section3D = () => {
  const [useAparat, setUseAparat] = useState(false);
  const [youtubeLoaded, setYouTubeLoaded] = useState(false);

  useEffect(() => {
    // Timeout to fallback to Aparat after 5 seconds if YouTube is not loaded
    const timeout = setTimeout(() => {
      if (!youtubeLoaded) {
        setUseAparat(true);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [youtubeLoaded]);

  const handleYouTubeLoad = () => {
    // If the iframe loads successfully, set youtubeLoaded to true
    console.log("YouTube loaded");
    setYouTubeLoaded(true);
  };

  return (
    <div className="relative w-full flex justify-center items-center">
      <div className="absolute bottom-12 start-5 w-fit z-10 h-fit gap-5 flex flex-row justify-center items-center"></div>
      <div className="w-full aspect-video overflow-hidden flex items-center">
        {useAparat ? (
          <iframe
            className="w-full h-full"
            src="https://www.aparat.com/video/video/embed/videohash/nkl2c42/vt/frame"
            title="Aparat Video Player"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        ) : (
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/0yAc0hUeF8Y"
            title="YouTube Video Player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={handleYouTubeLoad} // Track successful load
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default Section3D;
