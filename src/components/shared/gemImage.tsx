"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState, type CSSProperties } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

import {
  getGemGlowColor,
  getGemRouteName,
  getGemUniqueId,
  getLevelNumber,
} from "@/components/shared/gemColors";

export { getGemGlowColor, getGemPrimaryColor } from "@/components/shared/gemColors";

type GemImageProps = {
  item: any;
  params: any;
  picSize: number;
  disableHoverScale?: boolean;
  href?: string;
  showGlow?: boolean;
  isActive?: boolean;
  preventNavigation?: boolean;
  unoptimized?: boolean;
  eager?: boolean;
  mainData?: object;
  tooltipId?: string;
};

export default function GemImage({
  item,
  params,
  picSize,
  disableHoverScale = false,
  href,
  showGlow = false,
  isActive = false,
  preventNavigation = false,
  unoptimized = false,
  eager = false,
  mainData,
  tooltipId,
}: GemImageProps) {
  const [linkLoading, setLinkLoading] = useState(false);
  const generatedTooltipId = useId();
  const activeTooltipId = tooltipId || ("gem-tooltip-" + generatedTooltipId.replace(/:/g, ""));

  const levelNumber = getLevelNumber(item);
  const routeName = getGemRouteName(levelNumber);
  const uniqueId = getGemUniqueId(levelNumber);
  const translatedLabel = uniqueId ? findByUniqueId(mainData, uniqueId) : "";
  const tooltipContent =
    translatedLabel && translatedLabel !== String(uniqueId)
      ? translatedLabel
      : item?.name || (params.lang === "fa" ? "تازه وارد" : "Newcomer");

  const glowColor = showGlow ? getGemGlowColor(item) : undefined;
  const targetHref =
    href || "/" + params.lang + "/levels/citizen/" + (routeName || "") + "/gem";
  const hoverClasses = disableHoverScale
    ? ""
    : "hover:scale-150 hover:drop-shadow-[0_0px_8px_rgba(255,199,0,0.6)]";

  return (
    <>
      <Link
        onClickCapture={
          preventNavigation
            ? (event) => event.preventDefault()
            : () => setLinkLoading(true)
        }
        href={targetHref}
        className={
          showGlow
            ? "group/gem inline-flex shrink-0 items-center justify-center"
            : "inline-flex"
        }
      >
        <Image
          data-tooltip-id={activeTooltipId}
          data-tooltip-content={tooltipContent}
          src={item.image || item.photo}
          width={picSize}
          height={picSize}
          sizes={picSize + "px"}
          unoptimized={unoptimized}
          loading={eager ? "eager" : "lazy"}
          alt={item.name || tooltipContent || "Level gem"}
          className={
            "inline object-contain transition-[filter,transform] duration-300 " +
            (showGlow
              ? "group-hover/gem:[filter:drop-shadow(0_0_5px_var(--gem-glow))_drop-shadow(0_0_9px_var(--gem-glow))] " +
                (isActive
                  ? "[filter:drop-shadow(0_0_3px_var(--gem-glow))_drop-shadow(0_0_6px_var(--gem-glow))] "
                  : "") +
                (linkLoading
                  ? "animate-pulse cursor-wait [filter:drop-shadow(0_0_5px(var(--gem-glow))_drop-shadow(0_0_9px(var(--gem-glow)))]"
                  : "")
              : (linkLoading
                  ? "cursor-wait drop-shadow-[0_0px_8px_rgba(255,199,0,0.6)] "
                  : "") + hoverClasses)
          }
          style={
            showGlow
              ? ({ "--gem-glow": glowColor || "transparent" } as CSSProperties)
              : undefined
          }
        />
      </Link>
      {!tooltipId && (
        <ReactTooltip
          id={activeTooltipId}
          place="top"
          className="bg-[#E9E9E9]! text-[#908F95]! dark:bg-[#434343]! dark:text-white! !font-azarMehr font-medium! text-[14px]!"
        />
      )}
    </>
  );
}
