"use client";
import { useTabLoading } from "./TabLoadingProvider";

export default function TabContentWrapper({ children  } : any) {
  const { loading } = useTabLoading();

  return (
    <div className="relative">
      {loading ? <TabSkeleton /> : children}
    </div>
  );
}

function TabSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-9 w-1/3 bg-bgLightGrey dark:bg-darkGray rounded-lg" />
      <div className="h-9 w-full bg-bgLightGrey dark:bg-darkGray rounded-lg" />
      <div className="h-9 w-full bg-bgLightGrey dark:bg-darkGray rounded-lg" />
      <div className="h-20 w-1/3 bg-bgLightGrey dark:bg-darkGray rounded-lg" />
      <div className="h-9 w-full bg-bgLightGrey dark:bg-darkGray rounded-lg" />
      <div className="h-9 w-full bg-bgLightGrey dark:bg-darkGray rounded-lg" />
      <div className="h-28 w-2/3 bg-bgLightGrey dark:bg-darkGray rounded-lg" />
      <div className="h-9 w-full bg-bgLightGrey dark:bg-darkGray rounded-lg" />
      <div className="h-9 w-full bg-bgLightGrey dark:bg-darkGray rounded-lg" />
      <div className="h-28 w-2/3 bg-bgLightGrey dark:bg-darkGray rounded-lg" />
    </div>
  );
}
