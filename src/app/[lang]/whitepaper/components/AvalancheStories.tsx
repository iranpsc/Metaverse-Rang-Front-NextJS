// components/AvalancheStories.tsx
'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import TextScramble from '@/components/ui/animations/textScramble';
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import ClipSection from '@/components/shared/ClipContainer';
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
        image: 'https://s3.metarang.com/metarang/onepage/article1.webp',
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
        image: 'https://s3.metarang.com/metarang/onepage/article2.webp',
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
        image: 'https://s3.metarang.com/metarang/onepage/article3.webp',
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
                        <p className="text-sm font-semibold text-black dark:text-white">
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
        const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(max-width: 1023px)");

        const update = () => setIsMobile(media.matches);

        update();

        media.addEventListener("change", update);

        return () => media.removeEventListener("change", update);
    }, []);
    const scrollRef = useRef<HTMLDivElement>(null);

    const [, setShowLeftButton] = useState(false);
    const [, setShowRightButton] = useState(true);

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
function SocialIcon({ label }: { label: string }) {
    switch (label) {
        case 'Youtube':
            return (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.5V8.5L15.8 12l-6.2 3.5Z" />
                </svg>
            );
        case 'Behance':
            return (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M22 7h-6V5h6v2ZM4 5h6.6c3 0 4.9 1.5 4.9 4a3.6 3.6 0 0 1-2.2 3.4A3.8 3.8 0 0 1 16 16.2c0 2.6-2.1 4.3-5.3 4.3H4V5Zm6 6.2c1.5 0 2.4-.6 2.4-1.9 0-1.2-.9-1.8-2.4-1.8H7.4v3.7H10Zm.3 6.8c1.7 0 2.7-.7 2.7-2.1 0-1.4-1-2.1-2.8-2.1H7.4v4.2h2.9ZM23 15.8h-7.4c.1 1.7 1.1 2.6 2.6 2.6 1.1 0 1.9-.5 2.2-1.4h2.4c-.5 2.1-2.3 3.4-4.7 3.4-3.1 0-5.1-2.1-5.1-5.4 0-3.2 2.1-5.5 5.1-5.5 3.2 0 5 2.3 5 5.7v.6Zm-7.3-1.6h5c-.1-1.5-1-2.4-2.4-2.4-1.4 0-2.4.9-2.6 2.4Z" />
                </svg>
            );
        case 'Adobe':
            return (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M15 3h6v18L15 3ZM9 3H3v18L9 3Zm3 6.5 3.5 8.5h-2.4l-.7-1.9h-3l-.7 1.9H6.3L9.8 9.5H12Zm-1.9 4.7h1.7l-.85-2.4-.85 2.4Z" />
                </svg>
            );
        case 'Facebook':
            return (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H16.7V3.7c-.28-.04-1.25-.12-2.37-.12-2.35 0-3.96 1.43-3.96 4.06V10H8v3h2.37v8h3.13Z" />
                </svg>
            );
        default:
            return null;
    }
}

function SocialPill({ label }: { label: string }) {
    return (
        <button
            className="
                flex
                items-center
                gap-3
                rounded-[10px]
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
                hover:bg-black
                hover:text-white
                dark:hover:bg-white
                dark:hover:text-black
                duration-300
            "
        >
            <div
                className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-md
                    dark:bg-white
                    dark:text-black
                    text-white
                    bg-black
                    border
                    border-solid
                    border-neutral-500
                "
            >
                <SocialIcon label={label} />
            </div>

            <span>{label}</span>
        </button>
    );
}

    return (
        <ClipSection
            corner={params.lang == "fa" ? "tl" : "tr"}
            radius={32}
            cornerSize={isMobile ? 80 : 120}
            className={`                relative
                overflow-hidden
                rounded-[32px]
                border
                border-[#1E1E1E]
                text-white
                dark:text-[#1A1A18]
                py-3
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


                    <div className='flex gap-10 lg:mt-5 items-center '>
                        <div>
                            <svg className='w-[100px] xl:w-auto' width="198" height="198" viewBox="0 0 198 198" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className='fill-black dark:fill-white' d="M45.0441 16.5H33.4113C25.7388 16.5 21.8614 25.8225 27.3064 31.2675L74.5787 78.54C88.1087 92.07 109.971 92.07 123.501 78.54L170.774 31.2675C176.219 25.8225 172.342 16.5 164.669 16.5H153.036C146.189 16.5 139.589 19.2225 134.722 24.09L105.186 53.625C101.804 57.0075 96.3591 57.0075 92.9766 53.625L63.4414 24.09C58.4914 19.2225 51.8916 16.5 45.0441 16.5Z" fill="white" />
                                <path className='fill-black dark:fill-white' d="M45.0441 181.25H33.4113C25.7388 181.25 21.8614 171.928 27.3064 166.483L74.5787 119.21C88.1087 105.68 109.971 105.68 123.501 119.21L170.774 166.483C176.219 171.928 172.342 181.25 164.669 181.25H153.036C146.189 181.25 139.589 178.527 134.722 173.66L105.186 144.125C101.804 140.742 96.3591 140.742 92.9766 144.125L63.4414 173.66C58.4914 178.527 51.8916 181.25 45.0441 181.25Z" fill="white" />
                            </svg>
                        </div>
                        <div className="text-start max-w-3xl">
                            <TextScramble className={` text-black dark:text-white text-xl xl:text-3xl 2xl:text-5xl 3xl:text-6xl leading-relaxed`}
                                text={findByUniqueId(mainData, 1708)}
                                lang={params.lang}
                            />
                        </div>
                    </div>

                    {/* LEFT */}
                    <div className="max-w-[430px] lg:mt-7">
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
        </ClipSection>
    );
}