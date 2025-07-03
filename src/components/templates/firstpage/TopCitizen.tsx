import { ArrowRight } from "@/components/svgs";
import { getAllCitizen } from "@/components/utils/actions";
import Link from "next/link";
import UserCard from "@/components/shared/UserCard";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

const TopCitizen = async ({ mainData, params }: any) => {
  const allCitizenArray = await getAllCitizen();
  const topFourCitizens = allCitizenArray.data.slice(0, 5);

  return (
    <>
      <div className="w-full flex flex-row justify-between items-center px-3">
        <p className="font-azarMehr font-medium text-[16px] md:text-[20px] lg:text-[28px] xl:text-[32px] dark:text-white ">
          {findByUniqueId(mainData, 493)} {/* عنوان شهروندان برتر */}
        </p>
        <Link href={`/${params.lang}/citizens`}>
          <div className="flex justify-center items-center gap-4">
            {/* <p className="font-azarMehr font-medium text-[12px] md:text-[16px] lg:text-[18px] xl:text-[20px] dark:text-white">
              {findByUniqueId(mainData, 171)} 
            </p> */}
            {/* <ArrowRight className="dark:stroke-white stroke-black rotate-180 w-[24px] h-full" /> */}
          </div>
        </Link>
      </div>
      <div className="w-full relative flex flex-row sm:no-scrollbar1 lg:show-scrollbar1 dark:dark-scrollbar light-scrollbar overflow-x-auto  pb-10 ">
        {topFourCitizens.map((item: any, index: any) => (
          <UserCard
            key={item.id}
            item={item}
            index={index}
            params={params}
            minWidth={`290px`}
            buttonText={findByUniqueId(mainData, 600)}
          />
          
        ))}
     
        <Link href={`/${params.lang}/citizens`}>
          <div
            className="flex-shrink-0 !min-w-[290px] min-h-[435px] md:min-h-[460px] bg-[#fff] dark:bg-[#1A1A18] rounded-[20px] mx-2 flex flex-col gap-3 items-center justify-center hover:scale-105 base-transition-1 shadow-lg cursor-pointer mt-10"
           
          >
            <div className="rounded-full bg-[#0066FF30] dark:bg-[#483D13] aspect-square flex items-center justify-center w-14 h-14 ltr:rotate-180">
              <svg
                width="16"
                height="24"
                viewBox="0 0 17 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="dark:stroke-dark-primary"
                  d="M11.2753 21.6532L1.99609 11.6008L11.2753 1.54834"
                  stroke="#0066FF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="font-azarMehr text-light-primary dark:text-dark-primary text-xl">
              {findByUniqueId(mainData, 171)} {/* مشاهده همه */}
            </p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default TopCitizen;