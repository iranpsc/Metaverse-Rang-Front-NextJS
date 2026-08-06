"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import MapComponent, { MapMarkerItem } from "./Map";
import {
  KarbariOption,
  resolveIconKey,
  ICON_COLORS,
  buildFeatureLink,
  getKarbariLabel,
} from "./featuresShared";

/* ------------------------------------------------------------------ */
/*                                TYPES                                */
/* ------------------------------------------------------------------ */
const LIST_PER_PAGE = 10;

interface RawMapMarker {
  id: number;
  karbari: string;
  center: { x: number; y: number };
}

/* NOTE: the /features endpoint's `data` item schema wasn't provided
   with real values (the sample response had `data: []`). Field names
   below are inferred from the property-details screenshot — if the
   real payload uses different keys, only `normalizeFeature` needs
   updating; nothing else depends on the raw shape. */
interface FeatureDetail {
  id: number;
  code: string;
  address: string;
  area: number | null;
  floors: number | null;
  owner_code: string;
  sale_price: number | null;
  rent_price: number | null;
  karbari: string;
  longitude?: number;
  latitude?: number;
}

function normalizeFeature(raw: any): FeatureDetail {
  return {
    id: raw?.id,
    code: raw?.code ?? raw?.feature_code ?? raw?.unique_code ?? String(raw?.id ?? ""),
    address: raw?.address ?? raw?.location_address ?? "",
    area: raw?.area ?? raw?.meterage ?? raw?.square_meters ?? null,
    floors: raw?.floors ?? raw?.floor_count ?? raw?.density ?? null,
    owner_code: raw?.owner_code ?? raw?.owner?.code ?? raw?.citizen_code ?? "",
    sale_price: raw?.sale_price ?? raw?.price?.sale ?? null,
    rent_price: raw?.rent_price ?? raw?.price?.rent ?? null,
    karbari: raw?.karbari ?? "",
  };
}

/* ------------------------------------------------------------------ */
/*                               ICONS                                 */
/* ------------------------------------------------------------------ */
function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 19 19" fill="none" className="shrink-0">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.67065 8.61694C1.67065 4.68636 4.85702 1.5 8.78759 1.5C12.7182 1.5 15.9045 4.68636 15.9045 8.61694C15.9045 12.5475 12.7182 15.7339 8.78759 15.7339C4.85702 15.7339 1.67065 12.5475 1.67065 8.61694ZM8.78759 0C4.02859 0 0.170654 3.85793 0.170654 8.61694C0.170654 13.3759 4.02859 17.2339 8.78759 17.2339C10.7923 17.2339 12.6371 16.5493 14.101 15.4012L16.8142 18.1073C17.1074 18.3998 17.5823 18.3992 17.8748 18.1059C18.1673 17.8126 18.1667 17.3378 17.8734 17.0453L15.1973 14.3761C16.5696 12.8499 17.4045 10.8309 17.4045 8.61694C17.4045 3.85793 13.5466 0 8.78759 0Z"
        className="fill-black dark:fill-white"
      />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function OfferIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M9.5 14.5c.4.7 1.3 1.2 2.5 1.2 1.6 0 2.6-.8 2.6-1.9 0-2.6-5-1.2-5-3.8 0-1.1 1-1.9 2.5-1.9 1.1 0 2 .4 2.4 1.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function CartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20 8H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9.5" cy="20.5" r="1.3" fill="currentColor" />
      <circle cx="17" cy="20.5" r="1.3" fill="currentColor" />
    </svg>
  );
}
function BuildingGlyph({ color }: { color: string }) {
  return (
    
<svg className="size-6" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.46191 6.36262C2.46197 3.08782 4.9121 1.6006 7.89941 3.06282L13.4375 5.80012C14.6375 6.38765 15.625 7.95054 15.625 9.26301V26.2503C15.625 26.9377 15.0624 27.5002 14.375 27.5003H5.09961C3.64972 27.5002 2.46191 26.3373 2.46191 24.9124L2.46191 6.36262ZM27.5 24.3753C27.4999 26.1002 26.0999 27.5002 24.375 27.5003H18.7119C18.0371 27.5001 17.5 26.9623 17.5 26.2874V23.5882C18.8374 23.7506 20.2502 23.3626 21.2627 22.5501C22.1127 23.2375 23.2003 23.6507 24.3877 23.6507C25.5501 23.6506 26.6376 23.2376 27.5 22.5501V24.3753ZM17.5 15.0003C17.5 14.2004 18.237 13.6009 19.0244 13.7757L21.2627 14.2757L21.8623 14.4124L24.4121 14.9876C25.0246 15.1126 25.5877 15.3255 26.0752 15.638C26.0754 15.6489 26.0848 15.6506 26.0869 15.6507C26.2119 15.7382 26.3377 15.838 26.4502 15.9505C27.025 16.5255 27.3998 17.3634 27.4873 18.5882C27.4874 18.663 27.5 18.738 27.5 18.8128V18.8255C27.3999 20.4628 26.0624 21.7755 24.3877 21.7757C22.6504 21.7757 21.263 20.363 21.2627 18.6507C21.2624 20.5629 19.4997 22.1005 17.5 21.7132V15.0003ZM6.875 15.3128C6.3625 15.3128 5.9375 15.7378 5.9375 16.2503C5.93754 16.7628 6.36252 17.1878 6.875 17.1878H11.2119C11.7369 17.1878 12.1494 16.7628 12.1494 16.2503C12.1494 15.7378 11.7244 15.3128 11.2119 15.3128H6.875ZM6.875 10.3128C6.3625 10.3128 5.9375 10.7378 5.9375 11.2503C5.93754 11.7628 6.36252 12.1878 6.875 12.1878H11.2119C11.7369 12.1878 12.1494 11.7628 12.1494 11.2503C12.1494 10.7378 11.7244 10.3128 11.2119 10.3128H6.875Z" fill={color}/>
<defs>
<linearGradient id="paint0_linear_3471_2880" x1="5.59168" y1="5.93738" x2="24.7395" y2="26.6726" gradientUnits="userSpaceOnUse">
<stop stop-color={color}/>
<stop offset="1" stop-color={color}/>
</linearGradient>
</defs>
</svg>

  );
}

