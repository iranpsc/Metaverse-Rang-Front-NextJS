"use client";

import Image from "next/image";
import { useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const Sample3D = dynamic(() => import("./Sample3D"), { ssr: false });
const ErrorBoundary = dynamic(() => import("@/components/utils/ErrorBoundary"));

/**
 * تب‌هایی که GIF اون‌ها یکیه و از general_info گرفته می‌شه.
 * بقیه‌ی تب‌ها (gem, gift) فقط GIF خودشون رو نشون می‌دن.
 */
const SHARED_GIF_TABS = ["general-info", "licenses", "prize"];

type ModelSource = { gltf: string; bin?: string };
type FileSource = { type?: string; size?: string | number; url?: string };

type ImageBoxProps = {
  tabsData: Record<string, any>;
  generalInfo?: any;
  lang: string;
};

/** URL فایل: هم رشته‌ی ساده و هم { url } پشتیبانی می‌شه */
function getFileUrl(value: unknown): string {
  if (!value) return "";
  if (typeof value === "string") return value.trim();
  if (typeof value === "object" && value !== null) {
    const url = (value as FileSource).url;
    if (typeof url === "string") return url.trim();
  }
  return "";
}

/** پشتیبانی از object جدید API، فرمت ساده، حروف بزرگ، JSON string و URL مستقیم */
function parse3DSource(value: unknown): ModelSource | null {
  if (!value) return null;

  if (typeof value === "object" && value !== null) {
    const obj = value as Record<string, unknown>;
    const binUrl = getFileUrl(obj.bin) || undefined;

    const gltfUrl = getFileUrl(obj.gltf) || getFileUrl(obj.GLTF);
    if (gltfUrl) return { gltf: gltfUrl, bin: binUrl };

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

export default function ImageBox({ tabsData, generalInfo, lang }: ImageBoxProps) {
  const [mode, setMode] = useState<"png" | "fbx" | "gif">("png");

  const { tabs } = useParams<{ tabs: string }>();
  const item = tabsData?.[tabs];
  const general = generalInfo || {};

  // PNG: اول تب فعلی، بعد general_info
  const srcPng = getFileUrl(item?.png_file) || getFileUrl(general.png_file);

  // 3D: اول تب فعلی، بعد general_info
  const modelSource = parse3DSource(
    item?.fbx_file ||
    item?.gltf_file ||
    general.fbx_file ||
    general.gltf_file ||
    null
  );

  // GIF:
  // - تب‌های مشترک: GIF یکسانِ general_info (همون URL = بدون پرش هنگام عوض شدن تب)
  // - بقیه‌ی تب‌ها: فقط GIF خودشون، بدون fallback
  const srcGif = SHARED_GIF_TABS.includes(tabs)
    ? getFileUrl(general.gif_file) || getFileUrl(item?.gif_file)
    : getFileUrl(item?.gif_file);

  // اگه تب جدید از حالت انتخاب‌شده پشتیبانی نمی‌کنه، موقتاً PNG نشون بده.
  // (state تغییر نمی‌کنه، پس برگشت به تب دارای GIF دوباره روی GIF می‌مونه)
  const activeMode =
    (mode === "gif" && !srcGif) || (mode === "fbx" && !modelSource)
      ? "png"
      : mode;

const buttonClass = (active: boolean, disabled = false) =>
  `px-4 py-2 md:px-3 lg:px-4 rounded-lg font-bold transition ${
    disabled
      ? "opacity-40 cursor-not-allowed bg-neutral-200 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-500"
      : active
        ? "bg-primary text-white dark:text-black"
        : "dark:bg-neutral-700 dark:text-neutral-200"
  }`;

  return (
    <div className="w-full flex flex-col items-center sticky top-0">
      {activeMode === "png" && srcPng && (
        <div className="relative w-[90%] md:w-full aspect-[5/7] rounded-xl">
          <div className="absolute inset-0 rounded-xl" />
          <Image
            src={srcPng}
            alt="png"
            fill
            priority
            className="object-cover rounded-xl"
            onError={() => console.error("ImageBox: failed to load PNG:", srcPng)}
          />
        </div>
      )}

      {/* بدون key؛ تا src عوض نشه GIF دوباره شروع نمی‌شه */}
      {activeMode === "gif" && srcGif && (
        <div className="relative w-full aspect-[5/7] rounded-xl">
          <div className="absolute inset-0 rounded-xl" />
          <Image
            src={srcGif}
            alt="gif"
            fill
            unoptimized
            className="object-cover rounded-xl"
            onError={() => console.error("ImageBox: failed to load GIF:", srcGif)}
          />
        </div>
      )}

      {activeMode === "fbx" && modelSource && (
        <div className="relative w-full aspect-[5/7]">
          <ErrorBoundary>
            <Sample3D src={modelSource} lang={lang} />
          </ErrorBoundary>
        </div>
      )}

      <div className="flex gap-4 md:gap-2 xl:gap-4 mt-4">
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
          className={buttonClass(activeMode === "fbx", !modelSource )}
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