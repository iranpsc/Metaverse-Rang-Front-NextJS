import { ArrowRight } from "@/components/svgs";
import UserCard from "@/components/shared/UserCard";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

const TopTrainersFirstPage = ({ params, mainData }: any) => {
  const staticUsers = [
    {
      id: 1,
      name: "مرضیه ثاقب علیزاده",
      profile_photo: "/firstpage/alizadeh.webp",
      code: "HM-2000003",
      score: "",
      levels: { current: { name: "شهروند" } },
    },
    {
      id: 2,
      name: "حسین قدیری",
      profile_photo: "/firstpage/ghadiri.webp",
      code: "HM-2000001",
      score: "",
      levels: { current: { name: "مشارکت کننده" } },
    },
  ];
  return (
    <>
      <div className="w-full flex flex-row justify-between items-center">
        <p className="font-azarMehr font-medium  text-[16px] md:text-[20px] lg:text-[28px] xl:text-[32px] dark:text-white">
          {findByUniqueId(mainData, 168)}
        </p>
        <div className="flex justify-center items-center gap-4">
          <p className="font-azarMehr font-medium text-[12px] md:text-[16px] lg:text-[18px] xl:text-[20px] dark:text-white">
            {findByUniqueId(mainData, 171)}
          </p>
          <ArrowRight className="dark:stroke-white stroke-black rtl:rotate-180 w-[24px] h-full " />
        </div>
      </div>
      <div className="w-full relative flex flex-row dark:dark-scrollbar light-scrollbar overflow-x-auto mt-4 md:mt-12 py-3">
        {staticUsers.map((item: any, index: any) => (
          <UserCard
            key={index}
            item={item}
            index={index}
            params={params}
            minWidth={`260px`}
            levelText={findByUniqueId(mainData, 68)}
            buttonText={findByUniqueId(mainData, 600)}
          />
        ))}
      </div>
    </>
  );
};

export default TopTrainersFirstPage;
