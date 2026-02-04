// SERVER COMPONENT
import TopTrainersClient from "./TopTrainersClient";
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

/* ✅ فانکشن async */
export async function getTopTrainerUsers() {
  const codes = ["HM-2000003", "HM-2000001"];

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
          res.data?.profilePhotos?.at(-1)?.url || "/firstpage/default.webp",
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

/* ✅ کامپوننت sync */
export default function TopTrainersFirstPage({
  params,
  mainData,
  users,
}: any) {
  return (
    <TopTrainersClient
      params={params}
      mainData={mainData}
      users={users}
      title={findByUniqueId(mainData, 168)}
      viewAllText={findByUniqueId(mainData, 171)}
      buttonText={findByUniqueId(mainData, 600)}
      levelText={findByUniqueId(mainData, 68)}
    />
  );
}
