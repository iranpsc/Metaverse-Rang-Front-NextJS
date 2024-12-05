"use client";
import React, { useState, useEffect, useRef } from "react";

const Section3D = () => {
  const [inView, setInView] = useState(false);
  const iframeContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        console.log("Intersection entry:", entry); // Debug log
        if (entry.isIntersecting) {
          console.log("Iframe is in view - Setting state to load iframe");
          setInView(true); // Trigger iframe load when in view
        } else {
          console.log("Iframe is not in view");
        }
      },
      {
        rootMargin: "0px",
        threshold: 0.5, // Trigger when 50% of the iframe is in view
      }
    );

    if (iframeContainerRef.current) {
      observer.observe(iframeContainerRef.current); // Observe the iframe container
    }

    return () => {
      if (iframeContainerRef.current) {
        observer.unobserve(iframeContainerRef.current); // Cleanup observer on component unmount
      }
    };
  }, []);

  return (
    <div
      ref={iframeContainerRef}
      className="relative w-full flex justify-center items-center"
      style={{ height: "500px" }} // Ensure container has height for detection
    >
      {inView ? (
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/0yAc0hUeF8Y"
          title="YouTube Video Player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ height: "100%", width: "100%" }}
        ></iframe>
      ) : (
        <p>Loading iframe...</p> // Show loading text while iframe isn't loaded
      )}
    </div>
  );
};

export default Section3D;
