"use client";

import { useParams } from "next/navigation";
import GeneralInfoSkeleton from "@/components/skeleton/GeneralInfoSkeleton";
import PermissionsSkeleton from "@/components/skeleton/PermissionsSkeleton";
import PrizeSkeleton from "@/components/skeleton/PrizeSkeleton";
import { GemSkeleton, GiftSkeleton } from "@/components/skeleton/GemGiftSkeleton";
import ImageBoxSkeleton from "@/components/skeleton/ImageBoxSkeleton";

const TAB_SKELETON_MAP: Record<string, React.ComponentType> = {
  "general-info": GeneralInfoSkeleton,
  licenses: PermissionsSkeleton,
  gem: GemSkeleton,
  gift: GiftSkeleton,
  prize: PrizeSkeleton,
};

export default function Loading() {
  const { tabs } = useParams<{ tabs: string }>();
  const ActiveSkeleton = TAB_SKELETON_MAP[tabs] ?? GeneralInfoSkeleton;

  return (
    <>
      <div className="grid-third w-full md:min-w-[65vw] xl:min-w-[65vw] px-1">
        <ActiveSkeleton />
      </div>

<div className="grid-forth flex-1 relative !mt-[-2px] mb-10 lg:mb-0">
  <ImageBoxSkeleton />
</div>
    </>
  );
}
