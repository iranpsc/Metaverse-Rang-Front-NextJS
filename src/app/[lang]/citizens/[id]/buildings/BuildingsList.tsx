"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import BuildingIcon from "./BuildingIcon";
import { styleForKarbari } from "./buildingsShared";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
/* ------------------------------------------------------------------ */
/*                                TYPES                                */
/* ------------------------------------------------------------------ */
const PER_PAGE = 9;

/* Real /buildings list item shape (confirmed from the live API):
   { area, construction_end_date, empty_units, feature_properties_id,
     floors, karbari, visitors } — note there is no image/photo field. */
interface BuildingListItem {
  id: string;
  code: string;
  karbari: string;
  constructionEndDate: string | null;
  visitors: number | null;
  emptyUnits: number | null;
  area: number | null;
  floors: number | null;
}

function normalizeBuilding(raw: any): BuildingListItem {
  return {
    id: raw?.feature_properties_id ?? String(raw?.id ?? ""),
    code: raw?.feature_properties_id ?? "",
    karbari: raw?.karbari ?? "",
    constructionEndDate: raw?.construction_end_date ?? null,
    visitors: raw?.visitors ?? null,
    emptyUnits: raw?.empty_units ?? null,
    area: raw?.area ?? null,
    floors: raw?.floors ?? null,
  };
}

/* ------------------------------------------------------------------ */
/*                               ICONS                                 */
/* ------------------------------------------------------------------ */
function UnitIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className="dark:stroke-white stroke-black" d="M2 22H22" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path className="dark:stroke-white stroke-black" d="M2.94922 22.0012L2.99922 9.97121C2.99922 9.36121 3.28922 8.78126 3.76922 8.40126L10.7692 2.95125C11.4892 2.39125 12.4992 2.39125 13.2292 2.95125L20.2292 8.39125C20.7192 8.77125 20.9992 9.35121 20.9992 9.97121V22.0012" stroke="white" strokeMiterlimit="10" strokeLinejoin="round" />
      <path className="dark:stroke-white stroke-black" d="M15.5 11H8.5C7.67 11 7 11.67 7 12.5V22H17V12.5C17 11.67 16.33 11 15.5 11Z" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path className="dark:stroke-white stroke-black" d="M10 16.25V17.75" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path className="dark:stroke-white stroke-black" d="M10.5 7.5H13.5" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function AreaIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className="dark:stroke-white stroke-black" d="M1.6665 18.3334H18.3332" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path className="dark:stroke-white stroke-black" d="M14.1667 1.66663H5.83333C3.33333 1.66663 2.5 3.15829 2.5 4.99996V18.3333H17.5V4.99996C17.5 3.15829 16.6667 1.66663 14.1667 1.66663Z" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path className="dark:stroke-white stroke-black" d="M5.8335 13.75H8.3335" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path className="dark:stroke-white stroke-black" d="M11.6665 13.75H14.1665" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path className="dark:stroke-white stroke-black" d="M5.8335 10H8.3335" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path className="dark:stroke-white stroke-black" d="M11.6665 10H14.1665" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path className="dark:stroke-white stroke-black" d="M5.8335 6.25H8.3335" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path className="dark:stroke-white stroke-black" d="M11.6665 6.25H14.1665" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function FloorIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className="dark:stroke-white stroke-black" d="M10.8332 18.3333H4.1665C2.49984 18.3333 1.6665 17.5 1.6665 15.8333V9.16663C1.6665 7.49996 2.49984 6.66663 4.1665 6.66663H8.33317V15.8333C8.33317 17.5 9.1665 18.3333 10.8332 18.3333Z" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path className="dark:stroke-white stroke-black" d="M8.42483 3.33337C8.35816 3.58337 8.33317 3.85837 8.33317 4.16671V6.66671H4.1665V5.00004C4.1665 4.08337 4.9165 3.33337 5.83317 3.33337H8.42483Z" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path className="dark:stroke-white stroke-black" d="M11.6665 6.66663V10.8333" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path className="dark:stroke-white stroke-black" d="M15 6.66663V10.8333" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path className="dark:stroke-white stroke-black" d="M14.1665 14.1666H12.4998C12.0415 14.1666 11.6665 14.5416 11.6665 15V18.3333H14.9998V15C14.9998 14.5416 14.6248 14.1666 14.1665 14.1666Z" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path className="dark:stroke-white stroke-black" d="M5 10.8334V14.1667" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path className="dark:stroke-white stroke-black" d="M8.3335 15.8333V4.16663C8.3335 2.49996 9.16683 1.66663 10.8335 1.66663H15.8335C17.5002 1.66663 18.3335 2.49996 18.3335 4.16663V15.8333C18.3335 17.5 17.5002 18.3333 15.8335 18.3333H10.8335C9.16683 18.3333 8.3335 17.5 8.3335 15.8333Z" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*                              LIST CARD                              */
