"use client";

import { useEffect, useRef, useState } from "react";

export default function ModelViewer({
  src,
}: {
  src: string;
}) {
  const viewerRef = useRef<any>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  useEffect(() => {
    import("@google/model-viewer");

    const viewer = viewerRef.current;

    if (!viewer) return;

    const onLoad = () => {
      setLoading(false);
    };

    const onError = () => {
      setLoading(false);
      setError(true);
    };

    viewer.addEventListener("load", onLoad);

    viewer.addEventListener("error", onError);

    return () => {
      viewer.removeEventListener("load", onLoad);

      viewer.removeEventListener("error", onError);
    };
  }, []);
  console.log("GLB URL:", src);

  if (error) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-xl border">
        <div className="text-center">
          <p className="text-red-500 font-bold">
            خطا در بارگذاری مدل سه‌بعدی
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            تلاش دوباره
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[5/7] overflow-hidden rounded-xl">

      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">

          <div className="h-10 w-10 animate-spin rounded-full border-4 border-neutral-300 border-t-blue-600" />

        </div>
      )}

      <model-viewer
        ref={viewerRef}
        src={src}
        alt="3D Model"
        loading="eager"
        reveal="auto"
        camera-controls
        auto-rotate
        auto-rotate-delay="0"
        rotation-per-second="20deg"
        shadow-intensity="1"
        exposure="1"
        environment-image="neutral"
        interaction-prompt="none"
        touch-action="pan-y"
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
        }}
      />

    </div>
  );
}