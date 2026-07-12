// components/EcosystemIntro.tsx
'use client';
import Image from "next/image";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
interface EcosystemIntroProps {
  params: { lang: string };
  mainData: { mainData: string };
}
export default function EcosystemIntro({ params, mainData }: EcosystemIntroProps) {


  return (
    <div className="flex w-full  lg:flex-col items-center lg:items-start justify-between h-max lg:h-full lg:min-h-[80vh] bg-white dark:bg-[#1A1A18] rounded-[40px] p-4 lg:p-0 border border-solid border-[#f5f5f5] dark:border-black">

      <div className="flex flex-col items-start mx-auto justify-start lg:mt-20 lg:px-5 lg:ps-14 lg:gap-5">
        <div>
          <Image
            src="/logo.png"
            alt="Logo"
            width={70}
            height={60}
            className="size-10 lg:size-auto lg:w-[70px] lg:h-[60px] object-contain"
          />
        </div>
        <p className="text-black dark:text-white font-bold lg:text-5xl text-start">10:37 PM</p>
        <p className="text-[#585858] dark:text-neutral-400 text-start lg:text-3xl">Wednesday, February 25, 2026 </p>
      </div>
      <div className="lg:mt-12">
        <div
         
          className="group flex  gap-3 bg-transparent hover:scale-105 duration-300 p-2"
        >

          {/* آیکون Chevron Down با SVG ساده */}

          <div >
            <svg className="size-20 lg:size-auto" width="221" height="221" viewBox="0 0 221 221" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className="stroke-black dark:stroke-white" d="M46.042 161.143L174.959 32.2266" strokeWidth="12" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path className="stroke-black dark:stroke-white" d="M46.042 66.5703V161.14H140.612" strokeWidth="12" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path className="stroke-black dark:stroke-white" d="M32.2295 202.586H188.771" strokeWidth="12" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className=" flex-col hidden lg:flex gap-2 items-start ltr:items-end justify-end text-start py-4">
            <span className="tracking-wider dark:text-white ">{findByUniqueId(mainData, 1657)}</span>
            <span className="text-sm  text-[#575757] dark:text-neutral-400 ">{findByUniqueId(mainData, 1658 )}</span>
          </div>
        </div>
      </div>
    </div>
  );
}