function FeatureCard({
  item,
  isFa,
  color,
  isFocused,
  onFocus,
}: {
  item: FeatureDetail;
  isFa: boolean;
  color: string;
  isFocused: boolean;
  onFocus: (item: FeatureDetail) => void;
}) {
  const formatNumber = (n: number) => n.toLocaleString(isFa ? "fa-IR" : "en-US");

  return (
    <div
      onClick={() => onFocus(item)}
      className={`bg-white dark:bg-[#1a1a1e] rounded-xl p-4 flex flex-col gap-5 cursor-pointer transition-colors ${
        isFocused ? "ring-2 ring-light-primary dark:ring-dark-yellow" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${color}22` }}
        >
          <BuildingGlyph color={color} />
        </div>
        <span className=" text-black dark:text-white text-sm font-bold">
          {isFa ? "شناسه" : "ID"} {item.code}
        </span>
      </div>

      <div className="flex flex-col gap-4 text-sm lg:text-base">
        <div className="flex justify-between text-[#A0A0AB] dark:text-white gap-2">
          <span className="text-[#84858F] whitespace-nowrap">{isFa ? "آدرس ملک" : "Address"}</span>
          <span className="text-left text-black dark:text-white line-clamp-1">{item.address || "—"}</span>
        </div>
        <div className="flex justify-between text-[#A0A0AB] dark:text-white">
          <span className="text-[#84858F]">{isFa ? "متراژ" : "Area"}</span>
          <span className="text-left text-black dark:text-white">
            {item.area != null
              ? `${formatNumber(item.area)} ${isFa ? "متر مربع" : "m²"}`
              : "—"}
          </span>
        </div>
        <div className="flex justify-between text-[#A0A0AB] dark:text-white">
          <span className="text-[#84858F]">{isFa ? "تراکم" : "Floors"}</span>
          <span className="text-left text-black dark:text-white">
            {item.floors != null
              ? `${formatNumber(item.floors)} ${isFa ? "طبقه" : ""}`
              : "—"}
          </span>
        </div>
        <div className="flex justify-between text-[#A0A0AB] dark:text-white">
          <span className="text-[#84858F]">{isFa ? "شناسه مالک" : "Owner ID"}</span>
          <span className="text-blueLink dark:text-dark-primary uppercase">
            {item.owner_code || "—"}
          </span>
        </div>
        <div className="flex justify-between text-[#A0A0AB] dark:text-white">
          <span className="text-[#84858F]">{isFa ? "قیمت‌گذاری فروش" : "Sale price"}</span>
          <span className="text-left text-black dark:text-white">{item.sale_price != null ? formatNumber(item.sale_price) : "—"}</span>
        </div>
        <div className="flex justify-between text-[#A0A0AB] dark:text-white">
          <span className="text-[#84858F]">{isFa ? "قیمت‌گذاری اجاره" : "Rent price"}</span>
          <span className="text-left text-black dark:text-white"> {item.rent_price != null ? formatNumber(item.rent_price) : "—"}</span>
        </div>
      </div>

      <div className="flex gap-2 mt-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (item.longitude != null && item.latitude != null) {
              window.open(buildFeatureLink(item.id, item.latitude, item.longitude), "_blank");
            }
          }}
          className="flex-1 flex items-center justify-center gap-1 bg-light-primary text-white dark:text-black dark:bg-dark-yellow  text-[14px] font-bold rounded-full h-9"
        >
          <PinIcon />
          {isFa ? "لوکیشن" : "Location"}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            /* TODO: wire to the real "buy" flow */
            console.log("buy clicked for", item.id);
          }}
          className="flex-1 flex items-center justify-center gap-1 bg-light-primary text-white dark:text-black dark:bg-dark-yellow  text-[14px] font-bold rounded-full h-9"
        >
          <CartIcon />
          {isFa ? "خرید" : "Buy"}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            /* TODO: wire to the real "make an offer" flow */
            console.log("offer clicked for", item.id);
          }}
          className="flex-1 flex items-center justify-center gap-1 bg-light-primary text-white dark:text-black dark:bg-dark-yellow  text-[14px] font-bold rounded-full h-9"
        >
          <OfferIcon />
          {isFa ? "پیشنهاد" : "Offer"}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*                              SKELETONS                              */
