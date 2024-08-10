import  GeneralInfo  from "@/components/module/levelComponent/GeneralInfo";
import  TabSelector  from "@/components/module/levelComponent/TabSelector";
import  Gem  from "@/components/module/levelComponent/Gem";
import  Gift  from "@/components/module/levelComponent/Gift";
import  Permission  from "@/components/module/levelComponent/Permissions";
import  Prize  from "@/components/module/levelComponent/Prize";
import {  getFooterData , getTransletion , getMainFile, } from "@/components/utils/actions";
import DynamicFooter from "@/components/module/footer/DynamicFooter";
import { Features } from "@/components/module/levelComponent/Features";



export default async function lavelSingelPage({
    params,
  }:any) {
    const levelId = params.levelId
    const footerTabs = await getFooterData(params)
    const langData = await getTransletion(params.lang);
    const mainData = await getMainFile(langData)
    const levels = mainData.modals.find((x:any)  => x.name == "levels")
    const levelsTranslatePage =levels.tabs.find((x:any)  => x.name == "levels-page").fields
    async function singleLevel(){
      const res = await fetch(`https://api.rgb.irpsc.com/api/levels/${levelId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      }
      )
      return await res.json();
    }     
    const level = await singleLevel()
    console.log('singel',level);
    
return(<>
        <div className="px-7 w-full font-azarMehr ">
          <div className="flex w-full font-bold sm:w-4/5 py-3 dark:text-white text-lg sm:text-xl lg:text-2xl 2xl:text-3xl 3xl:text-4xl">
            <h1>
              {level.data.name}
            </h1>
          </div>
          <div className=" w-auto dark:bg-[#080807] rounded-[20px] p-3 relative">
            <div className="w-full sm:w-4/5 ">
              <TabSelector params={params} levelsTranslatePage={levelsTranslatePage}/>
            </div>
            {params.tabs == 'general-info' && <GeneralInfo langData={langData} levelsTranslatePage={levelsTranslatePage} params={params}/>}
            {params.tabs == 'gem' && <Gem langData={langData} levelsTranslatePage={levelsTranslatePage} params={params}/>}
            {params.tabs == 'gift' && <Gift langData={langData} levelsTranslatePage={levelsTranslatePage} params={params}/>}
            {params.tabs == 'licenses' && <Permission levelsTranslatePage={levelsTranslatePage} params={params}/>}
            {params.tabs == 'prize' && <Prize levelsTranslatePage={levelsTranslatePage} params={params}/>}
         
          </div>
          <div>
            <Features levelsTranslatePage={levelsTranslatePage}/>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
            <DynamicFooter footerTabs={footerTabs}/>
        </div>
</>)
  }