import DetailItem from "@/components/module/levelComponent/DetailItem";
import Accordion from "@/components/module/levelComponent/Accordion";
import { targetData } from "@/components/utils/targetDataName";

export default async function Gem({
  levelsTranslatePage,
  levelTabs,
  singleLevel,
  params,
  concatArrayContent,
}: any) {
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
        position: 3,
        description: await makeLessCharacter(levelTabs.data.description),
        name: await targetData(levelsTranslatePage, "basic level information"),
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: localFind("gem chip"),
            value: levelTabs.data.thread,
          },
          {
            "@type": "PropertyValue",
            name: localFind("gem color"),
            value: levelTabs.data.color,
          },
          {
            "@type": "PropertyValue",
            name: localFind("the volume of the 3d stone model"),
            value: levelTabs.data.volume,
          },
          {
            "@type": "PropertyValue",
            name: localFind("gem png file"),
            value: levelTabs.data.png_file,
          },
          {
            "@type": "PropertyValue",
            name: localFind("the number of points of the 3d stone model"),
            value: levelTabs.data.subcategories,
          },
          {
            "@type": "PropertyValue",
            name: localFind("gem fbx file"),
            value: levelTabs.data.fbx_file,
          },
          {
            "@type": "PropertyValue",
            name: localFind("the number of lines of the 3d stone model"),
            value: levelTabs.data.lines,
          },
          {
            "@type": "PropertyValue",
            name: localFind("central encryption"),
            value: levelTabs.data.encryption,
          },
          {
            "@type": "PropertyValue",
            name: localFind("animation"),
            value: levelTabs.data.has_animation,
          },
          {
            "@type": "PropertyValue",
            name: localFind("gem designer"),
            value: levelTabs.data.designer,
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
      <div className="w-full flex flex-col-reverse sm:flex-row flex-wrap">
        <div className="w-full flex flex-wrap justify-between">
          <Accordion
            title={localFind("description")}
            value={levelTabs.data.description}
          />
          <DetailItem
            title={localFind("gem chip")}
            value={levelTabs.data.thread}
          />
          <DetailItem
            title={localFind("gem color")}
            value={levelTabs.data.color}
          />
          <DetailItem
            title={localFind("the volume of the 3d stone model")}
            value={levelTabs.data.volume}
          />
          <DetailItem
            title={localFind("gem png file")}
            value={levelTabs.data.png_file}
            isLink
          />
          <DetailItem
            title={localFind("the number of points of the 3d stone model")}
            value={levelTabs.data.subcategories}
          />
          <DetailItem
            title={localFind("gem fbx file")}
            value={levelTabs.data.fbx_file}
            isLink
          />
          <DetailItem
            title={localFind("the number of lines of the 3d stone model")}
            value={levelTabs.data.lines}
          />
          <DetailItem
            title={localFind("central encryption")}
            value={levelTabs.data.encryption}
          />
          <DetailItem
            title={localFind("animation")}
            value={levelTabs.data.has_animation}
          />
          <DetailItem
            title={localFind("gem designer")}
            value={levelTabs.data.designer}
          />
        </div>

        {/* <ImageBox item={levelTabs.data} langData={langData} /> */}
      </div>
    </>
  );
}
