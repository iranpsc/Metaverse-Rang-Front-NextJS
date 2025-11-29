"use client";

import { usePathname } from "next/navigation";
import SideBar from "@/components/module/sidebar/SideBar";

interface Tab {
  id: number;
  unique_id: number;
  url?: string;
  translation: string;
  order?: number;
  toShow?: boolean;
  active?: boolean;
}

export default function ConditionalSidebar({ tabsMenu, langData, langArray, params }: { tabsMenu: Tab[], langData: any, langArray: any, params: any }) {
  const pathname = usePathname();

  // console.log("Current pathname:", pathname);

  // مسیرهایی که سایدبار نباید رندر بشن (فقط بعد از /citizens/)
  const pathsWithoutSidebar = ["/levels/citizen", "/citizens/hm"];

  // چک می‌کنیم که آیا مسیر فعلی توی لیست pathsWithoutSidebar هست یا نه
  const shouldShowSidebar = !pathsWithoutSidebar.some(path => pathname.includes(path));

  // console.log("Should show sidebar:", shouldShowSidebar);

  if (!shouldShowSidebar) return null;

  // تعیین pageSide بر اساس مسیر (برای استفاده توی SideBar)
  let pageSide = "citizen"; // پیش‌فرض
  if (pathname && pathname.startsWith(`/${params.lang}/levels/citizen`)) pageSide = "level";
  else if (pathname && pathname.startsWith(`/${params.lang}/citizens`)) pageSide = "citizen/referal";

  return (
    <SideBar
      tabsMenu={tabsMenu}
      langData={langData}
      langArray={langArray}
      params={params}
      pageSide={pageSide}
    />
  );
}