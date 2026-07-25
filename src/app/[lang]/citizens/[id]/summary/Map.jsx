
"use client";

import { useEffect, useState } from "react";
import Map from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

import styleMapLight from "./styleMapLight.json";
import styleMapDark from "./styleMapDark.json";

export default function MapComponent() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        position: "relative",
        
      }}
      className="rounded-xl"
    >
      <Map
        initialViewState={{
          longitude: 54.2199,
          latitude: 25.229,
          zoom: 14,
          pitch: 40,
        }}
        mapStyle={isDark ? styleMapDark : styleMapLight}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}

