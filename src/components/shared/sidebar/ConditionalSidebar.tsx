"use client";

import { usePathname } from "next/navigation";

import SideBar from "@/components/shared/sidebar/SideBar";

interface Tab {
  id: number;
  mainData: string;
  unique_id: number;
  url?: string;
  translation: string;
  order?: number;
  toShow?: boolean;
  active?: boolean;
}

interface ConditionalSidebarProps {
  tabsMenu: Tab[];
  langData: any;
  langArray: any;
  params: any;
  mainData: any;
  initialIsClosed: boolean;
}

export default function ConditionalSidebar({
  tabsMenu,
  langData,
  langArray,
  params,
  mainData,
  initialIsClosed,
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
      mainData={mainData}
      initialIsClosed={initialIsClosed}
    />
  );
}