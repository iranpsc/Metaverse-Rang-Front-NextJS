import DetailItem from "@/components/module/levelComponent/DetailItem";
import { targetData } from "@/components/utils/targetDataName";

export default async function Prize({
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

    console.log("_slug", Number(_slug));
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
        position: 5,
        name: await targetData(levelsTranslatePage, "basic level information"),
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: localFind("get psc"),
            value: levelTabs.data.psc,
          },
          {
            "@type": "PropertyValue",
            name: localFind("get red color"),
            value: levelTabs.data.blue,
          },
          {
            "@type": "PropertyValue",
            name: localFind("get blue color"),
            value: levelTabs.data.blue,
          },
          {
            "@type": "PropertyValue",
            name: localFind("satisfaction unit"),
            value: levelTabs.data.satisfaction,
          },
          {
            "@type": "PropertyValue",
            name: localFind("receive yellow color"),
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
        <DetailItem title={localFind("get psc")} value={levelTabs.data.psc} />
        <DetailItem
          title={localFind("get red color")}
          value={levelTabs.data.red}
        />
        <DetailItem
          title={localFind("get blue color")}
          value={levelTabs.data.blue}
        />
        <DetailItem
          title={localFind("satisfaction unit")}
          value={levelTabs.data.satisfaction}
        />
        <DetailItem
          title={localFind("receive yellow color")}
          value={levelTabs.data.yellow}
        />
      </div>
    </>
  );
}
