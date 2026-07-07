// components/EcosystemIntro.tsx
'use client';
import { findByUniqueId } from "@/components/utils/findByUniqueId";
interface EcosystemIntroProps {
  params: { lang: string };
  mainData: { mainData: string };
}
export default function EcosystemIntro({ params, mainData }: EcosystemIntroProps) {
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className="flex w-full flex-col justify-between h-full min-h-[80vh] bg-white dark:bg-[#1A1A18] rounded-[40px]">

      <div className="flex flex-col items-start mx-auto justify-start mt-20 px-5 ps-14 gap-5">
        <div>

          <svg width="70" height="60" viewBox="0 0 70 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M32.855 0.984479C33.6286 -0.328178 35.5276 -0.328142 36.3013 0.984479L52.813 29.0118L31.2446 59.2306H44.8872L58.6753 38.962L68.8765 56.2774C69.6618 57.6107 68.7002 59.293 67.1528 59.2931H2.00341C0.455988 59.2931 -0.505684 57.6107 0.279781 56.2774L32.855 0.984479ZM58.7368 38.8731L58.6753 38.962L52.813 29.0118L52.9067 28.881L58.7368 38.8731Z" fill="#9100D9" />
          </svg>

        </div>
        <p className="text-black dark:text-white font-bold text-5xl text-start">10:37 PM</p>
        <p className="text-[#585858] dark:text-neutral-400 text-start lg:text-3xl">Wednesday, February 25, 2026 </p>
      </div>
      <div className="mt-12">
        <button
          onClick={handleScroll}
          className="group flex  gap-3 bg-transparent hover:scale-105 duration-300 p-2"
        >

          {/* آیکون Chevron Down با SVG ساده */}

          <div>
            <svg width="221" height="221" viewBox="0 0 221 221" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className="stroke-black dark:stroke-white" d="M46.042 161.143L174.959 32.2266" stroke-width="12" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path className="stroke-black dark:stroke-white" d="M46.042 66.5703V161.14H140.612" stroke-width="12" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              <path className="stroke-black dark:stroke-white" d="M32.2295 202.586H188.771" stroke-width="12" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <div className="flex flex-col gap-2 items-start ltr:items-end justify-end text-start py-4">
            <span className="tracking-wider dark:text-white ">{findByUniqueId(mainData, 1657)}</span>
            <span className="text-sm  text-[#575757] dark:text-neutral-400 ">{findByUniqueId(mainData, 1658 )}</span>
          </div>
        </button>
      </div>
    </div>
  );
}