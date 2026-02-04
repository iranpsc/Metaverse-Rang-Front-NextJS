"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

export default function CitizenClientImage({ item, params, picSize, disableHoverScale = false }: any) {
  const [urlForGem, setUrlForGem] = useState<string | undefined>(undefined);
  const [linkLoading, setLinkLoading] = useState(false);
  const staticRouteNames = [
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
  ];

useEffect(() => {
  if (!item) {
    setUrlForGem(undefined);
    return;
  }

  let matchedRoute = null;

  // اولویت ۱: با slug (حالت فعلی API)
  if (item.slug) {
    matchedRoute = staticRouteNames.find(r => r.route_name === item.slug);
  }

  // اولویت ۲: اگر slug نبود، با id (برای آینده‌نگری)
  if (!matchedRoute && item.id) {
    const idNum = Number(item.id);
    if (!isNaN(idNum)) {
      matchedRoute = staticRouteNames.find(r => r.id === idNum);
    }
  }

  setUrlForGem(matchedRoute?.route_name);
}, [item]);

  const hoverClasses = disableHoverScale
    ? ""
    : "hover:scale-150 hover:drop-shadow-[0_0px_8px_rgba(255,199,0,0.6)]";

  return (
    <>

      <Link onClickCapture={() => setLinkLoading(true)} href={`/${params.lang}/levels/citizen/${urlForGem}/gem`}>
        <Image
          data-tooltip-id={item.name}
          src={item.image}
          width={picSize}
          height={picSize}
          alt={item.name}
          className={`${linkLoading ? " drop-shadow-[0_0px_8px_rgba(255,199,0,0.6)] cursor-wait" : ""} object-contain inline duration-300 ${hoverClasses}  `}
        />

        <ReactTooltip
          id={item.name}
          place="top"
          className="!bg-[#E9E9E9] !text-[#908F95] dark:!bg-[#434343] dark:!text-white !font-azarMehr !font-medium !text-[14px]"
          content={item.name}
        />
      </Link>
    </>
  );
}
