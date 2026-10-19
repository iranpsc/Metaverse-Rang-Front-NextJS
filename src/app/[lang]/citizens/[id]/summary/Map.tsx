
"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";


import "maplibre-gl/dist/maplibre-gl.css";

import styleMapLightJson from "./styleMapLight.json";
import styleMapDarkJson from "./styleMapDark.json";
import MapGL, { Marker } from "react-map-gl/maplibre";
import { setWorkerUrl } from "maplibre-gl";
import type { StyleSpecification } from "maplibre-gl";
const styleMapLight = styleMapLightJson as unknown as StyleSpecification;
const styleMapDark = styleMapDarkJson as unknown as StyleSpecification;
setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");
/* -setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");----------------------------------------------------------------- */
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

interface MapComponentProps {
  markers?: MapMarkerItem[];
  onMarkerClick?: (marker: MapMarkerItem) => void;

  /** اگر داده شود، کلیک روی کلاستر زوم نمی‌کند و فقط لیست مارکرها را برمی‌گرداند */
  onClusterClick?: (markers: MapMarkerItem[]) => void;

  height?: string;
  focusTarget?: {
    longitude: number;
    latitude: number;
    zoom?: number;
  } | null;
  highlightedId?: number | string | null;
}

/* ------------------------------------------------------------------ */
/*                            CONFIGURATION                            */
/* ------------------------------------------------------------------ */

const CLUSTER_RADIUS = 55;
const MAX_CLUSTER_ZOOM = 16;
const VIEWPORT_MARGIN = CLUSTER_RADIUS * 2;

const isValidCoordinate = (
  longitude: number,
  latitude: number
): boolean =>
  Number.isFinite(longitude) &&
  Number.isFinite(latitude) &&
  longitude >= -180 &&
  longitude <= 180 &&
  latitude >= -90 &&
  latitude <= 90;

const getMapInstance = (ref: any): any | null => {
  if (!ref) return null;

  try {
    return typeof ref.getMap === "function" ? ref.getMap() : ref;
  } catch {
    return null;
  }
};

const isMapReady = (map: any): boolean => {
  if (!map) return false;

  try {
    if (typeof map.loaded === "function" && !map.loaded()) {
      return false;
    }

    const canvas = map.getCanvas?.();

    return Boolean(canvas && canvas.isConnected);
  } catch {
    return false;
  }
};

/* ------------------------------------------------------------------ */
/*                              CLUSTERS                               */
/* ------------------------------------------------------------------ */

