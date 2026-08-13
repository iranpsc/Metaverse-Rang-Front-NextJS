import { cookies } from "next/headers";

import ConditionalSidebar from "./ConditionalSidebar";

interface ConditionalSidebarServerProps {
  tabsMenu: any[];
  langData: any;
  langArray: any;
  params: any;
  mainData: any;
}

export default async function ConditionalSidebarServer({
  tabsMenu,
  langData,
  langArray,
  params,
  mainData,
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
      mainData={mainData}
      initialIsClosed={initialIsClosed}
    />
  );
}