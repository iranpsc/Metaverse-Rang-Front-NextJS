import { getLevelTabs } from "@/components/utils/actions"
import DetailItem from "@/components/module/levelComponent/DetailItem";
import { targetData } from "@/components/utils/targetDataName";
import Accordion from "@/components/module/levelComponent/Accordion";
import ImageBox from "@/components/module/levelComponent/ImageBox";

export default async function Gem({params,levelsTranslatePage ,langData}:any){
const gem = await getLevelTabs(params)
console.log('gem----------1',gem);

    return(<>
      <div className="flex flex-col-reverse sm:flex-row flex-wrap">
        <div className="w-full sm:w-4/5 flex flex-wrap justify-between">
        <Accordion title={targetData(levelsTranslatePage,"description")} value={gem.data.description}/>
        <DetailItem  title={targetData(levelsTranslatePage,"gem chip")} value={gem.data.thread} />
        <DetailItem  title={targetData(levelsTranslatePage,"gem color")} value={gem.data.color} />
        <DetailItem  title={targetData(levelsTranslatePage,"the volume of the 3d stone model")} value={gem.data.volume} />
        <DetailItem  title={targetData(levelsTranslatePage,"gem png file")} value={''} />
        <DetailItem  title={targetData(levelsTranslatePage,"the number of points of the 3d stone model")} value={gem.data.subcategories} />
        <DetailItem  title={targetData(levelsTranslatePage,"gem fbx file")} value={''} />
        <DetailItem  title={targetData(levelsTranslatePage,"the number of lines of the 3d stone model")} value={gem.data.lines} />
        <DetailItem  title={targetData(levelsTranslatePage,"central encryption")} value={gem.data.encryption} />
        <DetailItem  title={targetData(levelsTranslatePage,"animation")} value={gem.data.has_animation} />
        <DetailItem  title={targetData(levelsTranslatePage,"gem designer")} value={gem.data.designer} />
    
        </div>
       
        <ImageBox item={gem.data} langData={langData}/>
        
    </div>
   
    </>)
}