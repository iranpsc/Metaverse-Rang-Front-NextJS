import {
  getTranslation,
  getMainFile,
  getLangArray,
  findByModalName,
  findByTabName,
} from "@/components/utils/actions";

export default async function CitizensLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  //
  const langData = await getTranslation(params.lang);
  const mainData = await getMainFile(langData);
  const langArray = await getLangArray();
  // const centralPageModal = await findByModalName(
  //   mainData,
  //   "Citizenship-profile"
  // );
  // const tabsMenu = await findByTabName(centralPageModal, "menu");

  return (
    <main className="flex h-screen dark:bg-black" dir={langData.direction}>
      <div
        className={`overflow-y-auto relative light-scrollbar dark:dark-scrollbar w-full xs:px-1 lg:mt-0`}
      >
        {children}
      </div>
    </main>
  );
}
