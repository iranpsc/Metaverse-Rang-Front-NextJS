"use client";

import React, { useState, useEffect, useRef } from "react";

const Section3D = ({ params }: any) => {
  const [useAparat, setUseAparat] = useState(params.lang.toLowerCase() === "fa"); // Initial state based on language
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Timeout reference

  useEffect(() => {
    // If language is Persian, use Aparat directly and skip YouTube check
    if (params.lang.toLowerCase() === "fa") {
      setUseAparat(true);
      return;
    }

    // Set a timeout to fallback to Aparat if YouTube doesn't load
    timeoutRef.current = setTimeout(() => {
      setUseAparat(true); // Switch to Aparat after 6 seconds
    }, 6000);

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [params.lang]);

  // Handle successful YouTube iframe load
  const handleYouTubeLoad = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Clear the fallback timeout
      timeoutRef.current = null;
    }
    setUseAparat(false); // Ensure YouTube is used
  };

  // Handle YouTube iframe error (e.g., due to filtering)
  const handleYouTubeError = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Clear the timeout
      timeoutRef.current = null;
    }
    setUseAparat(true); // Fallback to Aparat
  };

  return (
    <div
      className="relative w-full flex justify-center items-center"
      style={{ minHeight: "100px" }}
    >
      {useAparat ? (
        <iframe
          className="w-full h-full aspect-video border-0 rounded-3xl lg:rounded-[72px]"
          src="https://www.aparat.com/video/video/embed/videohash/nkl2c42/vt/frame"
          title="Aparat Video Player"
          allowFullScreen
        ></iframe>
      ) : (
        <iframe
          className="w-full h-full aspect-video border-0 rounded-3xl lg:rounded-[72px]"
          src="https://www.youtube.com/embed/0yAc0hUeF8Y"
          title="YouTube Video Player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={handleYouTubeLoad} // Triggered when iframe loads successfully
          onError={handleYouTubeError} // Triggered when iframe fails to load
        ></iframe>
      )}
    </div>
  );
};

export default Section3D;