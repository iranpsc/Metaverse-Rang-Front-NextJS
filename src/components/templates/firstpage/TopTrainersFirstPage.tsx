// SERVER COMPONENT
import TopTrainersClient from "./TopTrainersClient";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { getUserData } from "@/components/utils/actions";

/* ✅ فانکشن async جدا */
export async function getTopTrainerUsers() {
  const codes = ["HM-2000003", "HM-2000001"];

  const usersData = await Promise.all(
    codes.map(async (code) => {
      const res = await getUserData(code);
      if (!res?.data) return null;

      return {
        id: res.data.id,
        name: `${res.data?.kyc?.fname || ""} ${res.data?.kyc?.lname || ""}`.trim(),
        profile_photo:
          res.data?.profilePhotos?.at(-1)?.url || "/firstpage/default.webp",
        code: res.data.code,
        score: res.data.score,
        levels: {
          current: res.data.current_level,
          previous: res.data.achieved_levels || [],
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
