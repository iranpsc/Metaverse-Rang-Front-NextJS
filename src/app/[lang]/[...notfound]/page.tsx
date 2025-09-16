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

  return (
    <NotFoundPage
      lang={params.lang}
      params={params}
      langData={langData}
      langArray={langArray}
      footerTabs={footerTabs}
      mainData={mainData}
    />
  );
}
