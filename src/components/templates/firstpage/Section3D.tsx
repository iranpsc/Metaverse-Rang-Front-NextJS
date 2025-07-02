"use client";
import React, { useState, useEffect } from "react";

const Section3D = ({ params }: any) => {
  const [useAparat, setUseAparat] = useState(false); // State to track fallback
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null); // Timeout reference

  // useEffect(() => {
  //   // Set a timeout to switch to Aparat if YouTube iframe doesn't load
  //   timeoutRef.current = setTimeout(() => {
  //     setUseAparat(true); // Switch to Aparat
  //   }, 4000); // 4-second timeout

  //   return () => {
  //     // Clear the timeout when the component unmounts
  //     if (timeoutRef.current) {
  //       clearTimeout(timeoutRef.current);
  //     }
  //   };
  // }, []);

  // const handleYouTubeLoad = () => {
  //   // Clear the fallback timeout
  //   if (timeoutRef.current) {
  //     clearTimeout(timeoutRef.current);
  //     timeoutRef.current = null; // Ensure the timeout is nullified
  //   }

  //   setUseAparat(false); // Ensure YouTube is used
  // };

  return (
    <div
      className="relative w-full flex justify-center items-center"
      style={{ minHeight: "100px" }}
    >
      {params.lang.toLowerCase() == "fa" ? (
        <iframe
          className="w-full h-full aspect-video border-0 rounded-[72px]"
          src="https://www.aparat.com/video/video/embed/videohash/nkl2c42/vt/frame"
          title="Aparat Video Player"
          allowFullScreen
        ></iframe>
      ) : (
        <iframe
          className="w-full h-full aspect-video border-0 rounded-[72px]"
          src="https://www.youtube.com/embed/0yAc0hUeF8Y"
          title="YouTube Video Player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          // onLoad={handleYouTubeLoad} // Triggered when the iframe loads
        ></iframe>
      )}
    </div>
  );
};

export default Section3D;
