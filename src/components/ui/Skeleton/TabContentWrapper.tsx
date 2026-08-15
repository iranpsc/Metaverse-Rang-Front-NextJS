"use client";
import { useTabLoading } from "./TabLoadingProvider";
import GeneralInfoSkeleton from "@/components/skeleton/GeneralInfoSkeleton";
import PermissionsSkeleton from "@/components/skeleton/PermissionsSkeleton";
import PrizeSkeleton from "@/components/skeleton/PrizeSkeleton";
import { GemSkeleton, GiftSkeleton } from "@/components/skeleton/GemGiftSkeleton";

// نگاشت اسم تب (همون params.tabs) به اسکلت مخصوص خودش
const TAB_SKELETON_MAP: Record<string, React.ComponentType> = {
  "general-info": GeneralInfoSkeleton,
  licenses: PermissionsSkeleton,
  gem: GemSkeleton,
  gift: GiftSkeleton,
  prize: PrizeSkeleton,
};

interface TabContentWrapperProps {
  children: React.ReactNode;
  tab: string;
}

export default function TabContentWrapper({ children, tab }: TabContentWrapperProps) {
  const { loading } = useTabLoading();

  // اگه تب نامشخص بود (نباید پیش بیاد)، به GeneralInfoSkeleton فال‌بک می‌کنیم
  const ActiveSkeleton = TAB_SKELETON_MAP[tab] || GeneralInfoSkeleton;

  return (
    <div className="relative">
      {loading ? <ActiveSkeleton /> : children}
    </div>
  );
}