/* ------------------------------------------------------------------ */
function MapSkeleton() {
  return (
    <div className="w-full h-full bg-white dark:bg-darkGray animate-pulse flex items-center justify-center">
      <div className="w-2/3 h-2/3 rounded-xl bg-black/5 dark:bg-white/5" />
    </div>
  );
}

function FeatureCardSkeleton() {
  return (
    <div className="bg-[#1a1a1e] rounded-xl p-4 flex flex-col gap-3 animate-pulse">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-white/10 shrink-0" />
        <div className="h-3 w-24 rounded bg-white/10" />
      </div>
      <div className="flex flex-col gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex justify-between">
            <div className="h-2.5 w-20 rounded bg-white/10" />
            <div className="h-2.5 w-16 rounded bg-white/10" />
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-1">
        <div className="flex-1 h-9 rounded-lg bg-white/10" />
        <div className="flex-1 h-9 rounded-lg bg-white/10" />
        <div className="flex-1 h-9 rounded-lg bg-white/10" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*                          MAIN FEATURES MAP                          */
/* ------------------------------------------------------------------ */
export default function FeaturesMap({
  params,
  mainData,
}: {
  params: any;
  mainData: any;
}) {
  const lang: string = params?.lang || "fa";
  const isFa = lang.toLowerCase() === "fa";

  // Discovered once from /features/summary, since the /features (map)
  // endpoint's marker objects only carry a `karbari` code, no label.
  const [knownKarbari, setKnownKarbari] = useState<KarbariOption[]>([]);
  const [selectedKarbari, setSelectedKarbari] = useState<string[]>([]);
  const [initialized, setInitialized] = useState(false);

  const isAllSelected =
    knownKarbari.length > 0 && selectedKarbari.length === knownKarbari.length;

  // map markers (always "all plots" matching the karbari filter — search
  // does not affect map_markers per the API docs)
  const [markers, setMarkers] = useState<MapMarkerItem[]>([]);
  const [mapLoading, setMapLoading] = useState(false);
  const [mapError, setMapError] = useState(false);

  // search + list panel
  const [searchTerm, setSearchTerm] = useState("");
  const [listOpen, setListOpen] = useState(false);
  const [listItems, setListItems] = useState<FeatureDetail[]>([]);
  const [listPage, setListPage] = useState(1);
  const [listHasMore, setListHasMore] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [listLoadingMore, setListLoadingMore] = useState(false);
  const [listError, setListError] = useState(false);

  // selected property (detail panel)
  const [selectedFeature, setSelectedFeature] = useState<FeatureDetail | null>(null);

  /* ---------------------- discover karbari types ---------------------- */
  useEffect(() => {
    const discover = async () => {
      try {
        const res = await axios.get(
          `https://dev-api.metarang.com/api/citizen/${params.id}/features/summary?period=yearly`,
          { headers: { "Content-Type": "application/json" } }
        );
        const data = res.data?.data || [];
        const codes: KarbariOption[] = data.map((d: any) => ({
          code: d.karbari,
          label: d.label,
        }));
        setKnownKarbari(codes);
        setSelectedKarbari(codes.map((c) => c.code));
      } catch (err) {
        console.error("Error discovering karbari types:", err);
      } finally {
        setInitialized(true);
      }
    };
    discover();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const toggleAll = () => {
    setSelectedKarbari(isAllSelected ? [] : knownKarbari.map((k) => k.code));
  };

  const toggleKarbari = (code: string) => {
    setSelectedKarbari((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const colorForKarbari = (code: string) =>
    ICON_COLORS[resolveIconKey(knownKarbari.find((k) => k.code === code)?.label || "")];

  /* karbari code -> display label, resolved through mainData's unique_id
     first (same pattern as FeaturesSummary/FeatureCard), falling back to
     the API's raw Persian text only if no unique_id is set/found. */
  const displayLabelForKarbari = (code: string) => {
    const rawLabel = knownKarbari.find((k) => k.code === code)?.label || "";
    return getKarbariLabel(mainData, resolveIconKey(rawLabel));
  };

  /* ---------------------- map markers ---------------------- */
  const fetchMarkers = async () => {
    if (selectedKarbari.length === 0) {
      setMarkers([]);
      return;
    }
    try {
      setMapLoading(true);
      setMapError(false);

      const qs = new URLSearchParams();
      if (!isAllSelected) selectedKarbari.forEach((c) => qs.append("karbari", c));

      const res = await axios.get(
        `https://dev-api.metarang.com/api/citizen/${params.id}/features?${qs.toString()}`,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("[features] markers response:", res.data);

      const rawMarkers: RawMapMarker[] = res.data?.map_markers || [];
      const parsed: MapMarkerItem[] = rawMarkers.map((m) => ({
        id: m.id,
        longitude: m.center.x,
        latitude: m.center.y,
        karbari: m.karbari,
        color: colorForKarbari(m.karbari),
      }));
      setMarkers(parsed);
    } catch (err) {
      console.error("Error fetching feature map markers:", err);
      setMapError(true);
      setMarkers([]);
    } finally {
      setMapLoading(false);
    }
  };

  useEffect(() => {
    if (!initialized) return;
    fetchMarkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized, JSON.stringify(selectedKarbari)]);

  /* ---------------------- paginated list ---------------------- */
  const fetchList = async (page: number) => {
    if (selectedKarbari.length === 0) {
      setListItems([]);
      setListHasMore(false);
      return;
    }
    try {
      if (page === 1) setListLoading(true);
      else setListLoadingMore(true);
      setListError(false);

      const qs = new URLSearchParams();
      if (!isAllSelected) selectedKarbari.forEach((c) => qs.append("karbari", c));
      if (searchTerm.trim()) qs.append("search", searchTerm.trim());
      qs.append("page", String(page));
      qs.append("per_page", String(LIST_PER_PAGE));

      const res = await axios.get(
        `https://dev-api.metarang.com/api/citizen/${params.id}/features?${qs.toString()}`,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("[features] list response:", res.data);

      const rawItems: any[] = res.data?.data || [];
      const rawMarkersThisCall: RawMapMarker[] = res.data?.map_markers || [];

      const normalized: FeatureDetail[] = rawItems.map((raw) => {
        const item = normalizeFeature(raw);
        const rawMatch = rawMarkersThisCall.find((m) => m.id === item.id);
        const fallbackMatch = markers.find((m) => m.id === item.id);
        return {
          ...item,
          longitude: rawMatch?.center.x ?? fallbackMatch?.longitude,
          latitude: rawMatch?.center.y ?? fallbackMatch?.latitude,
        };
      });

      setListItems((prev) => (page === 1 ? normalized : [...prev, ...normalized]));
      setListPage(page);

      const lastPage = res.data?.meta?.last_page ?? page;
      setListHasMore(page < lastPage && normalized.length > 0);
    } catch (err) {
      console.error("Error fetching feature list:", err);
      setListError(true);
      if (page === 1) setListItems([]);
    } finally {
      setListLoading(false);
      setListLoadingMore(false);
    }
  };

  // (re)load page 1 whenever the list is open and the search text or
  // karbari filter changes — debounced so typing doesn't spam requests
  useEffect(() => {
    if (!listOpen) return;
    const t = setTimeout(() => {
      fetchList(1);
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listOpen, searchTerm, JSON.stringify(selectedKarbari)]);

  const handleToggleList = () => {
    setSelectedFeature(null);
    setListOpen((v) => !v);
  };

  const handleLoadMore = () => {
    if (listLoading || listLoadingMore || !listHasMore) return;
    fetchList(listPage + 1);
  };

  const handleFocusItem = (item: FeatureDetail) => {
    setSelectedFeature(item);
  };

  const handleClosePanel = () => {
    setSelectedFeature(null);
    setListOpen(false);
    setSearchTerm("");
  };

  const panelOpen = listOpen;

  /* ---------------------- search bar (shared markup) ---------------------- */
  const SearchBar = (
    <div className="flex items-center bg-white dark:bg-darkGray rounded-xl h-[42px] px-3 gap-2 w-full">
      <button
        type="button"
        onClick={handleToggleList}
        aria-label={isFa ? "نمایش لیست املاک" : "Show property list"}
        className="shrink-0 bg-transparent"
      >
        <SearchIcon />
      </button>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          if (!listOpen) setListOpen(true);
        }}
        onFocus={() => setListOpen(true)}
        placeholder={
          isFa ? "شناسه ملک یا آدرس را جستجو کنید" : "Search by property ID or address"
        }
        className="bg-transparent border-none outline-none text-sm flex-1 text-black dark:text-white py-4"
      />
    </div>
  );

  return (
    <div className="w-full pt-7 flex flex-col gap-3 mt-6">
      {/* header */}
      <div className="flex flex-col gap-3">
        <h2 className="text-black dark:text-white text-lg font-black lg:text-2xl">
          {findByUniqueId(mainData, 1799)}
        </h2>
        <p className="text-[#A0A0AB] text-base my-1">
          {findByUniqueId(mainData, 1800)}
        </p>
      </div>

      {/* karbari filters */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-2 mt-6">
        <label className="flex items-center gap-2 cursor-pointer text-sm text-black dark:text-white">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={toggleAll}
            className="accent-light-primary dark:accent-dark-yellow w-4 h-4"
          />
          {isFa ? "تمام املاک" : "All properties"}
        </label>

        {knownKarbari.map((k) => (
          <label
            key={k.code}
            className="flex items-center gap-2 cursor-pointer text-sm text-black dark:text-white"
          >
            <input
              type="checkbox"
              checked={selectedKarbari.includes(k.code)}
              onChange={() => toggleKarbari(k.code)}
              className="accent-light-primary dark:accent-dark-yellow w-4 h-4"
            />
            {displayLabelForKarbari(k.code)}
          </label>
        ))}
      </div>

      {mapError && (
        <p className="w-full text-center text-red-400 py-4">
          {isFa ? "خطا در دریافت اطلاعات نقشه." : "Failed to load map data."}
        </p>
      )}

      {!mapError && initialized && selectedKarbari.length === 0 && (
        <p className="w-full text-center text-lightGray py-4">
          {isFa ? "حداقل یک کاربری را انتخاب کنید." : "Select at least one feature type."}
        </p>
      )}

      {!mapError && (!initialized || selectedKarbari.length > 0) && (
        <div className="relative w-full h-[520px] mt-3 rounded-xl overflow-hidden flex flex-col lg:flex-row">
          {/* ---- panel: in-layout sibling on lg+ (shrinks the map),
                 fixed modal + blurred backdrop below lg ---- */}


          {/* ---- map ---- */}
          <div className="relative flex-1 min-w-0 h-full">
            {!panelOpen && (
              <div className="absolute z-10 top-3 rtl:left-3 ltr:right-3 w-[300px]">{SearchBar}</div>
            )}

            {mapLoading && markers.length === 0 ? (
              <MapSkeleton />
            ) : (
              <MapComponent
                markers={markers}
                height="100%"
                onMarkerClick={(marker) => {
                  window.open(
                    buildFeatureLink(marker.id, marker.latitude, marker.longitude),
                    "_blank"
                  );
                }}
                focusTarget={
                  selectedFeature?.longitude != null && selectedFeature?.latitude != null
                    ? {
                        longitude: selectedFeature.longitude,
                        latitude: selectedFeature.latitude,
                        zoom: 16,
                      }
                    : null
                }
                highlightedId={selectedFeature?.id ?? null}
              />
            )}
          </div>
                    {panelOpen && (
            <>
              <div
                onClick={handleClosePanel}
                className="lg:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
              />
              <div
                className="fixed inset-x-4 inset-y-20 z-40 overflow-y-auto overscroll-contain
                  lg:static lg:inset-auto lg:z-auto lg:w-[400px] lg:shrink-0 h-[70svh] light-scrollbar dark:dark-scrollbar lg:h-full
                  bg-[#F6F6F6] dark:bg-[#111114] rounded-xl p-4 pe-2 shadow-xl
                  flex flex-col gap-4 "
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-black dark:text-white font-bold text-xl">
                    {isFa ? "مشخصات ملک" : "Property details"}
                  </h3>
                  <div className="flex gap-2">
                    <button className="w-9 h-9 rounded-full bg-[#E9E9E9] dark:bg-white/10 text-black dark:text-white flex items-center justify-center text-lg font-bold">
                      ?
                    </button>
                    <button className="w-9 h-9 rounded-full bg-[#E9E9E9] dark:bg-white/10 text-black dark:text-white flex items-center justify-center text-lg font-bold">
                      i
                    </button>
                    <button
                      onClick={handleClosePanel}
                      className="w-9 h-9 rounded-full bg-[#FF00002B] text-red-600 flex items-center justify-center text-lg font-bold"
                      aria-label={isFa ? "بستن" : "Close"}
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {SearchBar}

                {/* ---- list of full detail cards ---- */}
                <div className="flex flex-col gap-3">
                  {listError && (
                    <p className="text-red-400 text-xs text-center py-2">
                      {isFa ? "خطا در دریافت لیست." : "Failed to load list."}
                    </p>
                  )}

                  {!listError && listLoading && listItems.length === 0 && (
                    <div className="flex flex-col gap-3">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <FeatureCardSkeleton key={i} />
                      ))}
                    </div>
                  )}

                  {!listError && !listLoading && listItems.length === 0 && (
                    <p className="text-lightGray text-xs text-center py-4">
                      {isFa ? "ملکی یافت نشد." : "No properties found."}
                    </p>
                  )}

                  {!listError &&
                    listItems.map((item) => (
                      <FeatureCard
                        key={item.id}
                        item={item}
                        isFa={isFa}
                        color={colorForKarbari(item.karbari)}
                        isFocused={selectedFeature?.id === item.id}
                        onFocus={handleFocusItem}
                      />
                    ))}

                  {!listError && listHasMore && (
                    <button
                      onClick={handleLoadMore}
                      disabled={listLoadingMore}
                      className="bg-blueLink text-white dark:text-black dark:bg-dark-primary text-sm font-bold text-center py-3 rounded-xl"
                    >
                      {listLoadingMore
                        ? isFa
                          ? "در حال بارگذاری..."
                          : "Loading..."
                        : isFa
                        ? "مشاهده بیشتر"
                        : "View more"}
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}