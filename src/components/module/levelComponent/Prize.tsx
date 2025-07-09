import DetailItem from "@/components/module/levelComponent/DetailItem";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

export default async function Prize({
  params,
  mainData,
  levelsTranslatePage,
  levelTabs,
  singleLevel,
  concatArrayContent,
}: any) {
  // function localFind(_name: any) {
  //   return levelsTranslatePage.find((item: any) => item.name == _name)
  //     ?.translation;
  // }
  // function localFind2(_slug: any) {
  //   // HIN not good
  //   //item.name and _slug have fa/en number string
  //   //convert

  //   return concatArrayContent.find(
  //     (item: any) => Number(item.name) == Number(_slug)
  //   )?.translation;
  // }

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
    name: findByUniqueId(mainData, singleLevel.data.unique_id),
    // https://api.rgb.irpsc.com/api/levels/1
    description: await makeLessCharacter(
      singleLevel.data.general_info.description
    ),
    itemListElement: [
      {
        "@type": "ListItem",
        url: `https://rgb.irpsc.com/${params.lang}/levels/citizen/${params.levelName}/general-info`,
        position: 5,
        // name: await targetData(levelsTranslatePage, "reward for reaching the level"),
        name: findByUniqueId(mainData, 391),
        additionalProperty: [
          {
            "@type": "PropertyValue",
            // name: localFind("get psc"),
            name: findByUniqueId(mainData, 902),
            value: levelTabs.data.psc,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("get red color"),
            name: findByUniqueId(mainData, 50),
            value: levelTabs.data.blue,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("get blue color"),
            name: findByUniqueId(mainData, 452),
            value: levelTabs.data.blue,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("satisfaction unit"),
            name: findByUniqueId(mainData, 453),
            value: levelTabs.data.satisfaction,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("receive yellow color"),
            name: findByUniqueId(mainData, 454),
            value: levelTabs.data.yellow,
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
      <div className="flex flex-wrap justify-between">
        <DetailItem
          // title={localFind("get psc")}
          title={findByUniqueId(mainData, 902)}
          value={levelTabs.data.psc}
          params={params}
          mainData={mainData}

        />
        <DetailItem
          // title={localFind("get red color")}
          title={findByUniqueId(mainData, 50)}
          value={levelTabs.data.red}
          params={params}
          mainData={mainData}
        />
        <DetailItem
          // title={localFind("get blue color")}
          title={findByUniqueId(mainData, 452)}
          value={levelTabs.data.blue}
          params={params}
          mainData={mainData}
        />
        <DetailItem
          // title={localFind("satisfaction unit")}
          title={findByUniqueId(mainData, 453)}
          value={levelTabs.data.satisfaction}
          params={params}
          mainData={mainData}
        />
        <DetailItem
          // title={localFind("receive yellow color")}
          title={findByUniqueId(mainData, 454)}
          value={levelTabs.data.yellow}
          params={params}
          mainData={mainData}
        />
      </div>
    </>
  );
}
