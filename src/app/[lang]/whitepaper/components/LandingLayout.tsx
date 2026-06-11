'use client';

import EcosystemIntro from "./EcosystemIntro";
import PoweredBy from "./PoweredBy";

export default function LandingLayout({
    resolvedParams,
    mainData
}: any) {

    // گرفتن step از DOM (ساده و پایدار)
    const step =
        typeof window !== "undefined"
            ? Number(document.querySelector("[data-step]")?.getAttribute("data-step"))
            : 0;

    return (
        <div className="flex flex-col    lg:flex-row gap-1 justify-between w-full  px-5 pt-5 ">

            {/* LEFT */}
            <div className={`
        
w-0
         duration-[3000ms]

        ${step < 1
                    ? "opacity-0 rtl:translate-x-[50px]  ltr:-translate-x-[50px]  "
                    : "opacity-100 translate-x-0   !w-full lg:!max-w-[29%]"
                }
      `}>
                <EcosystemIntro params={resolvedParams} mainData={mainData} />
            </div>

            {/* CENTER (reactive pressure shrink) */}
            <div className={`
        bg-white dark:bg-[#1A1A18]
        
        flex justify-center items-center
        rounded-[40px] rounded-es-[160px]
        
         duration-[3000ms]  

        ${step === 0
                    ? " w-full  h-[97vh]"
                    : " scale-100 w-[42%]"
                }
      `}>
                <span className="font-bold text-5xl dark:text-white">
                    Meta Rang
                </span>
            </div>

            {/* RIGHT */}
            <div className={`
        
        w-0
         duration-[3000ms] 

        ${step < 1
                    ? "opacity-0 ltr:translate-x-[50px] rtl:-translate-x-[50px]  "
                    : "opacity-100 translate-x-0   !w-full lg:!max-w-[29%]"
                }
      `}>
                <PoweredBy params={resolvedParams} mainData={mainData} />
            </div>

        </div>
    );
}