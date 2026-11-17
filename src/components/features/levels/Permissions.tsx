import DetailItem from "@/components/ui/DetailItem";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

export default async function Permissions({
  // levelsTranslatePage,
  mainData,
  levelTabs,
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

  return (
    <>
      <div className="w-full flex flex-wrap justify-between">
        <DetailItem
          showCheck={true}
          // title={localFind("license to establish an alliance")}
          title={findByUniqueId(mainData, 413)}
          value={levelTabs.data.create_union}
        />
        <DetailItem
          showCheck={true}
          // title={localFind(
          //   "the ability to register public positions of the level"
          // )}
          title={findByUniqueId(mainData, 414)}
          value={levelTabs.data.inter_level_general_points}
        />
       
        <DetailItem
          showCheck={true}
          // title={localFind(
          //   "access to the section for answering citizens' questions"
          // )}
          title={findByUniqueId(mainData, 416)}
          value={levelTabs.data.access_to_answer_questions_unit}
        />
        <DetailItem
          showCheck={true}
          // title={localFind("inspection permit")}
          title={findByUniqueId(mainData, 417)}
          value={levelTabs.data.observation_license}
        />
        <DetailItem
          showCheck={true}
          // title={localFind(
          //   "the ability to ask questions in the question challenge"
          // )}
          title={findByUniqueId(mainData, 418)}
          value={levelTabs.data.create_challenge_questions}
        />
        <DetailItem
          showCheck={true}
          // title={localFind("gate establishment license")}
          title={findByUniqueId(mainData, 419)}
          value={levelTabs.data.gate_license}
        />
        <DetailItem
          showCheck={true}
          // title={localFind("the ability to upload music to the waiting list")}
          title={findByUniqueId(mainData, 420)}
          value={levelTabs.data.upload_music}
        />
        <DetailItem
          showCheck={true}
          // title={localFind("attorney's license")}
          title={findByUniqueId(mainData, 421)}
          value={levelTabs.data.lawyer_license}
        />
        <DetailItem
          showCheck={true}
          // title={localFind("ability to rent a satisfaction unit")}
          title={findByUniqueId(mainData, 422)}
          value={levelTabs.data.rent_out_satisfaction}
        />
        <DetailItem
          showCheck={true}
          // title={localFind("permission to enter the city council")}
          title={findByUniqueId(mainData, 423)}
          value={levelTabs.data.city_counsile_entry}
        />
        <DetailItem
          showCheck={true}
          // title={localFind("ability to enter judgment")}
          title={findByUniqueId(mainData, 424)}
          value={levelTabs.data.judge_entry}
        />
        <DetailItem
          showCheck={true}
          // title={localFind(
          //   "license to establish a special residential property"
          // )}
          title={findByUniqueId(mainData, 425)}
          value={levelTabs.data.establish_special_residential_property}
        />
        <DetailItem
          showCheck={true}
          // title={localFind("ability to upload free images")}
          title={findByUniqueId(mainData, 426)}
          value={levelTabs.data.upload_image}
        />
        <DetailItem
          showCheck={true}
          // title={localFind("property establishment permit on the surface")}
          title={findByUniqueId(mainData, 427)}
          value={levelTabs.data.establish_property_on_surface}
        />
        <DetailItem
          showCheck={true}
          // title={localFind("ability to delete free images")}
          title={findByUniqueId(mainData, 428)}
          value={levelTabs.data.delete_image}
        />
        <DetailItem
          showCheck={true}
          // title={localFind("ability to record special level positions")}
          title={findByUniqueId(mainData, 429)}
          value={levelTabs.data.inter_level_special_points}
        />
      </div>
    </>
  );
}
