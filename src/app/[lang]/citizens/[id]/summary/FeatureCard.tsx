"use client";

import { memo } from "react";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import FeatureIcon from "./FeatureIcon";
import { ICON_COLORS, getKarbariDescription, getKarbariLabel, resolveIconKey } from "./featuresShared";

const CARD_HEIGHT = "h-[200px]";

export interface FeatureSummaryItem {
  karbari: string;
  label: string;
  current_count: number;
  bought_count: number;
  sold_count: number;
}

interface FeatureCardProps {
  item: FeatureSummaryItem;
  isFa: boolean;
  mainData: any;
}

/* Same flip-card visual as before — only the label source changed
   (findByUniqueId first, static text as fallback) and this got pulled
   out of FeaturesSummary.tsx into its own file. Memoized so that
   changing the period/filter state above doesn't re-render every card
   in the grid, only the ones whose data actually changed. */
function FeatureCardImpl({ item, isFa, mainData }: FeatureCardProps) {
  const iconKey = resolveIconKey(item.label);
  const color = ICON_COLORS[iconKey];
  const description = getKarbariDescription(mainData, iconKey);
  const label = getKarbariLabel(mainData, iconKey);

  const faceBase =
    "absolute inset-0 [backface-visibility:hidden] bg-white dark:bg-gray-1 rounded-2xl p-5 flex flex-col";

  return (
    <div className={`w-full ${CARD_HEIGHT} group [perspective:1200px]`}>
      <div className="relative w-full h-full transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* ---- front ---- */}
        <div className={`${faceBase} gap-4`}>
          <div className="flex items-center gap-3">
            <div className="rounded-xl w-full flex items-center justify-center absolute right-0 left-0 top-[-20px]">
              <FeatureIcon iconKey={iconKey} color={color} />
            </div>
            <div className="text-center flex flex-col w-full items-center mt-6">
              <p className="text-black dark:text-white font-bold text-base lg:text-2xl">{label}</p>
              <p className="text-matn-2 dark:text-matn-2 text-xs lg:text-sm mt-1">
                {isFa
                  ? `دارای ${item.current_count.toLocaleString("fa-IR") } ملک `
                  : `${item.current_count.toLocaleString("en-US")} completed units`}
              </p>
            </div>
          </div>

          <div className="flex items-end justify-between text-center border-t border-solid border-x-0 border-b-0 border-[#EFEFEF] dark:border-[#2A2B32]">
            <div className="flex flex-col gap-1 pt-3 items-center mx-auto">
 <span className="flex items-center justify-center text-center gap-1 text-[12px] lg:text-sm font-bold text-green-600 text-base">
                <svg className="rotate-180" width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="stroke-green-600" d="M6.0846 0.75H8.3096C11.0679 0.75 12.2013 2.70833 10.8179 5.1L9.70126 7.025L8.5846 8.95C7.20126 11.3417 4.94293 11.3417 3.5596 8.95L2.44293 7.025L1.32626 5.1C-0.0320705 2.70833 1.09293 0.75 3.8596 0.75H6.0846Z" stroke="#F03A47" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item.sold_count.toLocaleString(isFa ? "fa-IR" : "en-US")}
              </span>
              <span className="text-matn-2 text-[12px] lg:text-sm">{findByUniqueId(mainData, 1584)}</span>
            </div>
            <div className="h-full w-[1px] bg-[#EFEFEF] dark:bg-[#2A2B32]" />
            <div className="flex flex-col gap-1 items-center justify-center text-center mx-auto">
              <span className="flex items-center justify-center text-center gap-1 text-[12px] lg:text-sm font-bold text-[#F03A47] text-base">
                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.0846 0.75H8.3096C11.0679 0.75 12.2013 2.70833 10.8179 5.1L9.70126 7.025L8.5846 8.95C7.20126 11.3417 4.94293 11.3417 3.5596 8.95L2.44293 7.025L1.32626 5.1C-0.0320705 2.70833 1.09293 0.75 3.8596 0.75H6.0846Z" stroke="#F03A47" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item.sold_count.toLocaleString(isFa ? "fa-IR" : "en-US")}
              </span>
              <span className="text-matn-2 text-[12px] lg:text-sm">{findByUniqueId(mainData, 1791)}</span>
            </div>
          </div>
        </div>

        {/* ---- back ---- */}
        <div className={`${faceBase} justify-between items-center gap-3`} style={{ transform: "rotateY(180deg)" }}>
          <div className="flex items-center gap-2">
            <div className="rounded-xl w-full flex items-center justify-center absolute right-0 left-0 top-[-20px]">
              <FeatureIcon iconKey={iconKey} color={color} />
            </div>
          </div>
          <p className="text-[#84858F] text-xs mt-2 text-center lg:text-sm leading-6 line-clamp-4 flex-1">
            {description}
          </p>
          <a href="#" className="text-blueLink text-center text-xs lg:text-sm font-bold">
            {findByUniqueId(mainData, 774)}
          </a>
        </div>
      </div>
    </div>
  );
}

const FeatureCard = memo(FeatureCardImpl);
FeatureCard.displayName = "FeatureCard";

export default FeatureCard;

export function FeatureCardSkeleton() {
  return (
    <div className={`bg-white dark:bg-gray-1 rounded-2xl p-5 flex flex-col gap-4 ${CARD_HEIGHT} animate-pulse`}>
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-black/5 dark:bg-white/10 shrink-0" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="h-3 w-2/3 rounded bg-black/5 dark:bg-white/10" />
          <div className="h-2.5 w-3/4 rounded bg-black/5 dark:bg-white/10" />
        </div>
      </div>
      <div className="flex-1" />
      <div className="flex justify-between pt-3 border-t border-black/5 dark:border-white/10">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-10 rounded bg-black/5 dark:bg-white/10" />
          <div className="h-2.5 w-14 rounded bg-black/5 dark:bg-white/10" />
        </div>
        <div className="flex flex-col gap-2 items-end">
          <div className="h-4 w-10 rounded bg-black/5 dark:bg-white/10" />
          <div className="h-2.5 w-14 rounded bg-black/5 dark:bg-white/10" />
        </div>
      </div>
    </div>
  );
}