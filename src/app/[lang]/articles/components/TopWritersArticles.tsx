import { ArrowRight } from "@/components/svgs";
import UserCard from "@/components/shared/UserCard";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { getUserData } from "@/components/utils/actions";

export default async function TopWritersArticles({ params, mainData }: any) {
  // 🔥 ID هایی که می‌خوای نمایش بدی
  const userCodes = ["HM-2000001", "HM-1999999"];

  // 🔥 گرفتن همزمان دیتا
  const profiles = await Promise.all(
    userCodes.map(code => getUserData(code))
  );

  // 🔥 تبدیل به ساختار UserCard
  const users = profiles
    .filter(profile => profile?.data)
    .map(profile => ({
      id: profile.data.id,
      name: `${profile.data?.kyc?.fname || ""} ${profile.data?.kyc?.lname || ""}`.trim(),
      profile_photo:
        profile.data?.profilePhotos?.[0]?.url ||
        "/firstpage/ghadiri.webp",
      code: profile.data.code,
      score: profile.data.score,
      levels: {
        current: profile.data.current_level,
        previous: profile.data.achieved_levels || [],
      },
      passions: profile.data.customs?.passions || {},
    }));

  if (users.length === 0) {
    return (
      <div className="text-center p-5 text-red-500">
        کاربر یافت نشد
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="w-full flex flex-row justify-between items-center lg:px-[42px] px-5">
        <p className="font-azarMehr font-medium text-xl lg:text-2xl dark:text-white">
          {findByUniqueId(mainData, 1519)}
        </p>

        <div className="flex justify-center items-center gap-4 md:hidden">
          <p className="font-azarMehr font-medium text-[12px] dark:text-white">
            {findByUniqueId(mainData, 171)}
          </p>
          <ArrowRight className="dark:stroke-white stroke-black rtl:rotate-180 w-[24px]" />
        </div>
      </div>

      {/* Cards */}
      <div className="w-full relative flex flex-col lg:flex-row gap-6 pb-10 lg:px-7 items-center ">
        {users.map((user, index) => (
          <div
            key={user.code}
            className="flex flex-col items-center"
            style={{ minWidth: "280px" }}
          >
            <UserCard
              item={user}
              index={index}
              params={params}
              minWidth="280px"
              mainData={mainData}
              levelText={findByUniqueId(mainData, 68)}
              buttonText={findByUniqueId(mainData, 600)}
            />
          </div>
        ))}
      </div>
    </>
  );
}
