'use client';
import ClipButton from "@/components/shared/ClipButton";
import ClipSection from "@/components/shared/ClipContainer";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import Image from "next/image";
interface AvalancheEventsCardProps {
    params: { lang: string };
    mainData: { mainData: string };
}
export default function AvalancheEventsCard({ params, mainData }: AvalancheEventsCardProps) {

    return (
        <ClipSection
            corner={params.lang == "fa" ? "bl" : "br"}
            radius={32}
            cornerRadius = {16}
            cornerSize={120} className="w-full text-white dark:text-[#1A1A18] rounded-[28px] p-5 xl:p-7  overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6 items-stretch">
                {/* Left Side */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h2 className="text-black dark:text-white text-2xl 3xl:text-4xl leading-[1.05] font-semibold tracking-[-2px]">
                            {findByUniqueId(mainData, 1709)}
                        </h2>

                        <p className="text-[#b5b5b5] text-[16px] leading-7 mt-8 max-w-[320px]">
                            {findByUniqueId(mainData, 1710)}
                        </p>
                    </div>

                    <ClipButton clip={params.lang == "fa" ? "bl" : "br"}
                                            className="w-[230px] overflow-hidden  h-[64px] group m-5 cursor-pointer duration-300 text-black dark:text-white hover:!text-[#9100D9] ">
                                            <button
                                                type="button"
                                                aria-label="btn event"

                                                className="bg-transparent flex items-center text-base !ring-0 !border-0 focus-visible:ring-0"
                                            >
                                                <span className="text-white dark:text-black font-medium  group-hover:text-white pe-3">{findByUniqueId(mainData, 1711)}</span>
                                                <svg className="rtl:rotate-180 stroke-white"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                    className="stroke-[#9100D9] group-hover:stroke-white"
                                                        d="M5 12H19"
                                                        stroke="white"
                                                        strokeWidth="1.8"
                                                        strokeLinecap="round"
                                                    />
                                                    <path
                                                    className="stroke-[#9100D9] group-hover:stroke-white"
                                                        d="M13 6L19 12L13 18"
                                                        stroke="white"
                                                        strokeWidth="1.8"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>

                                            </button>
                                        </ClipButton>
                </div>

                {/* Right Card */}
                <ClipSection
                    corner={params.lang == "fa" ? "bl" : "br"}
                    radius={24}
                    cornerSize={130}
                    bgImage="https://s3.metarang.com/metarang/onepage/article6.webp"
                    className="relative rounded-3xl overflow-hidden min-h-[340px] text-[#2f0055]">
                    {/* Background gradients */}


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
                        <div className="mt-5">
                            <p className="text-white/80 text-[12px] uppercase tracking-[1.5px] font-medium">
                                Nov 20, 2025
                            </p>

                            <p className="text-white/80 text-[12px] uppercase tracking-[1.5px] font-medium mt-1">
                                New York
                            </p>

                            <h3 className="mt-4 text-white text-4xl lg:text-[54px] leading-[0.95] font-bold tracking-[-2px] uppercase max-w-[500px]">
                                Credite
                                <br />
                                Reimagined
                            </h3>
                        </div>
                        
                    <ClipButton clip={params.lang == "fa" ? "bl" : "br"}
                                            className="w-[180px] lg:w-[230px]  h-[64px] group mt-5 cursor-pointer duration-300 text-black dark:text-white hover:!text-[#9100D9] ">
                                            <button
                                                type="button"
                                                aria-label="btn event"

                                                className="bg-transparent flex items-center text-base !ring-0 !border-0 focus-visible:ring-0"
                                            >
                                                <span className="text-white dark:text-black font-medium  group-hover:text-white pe-3">{findByUniqueId(mainData, 1711)}</span>
                                                <svg className="rtl:rotate-180 stroke-white"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                    className="stroke-[#9100D9] group-hover:stroke-white"
                                                        d="M5 12H19"
                                                        stroke="white"
                                                        strokeWidth="1.8"
                                                        strokeLinecap="round"
                                                    />
                                                    <path
                                                    className="stroke-[#9100D9] group-hover:stroke-white"
                                                        d="M13 6L19 12L13 18"
                                                        stroke="white"
                                                        strokeWidth="1.8"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>

                                            </button>
                                        </ClipButton>
                    </div>
                </ClipSection>
            </div>
        </ClipSection>
    );
}