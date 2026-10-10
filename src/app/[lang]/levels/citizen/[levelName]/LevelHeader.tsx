"use client";

import { useSelectedLayoutSegment } from "next/navigation";

export default function LevelHeader({
  levelTitle,
  tabTitles,
  actionLabel,
}: {
  levelTitle: string;
  tabTitles: Record<string, string>;
  actionLabel: string;
}) {
  const tab = useSelectedLayoutSegment();
  const tabTitle = tab ? tabTitles[tab] : "";
  const pageTitle = tabTitle ? `${tabTitle} ${levelTitle}` : levelTitle;

  return (
    <div className="self-start md:order-none w-full  flex items-center justify-between font-bold pt-[3px] pb-5 dark:text-white text-lg sm:text-xl lg:text-2xl 2xl:text-3xl 3xl:text-4xl">
      <h1 className="text-base md:text-[28px] lg:text-[30px] xl:text-[32px]">
        {pageTitle}
      </h1>
      <button className="w-max py-[5px] md:py-3 px-5 text-[14px] bg-gray-2  font-bold text-matn-1 rounded-[12px]">
        {actionLabel}
      </button>
    </div>
  );
}