function buildClusters(
  map: any,
  markers: MapMarkerItem[]
): ClusterItem[] {
  if (!map || markers.length === 0) return [];

  try {
    const zoom: number = map.getZoom();
    const canvas: HTMLCanvasElement = map.getCanvas();
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (width <= 0 || height <= 0) return [];

    const validMarkers = markers.filter((marker) =>
      isValidCoordinate(marker.longitude, marker.latitude)
    );

    if (validMarkers.length === 0) return [];

    const isVisible = (x: number, y: number) =>
      x >= -VIEWPORT_MARGIN &&
      x <= width + VIEWPORT_MARGIN &&
      y >= -VIEWPORT_MARGIN &&
      y <= height + VIEWPORT_MARGIN;

    const pts = validMarkers.map((marker) => {
      const point = map.project([
        marker.longitude,
        marker.latitude,
      ]);

      return {
        marker,
        x: point.x,
        y: point.y,
      };
    });

    // زوم بالا: نمایش جداگانه مارکرهای قابل مشاهده
    if (zoom >= MAX_CLUSTER_ZOOM) {
      return pts
        .filter((point) => isVisible(point.x, point.y))
        .map(({ marker }) => ({
          id: `marker-${marker.id}`,
          longitude: marker.longitude,
          latitude: marker.latitude,
          markers: [marker],
          isCluster: false,
        }));
    }

    // ساخت گرید برای کاهش هزینه محاسبات
    const grid = new Map<string, number[]>();
    const cellOf = (value: number) =>
      Math.floor(value / CLUSTER_RADIUS);

    for (let i = 0; i < pts.length; i++) {
      const key = `${cellOf(pts[i].x)}:${cellOf(pts[i].y)}`;
      const cell = grid.get(key);

      if (cell) {
        cell.push(i);
      } else {
        grid.set(key, [i]);
      }
    }

    const used = new Uint8Array(pts.length);
    const result: ClusterItem[] = [];
    const radiusSquared = CLUSTER_RADIUS * CLUSTER_RADIUS;

    for (let i = 0; i < pts.length; i++) {
      if (used[i]) continue;

      used[i] = 1;

      const base = pts[i];
      const groupIndices: number[] = [i];
      const cx = cellOf(base.x);
      const cy = cellOf(base.y);

      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const cell = grid.get(`${cx + dx}:${cy + dy}`);

          if (!cell) continue;

          for (const j of cell) {
            if (used[j]) continue;

            const deltaX = base.x - pts[j].x;
            const deltaY = base.y - pts[j].y;

            if (
              deltaX * deltaX + deltaY * deltaY <=
              radiusSquared
            ) {
              used[j] = 1;
              groupIndices.push(j);
            }
          }
        }
      }

      let screenX = 0;
      let screenY = 0;
      let sumLongitude = 0;
      let sumLatitude = 0;

      for (const index of groupIndices) {
        screenX += pts[index].x;
        screenY += pts[index].y;
        sumLongitude += pts[index].marker.longitude;
        sumLatitude += pts[index].marker.latitude;
      }

      const count = groupIndices.length;

      if (!isVisible(screenX / count, screenY / count)) {
        continue;
      }

      if (count === 1) {
        result.push({
          id: `marker-${base.marker.id}`,
          longitude: base.marker.longitude,
          latitude: base.marker.latitude,
          markers: [base.marker],
          isCluster: false,
        });
      } else {
        result.push({
          id: `cluster-${base.marker.id}-${count}`,
          longitude: sumLongitude / count,
          latitude: sumLatitude / count,
          markers: groupIndices.map(
            (index) => pts[index].marker
          ),
          isCluster: true,
        });
      }
    }

    return result;
  } catch (error) {
    console.error("[MapComponent] Failed to build clusters:", error);
    return [];
  }
}

const clustersSignature = (clusters: ClusterItem[]) =>
  clusters
    .map(
      (cluster) =>
        `${cluster.id}@${cluster.longitude.toFixed(5)},${cluster.latitude.toFixed(5)}`
    )
    .join("|");

/* ------------------------------------------------------------------ */
/*                                ICON                                 */
/* ------------------------------------------------------------------ */

const LocationIcon = memo(function LocationIcon() {
  const common = {
    stroke: "#1A1A18",
    strokeWidth: 1.5,
    strokeMiterlimit: 10,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

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
        {...common}
      />
      <path
        d="M18.3332 18.3333H1.6665V15.8333C1.6665 15.375 2.0415 15 2.49984 15H17.4998C17.9582 15 18.3332 15.375 18.3332 15.8333V18.3333Z"
        {...common}
      />
      <path d="M3.3335 15.0003V9.16699" {...common} />
      <path d="M6.6665 15.0003V9.16699" {...common} />
      <path d="M10 15.0003V9.16699" {...common} />
      <path d="M13.3335 15.0003V9.16699" {...common} />
      <path d="M16.6665 15.0003V9.16699" {...common} />
      <path d="M0.833496 18.333H19.1668" {...common} />
      <path
        d="M10 7.08301C10.6904 7.08301 11.25 6.52336 11.25 5.83301C11.25 5.14265 10.6904 4.58301 10 4.58301C9.30964 4.58301 8.75 5.14265 8.75 5.83301C8.75 6.52336 9.30964 7.08301 10 7.08301Z"
        {...common}
      />
    </svg>
  );
});

/* ------------------------------------------------------------------ */
/*                          MARKER COMPONENTS                          */
/* ------------------------------------------------------------------ */

