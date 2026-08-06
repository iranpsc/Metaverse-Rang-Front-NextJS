
"use client";

import { useEffect, useRef, useState } from "react";
import MapGL, { Marker } from "react-map-gl/maplibre";
import type { StyleSpecification } from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";

import styleMapLightJson from "./styleMapLight.json";
import styleMapDarkJson from "./styleMapDark.json";

const styleMapLight =
  styleMapLightJson as unknown as StyleSpecification;

const styleMapDark =
  styleMapDarkJson as unknown as StyleSpecification;
/* ------------------------------------------------------------------ */
/*                                TYPES                                */
/* ------------------------------------------------------------------ */

export interface MapMarkerItem {
  id: number | string;
  longitude: number;
  latitude: number;
  karbari?: string;
  color?: string;
}

interface ClusterItem {
  id: string;
  longitude: number;
  latitude: number;
  markers: MapMarkerItem[];
  isCluster: boolean;
}

/* ------------------------------------------------------------------ */
/*                         CLUSTER CONFIG                               */
/* ------------------------------------------------------------------ */

// فاصله‌ای که دو Location در حالت Zoom Out باید برای Cluster شدن
// از هم داشته باشند. واحد این مقدار پیکسل روی صفحه است.
const CLUSTER_RADIUS = 55;

// اگر تعداد Markerها خیلی زیاد است، این مقدار باعث می‌شود
// Clusterها بیش از حد بزرگ نشوند.
const MAX_CLUSTER_ZOOM = 16;

/* ------------------------------------------------------------------ */
/*                       BUILD CLUSTERS                                 */
/* ------------------------------------------------------------------ */

function buildClusters(
  map: any,
  markers: MapMarkerItem[],
  zoom: number
): ClusterItem[] {
  if (!map || markers.length === 0) return [];

  // در Zoom بالا اصلاً Cluster نمی‌کنیم
  if (zoom >= MAX_CLUSTER_ZOOM) {
    return markers.map((marker) => ({
      id: `marker-${marker.id}`,
      longitude: marker.longitude,
      latitude: marker.latitude,
      markers: [marker],
      isCluster: false,
    }));
  }

  const projected = markers.map((marker) => ({
    marker,
    point: map.project([marker.longitude, marker.latitude]),
  }));

  const used = new Set<number>();
  const clusters: ClusterItem[] = [];

  for (let i = 0; i < projected.length; i++) {
    if (used.has(i)) continue;

    const current = projected[i];

    const group: MapMarkerItem[] = [current.marker];
    used.add(i);

    // Markerهای نزدیک به این Marker را پیدا می‌کنیم
    for (let j = i + 1; j < projected.length; j++) {
      if (used.has(j)) continue;

      const candidate = projected[j];

      const dx = current.point.x - candidate.point.x;
      const dy = current.point.y - candidate.point.y;

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= CLUSTER_RADIUS) {
        group.push(candidate.marker);
        used.add(j);
      }
    }

    // اگر فقط یک Marker باشد
    if (group.length === 1) {
      clusters.push({
        id: `marker-${group[0].id}`,
        longitude: group[0].longitude,
        latitude: group[0].latitude,
        markers: group,
        isCluster: false,
      });

      continue;
    }

    // مرکز Cluster
    const longitude =
      group.reduce((sum, marker) => sum + marker.longitude, 0) /
      group.length;

    const latitude =
      group.reduce((sum, marker) => sum + marker.latitude, 0) /
      group.length;

    clusters.push({
      id: `cluster-${group.map((m) => m.id).join("-")}`,
      longitude,
      latitude,
      markers: group,
      isCluster: true,
    });
  }

  return clusters;
}

/* ------------------------------------------------------------------ */
/*                          ICON                                         */
/* ------------------------------------------------------------------ */

function LocationIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.3082 1.79121L17.8082 4.79119C18.0998 4.90786 18.3332 5.25785 18.3332 5.56618V8.33286C18.3332 8.79119 17.9582 9.16619 17.4998 9.16619H2.49984C2.0415 9.16619 1.6665 8.79119 1.6665 8.33286V5.56618C1.6665 5.25785 1.89984 4.90786 2.19151 4.79119L9.69151 1.79121C9.85817 1.72454 10.1415 1.72454 10.3082 1.79121Z"
        stroke="#1A1A18"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M18.3332 18.3333H1.6665V15.8333C1.6665 15.375 2.0415 15 2.49984 15H17.4998C17.9582 15 18.3332 15.375 18.3332 15.8333V18.3333Z"
        stroke="#1A1A18"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M3.3335 15.0003V9.16699"
        stroke="#1A1A18"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M6.6665 15.0003V9.16699"
        stroke="#1A1A18"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M10 15.0003V9.16699"
        stroke="#1A1A18"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M13.3335 15.0003V9.16699"
        stroke="#1A1A18"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M16.6665 15.0003V9.16699"
        stroke="#1A1A18"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M0.833496 18.333H19.1668"
        stroke="#1A1A18"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M10 7.08301C10.6904 7.08301 11.25 6.52336 11.25 5.83301C11.25 5.14265 10.6904 4.58301 10 4.58301C9.30964 4.58301 8.75 5.14265 8.75 5.83301C8.75 6.52336 9.30964 7.08301 10 7.08301Z"
        stroke="#1A1A18"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*                         MAP COMPONENT                                */
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
  focusTarget?: {
    longitude: number;
    latitude: number;
    zoom?: number;
  } | null;
  highlightedId?: number | string | null;
}) {
  const [isDark, setIsDark] = useState(false);

  const [mapZoom, setMapZoom] = useState(14);

  const [clusters, setClusters] = useState<ClusterItem[]>([]);

  const mapRef = useRef<any>(null);

  /* ---------------------------------------------------------------- */
  /*                            THEME                                  */
  /* ---------------------------------------------------------------- */

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

  /* ---------------------------------------------------------------- */
  /*                       UPDATE CLUSTERS                              */
  /* ---------------------------------------------------------------- */

  const updateClusters = () => {
    const map = mapRef.current?.getMap
      ? mapRef.current.getMap()
      : mapRef.current;

    if (!map || markers.length === 0) {
      setClusters([]);
      return;
    }

    const zoom = map.getZoom();

    setMapZoom(zoom);

    const newClusters = buildClusters(map, markers, zoom);

    setClusters(newClusters);
  };

  /* ---------------------------------------------------------------- */
  /*                         MAP LOAD                                   */
  /* ---------------------------------------------------------------- */

  const handleMapLoad = () => {
    updateClusters();
  };

  /* ---------------------------------------------------------------- */
  /*                       ZOOM / MOVE                                  */
  /* ---------------------------------------------------------------- */

  const handleMapMove = () => {
    updateClusters();
  };

  /* ---------------------------------------------------------------- */
  /*                  UPDATE WHEN MARKERS CHANGE                         */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    updateClusters();
  }, [markers]);

  /* ---------------------------------------------------------------- */
  /*                         FOCUS TARGET                               */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    const map = mapRef.current?.getMap
      ? mapRef.current.getMap()
      : mapRef.current;

    if (!map || !focusTarget) return;

    map.flyTo({
      center: [focusTarget.longitude, focusTarget.latitude],
      zoom: focusTarget.zoom ?? 16,
      duration: 900,
    });
  }, [focusTarget]);

  /* ---------------------------------------------------------------- */
  /*                         AUTO FIT                                   */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    if (focusTarget) return;

    const map = mapRef.current?.getMap
      ? mapRef.current.getMap()
      : mapRef.current;

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
      {
        padding: 60,
        duration: 800,
      }
    );
  }, [markers, focusTarget]);

  /* ---------------------------------------------------------------- */
  /*                       CLUSTER CLICK                               */
  /* ---------------------------------------------------------------- */

  const handleClusterClick = (cluster: ClusterItem) => {
    const map = mapRef.current?.getMap
      ? mapRef.current.getMap()
      : mapRef.current;

    if (!map) return;

    /*
     * اگر Cluster است، Zoom In می‌کنیم.
     * هر بار که کاربر Zoom کند دوباره Clusterها محاسبه می‌شوند.
     */
    const nextZoom = Math.min(map.getZoom() + 2, 17);

    map.flyTo({
      center: [cluster.longitude, cluster.latitude],
      zoom: nextZoom,
      duration: 500,
    });
  };

  /* ---------------------------------------------------------------- */
  /*                           RENDER                                   */
  /* ---------------------------------------------------------------- */

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
        onLoad={handleMapLoad}
        onMove={handleMapMove}
      >
        {clusters.map((cluster) => {
          /* -------------------------------------------------------- */
          /*                       CLUSTER                              */
          /* -------------------------------------------------------- */

          if (cluster.isCluster) {
            const count = cluster.markers.length;

            return (
              <Marker
                key={cluster.id}
                longitude={cluster.longitude}
                latitude={cluster.latitude}
                anchor="center"
                onClick={(e: any) => {
                  e.originalEvent?.stopPropagation();
                  handleClusterClick(cluster);
                }}
              >
                <div
                  title={`${count} locations`}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "#FFC700",
                    border: "4px solid rgba(255,255,255,0.9)",
                    boxShadow:
                      "0 3px 12px rgba(0,0,0,0.35)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "#1A1A18",
                    fontSize: 15,
                    fontWeight: 800,
                    userSelect: "none",
                    transition:
                      "transform 0.2s ease, width 0.2s ease, height 0.2s ease",
                  }}
                >
                  {count}
                </div>
              </Marker>
            );
          }

          /* -------------------------------------------------------- */
          /*                     SINGLE MARKER                          */
          /* -------------------------------------------------------- */

          const marker = cluster.markers[0];

          const isHighlighted =
            highlightedId !== null &&
            highlightedId !== undefined &&
            marker.id === highlightedId;

          return (
            <Marker
              key={cluster.id}
              longitude={marker.longitude}
              latitude={marker.latitude}
              anchor="center"
              onClick={(e: any) => {
                e.originalEvent?.stopPropagation();
                onMarkerClick?.(marker);
              }}
            >
              <div
                title={`#${marker.id}`}
                className="flex items-center justify-center"
                style={{
                  width: isHighlighted ? 50 : 40,
                  height: isHighlighted ? 50 : 40,
                  borderRadius: "9999px",
                  background: marker.color || "#FFC700",

                  boxShadow: isHighlighted
                    ? `0 0 0 8px ${
                        marker.color || "#FFC700"
                      }33, 0 2px 10px rgba(0,0,0,0.5)`
                    : "0 2px 6px rgba(0,0,0,0.45)",

                  cursor: onMarkerClick
                    ? "pointer"
                    : "default",

                  transition:
                    "width 0.2s, height 0.2s, box-shadow 0.2s",

                  userSelect: "none",
                }}
              >
                <LocationIcon />
              </div>
            </Marker>
          );
        })}
      </MapGL>

      {/* ------------------------------------------------------------ */}
      {/*                     OPTIONAL DEBUG                             */}
      {/* ------------------------------------------------------------ */}

      {/* 
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: 10,
          background: "rgba(0,0,0,.6)",
          color: "#fff",
          padding: "5px 10px",
          borderRadius: 8,
          fontSize: 12,
        }}
      >
        Zoom: {mapZoom.toFixed(1)}
      </div>
      */}
    </div>
  );
}

