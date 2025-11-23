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
      className="flex dark:bg-black bg-grayLight"
      dir={langData.direction}
    >
      <div
        className={`relative w-full lg:mt-0`}
      >
        {children}
      </div>
    </main>
  );
}
