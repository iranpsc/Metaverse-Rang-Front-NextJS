"use client";

import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";

const Sample3D = dynamic(() => import("./Sample3D"), {
  ssr: false,
});

const ErrorBoundary = dynamic(
  () => import("@/components/utils/ErrorBoundary"),
);

/**
 * ==========================================
 * TYPES
 * ==========================================
 */

type ModelSource = {
  gltf: string;
  bin?: string;
};

/**
 * ==========================================
 * PARSE 3D FILE
 * ==========================================
 */

function parse3DSource(value: unknown): ModelSource | null {
  if (!value) {
    return null;
  }

  /**
   * ==========================================
   * OBJECT
   * ==========================================
   *
   * API فعلی:
   *
   * {
   *   fbx: {
   *     type: "fbx",
   *     size: "0",
   *     url: "..."
   *   },
   *   bin: {
   *     type: "bin",
   *     size: "3640",
   *     url: "..."
   *   },
   *   gltf: {
   *     type: "gltf",
   *     size: "3872",
   *     url: "..."
   *   }
   * }
   */

  if (typeof value === "object" && value !== null) {
    const objectValue = value as Record<string, unknown>;

    const gltfValue = objectValue.gltf;
    const binValue = objectValue.bin;

    /**
     * ----------------------------------------
     * API format جدید
     * ----------------------------------------
     */

    if (
      typeof gltfValue === "object" &&
      gltfValue !== null
    ) {
      const gltfObject = gltfValue as Record<string, unknown>;

      const gltfUrl = gltfObject.url;

      let binUrl: string | undefined;

      if (
        typeof binValue === "object" &&
        binValue !== null
      ) {
        const binObject = binValue as Record<string, unknown>;

        if (typeof binObject.url === "string") {
          binUrl = binObject.url;
        }
      }

      if (typeof gltfUrl === "string") {
        return {
          gltf: gltfUrl,
          bin: binUrl,
        };
      }
    }

    /**
     * ----------------------------------------
     * API format قدیمی
     * ----------------------------------------
     *
     * {
     *   gltf: "...",
     *   bin: "..."
     * }
     */

    if (typeof gltfValue === "string") {
      return {
        gltf: gltfValue,
        bin:
          typeof binValue === "string"
            ? binValue
            : undefined,
      };
    }
  }

  /**
   * ==========================================
   * STRING
   * ==========================================
   */

  if (typeof value !== "string") {
    console.error(
      "ImageBox: unsupported 3D source type:",
      typeof value,
    );

    return null;
  }

  const raw = value.trim();

  if (!raw) {
    return null;
  }

  /**
   * ==========================================
   * STRING JSON
   * ==========================================
   */

  const jsonStart = raw.indexOf("{");

  if (jsonStart !== -1) {
    const possibleJson = raw.substring(jsonStart);

    try {
      const parsed = JSON.parse(possibleJson);

      const result = parse3DSource(parsed);

      if (result) {
        return result;
      }
    } catch (error) {
      console.error(
        "ImageBox: failed to parse 3D source JSON:",
        error,
      );
    }
  }

  /**
   * ==========================================
   * DIRECT GLTF URL
   * ==========================================
   */

  if (raw.toLowerCase().split("?")[0].endsWith(".gltf")) {
    return {
      gltf: raw,
    };
  }

  /**
   * ==========================================
   * DIRECT GLB URL
   * ==========================================
   */

  if (raw.toLowerCase().split("?")[0].endsWith(".glb")) {
    return {
      gltf: raw,
    };
  }

  console.error(
    "ImageBox: could not parse 3D source:",
    value,
  );

  return null;
}

/**
 * ==========================================
 * COMPONENT
 * ==========================================
 */

export default function ImageBox({
  item,
  singleLevel,
  lang,
}: any) {
  const [mode, setMode] = useState<"png" | "fbx" | "gif">(
    "png",
  );

  /**
   * ==========================================
   * PNG
   * ==========================================
   */

  const srcPng =
    item?.png_file ||
    singleLevel?.data?.general_info?.png_file ||
    "";

  /**
   * ==========================================
   * 3D
   * ==========================================
   */

  const raw3D = item?.fbx_file || "";

  /**
   * ==========================================
   * GIF
   * ==========================================
   */

  const srcGif = item?.gif_file || "";

  /**
   * ==========================================
   * PARSE 3D
   * ==========================================
   */

  const modelSource = parse3DSource(raw3D);

  /**
   * ==========================================
   * VIEW
   * ==========================================
   */

  return (
    <div className="w-full flex flex-col items-center sticky top-0">
      {/* ======================================
          PNG
      ====================================== */}

      {mode === "png" && srcPng && (
        <div className="relative w-[90%] md:w-full aspect-[5/7] rounded-xl">
          <div className="absolute inset-0 rounded-xl" />

          <Image
            src={srcPng}
            alt="png"
            fill
            priority
            className="object-cover rounded-xl"
            onError={() => {
              console.error(
                "ImageBox: failed to load PNG:",
                srcPng,
              );
            }}
          />
        </div>
      )}

      {/* ======================================
          GIF
      ====================================== */}

      {mode === "gif" && srcGif && (
        <div className="relative w-full aspect-[5/7] rounded-xl">
          <div className="absolute inset-0 rounded-xl" />

          <Image
            src={srcGif}
            alt="gif"
            fill
            unoptimized
            className="object-cover rounded-xl"
            onError={() => {
              console.error(
                "ImageBox: failed to load GIF:",
                srcGif,
              );
            }}
          />
        </div>
      )}

      {/* ======================================
          3D
      ====================================== */}

      {mode === "fbx" && modelSource && (
        <div className="relative w-full aspect-[5/7]">
          <ErrorBoundary>
            <Sample3D
              src={modelSource}
              lang={lang}
            />
          </ErrorBoundary>
        </div>
      )}

      {/* ======================================
          BUTTONS
      ====================================== */}

      <div className="flex gap-4 mt-4">
        {srcPng && (
          <button
            type="button"
            onClick={() => setMode("png")}
            className={`px-4 py-2 rounded-lg font-bold ${
              mode === "png"
                ? "bg-primary text-white dark:text-black"
                : "dark:bg-neutral-700 dark:text-neutral-200"
            }`}
          >
            PNG
          </button>
        )}

        {modelSource && (
          <button
            type="button"
            onClick={() => setMode("fbx")}
            className={`px-4 py-2 rounded-lg font-bold ${
              mode === "fbx"
                ? "bg-primary text-white dark:text-black"
                : "dark:bg-neutral-700 dark:text-neutral-200"
            }`}
          >
            GLTF
          </button>
        )}

        {srcGif && (
          <button
            type="button"
            onClick={() => setMode("gif")}
            className={`px-4 py-2 rounded-lg font-bold ${
              mode === "gif"
                ? "bg-primary text-white dark:text-black"
                : "dark:bg-neutral-700 dark:text-neutral-200"
            }`}
          >
            GIF
          </button>
        )}
      </div>
    </div>
  );
}