import DetailItem from "@/components/module/levelComponent/DetailItem";
import Accordion from "@/components/module/levelComponent/Accordion";
import { targetData } from "@/components/utils/targetDataName";

export default async function GeneralInfo({
  levelsTranslatePage,
  levelTabs,
  singleLevel,
  params,
  concatArrayContent,
}: any) {
  // const levelTabs = await getLevelTabs(params, levelId);
  function localFind(_name: any) {
    return levelsTranslatePage.find((item: any) => item.name == _name)
      ?.translation;
  }

  function localFind2(_slug: any) {
    // HIN not good
    //item.name and _slug have fa/en number string
    //convert

    return concatArrayContent.find(
      (item: any) => Number(item.name) == Number(_slug)
    )?.translation;
  }

  //to make description less than 200 character
  async function makeLessCharacter(_desc: any) {
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
    name: await localFind2(singleLevel.data.slug),
    // https://api.rgb.irpsc.com/api/levels/1
    description: await makeLessCharacter(
      singleLevel.data.general_info.description
    ),
    itemListElement: [
      {
        "@type": "ListItem",
        url: `https://rgb.irpsc.com/${params.lang}/levels/citizen/${params.levelName}/general-info`,
        position: 1,
        description: await makeLessCharacter(levelTabs.data.description),
        name: await targetData(levelsTranslatePage, "basic level information"),
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: localFind("required points"),
            value: levelTabs.data.score,
          },
          {
            "@type": "PropertyValue",
            name: localFind("surface model file size"),
            value: levelTabs.data.file_volume,
          },
          {
            "@type": "PropertyValue",
            name: localFind("level rank"),
            value: levelTabs.data.rank,
          },
          {
            "@type": "PropertyValue",
            name: localFind("the number of points used in the level model"),
            value: levelTabs.data.points,
          },
          {
            "@type": "PropertyValue",
            name: localFind("number of sub-branches"),
            value: levelTabs.data.subcategories,
          },
          {
            "@type": "PropertyValue",
            name: localFind("number of surface model lines"),
            value: levelTabs.data.lines,
          },
          {
            "@type": "PropertyValue",
            name: localFind("level creation date"),
            value: levelTabs.data.creation_date,
          },
          {
            "@type": "PropertyValue",
            name: localFind("animation"),
            value: levelTabs.data.has_animation,
          },
          {
            "@type": "PropertyValue",
            name: localFind("persian font used"),
            value: levelTabs.data.persian_font,
          },
          {
            "@type": "PropertyValue",
            name: localFind("surface designer"),
            value: levelTabs.data.designer,
          },
          {
            "@type": "PropertyValue",
            name: localFind("english font used"),
            value: levelTabs.data.english_font,
          },
          {
            "@type": "PropertyValue",
            name: localFind("3d model designer"),
            value: levelTabs.data.model_designer,
          },
          {
            "@type": "PropertyValue",
            name: localFind("colors used"),
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
          title={localFind("description")}
          value={levelTabs.data.description}
        />
        <DetailItem
          title={localFind("required points")}
          value={levelTabs.data.score.toLocaleString()}
        />
        <DetailItem
          title={localFind("surface model file size")}
          value={levelTabs.data.file_volume}
        />
        <DetailItem
          title={localFind("level rank")}
          value={levelTabs.data.rank}
        />
        <DetailItem
          title={localFind("the number of points used in the level model")}
          value={levelTabs.data.points.toLocaleString()}
        />
        <DetailItem
          title={localFind("number of sub-branches")}
          value={levelTabs.data.subcategories}
        />
        <DetailItem
          title={localFind("number of surface model lines")}
          value={levelTabs.data.lines.toLocaleString()}
        />
        <DetailItem
          title={localFind("level creation date")}
          value={levelTabs.data.creation_date}
        />
        <DetailItem
          title={localFind("animation")}
          value={levelTabs.data.has_animation}
        />
        <DetailItem
          title={localFind("persian font used")}
          value={levelTabs.data.persian_font}
        />
        <DetailItem
          title={localFind("surface designer")}
          value={levelTabs.data.designer}
        />
        <DetailItem
          title={localFind("english font used")}
          value={levelTabs.data.english_font}
        />
        <DetailItem
          title={localFind("3d model designer")}
          value={levelTabs.data.model_designer}
        />
        <DetailItem
          fullBox={true}
          title={localFind("colors used")}
          value={levelTabs.data.used_colors}
        />
      </div>
    </>
  );
}
