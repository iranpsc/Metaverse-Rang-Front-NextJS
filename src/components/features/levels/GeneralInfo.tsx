"use client";

import DetailItem from "@/components/ui/DetailItem";
import Accordion from "@/components/ui/Accordion/Accordion";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

export default function GeneralInfo({
  mainData,
  levelTabs,
  
  params,
}: any) {
  const { lang } = params;

  return (
    <>
<div className="w-full flex flex-wrap justify-between">
        <Accordion
          title={findByUniqueId(mainData, 164)}
          value={levelTabs.data?.description}
        />

        <DetailItem title={findByUniqueId(mainData, 393)} value={levelTabs.data?.score?.toLocaleString()} params={lang} />
        <DetailItem title={findByUniqueId(mainData, 394)} value={levelTabs.data?.file_volume} params={lang} />
        <DetailItem title={findByUniqueId(mainData, 395)} value={levelTabs.data?.rank} params={lang} />
        <DetailItem title={findByUniqueId(mainData, 396)} value={levelTabs.data?.points?.toLocaleString()} params={params} />
        <DetailItem title={findByUniqueId(mainData, 397)} value={levelTabs.data?.subcategories} params={params} />
        <DetailItem title={findByUniqueId(mainData, 398)} value={levelTabs.data?.lines?.toLocaleString()} params={params} />
        <DetailItem title={findByUniqueId(mainData, 399)} value={levelTabs.data?.creation_date} params={params} />
        <DetailItem title={findByUniqueId(mainData, 400)} value={levelTabs.data?.has_animation} params={params} />
        <DetailItem title={findByUniqueId(mainData, 401)} value={levelTabs.data?.persian_font} params={params} />
        <DetailItem title={findByUniqueId(mainData, 402)} value={levelTabs.data?.designer} params={params} />
        <DetailItem title={findByUniqueId(mainData, 403)} value={levelTabs.data?.english_font} params={params} />
        <DetailItem title={findByUniqueId(mainData, 404)} value={levelTabs.data?.model_designer} params={params} />

        <DetailItem
          fullBox
          title={findByUniqueId(mainData, 405)}
          value={levelTabs.data?.used_colors}
          params={params}
        />
      </div>
    </>
  );
}