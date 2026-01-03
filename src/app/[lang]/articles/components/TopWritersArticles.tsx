import TopWritersClient from "./TopWritersClient";
import { getUserData } from "@/components/utils/actions";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

export default async function TopWritersArticles({ params, mainData }: any) {
  const userCodes = ["HM-2000001", "HM-1999999"];

  const profiles = await Promise.all(userCodes.map(code => getUserData(code)));

  const users = profiles
    .filter(profile => profile?.data)
    .map(profile => ({
      id: profile.data.id,
      name: `${profile.data?.kyc?.fname || ""} ${profile.data?.kyc?.lname || ""}`.trim(),
      profile_photo: profile.data?.profilePhotos?.[0]?.url || "/firstpage/ghadiri.webp",
      code: profile.data.code,
      score: profile.data.score,
      levels: {
        current: profile.data.current_level,
        previous: profile.data.achieved_levels || [],
      },
      passions: profile.data.customs?.passions || {},
    }));

  return <TopWritersClient users={users} mainData={mainData} params={params}/>;
}
