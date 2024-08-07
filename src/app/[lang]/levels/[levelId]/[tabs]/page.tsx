import  GeneralInfo  from "@/components/module/levelComponent/GeneralInfo";
import  TabSelector  from "@/components/module/levelComponent/TabSelector";
import  Gem  from "@/components/module/levelComponent/Gem";
import  Gift  from "@/components/module/levelComponent/Gift";
import  Permission  from "@/components/module/levelComponent/Permissions";
import  Prize  from "@/components/module/levelComponent/Prize";
import {  getFooterData , getTransletion , getMainFile, } from "@/components/utils/actions";
import DynamicFooter from "@/components/module/footer/DynamicFooter";



export default async function lavelSingelPage({
    params,
  }:any) {
    const footerTabs = await getFooterData(params)
    const langData = await getTransletion(params.lang);
    const mainData = await getMainFile(langData)
    const levels = mainData.modals.find((x:any)  => x.name == "levels")
    const levelsTranslatePage =levels.tabs.find((x:any)  => x.name == "levels-page").fields
    console.log('levelsTranslatePage',levelsTranslatePage);
    

return(<>
        <div className="px-7 w-full font-azarMehr">
          <div className=" w-auto dark:bg-[#080807] rounded-[20px] p-3">
            <div className="w-4/5 ">
              <TabSelector params={params} levelsTranslatePage={levelsTranslatePage}/>
            </div>
            {params.tabs == 'general-info' && <GeneralInfo levelsTranslatePage={levelsTranslatePage} params={params}/>}
            {params.tabs == 'gem' && <Gem levelsTranslatePage={levelsTranslatePage} params={params}/>}
            {params.tabs == 'gift' && <Gift levelsTranslatePage={levelsTranslatePage} params={params}/>}
            {params.tabs == 'licenses' && <Permission levelsTranslatePage={levelsTranslatePage} params={params}/>}
            {params.tabs == 'prize' && <Prize levelsTranslatePage={levelsTranslatePage} params={params}/>}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
            <DynamicFooter footerTabs={footerTabs}/>
        </div>
</>)
  }