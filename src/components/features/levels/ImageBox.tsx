"use client";

import Image from "next/image";
import { useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import ErrorBoundary from "@/components/utils/ErrorBoundary";

/**
 * تغییر ۱:
 * Sample3D حالا loading اختصاصی دارد که فقط به اندازه‌ی همین باکس است.
 * بدون loading، هنگام دانلود chunk مربوط به three.js ممکن است
 * Suspense بالاتر (loading.tsx والد) فعال شود.
 */
const Sample3D = dynamic(() => import("./Sample3D"), {
  ssr: false,
  loading: () => (
    <div className="flex aspect-5/7 w-full items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-900">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-primary" />
    </div>
  ),
});

/**
 * تغییر ۲:
 * ErrorBoundary دیگر با dynamic لود نمی‌شود.
 * یک Error Boundary باید همیشه آماده باشد؛ lazy بودنش باعث suspend شدن می‌شود.
 */

/**
 * تب‌هایی که GIF آن‌ها از general_info گرفته می‌شود.
 * بقیه تب‌ها فقط GIF اختصاصی خودشان را نمایش می‌دهند.
 */
const SHARED_GIF_TABS = ["general-info", "licenses", "prize"];

type ModelSource = { gltf: string; bin?: string };
type FileSource = { type?: string; size?: string | number; url?: string };

type ImageBoxProps = {
  tabsData: Record<string, any>;
  generalInfo?: any;
  lang: string;
};

/** URL فایل: پشتیبانی از رشته و آبجکت دارای url */
function getFileUrl(value: unknown): string {
  if (!value) return "";

  if (typeof value === "string") {
    return value.trim();
  }

  if (typeof value === "object") {
    const url = (value as FileSource).url;

    if (typeof url === "string") {
      return url.trim();
    }
  }

  return "";
}

/**
 * پشتیبانی از ساختارهای مختلف API:
 * آبجکت، JSON string، حروف بزرگ و URL مستقیم.
 */
function parse3DSource(value: unknown): ModelSource | null {
  if (!value) return null;

  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const binUrl = getFileUrl(obj.bin) || undefined;

    const gltfUrl = getFileUrl(obj.gltf) || getFileUrl(obj.GLTF);

    if (gltfUrl) {
      return { gltf: gltfUrl, bin: binUrl };
    }

    const directUrl = getFileUrl(obj);

    if (directUrl && directUrl.toLowerCase().includes(".gltf")) {
      return { gltf: directUrl };
    }
  }

  if (typeof value !== "string") {
    console.error("ImageBox: unsupported 3D source:", value);
    return null;
  }

  const raw = value.trim();

  if (!raw) return null;

  const jsonStart = raw.indexOf("{");

  if (jsonStart !== -1) {
    try {
      const result = parse3DSource(JSON.parse(raw.substring(jsonStart)));

      if (result) return result;
    } catch (error) {
      console.error("ImageBox: failed to parse 3D source JSON:", error);
    }
  }

  const cleanUrl = raw.split("?")[0].toLowerCase();

  if (cleanUrl.endsWith(".gltf") || cleanUrl.endsWith(".glb")) {
    return { gltf: raw };
  }

  console.error("ImageBox: could not parse 3D source:", value);
  return null;
}

export default function ImageBox({
  tabsData,
  generalInfo,
  lang,
}: ImageBoxProps) {
  const [mode, setMode] = useState<"png" | "fbx" | "gif">("png");

  const { tabs } = useParams<{ tabs: string }>();
  const item = tabsData?.[tabs];
  const general = generalInfo || {};

  // PNG: ابتدا تب فعلی، سپس general_info
  const srcPng = getFileUrl(item?.png_file) || getFileUrl(general.png_file);

  // مدل سه‌بعدی: ابتدا تب فعلی، سپس general_info
  const modelSource = parse3DSource(
    item?.fbx_file ||
      item?.gltf_file ||
      general.fbx_file ||
      general.gltf_file ||
      null,
  );

  // GIF مشترک یا اختصاصی هر تب
  const srcGif = SHARED_GIF_TABS.includes(tabs)
    ? getFileUrl(general.gif_file) || getFileUrl(item?.gif_file)
    : getFileUrl(item?.gif_file);

  // در صورت نبود منبع، نمایش موقت PNG
  const activeMode =
    (mode === "gif" && !srcGif) || (mode === "fbx" && !modelSource)
      ? "png"
      : mode;

  /**
   * تغییر ۳:
   * با hover/focus/touch روی دکمه‌ی GLTF، chunk مربوط به three.js
   * از قبل دانلود می‌شود تا کلیک سریع‌تر باشد.
   */
  const preload3D = () => {
    void import("./Sample3D");
  };

  const buttonClass = (active: boolean, disabled = false) =>
    `px-4 py-2 md:px-3 lg:px-4 rounded-lg font-bold transition cursor-pointer ${
      disabled
        ? "opacity-40 cursor-not-allowed bg-neutral-200 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-500"
        : active
          ? "bg-primary text-white dark:text-black"
          : "dark:bg-neutral-700 dark:text-neutral-200"
    }`;

  return (
    <div className="sticky top-0 flex w-full flex-col items-center ">
      {activeMode === "png" && srcPng && (
        <div className="relative aspect-5/7 w-[90%] rounded-xl md:w-full">
          <div className="absolute inset-0 rounded-xl" />
          <Image
            src={srcPng}
            alt="png"
            fill
            priority
            className="rounded-xl object-cover"
            onError={() =>
              console.error("ImageBox: failed to load PNG:", srcPng)
            }
          />
        </div>
      )}

      {/* بدون key تا با تغییر تب، GIF مشترک دوباره شروع نشود */}
      {activeMode === "gif" && srcGif && (
        <div className="relative aspect-5/7 w-[90%] rounded-xl">
          <div className="absolute inset-0 rounded-xl" />
          <Image
            src={srcGif}
            alt="gif"
            fill
            unoptimized
            className="rounded-xl object-cover"
            onError={() =>
              console.error("ImageBox: failed to load GIF:", srcGif)
            }
          />
        </div>
      )}

      {activeMode === "fbx" && modelSource && (
        <div className="relative aspect-5/7 w-full">
          <ErrorBoundary>
            <Sample3D src={modelSource} lang={lang} />
          </ErrorBoundary>
        </div>
      )}

      <div className="mt-4 flex gap-4 md:gap-2 xl:gap-4">
        <button
          type="button"
          disabled={!srcPng}
          onClick={() => setMode("png")}
          className={buttonClass(activeMode === "png", !srcPng)}
        >
          PNG
        </button>

        <button
          type="button"
          disabled={!modelSource}
          onClick={() => setMode("fbx")}
          onMouseEnter={preload3D}
          onFocus={preload3D}
          onTouchStart={preload3D}
          className={buttonClass(activeMode === "fbx", !modelSource)}
        >
          GLTF
        </button>

        <button
          type="button"
          disabled={!srcGif}
          onClick={() => setMode("gif")}
          className={buttonClass(activeMode === "gif", !srcGif)}
        >
          GIF
        </button>
      </div>
    </div>
  );
}