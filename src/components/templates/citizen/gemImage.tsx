"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

export default function CitizenClientImage({ item, params, picSize }: any) {
  const [urlForGem, setUrlForGem] = useState<string | undefined>(undefined);

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
    const matchedRoute = staticRouteNames.find(
      (x) => x.id === item.id
    )?.route_name;
    setUrlForGem(matchedRoute);
  }, [item]);
  return (
    <>
      <Link href={`/${params.lang}/levels/citizen/${urlForGem}/gem`}>
        <Image
          data-tooltip-id={item.name}
          src={item.image}
          width={picSize}
          height={picSize}
          alt={item.name}
          className="object-contain inline"
        />
        <ReactTooltip
          id={item.name}
          place="top"
          className="tooltip-bg-color text-center"
          content={item.name}
        />
      </Link>
    </>
  );
}
