"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import BuildingIcon from "./BuildingIcon";
import { styleForKarbari } from "./buildingsShared";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
/* ------------------------------------------------------------------ */
/*                                TYPES                                */
/* ------------------------------------------------------------------ */
const PER_PAGE = 9;

/* Real /buildings list item shape (confirmed from the live API):
   { area, building_id, construction_end_date, density, empty_units,
     images: { id, url }[], karbari, visitors }
   Notes vs. the old (wrong) assumptions:
   - there is no "feature_properties_id" field — the real id is
     "building_id" (and it is NOT guaranteed unique per item: two
     entries can share the same building_id with different
     construction_end_date, since they're different physical units of
     the same building type)
   - there is no "floors" field at all — that was never real; "density"
     is what the API actually returns instead
   - "images" is a real array of { id, url } objects — use images[0].url
     as the card photo instead of the static placeholder */
interface BuildingImage {
  id: number;
  url: string;
}

interface BuildingListItem {
  id: string; // synthesized unique key (building_id is not guaranteed unique)
  code: string;
  karbari: string;
  constructionEndDate: string | null;
  visitors: number | null;
  emptyUnits: number | null;
  area: number | null;
  density: number | null;
  images: BuildingImage[];
}

function normalizeBuilding(raw: any, uniqueKeySuffix: string): BuildingListItem {
  const images: BuildingImage[] = Array.isArray(raw?.images)
    ? raw.images.filter((img: any) => typeof img?.url === "string")
    : [];

  return {
    id: `${raw?.building_id ?? "building"}-${uniqueKeySuffix}`,
    code: raw?.building_id ?? "",
    karbari: raw?.karbari ?? "",
    constructionEndDate: raw?.construction_end_date ?? null,
    visitors: raw?.visitors ?? null,
    emptyUnits: raw?.empty_units ?? null,
    area: raw?.area ?? null,
    density: raw?.density ?? null,
    images,
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
function DensityIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path className="dark:stroke-white stroke-black" d="M10.8337 18.3334H4.16699C2.50033 18.3334 1.66699 17.5001 1.66699 15.8334V9.16675C1.66699 7.50008 2.50033 6.66675 4.16699 6.66675H8.33366V15.8334C8.33366 17.5001 9.16699 18.3334 10.8337 18.3334Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path className="dark:stroke-white stroke-black" d="M8.42531 3.33325C8.35865 3.58325 8.33366 3.85825 8.33366 4.16659V6.66659H4.16699V4.99992C4.16699 4.08325 4.91699 3.33325 5.83366 3.33325H8.42531Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path className="dark:stroke-white stroke-black" d="M11.667 6.66675V10.8334" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path className="dark:stroke-white stroke-black" d="M15 6.66675V10.8334" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path className="dark:stroke-white stroke-black" d="M14.167 14.1667H12.5003C12.042 14.1667 11.667 14.5417 11.667 15.0001V18.3334H15.0003V15.0001C15.0003 14.5417 14.6253 14.1667 14.167 14.1667Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path className="dark:stroke-white stroke-black" d="M5 10.8333V14.1666" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <path className="dark:stroke-white stroke-black" d="M8.33301 15.8334V4.16675C8.33301 2.50008 9.16634 1.66675 10.833 1.66675H15.833C17.4997 1.66675 18.333 2.50008 18.333 4.16675V15.8334C18.333 17.5001 17.4997 18.3334 15.833 18.3334H10.833C9.16634 18.3334 8.33301 17.5001 8.33301 15.8334Z" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
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
const PLACEHOLDER_IMAGE = "/images/building-placeholder.jpg";

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

  // Use the real photo from the API when available, placeholder otherwise.
  const imageUrl = item.images[0]?.url || PLACEHOLDER_IMAGE;

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
        <Image
          src={imageUrl}
          alt={label || item.code || "Building"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover rounded-[10px]"
          unoptimized
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

          <div className="flex items-center gap-2 text-[#333] dark:text-[#E8E8E8]">
            <DensityIcon />

             {item.density != null ? `${item.density.toLocaleString(locale)} ${findByUniqueId(mainData, 117)}` : dash}
          </div>
          {/* SEPARATOR */}
          <div className="h-6 w-px bg-black/20 dark:bg-white/20" />

          {/* AREA */}
          <div className="flex items-center gap-2 text-[#333] dark:text-[#E8E8E8]">
            <AreaIcon />
            <span>
              {item.area != null ? `${item.area.toLocaleString(locale)} ${findByUniqueId(mainData, 766)}` : dash}
            </span>
          </div>

          {/* SEPARATOR */}
          <div className="h-6 w-px bg-black/20 dark:bg-white/20" />
          {/* EMPTY UNITS */}
          <div className="flex items-center gap-2 text-[#333] dark:text-[#E8E8E8]">
            <UnitIcon />
            <span>
              {item.emptyUnits != null ? `${item.emptyUnits} ${findByUniqueId(mainData, 1816)}` : dash}
            </span>
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

      const rawItems: any[] = Array.isArray(res.data?.data) ? res.data.data : [];
      // building_id is not guaranteed unique across items (two entries
      // can share it with different construction_end_date), so the
      // React key is synthesized from page + index as well.
      const normalized = rawItems.map((raw, i) => normalizeBuilding(raw, `p${pageNum}-${i}`));

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
