import { getLevelTabs } from "@/components/utils/actions"
import DetailItem from "@/components/module/levelComponent/Detailtem";
import { targetData } from "@/components/utils/targetDataName";


export default async function GeneralInfo({params,levelsTranslatePage}:any){
const generalInfo = await getLevelTabs(params)
console.log('generalInfo----------1',generalInfo);

    return(<>General Info
    <div className="flex flex-wrap justify-between">
    <DetailItem sizeBox="w-full sm:w-[48%]" title={targetData(levelsTranslatePage,"required points")} value={generalInfo.data.score.toLocaleString()} />
    <DetailItem sizeBox="w-full sm:w-[48%]" title={targetData(levelsTranslatePage,"surface model file size")} value={generalInfo.data.file_volume} />
    <DetailItem sizeBox="w-full sm:w-[48%]" title={targetData(levelsTranslatePage,"level rank")} value={generalInfo.data.rank} />
    <DetailItem sizeBox="w-full sm:w-[48%]" title={targetData(levelsTranslatePage,"the number of points used in the level model")} value={generalInfo.data.points.toLocaleString()} />
    <DetailItem sizeBox="w-full sm:w-[48%]" title={targetData(levelsTranslatePage,"number of sub-branches")} value={generalInfo.data.subcategories} />
    <DetailItem sizeBox="w-full sm:w-[48%]" title={targetData(levelsTranslatePage,"number of surface model lines")} value={generalInfo.data.lines.toLocaleString()} />
    <DetailItem sizeBox="w-full sm:w-[48%]" title={targetData(levelsTranslatePage,"level creation date")} value={generalInfo.data.creation_date} />
    <DetailItem sizeBox="w-full sm:w-[48%]" title={targetData(levelsTranslatePage,"animation")} value={generalInfo.data.has_animation} />
    <DetailItem sizeBox="w-full sm:w-[48%]" title={targetData(levelsTranslatePage,"persian font used")} value={generalInfo.data.persian_font} />
    <DetailItem sizeBox="w-full sm:w-[48%]" title={targetData(levelsTranslatePage,"surface designer")} value={generalInfo.data.designer} />
    <DetailItem sizeBox="w-full sm:w-[48%]" title={targetData(levelsTranslatePage,"english font used")} value={generalInfo.data.english_font} />
    <DetailItem sizeBox="w-full sm:w-[48%]" title={targetData(levelsTranslatePage,"3d model designer")} value={generalInfo.data.model_designer} />
    <DetailItem sizeBox="w-full" title={targetData(levelsTranslatePage,"colors used")} value={generalInfo.data.used_colors} />
    </div>
    </>)
}