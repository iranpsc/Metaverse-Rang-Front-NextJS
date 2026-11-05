"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

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

const LEVEL_GLOW_COLORS = [
  "#F7FF92", "#FF9D2F", "#87CEEB", "#E7E7E7", "#FFB381",
  "#8e00df", "#bbaae1", "#70dfff", "#f958ff", "#00ab04",
  "#155a17", "#ff0000", "#d9e8eb",
] as const;

type GemImageProps = {
  item: any;
  params: any;
  picSize: number;
  disableHoverScale?: boolean;
  href?: string;
  showGlow?: boolean;
  isActive?: boolean;
  preventNavigation?: boolean;
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
}: GemImageProps) {
  const [linkLoading, setLinkLoading] = useState(false);

  const routeName =
    STATIC_ROUTE_NAMES.find(
      (route) => route.route_name === (item?.slug || item?.route_name)
    )?.route_name ||
    STATIC_ROUTE_NAMES.find((route) => route.id === Number(item?.id))
      ?.route_name;

  const levelId =
    Number(item?.id) ||
    STATIC_ROUTE_NAMES.find((route) => route.route_name === routeName)?.id ||
    0;
  const glowColor = showGlow ? LEVEL_GLOW_COLORS[levelId - 1] : undefined;
  const targetHref = href || `/${params.lang}/levels/citizen/${routeName}/gem`;

  const hoverClasses = disableHoverScale
    ? ""
    : "hover:scale-150 hover:drop-shadow-[0_0px_8px_rgba(255,199,0,0.6)]";

  return (
    <Link
      onClickCapture={
        preventNavigation
          ? (event) => event.preventDefault()
          : () => setLinkLoading(true)
      }
      href={targetHref}
      className={showGlow ? "group/gem inline-flex shrink-0 items-center justify-center" : "inline-flex"}
    >
      <Image
        data-tooltip-id={showGlow ? undefined : item.name}
        src={item.image || item.photo}
        width={picSize}
        height={picSize}
        alt={item.name || item.translation || "Level gem"}
        className={`inline object-contain transition-[filter,transform] duration-300 ${showGlow
          ? "group-hover/gem:[filter:drop-shadow(0_0_5px_var(--gem-glow))_drop-shadow(0_0_9px_var(--gem-glow))]"
          : `${linkLoading ? "cursor-wait drop-shadow-[0_0px_8px_rgba(255,199,0,0.6)]" : ""} ${hoverClasses}`}`}
        style={
          showGlow
            ? ({
                "--gem-glow": glowColor || "transparent",
                filter:
                  isActive && glowColor
                    ? `drop-shadow(0 0 5px ${glowColor}) drop-shadow(0 0 9px ${glowColor})`
                    : undefined,
              } as CSSProperties)
            : undefined
        }
      />
      {!showGlow && item.name && (
        <ReactTooltip
          id={item.name}
          place="top"
          className="bg-[#E9E9E9]! text-[#908F95]! dark:bg-[#434343]! dark:text-white! !font-azarMehr font-medium! text-[14px]!"
          content={
            params.lang === "fa"
              ? item.name
              : routeName
                ? routeName.split("-baguette")[0].charAt(0).toUpperCase() +
                  routeName.split("-baguette")[0].slice(1)
                : "Newcomer"
          }
        />
      )}
    </Link>
  );
}
