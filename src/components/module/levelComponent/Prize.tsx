import { getLevelTabs } from "@/components/utils/actions";
import DetailItem from "@/components/module/levelComponent/DetailItem";

export default async function Prize({
  params,
  levelsTranslatePage,
  levelId,
}: any) {
  const prize = await getLevelTabs(params, levelId);

  function localFind(_name: any) {
    return levelsTranslatePage.find((item: any) => item.name == _name)
      ?.translation;
  }
  return (
    <>
      <div className="flex flex-wrap justify-between">
        <DetailItem title={localFind("get psc")} value={prize.data.psc} />
        <DetailItem title={localFind("get red color")} value={prize.data.red} />
        <DetailItem
          title={localFind("get blue color")}
          value={prize.data.blue}
        />
        <DetailItem
          title={localFind("satisfaction unit")}
          value={prize.data.satisfaction}
        />
        <DetailItem
          title={localFind("receive yellow color")}
          value={prize.data.yellow}
        />
      </div>
    </>
  );
}
