import DetailItem from "@/components/module/levelComponent/DetailItem";
import Accordion from "@/components/module/levelComponent/Accordion";

export default async function Gift({ levelsTranslatePage, levelTabs }: any) {
  function localFind(_name: any) {
    return levelsTranslatePage.find((item: any) => item.name == _name)
      ?.translation;
  }
  return (
    <>
      <div className="flex flex-col-reverse sm:flex-row flex-nowrap">
        <div className="flex flex-wrap justify-between">
          <Accordion
            title={localFind("description")}
            value={levelTabs.data.description}
          />
          <Accordion
            title={localFind("features of mobile gift")}
            value={levelTabs.data.features}
          />
          <DetailItem
            title={localFind("number of monthly capacity")}
            value={levelTabs.data.monthly_capacity_count}
          />
          <DetailItem
            title={localFind("ability to sell capacity")}
            value={levelTabs.data.sell_capacity}
          />
          <DetailItem
            title={localFind("the volume of the 3d model of the gift")}
            value={levelTabs.data.three_d_model_volume}
          />
          <DetailItem
            title={localFind("ability to sell bundled gifts")}
            value={levelTabs.data.sell}
          />
          <DetailItem
            title={localFind(
              "the number of points of the accompanying gift model"
            )}
            value={levelTabs.data.three_d_model_points}
          />
          <DetailItem
            title={localFind("ability to rent accompanying gift")}
            value={levelTabs.data.rent}
          />
          <DetailItem
            title={localFind(
              "the number of lines of the accompanying gift model"
            )}
            value={levelTabs.data.three_d_model_lines}
          />
          <DetailItem
            title={localFind("access link to mobile gift sellers")}
            isLink={true}
            value={levelTabs.data.seller_link}
          />
          <DetailItem
            title={localFind("animation")}
            value={levelTabs.data.has_animation}
          />
          <DetailItem
            title={localFind("gift designer")}
            value={levelTabs.data.designer}
          />
          <DetailItem
            title={localFind("ability to store capacity")}
            value={levelTabs.data.store_capacity}
          />
          <DetailItem title={localFind("gift png file")} value={""} />
          <DetailItem title={localFind("gift fbx file")} value={""} />
        </div>
      </div>
    </>
  );
}
