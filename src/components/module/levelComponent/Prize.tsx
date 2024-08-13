import { getLevelTabs } from "@/components/utils/actions";
import DetailItem from "@/components/module/levelComponent/DetailItem";
import { targetData } from "@/components/utils/targetDataName";

export default async function Prize({ params, levelsTranslatePage }: any) {
  const prize = await getLevelTabs(params);

  return (
    <>
      <div className="w-full sm:w-4/5 flex flex-wrap justify-between">
        <DetailItem
          title={targetData(
            levelsTranslatePage,
            "license to establish an alliance"
          )}
          value={prize.data.psc}
        />
        <DetailItem
          title={targetData(levelsTranslatePage, "get red color")}
          value={prize.data.red}
        />
        <DetailItem
          title={targetData(levelsTranslatePage, "get blue color")}
          value={prize.data.blue}
        />
        <DetailItem
          title={targetData(levelsTranslatePage, "satisfaction unit")}
          value={prize.data.satisfaction}
        />
        <DetailItem
          title={targetData(levelsTranslatePage, "receive yellow color")}
          value={prize.data.yellow}
        />
      </div>
    </>
  );
}
