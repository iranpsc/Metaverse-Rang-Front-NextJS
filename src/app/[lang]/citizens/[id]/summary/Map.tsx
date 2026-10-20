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
const MAX_READY_RETRIES = 30; // ~0.5s of rAF retries while the canvas has no size yet

const isValidCoordinate = (longitude: number, latitude: number): boolean =>
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

/**
 * Markers only need project() + the canvas size. They must NOT depend on
 * map.loaded(): that flips to false whenever tiles/style are loading
 * (first render, panning, theme change), which used to wipe all markers.
 */
const isMapReady = (map: any): boolean => {
  if (!map) return false;
  try {
    const canvas = map.getCanvas?.();
    return Boolean(
      canvas && canvas.isConnected && canvas.clientWidth > 0 && canvas.clientHeight > 0
    );
  } catch {
    return false;
  }
};

/* ------------------------------------------------------------------ */
/*                              CLUSTERS                               */
/* ------------------------------------------------------------------ */

function buildClusters(map: any, markers: MapMarkerItem[]): ClusterItem[] {
  if (!map || markers.length === 0) return [];

  try {
    const zoom: number = map.getZoom();
    const canvas: HTMLCanvasElement = map.getCanvas();
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (width <= 0 || height <= 0) return [];

    const validMarkers = markers.filter((m) =>
      isValidCoordinate(m.longitude, m.latitude)
    );
    if (validMarkers.length === 0) return [];

    const isVisible = (x: number, y: number) =>
      x >= -VIEWPORT_MARGIN &&
      x <= width + VIEWPORT_MARGIN &&
      y >= -VIEWPORT_MARGIN &&
      y <= height + VIEWPORT_MARGIN;

    const pts = validMarkers.map((marker) => {
      const p = map.project([marker.longitude, marker.latitude]);
      return { marker, x: p.x, y: p.y };
    });

    // زوم بالا: نمایش جداگانه مارکرهای قابل مشاهده
    if (zoom >= MAX_CLUSTER_ZOOM) {
      return pts
        .filter((p) => isVisible(p.x, p.y))
        .map(({ marker }) => ({
          id: `marker-${marker.id}`,
          longitude: marker.longitude,
          latitude: marker.latitude,
          markers: [marker],
          isCluster: false,
        }));
    }

    // گرید برای کاهش هزینهٔ محاسبات
    const grid = new Map<string, number[]>();
    const cellOf = (v: number) => Math.floor(v / CLUSTER_RADIUS);

    for (let i = 0; i < pts.length; i++) {
      const key = `${cellOf(pts[i].x)}:${cellOf(pts[i].y)}`;
      const cell = grid.get(key);
      if (cell) cell.push(i);
      else grid.set(key, [i]);
    }

    const used = new Uint8Array(pts.length);
    const result: ClusterItem[] = [];
    const radiusSquared = CLUSTER_RADIUS * CLUSTER_RADIUS;

    for (let i = 0; i < pts.length; i++) {
      if (used[i]) continue;
      used[i] = 1;

      const base = pts[i];
      const group: number[] = [i];
      const cx = cellOf(base.x);
      const cy = cellOf(base.y);

      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const cell = grid.get(`${cx + dx}:${cy + dy}`);
          if (!cell) continue;

          for (const j of cell) {
            if (used[j]) continue;
            const ddx = base.x - pts[j].x;
            const ddy = base.y - pts[j].y;
            if (ddx * ddx + ddy * ddy <= radiusSquared) {
              used[j] = 1;
              group.push(j);
            }
          }
        }
      }

      let sx = 0;
      let sy = 0;
      let sLon = 0;
      let sLat = 0;
      for (const idx of group) {
        sx += pts[idx].x;
        sy += pts[idx].y;
        sLon += pts[idx].marker.longitude;
        sLat += pts[idx].marker.latitude;
      }

      const count = group.length;
      if (!isVisible(sx / count, sy / count)) continue;

      if (count === 1) {
        result.push({
          id: `marker-${base.marker.id}`,
          longitude: base.marker.longitude,
          latitude: base.marker.latitude,
          markers: [base.marker],
          isCluster: false,
        });
      } else {
        // کلید پایدار: کوچک‌ترین id اعضا + تعداد (مستقل از ترتیب پردازش)
        let minId = String(pts[group[0]].marker.id);
        for (const idx of group) {
          const s = String(pts[idx].marker.id);
          if (s < minId) minId = s;
        }

        result.push({
          id: `cluster-${minId}-${count}`,
          longitude: sLon / count,
          latitude: sLat / count,
          markers: group.map((idx) => pts[idx].marker),
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
      (c) => `${c.id}@${c.longitude.toFixed(5)},${c.latitude.toFixed(5)}`
    )
    .join("|");

const markersSignature = (list: MapMarkerItem[]) => {
  // ترتیب‌ناپذیر و سبک: تعداد + مجموع/ماکزیمم مختصات و idها
  let h = 0;
  for (const m of list) {
    const s = `${m.id}:${m.longitude}:${m.latitude}`;
    for (let i = 0; i < s.length; i++) {
      h = (h + s.charCodeAt(i) * (i + 1)) % 2147483647;
    }
  }
  return `${list.length}-${h}`;
};

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

const ClusterBubble = memo(function ClusterBubble({ count }: { count: number }) {
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
  const retryRef = useRef(0);
  const markersRef = useRef<MapMarkerItem[]>(markers);
  const fittedSigRef = useRef<string>("");

  markersRef.current = markers;

  /* ------------------------------ THEME ---------------------------- */

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

  /* ------------------------- UPDATE CLUSTERS ----------------------- */

  const scheduleUpdateRef = useRef<() => void>(() => {});

  const updateClusters = useCallback(() => {
    const list = markersRef.current;

    // لیست خالی → فقط در این حالت مارکرها پاک می‌شوند
    if (list.length === 0) {
      retryRef.current = 0;
      if (signatureRef.current !== "") {
        signatureRef.current = "";
        setClusters([]);
      }
      return;
    }

    const map = getMapInstance(mapRef.current);

    // نقشه هنوز اندازه ندارد → وضعیت قبلی را نگه دار و چند بار دوباره تلاش کن
    if (!map || !isMapReady(map)) {
      if (retryRef.current < MAX_READY_RETRIES) {
        retryRef.current += 1;
        scheduleUpdateRef.current();
      }
      return;
    }

    retryRef.current = 0;

    const next = buildClusters(map, list);
    const nextSignature = clustersSignature(next);
    if (nextSignature === signatureRef.current) return;

    signatureRef.current = nextSignature;
    setClusters(next);
  }, []);

  const scheduleUpdate = useCallback(() => {
    if (rafRef.current !== null) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      updateClusters();
    });
  }, [updateClusters]);

  scheduleUpdateRef.current = scheduleUpdate;

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  const handleMapLoad = useCallback(() => {
    setIsMapLoaded(true);
    signatureRef.current = "";
    retryRef.current = 0;
    updateClusters();
  }, [updateClusters]);

  // هر وقت لیست مارکرها عوض شد (یا نقشه لود شد) دوباره بساز
  useEffect(() => {
    signatureRef.current = "__force__";
    retryRef.current = 0;
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
    if (!map) return;

    try {
      map.flyTo({
        center: [focusLon!, focusLat!],
        zoom: Number.isFinite(focusZoom) ? focusZoom : 16,
        duration: 900,
      });
    } catch (error) {
      console.error("[MapComponent] Failed to focus map:", error);
    }
  }, [isMapLoaded, hasValidFocus, focusLon, focusLat, focusZoom]);

  /* ----------------------------- AUTO FIT -------------------------- */
  /* فقط وقتی «مجموعهٔ مارکرها» واقعاً عوض شود fit می‌کنیم، نه با هر
     رندر یا بعد از برداشته شدن focus. */

  useEffect(() => {
    if (!isMapLoaded || hasValidFocus) return;

    const map = getMapInstance(mapRef.current);
    if (!map) return;

    const validMarkers = markers.filter((m) =>
      isValidCoordinate(m.longitude, m.latitude)
    );
    if (validMarkers.length === 0) return;

    const sig = markersSignature(validMarkers);
    if (sig === fittedSigRef.current) return;
    fittedSigRef.current = sig;

    try {
      if (validMarkers.length === 1) {
        const m = validMarkers[0];
        map.flyTo({
          center: [m.longitude, m.latitude],
          zoom: 14,
          duration: 800,
        });
        return;
      }

      let minLon = Infinity;
      let minLat = Infinity;
      let maxLon = -Infinity;
      let maxLat = -Infinity;

      for (const m of validMarkers) {
        minLon = Math.min(minLon, m.longitude);
        minLat = Math.min(minLat, m.latitude);
        maxLon = Math.max(maxLon, m.longitude);
        maxLat = Math.max(maxLat, m.latitude);
      }

      if (minLon === maxLon && minLat === maxLat) {
        map.flyTo({ center: [minLon, minLat], zoom: 14, duration: 800 });
        return;
      }

      const bounds: [[number, number], [number, number]] = [
        [minLon, minLat],
        [maxLon, maxLat],
      ];

      if (!bounds.flat().every(Number.isFinite)) return;

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
      if (!map) return;

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

  const highlightedKey = highlightedId != null ? String(highlightedId) : null;

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
        onIdle={scheduleUpdate}
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
                  highlightedKey != null && String(marker.id) === highlightedKey
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