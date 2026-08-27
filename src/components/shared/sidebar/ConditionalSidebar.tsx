"use client";

import { usePathname } from "next/navigation";

import SideBar from "@/components/shared/sidebar/SideBar";

import type { TabsMenuItem } from "@/components/utils/buildTabsMenu";
import type { SidebarLabels } from "@/components/utils/buildShellTranslations";

interface ConditionalSidebarProps {
  tabsMenu: TabsMenuItem[];
  langData: any;
  langArray: any;
  params: any;
  sidebarLabels: SidebarLabels;
  initialIsClosed?: boolean;
}

export default function ConditionalSidebar({
  tabsMenu,
  langData,
  langArray,
  params,
  sidebarLabels,
  initialIsClosed = true,
}: ConditionalSidebarProps) {
  const pathname = usePathname();

  const pathsWithoutSidebar = [
    "/levels/citizen/",
    "/citizens/hm",
    "citizens/bn",
  ];

  const shouldShowSidebar = !pathsWithoutSidebar.some((path) =>
    pathname.includes(path)
  );

  if (!shouldShowSidebar) {
    return null;
  }

  let pageSide = "citizen";

  if (
    pathname &&
    pathname.startsWith(`/${params.lang}/levels/citizen/`)
  ) {
    pageSide = "level";
  } else if (
    pathname &&
    pathname.startsWith(`/${params.lang}/citizens`)
  ) {
    pageSide = "citizen";
  }

  return (
    <SideBar
      tabsMenu={tabsMenu}
      langData={langData}
      langArray={langArray}
      params={params}
      pageSide={pageSide}
      sidebarLabels={sidebarLabels}
      initialIsClosed={initialIsClosed}
    />
  );
}
