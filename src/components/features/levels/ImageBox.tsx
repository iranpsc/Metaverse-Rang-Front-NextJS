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

type FileSource = {
  type?: string;
  size?: string | number;
  url?: string;
};

type ImageBoxProps = {
  item?: any;
  singleLevel?: any;
  lang: string;
};

/**
 * ==========================================
 * GET FILE URL
 * ==========================================
 *
 * API ممکن است فایل را به یکی از این شکل‌ها بدهد:
 *
 * 1)
 * "https://....gif"
 *
 * 2)
 * {
 *   type: "gif",
 *   size: "...",
 *   url: "https://....gif"
 * }
 *
 * این تابع هر دو حالت را پشتیبانی می‌کند.
 */

function getFileUrl(value: unknown): string {
  if (!value) {
    return "";
  }

  /**
   * مستقیم URL
   */

  if (typeof value === "string") {
    return value.trim();
  }

  /**
   * Object:
   *
   * {
   *   url: "..."
   * }
   */

  if (typeof value === "object" && value !== null) {
    const objectValue = value as FileSource;

    if (typeof objectValue.url === "string") {
      return objectValue.url.trim();
    }
  }

  return "";
}

/**
 * ==========================================
 * PARSE 3D SOURCE
 * ==========================================
 *
 * پشتیبانی از:
 *
 * {
 *   gltf: {
 *     type: "gltf",
 *     size: "3872",
 *     url: "https://...gltf"
 *   },
 *   bin: {
 *     type: "bin",
 *     size: "3640",
 *     url: "https://...bin"
 *   }
 * }
 *
 * و:
 *
 * {
 *   gltf: "https://...gltf",
 *   bin: "https://...bin"
 * }
 *
 * و String JSON
 */

function parse3DSource(value: unknown): ModelSource | null {
  if (!value) {
    return null;
  }

  /**
   * ==========================================
   * OBJECT
   * ==========================================
   */

  if (typeof value === "object" && value !== null) {
    const objectValue = value as Record<string, unknown>;

    const gltfValue = objectValue.gltf;
    const binValue = objectValue.bin;

    /**
     * ----------------------------------------
     * فرمت جدید API
     * ----------------------------------------
     */

    if (
      typeof gltfValue === "object" &&
      gltfValue !== null
    ) {
      const gltfObject =
        gltfValue as Record<string, unknown>;

      const gltfUrl = getFileUrl(gltfObject);

      const binUrl = getFileUrl(binValue);

      if (gltfUrl) {
        return {
          gltf: gltfUrl,
          bin: binUrl || undefined,
        };
      }
    }

    /**
     * ----------------------------------------
     * فرمت ساده
     * ----------------------------------------
     */

    if (typeof gltfValue === "string") {
      return {
        gltf: gltfValue,
        bin:
          typeof binValue === "string"
            ? binValue
            : getFileUrl(binValue) || undefined,
      };
    }

    /**
     * ----------------------------------------
     * GLTF با حروف بزرگ
     * ----------------------------------------
     */

    const upperGltf = objectValue.GLTF;

    if (upperGltf) {
      const gltfUrl = getFileUrl(upperGltf);
      const binUrl = getFileUrl(binValue);

      if (gltfUrl) {
        return {
          gltf: gltfUrl,
          bin: binUrl || undefined,
        };
      }
    }

    /**
     * ----------------------------------------
     * ممکن است خود object فایل GLTF باشد
     * ----------------------------------------
     */

    const directUrl = getFileUrl(objectValue);

    if (
      directUrl &&
      directUrl.toLowerCase().includes(".gltf")
    ) {
      return {
        gltf: directUrl,
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
      "ImageBox: unsupported 3D source:",
      value,
    );

    return null;
  }

  const raw = value.trim();

  if (!raw) {
    return null;
  }

  /**
   * ==========================================
   * JSON STRING
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

  const cleanUrl = raw.split("?")[0].toLowerCase();

  if (cleanUrl.endsWith(".gltf")) {
    return {
      gltf: raw,
    };
  }

  /**
   * ==========================================
   * DIRECT GLB URL
   * ==========================================
   */

  if (cleanUrl.endsWith(".glb")) {
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
}: ImageBoxProps) {
  const [mode, setMode] = useState<
    "png" | "fbx" | "gif"
  >("png");

  /**
   * ==========================================
   * GENERAL INFO
   * ==========================================
   *
   * اطلاعات اصلی Level
   *
   * این قسمت fallback مشترک تمام تب‌هاست.
   */

  const generalInfo =
    singleLevel?.data?.general_info || {};

  /**
   * ==========================================
   * PNG
   * ==========================================
   *
   * اول از تب فعلی
   * اگر نبود از general_info
   */

  const srcPng =
    getFileUrl(item?.png_file) ||
    getFileUrl(generalInfo?.png_file);

  /**
   * ==========================================
   * 3D
   * ==========================================
   *
   * اول از تب فعلی
   * سپس از general_info
   */

  const raw3D =
    item?.fbx_file ||
    item?.gltf_file ||
    generalInfo?.fbx_file ||
    generalInfo?.gltf_file ||
    null;

  /**
   * ==========================================
   * PARSE 3D
   * ==========================================
   */

  const modelSource = parse3DSource(raw3D);

  /**
   * ==========================================
   * GIF
   * ==========================================
   *
   * اول از تب فعلی
   * اگر نبود از general_info
   */

  const srcGif =
    getFileUrl(item?.gif_file) ||
    getFileUrl(generalInfo?.gif_file);

  /**
   * ==========================================
   * DEBUG
   * ==========================================
   *
   * برای اینکه ببینیم هر تب دقیقاً چه چیزی
   * در اختیار ImageBox قرار داده است.
   */

  // console.log("ImageBox sources:", {
  //   item,
  //   generalInfo,
  //   srcPng,
  //   raw3D,
  //   modelSource,
  //   srcGif,
  // });

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
          GLTF
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
        {/* PNG */}

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

        {/* GLTF */}

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

        {/* GIF */}

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