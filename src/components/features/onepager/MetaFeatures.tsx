// components/MetaFeatures.tsx
'use client';

import ClipButton from "@/components/shared/ClipButton";
import {  Hex, DropBox, Wings } from "@/components/svgs/SvgWhitepaper";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import AnimatedReveal from "../../ui/animations/AnimatedReveal";
interface MetaFeaturesProps {
  params: { lang: string };
  mainData: { mainData: string };
}
interface FeatureCard {
    id: number;
    title: string;
    description: string;
    buttonText: string;
    icon: React.ReactNode;
}


export default function MetaFeatures({ params, mainData }: MetaFeaturesProps) {
    const featuresData: FeatureCard[] = [
    {
        id: 1,
        title: findByUniqueId(mainData, 1715),
        description: findByUniqueId(mainData, 1716),
        buttonText: findByUniqueId(mainData, 1717),
        icon: <Wings className="w-full h-full fill-black dark:fill-white" />,
    },
    {
        id: 2,
        title: findByUniqueId(mainData, 1718),
        description: findByUniqueId(mainData, 1719),
        buttonText: findByUniqueId(mainData, 1672),
        icon: <Hex className="w-full h-full fill-black dark:fill-white" />,
    },
    {
        id: 3,
        title: findByUniqueId(mainData, 1720),
        description: findByUniqueId(mainData, 1721),
        buttonText: findByUniqueId(mainData, 1722),
        icon: <DropBox className="w-full h-full fill-black dark:fill-white" />,
    },
];
    return (
        <section >
                <AnimatedReveal>
                    {featuresData.map((feature) => (
                        <div
                            key={feature.id}
                            className=" bg-white space-y-4 lg:space-y-[32px] p-5 md:p-10 3xl:px-12 3xl:py-9 dark:text-white dark:bg-[#1A1A18] border border-gray-200 dark:border-gray-800 rounded-xl :rounded-[32px]  "
                        >
                            {/* آیکون */}
                            <div className="w-20 h-20 3xl:w-[94px] 3xl:h-[94px]   dark:text-white">
                                {feature.icon}
                            </div>

                            {/* عنوان */}
                            <h3 className="text-2xl md:text-2xl 3xl:text-3xl font-semibold line-clamp-1">
                                {feature.title}
                            </h3>

                            {/* توضیحات */}
                            <p className=" text-base lg:text-xl leading-relaxed line-clamp-2">
                                {feature.description}
                            </p>

                            {/* دکمه */}
                                <ClipButton clip={params.lang == "fa" ? "bl" : "br"}
                                    className="w-[230px]  h-[64px] group ms-0 m-5 cursor-pointer duration-300 hover:text-[#9100D9]">
                                     <span className="text-white dark:text-black group-hover:text-white pe-3">{findByUniqueId(mainData, 1711)}</span>
                                    <svg
                                        className="w-4 h-4 rtl:rotate-180 transition-transform duration-300 group-hover/btn:translate-x-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path className="text-[#9100D9] group-hover:text-white" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </ClipButton>
                        </div>
                    ))}
                </AnimatedReveal>
        </section>
    );
}