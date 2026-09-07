"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search } from "@/components/svgs/SvgEducation";
import { switchDigits } from "@/components/utils/DigitSwitch";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { formatDate } from "@/components/utils/formatDate";
import { Skeleton } from "@/components/ui/skeleton";

interface Version {
  id: number;
  title: string;
  version: string;
  date: string;
  description: string;
}

interface VersionBoxProps {
  versions: Version[];
  sendDataParent: (data: Version, fromClick?: boolean) => void;
  params: any;
  mainData: any;
  selectedVersion?: Version | null;
  versionRefs: any | null;
}

// اسکلت یه آیتم لیست، هم‌شکل آیتم واقعی؛ موقع فچ کردن صفحه‌ی بعدی نشون داده میشه
const VersionItemSkeleton = () => (
  <div className="flex w-full justify-between py-2 gap-3">
    <div className="flex flex-col items-center pt-[10px] w-[10px] shrink-0">
      <Skeleton variant="circle" className="!w-[10px] !h-[10px]" />
      <div className="w-[1.5px] flex-1 bg-[rgb(var(--color-gray-3))] mt-1" />
    </div>
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex justify-between">
        <Skeleton className="h-3.5 w-[55%] rounded-md" />
        <Skeleton className="h-3.5 w-[15%] rounded-md" />
      </div>
      <Skeleton className="h-3 w-[35%] rounded-md" />
    </div>
  </div>
);