const ClusterBubble = memo(function ClusterBubble({
  count,
}: {
  count: number;
}) {
  return (
    <div
      title={`${count} locations`}
      style={{
        width: 48,
        height: 48,
        borderRadius: "50%",
        background: "#9100D9",
        border: "4px solid rgba(255,255,255,0.9)",
        boxShadow: "0 3px 12px rgba(0,0,0,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: "#1A1A18",
        fontSize: 15,
        fontWeight: 800,
        userSelect: "none",
      }}
    >
      {count}
    </div>
  );
});

const PinBubble = memo(function PinBubble({
  id,
  color,
  highlighted,
  clickable,
}: {
  id: number | string;
  color: string;
  highlighted: boolean;
  clickable: boolean;
}) {
  const size = highlighted ? 50 : 40;

  return (
    <div
      title={`#${id}`}
      className="flex items-center justify-center"
      style={{
        width: size,
        height: size,
        borderRadius: "9999px",
        background: color,
        boxShadow: highlighted
          ? `0 0 0 8px ${color}33, 0 2px 10px rgba(0,0,0,0.5)`
          : "0 2px 6px rgba(0,0,0,0.45)",
        cursor: clickable ? "pointer" : "default",
        transition: "width 0.2s, height 0.2s, box-shadow 0.2s",
        userSelect: "none",
      }}
    >
      <LocationIcon />
    </div>
  );
});

/* ------------------------------------------------------------------ */
/*                           MAP COMPONENT                             */
/* ------------------------------------------------------------------ */

