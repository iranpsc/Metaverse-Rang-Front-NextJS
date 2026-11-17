import DetailItem from "@/components/ui/DetailItem";
import Accordion from "@/components/ui/Accordion/Accordion";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

export default async function Gift({
  mainData,
  // levelsTranslatePage,
  levelTabs,
  params,
}: any) {
  // function localFind(_name: any) {
  //   return levelsTranslatePage.find((item: any) => item.name == _name)
  //     ?.translation;
  // }

  return (
    <>
      <div className="w-full flex flex-col-reverse sm:flex-row flex-nowrap">
        <div className="w-full flex flex-wrap justify-between">
          <Accordion
            // title={localFind("description")}
            title={findByUniqueId(mainData, 164)}
            value={levelTabs.data.description}
          />
          <Accordion
            // title={localFind("features of mobile gift")}
            title={findByUniqueId(mainData, 439)}
            value={levelTabs.data.features}
          />
          <DetailItem
            // title={localFind("number of monthly capacity")}
            title={findByUniqueId(mainData, 440)}
            value={levelTabs.data.monthly_capacity_count}
             params={params} 
          />
          <DetailItem
            // title={localFind("ability to sell capacity")}
            title={findByUniqueId(mainData, 441)}
            value={levelTabs.data.sell_capacity}
             params={params} 
          />
          <DetailItem
            // title={localFind("the volume of the 3d model of the gift")}
            title={findByUniqueId(mainData, 442)}
            value={levelTabs.data.three_d_model_volume}
             params={params} 
          />
          <DetailItem
            // title={localFind("ability to sell bundled gifts")}
            title={findByUniqueId(mainData, 443)}
            value={levelTabs.data.sell}
             params={params} 
          />
          <DetailItem
            // title={localFind(
            //   "the number of points of the accompanying gift model"
            // )}
            title={findByUniqueId(mainData, 444)}
            value={levelTabs.data.three_d_model_points}
             params={params} 
          />
          <DetailItem
            // title={localFind("ability to rent accompanying gift")}
            title={findByUniqueId(mainData, 445)}
            value={levelTabs.data.rent}
             params={params} 
          />
          <DetailItem
            // title={localFind(
            //   "the number of lines of the accompanying gift model"
            // )}
            title={findByUniqueId(mainData, 446)}
            value={levelTabs.data.three_d_model_lines}
             params={params} 
          />
          <DetailItem
            // title={localFind("access link to mobile gift sellers")}
            title={findByUniqueId(mainData, 447)}
            isLink={true}
            value={levelTabs.data.seller_link}
             params={params} 
          />
          <DetailItem
            // title={localFind("animation")}
            title={findByUniqueId(mainData, 400)}
            value={levelTabs.data.has_animation}
             params={params} 
          />
          <DetailItem
            // title={localFind("gift designer")}
            title={findByUniqueId(mainData, 448)}
            value={levelTabs.data.designer}
             params={params} 
          />
          <DetailItem
            // title={localFind("ability to store capacity")}
            title={findByUniqueId(mainData, 449)}
            value={levelTabs.data.store_capacity}
             params={params} 
          />
          <DetailItem
            // title={localFind("gift png file")}
            title={findByUniqueId(mainData, 450)}
            value={levelTabs.data.png_file}
             params={params} 
            isLink
          />
          <DetailItem
            // title={localFind("gift fbx file")}
            title={findByUniqueId(mainData, 451)}
            value={levelTabs.data.fbx_file}
             params={params} 
            isLink
          />
        </div>
      </div>
    </>
  );
}
