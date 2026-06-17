// components/AvalancheNetwork.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import Reveal from '@/components/utils/Reveal';
interface AvalancheNetworkProps {
    params: { lang: string };
    mainData: { mainData: string };
}
export default function AvalancheNetwork({ params, mainData }: AvalancheNetworkProps) {
    const [count, setCount] = useState(12554178438);
    const [isActive, setIsActive] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const sectionRef = useRef<HTMLElement>(null); // ✅ Fixed type

    const blocks = [
        { blockNumber: '59005799', timeAgo: '1 ', hash: '0x54BA...F43D59', txCount: 7, amount: '<0.01 AVAX' },
        { blockNumber: '59005798', timeAgo: '2 ', hash: '0x32CF...A872EB', txCount: 12, amount: '0.02 AVAX' },
        { blockNumber: '59005797', timeAgo: '3 ', hash: '0x87DE...B4512F', txCount: 5, amount: '<0.01 AVAX' },
        { blockNumber: '59005796', timeAgo: '4 ', hash: '0x41AC...E9637A', txCount: 9, amount: '0.01 AVAX' },
    ];

    const transactions = [
        { hash: '0x54BA...F43D59', timeAgo: '1 ', txCount: 7, amount: '<0.01 AVAX' },
        { hash: '0x32CF...A872EB', timeAgo: '2 ', txCount: 12, amount: '0.02 AVAX' },
        { hash: '0x87DE...B4512F', timeAgo: '3 ', txCount: 5, amount: '<0.01 AVAX' },
        { hash: '0x41AC...E9637A', timeAgo: '4 ', txCount: 9, amount: '0.01 AVAX' },
    ];

    const randomNumber = () => {
        const base = 12554178438;
        const increment = Math.floor(Math.random() * 10000000);
        return base + increment;
    };

    const startAnimation = () => {
        if (hasAnimated) return;

        setHasAnimated(true);
        setIsActive(true);

        const interval = setInterval(() => {
            setCount(randomNumber());
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            setIsActive(false);
            setCount(12554178438);
        }, 5000);
    };

    useEffect(() => {
        const scrollInterval = setInterval(() => {
            if (sectionRef.current && !hasAnimated) {
                const rect = sectionRef.current.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight - 100;

                if (isVisible) {
                    startAnimation();
                }
            }
        }, 500);

        return () => clearInterval(scrollInterval);
    }, [hasAnimated]);

    const formatNumber = (num: number) => {
        return num.toLocaleString();
    };

    return (
        <section ref={sectionRef} className="w-full bg-white dark:bg-[#1A1A18] rounded-[40px]" id="network-section">
            <div className="p-5 lg:p-10 overflow-x-hidden">

                {/* عنوان اصلی */}
                <div className="mb-16 mt-7 w-full space-y-3 ">
                    <div className="dark:text-white text-3xl md:text-5xl xl:text-7xl 3xl:text-[160px] font-bold tracking-wider">
                        <Reveal
                            direction={params.lang == "fa" ? "left" : "right"}
                            distance={200}
                            duration={2300}
                            delay={300}>
                            {findByUniqueId(mainData, 148)}
                        </Reveal>
                    </div>
                    <div className="text-end dark:text-white text-3xl md:text-5xl xl:text-7xl 3xl:text-[160px] font-bold tracking-wider ">
                        <Reveal
                            direction={params.lang == "fa" ? "right" : "left"}
                            distance={200}
                            duration={3000}
                            delay={300}>
                            {findByUniqueId(mainData, 1692)}
                        </Reveal>
                    </div>
                    <div className="text-3xl md:text-5xl xl:text-7xl 3xl:text-[160px] font-bold text-black dark:text-white ">

                        <Reveal
                            direction={params.lang == "fa" ? "left" : "right"}
                            distance={200}
                            duration={2300}
                            delay={200}>
                            {findByUniqueId(mainData, 1693)}
                        </Reveal>
                    </div>
                </div>

                <div className="w-full h-0.5 bg-[#D9D9D9] dark:bg-[#434343] mx-auto my-20"></div>

                {/* کارت توضیحات */}
                <div className="mb-16">
                    <div className="rounded-2xl p-8">
                        <p className="text-start dark:text-white text-xl xl:text-3xl 3xl:text-4xl font-bold lg:max-w-[55%] 2xl:!leading-[53px] leading-relaxed">
                            {findByUniqueId(mainData, 1694)}
                        </p>
                    </div>
                </div>

                {/* آمار اصلی */}
                <div className="text-center mb-20 border border-solid border-[#D9D9D9] dark:border-[#434343] rounded-[40px] px-5 py-12">
                    <div className="relative flex justify-between items-center w-full gap-5">
                        <div className={`absolute -inset-4 bg-[#9100d93d] blur-3xl rounded-full transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>

                        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 w-full">
                            <p className={`text-3xl mx-auto lg:mb-5 lg:mt-2 lg:mx-0 text-start lg:text-6xl 3xl:text-8xl font-bold font-mono tracking-tight transition-all duration-200 ${isActive ? 'text-[#9100D9] scale-105' : 'text-black dark:text-white'}`}>
                                {formatNumber(count)}
                            </p>

                            <div className="flex items-center justify-center gap-4">
                                <div className="flex items-center gap-2">
                                    <span className={`${isActive ? 'bg-red-500 animate-pulse' : 'bg-[#9100D9]'} bg-[#9100D9] px-3 py-1 text-white rounded-full text-sm font-mono`}>
                                        {findByUniqueId(mainData, 1695)}
                                    </span>
                                </div>
                                <div className="w-px h-4 bg-gray-300 dark:bg-gray-700"></div>
                            </div>
                        </div>
                        <span className="text-black dark:text-white text-2xl xl:text-3xl 3xl:text-5xl hidden text-nowrap lg:block">{findByUniqueId(mainData, 61)}</span>
                    </div>
                </div>

                {/* گرید دیتاها */}
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-7">

                    {/* LATEST BLOCKS */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 border-b border-gray-300 dark:border-gray-800 pb-4">
                            <p className="text-xl xl:text-4xl font-bold text-black dark:text-white tracking-wider">{findByUniqueId(mainData, 1696)}</p>
                        </div>

                        <div>
                            {blocks.map((block, i) => (
                                <div key={i} className="group border-solid border border-neutral-300 dark:border-neutral-700 rounded-[40px] px-3 lg:px-5 py-3 lg:py-4 cursor-pointer">
                                    <div className="flex flex-row items-center justify-between gap-1 lg:gap-4">
                                        <div className="flex items-center gap-3">
                                            <Image src={"/whitepaper/coin.png"} alt='coin pic' width={71} height={71} className='rounded-full aspect-square w-[45px] h-[45px] lg:w-[71px] lg:h-[71px]' />
                                            <div className="hidden lg:flex flex-col items-start gap-1">
                                                <span className="dark:text-white text-black underline font-mono text-xs lg:text-lg font-bold">
                                                    {block.blockNumber}
                                                </span>
                                                <span className="text-xs text-neutral-500">
                                                    {block.timeAgo} {findByUniqueId(mainData, 1698)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="hidden lg:flex flex-col gap-1">
                                            <p className="dark:text-white text-black flex items-center flex-row-reverse gap-2 text-sm font-mono">
                                                <span className="text-neutral-500 hidden lg:block">{findByUniqueId(mainData, 1699)}</span>
                                                <span className="underline text-wrap text-xs lg:text-base">{block.hash}</span>
                                            </p>
                                            <p className=" text-neutral-500 text-sm text-right">{block.txCount} TX</p>
                                        </div>
                                        <div  className='flex flex-col lg:hidden items-center'>
                                                                                 <div className="flex  items-start gap-1">
                                                <span className="dark:text-white text-black underline font-mono break-all text-xs lg:text-lg font-bold">
                                                    {block.blockNumber}
                                                </span>
                                                <span className="text-xs text-neutral-500">
                                                    {block.timeAgo} {findByUniqueId(mainData, 1698)}
                                                </span>
                                            </div>
                                        <div className="flex  gap-1">
                                            <p className="dark:text-white text-black flex items-center flex-row-reverse gap-2 text-sm font-mono">
                                                <span className="text-neutral-500 hidden lg:block">{findByUniqueId(mainData, 1699)}</span>
                                                <span className="underline text-wrap text-xs lg:text-base break-all">{block.hash}</span>
                                            </p>
                                            <p className=" text-neutral-500 text-sm text-right">{block.txCount} TX</p>
                                        </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="text-right bg-[#ECECEC] dark:bg-[#ECECEC] py-2 lg:py-3 px-2 lg:px-3 rounded-xl">
                                                <p className="text-black text-xs lg:text-sm font-mono text-center">{block.amount}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* LATEST TRANSACTIONS - دقیقاً مثل BLOCKS */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 border-b border-gray-300 dark:border-gray-800 pb-4">
                            <h3 className="text-xl xl:text-4xl font-bold text-black dark:text-white tracking-wider">{findByUniqueId(mainData, 1697)}</h3>
                        </div>

                        <div>
                            {transactions.map((tx, i) => (
                                <div key={i} className="group border-solid border border-neutral-300 dark:border-neutral-700 rounded-[40px] px-3 lg:px-5 py-3 lg:py-4 cursor-pointer">
                                    <div className="flex flex-row items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <Image src={"/whitepaper/coin.png"} alt='transaction pic' width={71} height={71} className='rounded-full aspect-square w-[45px] h-[45px] lg:w-[71px] lg:h-[71px]' />
                                            <div className="hidden lg:flex flex-col items-start gap-1">
                                                <span className="dark:text-white text-black underline font-mono text-xs lg:text-lg font-bold">
                                                    {tx.hash}
                                                </span>
                                                <span className="text-xs text-neutral-500">
                                                    {tx.timeAgo} {findByUniqueId(mainData, 1698)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="lg:flex flex-col gap-1 hidden">
                                            <p className="dark:text-white text-black flex items-center flex-row-reverse gap-2 text-sm font-mono">
                                                <span className="text-neutral-500 hidden lg:block">HASH</span>
                                                <span className="underline text-xs lg:text-base">{tx.hash}</span>
                                            </p>
                                            <p className="text-neutral-500 text-sm text-right">{tx.txCount} TX</p>
                                        </div>
                                        <div className='flex flex-col lg:hidden items-center'>
                                            <div className="flex lg:flex-col items-start gap-1">
                                                <span className="dark:text-white text-black text-wrap break-all lg:underline font-mono text-xs lg:text-lg font-bold">
                                                    {tx.hash}
                                                </span>
                                                <span className="text-xs text-neutral-500">
                                                    {tx.timeAgo} {findByUniqueId(mainData, 1698)}
                                                </span>
                                            </div>
                                            <div className="flex lg:flex-col gap-1">
                                                <p className="dark:text-white text-black flex items-center flex-row-reverse gap-2 text-sm font-mono">
                                                    <span className="text-neutral-500 hidden lg:block">HASH</span>
                                                    <span className="underline text-xs lg:text-base break-all">{tx.hash}</span>
                                                </p>
                                                <p className="text-neutral-500 text-sm text-right">{tx.txCount} TX</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="text-right bg-[#ECECEC] dark:bg-[#ECECEC] py-2 lg:py-3 px-2 lg:px-3 rounded-xl">
                                                <p className="text-black text-xs lg:text-sm font-mono">{tx.amount}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}