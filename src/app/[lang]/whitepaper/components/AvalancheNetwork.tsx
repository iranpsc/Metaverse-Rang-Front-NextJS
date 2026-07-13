// components/AvalancheNetwork.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import Reveal from '@/components/ui/animations/Reveal';

interface AvalancheNetworkProps {
    params: { lang: string };
    mainData: { mainData: string };
}

type BlockItem = {
    id: number;
    blockNumber: string;
    timeAgo: string;
    hash: string;
    txCount: number;
    amount: string;
};

type TxItem = {
    id: number;
    hash: string;
    timeAgo: string;
    txCount: number;
    amount: string;
};


const CYCLE_INTERVAL = 5000;   // هر چند میلی‌ثانیه یک چرخه‌ی کامل آپدیت شروع می‌شود
const STAGGER_DELAY = 200;     // فاصله‌ی زمانی بین آپدیت هر ردیف نسبت به ردیف بالاتر (افکت آبشاری)

// --- تولید داده‌ی فیک برای شبیه‌سازی بلاک/تراکنش جدید ---
const randomHex = (len: number) => {
    const chars = 'abcdef0123456789ABCDEF';
    let s = '';
    for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
    return s;
};
const shortHash = (full: string) => `0x${full.slice(0, 4)}...${full.slice(-6)}`;

let blockCounter = 59005799;
let idSeq = 0;

const createBlock = (): BlockItem => {
    blockCounter += 1;
    idSeq += 1;
    return {
        id: idSeq,
        blockNumber: String(blockCounter),
        timeAgo: '0',
        hash: shortHash(randomHex(64)),
        txCount: Math.floor(Math.random() * 20) + 1,
        amount: Math.random() > 0.5 ? '<0.01 AVAX' : `${(Math.random() * 0.1).toFixed(3)} AVAX`,
    };
};

const createTx = (): TxItem => {
    idSeq += 1;
    return {
        id: idSeq,
        hash: shortHash(randomHex(64)),
        timeAgo: '0',
        txCount: Math.floor(Math.random() * 15) + 1,
        amount: Math.random() > 0.5 ? '<0.01 AVAX' : `${(Math.random() * 0.1).toFixed(3)} AVAX`,
    };
};

