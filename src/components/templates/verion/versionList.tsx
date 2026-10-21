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

const PAGE_STEP = 10;
const MAX_PAGE_LOOKAHEAD = 20;

const sameVersion = (a?: string | null, b?: string | null) =>
  String(a ?? "").trim() === String(b ?? "").trim();

/** تعداد آیتم‌هایی که باید اولش نمایش داده بشن تا ورژن انتخاب‌شده هم توی DOM باشه */
const getInitialVisible = (list: Version[], selected?: Version | null) => {
  if (!selected) return PAGE_STEP;
  const idx = list.findIndex((v) => sameVersion(v.version, selected.version));
  if (idx < 0 || idx < PAGE_STEP) return PAGE_STEP;
  return Math.ceil((idx + 1) / PAGE_STEP) * PAGE_STEP;
};

// مقاوم در برابر نبودن فیلدها (مثلاً وقتی API توی حالت سرچ شکل متفاوتی برمی‌گردونه)
const mapItem = (item: any): Version => ({
  id: item.id,
  title: item.title ?? "",
  description: String(item.description ?? "").trim(),
  date: String(item.starts_at ?? item.date ?? "").split(" ")[0],
  version: String(item.version_title ?? item.version ?? "").trim(),
});

// استخراج آرایه از پاسخ API، با پشتیبانی از چند شکل مختلف
const extractList = (data: any): any[] | null => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.data?.data)) return data.data.data;
  if (Array.isArray(data?.results)) return data.results;
  return null;
};

// نرمال‌سازی متن ورژن برای مقایسه: حروف کوچک، حذف "v" اول، تبدیل ارقام فارسی/عربی به انگلیسی
const normalizeVersionText = (s?: string | null) =>
  String(s ?? "")
    .trim()
    .toLowerCase()
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)))
    .replace(/^v\s*/, "");

