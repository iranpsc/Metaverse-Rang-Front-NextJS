import { ArrowRight } from "@/components/svgs";
import UserCard from "@/components/shared/UserCard";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { getUserData } from "@/components/utils/actions";

export default async function TopWritersArticles({ params, mainData }: any) {
  const codes = ["HM-2000001", "HM-2000003"]; // ← دو کاربر از API

  // گرفتن کاربران از API
  const usersData = await Promise.all(
    codes.map(async (code) => {
      const res = await getUserData(code);

      if (!res?.data) return null;

      return {
        id: res.data.id,
        name: `${res.data?.kyc?.fname || ""} ${res.data?.kyc?.lname || ""}`.trim(),
        profile_photo: res.data?.profilePhotos?.[0]?.url || "/firstpage/default.webp",
        code: res.data.code,
        score: res.data.score,

        // لول‌ها — همان ساختار درست
        levels: {
          current: res.data.current_level,
          previous: res.data.achieved_levels || [],
        },

        passions: res.data.customs?.passions || {},
      };
    })
  );

  const users = usersData.filter(Boolean);

  if (!users.length) {
    return <div className="text-center p-5 text-red-500"> </div>;
  }

  return (
    <>
      <div className="w-full flex flex-row justify-between items-center lg:px-[42px] px-5">
        <p className="font-azarMehr font-medium text-xl lg:text-2xl dark:text-white">
          نویسندگان برتر
        </p>

        <div className="flex justify-center items-center gap-4 md:hidden">
          <p className="font-azarMehr font-medium text-[12px] md:text-[16px] lg:text-[18px] xl:text-[20px] dark:text-white ">
            {findByUniqueId(mainData, 171)}
          </p>
          <ArrowRight className="dark:stroke-white stroke-black rtl:rotate-180 w-[24px] h-full " />
        </div>
      </div>

      <div className="w-full relative flex flex-col lg:flex-row pb-10 lg:px-7 gap-x-2 items-center">
        
        {/* دو کارت کاربر از API */}
        {users.map((user: any, index: number) => (
          <div key={index} className="flex flex-col items-center" style={{ minWidth: "280px" }}>
            <UserCard
              item={user}
              index={index}
              params={params}
              minWidth="280px"
              levelText={findByUniqueId(mainData, 68)}
              buttonText={findByUniqueId(mainData, 600)}
            />
          </div>
        ))}

        {/* 🔵 کارت پیشنهاد اضافه شده */}
               <div style={{ minWidth: '275px' }} className="bg-[#fff] h-[460px] dark:bg-[#1A1A18] mt-10 rounded-[20px] hidden  mx-2 md:flex flex-col gap-3 items-center justify-center hover:scale-105 base-transition-1 shadow-lg cursor-pointer">
          <div className="rounded-full bg-[#0066FF30] dark:bg-[#483D13] aspect-square flex items-center justify-center w-14 h-14 ltr:rotate-180">
            <svg width="16" height="24" viewBox="0 0 17 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className="dark:stroke-dark-primary" d="M11.2753 21.6532L1.99609 11.6008L11.2753 1.54834" stroke="#0066FF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <p className="text-light-primary dark:text-dark-primary text-xl">{findByUniqueId(mainData, 171)}</p>
        </div>

      </div>
    </>
  );
}
