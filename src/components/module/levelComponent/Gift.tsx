import DetailItem from "@/components/module/levelComponent/DetailItem";
import Accordion from "@/components/module/levelComponent/Accordion";
import { targetData } from "@/components/utils/targetDataName";

export default async function Gift({
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
        position: 4,
        description: await makeLessCharacter(levelTabs.data.description),
        name: await targetData(levelsTranslatePage, "basic level information"),
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: localFind("features of mobile gift"),
            value: await makeLessCharacter(levelTabs.data.features),
          },
          {
            "@type": "PropertyValue",
            name: localFind("number of monthly capacity"),
            value: levelTabs.data.monthly_capacity_count,
          },
          {
            "@type": "PropertyValue",
            name: localFind("ability to sell capacity"),
            value: levelTabs.data.sell_capacity,
          },
          {
            "@type": "PropertyValue",
            name: localFind("the volume of the 3d model of the gift"),
            value: levelTabs.data.three_d_model_volume,
          },
          {
            "@type": "PropertyValue",
            name: localFind("ability to sell bundled gifts"),
            value: levelTabs.data.sell,
          },
          {
            "@type": "PropertyValue",
            name: localFind(
              "the number of points of the accompanying gift model"
            ),
            value: levelTabs.data.three_d_model_points,
          },
          {
            "@type": "PropertyValue",
            name: localFind("ability to rent accompanying gift"),
            value: levelTabs.data.rent,
          },
          {
            "@type": "PropertyValue",
            name: localFind(
              "the number of lines of the accompanying gift model"
            ),
            value: levelTabs.data.three_d_model_lines,
          },
          {
            "@type": "PropertyValue",
            name: localFind("access link to mobile gift sellers"),
            value: levelTabs.data.seller_link,
          },
          {
            "@type": "PropertyValue",
            name: localFind("animation"),
            value: levelTabs.data.has_animation,
          },
          {
            "@type": "PropertyValue",
            name: localFind("gift designer"),
            value: levelTabs.data.designer,
          },
          {
            "@type": "PropertyValue",
            name: localFind("ability to store capacity"),
            value: levelTabs.data.store_capacity,
          },
          {
            "@type": "PropertyValue",
            name: localFind("gift png file"),
            value: levelTabs.data.png_file,
          },
          {
            "@type": "PropertyValue",
            name: localFind("gift fbx file"),
            value: levelTabs.data.fbx_file,
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
      <div className="w-full flex flex-col-reverse sm:flex-row flex-nowrap">
        <div className="w-full flex flex-wrap justify-between">
          <Accordion
            title={localFind("description")}
            value={levelTabs.data.description}
          />
          <Accordion
            title={localFind("features of mobile gift")}
            value={levelTabs.data.features}
          />
          <DetailItem
            title={localFind("number of monthly capacity")}
            value={levelTabs.data.monthly_capacity_count}
          />
          <DetailItem
            title={localFind("ability to sell capacity")}
            value={levelTabs.data.sell_capacity}
          />
          <DetailItem
            title={localFind("the volume of the 3d model of the gift")}
            value={levelTabs.data.three_d_model_volume}
          />
          <DetailItem
            title={localFind("ability to sell bundled gifts")}
            value={levelTabs.data.sell}
          />
          <DetailItem
            title={localFind(
              "the number of points of the accompanying gift model"
            )}
            value={levelTabs.data.three_d_model_points}
          />
          <DetailItem
            title={localFind("ability to rent accompanying gift")}
            value={levelTabs.data.rent}
          />
          <DetailItem
            title={localFind(
              "the number of lines of the accompanying gift model"
            )}
            value={levelTabs.data.three_d_model_lines}
          />
          <DetailItem
            title={localFind("access link to mobile gift sellers")}
            isLink={true}
            value={levelTabs.data.seller_link}
          />
          <DetailItem
            title={localFind("animation")}
            value={levelTabs.data.has_animation}
          />
          <DetailItem
            title={localFind("gift designer")}
            value={levelTabs.data.designer}
          />
          <DetailItem
            title={localFind("ability to store capacity")}
            value={levelTabs.data.store_capacity}
          />
          <DetailItem
            title={localFind("gift png file")}
            value={levelTabs.data.png_file}
          />
          <DetailItem
            title={localFind("gift fbx file")}
            value={levelTabs.data.fbx_file}
          />
        </div>
      </div>
    </>
  );
}
