import { getLevelTabs } from "@/components/utils/actions"
import DetailItem from "@/components/module/levelComponent/DetailItem";
import { targetData } from "@/components/utils/targetDataName";
import Accordion from "@/components/module/levelComponent/Accordion";

export default async function Gift({params,levelsTranslatePage}:any){
const gift = await getLevelTabs(params)
console.log('gift----------1',gift);

    return(<>
    <div className="w-4/5 flex flex-wrap justify-between">
    <Accordion title={targetData(levelsTranslatePage,"description")} value={gift.data.description}/>
    <Accordion title={targetData(levelsTranslatePage,"features of mobile gift")} value={gift.data.features}/>
    <DetailItem  title={targetData(levelsTranslatePage,"number of monthly capacity")} value={gift.data.monthly_capacity_count} />
    <DetailItem  title={targetData(levelsTranslatePage,"ability to sell capacity")} value={gift.data.sell_capacity} />
    <DetailItem  title={targetData(levelsTranslatePage,"the volume of the 3d model of the gift")} value={gift.data.three_d_model_volume} />
    <DetailItem  title={targetData(levelsTranslatePage,"ability to sell bundled gifts")} value={gift.data.sell} />
    <DetailItem  title={targetData(levelsTranslatePage,"the number of points of the accompanying gift model")} value={gift.data.three_d_model_points} />
    <DetailItem  title={targetData(levelsTranslatePage,"ability to rent accompanying gift")} value={gift.data.rent} />
    <DetailItem  title={targetData(levelsTranslatePage,"the number of lines of the accompanying gift model")} value={gift.data.three_d_model_lines} />
    <DetailItem  title={targetData(levelsTranslatePage,"access link to mobile gift sellers")} isLink={true} value={gift.data.seller_link} />
    <DetailItem  title={targetData(levelsTranslatePage,"animation")} value={gift.data.has_animation} />
    <DetailItem  title={targetData(levelsTranslatePage,"gift designer")} value={gift.data.designer} />
    <DetailItem  title={targetData(levelsTranslatePage,"ability to store capacity")} value={gift.data.store_capacity} />
    <DetailItem  title={targetData(levelsTranslatePage,"gift png file")} value={gift.data.png_file} />
    <DetailItem  title={targetData(levelsTranslatePage,"gift fbx file")} value={gift.data.fbx_file} />
 
    </div>
    </>)
}