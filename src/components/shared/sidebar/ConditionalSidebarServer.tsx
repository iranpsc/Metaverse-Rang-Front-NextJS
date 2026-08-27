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

/**
 * Thin server wrapper — intentionally does NOT call cookies()/headers()
 * so the lang layout can stay cacheable. Sidebar open/closed state is
 * restored on the client from localStorage (see SideBar + layout script).
 */
export default function ConditionalSidebarServer({
  tabsMenu,
  langData,
  langArray,
  params,
  sidebarLabels,
}: ConditionalSidebarServerProps) {
  return (
    <ConditionalSidebar
      tabsMenu={tabsMenu}
      langData={langData}
      langArray={langArray}
      params={params}
      sidebarLabels={sidebarLabels}
      initialIsClosed={true}
    />
  );
}
