"use client";
import React, { useState, useEffect, useRef } from "react";

const Section3D = () => {
  const [useAparat, setUseAparat] = useState(false);
  const [youtubeLoaded, setYouTubeLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  // *HINT* useRef WON'T trigger re-render unlike useState.
  const iframeContainerRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle YouTube load state and fallback after a timeout
  useEffect(() => {
    if (inView && !youtubeLoaded) {
      // Start the timeout
      timeoutRef.current = setTimeout(() => {
        if (!youtubeLoaded) {
          console.log("YouTube failed to load. Switching to Aparat...");
          setUseAparat(true); // Fallback
        }
      }, 5000); // 5 seconds timeout
    }

    // Cleanup timeout accordingly
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [youtubeLoaded, inView]);

  // IntersectionObserver to load iframe when it's in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setInView(true); // Trigger iframe load when in view
        }
      },
      {
        rootMargin: "0px",
        threshold: 0.1, // Trigger when 10% of the iframe is in view
      }
    );

    if (iframeContainerRef.current) {
      observer.observe(iframeContainerRef.current); // Observe the iframe container
    }

    return () => {
      if (iframeContainerRef.current) {
        observer.unobserve(iframeContainerRef.current); // Cleanup observer
      }
    };
  }, []);

  const handleYouTubeLoad = () => {
    console.log("YouTube loaded successfully");
    setYouTubeLoaded(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return (
    <div
      ref={iframeContainerRef}
      className="relative w-full flex justify-center items-center"
      style={{ height: "500px" }} // Ensure the container has height for detection
    >
      {inView ? (
        useAparat ? (
          <iframe
            className="w-full h-full"
            src="https://www.aparat.com/video/video/embed/videohash/nkl2c42/vt/frame"
            title="Aparat Video Player"
            allowFullScreen
          ></iframe>
        ) : (
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/0yAc0hUeF8Y"
            title="YouTube Video Player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={handleYouTubeLoad}
          ></iframe>
        )
      ) : (
        <p>Loading iframe...</p>
      )}
    </div>
  );
};

export default Section3D;
