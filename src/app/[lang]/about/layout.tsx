import { getTranslation } from "@/components/utils/actions";

export default async function CitizensLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  //
  const langData = await getTranslation(params.lang);

  return (
    <main
      className="flex h-screen dark:bg-black bg-grayLight"
      dir={langData.direction}
    >
      <div
        className={`overflow-y-auto relative light-scrollbar dark:dark-scrollbar w-full lg:mt-0`}
      >
        {children}
      </div>
    </main>
  );
}
