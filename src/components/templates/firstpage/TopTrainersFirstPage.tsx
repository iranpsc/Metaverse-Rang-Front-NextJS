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
      score: "14",
      levels: { current: { name: "شهروند" } },
    },
    {
      id: 2,
      name: "حسین قدیری",
      profile_photo: "/firstpage/ghadiri.webp",
      code: "HM-2000001",
      score: "37",
      levels: { current: { name: "مشارکت کننده" } },
    },
  ];
  return (
    <>
      <div className="w-full flex flex-row justify-between items-center">
        <p className="font-azarMehr font-medium  text-[16px] md:text-[20px] lg:text-[28px] xl:text-[32px] dark:text-white">
          {findByUniqueId(mainData, 168)}
        </p>
        <div className="flex justify-center items-center gap-4 md:hidden">
          <p className="font-azarMehr font-medium text-[12px] md:text-[16px] lg:text-[18px] xl:text-[20px] dark:text-white ">
            {findByUniqueId(mainData, 171)}
          </p>
          <ArrowRight className="dark:stroke-white stroke-black rtl:rotate-180 w-[24px] h-full " />
        </div>
      </div>
      <div className="w-full relative flex flex-row dark:dark-scrollbar light-scrollbar overflow-x-auto mt-4 md:mt-2 py-[30px]">
        {staticUsers.map((item: any, index: any) => (
          <div key={index} className="flex flex-col items-center" style={{ minWidth: '260px' }}>
            <UserCard
              item={item}
              index={index}
              params={params}
              minWidth={`260px`}
              levelText={findByUniqueId(mainData, 68)}
              buttonText={findByUniqueId(mainData, 600)}
              scoreElement={
                <div className="text-[16px] font-bold text-[#555] dark:text-[#ccc] font-azarMehr flex justify-center items-center gap-1">
                  <span>
                    {item.score}
                  </span>
                  <svg className="mt-[-4px]" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className="stroke-[#555] dark:stroke-[#ccc]" d="M7 11V19C7 19.2652 6.89464 19.5196 6.70711 19.7071C6.51957 19.8946 6.26522 20 6 20H4C3.73478 20 3.48043 19.8946 3.29289 19.7071C3.10536 19.5196 3 19.2652 3 19V12C3 11.7348 3.10536 11.4804 3.29289 11.2929C3.48043 11.1054 3.73478 11 4 11H7ZM7 11C8.06087 11 9.07828 10.5786 9.82843 9.82843C10.5786 9.07828 11 8.06087 11 7V6C11 5.46957 11.2107 4.96086 11.5858 4.58579C11.9609 4.21071 12.4696 4 13 4C13.5304 4 14.0391 4.21071 14.4142 4.58579C14.7893 4.96086 15 5.46957 15 6V11H18C18.5304 11 19.0391 11.2107 19.4142 11.5858C19.7893 11.9609 20 12.4696 20 13L19 18C18.8562 18.6135 18.5834 19.1402 18.2227 19.501C17.8619 19.8617 17.4328 20.0368 17 20H10C9.20435 20 8.44129 19.6839 7.87868 19.1213C7.31607 18.5587 7 17.7956 7 17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>

                </div>
              }
              hidePreviousLevels={true}
            />
          </div>

        ))}
        <div style={{ minWidth: '260px' }} className="bg-[#fff] dark:bg-[#1A1A18] mt-10 rounded-[20px] hidden  mx-2 md:flex flex-col gap-3 items-center justify-center hover:scale-105 base-transition-1 shadow-lg cursor-pointer">
          <div className="rounded-full bg-[#0066FF30] dark:bg-[#483D13] aspect-square flex items-center justify-center w-14 h-14">
            <svg width="16" height="24" viewBox="0 0 17 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className="dark:stroke-dark-primary" d="M11.2753 21.6532L1.99609 11.6008L11.2753 1.54834" stroke="#0066FF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <p className="text-light-primary dark:text-dark-primary text-xl">{findByUniqueId(mainData, 171)}</p>
        </div>
      </div>

    </>
  );
};

export default TopTrainersFirstPage;
