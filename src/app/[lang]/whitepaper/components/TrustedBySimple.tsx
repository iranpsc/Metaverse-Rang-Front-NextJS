// components/AvalancheTrusted.tsx
'use client';

import { useRef, useEffect } from 'react';
import { Framer, Hex, DropBox, Wings } from "@/components/svgs/SvgWhitepaper";
import TextScramble from '@/components/animations/textScramble';
import { findByUniqueId } from "@/components/utils/findByUniqueId";
interface AvalancheTrustedProps {
  params: { lang: string };
  mainData: { mainData: string };
}
interface TrustedCardData {
    id: number;
    icon: React.ReactNode;
}
const svg1 = (
    <Wings className="w-full h-full fill-black" />
);

const svg2 = (
    <Hex className="w-full h-full fill-black" />
);

const svg3 = (
    <DropBox className="w-full h-full fill-black " />
);

const svg4 = (
    <Framer className="w-full h-full fill-black" />
);
const cardsData: TrustedCardData[] = [
    {
        id: 1,
        icon: svg1,
    },
    {
        id: 2,
        icon: svg2
    },
    {
        id: 3,
        icon: svg3
    },
    {
        id: 4,
        icon: svg4
    },
];

export default function AvalancheTrustedProps({ params, mainData }: AvalancheTrustedProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const section = sectionRef.current;
        if (!container || !section) return;

        const cards = container.querySelectorAll('.sticky-card');
        const totalCards = cards.length;

        const handleScroll = () => {
            const sectionRect = section.getBoundingClientRect();
            const scrollPercent = Math.min(
                1,
                Math.max(0, -sectionRect.top / (sectionRect.height - window.innerHeight))
            );

            cards.forEach((card, index) => {
                const cardProgress = Math.min(
                    1,
                    Math.max(0, (scrollPercent - index / totalCards) * totalCards)
                );
                const translateY = (1 - cardProgress) * 20;
                (card as HTMLElement).style.transform = `translateY(${translateY}px)`;
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section
            ref={sectionRef}
            className=""
        >
            {/* Header Section */}
            <div className=" bg-white dark:bg-[#1A1A18] rounded-[40px] rounded-es-none">
                <div className="font-bold text-start flex flex-col justify-start py-12 px-10  space-y-4">
                    <div className='flex flex-col lg:flex-row gap-10 w-full items-center'>
                        <div className='flex flex-col lg:flex-row items-center w-full lg:w-[70%]'>
                            <div>
                                <svg className='w-[120px]  xl:w-auto' width="198" height="198" viewBox="0 0 198 198" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className='fill-black dark:fill-white' d="M96.1124 19.3866L52.4699 63.0291C50.8199 64.6791 50.8199 67.2366 52.4699 68.8866L63.1124 79.5291C64.7624 81.1791 67.3199 81.1791 68.9699 79.5291L96.1124 52.3866C97.7624 50.7366 100.32 50.7366 101.97 52.3866L129.112 79.5291C130.762 81.1791 133.32 81.1791 134.97 79.5291L145.612 68.8866C147.262 67.2366 147.262 64.6791 145.612 63.0291L101.97 19.3866C100.32 17.8191 97.6799 17.8191 96.1124 19.3866Z"  />
                                    <path className='fill-black dark:fill-white' d="M96.1124 178.614L52.4699 134.972C50.8199 133.322 50.8199 130.764 52.4699 129.114L63.1124 118.472C64.7624 116.822 67.3199 116.822 68.9699 118.472L96.1124 145.614C97.7624 147.264 100.32 147.264 101.97 145.614L129.112 118.472C130.762 116.822 133.32 116.822 134.97 118.472L145.612 129.114C147.262 130.764 147.262 133.322 145.612 134.972L101.97 178.614C100.32 180.182 97.6799 180.182 96.1124 178.614Z"  />
                                    <path className='fill-black dark:fill-white' d="M165.825 83.3241L178.53 96.0291C180.18 97.6791 180.18 100.237 178.53 101.887L165.825 114.592C164.175 116.242 161.618 116.242 159.968 114.592L147.263 101.887C145.613 100.237 145.613 97.6791 147.263 96.0291L159.968 83.3241C161.618 81.7566 164.258 81.7566 165.825 83.3241Z"  />
                                    <path className='fill-black dark:fill-white' d="M37.9504 83.3241L50.6553 96.0291C52.3053 97.6791 52.3053 100.237 50.6553 101.887L37.9504 114.592C36.3004 116.242 33.7428 116.242 32.0928 114.592L19.3879 101.887C17.7379 100.237 17.7379 97.6791 19.3879 96.0291L32.0928 83.3241C33.7428 81.7566 36.3829 81.7566 37.9504 83.3241Z"  />
                                    <path className='fill-black dark:fill-white' d="M101.887 81.5109L116.489 96.1134C118.139 97.7634 118.139 100.321 116.489 101.971L101.887 116.573C100.237 118.223 97.6795 118.223 96.0295 116.573L81.427 101.971C79.777 100.321 79.777 97.7634 81.427 96.1134L96.0295 81.5109C97.6795 79.8609 100.32 79.8609 101.887 81.5109Z"  />
                                </svg>
                            </div>
                            <TextScramble  className="text-xl xl:text-3xl 2xl:text-5xl 3xl:text-6xl text-start  text-black dark:text-white w-full uppercase"
                                text= {findByUniqueId(mainData, 1676)}
                                 lang={params.lang}
                            />

                        </div>

                        <p className="text-lg md:text-xl 3xl:text-2xl text-black dark:text-white lg:w-[30%] pt-4">
                           {findByUniqueId(mainData, 1677)}
                        </p>
                    </div>
                </div>
            </div>

            <div className='flex w-full'>
                <div className=' '>
                    <div className=' h-[250px] lg:h-[342px] w-[15vw] rounded-es-[40px] rounded-ee-[10px]  bg-white dark:bg-[#1A1A18] mt-[-20px] relative'>
                        <div className='absolute top-[-16px] end-[-42px]'>
                            <div className='bg-white dark:bg-[#1A1A18] h-[80px] w-[80px] rounded-full relative ' />
                            <div className='bg-[#f5f5f5] dark:bg-black ltr:-rotate-45 rotate-45 w-[70px] h-[65px] rounded-full absolute ltr:left-[37px] top-[38px] right-[37px] z-10' />
                        </div>

                    </div>
                </div>
                <div
                    ref={containerRef}
                    className=" flex gap-5 py-5 ps-5 overflow-x-auto scrollbar01 z-20 w-[85vw] pe-20"
                >
                    {cardsData.map((card, idx) => (
                        <div>
                            <div
                                key={card.id}
                                className={` rounded-[40px] bg-white dark:bg-[#1A1A18] flex w-[200px] h-[210px]  lg:w-[400px] lg:h-[300px] `}
                                style={{
                                    top: `calc(${idx * 9}vh + 10vh)`,
                                    zIndex: 40 + idx,
                                }}
                            >
                                <div className='flex w-full justify-center items-center'>
                                    <div className="flex items-center justify-center w-[64px] h-[64] md:w-36 md:h-36 ">
                                        {card.icon}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}