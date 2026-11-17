import DetailItem from "@/components/ui/DetailItem";
import Accordion from "@/components/ui/Accordion/Accordion";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

export default async function Gem({
  mainData,
  levelTabs,
  params,
}: any) {
  // function localFind(_name: any) {
  //   return levelsTranslatePage.find((item: any) => item.name == _name)
  //     ?.translation;
  // }
  return (
    <>
      <div className="w-full flex flex-col-reverse sm:flex-row flex-wrap">
        <div className="w-full flex flex-wrap justify-between">
          <Accordion
            // title={localFind("description")}
            title={findByUniqueId(mainData, 164)}
            value={levelTabs.data.description}
          />
          <DetailItem
            // title={localFind("gem chip")}
            title={findByUniqueId(mainData, 430)}
            value={levelTabs.data.thread}
            params={params}
          />
          <DetailItem
            // title={localFind("gem color")}
            title={findByUniqueId(mainData, 431)}
            value={levelTabs.data.color}
            params={params}
          />
          <DetailItem
            // title={localFind("the volume of the 3d stone model")}
            title={findByUniqueId(mainData, 432)}
            value={levelTabs.data.volume}
            params={params}
          />
          <DetailItem
            // title={localFind("gem png file")}
            title={findByUniqueId(mainData, 433)}
            value={levelTabs.data.png_file}
            isLink
            params={params}

          />
          <DetailItem
            // title={localFind("the number of points of the 3d stone model")}
            title={findByUniqueId(mainData, 434)}
            value={levelTabs.data.subcategories}
            params={params}
          />
          <DetailItem
            // title={localFind("gem fbx file")}
            title={findByUniqueId(mainData, 435)}
            value={levelTabs.data.fbx_file}
            isLink
            params={params}
          />
          <DetailItem
            // title={localFind("the number of lines of the 3d stone model")}
            title={findByUniqueId(mainData, 436)}
            value={levelTabs.data.lines}
            params={params}
          />
          <DetailItem
            // title={localFind("central encryption")}
            title={findByUniqueId(mainData, 437)}
            value={levelTabs.data.encryption}
            params={params}
          />
          <DetailItem
            // title={localFind("animation")}
            title={findByUniqueId(mainData, 400)}
            value={levelTabs.data.has_animation}
          />
          <DetailItem
            // title={localFind("gem designer")}
            title={findByUniqueId(mainData, 438)}
            value={levelTabs.data.designer}
            params={params}
          />
        </div>
      </div>
    </>
  );
}
