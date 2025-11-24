import { ArrowRight } from "@/components/svgs";
import UserCard from "@/components/shared/UserCard";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { getUserData } from "@/components/utils/actions";

export default async function TopTrainersFirstPage({ params, mainData }: any) {
  
  // 🔵 کدهای کاربران
  const codes = ["HM-2000003", "HM-2000001"];

  // 🔵 گرفتن کاربران از API
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
    return <div className="text-center p-5 text-red-500">کاربری یافت نشد</div>;
  }

  return (
    <>
      {/* 🔴 هدر - دقیقا مثل استایل نمونه */}
      <div className="w-full flex flex-row justify-between items-center lg:px-[42px] px-5">
        <p className="font-azarMehr font-medium text-xl lg:text-2xl dark:text-white">
          {findByUniqueId(mainData, 168)}
        </p>

        <div className="flex justify-center items-center gap-4 md:hidden">
          <p className="font-azarMehr font-medium text-[12px] md:text-[16px] lg:text-[18px] xl:text-[20px] dark:text-white ">
            {findByUniqueId(mainData, 171)}
          </p>
          <ArrowRight className="dark:stroke-white stroke-black rtl:rotate-180 w-[24px] h-full " />
        </div>
      </div>

      {/* 🔴 باکس لیست کاربران - بالکل مثل نمونه */}
      <div className="w-full relative flex flex-col lg:flex-row pb-10 lg:px-7 items-center">
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
      </div>
    </>
  );
}
