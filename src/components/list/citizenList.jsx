"use client";
// import { getAllCitizen } from "@/components/utils/actions";

import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "@/components/card/UserCard";
import { UserCardSkeleton } from "@/components/skeleton/UserCardSkeleton";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

// تعداد کارت اسکلتی که موقع "مشاهده بیشتر" نشون داده می‌شه — چون سایز واقعی
// صفحه‌ی بعدی (per_page از API) قبل از رسیدن جواب مشخص نیست، یه عدد معقول
// (۴) گذاشتیم. اگه per_page واقعی API رو می‌دونی (مثلاً ۸ یا ۱۲)، همین عدد
// رو با SKELETON_COUNT جایگزین کن تا کاملاً منطبق باشه.
const SKELETON_COUNT = 4;

export default function CitizenList({
  params,
  allCitizenArray,
  defaultTheme,
  mainData
}) {


  const [localCitizenArray, setLocalCitizenArray] = useState(allCitizenArray);
  const isDisabled = false;
  const [currentPage, setCurrentPage] = useState(2);
  const [lastPage, setLastPage] = useState(2);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState("");
  const [activeBtnId, setActiveBtnId] = useState(null);


  useEffect(() => {
    const fetchButtonText = async () => {
      const text = await findByUniqueId(mainData, 600);
      setButtonText(text);
      setLoading(false);  // Set loading to false when data is fetched
    };

    fetchButtonText();
  }, [mainData]);



  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {

  }, [isMounted]);

  const handleLoadMore = async () => {
    setLoading(true)
    try {
      // Increment page AFTER fetching data to avoid incorrect pagination
      const nextPage = currentPage + 1;

      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users?page=${nextPage}`);

      setLastPage(res.data.meta.to);

      // Update state correctly without mutating the existing array
      setLocalCitizenArray((prevCitizens) => [...prevCitizens, ...res.data.data]);

      setCurrentPage(nextPage);

      if (nextPage >= lastPage) {
        // setIsDisabled(true);
      }
    } catch (error) {
      console.error("Error fetching more users:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {localCitizenArray.map((item, index) => (
        <UserCard
          minWidth='280px'
          key={index}
          item={item}
          index={index}
          params={params}
          buttonText={buttonText}
          mainData={mainData}
          activeBtnId={activeBtnId}
          setActiveBtnId={setActiveBtnId}
        />
      ))}

      {/* موقع لود صفحه بعدی، به‌جای اسپینر، کارت‌های اسکلت هم‌شکل با
          UserCard واقعی نشون داده می‌شه تا انگار آیتم‌های بعدی دارن میان */}
      {loading &&
        Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <UserCardSkeleton key={`skeleton-${i}`} minWidth="280px" />
        ))}

      <div className="w-full flex justify-center mt-[40px]">
        {!loading && (
          <button
            disabled={isDisabled}
            title={isDisabled ? "صفحه آخر" : ""}
            className={`${isDisabled ? "cursor-not-allowed" : ""
              }bg-white dark:bg-gray-1 text-primary md:text-lg  rounded-[12px] px-[40px] py-[16px] base-transition-1 border-2 border-transparent hover:border-primary hover:text-primary hover:`}
            onClick={handleLoadMore}
          >
            {params.lang == "fa" ? "مشاهده بیشتر" : "View More"}
          </button>
        )}
      </div>
    </>
  );
}