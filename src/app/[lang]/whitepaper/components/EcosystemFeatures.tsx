// components/EcosystemFeatures.tsx
'use client';

import { Framer, Hex, DropBox, Wings } from "@/components/svgs/SvgWhitepaper";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
interface EcosystemFeaturesProps {
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



export default function EcosystemFeatures({ params, mainData }: EcosystemFeaturesProps) {
    const featuresData: FeatureCard[] = [
        {
            id: 1,
            title: findByUniqueId(mainData, 1668),
            description: findByUniqueId(mainData, 1669),
            buttonText: findByUniqueId(mainData, 1670),
            icon: <Wings className="w-full h-full fill-black" />,
        },
        {
            id: 2,
            title: findByUniqueId(mainData, 1671),
            description: findByUniqueId(mainData, 1674),
            buttonText: findByUniqueId(mainData, 1672),
            icon: <Hex className="w-full h-full fill-black" />,
        },
        {
            id: 3,
            title: findByUniqueId(mainData, 1673),
            description: findByUniqueId(mainData, 1674),
            buttonText: findByUniqueId(mainData, 1675),
            icon: <DropBox className="w-full h-full fill-black" />,
        },
    ];
    return (
        <section className="">
            <div className="">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {featuresData.map((feature) => (
                        <div
                            key={feature.id}
                            className="group bg-white space-y-[32px] p-5 md:p-10 3xl:px-12 3xl:py-9 dark:text-white dark:bg-[#1A1A18] border border-gray-200 dark:border-gray-800 rounded-[40px]  hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* آیکون */}
                            <div className="w-12 h-12 3xl:w-[94px] 3xl:h-[94px]   dark:text-white">
                                {feature.icon}
                            </div>

                            {/* عنوان */}
                            <h3 className="text-xl md:text-2xl 3xl:text-[32px] font-semibold  !leading-10 ">
                                {feature.title}
                            </h3>

                            {/* توضیحات */}
                            <p className=" text-base lg:text-xl leading-relaxed ">
                                {feature.description}
                            </p>

                            {/* دکمه */}
                            <div className="w-full">
                                <button aria-label="btn feat" className="lg:text-xl gap-2 bg-[#9100D9]  text-white font-medium hover:gap-3 transition-all duration-300 group/btn rounded-[16px] ltr:rounded-br-[100px] rtl:rounded-bl-[100px] px-4 py-3 flex justify-between items-center w-[60%]">

                                    <span>{feature.buttonText}</span>
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}