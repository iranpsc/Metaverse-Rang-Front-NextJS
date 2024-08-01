import Link from "next/link";
import { getAllLevels , getFooterData  } from "@/components/utils/actions";
import DynamicFooter from "@/components/module/footer/DynamicFooter";

export default async function CitizensPage({
  params,
}: {
  params: { lang: "en" | "fa" };
}) {

  const levelArray = await getAllLevels()
  const footerTabs = await getFooterData(params)

  return (
    <>
      {levelArray.map((item) => (
        <Link
          className="p-5 border-2"
          href={`/${params.lang}/levels/${item.id}/general-info`}
        >
          {item.id}
        </Link>
      ))}
       <div className="flex flex-col justify-center items-center">
            <DynamicFooter  footerTabs={footerTabs}/>
          </div>
    </>
  );
}
