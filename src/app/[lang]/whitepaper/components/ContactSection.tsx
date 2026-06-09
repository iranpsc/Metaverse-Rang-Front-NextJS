'use client';
import { findByUniqueId } from "@/components/utils/findByUniqueId";
interface ContactSectionProps {
    params: { lang: string };
    mainData: { mainData: string };
}

export default function ContactSection({ params, mainData }: ContactSectionProps) {
    return (
        <section className="relative overflow-hidden rounded-[40px] rounded-ss-[200px] bg-white dark:bg-[#1A1A18] p-4 lg:p-12">
            {/* Purple glow */}
            <div className="absolute -top-40 -start-4 w-[400px] h-[300px]  lg:h-[500px] lg:w-[500px] rounded-full bg-purple-900/40 lg:bg-purple-900/25 blur-[220px]" />

            <div className="relative z-10">
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
                                className="h-14 rounded-lg dark:bg-black px-4 dark:text-white dark:placeholder:text-white/35 outline-none border  dark:border-transparent focus:border-purple-500"
                            />

                            <input
                                type="text"
                                placeholder={findByUniqueId(mainData, 646)}
                                className="h-14 rounded-lg dark:bg-black px-4 dark:text-white dark:placeholder:text-white/35 outline-none border  dark:border-transparent focus:border-purple-500"
                            />
                        </div>

                        <input
                            type="email"
                            placeholder={findByUniqueId(mainData, 85)}
                            className="w-full h-14 rounded-lg dark:bg-black px-4 dark:text-white dark:placeholder:text-white/35 outline-none border dark:border-transparent focus:border-purple-500"
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
                                dark:placeholder:text-white/35
                                outline-none
                                resize-none
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

                            <button aria-label="confirm" className=" lg:text-xl gap-2 bg-[#9100D9] w-max text-white font-medium hover:gap-3 transition-all duration-300 group/btn rounded-[16px] ltr:rounded-br-[100px] rtl:rounded-bl-[100px] px-10 py-3  flex justify-between items-center ms-auto">

                                <span>{findByUniqueId(mainData, 1755)}</span>
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
                    </form>
                </div>
            </div>
        </section>
    );
}