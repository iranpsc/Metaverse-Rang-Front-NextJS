"use client";

import { useEffect, useState } from "react";
import VersionContent from "./versionContent";
import { Skeleton } from "@/components/ui/skeleton";

interface VersionItem {
  id: number;
  version_title: string;
  description: string;
  starts_at: string;
  title: string;
}

interface VersionSectionProps {
  firstPageArrayContent?: { name: string; translation: string }[];
  params: any;
  initialVersions?: VersionItem[];
}

/**
 * اسکلت تب‌های ورژن — معادل ۴ تب بالای باکس (چون slice(0,4) می‌گیریم)
 * چون داخل باکس با بک‌گراند bg-[#DEDEE9] / dark gradient قرار داره،
 * tone پیش‌فرض (surface) کافیه.
 */
function VersionTabsSkeleton() {
  return (
    <div className="w-full flex flex-nowrap overflow-x-hidden justify-between items-center gap-2 sm:gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-[38px] md:h-[44px] lg:h-[48px] w-16 md:w-20 lg:w-24 rounded-[12px] sm:rounded-[14px] md:rounded-[16px] lg:rounded-[20px] xl:rounded-[24px]"
        />
      ))}
    </div>
  );
}

/**
 * اسکلت VersionContent — عیناً مطابق title/تاریخ/توضیحات HTML اون کامپوننت
 */
function VersionContentSkeleton() {
  return (
    <div className="w-full">
      <Skeleton className="h-5 md:h-6 w-40 md:w-52 rounded-md" />

      <div className="py-5">
        <Skeleton className="h-4 w-24 rounded-md" />
      </div>

      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-5/6 rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-2/3 rounded-md" />
      </div>
    </div>
  );
}

const VersionSection = ({
  firstPageArrayContent = [],
  initialVersions,
}: VersionSectionProps) => {
  const seeded = initialVersions?.length
    ? initialVersions
    : [];
  const [allVersionList, setAllVersionList] = useState<VersionItem[]>(seeded);
  const [activeTabId, setActiveTabId] = useState<number | null>(
    seeded[0]?.id ?? null
  );
  const [singleData, setSingleData] = useState<VersionItem | null>(
    seeded[0] ?? null
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(!seeded.length);

  // پیدا کردن ترجمه متن‌ها
  function localFind(_name: string) {
    return firstPageArrayContent.find((item) => item.name === _name)?.translation || "";
  }

  // تابع پارس ورژن را به سطح کامپوننت منتقل کنید
  const parseVersion = (version: string): number[] => {
    return version.replace(/v/gi, "").trim().split(".").map(Number);
  };

  useEffect(() => {
    if (initialVersions?.length) {
      setAllVersionList(initialVersions);
      setActiveTabId(initialVersions[0].id);
      setSingleData(initialVersions[0]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchVersions = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/calendar?type=version`,
          { method: "GET" }
        );

        const data = await response.json();
        const versions: VersionItem[] = data.data || [];

        if (cancelled) return;

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
        if (!cancelled) {
          setErrorMessage("خطا در دریافت اطلاعات. لطفا بعدا تلاش کنید.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchVersions();

    return () => {
      cancelled = true;
    };
  }, [initialVersions]);

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

      <div className="border-4 border-[#343434] rounded-xl lg:rounded-[32px] md:rounded-[40px] lg:rounded-[50px] xl:rounded-[56px] flex flex-col justify-start items-start xl:gap-10 lg:gap-10 md:gap-7 sm:gap-5 xs:gap-3 p-5 sm:p-6 md:p-[28px] dark:bg-gradient-to-l bg-[#DEDEE9] dark:from-[#343434] dark:to-[#2E2D28] mt-12">
        {errorMessage ? (
          <p className="text-red-500 font-azarMehr text-center w-full py-10">{errorMessage}</p>
        ) : loading ? (
          // قبلاً این حالت اصلاً هندل نمی‌شد و کاربر یه باکس کاملاً خالی می‌دید
          <>
            <VersionTabsSkeleton />
            <VersionContentSkeleton />
          </>
        ) : (
          <>
            <div className="w-full flex flex-nowrap overflow-x-scroll no-scrollbar justify-between items-center gap-2 sm:gap-3">
              {allVersionList.map((item) => (
                <p
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`py-[10px] md:py-3 px-3 md:px-5 3xl:px-10 w-fit text-center font-azarMehr text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] cursor-pointer font-light ${
                    item.id === activeTabId
                      ? " bg-primary text-white dark:text-black"
                      : "bg-white dark:bg-[#343434] text-matn-2 dark:text-white"
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