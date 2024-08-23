import { getLevelTabs } from "@/components/utils/actions";
import DetailItem from "@/components/module/levelComponent/DetailItem";
import Accordion from "@/components/module/levelComponent/Accordion";

export default async function GeneralInfo({
  langData,
  params,
  levelsTranslatePage,
}: any) {
  const generalInfo = await getLevelTabs(params);
  function localFind(_name: any) {
    return levelsTranslatePage.find((item: any) => item.name == _name)
      ?.translation;
  }  
  console.log('generalInfo',generalInfo);
  
  return (
    <>
      <div className="w-full sm:w-4/5 flex flex-wrap justify-between">
        <Accordion
          title={localFind("description")}
          value={generalInfo.data.description}
        />
        <DetailItem
          title={localFind("required points")}
          value={generalInfo.data.score.toLocaleString()}
        />
        <DetailItem
          title={localFind("surface model file size")}
          value={generalInfo.data.file_volume}
        />
        <DetailItem
          title={localFind("level rank")}
          value={generalInfo.data.rank}
        />
        <DetailItem
          title={localFind("the number of points used in the level model")}
          value={generalInfo.data.points.toLocaleString()}
        />
        <DetailItem
          title={localFind("number of sub-branches")}
          value={generalInfo.data.subcategories}
        />
        <DetailItem
          title={localFind("number of surface model lines")}
          value={generalInfo.data.lines.toLocaleString()}
        />
        <DetailItem
          title={localFind("level creation date")}
          value={generalInfo.data.creation_date}
        />
        <DetailItem
          title={localFind("animation")}
          value={generalInfo.data.has_animation}
        />
        <DetailItem
          title={localFind("persian font used")}
          value={generalInfo.data.persian_font}
        />
        <DetailItem
          title={localFind("surface designer")}
          value={generalInfo.data.designer}
        />
        <DetailItem
          title={localFind("english font used")}
          value={generalInfo.data.english_font}
        />
        <DetailItem
          title={localFind("3d model designer")}
          value={generalInfo.data.model_designer}
        />
        <DetailItem
          fullBox={true}
          title={localFind("colors used")}
          value={generalInfo.data.used_colors}
        />
      </div>
    </>
  );
}
