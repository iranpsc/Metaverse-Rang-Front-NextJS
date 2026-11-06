"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState, type CSSProperties } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

const STATIC_ROUTE_NAMES = [
  { id: 1, route_name: "citizen-baguette" },
  { id: 2, route_name: "reporter-baguette" },
  { id: 3, route_name: "participation-baguette" },
  { id: 4, route_name: "developer-baguette" },
  { id: 5, route_name: "inspector-baguette" },
  { id: 6, route_name: "businessman-baguette" },
  { id: 7, route_name: "lawyer-baguette" },
  { id: 8, route_name: "city-council-baguette" },
  { id: 9, route_name: "the-mayor-baguette" },
  { id: 10, route_name: "governor-baguette" },
  { id: 11, route_name: "minister-baguette" },
  { id: 12, route_name: "judge-baguette" },
  { id: 13, route_name: "legislator-baguette" },
] as const;

const LEVEL_UNIQUE_IDS: Record<number, number> = {
  1: 382, 2: 383, 3: 589, 4: 68, 5: 69, 6: 590, 7: 71,
  8: 591, 9: 592, 10: 74, 11: 75, 12: 76, 13: 77,
};

const LEVEL_PRIMARY_COLORS = [
  "#b9af18", "#eea034", "#0d0d9e", "#9C9C9C", "#b63d8d",
  "#8233dd", "#a319ff", "#99A9DC", "#AD618E", "#008a50",
  "#2e7037", "#B10000", "#B0B0B0",
] as const;

const LEVEL_GLOW_COLORS = [
  "#F7FF92", "#FF9D2F", "#87CEEB", "#E7E7E7", "#FFB381",
  "#8e00df", "#9942c2", "#70dfff", "#f958ff", "#00ab04",
  "#155a17", "#ff0000", "#d9e8eb",
] as const;

function getLevelNumber(item: any): number | undefined {
  const id = Number(item?.id);
  if (Number.isInteger(id) && id >= 1 && id <= 13) return id;
  const slug = item?.slug || item?.route_name;
  return STATIC_ROUTE_NAMES.find((route) => route.route_name === slug)?.id;
}

export function getGemGlowColor(item: any): string | undefined {
  const level = getLevelNumber(item);
  return level ? LEVEL_GLOW_COLORS[level - 1] : undefined;
}

export function getGemPrimaryColor(item: any): string | undefined {
  const level = getLevelNumber(item);
  return level ? LEVEL_PRIMARY_COLORS[level - 1] : undefined;
}

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
  const activeTooltipId = tooltipId || ("gem-tooltip-" + generatedTooltipId);

  const levelNumber = getLevelNumber(item);
  const routeName = STATIC_ROUTE_NAMES.find(
    (route) => route.id === levelNumber
  )?.route_name;
  const uniqueId = levelNumber ? LEVEL_UNIQUE_IDS[levelNumber] : undefined;
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
                  ? "[filter:drop-shadow(0_0_3px_var(--gem-glow))_drop-shadow(0_0_6px(var(--gem-glow)))] "
                  : "") +
                (linkLoading
                  ? "animate-pulse cursor-wait [filter:drop-shadow(0_0_5px(var(--gem-glow)))]"
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
