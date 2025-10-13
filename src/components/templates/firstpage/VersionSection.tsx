"use client";

import { useEffect, useState } from "react";
import VersionContent from "./versionContent";

interface VersionItem {
  id: number;
  version_title: string;
  description: string;
  starts_at: string;
  title: string;
}

interface VersionSectionProps {
  firstPageArrayContent?: { name: string; translation: string }[];
}

const VersionSection = ({ firstPageArrayContent = [] }: VersionSectionProps) => {
  const [allVersionList, setAllVersionList] = useState<VersionItem[]>([]);
  const [activeTabId, setActiveTabId] = useState<number | null>(null);
  const [singleData, setSingleData] = useState<VersionItem | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>(""); // state برای پیام خطا

  // پیدا کردن ترجمه متن‌ها
  function localFind(_name: string) {
    return firstPageArrayContent.find((item) => item.name === _name)?.translation || "";
  }

  // تابع پارس ورژن را به سطح کامپوننت منتقل کنید
  const parseVersion = (version: string): number[] => {
    return version.replace(/v/gi, "").trim().split(".").map(Number);
  };

useEffect(() => {
  const fetchVersions = async () => {
    try {
      const response = await fetch(
        "https://api.rgb.irpsc.com/api/calendar?type=version",
        { method: "GET", cache: "no-store" }
      );

      const data = await response.json();
      const versions: VersionItem[] = data.data || [];

      if (versions.length === 0) {
        setErrorMessage("هیچ نسخه‌ای یافت نشد.");
        setAllVersionList([]);
        setSingleData(null);
        setActiveTabId(null);
        return;
      }

      // مرتب‌سازی نزولی (جدیدترین → قدیمی‌تر)
      const sortedVersions = versions.sort((a, b) => {
        const va = parseVersion(a.version_title);
        const vb = parseVersion(b.version_title);

        for (let i = 0; i < Math.max(va.length, vb.length); i++) {
          const na = va[i] || 0;
          const nb = vb[i] || 0;
          if (na !== nb) return nb - na; // بزرگتر یعنی جدیدتر
        }
        return 0;
      });

      // گرفتن ۴ تای اول (چون نزولی مرتب کردیم، اولین‌ها جدیدترینن)
      const latestVersions = sortedVersions.slice(0, 4);

      // جدیدترین اولین عنصره
      const newest = latestVersions[0];

      setAllVersionList(latestVersions);
      setActiveTabId(newest.id);
      setSingleData(newest);
      setErrorMessage("");
    } catch (error) {
      console.error("Error fetching versions:", error);
      setErrorMessage("خطا در دریافت اطلاعات. لطفا بعدا تلاش کنید.");
    }
  };

  fetchVersions();
}, []);




  // تغییر تب و لود داده مربوط به آن
  const handleTabClick = (id: number) => {
    setActiveTabId(id);
    const selected = allVersionList.find((v) => v.id === id) || null;
    setSingleData(selected);
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-row justify-between items-center">
        <p className="font-azarMehr font-medium text-[16px] md:text-[20px] lg:text-[28px] xl:text-[32px] dark:text-white">
          {localFind("The latest versions")}
        </p>
      </div>

      <div className="border-4 border-[#343434] rounded-[32px] md:rounded-[40px] lg:rounded-[50px] xl:rounded-[56px] flex flex-col justify-start items-start xl:gap-10 lg:gap-10 md:gap-7 sm:gap-5 xs:gap-3 p-5 sm:p-6 md:p-[28px] dark:bg-gradient-to-l bg-[#DEDEE9] dark:from-[#343434] dark:to-[#2E2D28] mt-12">
        {errorMessage ? (
          <p className="text-red-500 font-azarMehr text-center w-full py-10">{errorMessage}</p>
        ) : (
          <>
            <div className="w-full flex flex-nowrap overflow-x-scroll no-scrollbar justify-between items-center gap-2 sm:gap-3">
              {allVersionList.map((item) => (
                <p
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`py-[10px] md:py-3 px-3 md:px-5 3xl:px-10 w-fit text-center font-azarMehr text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] cursor-pointer font-light ${
                    item.id === activeTabId
                      ? "dark:bg-dark-yellow bg-blueLink text-white dark:text-black"
                      : "bg-white dark:bg-[#343434] text-textGray dark:text-white"
                  } rounded-[12px] sm:rounded-[14px] md:rounded-[16px] lg:rounded-[20px] xl:rounded-[24px] whitespace-nowrap`}
                >
                  {item.version_title}
                </p>
              ))}
            </div>

            <div className="w-full">
              {singleData && <VersionContent singleData={singleData} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VersionSection;
