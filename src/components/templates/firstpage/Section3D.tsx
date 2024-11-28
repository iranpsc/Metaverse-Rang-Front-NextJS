"use client";
import { useState, useEffect } from "react";

const Section3D = () => {
  const [useAparat, setUseAparat] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setUseAparat(true);
    }, 2500);

    const iframe = document.getElementById("youtube-iframe");
    iframe?.addEventListener("load", () => {
      clearTimeout(timeout);
    });

    return () => {
      clearTimeout(timeout);
      iframe?.removeEventListener("load", () => {});
    };
  }, []);

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
            id="youtube-iframe"
            className="w-full h-full"
            src="https://www.youtube.com/embed/0yAc0hUeF8Y"
            title="YouTube Video Player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default Section3D;