const VersionBox: React.FC<VersionBoxProps> = ({
  versions,
  sendDataParent,
  params,
  mainData,
  selectedVersion,
  versionRefs,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [, setSelectedItem] = useState<Version | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  // لودینگ مخصوص "نمایش بیشتر" (فچ صفحه‌ی بعدی) - جدا از سرچ، تا فقط اسکلت آیتم‌های اضافه رو نشون بده
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // لیست پایه (پیجینیت‌شده، همون versionsی که از سرور اومده + صفحه‌های بعدی که فچ میشن)
  const [items, setItems] = useState<Version[]>(versions);
  // نتیجه‌ی سرچ؛ null یعنی الان در حالت سرچ نیستیم
  const [searchResults, setSearchResults] = useState<Version[] | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filteredVersions = searchResults ?? items;

  // ست کردن ورژن انتخاب‌شده از props (منبع حقیقت: parent، که از URL/آخرین‌ورژن محاسبه می‌کنه)
  useEffect(() => {
    if (selectedVersion && filteredVersions.length > 0) {
      const index = filteredVersions.findIndex((v) => v.version === selectedVersion.version);
      setOpenIndex(index !== -1 ? index : null);
      setSelectedItem(selectedVersion);
    } else if (!selectedVersion) {
      setOpenIndex(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVersion, filteredVersions]);

  // بررسی اندازه صفحه برای تشخیص موبایل
  useEffect(() => {
    const checkScreenWidth = () => setIsMobile(window.innerWidth < 1024);
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);
    return () => window.removeEventListener("resize", checkScreenWidth);
  }, []);

  // اگه دیتای اولیه از سرور عوض شد (props.versions)، همه چیز رو ریست کن
  useEffect(() => {
    setItems(versions);
    setPage(1);
    setHasMore(true);
    setSearchResults(null);
    setSearchTerm("");
    setVisibleCount(10);
  }, [versions]);

  // اگر کاربر چیزی تایپ نکرده بود، از حالت سرچ خارج شو
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults(null);
      setVisibleCount(10);
    }
  }, [searchTerm]);

  const handleSearch = async () => {
    const query = searchTerm.trim();
    if (!query) {
      setSearchResults(null);
      setVisibleCount(10);
      return;
    }

    setSearchLoading(true);
    try {
      const response = await globalThis.fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/calendar?type=version&search=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (Array.isArray(data.data)) {
        const mapped = data.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description.trim(),
          date: item.starts_at.split(" ")[0],
          version: item.version_title,
        }));
        setSearchResults(mapped);
      } else {
        setSearchResults([]);
      }
      setVisibleCount(10);
    } catch (err) {
      console.error("❌ خطا در جستجو:", err);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleClick = (
    index: number,
    e?: React.MouseEvent<HTMLAnchorElement>
  ) => {
    // preventDefault لازمه چون خود لینک <a href> واقعیه (برای کراول شدن توسط گوگل)
    // ولی نمی‌خوایم فول نویگیشن Next اتفاق بیفته
    e?.preventDefault();
    const selected = filteredVersions[index];
    setOpenIndex((prev) => (prev === index ? null : index));
    setSelectedItem(selected);
    sendDataParent(selected); // fromClick=true (پیش‌فرض) → فقط اینجا URL عوض می‌شه
  };

  const fetchMoreVersions = async () => {
    if (!hasMore || loadingMore || searchResults) return;

    setLoadingMore(true);
    try {
      const response = await globalThis.fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/calendar?type=version&page=${page + 1}`
      );
      const data = await response.json();

      if (Array.isArray(data.data) && data.data.length > 0) {
        const newItems = data.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description.trim(),
          date: item.starts_at.split(" ")[0],
          version: item.version_title,
        }));
        setItems((prev) => [...prev, ...newItems]);
        setVisibleCount((prev) => prev + newItems.length);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("❌ خطا در گرفتن نسخه‌های بیشتر:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleShowMore = () => {
    // آیتم‌هایی که از قبل توی حافظه هستن ولی هنوز نمایش داده نشدن
    if (visibleCount < filteredVersions.length) {
      setVisibleCount((prev) => prev + 10);
      return;
    }
    // در حالت سرچ، همه‌ی نتایج یک‌جا از سرور میان؛ صفحه‌بندی سمت سرور نداریم
    if (searchResults) return;
    // در غیر این صورت، صفحه‌ی بعدی رو از سرور بگیر
    fetchMoreVersions();
  };

  const shouldShowLoadMore = () => {
    if (searchResults) return visibleCount < searchResults.length;
    return visibleCount < items.length || hasMore;
  };

  // scroll to active item
  useEffect(() => {
    if (openIndex !== null && itemRefs.current[openIndex]) {
      itemRefs.current[openIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [openIndex]);

  return (
    <div className="w-full px-2 lg:px-0 lg:mx-[20px] self-center flex flex-col items-center lg:w-[35%] lg:h-full lg:flex-shrink-0 lg:rounded-[20px]">
      {/* search box */}
      <div className="w-full flex items-center border-solid border-[#00000024] border-[1px] justify-between bg-[#FFFF] dark:bg-gray-1  lg:w-full h-[50px] rounded-[12px]">
        <div className="searchIcon flex justify-center p-2">
          <Search className={`fill-primary dark:fill-primary`} />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="dark:text-white pr-2 pl-5 bg-transparent flex-1 border-none outline-none text-sm"
          placeholder={findByUniqueId(mainData, 573)}
        />
        <button
          onClick={handleSearch}
          disabled={searchLoading}
          className="searchButton bg-transparent p-2 text-primary  cursor-pointer disabled:opacity-50"
        >
          {findByUniqueId(mainData, 57)}
        </button>
      </div>

      {/* version list */}
      <div className="bg-[#FFFFFF] mt-[20px] rounded-[20px] w-full dark:bg-gray-1  min-h-[770px]">
        <p className="historyVersionP font-rokh text-[120%] self-start font-[550] pt-[4%] pb-[4%] p-[6%] dark:text-[#FCF9FE] lg:pt-[30px] lg:text-[140%]">
          {findByUniqueId(mainData, 574)}
        </p>

        <div
          ref={containerRef}
          className="versionHistoryInfo flex overflow-auto flex-col items-center overflow-x-hidden rounded-[20px] w-full lg:w-full lg:h-full"
        >
          <div className="historyUpdated pt-4 flex flex-col w-[92%] gap-1 lg:h-[650px]">
            {searchLoading ? (
              <div className="flex flex-col gap-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <VersionItemSkeleton key={`search-skeleton-${i}`} />
                ))}
              </div>
            ) : filteredVersions.length > 0 ? (
              filteredVersions.slice(0, visibleCount).map((item, index) => (
                <Link
                  href={`/${params.lang}/version/${encodeURIComponent(item.version)}`}
                  prefetch={false}
                  scroll={false}
                  ref={(el) => {
                    itemRefs.current[index] = el as unknown as HTMLDivElement;
                    if (versionRefs) {
                      versionRefs.current[item.version] = el as unknown as HTMLDivElement;
                    }
                  }}
                  key={item.id}
                  onClick={(e) => handleClick(index, e)}
                  className={`versionbox cursor-pointer justify-center flex flex-row w-full rounded-[10px] pt-[2px] ${
                    openIndex === index ? "bg-primary-shade-1/25 !text-black" : ""
                  }`}
                >
                  <div className="flex w-full justify-between py-2">
                    <div className="logo pt-[10px] p-[10px] pe-0 md:pe-[10px] flex flex-col">
                      <div className="w-[10px] h-[10px] md:h-[12px] bg-primary dark:bg-primary rounded-full self-center" />
                      <div className="lineBottom w-[1.5px] h-full rounded-[1px] self-center" />
                    </div>

                    <div className="moreInfo lg:w-[91%] w-full">
                      <div className="topParagraph flex flex-row justify-between pr-[8px]">
                        <p
                          className={`textName truncate text-[90%] text-wrap lg:text-nowrap dark:text-[#FCF9FE] ${
                            openIndex === index ? "dark:!text-white font-bold" : ""
                          }`}
                        >
                          {item.title}
                        </p>
                        <p
                          className={`textVersion whitespace-nowrap pe-[15px] ps-[10px] text-[90%] ${
                            openIndex === index ? "dark:text-white" : "text-[#868B90]"
                          }`}
                        >
                          {switchDigits(item.version, params.lang)}
                        </p>
                      </div>

                      <div
                        className={`textDate mt-3 font-[600] pr-[8px] text-[100%] ${
                          openIndex === index
                            ? "text-[#868B90] dark:text-white"
                            : "text-[#868B90] dark:text-[#868B90]"
                        }`}
                      >
                        {formatDate(item.date, params.lang)}
                      </div>

                      <div
                        className={`accordion-content overflow-hidden transition-all duration-300 ease-in-out flex flex-col items-start gap-3 px-2.5 w-full text-sm ${
                          isMobile && openIndex === index ? "max-h-[1000px]" : "max-h-0"
                        }`}
                      >
                        <p className="description dark:text-white">
                          {findByUniqueId(mainData, 1444)}
                        </p>
                        <div
                          className="descriptionParagraph break-all pb-2 break-words text-[90%] text-[#414040] dark:text-[#C4C4C4]"
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="dark:text-white text-center py-4">موردی برای نمایش یافت نشد 😞</p>
            )}

            {/* اسکلت آیتم‌های در حال فچ شدن (نمایش بیشتر) */}
            {loadingMore && (
              <div className="flex flex-col gap-5 pt-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <VersionItemSkeleton key={`more-skeleton-${i}`} />
                ))}
              </div>
            )}

            {visibleCount < filteredVersions.length && (
              <div ref={loadMoreRef} className="h-10 w-full"></div>
            )}

            {!loadingMore && !searchLoading && shouldShowLoadMore() && (
              <button
                onClick={handleShowMore}
                className="mb-5 w-max mx-auto  bg-white dark:bg-gray-1 text-primary md:text-lg  rounded-[12px] px-[40px] py-[16px] base-transition-1 border-2 border-primary hover:text-primary  "
              >
                {findByUniqueId(mainData, 271)}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VersionBox;