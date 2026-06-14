// components/AvalancheStories.tsx
'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import TextScramble from '@/components/utils/textScramble';
import { findByUniqueId } from "@/components/utils/findByUniqueId";
interface AvalancheStoriesProps {
    params: { lang: string };
    mainData: { mainData: string };
}
interface StoryItem {
    id: number;
    platform: string;
    username: string;
    handle: string;
    content: string;
    image?: string;
}

const stories: StoryItem[] = [
    {
        id: 1,
        platform: 'Youtube',
        username: 'avalanche',
        handle: 'avax',
        content:
            'The Avalanche culture goes beyond the chain. Get connected with the founders, investors, artists, gamers, and creators who call Avalanche home…',
        image: '/whitepaper/bgCodeSpace.png',
    },
    {
        id: 2,
        platform: 'Behance',
        username: 'avalanche',
        handle: 'avax',
        content:
            'Avalanche creators are building immersive experiences, decentralized communities and scalable ecosystems for the future.',
    },
    {
        id: 3,
        platform: 'Adobe',
        username: 'avalanche',
        handle: 'avax',
        content:
            'Avalanche empowers developers and creators to build performant applications with institutional-grade infrastructure.',
        image: '/whitepaper/bgCodeSpace.png',
    },
    {
        id: 4,
        platform: 'Facebook',
        username: 'avalanche',
        handle: 'avax',
        content:
            'From gaming to finance and AI infrastructure, Avalanche supports high-throughput decentralized applications.',
    },
    {
        id: 5,
        platform: 'Youtube',
        username: 'avalanche',
        handle: 'avax',
        content:
            'Explore stories from founders and communities building scalable products powered by Avalanche technology.',
        image: '/whitepaper/bgCodeSpace.png',
    },
];

const socials = [
    'Youtube',
    'Behance',
    'Adobe',
    'Facebook',
    'Youtube',
];

