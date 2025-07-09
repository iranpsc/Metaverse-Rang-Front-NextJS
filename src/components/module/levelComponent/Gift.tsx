import DetailItem from "@/components/module/levelComponent/DetailItem";
import Accordion from "@/components/module/levelComponent/Accordion";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

export default async function Gift({
  mainData,
  // levelsTranslatePage,
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
        position: 4,
        description: await makeLessCharacter(levelTabs.data.description),
        // name: await targetData(levelsTranslatePage, "accompanying gift"),
        name: findByUniqueId(mainData, 390),
        additionalProperty: [
          {
            "@type": "PropertyValue",
            // name: localFind("features of mobile gift"),
            name: findByUniqueId(mainData, 439),
            value: await makeLessCharacter(levelTabs.data.features),
          },
          {
            "@type": "PropertyValue",
            // name: localFind("number of monthly capacity"),
            name: findByUniqueId(mainData, 440),
            value: levelTabs.data.monthly_capacity_count,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("ability to sell capacity"),
            name: findByUniqueId(mainData, 441),
            value: levelTabs.data.sell_capacity,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("the volume of the 3d model of the gift"),
            name: findByUniqueId(mainData, 442),
            value: levelTabs.data.three_d_model_volume,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("ability to sell bundled gifts"),
            name: findByUniqueId(mainData, 443),
            value: levelTabs.data.sell,
          },
          {
            "@type": "PropertyValue",
            // name: localFind(
            //   "the number of points of the accompanying gift model"
            // ),
            name: findByUniqueId(mainData, 444),
            value: levelTabs.data.three_d_model_points,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("ability to rent accompanying gift"),
            name: findByUniqueId(mainData, 445),
            value: levelTabs.data.rent,
          },
          {
            "@type": "PropertyValue",
            // name: localFind(
            //   "the number of lines of the accompanying gift model"
            // ),
            name: findByUniqueId(mainData, 446),
            value: levelTabs.data.three_d_model_lines,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("access link to mobile gift sellers"),
            name: findByUniqueId(mainData, 447),
            value: levelTabs.data.seller_link,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("animation"),
            name: findByUniqueId(mainData, 400),
            value: levelTabs.data.has_animation,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("gift designer"),
            name: findByUniqueId(mainData, 448),
            value: levelTabs.data.designer,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("ability to store capacity"),
            name: findByUniqueId(mainData, 449),
            value: levelTabs.data.store_capacity,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("gift png file"),
            name: findByUniqueId(mainData, 450),
            value: levelTabs.data.png_file,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("gift fbx file"),
            name: findByUniqueId(mainData, 451),
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
            // title={localFind("description")}
            title={findByUniqueId(mainData, 164)}
            value={levelTabs.data.description}
          />
          <Accordion
            // title={localFind("features of mobile gift")}
            title={findByUniqueId(mainData, 439)}
            value={levelTabs.data.features}
          />
          <DetailItem
            // title={localFind("number of monthly capacity")}
            title={findByUniqueId(mainData, 440)}
            value={levelTabs.data.monthly_capacity_count}
             params={params} 
          />
          <DetailItem
            // title={localFind("ability to sell capacity")}
            title={findByUniqueId(mainData, 441)}
            value={levelTabs.data.sell_capacity}
             params={params} 
          />
          <DetailItem
            // title={localFind("the volume of the 3d model of the gift")}
            title={findByUniqueId(mainData, 442)}
            value={levelTabs.data.three_d_model_volume}
             params={params} 
          />
          <DetailItem
            // title={localFind("ability to sell bundled gifts")}
            title={findByUniqueId(mainData, 443)}
            value={levelTabs.data.sell}
             params={params} 
          />
          <DetailItem
            // title={localFind(
            //   "the number of points of the accompanying gift model"
            // )}
            title={findByUniqueId(mainData, 444)}
            value={levelTabs.data.three_d_model_points}
             params={params} 
          />
          <DetailItem
            // title={localFind("ability to rent accompanying gift")}
            title={findByUniqueId(mainData, 445)}
            value={levelTabs.data.rent}
             params={params} 
          />
          <DetailItem
            // title={localFind(
            //   "the number of lines of the accompanying gift model"
            // )}
            title={findByUniqueId(mainData, 446)}
            value={levelTabs.data.three_d_model_lines}
             params={params} 
          />
          <DetailItem
            // title={localFind("access link to mobile gift sellers")}
            title={findByUniqueId(mainData, 447)}
            isLink={true}
            value={levelTabs.data.seller_link}
             params={params} 
          />
          <DetailItem
            // title={localFind("animation")}
            title={findByUniqueId(mainData, 400)}
            value={levelTabs.data.has_animation}
             params={params} 
          />
          <DetailItem
            // title={localFind("gift designer")}
            title={findByUniqueId(mainData, 448)}
            value={levelTabs.data.designer}
             params={params} 
          />
          <DetailItem
            // title={localFind("ability to store capacity")}
            title={findByUniqueId(mainData, 449)}
            value={levelTabs.data.store_capacity}
             params={params} 
          />
          <DetailItem
            // title={localFind("gift png file")}
            title={findByUniqueId(mainData, 450)}
            value={levelTabs.data.png_file}
             params={params} 
            isLink
          />
          <DetailItem
            // title={localFind("gift fbx file")}
            title={findByUniqueId(mainData, 451)}
            value={levelTabs.data.fbx_file}
             params={params} 
            isLink
          />
        </div>
      </div>
    </>
  );
}
