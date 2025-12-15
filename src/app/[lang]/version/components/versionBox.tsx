"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search } from "@/components/svgs/SvgEducation";
import { switchDigits } from "@/components/utils/DigitSwitch";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { formatDate } from "@/components/utils/formatDate";

interface Version {
  id: number;
  title: string;
  version: string;
  date: string;
  description: string;
}

interface VersionBoxProps {
  versions: Version[];
  sendDataParent: (data: Version) => void;
  params: any;
  mainData: any;
  disableInitialSelection?: boolean;
  selectedVersion?: Version | null;
  versionRefs:any
}

const VersionBox: React.FC<VersionBoxProps> = ({
  versions,
  sendDataParent,
  params,
  mainData,
  disableInitialSelection = false,
  selectedVersion,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<Version | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(10);
  const [allVersions, setAllVersions] = useState<Version[]>(versions);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [filteredVersions, setFilteredVersions] = useState<Version[]>(versions);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]); // 🔥 ref برای هر آیتم

  const resetSearch = () => setFilteredVersions(versions);

  // ست کردن ورژن انتخاب شده از props
  useEffect(() => {
    if (selectedVersion && versions.length > 0) {
      const index = versions.findIndex(v => v.version === selectedVersion.version);
      if (index !== -1) {
        setOpenIndex(index);
        setSelectedItem(selectedVersion);
      }
    }
  }, [selectedVersion, versions]);

  // بررسی اندازه صفحه برای تشخیص موبایل
  useEffect(() => {
    const checkScreenWidth = () => setIsMobile(window.innerWidth < 1024);
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);
    return () => window.removeEventListener("resize", checkScreenWidth);
  }, []);

  // ست کردن نسخه فیلتر شده اولیه
  useEffect(() => {
    setFilteredVersions(versions);
    setAllVersions(versions);
  }, [versions]);

  // اگر کاربر چیزی تایپ نکرده بود، همه نسخه‌ها را نمایش بده
  useEffect(() => {
    if (!searchTerm.trim()) {
      resetSearch();
    }
  }, [searchTerm]);

  // انتخاب اولین نسخه فقط اگر از URL نسخه نیامده باشد
  useEffect(() => {
    if (!disableInitialSelection && versions.length > 0) {
      const first = versions[0];
      setSelectedItem(first);
      sendDataParent(first);
    }
  }, [versions, disableInitialSelection]);

  const handleSearch = async () => {
    const query = searchTerm.trim();
    if (!query) {
      resetSearch();
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.rgb.irpsc.com/api/calendar?type=version&search=${encodeURIComponent(query)}`
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
        setFilteredVersions(mapped);
      } else {
        setFilteredVersions([]);
      }
    } catch (err) {
      console.error("❌ خطا در جستجو:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (index: number) => {
    const selected = filteredVersions[index];
    setOpenIndex(prev => (prev === index ? null : index));
    setSelectedItem(selected);
    sendDataParent(selected);
  };

  const fetchMoreVersions = async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.rgb.irpsc.com/api/calendar?type=version&page=${page + 1}`
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
        setAllVersions(prev => [...prev, ...newItems]);
        setVisibleCount(prev => prev + newItems.length);
        setPage(prev => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("❌ خطا در گرفتن نسخه‌های بیشتر:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleShowMore = () => {
    if (visibleCount < filteredVersions.length) {
      setVisibleCount(prev => prev + 10);
    } else {
      fetchMoreVersions();
    }
  };

  const shouldShowLoadMore = () =>
    isMobile && visibleCount < filteredVersions.length;

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
      <div className="w-full flex items-center border-solid border-[#00000024] border-[1px] justify-between bg-[#FFFF] dark:bg-[#1A1A18] lg:w-full h-[50px] rounded-[12px]">
        <div className="searchIcon flex justify-center p-2">
          <Search className={`fill-blueLink dark:fill-dark-yellow`} />
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
          className="searchButton bg-transparent p-2 text-[#0066FF] dark:text-[#FFBC00] cursor-pointer"
        >
          {findByUniqueId(mainData, 57)}
        </button>
      </div>

      {/* version list */}
      <div className="bg-[#FFFFFF] mt-[20px] rounded-[20px] w-full dark:bg-[#1A1A18] min-h-[770px]">
        <p className="historyVersionP font-rokh text-[120%] self-start font-[550] pt-[4%] pb-[4%] p-[6%] dark:text-[#FCF9FE] lg:pt-[30px] lg:text-[140%]">
          {findByUniqueId(mainData, 574)}
        </p>

        <div
          ref={containerRef}
          className="versionHistoryInfo flex overflow-auto flex-col items-center overflow-x-hidden rounded-[20px] w-full lg:w-full lg:h-full"
        >
          <div className="historyUpdated pt-4 flex flex-col w-[92%] gap-1 lg:h-[650px]">
            {filteredVersions.length > 0 ? (
              filteredVersions.slice(0, visibleCount).map((item, index) => (
                <div
                  ref={(el) => (itemRefs.current[index] = el)}
                  key={item.id}
                  onClick={() => handleClick(index)}
                  className={`versionbox cursor-pointer justify-center flex flex-row w-full rounded-[10px] pt-[2px] ${
                    openIndex === index
                      ? "bg-[#0066FF1A] dark:bg-[#5a4c1a] !text-black"
                      : ""
                  }`}
                >
                  <div className="flex w-full justify-between py-2">
                    <div className="logo pt-[10px] p-[10px] pe-0 md:pe-[10px] flex flex-col">
                      <div className="w-[10px] h-[10px] md:h-[12px] bg-[#0066FF] dark:bg-[#FFC700] rounded-full self-center" />
                      <div className="lineBottom w-[1.5px] h-full rounded-[1px] self-center" />
                    </div>

                    <div className="moreInfo lg:w-[91%] w-full">
                      <div className="topParagraph flex flex-row justify-between pr-[8px]">
                        <p className={`textName truncate text-[90%] text-wrap lg:text-nowrap dark:text-[#FCF9FE] ${
                          openIndex === index ? "dark:!text-white font-bold" : ""
                        }`}>
                          {item.title}
                        </p>
                        <p className={`textVersion whitespace-nowrap pl-[15px] text-[90%] ${
                          openIndex === index ? "dark:text-white" : "text-[#868B90]"
                        }`}>
                          {switchDigits(item.version, params.lang)}
                        </p>
                      </div>

                      <div className={`textDate mt-3 font-[600] pr-[8px] text-[100%] ${
                        openIndex === index ? "text-[#868B90] dark:text-white" : "text-[#868B90] dark:text-[#868B90]"
                      }`}>
                        {formatDate(item.date, params.lang)}
                      </div>

                      <div className={`accordion-content overflow-hidden transition-all duration-300 ease-in-out flex flex-col items-start gap-3 px-2.5 w-full text-sm ${
                        isMobile && openIndex === index ? "max-h-[1000px]" : "max-h-0"
                      }`}>
                        <p className="description dark:text-white">
                          {findByUniqueId(mainData, 1444)}
                        </p>
                        <div className="descriptionParagraph pb-2 break-words text-[90%] text-[#414040] dark:text-[#C4C4C4]" dangerouslySetInnerHTML={{ __html: item.description }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="dark:text-white text-center py-4">
                موردی برای نمایش یافت نشد 😞
              </p>
            )}
          </div>

          {!isMobile && visibleCount < filteredVersions.length && (
            <div ref={loadMoreRef} className="h-10 w-full"></div>
          )}

          {shouldShowLoadMore() && (
            <button
              onClick={handleShowMore}
              className="mb-5 displayMore bg-white dark:bg-darkGray text-light-primary md:text-lg dark:text-dark-yellow rounded-[12px] px-[40px] py-[16px] base-transition-1 border-2 border-transparent hover:border-light-primary hover:text-light-primary hover:dark:border-dark-yellow lg:hidden"
            >
              {findByUniqueId(mainData, 271)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VersionBox;
