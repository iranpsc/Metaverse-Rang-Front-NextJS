"use client";

import { useRouter } from "next/navigation";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useId,
  type MouseEvent,
} from "react";
import Image from "next/image";
import GemImage from "@/components/shared/gemImage";
import Link from "next/link";
import { Text } from "../svgs/SvgEducation";
import LockGem from "@/public/lock-baguette.png";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import LevelBadge from "../shared/LevelBadge";
import { Tooltip as ReactTooltip } from "react-tooltip";

const TOTAL_GEMS = 13;

const STATIC_ROUTE_NAMES = [
  { id: 1, route_name: "citizen-baguette" },
  { id: 2, route_name: "reporter-baguette" },
  { id: 3, route_name: "participation-baguette" },
  { id: 4, route_name: "developer-baguette" },
  { id: 5, route_name: "inspector-baguette" },
  { id: 6, route_name: "businessman-baguette" },
  { id: 7, route_name: "lawyer-baguette" },
  { id: 8, route_name: "city-council-baguette" },
  { id: 9, route_name: "the-mayor-baguette" },
  { id: 10, route_name: "governor-baguette" },
  { id: 11, route_name: "minister-baguette" },
  { id: 12, route_name: "judge-baguette" },
  { id: 13, route_name: "legislator-baguette" },
] as const;

function getGemLevelId(gem: any): number | undefined {
  const id = Number(gem?.id);
  if (Number.isInteger(id) && id >= 1 && id <= TOTAL_GEMS) return id;

  const slug = gem?.slug || gem?.route_name;
  return STATIC_ROUTE_NAMES.find((route) => route.route_name === slug)?.id;
}

function getGemRouteName(gem: any): string | undefined {
  const levelId = getGemLevelId(gem);
  return STATIC_ROUTE_NAMES.find((route) => route.id === levelId)?.route_name;
}

