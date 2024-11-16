import DetailItem from "@/components/module/levelComponent/DetailItem";
import { targetData } from "@/components/utils/targetDataName";

export default async function Permissions({
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
        position: 2,
        name: await targetData(levelsTranslatePage, "basic level information"),
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: localFind("license to establish an alliance"),
            value: levelTabs.data.create_union,
          },
          {
            "@type": "PropertyValue",
            name: localFind(
              "the ability to register public positions of the level"
            ),
            value: levelTabs.data.inter_level_general_points,
          },
          {
            "@type": "PropertyValue",
            name: localFind("to join the alliance"),
            value: levelTabs.data.add_memeber_to_union,
          },
          {
            "@type": "PropertyValue",
            name: localFind(
              "access to the section for answering citizens' questions"
            ),
            value: levelTabs.data.access_to_answer_questions_unit,
          },
          {
            "@type": "PropertyValue",
            name: localFind("inspection permit"),
            value: levelTabs.data.observation_license,
          },
          {
            "@type": "PropertyValue",
            name: localFind(
              "the ability to ask questions in the question challenge"
            ),
            value: levelTabs.data.create_challenge_questions,
          },
          {
            "@type": "PropertyValue",
            name: localFind("gate establishment license"),
            value: levelTabs.data.gate_license,
          },
          {
            "@type": "PropertyValue",
            name: localFind("the ability to upload music to the waiting list"),
            value: levelTabs.data.upload_music,
          },
          {
            "@type": "PropertyValue",
            name: localFind("attorney's license"),
            value: levelTabs.data.lawyer_license,
          },
          {
            "@type": "PropertyValue",
            name: localFind("ability to rent a satisfaction unit"),
            value: levelTabs.data.rent_out_satisfaction,
          },
          {
            "@type": "PropertyValue",
            name: localFind("permission to enter the city council"),
            value: levelTabs.data.city_counsile_entry,
          },
          {
            "@type": "PropertyValue",
            name: localFind("ability to enter judgment"),
            value: levelTabs.data.judge_entry,
          },
          {
            "@type": "PropertyValue",
            name: localFind(
              "license to establish a special residential property"
            ),
            value: levelTabs.data.establish_special_residential_property,
          },
          {
            "@type": "PropertyValue",
            name: localFind("ability to upload free images"),
            value: levelTabs.data.upload_image,
          },
          {
            "@type": "PropertyValue",
            name: localFind("property establishment permit on the surface"),
            value: levelTabs.data.establish_property_on_surface,
          },
          {
            "@type": "PropertyValue",
            name: localFind("ability to delete free images"),
            value: levelTabs.data.delete_image,
          },
          {
            "@type": "PropertyValue",
            name: localFind("ability to record special level positions"),
            value: levelTabs.data.inter_level_special_points,
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
        <DetailItem
          showCheck={true}
          title={localFind("license to establish an alliance")}
          value={levelTabs.data.create_union}
        />
        <DetailItem
          showCheck={true}
          title={localFind(
            "the ability to register public positions of the level"
          )}
          value={levelTabs.data.inter_level_general_points}
        />
        <DetailItem
          showCheck={true}
          title={localFind("to join the alliance")}
          value={levelTabs.data.add_memeber_to_union}
        />
        <DetailItem
          showCheck={true}
          title={localFind(
            "access to the section for answering citizens' questions"
          )}
          value={levelTabs.data.access_to_answer_questions_unit}
        />
        <DetailItem
          showCheck={true}
          title={localFind("inspection permit")}
          value={levelTabs.data.observation_license}
        />
        <DetailItem
          showCheck={true}
          title={localFind(
            "the ability to ask questions in the question challenge"
          )}
          value={levelTabs.data.create_challenge_questions}
        />
        <DetailItem
          showCheck={true}
          title={localFind("gate establishment license")}
          value={levelTabs.data.gate_license}
        />
        <DetailItem
          showCheck={true}
          title={localFind("the ability to upload music to the waiting list")}
          value={levelTabs.data.upload_music}
        />
        <DetailItem
          showCheck={true}
          title={localFind("attorney's license")}
          value={levelTabs.data.lawyer_license}
        />
        <DetailItem
          showCheck={true}
          title={localFind("ability to rent a satisfaction unit")}
          value={levelTabs.data.rent_out_satisfaction}
        />
        <DetailItem
          showCheck={true}
          title={localFind("permission to enter the city council")}
          value={levelTabs.data.city_counsile_entry}
        />
        <DetailItem
          showCheck={true}
          title={localFind("ability to enter judgment")}
          value={levelTabs.data.judge_entry}
        />
        <DetailItem
          showCheck={true}
          title={localFind(
            "license to establish a special residential property"
          )}
          value={levelTabs.data.establish_special_residential_property}
        />
        <DetailItem
          showCheck={true}
          title={localFind("ability to upload free images")}
          value={levelTabs.data.upload_image}
        />
        <DetailItem
          showCheck={true}
          title={localFind("property establishment permit on the surface")}
          value={levelTabs.data.establish_property_on_surface}
        />
        <DetailItem
          showCheck={true}
          title={localFind("ability to delete free images")}
          value={levelTabs.data.delete_image}
        />
        <DetailItem
          showCheck={true}
          title={localFind("ability to record special level positions")}
          value={levelTabs.data.inter_level_special_points}
        />
      </div>
    </>
  );
}
