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
    // HIN not good
    //item.name and _slug have fa/en number string
    //convert
    let temp = concatArrayContent.find(
      (item: any) => Number(item.unique_id) == Number(_slug)
    );
    return temp?.translation;
  }

  //to make description less than 200 character
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
    // https://api.rgb.irpsc.com/api/levels/1
    name: localFind2(singleLevel.data.unique_id),
    // https://api.rgb.irpsc.com/api/levels/1
    description: makeLessCharacter(singleLevel.data.general_info.description),
    itemListElement: [
      {
        "@type": "ListItem",
        url: `https://rgb.irpsc.com/${params.lang}/levels/citizen/${params.levelName}/general-info`,
        position: 1,
        description: makeLessCharacter(levelTabs.data.description),
        // name: targetData(levelsTranslatePage, "basic level information"),
        name: findByUniqueId(mainData, 387),
        additionalProperty: [
          {
            "@type": "PropertyValue",
            // name: localFind("required points"),
            name: findByUniqueId(mainData, 393),
            value: levelTabs.data.score,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("surface model file size"),
            name: findByUniqueId(mainData, 394),
            value: levelTabs.data.file_volume,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("level rank"),
            name: findByUniqueId(mainData, 395),
            value: levelTabs.data.rank,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("the number of points used in the level model"),
            name: findByUniqueId(mainData, 396),
            value: levelTabs.data.points,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("number of sub-branches"),
            name: findByUniqueId(mainData, 397),
            value: levelTabs.data.subcategories,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("number of surface model lines"),
            name: findByUniqueId(mainData, 398),
            value: levelTabs.data.lines,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("level creation date"),
            name: findByUniqueId(mainData, 399),
            value: levelTabs.data.creation_date,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("animation"),
            name: findByUniqueId(mainData, 400),
            value: levelTabs.data.has_animation,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("persian font used"),
            name: findByUniqueId(mainData, 401),
            value: levelTabs.data.persian_font,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("surface designer"),
            name: findByUniqueId(mainData, 402),
            value: levelTabs.data.designer,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("english font used"),
            name: findByUniqueId(mainData, 403),
            value: levelTabs.data.english_font,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("3d model designer"),
            name: findByUniqueId(mainData, 404),
            value: levelTabs.data.model_designer,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("colors used"),
            name: findByUniqueId(mainData, 405),
            value: levelTabs.data.used_colors?.split(","),
          },
        ],
      },
    ],
  };
  return (
    <>
      {/* SCHEMA** */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tabLevelSchema) }}
      />
      {/* schema END */}

      <div className="w-full flex flex-wrap justify-between">
        <Accordion
          // title={localFind("description")}
          title={findByUniqueId(mainData, 164)}
          value={levelTabs.data.description}
        />
        <DetailItem
          // title={localFind("required points")}
          title={findByUniqueId(mainData, 393)}
          value={levelTabs.data.score.toLocaleString()}
        />
        <DetailItem
          // title={localFind("surface model file size")}
          title={findByUniqueId(mainData, 394)}
          value={levelTabs.data.file_volume}
        />
        <DetailItem
          // title={localFind("level rank")}
          title={findByUniqueId(mainData, 395)}
          value={levelTabs.data.rank}
        />
        <DetailItem
          // title={localFind("the number of points used in the level model")}
          title={findByUniqueId(mainData, 396)}
          value={levelTabs.data.points.toLocaleString()}
        />
        <DetailItem
          // title={localFind("number of sub-branches")}
          title={findByUniqueId(mainData, 397)}
          value={levelTabs.data.subcategories}
        />
        <DetailItem
          // title={localFind("number of surface model lines")}
          title={findByUniqueId(mainData, 398)}
          value={levelTabs.data.lines.toLocaleString()}
        />
        <DetailItem
          // title={localFind("level creation date")}
          title={findByUniqueId(mainData, 399)}
          value={levelTabs.data.creation_date}
        />
        <DetailItem
          // title={localFind("animation")}
          title={findByUniqueId(mainData, 400)}
          value={levelTabs.data.has_animation}
        />
        <DetailItem
          // title={localFind("persian font used")}
          title={findByUniqueId(mainData, 401)}
          value={levelTabs.data.persian_font}
        />
        <DetailItem
          // title={localFind("surface designer")}
          title={findByUniqueId(mainData, 402)}
          value={levelTabs.data.designer}
        />
        <DetailItem
          // title={localFind("english font used")}
          title={findByUniqueId(mainData, 403)}
          value={levelTabs.data.english_font}
        />
        <DetailItem
          // title={localFind("3d model designer")}
          title={findByUniqueId(mainData, 404)}
          value={levelTabs.data.model_designer}
        />
        <DetailItem
          fullBox={true}
          // title={localFind("colors used")}
          title={findByUniqueId(mainData, 405)}
          value={levelTabs.data.used_colors}
        />
      </div>
    </>
  );
}