export default function UserCard({
  item,
  params,
  buttonText,
  minWidth,
  hidePreviousLevels,
  mainData,
  activeBtnId,
  setActiveBtnId,
}: any) {
  const router = useRouter();
  const uid = useId();
  const gemTooltipId = "user-card-gem-tooltip-" + uid.replace(/:/g, "");
  const nameRef = useRef<HTMLParagraphElement>(null);

  const [isTruncated, setIsTruncated] = useState(false);
  const [linkLoading, setLinkLoading] = useState(false);

  const currentGem = item.levels?.current;
  const isLoading = activeBtnId === item.code;
  const urlForGem = getGemRouteName(currentGem);

  const displayGems = useMemo(() => {
    const currentLevelId = getGemLevelId(currentGem);
    const previous = (item.levels?.previous || []).filter(
      (gem: any) => getGemLevelId(gem) !== currentLevelId
    );

    previous.sort(
      (a: any, b: any) =>
        (getGemLevelId(a) || Number.MAX_SAFE_INTEGER) -
        (getGemLevelId(b) || Number.MAX_SAFE_INTEGER)
    );

    return currentGem ? [...previous, currentGem] : previous;
  }, [item.levels?.previous, currentGem]);

  const remainingGemsCount = Math.max(0, TOTAL_GEMS - displayGems.length);

  useEffect(() => {
    const element = nameRef.current;
    if (!element) return;

    const checkTruncation = () => {
      setIsTruncated(element.scrollWidth > element.clientWidth);
    };

    checkTruncation();
    if (typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(checkTruncation);
    observer.observe(element);
    return () => observer.disconnect();
  }, [item.name]);

  const handleButtonClick = () => {
    if (isLoading) return;
    setActiveBtnId?.(item.code);
    router.push("/" + params.lang + "/citizens/" + item.code.toLowerCase());
  };

  const handleCodeClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (linkLoading) return;
    setLinkLoading(true);
    router.push("/" + params.lang + "/citizens/" + item.code);
  };

  return (
    <div
      className="px-2 max-w-70.25!"
      style={minWidth ? { width: minWidth, minWidth } : undefined}
    >
      <div
        className={
          (linkLoading
            ? "cursor-not-allowed! group scale-105 base-transition-1 bg-white dark:bg-gray-1 border-primary! dark:border-primary! glow-svg pointer-events-none!"
            : "hover:border-primary hover:bg-white dark:hover:bg-gray-1 dark:hover:border-primary hover:shadow-[0_0px_35px_-12px_rgba(145,0,217,0.9)]") +
          " group hover:scale-105 base-transition-1 shadow-lg mt-10 relative bg-white dark:bg-gray-1 flex flex-col justify-between gap-3 py-3 sm:py-4 md:py-5 items-center rounded-[20px] border-transparent border border-solid"
        }
      >
        <figure className="w-30 h-30 relative overflow-hidden rounded-full mt-10">
          <Image
            src={item.profile_photo || "/firstpage/temp-1.webp"}
            alt="citizen image"
            fill
            loading="lazy"
            sizes="120px"
            className="object-cover shadow-md transition-all duration-300 shadow-gray"
          />
        </figure>

        <div className="w-full overflow-x-hidden">
          <p
            ref={nameRef}
            className={
              "font-bold text-[20px] dark:text-white font-azarMehr sm:mt-2 truncate w-full text-center ps-3 " +
              (isTruncated
                ? "hover:overflow-visible hover:animate-rtlMarquee"
                : "")
            }
          >
            {item.name || "\u00A0"}{" "}
            {item.code &&
              ["hm-2000001", "hm-2000002"].includes(item.code.trim()) && (
                <span className="mt-[-2px] mx-1 text-xs font-medium text-primary bg-purple-900/20 px-3 py-[2px] rounded-full">
                  {findByUniqueId(mainData, 1593) || "بنیان گذار"}
                </span>
              )}
          </p>
        </div>

        <div className="flex items-center gap-4 justify-center">
          <Link
            onClick={handleCodeClick}
            className={
              "min-h-[30px] uppercase text-blueLink accumulating font-azarMehr text-[16px] cursor-pointer " +
              (linkLoading ? "cursor-not-allowed!" : "")
            }
            href={"/" + params.lang + "/citizens/" + item.code}
            title={"Go to citizen " + item.code}
            aria-label={"Go to citizen " + item.code}
          >
            {item.code}
          </Link>
        </div>

        {!hidePreviousLevels && (
          <div className="w-full min-h-[75px] pb-2">
            <div className="w-full flex flex-wrap justify-center gap-2">
              {displayGems.map((gem: any) => (
                <GemImage
                  key={gem.slug || gem.id}
                  item={gem}
                  params={params}
                  picSize={21}
                  showGlow
                  isActive={gem === currentGem}
                  mainData={mainData}
                  tooltipId={gemTooltipId}
                />
              ))}
              {Array.from({ length: remainingGemsCount }).map((_, index) => (
                <Image
                  key={"lock-" + index}
                  src={LockGem}
                  alt="Locked Gem"
                  width={20}
                  height={33}
                  loading="lazy"
                  className="w-[21] h-[33]"
                />
              ))}
            </div>
            <ReactTooltip
              id={gemTooltipId}
              place="top"
              className="bg-[#E9E9E9]! text-[#908F95]! dark:bg-[#434343]! dark:text-white! !font-azarMehr font-medium! text-[14px]!"
            />
          </div>
        )}

        <button
          aria-label="citizen information"
          onClick={handleButtonClick}
          disabled={isLoading}
          className={
            "w-[80%] " +
            (isLoading ? "rotating-border cursor-not-allowed" : "") +
            " p-px bg-transparent"
          }
        >
          <div className="w-full h-[55px] bg-[#f5f9ff] dark:bg-[#000000] px-3 sm:px-6 rounded-[10px] flex flex-row justify-between items-center relative z-10">
            <span
              className={
                "transition-opacity text-primary font-azarMehr font-medium text-[14px] " +
                (isLoading ? "opacity-70" : "opacity-100")
              }
            >
              {buttonText}
            </span>
            <Text className="h-[24px] stroke-primary dark:stroke-primary" />
          </div>
        </button>

        <LevelBadge
          currentGem={currentGem}
          lang={params.lang}
          urlForGem={urlForGem}
          setLinkLoading={setLinkLoading}
          uid={uid}
          mainData={mainData}
        />
      </div>
    </div>
  );
}
