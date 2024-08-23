import { getLevelTabs } from "@/components/utils/actions";
import DetailItem from "@/components/module/levelComponent/DetailItem";
import Accordion from "@/components/module/levelComponent/Accordion";
import ImageBox from "@/components/module/levelComponent/ImageBox";

export default async function Gift({
  params,
  levelsTranslatePage,
  langData,
}: any) {
  const gift = await getLevelTabs(params);
  function localFind(_name: any) {
    return levelsTranslatePage.find((item: any) => item.name == _name)
      ?.translation;
  }  
  return (
    <>
      <div className="w-full flex flex-col-reverse sm:flex-row flex-wrap">
        <div className="w-full sm:w-4/5 flex flex-wrap justify-between">
          <Accordion
            title={localFind("description")}
            value={gift.data.description}
          />
          <Accordion
            title={localFind("features of mobile gift")}
            value={gift.data.features}
          />
          <DetailItem
            title={localFind("number of monthly capacity")}
            value={gift.data.monthly_capacity_count}
          />
          <DetailItem
            title={localFind("ability to sell capacity")}
            value={gift.data.sell_capacity}
          />
          <DetailItem
            title={localFind("the volume of the 3d model of the gift")}
            value={gift.data.three_d_model_volume}
          />
          <DetailItem
            title={localFind("ability to sell bundled gifts")}
            value={gift.data.sell}
          />
          <DetailItem
            title={localFind("the number of points of the accompanying gift model")}
            value={gift.data.three_d_model_points}
          />
          <DetailItem
            title={localFind("ability to rent accompanying gift")}
            value={gift.data.rent}
          />
          <DetailItem
            title={localFind("the number of lines of the accompanying gift model")}
            value={gift.data.three_d_model_lines}
          />
          <DetailItem
            title={localFind("access link to mobile gift sellers")}
            isLink={true}
            value={gift.data.seller_link}
          />
          <DetailItem
            title={localFind("animation")}
            value={gift.data.has_animation}
          />
          <DetailItem
            title={localFind("gift designer")}
            value={gift.data.designer}
          />
          <DetailItem
            title={localFind("ability to store capacity")}
            value={gift.data.store_capacity}
          />
          <DetailItem
            title={localFind("gift png file")}
            value={""}
          />
          <DetailItem
            title={localFind("gift fbx file")}
            value={""}
          />
        </div>
        <ImageBox item={gift.data} langData={langData} />
      </div>
    </>
  );
}
