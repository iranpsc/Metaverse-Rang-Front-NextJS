import { getLevelTabs } from "@/components/utils/actions";
import DetailItem from "@/components/module/levelComponent/DetailItem";
import Accordion from "@/components/module/levelComponent/Accordion";
import ImageBox from "@/components/module/levelComponent/ImageBox";

export default async function Gem({
  params,
  levelsTranslatePage,
  langData,
}: any) {
  const gem = await getLevelTabs(params);
  function localFind(_name: any) {
    return levelsTranslatePage.find((item: any) => item.name == _name)
      ?.translation;
  }  
  return (
    <>
      <div className="flex flex-col-reverse sm:flex-row flex-wrap">
        <div className="w-full sm:w-4/5 flex flex-wrap justify-between">
          <Accordion
            title={localFind("description")}
            value={gem.data.description}
          />
          <DetailItem
            title={localFind("gem chip")}
            value={gem.data.thread}
          />
          <DetailItem
            title={localFind("gem color")}
            value={gem.data.color}
          />
          <DetailItem
            title={localFind("the volume of the 3d stone model")}
            value={gem.data.volume}
          />
          <DetailItem
            title={localFind("gem png file")}
            value={""}
          />
          <DetailItem
            title={localFind("the number of points of the 3d stone model")}
            value={gem.data.subcategories}
          />
          <DetailItem
            title={localFind("gem fbx file")}
            value={""}
          />
          <DetailItem
            title={localFind("the number of lines of the 3d stone model")}
            value={gem.data.lines}
          />
          <DetailItem
            title={localFind("central encryption")}
            value={gem.data.encryption}
          />
          <DetailItem
            title={localFind("animation")}
            value={gem.data.has_animation}
          />
          <DetailItem
            title={localFind("gem designer")}
            value={gem.data.designer}
          />
        </div>

        <ImageBox item={gem.data} langData={langData} />
      </div>
    </>
  );
}