export default function MapComponent({
  markers = [],
  onMarkerClick,
  onClusterClick,
  height = "500px",
  focusTarget = null,
  highlightedId = null,
}: MapComponentProps) {
  const [isDark, setIsDark] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [clusters, setClusters] = useState<ClusterItem[]>([]);

  const mapRef = useRef<any>(null);
  const signatureRef = useRef("");
  const rafRef = useRef<number | null>(null);
  const markersRef = useRef<MapMarkerItem[]>(markers);

  markersRef.current = markers;

  /* ------------------------------ THEME ---------------------------- */

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(
        document.documentElement.classList.contains("dark")
      );
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  /* ------------------------- UPDATE CLUSTERS ----------------------- */

  const updateClusters = useCallback(() => {
    const map = getMapInstance(mapRef.current);
    const list = markersRef.current;

    if (!map || !isMapReady(map) || list.length === 0) {
      if (signatureRef.current !== "") {
        signatureRef.current = "";
        setClusters([]);
      }

      return;
    }

    const next = buildClusters(map, list);
    const nextSignature = clustersSignature(next);

    if (nextSignature === signatureRef.current) return;

    signatureRef.current = nextSignature;
    setClusters(next);
  }, []);

  const handleMapLoad = useCallback(() => {
    setIsMapLoaded(true);
    signatureRef.current = "";
    updateClusters();
  }, [updateClusters]);

  /* ------------------------- SCHEDULE UPDATE ----------------------- */

  const scheduleUpdate = useCallback(() => {
    if (rafRef.current !== null) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      updateClusters();
    });
  }, [updateClusters]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    signatureRef.current = "__force__";
    updateClusters();
  }, [markers, updateClusters, isMapLoaded]);

  /* --------------------------- FOCUS TARGET ------------------------- */

  const focusLon = focusTarget?.longitude;
  const focusLat = focusTarget?.latitude;
  const focusZoom = focusTarget?.zoom;

  const hasValidFocus =
    focusLon != null &&
    focusLat != null &&
    isValidCoordinate(focusLon, focusLat);

  useEffect(() => {
    if (!isMapLoaded || !hasValidFocus) return;

    const map = getMapInstance(mapRef.current);

    if (!map || !isMapReady(map)) return;

    try {
      map.flyTo({
        center: [focusLon!, focusLat!],
        zoom: Number.isFinite(focusZoom) ? focusZoom : 16,
        duration: 900,
      });
    } catch (error) {
      console.error("[MapComponent] Failed to focus map:", error);
    }
  }, [
    isMapLoaded,
    hasValidFocus,
    focusLon,
    focusLat,
    focusZoom,
  ]);

  /* ----------------------------- AUTO FIT -------------------------- */

  useEffect(() => {
    if (!isMapLoaded || hasValidFocus) return;

    const map = getMapInstance(mapRef.current);

    if (!map || !isMapReady(map)) return;

    const validMarkers = markers.filter((marker) =>
      isValidCoordinate(marker.longitude, marker.latitude)
    );

    if (validMarkers.length === 0) return;

    try {
      if (validMarkers.length === 1) {
        const marker = validMarkers[0];

        map.flyTo({
          center: [marker.longitude, marker.latitude],
          zoom: 14,
          duration: 800,
        });

        return;
      }

      let minLon = Infinity;
      let minLat = Infinity;
      let maxLon = -Infinity;
      let maxLat = -Infinity;

      for (const marker of validMarkers) {
        minLon = Math.min(minLon, marker.longitude);
        minLat = Math.min(minLat, marker.latitude);
        maxLon = Math.max(maxLon, marker.longitude);
        maxLat = Math.max(maxLat, marker.latitude);
      }

      // محدودهٔ صفر: fitBounds لازم نیست.
      if (minLon === maxLon && minLat === maxLat) {
        map.flyTo({
          center: [minLon, minLat],
          zoom: 14,
          duration: 800,
        });

        return;
      }

      // پیش از فراخوانی، bounds را اعتبارسنجی می‌کنیم.
      const bounds: [
        [number, number],
        [number, number],
      ] = [
        [minLon, minLat],
        [maxLon, maxLat],
      ];

      if (
        !bounds.flat().every(Number.isFinite) ||
        minLon > maxLon ||
        minLat > maxLat
      ) {
        return;
      }

      map.fitBounds(bounds, {
        padding: 60,
        duration: 800,
        maxZoom: 17,
      });
    } catch (error) {
      console.error("[MapComponent] Failed to fit map bounds:", error);
    }
  }, [markers, hasValidFocus, isMapLoaded]);

  /* --------------------------- CLUSTER CLICK ------------------------ */

  const handleClusterClick = useCallback(
    (cluster: ClusterItem) => {
      if (onClusterClick) {
        onClusterClick(cluster.markers);
        return;
      }

      const map = getMapInstance(mapRef.current);

      if (!map || !isMapReady(map)) return;

      try {
        map.flyTo({
          center: [cluster.longitude, cluster.latitude],
          zoom: Math.min(map.getZoom() + 2, 17),
          duration: 500,
        });
      } catch (error) {
        console.error("[MapComponent] Failed to zoom to cluster:", error);
      }
    },
    [onClusterClick]
  );

  /* ------------------------------- RENDER -------------------------- */

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
        onMove={scheduleUpdate}
        onMoveEnd={scheduleUpdate}
        onResize={scheduleUpdate}
      >
        {clusters.map((cluster) => {
          if (cluster.isCluster) {
            return (
              <Marker
                key={cluster.id}
                longitude={cluster.longitude}
                latitude={cluster.latitude}
                anchor="center"
                onClick={(event: any) => {
                  event.originalEvent?.stopPropagation();
                  handleClusterClick(cluster);
                }}
              >
                <ClusterBubble count={cluster.markers.length} />
              </Marker>
            );
          }

          const marker = cluster.markers[0];

          if (!marker) return null;

          return (
            <Marker
              key={cluster.id}
              longitude={marker.longitude}
              latitude={marker.latitude}
              anchor="center"
              onClick={(event: any) => {
                event.originalEvent?.stopPropagation();
                onMarkerClick?.(marker);
              }}
            >
              <PinBubble
                id={marker.id}
                color={marker.color || "#9100D9"}
                highlighted={
                  highlightedId != null &&
                  marker.id === highlightedId
                }
                clickable={!!onMarkerClick}
              />
            </Marker>
          );
        })}
      </MapGL>
    </div>
  );
}