// اسکلت یه آیتم لیست، هم‌شکل آیتم واقعی؛ موقع فچ کردن صفحه‌ی بعدی نشون داده میشه
const VersionItemSkeleton = () => (
  <div className="flex w-full justify-between py-2 gap-3">
    <div className="flex flex-col items-center pt-[10px] w-[10px] shrink-0">
      <Skeleton variant="circle" className="w-[10px]! h-[10px]!" />
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
  // مقدار اولیه طوری حساب میشه که ورژن انتخاب‌شده (مثلا بعد رفرش) حتما رندر بشه
  const [visibleCount, setVisibleCount] = useState<number>(() =>
    getInitialVisible(versions, selectedVersion)
  );
  const [page, setPage] = useState<number>(1);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  // لودینگ مخصوص "نمایش بیشتر" (فچ صفحه‌ی بعدی) - جدا از سرچ
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // لیست پایه (پیجینیت‌شده، همون versionsی که از سرور اومده + صفحه‌های بعدی که فچ میشن)
  const [items, setItems] = useState<Version[]>(versions);
  // نتیجه‌ی سرچ؛ null یعنی الان در حالت سرچ نیستیم
  const [searchResults, setSearchResults] = useState<Version[] | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  // برای اینکه برای هر openIndex فقط یک بار اسکرول انجام بشه (نه با هر نمایش بیشتر)
  const lastScrolledIndex = useRef<number | null>(null);
  // برای جلوگیری از تداخل چند درخواست سرچ پشت سر هم (فقط آخرین جواب اعمال میشه)
  const searchRequestId = useRef<number>(0);

  const filteredVersions = searchResults ?? items;

  // کلید پایدار از محتوای versions؛ اگه والد هر رندر آرایه‌ی جدید بسازه (رفرنس عوض بشه)
  // ولی محتوا یکی باشه، افکت ریست اجرا نمیشه و نتیجه‌ی سرچ پاک نمیشه
  const versionsKey = versions.map((v) => `${v.id}:${v.version}`).join(",");

  // ست کردن ورژن انتخاب‌شده از props (منبع حقیقت: parent، که از URL/آخرین‌ورژن محاسبه می‌کنه)
  useEffect(() => {
    if (selectedVersion && filteredVersions.length > 0) {
      const index = filteredVersions.findIndex((v) =>
        sameVersion(v.version, selectedVersion.version)
      );
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

  // اگه دیتای اولیه از سرور واقعاً عوض شد (نه فقط رفرنس)، همه چیز رو ریست کن
  useEffect(() => {
    setItems(versions);
    setPage(1);
    setHasMore(true);
    setSearchResults(null);
    setSearchTerm("");
    setVisibleCount(getInitialVisible(versions, selectedVersion));
    lastScrolledIndex.current = null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [versionsKey]);

  // اگه ورژن انتخاب‌شده بیرون از بخش نمایش‌داده‌شده بود (مثلا با back/forward)، تعداد نمایشی رو زیاد کن
  // این افکت باید بعد از افکت ریست بالا باشه
  useEffect(() => {
    if (!selectedVersion) return;
    const idx = filteredVersions.findIndex((v) =>
      sameVersion(v.version, selectedVersion.version)
    );
    if (idx >= 0 && idx >= visibleCount) {
      setVisibleCount(Math.ceil((idx + 1) / PAGE_STEP) * PAGE_STEP);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVersion, filteredVersions]);

  // اگر کاربر چیزی تایپ نکرده بود (یا باکس رو خالی کرد)، از حالت سرچ خارج شو
  useEffect(() => {
    if (!searchTerm.trim()) {
      searchRequestId.current += 1; // جواب‌های در راه سرچ قبلی نادیده گرفته بشن
      setSearchResults(null);
      setVisibleCount(PAGE_STEP);
    }
  }, [searchTerm]);

  // تطبیق محلی روی نسخه‌هایی که الان توی حافظه داریم (ورژن یا عنوان)
  const findLocalMatches = (query: string): Version[] => {
    const q = query.trim().toLowerCase();
    const nq = normalizeVersionText(query);
    if (!q) return [];
    return items.filter(
      (v) =>
        normalizeVersionText(v.version).includes(nq) ||
        String(v.title ?? "").toLowerCase().includes(q)
    );
  };

  const handleSearch = async () => {
    const query = searchTerm.trim();
    if (!query) {
      setSearchResults(null);
      setVisibleCount(PAGE_STEP);
      return;
    }

    const requestId = ++searchRequestId.current;
    setSearchLoading(true);
    try {
      // هم با متن اصلی (مثلاً v1.1.1) و هم بدون "v" (1.1.1) از سرور می‌پرسیم؛
      // چون ممکنه بک‌اند فقط روی عنوان یا فقط روی ورژن بدون پیشوند جستجو کنه
      const normalizedQuery = normalizeVersionText(query);
      const queries = Array.from(new Set([query, normalizedQuery].filter(Boolean)));

      const responses = await Promise.allSettled(
        queries.map(async (q) => {
          const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/calendar?type=version&search=${encodeURIComponent(q)}`;
          const response = await globalThis.fetch(url);
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const data = await response.json();
          return extractList(data) ?? [];
        })
      );

      // اگه همه‌ی درخواست‌ها شکست خوردن، بره توی catch
      if (responses.every((r) => r.status === "rejected")) {
        throw (responses[0] as PromiseRejectedResult).reason;
      }

      // اگه بین این‌همه، سرچ جدیدتری زده شده یا باکس خالی شده، این جواب رو دور بریز
      if (requestId !== searchRequestId.current) return;

      const serverResults = responses
        .filter((r): r is PromiseFulfilledResult<any[]> => r.status === "fulfilled")
        .flatMap((r) => r.value)
        .map(mapItem);

      // ادغام نتیجه‌ی سرور + تطبیق محلی روی ورژن/عنوان، بدون تکرار
      const merged = new Map<number, Version>();
      [...serverResults, ...findLocalMatches(query)].forEach((v) => {
        if (!merged.has(v.id)) merged.set(v.id, v);
      });

      // ورژن‌هایی که دقیقاً با عبارت جستجو برابرن بیان بالا
      const sorted = Array.from(merged.values()).sort((a, b) => {
        const aExact = normalizeVersionText(a.version) === normalizedQuery ? 0 : 1;
        const bExact = normalizeVersionText(b.version) === normalizedQuery ? 0 : 1;
        return aExact - bExact;
      });

      setSearchResults(sorted);
      setVisibleCount(PAGE_STEP);
      lastScrolledIndex.current = null;
    } catch (err) {
      console.error("❌ خطا در جستجو:", err);
      if (requestId === searchRequestId.current) {
        // اگه سرور خطا داد، حداقل از نسخه‌هایی که توی حافظه داریم نتیجه نشون بده
        setSearchResults(findLocalMatches(query));
      }
    } finally {
      if (requestId === searchRequestId.current) {
        setSearchLoading(false);
      }
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

  /**
   * صفحه‌ی بعدی رو می‌گیره. چون سرور ممکنه چند صفحه‌ی اول رو از قبل داده باشه
   * (وقتی ورژن انتخاب‌شده توی صفحه‌ی ۲+ بوده)، آیتم‌های تکراری با id حذف میشن
   * و تا وقتی فقط تکراری برگرده، صفحه‌ی بعدی گرفته میشه.
   */
  const fetchMoreVersions = async () => {
    if (!hasMore || loadingMore || searchResults) return;

    setLoadingMore(true);
    try {
      const knownIds = new Set(items.map((v) => v.id));
      let currentPage = page;
      let fresh: Version[] = [];
      let reachedEnd = false;

      for (let i = 0; i < MAX_PAGE_LOOKAHEAD; i++) {
        currentPage += 1;
        const response = await globalThis.fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/calendar?type=version&page=${currentPage}`
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        const list = extractList(data);

        if (!list || list.length === 0) {
          reachedEnd = true;
          break;
        }

        fresh = list.map(mapItem).filter((v: Version) => !knownIds.has(v.id));
        if (fresh.length > 0) break;
      }

      if (fresh.length > 0) {
        setItems((prev) => [...prev, ...fresh]);
        setVisibleCount((prev) => prev + fresh.length);
      }
      setPage(currentPage);
      if (reachedEnd) setHasMore(false);
    } catch (err) {
      console.error("❌ خطا در گرفتن نسخه‌های بیشتر:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleShowMore = () => {
    // آیتم‌هایی که از قبل توی حافظه هستن ولی هنوز نمایش داده نشدن
    if (visibleCount < filteredVersions.length) {
      setVisibleCount((prev) => prev + PAGE_STEP);
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

  // اسکرول به آیتم فعال - فقط داخل کانتینر لیست (بدون اسکرول شدن کل صفحه)
  // به visibleCount هم وابسته‌ست تا اگه آیتم بعدا رندر شد، اسکرول انجام بشه؛
  // ولی با lastScrolledIndex فقط یک بار برای هر انتخاب.
  useEffect(() => {
    if (openIndex === null) {
      lastScrolledIndex.current = null;
      return;
    }
    if (lastScrolledIndex.current === openIndex) return;

    const raf = requestAnimationFrame(() => {
      const container = containerRef.current;
      const el = itemRefs.current[openIndex];
      if (!container || !el) return; // آیتم هنوز رندر نشده؛ با تغییر visibleCount دوباره تلاش میشه

      const containerRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const offset =
        elRect.top - containerRect.top - containerRect.height / 2 + elRect.height / 2;

      container.scrollBy({ top: offset, behavior: "smooth" });
      lastScrolledIndex.current = openIndex;
    });

    return () => cancelAnimationFrame(raf);
  }, [openIndex, visibleCount]);

  // جلوگیری از رسیدن رویداد wheel/touch به لایه‌های بالاتر (مثلاً کتابخونه‌ی smooth scroll مثل Lenis
  // یا هندلر اسکرول والد) تا فقط خود لیست اسکرول بشه و صفحه تکون نخوره
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const stop = (e: Event) => e.stopPropagation();
    el.addEventListener("wheel", stop, { passive: true });
    el.addEventListener("touchmove", stop, { passive: true });
    return () => {
      el.removeEventListener("wheel", stop);
      el.removeEventListener("touchmove", stop);
    };
  }, []);

  return (
    <div className="w-full px-2 lg:px-0 lg:mx-[20px] self-center flex flex-col items-center lg:w-[35%] lg:h-full lg:shrink-0 lg:rounded-[20px]">
      {/* search box */}
      <div className="w-full flex items-center border-solid border-[#00000024] border justify-between bg-[#FFFF] dark:bg-gray-1  lg:w-full h-[50px] rounded-[12px]">
        <div className="searchIcon flex justify-center p-2">
          <Search className={`fill-primary dark:fill-primary`} />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className="dark:text-white pr-2 pl-5 bg-transparent flex-1 border-none outline-hidden text-sm"
          placeholder={findByUniqueId(mainData, 573)}
        />
        <button
          type="button"
          onClick={handleSearch}
          disabled={searchLoading}
          className="searchButton bg-transparent p-2 text-primary  cursor-pointer disabled:opacity-50"
        >
          {findByUniqueId(mainData, 57)}
        </button>
      </div>

      {/* version list */}
      <div className="bg-[#FFFFFF] mt-[20px] rounded-[20px] w-full dark:bg-gray-1 pb-4">
        <p className="historyVersionP font-rokh text-[120%] self-start font-[550] pt-[4%] pb-[4%] p-[6%] dark:text-[#FCF9FE] lg:pt-[30px] lg:text-[140%]">
          {findByUniqueId(mainData, 574)}
        </p>

        {/* کانتینر اسکرول: ارتفاع ثابت + overflow-y-auto + overscroll-contain */}
        <div
          ref={containerRef}
          data-lenis-prevent
          data-lenis-prevent-wheel
          data-lenis-prevent-touch
          style={{ overscrollBehavior: "contain" }}
          className="versionHistoryInfo flex flex-col items-center overflow-y-auto overflow-x-hidden overscroll-contain rounded-[20px] w-full max-h-[80vh] lg:h-[678px] lg:max-h-[678px]"
        >
          <div className="historyUpdated pt-4 flex flex-col w-[92%] gap-1">
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
                    openIndex === index ? "bg-primary-shade-1/25 text-black!" : ""
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
                            openIndex === index ? "dark:text-white! font-bold" : ""
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
                        className={`textDate mt-3 font-semibold pr-[8px] text-[100%] ${
                          openIndex === index
                            ? "text-[#868B90] dark:text-white"
                            : "text-[#868B90] dark:text-[#868B90]"
                        }`}
                      >
                        {formatDate(item.date, params.lang)}
                      </div>

                      <div
                        className={`accordion-content overflow-hidden transition-all duration-300 ease-in-out flex flex-col items-start gap-3 px-2.5 w-full text-sm ${
                          isMobile && openIndex === index ? "max-h-[2500px]" : "max-h-0"
                        }`}
                      >
                        <p className="description dark:text-white">
                          {findByUniqueId(mainData, 1444)}
                        </p>
                        <div
                          className="descriptionParagraph break-all pb-2 wrap-break-word text-[90%] text-[#414040] dark:text-[#C4C4C4]"
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
                type="button"
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