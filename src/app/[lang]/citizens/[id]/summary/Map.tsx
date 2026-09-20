"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import MapGL, { Marker } from "react-map-gl/maplibre";
import type { StyleSpecification } from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";

import styleMapLightJson from "./styleMapLight.json";
import styleMapDarkJson from "./styleMapDark.json";

const styleMapLight = styleMapLightJson as unknown as StyleSpecification;
const styleMapDark = styleMapDarkJson as unknown as StyleSpecification;

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
  focusTarget?: { longitude: number; latitude: number; zoom?: number } | null;
  highlightedId?: number | string | null;
}

/* ------------------------------------------------------------------ */
/*                         CLUSTER CONFIG                              */
/* ------------------------------------------------------------------ */

// فاصلهٔ (پیکسل) دو مارکر برای کلاستر شدن
const CLUSTER_RADIUS = 55;
// از این زوم به بالا کلاستر نمی‌کنیم
const MAX_CLUSTER_ZOOM = 16;
// حاشیهٔ رندر بیرون از دید (پیکسل) تا هنگام pan مارکرها ناگهانی ظاهر نشوند
const VIEWPORT_MARGIN = CLUSTER_RADIUS * 2;

const getMapInstance = (ref: any) =>
  ref?.getMap ? ref.getMap() : ref ?? null;

/* ------------------------------------------------------------------ */
/*        BUILD CLUSTERS  (grid-based → O(n) instead of O(n²))         */
/* ------------------------------------------------------------------ */

function buildClusters(map: any, markers: MapMarkerItem[]): ClusterItem[] {
  if (!map || markers.length === 0) return [];

  const zoom: number = map.getZoom();
  const canvas: HTMLCanvasElement = map.getCanvas();
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  const isVisible = (x: number, y: number) =>
    x >= -VIEWPORT_MARGIN &&
    x <= width + VIEWPORT_MARGIN &&
    y >= -VIEWPORT_MARGIN &&
    y <= height + VIEWPORT_MARGIN;

  const pts = markers.map((marker) => {
    const p = map.project([marker.longitude, marker.latitude]);
    return { marker, x: p.x as number, y: p.y as number };
  });

  /* زوم بالا: بدون کلاستر، فقط مارکرهای داخل دید */
  if (zoom >= MAX_CLUSTER_ZOOM) {
    const singles: ClusterItem[] = [];
    for (const p of pts) {
      if (!isVisible(p.x, p.y)) continue;
      singles.push({
        id: `marker-${p.marker.id}`,
        longitude: p.marker.longitude,
        latitude: p.marker.latitude,
        markers: [p.marker],
        isCluster: false,
      });
    }
    return singles;
  }

  /* ساخت گرید */
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
  const R2 = CLUSTER_RADIUS * CLUSTER_RADIUS;

  for (let i = 0; i < pts.length; i++) {
    if (used[i]) continue;
    used[i] = 1;

    const base = pts[i];
    const groupIdx: number[] = [i];
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
          if (ddx * ddx + ddy * ddy <= R2) {
            used[j] = 1;
            groupIdx.push(j);
          }
        }
      }
    }

    /* مرکز صفحه‌ای گروه (برای فیلتر دید) و مرکز جغرافیایی (برای رندر) */
    let sx = 0;
    let sy = 0;
    let sLon = 0;
    let sLat = 0;
    for (const idx of groupIdx) {
      sx += pts[idx].x;
      sy += pts[idx].y;
      sLon += pts[idx].marker.longitude;
      sLat += pts[idx].marker.latitude;
    }
    const n = groupIdx.length;

    if (!isVisible(sx / n, sy / n)) continue;

    if (n === 1) {
      result.push({
        id: `marker-${base.marker.id}`,
        longitude: base.marker.longitude,
        latitude: base.marker.latitude,
        markers: [base.marker],
        isCluster: false,
      });
    } else {
      result.push({
        id: `cluster-${base.marker.id}-${n}`,
        longitude: sLon / n,
        latitude: sLat / n,
        markers: groupIdx.map((idx) => pts[idx].marker),
        isCluster: true,
      });
    }
  }

  return result;
}

const clustersSignature = (clusters: ClusterItem[]) =>
  clusters
    .map((c) => `${c.id}@${c.longitude.toFixed(5)},${c.latitude.toFixed(5)}`)
    .join("|");

/* ------------------------------------------------------------------ */
/*                              ICON                                   */
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
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.3082 1.79121L17.8082 4.79119C18.0998 4.90786 18.3332 5.25785 18.3332 5.56618V8.33286C18.3332 8.79119 17.9582 9.16619 17.4998 9.16619H2.49984C2.0415 9.16619 1.6665 8.79119 1.6665 8.33286V5.56618C1.6665 5.25785 1.89984 4.90786 2.19151 4.79119L9.69151 1.79121C9.85817 1.72454 10.1415 1.72454 10.3082 1.79121Z" {...common} />
      <path d="M18.3332 18.3333H1.6665V15.8333C1.6665 15.375 2.0415 15 2.49984 15H17.4998C17.9582 15 18.3332 15.375 18.3332 15.8333V18.3333Z" {...common} />
      <path d="M3.3335 15.0003V9.16699" {...common} />
      <path d="M6.6665 15.0003V9.16699" {...common} />
      <path d="M10 15.0003V9.16699" {...common} />
      <path d="M13.3335 15.0003V9.16699" {...common} />
      <path d="M16.6665 15.0003V9.16699" {...common} />
      <path d="M0.833496 18.333H19.1668" {...common} />
      <path d="M10 7.08301C10.6904 7.08301 11.25 6.52336 11.25 5.83301C11.25 5.14265 10.6904 4.58301 10 4.58301C9.30964 4.58301 8.75 5.14265 8.75 5.83301C8.75 6.52336 9.30964 7.08301 10 7.08301Z" {...common} />
    </svg>
  );
});

