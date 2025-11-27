import { ArrowRight } from "@/components/svgs";
import UserCard from "@/components/shared/UserCard";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { getUserData } from "@/components/utils/actions";

export default async function TopWritersArticles({ params, mainData }: any) {
  const profile = await getUserData("HM-2000001");



  // console.log("📦 داده برگشتی از getUserData('HM-2000001'):");
  // console.dir(profile, { depth: null });



  if (!profile?.data) {
    return <div className="text-center p-5 text-red-500">کاربر یافت نشد</div>;
  }

  const user = {
    id: profile.data.id,
    name: `${profile.data?.kyc?.fname || ""} ${profile.data?.kyc?.lname || ""}`.trim(),
    profile_photo: profile.data?.profilePhotos?.[0]?.url || "/firstpage/ghadiri.webp",
    code: profile.data.code,
    score: profile.data.score,
    levels: {
      current: profile.data.current_level,        // 🔹 سطح فعلی (slug: 4)
      previous: profile.data.achieved_levels || [], // 🔹 لول‌های قبلی
    },
    passions: profile.data.customs?.passions || {}, // 🔹 جم‌ها
  };

  return (
    <>

      <div className="w-full flex flex-row justify-between items-center lg:px-[42px] px-5">
        <p className="font-azarMehr font-medium text-xl lg:text-2xl dark:text-white">
          {findByUniqueId(mainData, 1519)}
        </p>

        <div className="flex justify-center items-center gap-4 md:hidden">
          <p className="font-azarMehr font-medium text-[12px] md:text-[16px] lg:text-[18px] xl:text-[20px] dark:text-white ">
            {findByUniqueId(mainData, 171)}
          </p>
          <ArrowRight className="dark:stroke-white stroke-black rtl:rotate-180 w-[24px] h-full " />
        </div>
      </div>


      <div className="w-full relative flex flex-col lg:flex-row pb-10 lg:px-7 items-center">
        <div className="flex flex-col items-center" style={{ minWidth: "280px" }}>
          <UserCard
            item={user}
            index={0}
            params={params}
            minWidth="280px"
            levelText={findByUniqueId(mainData, 68)}
            buttonText={findByUniqueId(mainData, 600)}
          // scoreElement={
          //   <div className="text-[16px] font-bold text-[#555] dark:text-[#ccc] font-azarMehr flex justify-center items-center gap-1">
          //     <span>{user.score}</span>
          //   </div>
          // }
          />
        </div>
      </div>
    </>
  );
}