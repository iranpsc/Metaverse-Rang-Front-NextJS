// SERVER COMPONENT
import TopWritersClient from "./TopWritersClient";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { getUserData } from "@/components/utils/actions";

/* ===== MAP ثابت route level ===== */
const LEVEL_ROUTE_MAP: Record<string, string> = {
  "1": "citizen-baguette",
  "2": "reporter-baguette",
  "3": "participation-baguette",
  "4": "developer-baguette",
  "5": "inspector-baguette",
  "6": "businessman-baguette",
  "7": "lawyer-baguette",
  "8": "city-council-baguette",
  "9": "the-mayor-baguette",
  "10": "governor-baguette",
  "11": "minister-baguette",
  "12": "judge-baguette",
  "13": "legislator-baguette",
};

export async function getTopWritersUsers() {
  const codes = ["HM-2000001", "HM-1999999"];

  const usersData = await Promise.all(
    codes.map(async (code) => {
      const res = await getUserData(code);
      if (!res?.data) return null;

      const currentLevel = res.data.current_level;
      const previousLevels = res.data.achieved_levels || [];

      const normalizedCurrentLevel = currentLevel
        ? {
            ...currentLevel,
            slug: LEVEL_ROUTE_MAP[String(currentLevel.slug)],
          }
        : null;

      const normalizedPreviousLevels = previousLevels.map((lvl: any) => ({
        ...lvl,
        slug: LEVEL_ROUTE_MAP[String(lvl.slug)],
      }));

      return {
        id: res.data.id,
        name: `${res.data?.kyc?.fname || ""} ${res.data?.kyc?.lname || ""}`.trim(),
        profile_photo:
          res.data?.profilePhotos?.at(-1)?.url || "/firstpage/ghadiri.webp",
        code: res.data.code,
        score: res.data.score,
        levels: {
          current: normalizedCurrentLevel,
          previous: normalizedPreviousLevels,
        },
        passions: res.data.customs?.passions || {},
      };
    })
  );

  return usersData.filter(Boolean);
}

export default async function TopWritersArticles({ params, mainData }: any) {
  const users = await getTopWritersUsers();

  return (
    <TopWritersClient
      params={params}
      mainData={mainData}
      users={users}
      // اگر TopWritersClient هم مثل TopTrainersClient پراپ‌های title و ... می‌خواهد:
      title={findByUniqueId(mainData, 123)}           // ← شناسه واقعی را جایگزین کن
      viewAllText={findByUniqueId(mainData, 456)}    // ← شناسه واقعی
      buttonText={findByUniqueId(mainData, 789)}     // ← شناسه واقعی
      levelText={findByUniqueId(mainData, 68)}
      // یا هر پراپ دیگری که لازم است
    />
  );
}