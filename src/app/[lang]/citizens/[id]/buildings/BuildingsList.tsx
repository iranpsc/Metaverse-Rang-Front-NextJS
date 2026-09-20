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

interface BuildingImage {
  id: number;
  url: string;
}

interface BuildingListItem {
  /**
   * Internal unique key used by React.
   *
   * IMPORTANT:
   * This is NOT necessarily the backend building_id.
   * The real uniqueness rule for a card is:
   *
   *     building_id + karbari
   */
  id: string;

  code: string;
  karbari: string;
  constructionEndDate: string | null;
  visitors: number | null;
  emptyUnits: number | null;
  area: number | null;
  density: number | null;
  images: BuildingImage[];
}

/* ------------------------------------------------------------------ */
/*                         NORMALIZATION                               */
/* ------------------------------------------------------------------ */

/**
 * Creates the unique identity of a building card.
 *
 * According to the required UI behavior:
 *
 *   same building_id + same karbari = same card
 *
 * Therefore:
 *
 *   10280 + commercial
 *   10280 + commercial
 *
 * must result in ONE card.
 *
 * But:
 *
 *   10280 + commercial
 *   10280 + residential
 *
 * are two different cards.
 */
function getBuildingUniqueKey(raw: any): string {
  const buildingId = raw?.building_id;

  if (
    buildingId !== undefined &&
    buildingId !== null &&
    String(buildingId).trim() !== ""
  ) {
    return `${String(buildingId)}::${String(raw?.karbari ?? "")}`;
  }

  /**
   * Fallback for malformed records without building_id.
   *
   * We don't want all records with a missing building_id
   * to collapse into one card.
   */
  return [
    "missing-building-id",
    String(raw?.karbari ?? ""),
    String(raw?.construction_end_date ?? ""),
    String(raw?.area ?? ""),
    String(raw?.density ?? ""),
  ].join("::");
}

function normalizeBuilding(
  raw: any,
  uniqueKey: string
): BuildingListItem {
  const images: BuildingImage[] = Array.isArray(raw?.images)
    ? raw.images.filter(
        (img: any) => typeof img?.url === "string"
      )
    : [];

  return {
    /**
     * The key is based on the actual uniqueness rule.
     * This prevents React from treating the same building
     * as different cards.
     */
    id: uniqueKey,

    code:
      raw?.building_id !== undefined &&
      raw?.building_id !== null
        ? String(raw.building_id)
        : "",

    karbari: String(raw?.karbari ?? ""),

    constructionEndDate:
      raw?.construction_end_date ?? null,

    visitors:
      typeof raw?.visitors === "number"
        ? raw.visitors
        : raw?.visitors != null
          ? Number(raw.visitors)
          : null,

    emptyUnits:
      typeof raw?.empty_units === "number"
        ? raw.empty_units
        : raw?.empty_units != null
          ? Number(raw.empty_units)
          : null,

    area:
      typeof raw?.area === "number"
        ? raw.area
        : raw?.area != null
          ? Number(raw.area)
          : null,

    density:
      typeof raw?.density === "number"
        ? raw.density
        : raw?.density != null
          ? Number(raw.density)
          : null,

    images,
  };
}

/* ------------------------------------------------------------------ */
/*                          ICONS                                      */
/* ------------------------------------------------------------------ */

function UnitIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="dark:stroke-white stroke-black"
        d="M2 22H22"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        className="dark:stroke-white stroke-black"
        d="M2.94922 22.0012L2.99922 9.97121C2.99922 9.36121 3.28922 8.78126 3.76922 8.40126L10.7692 2.95125C11.4892 2.39125 12.4992 2.39125 13.2292 2.95125L20.2292 8.39125C20.7192 8.77125 20.9992 9.35121 20.9992 9.97121V22.0012"
        stroke="white"
        strokeMiterlimit="10"
        strokeLinejoin="round"
      />

      <path
        className="dark:stroke-white stroke-black"
        d="M15.5 11H8.5C7.67 11 7 11.67 7 12.5V22H17V12.5C17 11.67 16.33 11 15.5 11Z"
        stroke="white"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        className="dark:stroke-white stroke-black"
        d="M10 16.25V17.75"
        stroke="white"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        className="dark:stroke-white stroke-black"
        d="M10.5 7.5H13.5"
        stroke="white"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AreaIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="dark:stroke-white stroke-black"
        d="M1.6665 18.3334H18.3332"
        stroke="white"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        className="dark:stroke-white stroke-black"
        d="M14.1667 1.66663H5.83333C3.33333 1.66663 2.5 3.15829 2.5 4.99996V18.3333H17.5V4.99996C17.5 3.15829 16.6667 1.66663 14.1667 1.66663Z"
        stroke="white"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        className="dark:stroke-white stroke-black"
        d="M5.8335 13.75H8.3335"
        stroke="white"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        className="dark:stroke-white stroke-black"
        d="M11.6665 13.75H14.1665"
        stroke="white"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        className="dark:stroke-white stroke-black"
        d="M5.8335 10H8.3335"
        stroke="white"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        className="dark:stroke-white stroke-black"
        d="M11.6665 10H14.1665"
        stroke="white"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        className="dark:stroke-white stroke-black"
        d="M5.8335 6.25H8.3335"
        stroke="white"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        className="dark:stroke-white stroke-black"
        d="M11.6665 6.25H14.1665"
        stroke="white"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DensityIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        className="dark:stroke-white stroke-black"
        d="M10.8337 18.3334H4.16699C2.50033 18.3334 1.66699 17.5001 1.66699 15.8334V9.16675C1.66699 7.50008 2.50033 6.66675 4.16699 6.66675H8.33366V15.8334C8.33366 17.5001 9.16699 18.3334 10.8337 18.3334Z"
        stroke="white"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        className="dark:stroke-white stroke-black"
        d="M8.42531 3.33325C8.35865 3.58325 8.33366 3.85825 8.33366 4.16659V6.66659H4.16699V4.99992C4.16699 4.08325 4.91699 3.33325 5.83366 3.33325H8.42531Z"
        stroke="white"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        className="dark:stroke-white stroke-black"
        d="M11.667 6.66675V10.8334"
        stroke="white"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        className="dark:stroke-white stroke-black"
        d="M15 6.66675V10.8334"
        stroke="white"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        className="dark:stroke-white stroke-black"
        d="M14.167 14.1667H12.5003C12.042 14.1667 11.667 14.5417 11.667 15.0001V18.3334H15.0003V15.0001C15.0003 14.5417 14.625 14.1667 14.167 14.1667Z"
        stroke="white"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        className="dark:stroke-white stroke-black"
        d="M5 10.8333V14.1666"
        stroke="white"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        className="dark:stroke-white stroke-black"
        d="M8.33301 15.8334V4.16675C8.33301 2.50008 9.16634 1.66675 10.833 1.66675H15.833C17.4997 1.66675 18.333 2.50008 18.333 4.16675V15.8334C18.333 17.5001 17.4997 18.3334 15.833 18.3334H10.833C9.16634 18.3334 8.33301 17.5001 8.33301 15.8334Z"
        stroke="white"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <path
        d="M3 10h18M8 3v4M16 3v4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*                              LIST CARD                              */
/* ------------------------------------------------------------------ */

const PLACEHOLDER_IMAGE =
  "/images/building-placeholder.jpg";

