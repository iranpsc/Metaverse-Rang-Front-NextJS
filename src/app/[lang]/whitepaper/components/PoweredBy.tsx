'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

export default function PoweredBy({ mainData }: any) {

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  const title = findByUniqueId(mainData, 1653);
  const subtitle = findByUniqueId(mainData, 1654);
  const description = findByUniqueId(mainData, 1656);

  return (
    <div className="flex flex-col gap-1">

      {/* TEXT CARD */}
      <div className="bg-white dark:bg-[#1A1A18] 2xl:!leading-9 h-[350px] flex flex-col justify-center items-center p-5 lg:px-10 rounded-[40px] dark:text-white lg:text-xl 3xl:text-3xl leading-9">

        <p
          className={`
            transition-all delay-[3000ms] duration-700 ease-out
            ${ready ? "opacity-100" : "opacity-0"}
          `}
        >
          {title}
        </p>

      </div>

      {/* IMAGE CARD */}
      <div className="bg-white dark:bg-[#1A1A18] rounded-[40px] dark:text-white w-full">

        <div className="w-full h-[246px] overflow-hidden rounded-[40px] relative">

          <Image
            src="/whitepaper/testimg.jpg"
            alt="whitepaper"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={75}
            decoding="async"
            className="w-full object-cover"
          />

        </div>

        <div className="w-full p-5 lg:px-10 pb-10 lg:text-xl text-start 2xl:!leading-8">

          <p
            className={`
              font-black pb-3
              transition-all delay-[3000ms] duration-700 ease-out
              ${ready ? "opacity-100" : "opacity-0"}
            `}
          >
            {subtitle}
          </p>

          <p
            className={`
              transition-all delay-[3000ms] duration-700 ease-out
              ${ready ? "opacity-100" : "opacity-0"}
            `}
          >
            {description}
          </p>

        </div>

      </div>
    </div>
  );
}