export default function AvalancheNetwork({ params, mainData }: AvalancheNetworkProps) {
    const [count, setCount] = useState(12554178438);
    const [isActive, setIsActive] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    // --- محتوای ۴ جایگاه ثابت (بلاک‌ها) ---
    const [blocks, setBlocks] = useState<BlockItem[]>([
        { id: -1, blockNumber: '59005799', timeAgo: '1', hash: '0x54BA...F43D59', txCount: 7, amount: '<0.01 AVAX' },
        { id: -2, blockNumber: '59005798', timeAgo: '2', hash: '0x32CF...A872EB', txCount: 12, amount: '0.02 AVAX' },
        { id: -3, blockNumber: '59005797', timeAgo: '3', hash: '0x87DE...B4512F', txCount: 5, amount: '<0.01 AVAX' },
        { id: -4, blockNumber: '59005796', timeAgo: '4', hash: '0x41AC...E9637A', txCount: 9, amount: '0.01 AVAX' },
        { id: -20, blockNumber: '59005796', timeAgo: '4', hash: '0x41AC...E9637A', txCount: 9, amount: '0.01 AVAX' },
        { id: -21, blockNumber: '59005796', timeAgo: '4', hash: '0x41AC...E9637A', txCount: 9, amount: '0.01 AVAX' },
    ]);

    // --- محتوای ۴ جایگاه ثابت (تراکنش‌ها) ---
    const [transactions, setTransactions] = useState<TxItem[]>([
        { id: -5, hash: '0x54BA...F43D59', timeAgo: '1', txCount: 7, amount: '<0.01 AVAX' },
        { id: -6, hash: '0x32CF...A872EB', timeAgo: '2', txCount: 12, amount: '0.02 AVAX' },
        { id: -7, hash: '0x87DE...B4512F', timeAgo: '3', txCount: 5, amount: '<0.01 AVAX' },
        { id: -8, hash: '0x41AC...E9637A', timeAgo: '4', txCount: 9, amount: '0.01 AVAX' },
        { id: -9, hash: '0x41AC...E9637A', timeAgo: '4', txCount: 9, amount: '0.01 AVAX' },
        { id: -10, hash: '0x41AC...E9637A', timeAgo: '4', txCount: 9, amount: '0.01 AVAX' },
    ]);

    // هر CYCLE_INTERVAL میلی‌ثانیه، محتوای ردیف‌ها از بالا به پایین، یکی‌یکی با تاخیر عوض می‌شود.
    // جایگاه ردیف‌ها ثابت است — فقط محتوای داخلشان به‌آرامی جایگزین می‌شود.
useEffect(() => {
    const cycle = setInterval(() => {
        const rowsCount = Math.max(blocks.length, transactions.length);
        for (let idx = 0; idx < rowsCount; idx++) {
            setTimeout(() => {
                setBlocks(prev => {
                    if (idx >= prev.length) return prev;
                    const copy = [...prev];
                    copy[idx] = createBlock();
                    return copy;
                });
                setTransactions(prev => {
                    if (idx >= prev.length) return prev;
                    const copy = [...prev];
                    copy[idx] = createTx();
                    return copy;
                });
            }, idx * STAGGER_DELAY);
        }
    }, CYCLE_INTERVAL);

    return () => clearInterval(cycle);
}, [blocks.length, transactions.length]);

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
                if (isVisible) startAnimation();
            }
        }, 500);
        return () => clearInterval(scrollInterval);
    }, [hasAnimated]);

    const formatNumber = (num: number) => num.toLocaleString();

    return (
        <section ref={sectionRef} className="w-full bg-white dark:bg-[#1A1A18] rounded-xl lg:rounded-[32px]" id="network-section">
            <div className="p-5 lg:p-10 overflow-x-hidden">

                {/* عنوان اصلی */}
                <div className="mb-16 lg:mt-7 w-full lg:space-y-3 ">
                    <div className="dark:text-white text-4xl md:text-5xl xl:text-7xl 3xl:text-[160px] font-bold tracking-wider">
                        <Reveal
                            direction={params.lang == "fa" ? "left" : "right"}
                            distance={200}
                            duration={2300}
                            delay={300}>
                            {findByUniqueId(mainData, 148)}
                        </Reveal>
                    </div>
                    <div className="text-end dark:text-white text-4xl md:text-5xl xl:text-7xl 3xl:text-[160px] font-bold tracking-wider ">
                        <Reveal
                            direction={params.lang == "fa" ? "right" : "left"}
                            distance={200}
                            duration={3000}
                            delay={300}>
                            {findByUniqueId(mainData, 1692)}
                        </Reveal>
                    </div>
                    <div className="text-4xl md:text-5xl xl:text-7xl 3xl:text-[160px] font-bold text-black dark:text-white ">
                        <Reveal
                            direction={params.lang == "fa" ? "left" : "right"}
                            distance={200}
                            duration={2300}
                            delay={200}>
                            {findByUniqueId(mainData, 1693)}
                        </Reveal>
                    </div>
                </div>

                <div className="w-full h-0.5 bg-[#D9D9D9] dark:bg-[#434343] mx-auto my-10 lg:my-20"></div>

                {/* کارت توضیحات */}
                <div className="">
                    <div className="rounded-2xl py-0 lg:mb-20 mb-10 lg:p-8">
                        <p className="text-start dark:text-white text-xl xl:text-3xl 3xl:text-4xl font-bold lg:max-w-[55%] 2xl:!leading-[53px] leading-relaxed">
                            {findByUniqueId(mainData, 1694)}
                        </p>
                    </div>
                </div>

                {/* آمار اصلی */}
                <div className="text-center mb-10 lg:mb-20 border border-solid border-[#D9D9D9] dark:border-[#434343] rounded-xl lg:rounded-[32px] lg:px-10 py-5">
                    <div className="relative flex justify-between items-center w-full gap-5">
                        <div className={`absolute -inset-4 bg-[#9100d93d] blur-3xl rounded-full transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>

                        <div className="flex flex-row gap-1 lg:gap-10 w-full">
                            <p className={`text-3xl mx-auto lg:mb-5 lg:mt-2 lg:mx-0 text-start lg:text-6xl 3xl:text-8xl font-bold font-mono tracking-tight transition-all duration-200 ${isActive ? 'text-[#9100D9] scale-105' : 'text-black dark:text-white'}`}>
                                {formatNumber(count)}
                            </p>

                            <div className="flex items-center justify-center gap-4">
                                <div className="flex items-center gap-2 !text-sm">
                                    <span className={`${isActive ? 'bg-red-500 animate-pulse' : 'bg-[#9100D9]'} bg-[#9100D9] px-3 py-1 text-white rounded-full text-xs font-mono`}>
                                        {findByUniqueId(mainData, 1695)}
                                    </span>
                                </div>
                                <div className="w-px h-4 bg-gray-300 dark:bg-gray-700"></div>
                            </div>
                        </div>
                        <span className="text-black dark:text-white text-2xl xl:text-3xl 3xl:text-5xl hidden text-nowrap lg:block mb-auto mt-2">{findByUniqueId(mainData, 61)}</span>
                    </div>
                </div>

                {/* گرید دیتاها */}
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-7">

                    {/* LATEST BLOCKS */}
{/* LATEST BLOCKS */}
<div className="lg:space-y-3">
    <div className="flex items-center border-b border-neutral-300 dark:border-neutral-700 pb-4">
        <h3 className="text-2xl font-bold text-black dark:text-white">
            {findByUniqueId(mainData, 1696)}
        </h3>
    </div>

    <div className="w-full">
        {blocks.map((block, idx) => (
            <div
                key={idx}
                className={`${
                    idx !== blocks.length - 1
                        ? ""
                        : ""
                } bg-white dark:bg-[#1A1A18] rounded-xl border border-solid border-neutral-300 dark:border-neutral-700`}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={block.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: .6 }}
                        className="grid grid-cols-[50px_1fr_auto] lg:grid-cols-[64px_1fr_1fr_auto] gap-3 items-center p-2"
                    >
                        <Image
                            src="/whitepaper/coin.png"
                            alt=""
                            width={64}
                            height={64}
                            className="w-10 h-10 lg:w-[60px] lg:h-[60px] rounded-full object-cover"
                        />

                        {/* Mobile */}
                        <div className="flex flex-col gap-1 lg:hidden min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-neutral-500">
                                    Block
                                </span>

                                <span className="underline font-bold text-sm dark:text-white truncate">
                                    {block.blockNumber}
                                </span>
                            </div>

                            <span className="text-xs text-neutral-500">
                                {block.timeAgo} {findByUniqueId(mainData,1698)}
                            </span>

                            <div className="flex items-center gap-2">
                                <span className="text-xs text-neutral-500">
                                    Hash
                                </span>

                                <span className="underline text-xs dark:text-white truncate">
                                    {block.hash}
                                </span>

                                <span className="text-xs text-neutral-500 whitespace-nowrap">
                                    {block.txCount} TX
                                </span>
                            </div>
                        </div>

                        {/* Desktop Left */}
                        <div className="hidden lg:flex flex-col gap-1">
                            <span className="text-sm text-neutral-500">
                                Block
                            </span>

                            <span className="underline font-bold text-base dark:text-white">
                                {block.blockNumber}
                            </span>

                            <span className="text-sm text-neutral-500">
                                {block.timeAgo} {findByUniqueId(mainData,1698)}
                            </span>
                        </div>

                        {/* Desktop Center */}
                        <div className="hidden lg:grid grid-cols-[auto_1fr] gap-x-2 gap-y-1">
                            <span className="text-sm text-neutral-500">
                                Hash
                            </span>

                            <span className="underline dark:text-white font-medium truncate">
                                {block.hash}
                            </span>

                            <span className="text-sm text-neutral-500">
                                TX
                            </span>

                            <span className="text-sm text-neutral-500">
                                {block.txCount} TX
                            </span>
                        </div>

                        {/* Badge */}
                        <div className="bg-black dark:bg-white text-white dark:text-black rounded-lg px-3 py-2 text-xs lg:text-sm font-medium whitespace-nowrap text-center min-w-[92px]">
                            {block.amount}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        ))}
    </div>
</div>

                    {/* LATEST TRANSACTIONS */}
{/* LATEST TRANSACTIONS */}
<div className="lg:space-y-3 w-full">
    <div className="flex items-center border-b border-neutral-300 dark:border-neutral-700 pb-4">
        <h3 className="text-2xl font-bold text-black dark:text-white">
            {findByUniqueId(mainData, 1697)}
        </h3>
    </div>

    <div className=" w-full ">
        {transactions.map((tx, idx) => (
            <div
                key={idx}
                className={`${
                    idx !== transactions.length - 1
                        ? "border-b border-neutral-300 dark:border-neutral-700"
                        : ""
                } bg-white dark:bg-[#1A1A18] rounded-xl border border-solid border-neutral-300 dark:border-neutral-700`}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={tx.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: .6 }}
                        className="grid grid-cols-[50px_1fr] lg:grid-cols-[64px_1fr_1fr] gap-3 items-center p-2 "
                    >
                        <Image
                            src="/whitepaper/coin.png"
                            alt=""
                            width={64}
                            height={64}
                            className="w-10 h-10 lg:w-[60px] lg:h-[60px] rounded-full object-cover"
                        />

                        {/* Mobile */}
                        <div className="flex flex-col gap-1 lg:hidden min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-neutral-500">
                                    Hash
                                </span>

                                <span className="underline font-bold text-sm dark:text-white truncate">
                                    {tx.hash}
                                </span>
                            </div>

                            <span className="text-xs text-neutral-500">
                                {tx.timeAgo} {findByUniqueId(mainData,1698)}
                            </span>

                            <div className="flex items-center gap-2">
                                <span className="text-xs text-neutral-500">
                                    TX
                                </span>

                                <span className="text-xs dark:text-white">
                                    {tx.txCount} TX
                                </span>
                            </div>
                        </div>

                        {/* Desktop Left */}
                        <div className="hidden lg:flex flex-col gap-1">
                            <span className="text-sm text-neutral-500">
                                Hash
                            </span>

                            <span className="underline font-bold text-base dark:text-white">
                                {tx.hash}
                            </span>

                            <span className="text-sm text-neutral-500">
                                {tx.timeAgo} {findByUniqueId(mainData,1698)}
                            </span>
                        </div>

                        {/* Desktop Right */}
                        <div className="hidden lg:grid grid-cols-[auto_1fr] gap-x-2 gap-y-1">
                            <span className="text-sm text-neutral-500">
                                TX
                            </span>

                            <span className="dark:text-white">
                                {tx.txCount} TX
                            </span>

                            <span className="text-sm text-neutral-500">
                                Amount
                            </span>

            
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        ))}
    </div>
</div>
                </div>
            </div>
        </section>
    );
}