"use client";
import React, { useState, useEffect, useRef } from "react";
import { Search } from "@/components/svgs/SvgEducation";

interface Version {
  id: number;
  title: string;
  version: string;
  date: string;
  description: string;
}

interface VersionBoxProps {
  versions: Version[];
  sendDataParent: (data: Version) => void; // ✅ ارسال `Version` به جای `string`
}

const VersionBox: React.FC<VersionBoxProps> = ({
  versions,
  sendDataParent,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<Version | null>(
    versions.length > 0 ? versions[0] : null
  );
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(10);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (versions.length > 0) {
      setSelectedItem(versions[0]);
      sendDataParent(versions[0]);
    }
  }, [versions]);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);
    return () => window.removeEventListener("resize", checkScreenWidth);
  }, []);

  const handleClick = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    setSelectedItem(versions[index]);
    sendDataParent(versions[index]);
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  const filteredVersions = versions.filter(
    (item) =>
      item.title.includes(searchTerm) || item.version.includes(searchTerm)
  );

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

      if (scrollHeight - scrollTop - clientHeight < 10) {
        setVisibleCount((prevCount) => prevCount + 10);
      }
    };

    if (!isMobile && containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isMobile]);

  return (
    <div className="w-full mx-[20px] self-start flex flex-col items-center lg:w-[35%] lg:min-w-[370px] lg:h-full lg:flex-shrink-0 lg:rounded-[20px]">
      <div className="searchBoxContainer w-full flex items-center border-solid border-[#00000024] border-[1px] justify-between bg-[#FFFF] dark:bg-[#1A1A18] lg:w-full h-[50px] rounded-[12px]">
        <div className="searchIcon flex justify-center p-2">
          <Search className={`fill-blueLink dark:fill-dark-yellow`} />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="dark:text-white pr-2 pl-5 bg-transparent flex-1 border-none outline-none text-sm"
          placeholder="ورژن، عنوان و یا تاریخ مورد نیاز خود را جستجو کنید"
        />
        <button className="searchButton bg-transparent p-2 text-[#0066FF] dark:text-[#FFBC00] cursor-pointer">
          جستجو
        </button>
      </div>

      <div className="bg-[#FFFFFF] mt-[20px] rounded-[20px] w-full dark:bg-[#080807]">
        <p className="historyVersionP font-rokh text-[120%] self-start font-[550] pt-[4%] pb-[4%] p-[6%] dark:text-[#FCF9FE] lg:pt-[30px] lg:text-[140%]">
          تاریخچه ورژن ها
        </p>

        <div
          ref={containerRef}
          className="versionHistoryInfo flex overflow-auto flex-col items-center rounded-[20px] w-full lg:w-full lg:h-full"
        >
          <div className="historyUpdated pt-4 flex flex-col w-[92%] gap-1 lg:h-[650px]">
            {filteredVersions.length > 0 ? (
              filteredVersions
                .slice(0, visibleCount)
                .map((item, index: number) => (
                  <div
                    key={item.id}
                    onClick={() => handleClick(index)}
                    className={`versionbox cursor-pointer flex flex-row w-full rounded-[10px] pt-[2px] ${
                      openIndex === index
                        ? "bg-[#0066FF1A] dark:bg-[#ffc8002f]"
                        : ""
                    }`}
                  >
                    <div className="logo pt-[10px] p-[10px] flex flex-col">
                      <div className="w-[10px] h-[12px] bg-[#0066FF] dark:bg-[#FFC700] rounded-full self-center" />
                      <div className="lineBottom w-[1px] h-full bg-[#e6e5e5] dark:bg-[#1A1A18] rounded-[1px] self-center" />
                    </div>
                    <div className="moreInfo w-full">
                      <div className="topParagraph flex flex-row justify-between pr-[8px]">
                        <p className="textName truncate text-[90%]   dark:text-[#FCF9FE]">
                          {item.title}
                        </p>

                        <p
                          className={`textVersion whitespace-nowrap pl-[15px] text-[90%] ${
                            openIndex === index
                              ? "dark:text-[#ffff]"
                              : "text-[#868B90]"
                          }`}
                        >
                          {item.version}
                        </p>
                      </div>
                      <p
                        className={`textDate font-[600] pt-[20px] pb-[20px] pr-[8px] text-[100%] ${
                          openIndex === index
                            ? "text-[#868B90]"
                            : "text-[#868B90] dark:text-[#4C4C4C]"
                        }`}
                      >
                        {item.date}
                      </p>

                      <div
                        className={`accordion-content overflow-hidden transition-all duration-300 ease-in-out flex flex-col items-start gap-3 px-2.5 ${
                          isMobile && openIndex === index
                            ? "max-h-[1000px]"
                            : "max-h-0"
                        }`}
                      >
                        <p className="description dark:text-white">توضیحات :</p>
                        <div className="descriptionParagraph pb-2 text-[90%] text-[#414040] dark:text-[#C4C4C4]">
                          <p>{item.description}</p>
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
          {isMobile && visibleCount < filteredVersions.length && (
            <button
              onClick={handleShowMore}
              className="displayMore py-[30px] bg-transparent text-[#0066FF] dark:text-[#FFC700] cursor-pointer lg:hidden"
            >
              مشاهده بیشتر
            </button>
          )}
        </div>


        
      </div>
    </div>
  );
};

export default VersionBox;
