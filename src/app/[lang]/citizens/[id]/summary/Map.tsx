"use client";

import { useEffect, useRef, useState } from "react";
import MapGL, { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

import styleMapLight from "./styleMapLight.json";
import styleMapDark from "./styleMapDark.json";

/* ------------------------------------------------------------------ */
/*                                TYPES                                */
/* ------------------------------------------------------------------ */
export interface MapMarkerItem {
  id: number | string;
  longitude: number; // API's center.x
  latitude: number; // API's center.y
  karbari?: string;
  color?: string;
}

/* ------------------------------------------------------------------ */
/*                             MAP COMPONENT                            */
/* ------------------------------------------------------------------ */
export default function MapComponent({
  markers = [],
  onMarkerClick,
  height = "500px",
  focusTarget = null,
  highlightedId = null,
}: {
  markers?: MapMarkerItem[];
  onMarkerClick?: (marker: MapMarkerItem) => void;
  height?: string;
  focusTarget?: { longitude: number; latitude: number; zoom?: number } | null;
  highlightedId?: number | string | null;
}) {
  const [isDark, setIsDark] = useState(false);
  // `any` here since the exact MapRef type name can differ across
  // react-map-gl versions — only fitBounds/flyTo are used below.
  const mapRef = useRef<any>(null);

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

  // fly to a specific point (e.g. a search result) when focusTarget is set
  useEffect(() => {
    const map = mapRef.current?.getMap ? mapRef.current.getMap() : mapRef.current;
    if (!map || !focusTarget) return;

    map.flyTo({
      center: [focusTarget.longitude, focusTarget.latitude],
      zoom: focusTarget.zoom ?? 16,
      duration: 900,
    });
  }, [focusTarget]);

  // auto fit the view to all markers whenever the marker list changes —
  // skipped while a specific focusTarget (search result) is active
  useEffect(() => {
    if (focusTarget) return;

    const map = mapRef.current?.getMap ? mapRef.current.getMap() : mapRef.current;
    if (!map || markers.length === 0) return;

    if (markers.length === 1) {
      map.flyTo({
        center: [markers[0].longitude, markers[0].latitude],
        zoom: 14,
        duration: 800,
      });
      return;
    }

    const lons = markers.map((m) => m.longitude);
    const lats = markers.map((m) => m.latitude);

    map.fitBounds(
      [
        [Math.min(...lons), Math.min(...lats)],
        [Math.max(...lons), Math.max(...lats)],
      ],
      { padding: 60, duration: 800 }
    );
  }, [markers, focusTarget]);

  return (
    <div
      style={{
        width: "100%",
        height,
        position: "relative",
      }}
    >
      <MapGL
        ref={mapRef}
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
          borderRadius: "0.75rem",
        }}
      >
        {markers.map((marker) => {
          const isHighlighted =
            highlightedId !== null && highlightedId !== undefined && marker.id === highlightedId;
          return (
            <Marker
              key={marker.id}
              longitude={marker.longitude}
              latitude={marker.latitude}
              onClick={(e: any) => {
                e.originalEvent?.stopPropagation();
                onMarkerClick?.(marker);
              }}
            >
              <div
                title={`#${marker.id}`}
                style={{
                  width: isHighlighted ? 30 : 22,
                  height: isHighlighted ? 30 : 22,
                  borderRadius: "9999px",
                  background: marker.color || "#FFC700",
                  border: "2px solid rgba(255,255,255,0.85)",
                  boxShadow: isHighlighted
                    ? `0 0 0 8px ${marker.color || "#FFC700"}33, 0 2px 10px rgba(0,0,0,0.5)`
                    : "0 2px 6px rgba(0,0,0,0.45)",
                  cursor: onMarkerClick ? "pointer" : "default",
                  transition: "width 0.2s, height 0.2s, box-shadow 0.2s",
                }}
              />
            </Marker>
          );
        })}
      </MapGL>
    </div>
  );
}