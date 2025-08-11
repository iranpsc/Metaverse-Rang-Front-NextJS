// src/app/[lang]/[...notfound]/page.tsx
import NotFoundPage from "@/components/shared/NotFoundPage";
import {
  getFooterData,
  getTranslation,
  getLangArray,
  getMainFile,
  findByModalName,
  findByTabName,
} from "@/components/utils/actions";
import { getStaticMenu } from "@/components/utils/constants";

export default async function NotFoundCatchAll({ params }: { params: any }) {
  const [footerTabs, langData, langArray] = await Promise.all([
    getFooterData(params),
    getTranslation(params.lang),
    getLangArray(),
  ]);

  const mainData = await getMainFile(langData);
  const centralPageModal = await findByModalName(mainData, "central-page");
  const tabsMenu = await findByTabName(centralPageModal, "before-login");

  const staticMenuToShow = getStaticMenu(params.lang);
  const updatedTabsMenu = tabsMenu.map((tab: any) => {
    const findInStatic = staticMenuToShow.find(
      (val) => tab.unique_id === val.unique_id
    );
    return findInStatic
      ? { ...tab, url: findInStatic.url, order: findInStatic.order, toShow: true }
      : tab;
  });

  return (
    <NotFoundPage
      lang={params.lang}
      params={params}
      langData={langData}
      langArray={langArray}
      updatedTabsMenu={updatedTabsMenu}
      footerTabs={footerTabs}
      mainData={mainData}
    />
  );
}
