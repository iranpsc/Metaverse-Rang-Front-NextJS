// components/NewsStories.tsx
'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import TextScramble from '@/components/utils/textScramble';
import { findByUniqueId } from "@/components/utils/findByUniqueId";
interface NewsStoriesProps {
    params: { lang: string };
    mainData: { mainData: string };
}
interface NewsItem {
    id: number;
    category: string;
    title: string;
    description: string;
    date: string;
    author: string;
    readTime: string;
    featured?: boolean;
    image?: string;
}

const newsData: NewsItem[] = [
    {
        id: 1,
        category: 'FEATURED / NEWS',
        title: 'Enterprise and consumer apps are coming together on Avalanche',
        description: 'Major brands and Web3 pioneers are building the next generation of digital experiences on Avalanche\'s high-performance subnet architecture.',
        date: 'NOV 20, 2025',
        author: 'AVALANCHE',
        readTime: '5 MINUTE READ',
        featured: true,
        image: '/whitepaper/bgCodeSpace.png',
    },
    {
        id: 2,
        category: 'Announcement',
        title: 'ROYALTIES IN SECONDS, NOT MONTHS: MUSIC GOES ONCHAIN WITH AVALANCHE',
        description: 'How Record Financial and 11am, home to artists like Armani White, RealestK, Lil Tjay, ASAP Ferg, Alex Warren, and Maddox, are using Avalanche to pay royalties in seconds.',
        date: 'NOV 20, 2025',
        author: 'AVALANCHE',
        readTime: '3 MINUTE READ',
        image: '/whitepaper/bgCodeSpace.png',
    },
    {
        id: 3,
        category: 'News',
        title: 'HOW RECORD FINANCIAL AND 11AM, HOME TO ARTISTS LIKE ARMANI WHITE',
        description: 'The music industry moves onchain: instant royalty payments, transparent licensing, and new revenue streams for creators.',
        date: 'NOV 19, 2025',
        author: 'AVALANCHE',
        readTime: '2 MINUTE READ',
        image: '/whitepaper/bgCodeSpace.png',
    },
    {
        id: 4,
        category: 'Announcement',
        title: 'ROYALTIES IN SECONDS, NOT MONTHS: MUSIC GOES ONCHAIN WITH AVALANCHE',
        description: 'Artists like ASAP Ferg, Alex Warren, and Madd0x are now receiving royalties instantly via smart contracts.',
        date: 'NOV 18, 2025',
        author: 'AVALANCHE',
        readTime: '4 MINUTE READ',
        image: '/whitepaper/bgCodeSpace.png',
    },
    {
        id: 5,
        category: 'News',
        title: 'AVALANCHE POWERS NEXT-GEN GAMING ECONOMIES',
        description: 'Game developers are building player-owned economies with subnets, offering near-zero fees and instant finality.',
        date: 'NOV 17, 2025',
        author: 'AVALANCHE',
        readTime: '5 MINUTE READ',
        image: '/whitepaper/bgCodeSpace.png',
    },
    {
        id: 6,
        category: 'Announcement',
        title: 'ENTERPRISE AND CUSTOM APPS: NEW TOOLS FOR BUILDERS',
        description: 'Launch your own custom blockchain with Avalanche’s Subnet technology – scalable, sovereign, and interoperable.',
        date: 'NOV 16, 2025',
        author: 'AVALANCHE',
        readTime: '2 MINUTE READ',
        image: '/whitepaper/bgCodeSpace.png',
    },
];

