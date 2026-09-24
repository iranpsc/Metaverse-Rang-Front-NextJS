
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import UserCard from "@/components/card/UserCard";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { getAllCitizen } from "@/components/utils/actions";

type Citizen = {
  id: string | number;
  [key: string]: any;
};

type TopCitizenClientProps = {
  mainData: any;
  params: { lang: string };
};

/**
 * لودر مشترک بخش شهروندان
 *
 * برای جلوگیری از تکرار JSX، هم برای:
 * - لود اولیه اطلاعات
 * - کلیک روی "مشاهده همه"
 * استفاده می‌شود.
 */
const CitizenLoadingOverlay = () => (
  <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="container flex h-screen w-full items-center justify-center md:ms-[25vw] lg:ms-[17vw] xl:ms-[15vw] 3xl:ms-[16vw]">
      <div className="holder">
        <div className="box" />
      </div>

      <div className="holder">
        <div className="box" />
      </div>

      <div className="holder">
        <div className="box" />
      </div>
    </div>
  </div>
);

const TopCitizenClient = ({
  mainData,
  params,
}: TopCitizenClientProps) => {
  const [citizens, setCitizens] = useState<Citizen[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // این state از والد به UserCard منتقل می‌شود
  // و لودر دکمه همان کارت را کنترل می‌کند.
  const [activeBtnId, setActiveBtnId] = useState<string | null>(null);

  // فقط برای لینک "مشاهده همه"
  const [linkLoading, setLinkLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchCitizens = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getAllCitizen();

        if (!isMounted) return;

        const topFive = response?.data?.slice(0, 5) ?? [];

        setCitizens(topFive);
      } catch (err: unknown) {
        if (!isMounted) return;

        setError(
          err instanceof Error
            ? err.message
            : "خطا در بارگذاری داده‌ها"
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCitizens();

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * لود اولیه
   */
  if (loading) {
    return <CitizenLoadingOverlay />;
  }

  /**
   * خطای دریافت شهروندان
   */
  if (error) {
    return (
      <div className="w-full px-4 py-8 text-center text-red-600 dark:text-red-400">
        {error}
      </div>
    );
  }

  return (
    <>
      {/* لودر فقط هنگام کلیک روی "مشاهده همه" */}
      {linkLoading && <CitizenLoadingOverlay />}

      {/* عنوان */}
      <div className="flex w-full flex-row items-center justify-between px-3">
        <p className="font-azarMehr font-medium text-[16px] md:text-[20px] lg:text-[28px] xl:text-[32px] dark:text-white">
          {findByUniqueId(mainData, 493)}
        </p>
      </div>

      {/* لیست شهروندان + مشاهده همه */}
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
            activeBtnId={activeBtnId}
            setActiveBtnId={setActiveBtnId}
          />
        ))}

        {/* مشاهده همه */}
        <Link
          href={`/${params.lang}/citizens`}
          onClickCapture={() => setLinkLoading(true)}
          className="flex-shrink-0"
        >
          <div
            className="
              flex min-h-[435px] min-w-[290px] flex-col items-center justify-center
              gap-3 rounded-[20px] bg-white px-4 py-6 shadow-lg
              transition-transform hover:scale-105 dark:bg-[#1A1A18]
              md:min-h-[470px] mx-2 mt-10
            "
          >
            <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-primary-shade-2/30">
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
                  stroke="#0066FF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-primary"
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
};

export default TopCitizenClient;
