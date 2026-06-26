
'use client';

import { findByUniqueId } from "@/components/utils/findByUniqueId";
interface FoundationGrantsProps {
    params: { lang: string };
    mainData: { mainData: string };
}

export default function FoundationGrants({ params, mainData }: FoundationGrantsProps) {
    const academyCards = [
    {
        id: 1,
        title: findByUniqueId(mainData, 1690),
        description: 'Avalanche Academy is a suite of courses for developers of all experience levels to hone their skills, while the Codebase Entrepreneur Academy offers the foundational knowledge needed to launch and grow your Web3 startup on Avalanche....',
    },
    {
        id: 2,
        title: findByUniqueId(mainData, 1690),
        description: 'Avalanche Academy is a suite of courses for developers of all experience levels to hone their skills, while the Codebase Entrepreneur Academy offers the foundational knowledge needed to launch and grow your Web3 startup on Avalanche....',
    },
    {
        id: 3,
        title: findByUniqueId(mainData, 1690),
        description: 'Avalanche Academy is a suite of courses for developers of all experience levels to hone their skills, while the Codebase Entrepreneur Academy offers the foundational knowledge needed to launch and grow your Web3 startup on Avalanche....',
    },

];
    return (
        <section className="py-12 flex  px-4 2xl:px-10  bg-[url(../../public/whitepaper/bgFoundationGrants.jpg)] h-[800px] bg-inherit rounded-[40px] ">
            <div className=" grid lg:grid-cols-2  my-auto">
                <div className=" flex flex-col gap-5 justify-between p-10 w-full  text-start h-full border-2 border-solid bg-black/80 border-[#00CEB9] rounded-[40px]">
                    <div>
                        <p className=" text-white text-xl 3xl:text-6xl leading-relaxed uppercase">
                            {findByUniqueId(mainData, 1688)}
                        </p>
                        <p className='text-white lg:text-xl mt-5'>
                            {findByUniqueId(mainData, 1689)}
                        </p>
                    </div>
                    <div className="group cursor-pointer inline-flex items-center gap-6 bg-transparent hover:bg-[#00CEB9] rounded-3xl rtl:rounded-bl-[100px] ltr:rounded-br-[100px] text-white font-medium text-sm transition-all duration-300 px-5 py-3 w-max">
                        <span>{findByUniqueId(mainData, 1681)}</span>
                        <svg className="w-5 h-5 text-[#00CEB9] group-hover:text-white rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-1" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className='stroke-[#00CEB9] group-hover:stroke-white' d="M14.4297 5.92969L20.4997 11.9997L14.4297 18.0697" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            <path className='stroke-[#00CEB9] group-hover:stroke-white' d="M3.5 12H20.33" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>

                {/* عنوان پایین */}
                <div className="w-full ">
                    <div className="flex flex-col">
                        {academyCards.map((card, idx) => (
                            <div
                                key={card.id}
                                className=" space-y-4 border-2 border-solid bg-black/80 border-[#00CEB9] text-start  rounded-[40px] p-5 "
                            >
                                {/* عنوان */}
                                <div className='space-y-4 px-3 pb-2'>
                                    <h3 className="text-xl 2xl:text-2xl font-semibold text-white mb-4">
                                        {card.title}
                                    </h3>

                                    {/* توضیحات */}
                                    <p className=" text-white  leading-relaxed mb-6 lg:text-xl">
                                        {card.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </section>
    );
}