import { getLevelTabs } from "@/components/utils/actions"
import DetailItem from "@/components/module/levelComponent/DetailItem";
import { targetData } from "@/components/utils/targetDataName";


export default async function Permissions({params,levelsTranslatePage}:any){
const permissions = await getLevelTabs(params)
console.log('permissions----------1',permissions);

    return(<>
    <div className="w-full sm:w-4/5 flex flex-wrap justify-between">
    <DetailItem showCheck={true}  title={targetData(levelsTranslatePage,"license to establish an alliance")} value={permissions.data.create_union} />
    <DetailItem showCheck={true}  title={targetData(levelsTranslatePage,"the ability to register public positions of the level")} value={permissions.data.inter_level_general_points} />
    <DetailItem showCheck={true}  title={targetData(levelsTranslatePage,"to join the alliance")} value={permissions.data.add_memeber_to_union} />
    <DetailItem showCheck={true}  title={targetData(levelsTranslatePage,"access to the section for answering citizens' questions")} value={permissions.data.access_to_answer_questions_unit} />
    <DetailItem showCheck={true}  title={targetData(levelsTranslatePage,"inspection permit")} value={permissions.data.observation_license} />
    <DetailItem showCheck={true}  title={targetData(levelsTranslatePage,"the ability to ask questions in the question challenge")} value={permissions.data.create_challenge_questions} />
    <DetailItem showCheck={true}  title={targetData(levelsTranslatePage,"gate establishment license")} value={permissions.data.gate_license} />
    <DetailItem showCheck={true}  title={targetData(levelsTranslatePage,"the ability to upload music to the waiting list")} value={permissions.data.upload_music} />
    <DetailItem showCheck={true}  title={targetData(levelsTranslatePage,"attorney's license")} value={permissions.data.lawyer_license} />
    <DetailItem showCheck={true}  title={targetData(levelsTranslatePage,"ability to rent a satisfaction unit")} value={permissions.data.rent_out_satisfaction} />
    <DetailItem showCheck={true}  title={targetData(levelsTranslatePage,"permission to enter the city council")} value={permissions.data.city_counsile_entry} />
    <DetailItem showCheck={true}  title={targetData(levelsTranslatePage,"ability to enter judgment")} value={permissions.data.judge_entry} />
    <DetailItem showCheck={true}  title={targetData(levelsTranslatePage,"license to establish a special residential property")} value={permissions.data.establish_special_residential_property} />
    <DetailItem showCheck={true}  title={targetData(levelsTranslatePage,"ability to upload free images")} value={permissions.data.upload_image} />
    <DetailItem showCheck={true}  title={targetData(levelsTranslatePage,"property establishment permit on the surface")} value={permissions.data.establish_property_on_surface} />
    <DetailItem showCheck={true}  title={targetData(levelsTranslatePage,"ability to delete free images")} value={permissions.data.delete_image} />
    <DetailItem showCheck={true}  title={targetData(levelsTranslatePage,"ability to record special level positions")} value={permissions.data.inter_level_special_points} />
    </div>
    </>)
}