function BuildingCard({
  item,
  isFa,
  mainData,
}: {
  item: BuildingListItem;
  isFa: boolean;
  mainData: any;
}) {
  const {
    icon,
    color,
    labelFa,
    labelEn,
    uniqueId,
  } = styleForKarbari(item.karbari);

  const label =
    findByUniqueId(mainData, uniqueId) ||
    (isFa ? labelFa : labelEn);

  const locale = isFa ? "fa-IR" : "en-US";
  const dash = "—";

  const imageUrl =
    item.images[0]?.url || PLACEHOLDER_IMAGE;

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
          <BuildingIcon
            iconKey={icon}
            color="#ffffff"
            size={20}
          />

          <span>{label}</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-5 py-5">
        {/* CODE + VISITORS */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold tracking-wide text-[#087CFF] dark:text-[#087CFF]">
            {item.code || dash}
          </span>

          <div className="flex items-center gap-2 text-sm text-[#777] dark:text-[#929292]">
            {findByUniqueId(mainData, 1815)} :
            <span>
              {item.visitors != null
                ? item.visitors.toLocaleString(locale)
                : dash}
            </span>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-5 h-px bg-black/10 dark:bg-white/10" />

        {/* STATS */}
        <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
          {/* DENSITY */}
          <div className="flex items-center gap-2 text-[#333] dark:text-[#E8E8E8]">
            <DensityIcon />

            <span>
              {item.density != null
                ? `${item.density.toLocaleString(locale)} ${findByUniqueId(mainData, 117)}`
                : dash}
            </span>
          </div>

          {/* SEPARATOR */}
          <div className="h-6 w-px bg-black/20 dark:bg-white/20" />

          {/* AREA */}
          <div className="flex items-center gap-2 text-[#333] dark:text-[#E8E8E8]">
            <AreaIcon />

            <span>
              {item.area != null
                ? `${item.area.toLocaleString(locale)} ${findByUniqueId(mainData, 766)}`
                : dash}
            </span>
          </div>

          {/* SEPARATOR */}
          <div className="h-6 w-px bg-black/20 dark:bg-white/20" />

          {/* EMPTY UNITS */}
          <div className="flex items-center gap-2 text-[#333] dark:text-[#E8E8E8]">
            <UnitIcon />

            <span>
              {item.emptyUnits != null
                ? `${item.emptyUnits} ${findByUniqueId(mainData, 1816)}`
                : dash}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*                         SKELETON                                    */
/* ------------------------------------------------------------------ */

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
            <div
              key={i}
              className="h-2.5 w-16 rounded bg-black/5 dark:bg-white/10"
            />
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
  onLoadingChange,
}: {
  params: any;
  selectedKarbari: string[];
  isAllSelected: boolean;
  lang: string;
  mainData: any;
  onLoadingChange?: (loading: boolean) => void;
}) {
  const isFa = lang.toLowerCase() === "fa";

  const [items, setItems] = useState<BuildingListItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(false);

  /* ---------------------------------------------------------------- */
  /*                         FETCH BUILDINGS                           */
  /* ---------------------------------------------------------------- */

  const fetchList = async (pageNum: number) => {
    if (selectedKarbari.length === 0) {
      setItems([]);
      setHasMore(false);
      return;
    }

    try {
      if (pageNum === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      setError(false);

      const qs = new URLSearchParams();

      if (!isAllSelected) {
        selectedKarbari.forEach((code) => {
          qs.append("karbari[]", code);
        });
      }

      qs.append("page", String(pageNum));

      const res = await axios.get(
        `https://dev-api.metarang.com/api/citizen/${params.id}/buildings?${qs.toString()}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const rawItems: any[] = Array.isArray(
        res.data?.data
      )
        ? res.data.data
        : [];

      /* ------------------------------------------------------------ */
      /*                     DEDUPLICATION                             */
      /* ------------------------------------------------------------ */

      /**
       * IMPORTANT:
       *
       * One building can be returned multiple times by the API.
       *
       * Example from the screenshot:
       *
       *   building_id = 10280
       *   karbari     = commercial
       *
       * appears twice.
       *
       * We consider these records the SAME card.
       */

      const uniqueRawItems = Array.from(
        new Map(
          rawItems.map((raw) => [
            getBuildingUniqueKey(raw),
            raw,
          ])
        ).values()
      );

      const normalizedCurrentPage =
        uniqueRawItems.map((raw) =>
          normalizeBuilding(
            raw,
            getBuildingUniqueKey(raw)
          )
        );

      /* ------------------------------------------------------------ */
      /*                 MERGE WITH PREVIOUS PAGES                     */
      /* ------------------------------------------------------------ */

      setItems((prev) => {
        /**
         * Page 1 replaces the previous list.
         */
        if (pageNum === 1) {
          return normalizedCurrentPage;
        }

        /**
         * For "load more", merge old + new and deduplicate again.
         *
         * This is important because the same building might
         * accidentally appear on another API page as well.
         */
        const merged = [...prev, ...normalizedCurrentPage];

        const uniqueMerged = Array.from(
          new Map(
            merged.map((item) => [
              item.id,
              item,
            ])
          ).values()
        );

        return uniqueMerged;
      });

      setPage(pageNum);

      const lastPage =
        res.data?.meta?.last_page ?? pageNum;

      /**
       * Pagination itself still follows the API.
       * Deduplication only affects displayed cards.
       */
      setHasMore(
        pageNum < lastPage &&
          rawItems.length > 0
      );
    } catch (err) {
      console.error(
        "Error fetching buildings list:",
        err
      );

      setError(true);

      if (pageNum === 1) {
        setItems([]);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  /* ---------------------------------------------------------------- */
  /*                          RESET / REFETCH                          */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    fetchList(1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    JSON.stringify(selectedKarbari),
    isAllSelected,
    params.id,
  ]);

  /* ---------------------------------------------------------------- */
  /*                       LOADING CALLBACK                            */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    onLoadingChange?.(loading);
  }, [loading, onLoadingChange]);

  /* ---------------------------------------------------------------- */
  /*                         LOAD MORE                                 */
  /* ---------------------------------------------------------------- */

  const handleLoadMore = () => {
    if (loading || loadingMore || !hasMore) {
      return;
    }

    fetchList(page + 1);
  };

  /* ---------------------------------------------------------------- */
  /*                              UI                                   */
  /* ---------------------------------------------------------------- */

  return (
    <div className="w-full pt-4 flex flex-col gap-4">
      {/* ERROR */}
      {error && (
        <p className="w-full text-center text-red-400 py-4">
          {isFa
            ? "خطا در دریافت لیست املاک."
            : "Failed to load properties."}
        </p>
      )}

      {/* LIST */}
      {!error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {loading && items.length === 0 ? (
            Array.from({ length: PER_PAGE }).map(
              (_, i) => (
                <BuildingCardSkeleton key={i} />
              )
            )
          ) : (
            items.map((item) => (
              <BuildingCard
                key={item.id}
                item={item}
                isFa={isFa}
                mainData={mainData}
              />
            ))
          )}
        </div>
      )}

      {/* EMPTY */}
      {!error &&
        !loading &&
        items.length === 0 && (
          <p className="w-full text-center text-matn-2 py-4">
            {isFa
              ? "ملکی یافت نشد."
              : "No properties found."}
          </p>
        )}

      {/* LOAD MORE */}
      {!error && hasMore && (
        <button
          onClick={handleLoadMore}
          disabled={loadingMore}
          className="text-primary text-sm font-bold text-center py-2"
        >
          {loadingMore
            ? isFa
              ? "در حال بارگذاری..."
              : "Loading..."
            : isFa
              ? "مشاهده بیشتر"
              : "View more"}
        </button>
      )}
    </div>
  );
}