"use client";

import { useState } from "react";
import axios from "axios";
import InviteListCard from "./invite-list-card";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import Skeleton from "@/components/ui/skeleton";

interface InviteListProps {
  initInviteList: any;
  params: any;
  // referralPageArrayContent: any;
  mainData: any;
}

export default function InviteList({
  initInviteList,
  params,
  // referralPageArrayContent,
  mainData,
}: InviteListProps) {
  /* -------------------------------------------------------------------------- */
  /*                                   Initial                                  */
  /* -------------------------------------------------------------------------- */

  const initialData = Array.isArray(initInviteList?.data)
    ? initInviteList.data
    : [];

  const initialPage =
    Number(initInviteList?.meta?.current_page) || 1;

  /**
   * API واقعی:
   *
   * links.next !== null
   *
   * یعنی صفحه بعدی وجود دارد.
   */
  const initialHasMore =
    initInviteList?.links?.next !== null &&
    initInviteList?.links?.next !== undefined;

  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const [referralList, setReferralList] =
    useState<any[]>(initialData);

  const [searchTerm, setSearchTerm] = useState("");

  const [page, setPage] = useState(initialPage);

  const [loading, setLoading] = useState(false);

  const [hasMore, setHasMore] =
    useState<boolean>(initialHasMore);

  /* -------------------------------------------------------------------------- */
  /*                                   Helpers                                  */
  /* -------------------------------------------------------------------------- */

  /**
   * گرفتن ID یکتا
   *
   * API فعلی:
   * item.id
   *
   * fallback ها برای جلوگیری از duplicate
   */
  const getItemId = (
    item: any,
    index: number
  ): string => {
    if (
      item?.id !== undefined &&
      item?.id !== null
    ) {
      return String(item.id);
    }

    if (
      item?.code !== undefined &&
      item?.code !== null
    ) {
      return String(item.code);
    }

    return `fallback-${index}`;
  };

  /**
   * تشخیص وجود صفحه بعد
   *
   * تنها منبع معتبر برای API فعلی:
   *
   * response.links.next
   */
  const hasNextPage = (
    response: any
  ): boolean => {
    return (
      response?.links?.next !== null &&
      response?.links?.next !== undefined &&
      response?.links?.next !== ""
    );
  };

  /* -------------------------------------------------------------------------- */
  /*                              Search / Filter                               */
  /* -------------------------------------------------------------------------- */

  const searchFetch = async () => {
    if (loading) {
      return;
    }

    try {
      setLoading(true);

      const query = new URLSearchParams();

      const search = searchTerm.trim();

      if (search) {
        query.set("search", search);
      }

      /**
       * هر سرچ از صفحه اول شروع می‌شود.
       */
      query.set("page", "1");

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/citizen/${params.id}/referrals?${query.toString()}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = response.data;

      const data = Array.isArray(
        responseData?.data
      )
        ? responseData.data
        : [];

      const currentPage =
        Number(
          responseData?.meta?.current_page
        ) || 1;

      /**
       * نتایج سرچ جایگزین لیست قبلی می‌شوند.
       */
      setReferralList(data);

      setPage(currentPage);

      /**
       * مهم:
       *
       * اگر:
       *
       * links.next !== null
       *
       * یعنی صفحه بعد وجود دارد.
       *
       * اگر:
       *
       * links.next === null
       *
       * یعنی سرچ به آخر رسیده.
       */
      setHasMore(hasNextPage(responseData));
    } catch (error) {
      console.error(
        "Error fetching referral list:",
        error
      );

      setReferralList([]);

      setPage(1);

      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                Load More                                   */
  /* -------------------------------------------------------------------------- */

  const loadMore = async () => {
    /**
     * جلوگیری از درخواست تکراری
     */
    if (loading || !hasMore) {
      return;
    }

    const nextPage = page + 1;

    try {
      setLoading(true);

      const query = new URLSearchParams();

      query.set(
        "page",
        String(nextPage)
      );

      const search = searchTerm.trim();

      if (search) {
        query.set(
          "search",
          search
        );
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/citizen/${params.id}/referrals?${query.toString()}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = response.data;

      const newData = Array.isArray(
        responseData?.data
      )
        ? responseData.data
        : [];

      /**
       * اگر صفحه بعد خالی باشد،
       * دیگر چیزی وجود ندارد.
       */
      if (newData.length === 0) {
        setHasMore(false);
        return;
      }

      /**
       * اضافه کردن آیتم‌های جدید
       * بدون duplicate
       */
      setReferralList(
        (previousList) => {
          const existingIds =
            new Set(
              previousList.map(
                (item, index) =>
                  getItemId(
                    item,
                    index
                  )
              )
            );

          const uniqueNewItems =
            newData.filter(
              (
                item: any,
                index: number
              ) => {
                const id =
                  getItemId(
                    item,
                    index
                  );

                return !existingIds.has(
                  id
                );
              }
            );

          return [
            ...previousList,
            ...uniqueNewItems,
          ];
        }
      );

      const currentPage =
        Number(
          responseData?.meta
            ?.current_page
        ) || nextPage;

      setPage(currentPage);

      /**
       * این مهم‌ترین قسمت است:
       *
       * API شما:
       *
       * links.next = URL صفحه بعد
       *
       * یا:
       *
       * links.next = null
       */
      setHasMore(
        hasNextPage(
          responseData
        )
      );
    } catch (error) {
      console.error(
        "Error loading more referrals:",
        error
      );

      /**
       * در خطا، لیست قبلی حفظ می‌شود.
       */
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                  Skeleton                                  */
  /* -------------------------------------------------------------------------- */

  const InviteListCardSkeleton =
    () => {
      return (
        <div className="dark:bg-gray-1 bg-white p-3 rounded-xl flex items-center w-full h-[56px] lg:h-[128px]">
          <Skeleton
            variant="circle"
            tone="surface"
            className="w-[50px] h-[50px] lg:w-[80px] lg:h-[80px] shrink-0"
          />

          <div className="flex-1 mx-4 flex flex-col gap-2">
            <Skeleton
              variant="line"
              tone="surface"
              className="h-[10px] lg:h-[20px] w-[60%] rounded-md"
            />

            <Skeleton
              variant="line"
              tone="surface"
              className="h-[10px] lg:h-[16px] w-[35%] rounded-md"
            />
          </div>

          <Skeleton
            variant="line"
            tone="surface"
            className="h-[16px] lg:h-[24px] w-[50px] me-3 rounded-md"
          />

          <Skeleton
            variant="circle"
            tone="surface"
            className="w-[32px] h-[32px] shrink-0"
          />
        </div>
      );
    };

  /* -------------------------------------------------------------------------- */
  /*                                  Language                                  */
  /* -------------------------------------------------------------------------- */

  const isFa =
    params.lang.toLowerCase() ===
    "fa";

  /* -------------------------------------------------------------------------- */
  /*                                   Render                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <>
      {/* -------------------------------------------------------------------- */}
      {/* Header                                                               */}
      {/* -------------------------------------------------------------------- */}

      <div className="flex flex-col py-8 leading-[24px] gap-4 w-full lg:self-start mt-[64px] mb-[32px]">
        <p className="text-black dark:text-white font-black lg:text-2xl">
          {findByUniqueId(
            mainData,
            1424
          )}
        </p>

        <p className="text-matn-2 dark:text-matn-2 lg:text-lg">
          {findByUniqueId(
            mainData,
            1425
          )}
        </p>

        {/* Search */}
        <div className="transition-[right,width] lg:w-[49%] duration-300 ease-in-out flex items-center flex-row justify-between bg-white dark:bg-gray-1 w-full h-[50px] rounded-[12px]">
          <div className="searchIcon flex justify-center ps-7 text-black dark:text-white">
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.67065 8.61694C1.67065 4.68636 4.85702 1.5 8.78759 1.5C12.7182 1.5 15.9045 4.68636 15.9045 8.61694C15.9045 12.5475 12.7182 15.7339 8.78759 15.7339C4.85702 15.7339 1.67065 12.5475 1.67065 8.61694ZM8.78759 0C4.02859 0 0.170654 3.85793 0.170654 8.61694C0.170654 13.3759 4.02859 17.2339 8.78759 17.2339C10.7923 17.2339 12.6371 16.5493 14.101 15.4012L16.8142 18.1073C17.1074 18.3998 17.5823 18.3992 17.8748 18.1059C18.1673 17.8126 18.1667 17.3378 17.8734 17.0453L15.1973 14.3761C16.5696 12.8499 17.4045 10.8309 17.4045 8.61694C17.4045 3.85793 13.5466 0 8.78759 0Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(
                event.target.value
              )
            }
            onKeyDown={(event) => {
              if (
                event.key ===
                "Enter"
              ) {
                searchFetch();
              }
            }}
            className="pr-2 ps-5 text-black dark:text-white bg-transparent flex-1 w-[90%] h-[90%] border-none outline-none text-sm text-aliceblue font-azarMehr text-[16px]"
            placeholder={findByUniqueId(
              mainData,
              1426
            )}
            style={{
              fontSize: "18px",
            }}
          />

          <button
            type="button"
            onClick={searchFetch}
            disabled={loading}
            className="searchButton font-normal text-[95%] pe-5 border-none bg-transparent text-primary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isFa
              ? "جستجو"
              : "Search"}
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* Referral Cards                                                       */}
      {/* -------------------------------------------------------------------- */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {referralList.map(
          (
            item: any,
            index: number
          ) => (
            <InviteListCard
              key={getItemId(
                item,
                index
              )}
              item={item}
              params={params}
            />
          )
        )}

        {/* Loading */}
        {loading &&
          Array.from({
            length: 4,
          }).map((_, index) => (
            <InviteListCardSkeleton
              key={`skeleton-${index}`}
            />
          ))}
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* Empty State                                                          */}
      {/* -------------------------------------------------------------------- */}

      {!loading &&
        referralList.length ===
          0 && (
          <p className="w-full text-center text-white">
            {isFa
              ? "موردی یافت نشد."
              : "No results found."}
          </p>
        )}

      {/* -------------------------------------------------------------------- */}
      {/* View More                                                            */}
      {/* -------------------------------------------------------------------- */}

      {hasMore &&
        referralList.length >
          0 && (
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
            className="block w-[150px] text-primary bg-gray-1 py-4 rounded-xl mt-5 cursor-pointer mx-auto text-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? isFa
                ? "در حال بارگذاری..."
                : "Loading..."
              : isFa
                ? "مشاهده بیشتر"
                : "View more"}
          </button>
        )}
    </>
  );
}
