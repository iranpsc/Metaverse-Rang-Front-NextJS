import { cookies } from "next/headers";
import ConditionalSidebar from "./ConditionalSidebar";

import type { TabsMenuItem } from "@/components/utils/buildTabsMenu";
import type { SidebarLabels } from "@/components/utils/buildShellTranslations";

interface ConditionalSidebarServerProps {
  tabsMenu: TabsMenuItem[];
  langData: any;
  langArray: any;
  params: any;
  sidebarLabels: SidebarLabels;
}

export default async function ConditionalSidebarServer({
  tabsMenu,
  langData,
  langArray,
  params,
  sidebarLabels,
}: ConditionalSidebarServerProps) {
  const cookieStore = await cookies();

  const sidebarCookie =
    cookieStore.get("sidebarClosed")?.value;

  const initialIsClosed =
    sidebarCookie === undefined
      ? true
      : sidebarCookie === "true";

  return (
    <ConditionalSidebar
      tabsMenu={tabsMenu}
      langData={langData}
      langArray={langArray}
      params={params}
      sidebarLabels={sidebarLabels}
      initialIsClosed={initialIsClosed}
    />
  );
}