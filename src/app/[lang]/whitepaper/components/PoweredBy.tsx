// components/PoweredBy.tsx

import Image from "next/image";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
interface PoweredByProps {
  params: { lang: string };
  mainData: any;
}

export default function PoweredBy({ mainData }: PoweredByProps) {

  // ⚡ بدون useMemo (server-safe + بدون hydration overhead اضافی)
  const title = findByUniqueId(mainData, 1653);
  const subtitle = findByUniqueId(mainData, 1654);
  const description = findByUniqueId(mainData, 1656);

  return (
    <div className="flex flex-col gap-5">

      {/* TEXT CARD (exact same UI) */}
      <div className="bg-white dark:bg-[#1A1A18] 2xl:!leading-9 h-[370px] flex flex-col justify-center items-center p-5 lg:px-10 rounded-[40px] dark:text-white lg:text-3xl leading-9">
        <p>{title}</p>
      </div>

      {/* IMAGE CARD (NO VISUAL CHANGE) */}
      <div className="bg-white dark:bg-[#1A1A18] rounded-[40px] dark:text-white w-full">

        <div className="w-full h-[280px] overflow-hidden rounded-[40px] relative">

          <Image
            src="/whitepaper/testimg.jpg"
            alt="whitepaper"

            fill

            // 🚀 LCP optimization (no visual change)
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={75}

            // ⚡ performance
            decoding="async"

            // 🎯 EXACT SAME LOOK
            className="w-full object-cover"
          />
        </div>

        <div className="w-full p-5 lg:px-10 pb-10 lg:text-2xl text-start 2xl:!leading-9">
          <p className="font-black pb-3">{subtitle}</p>
          <p>{description}</p>
        </div>

      </div>
    </div>
  );
}