/* ------------------------------------------------------------------ */
function BuildingCard({
  item,
  isFa,
  mainData,
}: {
  item: BuildingListItem;
  isFa: boolean;
  mainData: any;
}) {
  const { icon, color, labelFa, labelEn, uniqueId } = styleForKarbari(item.karbari);

  // Same resolution order as PERIOD_OPTIONS: try findByUniqueId first,
  // fall back to the static labelFa/labelEn when mainData has no entry.
  const label = findByUniqueId(mainData, uniqueId);
  const locale = isFa ? "fa-IR" : "en-US";
  const dash = "—";

  // چون API فعلاً image ندارد، عکس پیش‌فرض نمایش داده می‌شود
  const imageUrl = "/images/building-placeholder.jpg";

  return (
    <div
      className="
        group
        overflow-hidden
        rounded-[10px]
        border
        bg-white
        text-[#222]
        transition-all
        duration-300
        dark:bg-[#181918]
        dark:text-white
      "
    >
      {/* IMAGE */}
      <div className="relative h-[250px] w-full overflow-hidden p-3 rounded-[10px]">
        <img
          src={imageUrl}
          alt={label || "Building"}
          className="h-full w-full object-cover rounded-[10px]"
          onError={(e) => {
            e.currentTarget.src = "/Linkp13-516x360.jpg.jpg";
          }}
        />

        {/* KARBARI BADGE */}
        <div
          className="
            absolute
            left-5
            top-5
            flex
            items-center
            gap-2
            rounded-full
            px-4
            py-1
            text-sm
            font-medium
            text-black
            dark:text-white
            shadow-lg
            backdrop-blur-md
            dark:!bg-gray-1 
            !bg-white
          "
        >
          <BuildingIcon iconKey={icon} color="#ffffff" size={20} />
          <span>{label}</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-5 py-5">
        {/* CODE + VISITORS */}
        <div className="flex items-center justify-between">
          {/* CODE */}
          <span className="text-xl font-bold tracking-wide text-[#087CFF] dark:text-[#087CFF]">
            {item.code || dash}
          </span>

          {/* VISITORS */}
          <div className="flex items-center gap-2 text-sm text-[#777] dark:text-[#929292]">
            {findByUniqueId(mainData, 1815)} :
            <span>{item.visitors != null ? `${item.visitors.toLocaleString(locale)}` : dash}</span>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-5 h-px bg-black/10 dark:bg-white/10" />

        {/* STATS */}
        <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
          {/* EMPTY UNITS */}
          <div className="flex items-center gap-1.5 text-[#333] dark:text-[#E8E8E8]">
            <UnitIcon />
            <span>
              {item.emptyUnits != null ? `${item.emptyUnits} ${findByUniqueId(mainData, 1816)}` : dash}
            </span>
          </div>

          {/* SEPARATOR */}
          <div className="h-6 w-px bg-black/20 dark:bg-white/20" />

          {/* AREA */}
          <div className="flex items-center gap-1.5 text-[#333] dark:text-[#E8E8E8]">
            <AreaIcon />
            <span>
              {item.area != null ? `${item.area.toLocaleString(locale)} ${findByUniqueId(mainData, 766)}` : dash}
            </span>
          </div>

          {/* SEPARATOR */}
          <div className="h-6 w-px bg-black/20 dark:bg-white/20" />

          {/* FLOORS */}
          <div className="flex items-center gap-1.5 text-[#333] dark:text-[#E8E8E8]">
            <FloorIcon />
            <span>{item.floors != null ? `${item.floors} ${findByUniqueId(mainData, 117)}` : dash}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function BuildingCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-1 rounded-2xl overflow-hidden flex flex-col animate-pulse">
      <div className="w-full h-[110px] bg-black/5 dark:bg-white/10" />
      <div className="p-4 flex flex-col gap-3">
        <div className="flex justify-between">
          <div className="h-2.5 w-20 rounded bg-black/5 dark:bg-white/10" />
          <div className="h-2.5 w-16 rounded bg-black/5 dark:bg-white/10" />
        </div>
        <div className="grid grid-cols-2 gap-y-2 gap-x-3 pt-3 border-t border-black/5 dark:border-white/10">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-2.5 w-16 rounded bg-black/5 dark:bg-white/10" />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*                          MAIN BUILDINGS LIST                         */
/* ------------------------------------------------------------------ */
export default function BuildingsList({
  params,
  selectedKarbari,
  isAllSelected,
  lang,
  mainData,
}: {
  params: any;
  selectedKarbari: string[];
  isAllSelected: boolean;
  lang: string;
  mainData: any;
}) {
  const isFa = lang.toLowerCase() === "fa";

  const [items, setItems] = useState<BuildingListItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(false);

  const fetchList = async (pageNum: number) => {
    if (selectedKarbari.length === 0) {
      setItems([]);
      setHasMore(false);
      return;
    }
    try {
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);
      setError(false);

      const qs = new URLSearchParams();
      if (!isAllSelected) selectedKarbari.forEach((c) => qs.append("karbari[]", c));
      qs.append("page", String(pageNum));

      const res = await axios.get(
        `https://dev-api.metarang.com/api/citizen/${params.id}/buildings?${qs.toString()}`,
        { headers: { "Content-Type": "application/json" } }
      );

      const rawItems: any[] = res.data?.data || [];
      const normalized = rawItems.map(normalizeBuilding);

      setItems((prev) => (pageNum === 1 ? normalized : [...prev, ...normalized]));
      setPage(pageNum);

      const lastPage = res.data?.meta?.last_page ?? pageNum;
      setHasMore(pageNum < lastPage && normalized.length > 0);
    } catch (err) {
      console.error("Error fetching buildings list:", err);
      setError(true);
      if (pageNum === 1) setItems([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchList(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(selectedKarbari), isAllSelected, params.id]);

  const handleLoadMore = () => {
    if (loading || loadingMore || !hasMore) return;
    fetchList(page + 1);
  };

  return (
    <div className="w-full pt-4 flex flex-col gap-4">
      {error && (
        <p className="w-full text-center text-red-400 py-4">
          {isFa ? "خطا در دریافت لیست املاک." : "Failed to load properties."}
        </p>
      )}

      {!error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {loading && items.length === 0
            ? Array.from({ length: PER_PAGE }).map((_, i) => <BuildingCardSkeleton key={i} />)
            : items.map((item) => <BuildingCard key={item.id} item={item} isFa={isFa} mainData={mainData} />)}
        </div>
      )}

      {!error && !loading && items.length === 0 && (
        <p className="w-full text-center text-matn-2 py-4">
          {isFa ? "ملکی یافت نشد." : "No properties found."}
        </p>
      )}

      {!error && hasMore && (
        <button
          onClick={handleLoadMore}
          disabled={loadingMore}
          className="text-primary  text-sm font-bold text-center py-2"
        >
          {loadingMore ? (isFa ? "در حال بارگذاری..." : "Loading...") : isFa ? "مشاهده بیشتر" : "View more"}
        </button>
      )}
    </div>
  );
}