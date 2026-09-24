import Link from "next/link";
import UserCard from "@/components/card/UserCard";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { getHomeCitizens } from "@/components/templates/firstpage/homeData";

type Citizen = {
  id: string | number;
  [key: string]: any;
};

type TopCitizenProps = {
  mainData: any;
  params: { lang: string };
};

export default async function TopCitizen({
  mainData,
  params,
}: TopCitizenProps) {
  let citizens: Citizen[] = [];

  try {
    const response = await getHomeCitizens();
    citizens = response?.slice(0, 5) ?? [];
  } catch (error) {
    console.error("❌ TopCitizen error:", error);
  }

  return (
    <>
      <div className="flex w-full flex-row items-center justify-between px-3">
        <p className="font-azarMehr font-medium text-[16px] md:text-[20px] lg:text-[28px] xl:text-[32px] dark:text-white">
          {findByUniqueId(mainData, 493)}
        </p>
      </div>

      <div className="relative flex w-full flex-row items-start gap-4 overflow-x-auto pb-10 sm:no-scrollbar1 lg:show-scrollbar1 dark:dark-scrollbar light-scrollbar">
        {citizens.map((item, index) => (
          <UserCard
            key={item.id}
            item={item}
            index={index}
            params={params}
            minWidth="290px"
            mainData={mainData}
            buttonText={findByUniqueId(mainData, 600)}
          />
        ))}

        <Link
          href={`/${params.lang}/citizens`}
          className="flex-shrink-0"
        >
          <div
            className="
              flex min-h-[435px] min-w-[290px] flex-col items-center justify-center
              gap-3 rounded-[20px] bg-white px-4 py-6 shadow-lg
              transition-transform hover:scale-105 dark:bg-gray-1
              md:min-h-[470px] mx-2 mt-10
            "
          >
            <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-[#9100D930] dark:bg-[#483D13]">
              <svg
                width="16"
                height="24"
                viewBox="0 0 17 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ltr:rotate-180"
                aria-hidden="true"
              >
                <path
                  d="M11.2753 21.6532L1.99609 11.6008L11.2753 1.54834"
                  stroke="#9100D9"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="dark:stroke-dark-primary"
                />
              </svg>
            </div>

            <p className="text-xl font-azarMehr text-primary">
              {findByUniqueId(mainData, 171)}
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}