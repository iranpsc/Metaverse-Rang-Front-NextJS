// components/templates/about/TeamListLoader.tsx
import { getAllLevels, getUserData } from "@/components/utils/actions";
import List from "../../list/TeamStaticList";

interface LevelItem {
  slug: string | number;
  [key: string]: any;
}

function convertPersianToEnglishNumber(slug: string): number {
  return Number(
    slug.replace(/[۰-۹]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 1776))
  );
}

const USER_CODES = [
  "HM-2000008",
  "HM-2000491",
  "HM-2000009",
  "HM-2000005",
  "HM-2000003",
  "HM-2000002",
  "HM-2000001",
];

export default async function TeamListLoader({
  params,
  mainData,
}: {
  params: any;
  mainData: any;
}) {
  const levelArray = (await getAllLevels()) as LevelItem[];

  levelArray.forEach((item: LevelItem) => {
    if (typeof item.slug === "string") {
      item.slug = convertPersianToEnglishNumber(item.slug);
    }
  });

  const profiles = await Promise.all(USER_CODES.map((code) => getUserData(code)));

  const users = profiles
    .filter((profile) => profile?.data)
    .map((profile) => ({
      id: profile.data.id,
      name: `${profile.data?.kyc?.fname || ""} ${profile.data?.kyc?.lname || ""}`.trim(),
      profile_photo: profile.data?.profilePhotos?.[0]?.url,
      code: profile.data.code,
      score: profile.data.score,
      levels: {
        current: profile.data.current_level,
        previous: profile.data.achieved_levels || [],
      },
      passions: profile.data.customs?.passions || {},
    }));

  return <List params={params} mainData={mainData} users={users} />;
}