/* ------------------------------------------------------------------ */
/*                  MEMOIZED MARKER VISUALS                            */
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
/*                         MAP COMPONENT                               */
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
  const [clusters, setClusters] = useState<ClusterItem[]>([]);

  const mapRef = useRef<any>(null);
  const signatureRef = useRef("");
  const rafRef = useRef<number | null>(null);
  const markersRef = useRef<MapMarkerItem[]>(markers);
  markersRef.current = markers;

  /* ----------------------------- THEME ----------------------------- */
  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.classList.contains("dark"));

    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  /* ------------------------- UPDATE CLUSTERS ------------------------ */
  const updateClusters = useCallback(() => {
    const map = getMapInstance(mapRef.current);
    const list = markersRef.current;

    if (!map || list.length === 0) {
      if (signatureRef.current !== "") {
        signatureRef.current = "";
        setClusters([]);
      }
      return;
    }

    const next = buildClusters(map, list);
    const sig = clustersSignature(next);

    // اگر خروجی تغییری نکرده، re-render نمی‌کنیم
    if (sig === signatureRef.current) return;

    signatureRef.current = sig;
    setClusters(next);
  }, []);

  /* حرکت/زوم پیوسته → حداکثر یک بار در هر فریم */
  const scheduleUpdate = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      updateClusters();
    });
  }, [updateClusters]);

  useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  useEffect(() => {
    signatureRef.current = "__force__";
    updateClusters();
  }, [markers, updateClusters]);

  /* --------------------------- FOCUS TARGET ------------------------- */
  const focusLon = focusTarget?.longitude;
  const focusLat = focusTarget?.latitude;
  const focusZoom = focusTarget?.zoom;

  useEffect(() => {
    const map = getMapInstance(mapRef.current);
    if (!map || focusLon == null || focusLat == null) return;

    map.flyTo({
      center: [focusLon, focusLat],
      zoom: focusZoom ?? 16,
      duration: 900,
    });
  }, [focusLon, focusLat, focusZoom]);

  /* ----------------------------- AUTO FIT --------------------------- */
  const hasFocus = focusLon != null && focusLat != null;

  useEffect(() => {
    if (hasFocus) return;

    const map = getMapInstance(mapRef.current);
    if (!map || markers.length === 0) return;

    if (markers.length === 1) {
      map.flyTo({
        center: [markers[0].longitude, markers[0].latitude],
        zoom: 14,
        duration: 800,
      });
      return;
    }

    let minLon = Infinity;
    let minLat = Infinity;
    let maxLon = -Infinity;
    let maxLat = -Infinity;
    for (const m of markers) {
      if (m.longitude < minLon) minLon = m.longitude;
      if (m.longitude > maxLon) maxLon = m.longitude;
      if (m.latitude < minLat) minLat = m.latitude;
      if (m.latitude > maxLat) maxLat = m.latitude;
    }

    map.fitBounds(
      [
        [minLon, minLat],
        [maxLon, maxLat],
      ],
      { padding: 60, duration: 800, maxZoom: 17 }
    );
  }, [markers, hasFocus]);

  /* --------------------------- CLUSTER CLICK ------------------------ */
  const handleClusterClick = useCallback(
    (cluster: ClusterItem) => {
      // حالت جدید: بدون زوم، فقط لیست مارکرها به پدر داده می‌شود
      if (onClusterClick) {
        onClusterClick(cluster.markers);
        return;
      }

      // رفتار قدیمی (فقط وقتی onClusterClick داده نشده)
      const map = getMapInstance(mapRef.current);
      if (!map) return;

      map.flyTo({
        center: [cluster.longitude, cluster.latitude],
        zoom: Math.min(map.getZoom() + 2, 17),
        duration: 500,
      });
    },
    [onClusterClick]
  );

  /* ------------------------------ RENDER ---------------------------- */
  return (
    <div style={{ width: "100%", height, position: "relative" }}>
      <MapGL
        ref={mapRef}
        initialViewState={{
          longitude: 54.2199,
          latitude: 25.229,
          zoom: 14,
          pitch: 40,
        }}
        mapStyle={isDark ? styleMapDark : styleMapLight}
        style={{ width: "100%", height: "100%", borderRadius: "0.75rem" }}
        onLoad={updateClusters}
        onMove={scheduleUpdate}
      >
        {clusters.map((cluster) => {
          if (cluster.isCluster) {
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
                <ClusterBubble count={cluster.markers.length} />
              </Marker>
            );
          }

          const marker = cluster.markers[0];

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
              <PinBubble
                id={marker.id}
                color={marker.color || "#9100D9"}
                highlighted={highlightedId != null && marker.id === highlightedId}
                clickable={!!onMarkerClick}
              />
            </Marker>
          );
        })}
      </MapGL>
    </div>
  );
}