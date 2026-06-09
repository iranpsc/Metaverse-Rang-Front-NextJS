'use client';
import { findByUniqueId } from "@/components/utils/findByUniqueId";
interface AvalancheEventsCardProps {
  params: { lang: string };
  mainData: { mainData: string };
}
export default function AvalancheEventsCard( {params, mainData }: AvalancheEventsCardProps) {
    
    return (
        <section className="w-full bg-white dark:bg-[#1A1A18] rounded-[28px] p-5 xl:p-7 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6 items-stretch">
                {/* Left Side */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h2 className="dark:text-white text-2xl 3xl:text-4xl leading-[1.05] font-semibold tracking-[-2px]">
                            {findByUniqueId(mainData, 1709)}
                        </h2>

                        <p className="text-[#b5b5b5] text-[16px] leading-7 mt-8 max-w-[320px]">
                           {findByUniqueId(mainData, 1710)}
                        </p>
                    </div>

                    {/* دکمه */}
                    <button aria-label="btn feat" className="lg:text-xl  border border-solid bg-transparent border-[#D9D9D9] dark:border-[#434343] hover:bg-[#9100D9] hover:text-white  dark:text-white font-medium hover:gap-3 transition-all duration-300 group/btn rounded-[16px] ltr:rounded-br-[100px] rtl:rounded-bl-[100px] px-4 py-3 flex justify-between items-center w-max gap-5 2xl:gap-7">

                        <span>{findByUniqueId(mainData, 1711)}</span>
                        <svg
                            className="w-4 h-4 rtl:rotate-180 transition-transform duration-300 group-hover/btn:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Right Card */}
                <div className="relative rounded-3xl overflow-hidden min-h-[340px] bg-[#2f0055]">
                    {/* Background gradients */}
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#7c00ff] via-[#43006f] to-[#22002f]" />

                        {/* Curved light effects */}
                        <div className="absolute -top-20 right-[-10%] w-[120%] h-[220px] rounded-[100%] bg-gradient-to-r from-transparent via-fuchsia-400/20 to-transparent blur-2xl rotate-[-8deg]" />

                        <div className="absolute top-[120px] left-[-10%] w-[120%] h-[180px] rounded-[100%] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent blur-2xl rotate-[6deg]" />

                        <div className="absolute bottom-[-80px] left-[-5%] w-[120%] h-[220px] rounded-[100%] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent blur-2xl rotate-[-4deg]" />

                        {/* Dark overlay */}
                        <div className="absolute inset-0 bg-black/15" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col  h-full p-6">
                        {/* Tags */}
                        <div className="flex items-center gap-3">
                            <span className="px-5 py-2 rounded-full bg-[#bb2dff] text-white text-[13px] font-medium">
                                {findByUniqueId(mainData, 1712)}
                            </span>

                            <span className="px-5 py-2 rounded-full bg-[#9c1eff] text-white text-[13px] font-medium">
                                {findByUniqueId(mainData, 1713)}
                            </span>
                        </div>

                        {/* Bottom Content */}
                        <div className="mt-12">
                            <p className="text-white/80 text-[12px] uppercase tracking-[1.5px] font-medium">
                                Nov 20, 2025
                            </p>

                            <p className="text-white/80 text-[12px] uppercase tracking-[1.5px] font-medium mt-1">
                                New York
                            </p>

                            <h3 className="mt-4 text-white text-[54px] leading-[0.95] font-bold tracking-[-2px] uppercase max-w-[500px]">
                                Credite
                                <br />
                                Reimagined
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}