function SocialPill({ label }: { label: string }) {
    return (
        <button
            className="
                flex
                items-center
                gap-3
                rounded-[14px]
                border
                border-solid
                bg-white
                border-[#D9D9D9]
                dark:border-[#2A2A2A]
                dark:bg-[#111111]
                px-4
                py-3
                text-xs
                font-medium
                tracking-[0.18em]
                dark:text-white
                transition-colors
                duration-300
                hover:border-[#3D3D3D]
            "
        >
            <div
                className="
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-md
                    dark:bg-white
                    dark:text-black
                    text-white
                    bg-black
                "
            >
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path d="M10 15L15.19 12L10 9V15ZM21.8 8S21.6 6.6 21 6C20.2 5.2 19.3 5.2 18.9 5.1C16 4.9 12 4.9 12 4.9H11.9S7.9 4.9 5 5.1C4.6 5.2 3.7 5.2 2.9 6C2.3 6.6 2.1 8 2.1 8S1.9 9.6 1.9 11.2V12.7C1.9 14.3 2.1 15.9 2.1 15.9S2.3 17.3 2.9 17.9C3.7 18.7 4.8 18.7 5.3 18.8C7.1 19 12 19 12 19S16 19 18.9 18.8C19.3 18.7 20.2 18.7 21 17.9C21.6 17.3 21.8 15.9 21.8 15.9S22 14.3 22 12.7V11.2C22 9.6 21.8 8 21.8 8Z" />
                </svg>
            </div>

            <span>{label}</span>
        </button>
    );
}

function StoryCard({
    item,
    priority = false,
}: {
    item: StoryItem;
    priority?: boolean;
}) {
    return (
        <article
            className="
                news-card
                snap-start
                flex-shrink-0
                overflow-hidden
                rounded-[18px]
                bg-[#F5F5F5]
                dark:bg-black
                w-[280px]
                xl:w-[320px]
                2xl:w-[420px]
                transition-colors
                duration-300
                hover:border-[#2B2B2B]
                h-min
            "
        >
            <div className="px-3 lg:px-5 py-5">
                {/* USER */}
                <div className="flex items-center gap-3">
                    <div>
                        <svg width="41" height="35" viewBox="0 0 41 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.4311 0.9848C19.2047 -0.328259 21.1038 -0.328274 21.8774 0.9848L31.1001 16.6391L18.1538 34.7787H26.3413L34.6176 22.6098L40.0288 31.7944C40.8139 33.1275 39.8523 34.8098 38.3051 34.81H2.00337C0.455979 34.81 -0.505637 33.1276 0.279739 31.7944L18.4311 0.9848ZM34.6528 22.56L34.6176 22.6098L31.1001 16.6391L31.1547 16.5639L34.6528 22.56Z" fill="#9100D9" />
                        </svg>
                    </div>

                    <div>
                        <p className="text-sm font-semibold dark:text-white">
                            {item.username}
                        </p>

                        <p className="text-xs uppercase tracking-[0.18em] text-[#1A1A18] dark:text-[#9A9A9A]">
                            {item.handle}
                        </p>
                    </div>
                </div>

                {/* CONTENT */}
                <p
                    className="
                        mt-5
                        line-clamp-5
                        text-[15px]
                        leading-[1.6]
                        tracking-[0.06em]
                        text-[#1A1A18]
                        dark:text-[#D4D4D4]
                    "
                >
                    {item.content}

                </p>
            </div>

            {/* IMAGE */}
            {item.image && (
                <div className="relative min-h-64 px-5 pb-5 w-full flex items-end">
                    <Image
                        src={item.image}
                        alt={item.content}
                        fill
                        priority={priority}
                        loading={priority ? 'eager' : 'lazy'}
                        quality={70}
                        sizes="280px"
                        className="!static rounded-xl"
                    />
                </div>
            )}
        </article>
    );
}

export default function AvalancheStories({ params, mainData }: AvalancheStoriesProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);

    const updateButtons = () => {
        const container = scrollRef.current;

        if (!container) return;

        const { scrollLeft, scrollWidth, clientWidth } = container;

        setShowLeftButton(scrollLeft > 5);
        setShowRightButton(
            scrollLeft + clientWidth < scrollWidth - 5
        );
    };

    useEffect(() => {
        const container = scrollRef.current;

        if (!container) return;

        updateButtons();

        container.addEventListener('scroll', updateButtons, {
            passive: true,
        });

        window.addEventListener('resize', updateButtons);

        return () => {
            container.removeEventListener(
                'scroll',
                updateButtons
            );

            window.removeEventListener(
                'resize',
                updateButtons
            );
        };
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        const container = scrollRef.current;

        if (!container) return;

        const card =
            container.querySelector<HTMLElement>('.news-card');

        if (!card) return;

        const gap = 20;
        const amount = card.offsetWidth + gap;

        container.scrollBy({
            left: direction === 'right' ? amount : -amount,
            behavior: 'smooth',
        });
    };

    return (
        <section
            className={`                relative
                overflow-hidden
                rounded-[42px]
                rounded-tr-[120px]
                border
                border-[#1E1E1E]
                bg-white
                dark:bg-[#1A1A18]
                py-10
                lg:py-14`}

        >
            {/* BG GLOW */}
            <div
                aria-hidden="true"
                className="absolute inset-0 opacity-20 pointer-events-none"

            />

            <div className="relative z-10 px-5 lg:px-10">

                {/* HEADER */}
                <div
                    className={`grid
                        border-b border-solid border-x-0 border-t-0 dark:border-[#434343] border-[#D9D9D9] pb-10
                        lg:grid-cols-[1fr_auto_auto]
                        lg:items-center`}

                >


                    <div className='flex gap-10 mt-5 items-center '>
                        <div>
                            <svg className='w-[100px] xl:w-auto' width="198" height="198" viewBox="0 0 198 198" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className='fill-black dark:fill-white' d="M45.0441 16.5H33.4113C25.7388 16.5 21.8614 25.8225 27.3064 31.2675L74.5787 78.54C88.1087 92.07 109.971 92.07 123.501 78.54L170.774 31.2675C176.219 25.8225 172.342 16.5 164.669 16.5H153.036C146.189 16.5 139.589 19.2225 134.722 24.09L105.186 53.625C101.804 57.0075 96.3591 57.0075 92.9766 53.625L63.4414 24.09C58.4914 19.2225 51.8916 16.5 45.0441 16.5Z" fill="white" />
                                <path className='fill-black dark:fill-white' d="M45.0441 181.25H33.4113C25.7388 181.25 21.8614 171.928 27.3064 166.483L74.5787 119.21C88.1087 105.68 109.971 105.68 123.501 119.21L170.774 166.483C176.219 171.928 172.342 181.25 164.669 181.25H153.036C146.189 181.25 139.589 178.527 134.722 173.66L105.186 144.125C101.804 140.742 96.3591 140.742 92.9766 144.125L63.4414 173.66C58.4914 178.527 51.8916 181.25 45.0441 181.25Z" fill="white" />
                            </svg>
                        </div>
                        <div className="text-start max-w-3xl">
                            <TextScramble className={` dark:text-white text-xl xl:text-3xl 2xl:text-5xl 3xl:text-6xl leading-relaxed`}
                                text={findByUniqueId(mainData, 1708)}
                                lang={params.lang}
                            />
                        </div>
                    </div>

                    {/* LEFT */}
                    <div className="max-w-[430px]">
                        <p
                            className={`text-[20px]
                                leading-[1.35]
                                tracking-[0.08em]
                                dark:text-[#E7E7E7] text-[#1A1A18]`}
                        >
                            {findByUniqueId(mainData, 1707)}
                        </p>
                    </div>

                </div>

                {/* TOP BAR */}
                <div
                    className={`mt-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between`}

                >
                    {/* SOCIALS */}
                    <div className="flex flex-wrap gap-4">
                        {socials.map((item, index) => (
                            <SocialPill
                                key={`${item}-${index}`}
                                label={item}
                            />
                        ))}
                    </div>

                    {/* NAV */}
                    <div className="flex items-center gap-3 rtl:flex-row-reverse">
                        <button
                            onClick={() => scroll('left')}
                            aria-label="Previous"
                            className={`flex h-11 w-11 items-center group hover:bg-[#9100D9]  bg-transparent  justify-center rounded-full border border-solid border-[#D9D9D9] dark:border-[#2D2D2D] text-white transition-all duration-300 hover:text-black disabled:cursor-not-allowed disabled:opacity-40`}
                        >
                            <svg className="w-5 h-5 text-[#00CEB9] group-hover:text-white rtl:rotate-180 ltr:rotate-180 duration-300" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path className='stroke-[#D9D9D9] dark:stroke-[#434343]' d="M14.4297 5.92969L20.4997 11.9997L14.4297 18.0697" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                <path className='stroke-[#D9D9D9] dark:stroke-[#434343]' d="M3.5 12H20.33" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        <button
                            onClick={() => scroll('right')}

                            aria-label="Next"
                            className={`flex h-11 w-11  bg-transparent group hover:bg-[#9100D9]  items-center justify-center rounded-full border border-solid border-[#D9D9D9] dark:border-[#2D2D2D] text-white transition-all duration-300  hover:text-black disabled:cursor-not-allowed disabled:opacity-40`}
                        >
                            <svg className="w-5 h-5 text-[#00CEB9] group-hover:text-white duration-300" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path className='stroke-[#D9D9D9] dark:stroke-[#434343] group-hover:stroke-white' d="M14.4297 5.92969L20.4997 11.9997L14.4297 18.0697" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                <path className='stroke-[#D9D9D9] dark:stroke-[#434343] group-hover:stroke-white' d="M3.5 12H20.33" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* SLIDER */}
                <div
                    ref={scrollRef}
                    className={`hide-scrollbar mt-10 flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4`}

                >
                    {stories.map((item, index) => (
                        <StoryCard
                            key={item.id}
                            item={item}
                            priority={index === 0}
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
}