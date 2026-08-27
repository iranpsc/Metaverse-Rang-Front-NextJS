import CustomErrorPage from "@/components/error/CustomErrorPage";
import LevelsClient from "@/components/features/levels/LevelsClient";
import { getAllLevels } from "@/components/utils/actions";

const staticData = [
  { url: "/svg/level/citizen.png", score: 10, id: 1, route_name: "citizen-baguette", unique_id: 382 },
  { url: "/svg/level/reporter.png", score: 990, id: 2, route_name: "reporter-baguette", unique_id: 383 },
  { url: "/svg/level/participation.png", score: 3000, id: 3, route_name: "participation-baguette", unique_id: 589 },
  { url: "/svg/level/developer.png", score: 8000, id: 4, route_name: "developer-baguette", unique_id: 68 },
  { url: "/svg/level/inspector.png", score: 18000, id: 5, route_name: "inspector-baguette", unique_id: 69 },
  { url: "/svg/level/businessman.png", score: 36000, id: 6, route_name: "businessman-baguette", unique_id: 590 },
  { url: "/svg/level/lawyer.png", score: 76000, id: 7, route_name: "lawyer-baguette", unique_id: 71 },
  { url: "/svg/level/city-council.png", score: 166000, id: 8, route_name: "city-council-baguette", unique_id: 591 },
  { url: "/svg/level/the-mayor.png", score: 366000, id: 9, route_name: "the-mayor-baguette", unique_id: 592 },
  { url: "/svg/level/governor.png", score: 796000, id: 10, route_name: "governor-baguette", unique_id: 74 },
  { url: "/svg/level/minister.png", score: 1696000, id: 11, route_name: "minister-baguette", unique_id: 75 },
  { url: "/svg/level/judge.png", score: 3696000, id: 12, route_name: "judge-baguette", unique_id: 76 },
  { url: "/svg/level/legislator.png", score: 7896000, id: 13, route_name: "legislator-baguette", unique_id: 77 },
];

interface LevelsContentProps {
  params: any;
  mainData: any;
}

/**
 * فچ getAllLevels (که قبلاً بالای page.tsx بود) از تابع اصلی صفحه جدا
 * شده و اومده اینجا، چون این کامپوننت خودش زیرمجموعه‌ی <Suspense> رندر
 * می‌شه. تا وقتی این async تموم نشه، LevelsClientSkeleton نمایش داده
 * می‌شه. دقیقاً طبق تجربه‌ی قبلی، خود فچ داخل try/catch گرفته شده تا
 * خطای شبکه/API باعث hang شدن صفحه نشه (فقط CustomErrorPage نشون بده).
 */
// 🧪 فقط برای تست موقت — حداقل ۳ ثانیه صبر می‌کنه تا اسکلت قابل دیدن
// بمونه، حتی اگه API سریع جواب بده. بعد از تست این خط و MIN_LOADING_TIME
// رو پاک کن.
const MIN_LOADING_TIME = 1500;

export default async function LevelsContent({
  params,
  mainData,
}: LevelsContentProps) {
  const startTime = Date.now();
  let levelArray: any;

  try {
    levelArray = await getAllLevels();
  } catch (error) {
    const serializedError = {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : null,
      name: error instanceof Error ? error.name : "Error",
    };
    console.error("❌ Error fetching levelArray in LevelsContent:", serializedError);
    return <CustomErrorPage error={serializedError} />;
  }

  // 🧪 تست موقت — پاک شود بعد از اطمینان از درست‌کارکردن اسکلت
  const elapsed = Date.now() - startTime;
  if (elapsed < MIN_LOADING_TIME) {
    await new Promise((resolve) => setTimeout(resolve, MIN_LOADING_TIME - elapsed));
  }

  /* -------------------------- Normalize Levels --------------------------- */
  staticData.forEach((el2: any) => {
    levelArray.forEach((el1: any) => {
      if (el1.id == el2.id) {
        el1.photo = el2.url;
        el1.rank = 1;
        el1.score = el2.score;
        el1.route_name = el2.route_name;
        el1.unique_id = el2.unique_id;
      }
    });
  });

  /* ------------------------------ Schema --------------------------------- */
  const levelsSchema = {
    "@context": "https://schema.org/",
    "@type": "ItemList",
    itemListElement: levelArray.map((item: any) => ({
      "@type": "ListItem",
      position: item.id,
      name: item.name,
      url: item.image,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(levelsSchema) }}
      />

      <LevelsClient
        levels={levelArray}
        params={params}
        mainData={mainData}
      />
    </>
  );
}