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
 * PARSE 3D FILE
 * ==========================================
 */

function parse3DSource(value: unknown) {
  if (!value) {
    return null;
  }

  /**
   * اگر آبجکت باشد
   */

  if (typeof value === "object" && value !== null) {
    const objectValue = value as Record<string, unknown>;

    const gltf = objectValue.gltf;
    const bin = objectValue.bin;

    if (typeof gltf === "string") {
      return {
        gltf,
        bin: typeof bin === "string" ? bin : undefined,
      };
    }
  }

  /**
   * =====================================
   * STRING
   * =====================================
   */

  if (typeof value !== "string") {
    return null;
  }

  const raw = value.trim();

  /**
   * URL مثل:
   *
   * https://api.metarang.com/uploads/{"bin":"...","gltf":"..."}
   *
   * =====================================
   */

  const jsonStart = raw.indexOf("{");

  if (jsonStart !== -1) {
    const possibleJson = raw.substring(jsonStart);

    try {
      const parsed = JSON.parse(possibleJson);

      if (parsed && typeof parsed.gltf === "string") {
        return {
          gltf: parsed.gltf,
          bin: typeof parsed.bin === "string" ? parsed.bin : undefined,
        };
      }

      /**
       * بعضی APIها ممکن است
       * glTF را با کلید GLTF بدهند
       */

      if (parsed && typeof parsed.GLTF === "string") {
        return {
          gltf: parsed.GLTF,
          bin: typeof parsed.bin === "string" ? parsed.bin : undefined,
        };
      }
    } catch (error) {
      console.error("ImageBox: failed to parse 3D source JSON:", error);
    }
  }

  /**
   * =====================================
   * DIRECT GLTF URL
   * =====================================
   */

  if (raw.toLowerCase().endsWith(".gltf")) {
    return {
      gltf: raw,
      bin: undefined,
    };
  }

  console.error("ImageBox: could not parse 3D source:", raw);

  return null;
}

/**
 * ==========================================
 * COMPONENT
 * ==========================================
 */

export default function ImageBox({ item, singleLevel, lang }: any) {
  const [mode, setMode] = useState<"png" | "fbx" | "gif">("png");

  /**
   * =====================================
   * PNG
   * =====================================
   */

  const srcPng =
    item?.png_file || singleLevel?.data?.general_info?.png_file || "";

  /**
   * =====================================
   * 3D
   * =====================================
   */

  const raw3D = item?.fbx_file || "";

  /**
   * =====================================
   * GIF
   * =====================================
   */

  const srcGif = item?.gif_file || "";

  /**
   * =====================================
   * PARSE 3D
   * =====================================
   */

  const modelSource = parse3DSource(raw3D);

  /**
   * =====================================
   * VIEW
   * =====================================
   */

  return (
    <div className="w-full flex flex-col items-center sticky top-0">
      {mode === "png" && srcPng && (
        <div className="relative w-[90%] md:w-full aspect-[5/7] rounded-xl">
          {/* اسکلت پشت تصویر؛ وقتی تصویر پینت شد روی آن را می‌پوشاند */}
          <div className="absolute inset-0 rounded-xl " />
          <Image
            src={srcPng}
            alt="png"
            fill
            priority
            className="object-cover rounded-xl"
            onError={() => {
              console.error("ImageBox: failed to load PNG:", srcPng);
            }}
          />
        </div>
      )}

      {mode === "gif" && srcGif && (
        <div className="relative w-full aspect-[5/7] rounded-xl">
          {/* اسکلت پشت تصویر؛ وقتی تصویر پینت شد روی آن را می‌پوشاند */}
          <div className="absolute inset-0 rounded-xl " />
          <Image
            src={srcGif}
            alt="gif"
            fill
            unoptimized
            className="object-cover rounded-xl"
            onError={() => {
              console.error("ImageBox: failed to load GIF:", srcGif);
            }}
          />
        </div>
      )}

      {mode === "fbx" && modelSource && (
        <div className="relative w-full aspect-[5/7]">
          <ErrorBoundary>
            <Sample3D src={modelSource} lang={lang} />
          </ErrorBoundary>
        </div>
      )}

      <div className="flex gap-4 mt-4">
        {srcPng && (
          <button
            type="button"
            onClick={() => setMode("png")}
            className={`px-4 py-2 rounded-lg font-bold ${
              mode === "png"
                ? "bg-primary text-white  dark:text-black"
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
                ? "bg-primary text-white  dark:text-black"
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
                ? "bg-primary text-white  dark:text-black"
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