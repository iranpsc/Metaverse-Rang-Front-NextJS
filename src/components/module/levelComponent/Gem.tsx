import DetailItem from "@/components/module/levelComponent/DetailItem";
import Accordion from "@/components/module/levelComponent/Accordion";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

export default async function Gem({
  mainData,
  levelTabs,
  singleLevel,
  params,
  concatArrayContent,
}: any) {
  // function localFind(_name: any) {
  //   return levelsTranslatePage.find((item: any) => item.name == _name)
  //     ?.translation;
  // }
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
    name: await localFind2(singleLevel.data.unique_id),
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
        // name: await targetData(levelsTranslatePage, "surface gem"),
        name: findByUniqueId(mainData, 389),
        additionalProperty: [
          {
            "@type": "PropertyValue",
            // name: localFind("gem chip"),
            name: findByUniqueId(mainData, 430),
            value: levelTabs.data.thread,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("gem color"),
            name: findByUniqueId(mainData, 431),
            value: levelTabs.data.color,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("the volume of the 3d stone model"),
            name: findByUniqueId(mainData, 432),
            value: levelTabs.data.volume,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("gem png file"),
            name: findByUniqueId(mainData, 433),
            value: levelTabs.data.png_file,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("the number of points of the 3d stone model"),
            name: findByUniqueId(mainData, 434),
            value: levelTabs.data.subcategories,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("gem fbx file"),
            name: findByUniqueId(mainData, 435),
            value: levelTabs.data.fbx_file,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("the number of lines of the 3d stone model"),
            name: findByUniqueId(mainData, 436),
            value: levelTabs.data.lines,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("central encryption"),
            name: findByUniqueId(mainData, 437),
            value: levelTabs.data.encryption,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("animation"),
            name: findByUniqueId(mainData, 400),
            value: levelTabs.data.has_animation,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("gem designer"),
            name: findByUniqueId(mainData, 438),
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
            // title={localFind("description")}
            title={findByUniqueId(mainData, 164)}
            value={levelTabs.data.description}
          />
          <DetailItem
            // title={localFind("gem chip")}
            title={findByUniqueId(mainData, 430)}
            value={levelTabs.data.thread}
          />
          <DetailItem
            // title={localFind("gem color")}
            title={findByUniqueId(mainData, 431)}
            value={levelTabs.data.color}
          />
          <DetailItem
            // title={localFind("the volume of the 3d stone model")}
            title={findByUniqueId(mainData, 432)}
            value={levelTabs.data.volume}
          />
          <DetailItem
            // title={localFind("gem png file")}
            title={findByUniqueId(mainData, 433)}
            value={levelTabs.data.png_file}
            isLink
          />
          <DetailItem
            // title={localFind("the number of points of the 3d stone model")}
            title={findByUniqueId(mainData, 434)}
            value={levelTabs.data.subcategories}
          />
          <DetailItem
            // title={localFind("gem fbx file")}
            title={findByUniqueId(mainData, 435)}
            value={levelTabs.data.fbx_file}
            isLink
          />
          <DetailItem
            // title={localFind("the number of lines of the 3d stone model")}
            title={findByUniqueId(mainData, 436)}
            value={levelTabs.data.lines}
          />
          <DetailItem
            // title={localFind("central encryption")}
            title={findByUniqueId(mainData, 437)}
            value={levelTabs.data.encryption}
          />
          <DetailItem
            // title={localFind("animation")}
            title={findByUniqueId(mainData, 400)}
            value={levelTabs.data.has_animation}
          />
          <DetailItem
            // title={localFind("gem designer")}
            title={findByUniqueId(mainData, 438)}
            value={levelTabs.data.designer}
          />
        </div>
      </div>
    </>
  );
}
