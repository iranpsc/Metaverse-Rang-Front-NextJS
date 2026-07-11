'use client';
import { useEffect, useState } from "react";
import { Framer, Hex, DropBox, Wings } from "@/components/svgs/SvgWhitepaper";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import ClipSection from "@/components/shared/ClipContainer";
interface WhyMetarangProps {
    params: { lang: string };
    mainData: { mainData: string };
}

interface CardData {
    id: number;
    title: string;
    description: string;
    gradient: string;
    icon: React.ReactNode;
}

const svg1 = <Wings className="w-full h-full fill-white" />;
const svg2 = <Hex className="w-full h-full fill-white" />;
const svg3 = <DropBox className="w-full h-full fill-white" />;
const svg4 = <Framer className="w-full h-full fill-white" />;

export default function WhyMetarang({
    params,
    mainData,
}: WhyMetarangProps) {
    const cardsData: CardData[] = [
        {
            id: 1,
            title: findByUniqueId(mainData, 1660),
            description: findByUniqueId(mainData, 1661),
            gradient: "bg-[#3D8BFF] dark:bg-[#19005E] text-[#3D8BFF] dark:text-[#19005E]",
            icon: svg1,
        },
        {
            id: 2,
            title: findByUniqueId(mainData, 1662),
            description: findByUniqueId(mainData, 1663),
            gradient: "bg-[#FF24A8] dark:bg-[#FE0099] text-[#FF24A8] dark:text-[#FE0099]",
            icon: svg2,
        },
        {
            id: 3,
            title: findByUniqueId(mainData, 1664),
            description: findByUniqueId(mainData, 1665),
            gradient: "bg-[#8E02F7] dark:bg-[#9100D9] text-[#8E02F7] dark:text-[#9100D9]",
            icon: svg3,
        },
        {
            id: 4,
            title: findByUniqueId(mainData, 1666),
            description: findByUniqueId(mainData, 1667),
            gradient: "bg-[#01FFE5] dark:bg-[#00CEB9] text-[#01FFE5] dark:text-[#00CEB9]",
            icon: svg4,
        },
    ];
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(max-width: 1023px)");

        const update = () => setIsMobile(media.matches);

        update();

        media.addEventListener("change", update);

        return () => media.removeEventListener("change", update);
    }, []);

    return (
        <div className="relative ">

            <div className="relative ">
                {/* Card 0 */}
                <div
                    className="sticky h-[39lvh]"
                    style={{ top: "80px" }}
                >
                    <div
                        className="
            absolute
            left-0
            right-0
            bottom-0
            w-full
            h-[110lvh]
            lg:h-[104lvh]
            xl:h-[112lvh]
            3xl:h-[95lvh]
            overflow-hidden
            flex
            
            
        "
                        style={{
                            top: 0,
                            zIndex: 1,
                        }}
                    >

                        <ClipSection
                            radius={32}
                            cornerSize={isMobile ? 80 : 120}
                            cornerRadius={16}
                            borderClassName="text-white dark:text-neutral-800"
                            borderWidth={1}
                            corner={params.lang == "fa" ? "tl" : "tr"}
                            className="text-white  dark:text-[#1A1A18] rounded-[32px]  items-center justify-center p-10 w-full "
                        >
                            <div className="flex h-full items-center px-10">
                                <h2 className="text-4xl md:text-7xl lg:text-8xl uppercase tracking-[.2em] text-black dark:text-white">
                                    {findByUniqueId(mainData, 1659)}
                                </h2>
                            </div>
                        </ClipSection>
                    </div>
                </div>

                {cardsData.map((card, index) => (

                    <div
                        key={card.id}
                        className="sticky h-[43lvh] mx-5 lg:mx-9"
                        style={{
                            top: "50px",
                        }}
                    >
                        <div
                            className={`
                absolute
                left-0
                right-0
                bottom-0
                w-full
                h-[70lvh]
                lg:h-[55lvh]
                overflow-hidden
                flex
                flex-col-reverse
                lg:flex-row
              `}
                            style={{
                                top: `${(index + 1) * 90}px`,
                                zIndex: index + 2,
                            }}
                        >
                            {/* Left */}

                            <div className={`flex flex-col  p-5 lg:p-10  w-full lg:w-[60%] rounded-[32px] border border-solid border-white dark:border-neutral-800 ${card.gradient}`}>
                                <div className="hidden lg:flex gap-5">
                                    <div className="text-white/50 tex font-semibold tracking-[.15em] text-xl">
                                        {(index + 1).toString().padStart(2, "0")}
                                    </div>

                                    <div>

                                        <h3 className="text-3xl lg:text-5xl font-bold uppercase text-white leading-tight">
                                            {card.title}
                                        </h3>

                                        <p className="mt-7 max-w-xl text-white/75 leading-8">
                                            {card.description}
                                        </p>

                                    </div>
                                </div>
                                <div className=" flex-col justify-center items-center flex lg:hidden">
                                    <div className="w-[220px] lg:w-[320px]">
                                        {card.icon}
                                    </div>
                                </div>


                            </div>
                            <ClipSection
                                radius={32}
                                cornerSize={120}
                                cornerRadius={16}
                                borderClassName="text-white dark:text-neutral-800"
                                borderWidth={1}
                                corner={params.lang == "fa" ? "tl" : "tr"}
                                className={`${card.gradient} !bg-transparent  items-center justify-center p-10 w-full lg:w-[40%] hidden lg:flex`}>

                                <div className="flex flex-col justify-center items-center">
                                    <div className="w-[220px] lg:w-[320px]">
                                        {card.icon}
                                    </div>
                                </div>

                            </ClipSection>
                            <ClipSection
                                radius={24}
                                cornerSize={80}
                                cornerRadius={16}
                                borderClassName="text-white dark:text-neutral-800"
                                borderWidth={1}
                                corner={params.lang == "fa" ? "tl" : "tr"}
                                className={`${card.gradient} !bg-transparent h-full  gap-3 items-start justify-start p-3 w-full !flex-row lg:w-[40%] flex lg:hidden`}>

                                <div className="flex flex-row gap-5">
                                    <div className="text-white/50 text-sm font-semibold tracking-[.15em]">
                                        {(index + 1).toString().padStart(2, "0")}
                                    </div>

                                    <div className="h-min ">

                                        <p className="text-xl pe-[50px]  font-bold uppercase text-white leading-tight">
                                            {card.title}
                                        </p>

                                        <p className="mt-7 max-w-xl pe-[30px] text-white/75 leading-5">
                                            {card.description}
                                        </p>

                                    </div>
                                </div>

                            </ClipSection>
                        </div>

                    </div>
                ))}

            </div>

            <div className="h-[60lvh] 2xl:h-[56.5lvh]" />
        </div>
    );
}
