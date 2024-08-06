import {
  getAllLevels,
  getFooterData,
  getTransletion,
  getMainFile,
} from "@/components/utils/actions";
import DynamicFooter from "@/components/module/footer/DynamicFooter";
import LevelCard from "@/components/module/levelComponent/LevelCard";

export default async function LevelsPage({
  params,
}: {
  params: { lang: "en" | "fa" };
}) {
  const levelArray = await getAllLevels();
  const footerTabs = await getFooterData(params);

  const langData = await getTransletion(params.lang);
  const mainData = await getMainFile(langData);
  const levels = mainData.modals.find((x: any) => x.name == "levels");
  const levelsTranslatePage = levels.tabs.find(
    (x: any) => x.name == "levels-page"
  ).fields;

  return (
    <>
      <div className="flex justify-center flex-wrap">
        {levelArray.data.map((item: any) => (
          <LevelCard
            item={item}
            levelsTranslatePage={levelsTranslatePage}
            params={params}
          />
        ))}
      </div>
      <div className="flex flex-col justify-center items-center">
        <DynamicFooter footerTabs={footerTabs} />
      </div>
    </>
  );
}
