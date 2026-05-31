'use client';



export default function AvalancheCTA() {
    return (
        <section className="w-full rounded-[28px] bg-white dark:bg-[#1A1A18] p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* LEFT CARD */}
                <div
                    className="relative bg-[url(../../public/whitepaper/formbg.jpg)] overflow-hidden rounded-[18px] min-h-[360px]  p-5 2xl:px-10 2xl:py-12 flex flex-col justify-between bg-cover bg-center"

                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/45 z-0" />

                    {/* Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-black/40 z-0" />

                    <div className="relative z-10">
                        <h2 className="text-white text-[52px] leading-[1] font-semibold tracking-[-2px] max-w-[420px]">
                            Start building On Avalanche
                        </h2>

                        <p className="mt-6 text-white/75 text-[14px] leading-6 max-w-[360px]">
                            Create, scale, and innovate with Avalanche&apos;s
                            powerful builder infrastructure.
                        </p>
                    </div>

                    {/* Button */}
                    <div className="relative z-10">
                        <button aria-label="btn strart" className="lg:text-xl gap-2 bg-[#9100D9]  text-white font-medium hover:gap-3 transition-all duration-300 group/btn rounded-[16px] ltr:rounded-br-[100px] rtl:rounded-bl-[100px] px-10 py-3 flex justify-between items-center w-max ms-auto">

                            <span>Get started</span>
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

                {/* RIGHT CARD */}
                <div
                    className="relative bg-[url(../../public/whitepaper/formbg.jpg)] overflow-hidden rounded-[18px] min-h-[360px] p-5 2xl:px-10 2xl:py-12 bg-cover bg-center"

                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 z-0" />

                    {/* Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-black/40 z-0" />

                    <div className="relative z-10 h-full flex flex-col">
                        {/* Header */}
                        <div>
                            <h2 className="text-white text-[50px] leading-[1] font-semibold tracking-[-2px]">
                                Join the Email List
                            </h2>

                            <p className="mt-5 text-white/75 text-[14px] leading-6 max-w-[420px]">
                                Sign up today to stay up to date on the latest
                                network developments.
                            </p>
                        </div>

                        {/* Form */}
                        <div className="mt-10 grid md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="First name orPseudonym*"
                                className="h-[58px] rounded-xl bg-white px-5 text-black outline-none border border-transparent focus:border-fuchsia-500 text-[14px] font-medium"
                            />

                            <input
                                type="text"
                                placeholder="Last name"
                                className="h-[58px] rounded-xl bg-white px-5 text-black outline-none border border-transparent focus:border-fuchsia-500 text-[14px] font-medium"
                            />

                            <input
                                type="email"
                                placeholder="Email*"
                                className="h-[58px] rounded-xl bg-white px-5 text-black outline-none border border-transparent focus:border-fuchsia-500 text-[14px] font-medium"
                            />

                            <input
                                type="text"
                                placeholder="Twitter handle"
                                className="h-[58px] rounded-xl bg-white px-5 text-black outline-none border border-transparent focus:border-fuchsia-500 text-[14px] font-medium"
                            />
                        </div>

                        {/* Footer */}
                        <div className=" flex flex-col gap-y-5 mt-5 md:flex-row items-center justify-between pt-8">
                            <div className="flex items-center gap-5">
                                <span className="text-white text-[11px]">
                                    1 of 5 steps
                                </span>

                                <div className="w-[110px] h-[2px] bg-white/15 rounded-full overflow-hidden">
                                    <div className="w-[35%] h-full bg-white rounded-full" />
                                </div>
                            </div>

                            <button aria-label="btn next" className="lg:text-xl gap-2 bg-[#9100D9] w-max text-white font-medium hover:gap-3 transition-all duration-300 group/btn rounded-[16px] ltr:rounded-br-[100px] rtl:rounded-bl-[100px] px-10 py-3  flex justify-between items-center ms-auto">

                                <span>Next</span>
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
                </div>
            </div>
        </section>
    );
}