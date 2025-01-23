"use client";
import React, { useState, useEffect, useRef } from "react";

const Section3D = () => {
  const [useAparat, setUseAparat] = useState(false); // Fallback state
  const [youtubeLoaded, setYouTubeLoaded] = useState(false); // YouTube iframe load state
  const [inView, setInView] = useState(false); // Visibility state
  const iframeContainerRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Timeout reference

  useEffect(() => {
    // Start a fallback timeout to switch to Aparat
    if (inView && !youtubeLoaded) {
      timeoutRef.current = setTimeout(() => {
        if (!youtubeLoaded) {
          console.log(
            "YouTube did not load successfully within the timeout. Switching to Aparat."
          );
          setUseAparat(true); // Switch to Aparat
        }
      }, 4000); // Timeout: 4 seconds
    }

    return () => {
      // Cleanup timeout when dependencies change or component unmounts
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [inView, youtubeLoaded]);

  useEffect(() => {
    // Use IntersectionObserver to detect when the section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          console.log("Section3D is in view. Loading iframe.");
          setInView(true); // Trigger iframe load
        }
      },
      {
        rootMargin: "0px",
        threshold: 0.1, // Trigger when 10% of the section is in view
      }
    );

    if (iframeContainerRef.current) {
      observer.observe(iframeContainerRef.current); // Observe the container
    }

    return () => {
      if (iframeContainerRef.current) {
        observer.unobserve(iframeContainerRef.current); // Cleanup observer
      }
    };
  }, []);

  const handleYouTubeLoad = () => {
    console.log("YouTube iframe onLoad fired.");

    // Simulate stricter check for YouTube load success
    setTimeout(() => {
      if (!useAparat) {
        console.log("Confirmed: YouTube iframe loaded successfully.");
        setYouTubeLoaded(true);

        // Clear the fallback timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }
    }, 500); // 0.5 second delay to simulate stricter check
  };

  return (
    <div
      ref={iframeContainerRef}
      className="relative w-full flex justify-center items-center"
      style={{ minHeight: "100px" }}
    >
      {inView ? (
        useAparat ? (
          <iframe
            className="w-full h-full aspect-video"
            src="https://www.aparat.com/video/video/embed/videohash/nkl2c42/vt/frame"
            title="Aparat Video Player"
            allowFullScreen
          ></iframe>
        ) : (
          <iframe
            className="w-full h-full aspect-video"
            src="https://www.youtube.com/embed/0yAc0hUeF8Y"
            title="YouTube Video Player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={handleYouTubeLoad} // Triggered when the iframe loads
          ></iframe>
        )
      ) : (
        <p>Loading iframe...</p>
      )}
    </div>
  );
};

export default Section3D;
