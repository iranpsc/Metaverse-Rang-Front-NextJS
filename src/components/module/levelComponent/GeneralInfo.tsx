"use client";
import DetailItem from "@/components/module/levelComponent/DetailItem";
import Accordion from "@/components/module/levelComponent/Accordion";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

export default function GeneralInfo({
  mainData,
  levelTabs,
  singleLevel,
  params,
  concatArrayContent,
}: any) {
  function localFind2(_slug: any) {
    let temp = concatArrayContent.find(
      (item: any) => Number(item.unique_id) == Number(_slug)
    );
    return temp?.translation;
  }

  function makeLessCharacter(_desc: any) {
    let temp;
    if (_desc) {
      temp = _desc;
      temp = temp.slice(0, 200);
    } else temp = "";
    return temp;
  }

  const tabLevelSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: localFind2(singleLevel.data.unique_id),
    description: makeLessCharacter(singleLevel.data.general_info.description),
    itemListElement: [
      {
        "@type": "ListItem",
        url: `https://rgb.irpsc.com/${params.lang}/levels/citizen/${params.levelName}/general-info`,
        position: 1,
        description: makeLessCharacter(levelTabs.data.description),
        name: findByUniqueId(mainData, 387),
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: findByUniqueId(mainData, 393),
            value: levelTabs.data.score,
          },
          {
            "@type": "PropertyValue",
            name: findByUniqueId(mainData, 394),
            value: levelTabs.data.file_volume,
          },
          {
            "@type": "PropertyValue",
            name: findByUniqueId(mainData, 395),
            value: levelTabs.data.rank,
          },
          {
            "@type": "PropertyValue",
            name: findByUniqueId(mainData, 396),
            value: levelTabs.data.points,
          },
          {
            "@type": "PropertyValue",
            name: findByUniqueId(mainData, 397),
            value: levelTabs.data.subcategories,
          },
          {
            "@type": "PropertyValue",
            name: findByUniqueId(mainData, 398),
            value: levelTabs.data.lines,
          },
          {
            "@type": "PropertyValue",
            name: findByUniqueId(mainData, 399),
            value: levelTabs.data.creation_date,
          },
          {
            "@type": "PropertyValue",
            name: findByUniqueId(mainData, 400),
            value: levelTabs.data.has_animation,
          },
          {
            "@type": "PropertyValue",
            name: findByUniqueId(mainData, 401),
            value: levelTabs.data.persian_font,
          },
          {
            "@type": "PropertyValue",
            name: findByUniqueId(mainData, 402),
            value: levelTabs.data.designer,
          },
          {
            "@type": "PropertyValue",
            name: findByUniqueId(mainData, 403),
            value: levelTabs.data.english_font,
          },
          {
            "@type": "PropertyValue",
            name: findByUniqueId(mainData, 404),
            value: levelTabs.data.model_designer,
          },
          {
            "@type": "PropertyValue",
            name: findByUniqueId(mainData, 405),
            value: levelTabs.data.used_colors?.split(","),
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tabLevelSchema) }}
      />
      <div className="w-full flex flex-wrap justify-between">
        <Accordion
          title={findByUniqueId(mainData, 164)}
          value={levelTabs.data.description}
        />
        <DetailItem
          title={findByUniqueId(mainData, 393)}
          value={levelTabs.data.score.toLocaleString()}
          params={params} // اضافه کردن params
        />
        <DetailItem
          title={findByUniqueId(mainData, 394)}
          value={levelTabs.data.file_volume}
          params={params} // اضافه کردن params
        />
        <DetailItem
          title={findByUniqueId(mainData, 395)}
          value={levelTabs.data.rank}
          params={params} // اضافه کردن params
        />
        <DetailItem
          title={findByUniqueId(mainData, 396)}
          value={levelTabs.data.points.toLocaleString()}
          params={params} // اضافه کردن params
        />
        <DetailItem
          title={findByUniqueId(mainData, 397)}
          value={levelTabs.data.subcategories}
          params={params} // اضافه کردن params
        />
        <DetailItem
          title={findByUniqueId(mainData, 398)}
          value={levelTabs.data.lines.toLocaleString()}
          params={params} // اضافه کردن params
        />
        <DetailItem
          title={findByUniqueId(mainData, 399)}
          value={levelTabs.data.creation_date}
          params={params} // اضافه کردن params
        />
        <DetailItem
          title={findByUniqueId(mainData, 400)}
          value={levelTabs.data.has_animation}
          params={params} // اضافه کردن params
        />
        <DetailItem
          title={findByUniqueId(mainData, 401)}
          value={levelTabs.data.persian_font}
          params={params} // اضافه کردن params
        />
        <DetailItem
          title={findByUniqueId(mainData, 402)}
          value={levelTabs.data.designer}
          params={params} // اضافه کردن params
        />
        <DetailItem
          title={findByUniqueId(mainData, 403)}
          value={levelTabs.data.english_font}
          params={params} // اضافه کردن params
        />
        <DetailItem
          title={findByUniqueId(mainData, 404)}
          value={levelTabs.data.model_designer}
          params={params} // اضافه کردن params
        />
        <DetailItem
          fullBox={true}
          title={findByUniqueId(mainData, 405)}
          value={levelTabs.data.used_colors}
          params={params} // اضافه کردن params
        />
      </div>
    </>
  );
}