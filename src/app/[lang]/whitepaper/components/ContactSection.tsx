'use client';
import ClipButton from "@/components/shared/ClipButton";
import ClipSection from "@/components/shared/ClipContainer";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import { useEffect, useState } from "react";
interface ContactSectionProps {
    params: { lang: string };
    mainData: { mainData: string };
}

export default function ContactSection({ params, mainData }: ContactSectionProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(max-width: 1023px)");

        const update = () => setIsMobile(media.matches);

        update();

        media.addEventListener("change", update);

        return () => media.removeEventListener("change", update);
    }, []);
    return (
        <ClipSection
            corner={params.lang == "fa" ? "tr" : "tl"}
            radius={32}
            cornerSize={isMobile ? 80 : 120} className="relative overflow-hidden rounded-[32px]  text-white dark:text-[#1A1A18] p-4 lg:p-12">
            {/* Purple glow */}


            <div className="relative z-10 text-black dark:text-white">
                {/* Header */}
                <div className="flex items-center gap-6 px-5 ps-10">
                    <div >
                        <svg className="w-[100px] lg:w-auto" width="221" height="221" viewBox="0 0 221 221" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className="stroke-black dark:stroke-white" d="M46.042 161.143L174.959 32.2266" stroke-width="12" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path className="stroke-black dark:stroke-white" d="M46.042 66.5703V161.14H140.612" stroke-width="12" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path className="stroke-black dark:stroke-white" d="M32.2295 202.586H188.771" stroke-width="12" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>

                    <h2 className="dark:text-white text-5xl md:text-6xl font-semibold tracking-[-0.03em]">
                        {findByUniqueId(mainData, 1549)}
                    </h2>
                </div>

                <div className="mt-7 h-px w-full bg-white/10" />

                {/* Content */}
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-12">
                    {/* Left Text */}
                    <div>
                        <p className="dark:text-white text-[36px] leading-[1.25] font-medium px-3 lg:px-0 text-center lg:text-start">
                            {findByUniqueId(mainData, 1733)}
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-4 text-base" >
                        <div className="grid lg:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder={findByUniqueId(mainData, 79)}
                                className="h-14 placeholder:text-black rounded-lg dark:bg-black px-4 dark:text-white dark:placeholder:text-white outline-none border border-solid border-[#D9D9D9]  dark:border-transparent focus:border-purple-500"
                            />

                            <input
                                type="text"
                                placeholder={findByUniqueId(mainData, 646)}
                                className="h-14 placeholder:text-black rounded-lg dark:bg-black px-4 dark:text-white dark:placeholder:text-white outline-none border border-solid border-[#D9D9D9]  dark:border-transparent focus:border-purple-500"
                            />
                        </div>

                        <input
                            type="email"
                            placeholder={findByUniqueId(mainData, 85)}
                            className=" placeholder:text-black w-full h-14 rounded-lg dark:bg-black px-4 dark:text-white dark:placeholder:text-white outline-none border border-solid border-[#D9D9D9] dark:border-transparent focus:border-purple-500"
                        />

                        <div className="relative">
                            <label htmlFor="state" ></label>
                            <select
                                id="state"
                                className="
                                    w-full
                                    h-14
                                    rounded-lg
                                    dark:bg-black
                                    px-4
                                    dark:text-white
                                    appearance-none
                                    outline-none
                                    border
                                    border-solid border-[#D9D9D9]
                                    dark:border-transparent
                                    focus:border-purple-500
                                "
                            >
                                <option aria-label="contact op">
                                    {findByUniqueId(mainData, 1734)}
                                </option>
                            </select>

                            <svg
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-purple-500"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M6 9L12 15L18 9"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                        </div>

                        <textarea
                            rows={6}
                            placeholder={findByUniqueId(mainData, 1735)}
                            className="
                                w-full
                                rounded-lg
                                dark:bg-black
                                px-4
                                py-4
                                dark:text-white
                                placeholder:text-black
                                dark:placeholder:text-white
                                outline-none
                                resize-none
                                border-solid border-[#D9D9D9]
                                border
                                dark:border-transparent
                                focus:border-purple-500
                            "
                        />

                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-2">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="
                                        h-4
                                        w-4
                                        rounded
                                        border-white/20
                                        bg-transparent
                                    "
                                />

                                <span className="dark:text-white/60 text-sm">
                                    {findByUniqueId(mainData, 1736)}
                                </span>
                            </label>

                            <ClipButton clip={params.lang == "fa" ? "bl" : "br"}
                                className="w-[230px]  h-[64px] group m-5 cursor-pointer duration-300 text-black dark:text-white hover:!text-[#9100D9]">
                                <button
                                    type="button"
                                    aria-label="submit btn"
                                    className="bg-transparent flex items-center text-base !ring-0 !border-0 focus-visible:ring-0"
                                >
                                    <span className="text-white dark:text-black font-medium  group-hover:text-white pe-3">{findByUniqueId(mainData, 1755)}</span>
                                    <svg className="rtl:rotate-180 stroke-white"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        aria-hidden="true"
                                    >
                                        <path className="rtl:rotate-180 stroke-[#9100D9] group-hover:stroke-white"
                                            d="M5 12H19"
                                            stroke="white"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                        />
                                        <path className="rtl:rotate-180 stroke-[#9100D9] group-hover:stroke-white"
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
                    </form>
                </div>
            </div>
        </ClipSection>
    );
}