export default function NewsStories({ params, mainData }: NewsStoriesProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);
    const [isRTL, setIsRTL] = useState(false);
    const newsData: NewsItem[] = [
        {
            id: 1,
            category: findByUniqueId(mainData, 1702),
            title: 'Enterprise and consumer apps are coming together on Avalanche',
            description: 'Major brands and Web3 pioneers are building the next generation of digital experiences on Avalanche\'s high-performance subnet architecture.',
            date: 'NOV 20, 2025',
            author: 'AVALANCHE',
            readTime: '5 ',
            featured: true,
            image: '/whitepaper/bgCodeSpace.png',
        },
        {
            id: 2,
            category: findByUniqueId(mainData, 1703),
            title: 'ROYALTIES IN SECONDS, NOT MONTHS: MUSIC GOES ONCHAIN WITH AVALANCHE',
            description: 'How Record Financial and 11am, home to artists like Armani White, RealestK, Lil Tjay, ASAP Ferg, Alex Warren, and Maddox, are using Avalanche to pay royalties in seconds.',
            date: 'NOV 20, 2025',
            author: 'AVALANCHE',
            readTime: '3 ',
            image: '/whitepaper/bgCodeSpace.png',
        },
        {
            id: 3,
            category: findByUniqueId(mainData, 255),
            title: 'HOW RECORD FINANCIAL AND 11AM, HOME TO ARTISTS LIKE ARMANI WHITE',
            description: 'The music industry moves onchain: instant royalty payments, transparent licensing, and new revenue streams for creators.',
            date: 'NOV 19, 2025',
            author: 'AVALANCHE',
            readTime: '2 ',
            image: '/whitepaper/bgCodeSpace.png',
        },
        {
            id: 4,
            category: findByUniqueId(mainData, 1703),
            title: 'ROYALTIES IN SECONDS, NOT MONTHS: MUSIC GOES ONCHAIN WITH AVALANCHE',
            description: 'Artists like ASAP Ferg, Alex Warren, and Madd0x are now receiving royalties instantly via smart contracts.',
            date: 'NOV 18, 2025',
            author: 'AVALANCHE',
            readTime: '4 ',
            image: '/whitepaper/bgCodeSpace.png',
        },
        {
            id: 5,
            category: findByUniqueId(mainData, 1703),
            title: 'AVALANCHE POWERS NEXT-GEN GAMING ECONOMIES',
            description: 'Game developers are building player-owned economies with subnets, offering near-zero fees and instant finality.',
            date: 'NOV 17, 2025',
            author: 'AVALANCHE',
            readTime: '5 ',
            image: '/whitepaper/bgCodeSpace.png',
        },
        {
            id: 6,
            category: findByUniqueId(mainData, 1703),
            title: 'ENTERPRISE AND CUSTOM APPS: NEW TOOLS FOR BUILDERS',
            description: 'Launch your own custom blockchain with Avalanche’s Subnet technology – scalable, sovereign, and interoperable.',
            date: 'NOV 16, 2025',
            author: 'AVALANCHE',
            readTime: '2 ',
            image: '/whitepaper/bgCodeSpace.png',
        },
    ];
    // Detect RTL direction on mount and when it changes
    useEffect(() => {
        const checkRTL = () => {
            const dir = document.documentElement.getAttribute('dir') ||
                document.body.getAttribute('dir') ||
                'ltr';
            setIsRTL(dir === 'rtl');
        };
        checkRTL();
        const observer = new MutationObserver(checkRTL);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['dir'] });
        return () => observer.disconnect();
    }, []);

    const updateButtons = () => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const { scrollLeft, scrollWidth, clientWidth } = container;
        let atStart, atEnd;
        if (isRTL) {
            atStart = scrollLeft >= -1;
            atEnd = Math.abs(scrollLeft) + clientWidth >= scrollWidth - 1;
            setShowLeftButton(!atStart);
            setShowRightButton(!atEnd);
        } else {
            atStart = scrollLeft <= 1;
            atEnd = scrollLeft + clientWidth >= scrollWidth - 1;
            setShowLeftButton(!atStart);
            setShowRightButton(!atEnd);
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', updateButtons);
            updateButtons();
            window.addEventListener('resize', updateButtons);
        }
        return () => {
            if (container) container.removeEventListener('scroll', updateButtons);
            window.removeEventListener('resize', updateButtons);
        };
    }, [isRTL]);

    const scroll = (direction: 'left' | 'right') => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const cards = container.querySelectorAll('.news-card');
        if (!cards.length) return;
        const firstCard = cards[0] as HTMLElement;
        const gap = 16;
        const step = firstCard.offsetWidth + gap;
        let delta = direction === 'right' ? step : -step;
        if (isRTL) delta = -delta;
        container.scrollBy({ left: delta, behavior: 'smooth' });
    };

    return (
        <section className="w-full bg-white dark:bg-[#1A1A18] py-16  overflow-hidden rounded-[40px] rounded-se-[136px]">
            <div className="px-5 lg:px-10 w-full">

                {/* Header */}
                <div className='flex gap-10 mt-5 items-center border-b border-solid border-x-0 border-t-0 dark:border-[#434343] border-[#D9D9D9] pb-10'>
                    <div>
                        <svg className='w-[100px] xl:w-auto' width="198" height="198" viewBox="0 0 198 198" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className='fill-black dark:fill-white' d="M45.0441 16.5H33.4113C25.7388 16.5 21.8614 25.8225 27.3064 31.2675L74.5787 78.54C88.1087 92.07 109.971 92.07 123.501 78.54L170.774 31.2675C176.219 25.8225 172.342 16.5 164.669 16.5H153.036C146.189 16.5 139.589 19.2225 134.722 24.09L105.186 53.625C101.804 57.0075 96.3591 57.0075 92.9766 53.625L63.4414 24.09C58.4914 19.2225 51.8916 16.5 45.0441 16.5Z" fill="white" />
                            <path className='fill-black dark:fill-white' d="M45.0441 181.25H33.4113C25.7388 181.25 21.8614 171.928 27.3064 166.483L74.5787 119.21C88.1087 105.68 109.971 105.68 123.501 119.21L170.774 166.483C176.219 171.928 172.342 181.25 164.669 181.25H153.036C146.189 181.25 139.589 178.527 134.722 173.66L105.186 144.125C101.804 140.742 96.3591 140.742 92.9766 144.125L63.4414 173.66C58.4914 178.527 51.8916 181.25 45.0441 181.25Z" fill="white" />
                        </svg>
                    </div>
                    <div className="text-start max-w-3xl">
                        <TextScramble className=" dark:text-white text-xl xl:text-3xl 2xl:text-5xl 3xl:text-6xl leading-relaxed 2xl:!leading-[80px]"
                            text={findByUniqueId(mainData, 1700)}
                            lang={params.lang}
                        />

                    </div>
                </div>
                {/* Navigation buttons */}
                <div className='mt-10 mb-6 flex flex-col  w-full'>
                    <div className='hidden md:flex dark:text-white md:text-xl  items-center ltr:justify-start rtl:justify-end gap-[70%] md:gap-[60%] lg:gap-[40%] xl:gap-[36%] mb-[-12px]'>
                        <p>{findByUniqueId(mainData, 255)}</p>
                        <p>
                            {findByUniqueId(mainData, 1701)}
                        </p>

                    </div>
                    <div className="flex rtl:flex-row-reverse gap-3 ltr:justify-end rtl:justify-end ">
                        <button
                            onClick={() => scroll('left')}
                            disabled={!showLeftButton}
                            className={`p-2 group aspect-square w-11 h-11 text-white flex items-center bg-transparent justify-center rounded-full border border-solid transition-all duration-200 ${showLeftButton
                                ? 'border-[#D9D9D9] dark:border-[#434343] hover:bg-[#9100D9] hover:text-white'
                                : 'border-[#D9D9D9] dark:border-[#434343] cursor-not-allowed'
                                }`}
                            aria-label={isRTL ? "Next" : "Previous"}
                        >
                            <svg className="w-5 h-5 text-[#00CEB9] group-hover:text-white rtl:rotate-180 ltr:rotate-180 duration-300" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path className='stroke-[#D9D9D9] dark:stroke-[#434343] group-hover:stroke-white' d="M14.4297 5.92969L20.4997 11.9997L14.4297 18.0697" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                <path className='stroke-[#D9D9D9] dark:stroke-[#434343] group-hover:stroke-white' d="M3.5 12H20.33" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            disabled={!showRightButton}
                            className={`p-2 aspect-square w-11 h-11 flex items-center bg-transparent justify-center rounded-full border border-solid transition-all duration-200 ${showRightButton
                                ? 'border-[#D9D9D9] dark:border-[#434343] hover:bg-[#9100D9] hover:text-white'
                                : 'border-[#D9D9D9] dark:border-[#434343] cursor-not-allowed'
                                }`}
                            aria-label={isRTL ? "Previous" : "Next"}
                        >
                            <svg className="w-5 h-5 text-[#00CEB9] group-hover:text-white duration-300" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path className='stroke-[#D9D9D9] dark:stroke-[#434343] group-hover:stroke-white' d="M14.4297 5.92969L20.4997 11.9997L14.4297 18.0697" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                <path className='stroke-[#D9D9D9] dark:stroke-[#434343] group-hover:stroke-white' d="M3.5 12H20.33" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>

                </div>

                {/* Horizontal scroll container */}
                <div
                    ref={scrollContainerRef}
                    className={`flex overflow-x-auto scroll-smooth snap-x snap-mandatory  pb-7 -mx-2 px-2 hide-scrollbar rtl:flex-row-reverse`}
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {newsData.map((item, idx) => {
                        const isFeatured = item.featured || idx === 0;
                        return (
                            <div
                                key={item.id}
                                className={`news-card snap-start flex-shrink-0 transition-all duration-300 ${isFeatured
                                    ? 'w-[90%] md:w-[70%] lg:w-[45%] xl:w-[40%]'
                                    : 'w-[286px] md:w-[320px] lg:w-[360px] 3xl:w-[384px]'
                                    }`}
                            >
                                {/* All cards use the same design as Featured */}
                                <div className="rounded-[40px] overflow-hidden border border-solid border-[#D9D9D9] dark:border-[#434343] transition-all duration-300 flex flex-col h-full">
                                    <div className="w-full relative">
                                        <Image
                                            src={item.image || "/rafiki-dark.png"}
                                            alt={item.title}
                                            width={350}
                                            height={300}
                                            className="w-full h-full object-cover rounded-[40px] "
                                            onError={(e) => (e.currentTarget.style.display = 'none')}
                                        />
                                    </div>
                                    <div className="flex flex-col justify-between w-full h-full px-3 lg:px-5 p-5">
                                        <div className="flex flex-col gap-3 w-full">
                                            <p className="text-sm bg-[#9100D9] rounded-full w-max px-4 py-1 font-bold text-white">
                                                {item.category}
                                            </p>
                                            <div className="flex flex-wrap items-center gap-2 text-xs text-[#6b6b6b]">
                                                <span>{item.date}</span>
                                                <span>•</span>
                                                <span>{item.author}</span>
                                                <span>•</span>
                                                <span className='uppercase'>{item.readTime}  {findByUniqueId(mainData, 1704)}</span>
                                            </div>
                                            <p className="text-base lg:text-xl font-semibold uppercase text-black dark:text-white block">
                                                {item.title}
                                            </p>
                                            <p className="text-sm lg:text-base text-[#6b6b6b] line-clamp-4">
                                                {item.description}
                                            </p>
                                        </div>
                                        <div >
                                            <button className="group  text-black dark:text-white bg-transparent hover:bg-[#9100D9] hover:text-white inline-flex items-center gap-1 transition-all mt-3 py-2 px-3 rounded-2xl rounded-ee-[35px]" aria-label="read more">
                                                {findByUniqueId(mainData, 195)}
                                                <svg className="w-5 h-5 text-[#9100D9] group-hover:text-white rtl:rotate-180 transition-transform duration-300 rtl:group-hover:translate-x-[-4px] ltr:group-hover:translate-x-1" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path className='stroke-[#9100D9] group-hover:stroke-white' d="M14.4297 5.92969L20.4997 11.9997L14.4297 18.0697" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path className='stroke-[#9100D9] group-hover:stroke-white' d="M3.5 12H20.33" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .line-clamp-4 {
                    display: -webkit-box;
                    -webkit-line-clamp: 4;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </section>
    );
}