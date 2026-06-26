"use client";

import DetailItem from "@/components/module/levelComponents/DetailItem";
import Accordion from "@/components/module/levelComponents/Accordion";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

export default function GeneralInfo({
  mainData,
  levelTabs,
  singleLevel,
  params,
  concatArrayContent,
}: any) {
  const { lang, levelName } = params;

  function localFind2(_slug: any) {
    const temp = concatArrayContent.find(
      (item: any) => Number(item.unique_id) === Number(_slug)
    );
    return temp?.translation || "";
  }

  function makeLessCharacter(desc: any) {
    return desc ? desc.slice(0, 200) : "";
  }
console.log("زخدفثیبسحنمیب:", concatArrayContent);
  const tabLevelSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: localFind2(singleLevel.data.unique_id),
    description: makeLessCharacter(
      singleLevel.data.general_info?.description
    ),
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        url: `https://metarang.com/${lang}/levels/citizen/${levelName}/general-info`,
        name: findByUniqueId(mainData, 387),
        description: makeLessCharacter(levelTabs.data?.description),
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: findByUniqueId(mainData, 393),
            value: levelTabs.data?.score,
          },
          {
            "@type": "PropertyValue",
            name: findByUniqueId(mainData, 394),
            value: levelTabs.data?.file_volume,
          },
          {
            "@type": "PropertyValue",
            name: findByUniqueId(mainData, 395),
            value: levelTabs.data?.rank,
          },
          {
            "@type": "PropertyValue",
            name: findByUniqueId(mainData, 396),
            value: levelTabs.data?.points,
          },
          {
            "@type": "PropertyValue",
            name: findByUniqueId(mainData, 397),
            value: levelTabs.data?.subcategories,
          },
          {
            "@type": "PropertyValue",
            name: findByUniqueId(mainData, 398),
            value: levelTabs.data?.lines,
          },
          {
            "@type": "PropertyValue",
            name: findByUniqueId(mainData, 399),
            value: levelTabs.data?.creation_date,
          },
          {
            "@type": "PropertyValue",
            name: findByUniqueId(mainData, 400),
            value: levelTabs.data?.has_animation,
          },
          {
            "@type": "PropertyValue",
            name: findByUniqueId(mainData, 401),
            value: levelTabs.data?.persian_font,
          },
          {
            "@type": "PropertyValue",
            name: findByUniqueId(mainData, 402),
            value: levelTabs.data?.designer,
          },
          {
            "@type": "PropertyValue",
            name: findByUniqueId(mainData, 403),
            value: levelTabs.data?.english_font,
          },
          {
            "@type": "PropertyValue",
            name: findByUniqueId(mainData, 404),
            value: levelTabs.data?.model_designer,
          },
          {
            "@type": "PropertyValue",
            name: findByUniqueId(mainData, 405),
            value: levelTabs.data?.used_colors?.split(","),
          },
        ],
      },
    ],
  };

  return (
    <>
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tabLevelSchema) }}
      />

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