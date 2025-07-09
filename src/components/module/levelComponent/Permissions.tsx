import DetailItem from "@/components/module/levelComponent/DetailItem";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

export default async function Permissions({
  // levelsTranslatePage,
  mainData,
  levelTabs,
  singleLevel,
  params,
}: any) {
  // function localFind(_name: any) {
  //   return levelsTranslatePage.find((item: any) => item.name == _name)
  //     ?.translation;
  // }

  // function localFind2(_slug: any) {
  //   // HIN not good
  //   //item.name and _slug have fa/en number string
  //   //convert
  //   let temp = concatArrayContent.find(
  //     (item: any) => Number(item.unique_id) == Number(_slug)
  //   );
  //   return temp?.translation;
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
    // name: await localFind2(singleLevel.data.unique_id),
    name: findByUniqueId(mainData, singleLevel.data.unique_id),
    // https://api.rgb.irpsc.com/api/levels/1
    description: await makeLessCharacter(
      singleLevel.data.general_info.description
    ),
    itemListElement: [
      {
        "@type": "ListItem",
        url: `https://rgb.irpsc.com/${params.lang}/levels/citizen/${params.levelName}/general-info`,
        position: 2,
        // name: await targetData(levelsTranslatePage, "permissions and access"),
        name: findByUniqueId(mainData, 388),

        additionalProperty: [
          {
            "@type": "PropertyValue",
            // name: localFind("license to establish an alliance"),
            name: findByUniqueId(mainData, 413),
            value: levelTabs.data.create_union,
          },
          {
            "@type": "PropertyValue",
            // name: localFind(
            //   "the ability to register public positions of the level"
            // ),
            name: findByUniqueId(mainData, 414),
            value: levelTabs.data.inter_level_general_points,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("to join the alliance"),
            name: findByUniqueId(mainData, 415),
            value: levelTabs.data.add_memeber_to_union,
          },
          {
            "@type": "PropertyValue",
            // name: localFind(
            //   "access to the section for answering citizens' questions"
            // ),
            name: findByUniqueId(mainData, 416),
            value: levelTabs.data.access_to_answer_questions_unit,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("inspection permit"),
            name: findByUniqueId(mainData, 417),
            value: levelTabs.data.observation_license,
          },
          {
            "@type": "PropertyValue",
            // name: localFind(
            //   "the ability to ask questions in the question challenge"
            // ),
            name: findByUniqueId(mainData, 418),
            value: levelTabs.data.create_challenge_questions,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("gate establishment license"),
            name: findByUniqueId(mainData, 419),
            value: levelTabs.data.gate_license,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("the ability to upload music to the waiting list"),
            name: findByUniqueId(mainData, 420),
            value: levelTabs.data.upload_music,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("attorney's license"),
            name: findByUniqueId(mainData, 421),
            value: levelTabs.data.lawyer_license,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("ability to rent a satisfaction unit"),
            name: findByUniqueId(mainData, 422),
            value: levelTabs.data.rent_out_satisfaction,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("permission to enter the city council"),
            name: findByUniqueId(mainData, 423),
            value: levelTabs.data.city_counsile_entry,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("ability to enter judgment"),
            name: findByUniqueId(mainData, 424),
            value: levelTabs.data.judge_entry,
          },
          {
            "@type": "PropertyValue",
            // name: localFind(
            //   "license to establish a special residential property"
            // ),
            name: findByUniqueId(mainData, 425),
            value: levelTabs.data.establish_special_residential_property,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("ability to upload free images"),
            name: findByUniqueId(mainData, 426),
            value: levelTabs.data.upload_image,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("property establishment permit on the surface"),
            name: findByUniqueId(mainData, 427),
            value: levelTabs.data.establish_property_on_surface,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("ability to delete free images"),
            name: findByUniqueId(mainData, 428),
            value: levelTabs.data.delete_image,
          },
          {
            "@type": "PropertyValue",
            // name: localFind("ability to record special level positions"),
            name: findByUniqueId(mainData, 429),
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
          // title={localFind("license to establish an alliance")}
          title={findByUniqueId(mainData, 413)}
          value={levelTabs.data.create_union}
          params={params}
          mainData={mainData}
        />
        <DetailItem
          showCheck={true}
          // title={localFind(
          //   "the ability to register public positions of the level"
          // )}
          title={findByUniqueId(mainData, 414)}
          value={levelTabs.data.inter_level_general_points}
          params={params}
          mainData={mainData}
        />
        <DetailItem
          showCheck={true}
          // title={localFind("to join the alliance")}
          title={findByUniqueId(mainData, 415)}
          value={levelTabs.data.add_memeber_to_union}
          params={params}
          mainData={mainData}
        />
        <DetailItem
          showCheck={true}
          // title={localFind(
          //   "access to the section for answering citizens' questions"
          // )}
          title={findByUniqueId(mainData, 416)}
          value={levelTabs.data.access_to_answer_questions_unit}
          params={params}
          mainData={mainData}
        />
        <DetailItem
          showCheck={true}
          // title={localFind("inspection permit")}
          title={findByUniqueId(mainData, 417)}
          value={levelTabs.data.observation_license}
          params={params}
          mainData={mainData}
        />
        <DetailItem
          showCheck={true}
          // title={localFind(
          //   "the ability to ask questions in the question challenge"
          // )}
          title={findByUniqueId(mainData, 418)}
          value={levelTabs.data.create_challenge_questions}
          params={params}
          mainData={mainData}
        />
        <DetailItem
          showCheck={true}
          // title={localFind("gate establishment license")}
          title={findByUniqueId(mainData, 419)}
          value={levelTabs.data.gate_license}
          params={params}
          mainData={mainData}
        />
        <DetailItem
          showCheck={true}
          // title={localFind("the ability to upload music to the waiting list")}
          title={findByUniqueId(mainData, 420)}
          value={levelTabs.data.upload_music}
          params={params}
          mainData={mainData}
        />
        <DetailItem
          showCheck={true}
          // title={localFind("attorney's license")}
          title={findByUniqueId(mainData, 421)}
          value={levelTabs.data.lawyer_license}
          params={params}
          mainData={mainData}
        />
        <DetailItem
          showCheck={true}
          // title={localFind("ability to rent a satisfaction unit")}
          title={findByUniqueId(mainData, 422)}
          value={levelTabs.data.rent_out_satisfaction}
          params={params}
          mainData={mainData}
        />
        <DetailItem
          showCheck={true}
          // title={localFind("permission to enter the city council")}
          title={findByUniqueId(mainData, 423)}
          value={levelTabs.data.city_counsile_entry}
          params={params}
          mainData={mainData}
        />
        <DetailItem
          showCheck={true}
          // title={localFind("ability to enter judgment")}
          title={findByUniqueId(mainData, 424)}
          value={levelTabs.data.judge_entry}
          params={params}
          mainData={mainData}
        />
        <DetailItem
          showCheck={true}
          // title={localFind(
          //   "license to establish a special residential property"
          // )}
          title={findByUniqueId(mainData, 425)}
          value={levelTabs.data.establish_special_residential_property}
          params={params}
          mainData={mainData}
        />
        <DetailItem
          showCheck={true}
          // title={localFind("ability to upload free images")}
          title={findByUniqueId(mainData, 426)}
          value={levelTabs.data.upload_image}
          params={params}
          mainData={mainData}
        />
        <DetailItem
          showCheck={true}
          // title={localFind("property establishment permit on the surface")}
          title={findByUniqueId(mainData, 427)}
          value={levelTabs.data.establish_property_on_surface}
          params={params}
          mainData={mainData}
        />
        <DetailItem
          showCheck={true}
          // title={localFind("ability to delete free images")}
          title={findByUniqueId(mainData, 428)}
          value={levelTabs.data.delete_image}
          params={params}
          mainData={mainData}
        />
        <DetailItem
          showCheck={true}
          // title={localFind("ability to record special level positions")}
          title={findByUniqueId(mainData, 429)}
          value={levelTabs.data.inter_level_special_points}
          params={params}
          mainData={mainData}
        />
      </div>
    </>
  );
}
