import { getLevelTabs } from "@/components/utils/actions";
import DetailItem from "@/components/module/levelComponent/DetailItem";
import Accordion from "@/components/module/levelComponent/Accordion";
import ImageBox from "@/components/module/levelComponent/ImageBox";

export default async function Gem({ levelsTranslatePage, levelTabs }: any) {
  function localFind(_name: any) {
    return levelsTranslatePage.find((item: any) => item.name == _name)
      ?.translation;
  }
  return (
    <>
      <div className="flex flex-col-reverse sm:flex-row flex-wrap">
        <div className="flex flex-wrap justify-between">
          <Accordion
            title={localFind("description")}
            value={levelTabs.data.description}
          />
          <DetailItem
            title={localFind("gem chip")}
            value={levelTabs.data.thread}
          />
          <DetailItem
            title={localFind("gem color")}
            value={levelTabs.data.color}
          />
          <DetailItem
            title={localFind("the volume of the 3d stone model")}
            value={levelTabs.data.volume}
          />
          <DetailItem title={localFind("gem png file")} value={""} />
          <DetailItem
            title={localFind("the number of points of the 3d stone model")}
            value={levelTabs.data.subcategories}
          />
          <DetailItem title={localFind("gem fbx file")} value={""} />
          <DetailItem
            title={localFind("the number of lines of the 3d stone model")}
            value={levelTabs.data.lines}
          />
          <DetailItem
            title={localFind("central encryption")}
            value={levelTabs.data.encryption}
          />
          <DetailItem
            title={localFind("animation")}
            value={levelTabs.data.has_animation}
          />
          <DetailItem
            title={localFind("gem designer")}
            value={levelTabs.data.designer}
          />
        </div>

        {/* <ImageBox item={levelTabs.data} langData={langData} /> */}
      </div>
    </>
  );
}
