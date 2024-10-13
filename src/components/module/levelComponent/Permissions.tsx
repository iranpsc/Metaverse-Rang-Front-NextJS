import { getLevelTabs } from "@/components/utils/actions";
import DetailItem from "@/components/module/levelComponent/DetailItem";

export default async function Permissions({
  params,
  levelsTranslatePage,
  levelId,
}: any) {
  const permissions = await getLevelTabs(params, levelId);
  function localFind(_name: any) {
    return levelsTranslatePage.find((item: any) => item.name == _name)
      ?.translation;
  }
  return (
    <>
      <div className="flex flex-wrap justify-between">
        <DetailItem
          showCheck={true}
          title={localFind("license to establish an alliance")}
          value={permissions.data.create_union}
        />
        <DetailItem
          showCheck={true}
          title={localFind(
            "the ability to register public positions of the level"
          )}
          value={permissions.data.inter_level_general_points}
        />
        <DetailItem
          showCheck={true}
          title={localFind("to join the alliance")}
          value={permissions.data.add_memeber_to_union}
        />
        <DetailItem
          showCheck={true}
          title={localFind(
            "access to the section for answering citizens' questions"
          )}
          value={permissions.data.access_to_answer_questions_unit}
        />
        <DetailItem
          showCheck={true}
          title={localFind("inspection permit")}
          value={permissions.data.observation_license}
        />
        <DetailItem
          showCheck={true}
          title={localFind(
            "the ability to ask questions in the question challenge"
          )}
          value={permissions.data.create_challenge_questions}
        />
        <DetailItem
          showCheck={true}
          title={localFind("gate establishment license")}
          value={permissions.data.gate_license}
        />
        <DetailItem
          showCheck={true}
          title={localFind("the ability to upload music to the waiting list")}
          value={permissions.data.upload_music}
        />
        <DetailItem
          showCheck={true}
          title={localFind("attorney's license")}
          value={permissions.data.lawyer_license}
        />
        <DetailItem
          showCheck={true}
          title={localFind("ability to rent a satisfaction unit")}
          value={permissions.data.rent_out_satisfaction}
        />
        <DetailItem
          showCheck={true}
          title={localFind("permission to enter the city council")}
          value={permissions.data.city_counsile_entry}
        />
        <DetailItem
          showCheck={true}
          title={localFind("ability to enter judgment")}
          value={permissions.data.judge_entry}
        />
        <DetailItem
          showCheck={true}
          title={localFind(
            "license to establish a special residential property"
          )}
          value={permissions.data.establish_special_residential_property}
        />
        <DetailItem
          showCheck={true}
          title={localFind("ability to upload free images")}
          value={permissions.data.upload_image}
        />
        <DetailItem
          showCheck={true}
          title={localFind("property establishment permit on the surface")}
          value={permissions.data.establish_property_on_surface}
        />
        <DetailItem
          showCheck={true}
          title={localFind("ability to delete free images")}
          value={permissions.data.delete_image}
        />
        <DetailItem
          showCheck={true}
          title={localFind("ability to record special level positions")}
          value={permissions.data.inter_level_special_points}
        />
      </div>
    </>
  );
}
