// components/TrustedBy.tsx
'use client';

import Image from 'next/image';
import TextScramble from '@/components/ui/animations/textScramble';
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import Reveal from '@/components/ui/animations/Reveal';
import ClipSection from '@/components/shared/ClipContainer';
import { useState, useEffect } from 'react';
interface TrustedByProps {
    params: { lang: string };
    mainData: { mainData: string };
}


export default function TrustedBy({ params, mainData }: TrustedByProps) {
        const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(max-width: 1023px)");

        const update = () => setIsMobile(media.matches);

        update();

        media.addEventListener("change", update);

        return () => media.removeEventListener("change", update);
    }, []);
    const academyCards = [
        {
            id: 1,
            img: 'https://s3.metarang.com/metarang/onepage/testimg.jpg',
            title: findByUniqueId(mainData, 1690),
            description: 'Avalanche Academy is a suite of courses for developers of all experience levels to hone their skills, while the Codebase Entrepreneur Academy offers the foundational knowledge needed to launch and grow your Web3 startup on Avalanche....',
            buttonText: findByUniqueId(mainData, 1686),
        },
        {
            id: 2,
            img: 'https://s3.metarang.com/metarang/onepage/testimg.jpg',
            title: findByUniqueId(mainData, 1690),
            description: 'Avalanche Academy is a suite of courses for developers of all experience levels to hone their skills, while the Codebase Entrepreneur Academy offers the foundational knowledge needed to launch and grow your Web3 startup on Avalanche....',
            buttonText: findByUniqueId(mainData, 1686),
        },
        {
            id: 3,
            img: 'https://s3.metarang.com/metarang/onepage/testimg.jpg',
            title: findByUniqueId(mainData, 1690),
            description: 'Avalanche Academy is a suite of courses for developers of all experience levels to hone their skills, while the Codebase Entrepreneur Academy offers the foundational knowledge needed to launch and grow your Web3 startup on Avalanche....',
            buttonText: findByUniqueId(mainData, 1686),
        },
        {
            id: 4,
            img: 'https://s3.metarang.com/metarang/onepage/testimg.jpg',
            title: findByUniqueId(mainData, 1690),
            description: 'Avalanche Academy is a suite of courses for developers of all experience levels to hone their skills, while the Codebase Entrepreneur Academy offers the foundational knowledge needed to launch and grow your Web3 startup on Avalanche....',
            buttonText: findByUniqueId(mainData, 1686),
        },
        {
            id: 5,
            img: 'https://s3.metarang.com/metarang/onepage/testimg.jpg',
            title: findByUniqueId(mainData, 1690),
            description: 'Avalanche Academy is a suite of courses for developers of all experience levels to hone their skills, while the Codebase Entrepreneur Academy offers the foundational knowledge needed to launch and grow your Web3 startup on Avalanche....',
            buttonText: findByUniqueId(mainData, 1686),
        },
        {
            id: 6,
            img: 'https://s3.metarang.com/metarang/onepage/testimg.jpg',
            title: findByUniqueId(mainData, 1690),
            description: 'Avalanche Academy is a suite of courses for developers of all experience levels to hone their skills, while the Codebase Entrepreneur Academy offers the foundational knowledge needed to launch and grow your Web3 startup on Avalanche....',
            buttonText: findByUniqueId(mainData, 1686),
        },
    ];
    return (
        <ClipSection
            corner={params.lang == "fa" ? "tr" : "tl"}
            radius={isMobile ? 12 : 32}
            cornerSize={isMobile ? 80 : 120}
            className="py-4 lg:py-12 px-4 2xl:px-10  text-white dark:text-[#1A1A18] rounded-[40px] rtl:rounded-tr-[120px] ltr:rounded-tl-[120px] lg:rtl:rounded-tr-[200px] lg:ltr:rounded-tl-[200px]">
            <div className="text-black dark:text-white overflow-hidden w-full">
                {/* متن اصلی */}
                <div className='flex flex-col lg:flex-row gap-5 lg:gap-0 gap-y-0 w-full  lg:mt-5 items-center lg:items-start border-b border-solid border-x-0 border-t-0 dark:border-[#434343] border-[#D9D9D9] pb-10'>
                    <div className='w-full lg:w-[300px] ms-5 lg:ms-0'>

                        <Reveal
                            className="!opacity-100 w-full"
                            direction={params.lang == "fa" ? "right" : "left"}
                            distance={200}
                            duration={1500}
                            delay={300}>
                            <svg className='w-[100px] xl:w-auto ' width="198" height="198" viewBox="0 0 198 198" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className='fill-black dark:fill-white' d="M45.0441 16.5H33.4113C25.7388 16.5 21.8614 25.8225 27.3064 31.2675L74.5787 78.54C88.1087 92.07 109.971 92.07 123.501 78.54L170.774 31.2675C176.219 25.8225 172.342 16.5 164.669 16.5H153.036C146.189 16.5 139.589 19.2225 134.722 24.09L105.186 53.625C101.804 57.0075 96.3591 57.0075 92.9766 53.625L63.4414 24.09C58.4914 19.2225 51.8916 16.5 45.0441 16.5Z" fill="white" />
                                <path className='fill-black dark:fill-white' d="M45.0441 181.25H33.4113C25.7388 181.25 21.8614 171.928 27.3064 166.483L74.5787 119.21C88.1087 105.68 109.971 105.68 123.501 119.21L170.774 166.483C176.219 171.928 172.342 181.25 164.669 181.25H153.036C146.189 181.25 139.589 178.527 134.722 173.66L105.186 144.125C101.804 140.742 96.3591 140.742 92.9766 144.125L63.4414 173.66C58.4914 178.527 51.8916 181.25 45.0441 181.25Z" fill="white" />
                            </svg>
                        </Reveal>
                    </div>
                    <div className="text-start max-w-3xl w-full px-3 mt-[-24px] lg:mt-0">
                        <TextScramble className=" dark:text-white text-5xl xl:text-5xl 2xl:text-5xl 3xl:text-6xl lg:leading-relaxed xl:!leading-[70px]"
                            text={findByUniqueId(mainData, 1679)}
                            lang={params.lang}
                        />

                    </div>
                </div>

                {/* عنوان پایین */}
                <div className=" flex flex-col lg:flex-row mt-12 gap-10 px-5 lg:px-0">

                    <div className="dark:text-white text-start text-sm 2xl:text-xl tracking-[0.2em] uppercase mb-10 max-w-[420px]">

                        <Reveal
                            direction={'bottom'}
                            distance={200}
                            duration={2300}
                            delay={300}>
                            {findByUniqueId(mainData, 1680)}
                        </Reveal>
                    </div>
                    <div className="text-black dark:text-white mt-[-34px] lg:mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                            {academyCards.map((card, idx) => (
                                <div
                                    key={card.id}
                                    className="group hover:bg-neutral-100 dark:hover:bg-neutral-800 duration-300 space-y-4 border border-solid text-start  border-[#D9D9D9] dark:border-[#434343] rounded-xl lg:rounded-xl lg:rounded-[32px] p-2 lg:p-3   "
                                >
                                    <div className="w-full h-[90px] lg:h-[135px] relative rounded-xl lg:rounded-xl lg:rounded-[32px] overflow-hidden">
                                        <Image
                                            src={card.img}
                                            alt={card.title + " pic"}

                                            fill

                                            className="object-cover"

                                            sizes="(max-width: 768px) 100vw, 33vw"

                                            // کمک به render بهتر
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>
                                    {/* عنوان */}
                                    <div className='space-y-4 px-3 pb-2'>
                                        <h3 className="text-xl 2xl:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                            {card.title}
                                        </h3>

                                        {/* توضیحات */}
                                        <p className=" dark:text-white text-sm leading-relaxed mb-6">
                                            {card.description}
                                        </p>

                                        {/* دکمه Learn more */}
                                        <div className="group cursor-pointer inline-flex items-center gap-3 bg-transparent hover:text-[#9100D9] rounded-3xl rtl:rounded-bl-[100px] ltr:rounded-br-[100px]  text-gray-900 dark:text-white font-medium text-sm transition-all duration-300 px-5 py-3">
                                            <span className='text-base group-hover:text-[#9100D9] font-bold'>{card.buttonText}</span>
                                            <svg className="w-5 h-5 text-[#9100D9] rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:translate-x-[-4px]" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path className='stroke-[#9100D9] ' d="M14.4297 5.92969L20.4997 11.9997L14.4297 18.0697" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                <path className='stroke-[#9100D9] ' d="M3.5 12H20.33" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ClipSection>
    );
}