import DetailItem from "@/components/module/levelComponent/DetailItem";

interface Params {
  lang: "fa" | "en";
}

interface PrizeItem {
  title: { fa: string; en: string };
  valueKey: string;
}

export default async function Prize({
  levelTabs,
  params,
}: {
  levelTabs: any;
  params: Params;
}) {
  // داده‌های ثابت دو زبانه برای تایتل‌ها
  const staticData: PrizeItem[] = [
    { title: { fa: "دریافت PSC :", en: "Receive PSC in the amount of this Rial :" }, valueKey: "psc" },
    { title: { fa: "رنگ قرمز :", en: "Red Color : " }, valueKey: "red" },
    { title: { fa: " دریافت رنگ آبی : ", en: "Get blue color : " }, valueKey: "blue" },
    { title: { fa: "واحد رضایت :", en: "Satisfaction Unit : " }, valueKey: "satisfaction" },
    { title: { fa: " دریافت رنگ زرد :", en: "Receive yellow color : " }, valueKey: "yellow" },
  ];

  // تعیین جهت بر اساس زبان
  const direction = params.lang === "fa" ? "rtl" : "ltr";

  // لاگ برای دیباگ
  console.log("Prize levelTabs.data:", levelTabs.data);
  console.log("Prize params:", params);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-wrap justify-between gap-4">
        {staticData.map((item, index) => (
          <DetailItem
            key={index}
            title={item.title[params.lang]}
            value={levelTabs.data[item.valueKey] ?? "نامشخص / Unknown"}
            params={params}
          />
        ))}
      </div>
    </div>
  );
}