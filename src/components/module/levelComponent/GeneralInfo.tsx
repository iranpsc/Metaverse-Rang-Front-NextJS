import { getLevelTabs } from "@/components/utils/actions"
import DetailItem from "@/components/module/levelComponent/DetailItem";
import { targetData } from "@/components/utils/targetDataName";
import Accordion from "@/components/module/levelComponent/Accordion";

export default async function GeneralInfo({params,levelsTranslatePage}:any){
const generalInfo = await getLevelTabs(params)
console.log('generalInfo----------1',generalInfo);

    return(<>
    <div className="w-full sm:w-4/5 flex flex-wrap justify-between">
    <Accordion title={targetData(levelsTranslatePage,"description")} value={generalInfo.data.description}/>
    <DetailItem  title={targetData(levelsTranslatePage,"required points")} value={generalInfo.data.score.toLocaleString()} />
    <DetailItem  title={targetData(levelsTranslatePage,"surface model file size")} value={generalInfo.data.file_volume} />
    <DetailItem  title={targetData(levelsTranslatePage,"level rank")} value={generalInfo.data.rank} />
    <DetailItem  title={targetData(levelsTranslatePage,"the number of points used in the level model")} value={generalInfo.data.points.toLocaleString()} />
    <DetailItem  title={targetData(levelsTranslatePage,"number of sub-branches")} value={generalInfo.data.subcategories} />
    <DetailItem  title={targetData(levelsTranslatePage,"number of surface model lines")} value={generalInfo.data.lines.toLocaleString()} />
    <DetailItem  title={targetData(levelsTranslatePage,"level creation date")} value={generalInfo.data.creation_date} />
    <DetailItem  title={targetData(levelsTranslatePage,"animation")} value={generalInfo.data.has_animation} />
    <DetailItem  title={targetData(levelsTranslatePage,"persian font used")} value={generalInfo.data.persian_font} />
    <DetailItem  title={targetData(levelsTranslatePage,"surface designer")} value={generalInfo.data.designer} />
    <DetailItem  title={targetData(levelsTranslatePage,"english font used")} value={generalInfo.data.english_font} />
    <DetailItem  title={targetData(levelsTranslatePage,"3d model designer")} value={generalInfo.data.model_designer} />
    <DetailItem fullBox={true} title={targetData(levelsTranslatePage,"colors used")} value={generalInfo.data.used_colors} />
    </div>
    
    </>)
}