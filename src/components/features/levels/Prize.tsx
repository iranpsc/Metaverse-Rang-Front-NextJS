import DetailItem from "@/components/ui/DetailItem";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

export default async function Prize({
  mainData,
  levelTabs,
}: any) {
  // function localFind(_name: any) {
  //   return levelsTranslatePage.find((item: any) => item.name == _name)
  //     ?.translation;
  // }
  // function localFind2(_slug: any) {
  //   // HIN not good
  //   //item.name and _slug have fa/en number string
  //   //convert

  //   return concatArrayContent.find(
  //     (item: any) => Number(item.name) == Number(_slug)
  //   )?.translation;
  // }

  return (
    <>
      <div className="flex flex-wrap justify-between">
        <DetailItem
          // title={localFind("get psc")}
          title={findByUniqueId(mainData, 902)}
          value={levelTabs.data.psc}
        />
        <DetailItem
          // title={localFind("get red color")}
          title={findByUniqueId(mainData, 50)}
          value={levelTabs.data.red}
        />
        <DetailItem
          // title={localFind("get blue color")}
          title={findByUniqueId(mainData, 452)}
          value={levelTabs.data.blue}
        />
        <DetailItem
          // title={localFind("satisfaction unit")}
          title={findByUniqueId(mainData, 453)}
          value={levelTabs.data.satisfaction}
        />
        <DetailItem
          // title={localFind("receive yellow color")}
          title={findByUniqueId(mainData, 454)}
          value={levelTabs.data.yellow}
        />
      </div>
    </>
  );
}
