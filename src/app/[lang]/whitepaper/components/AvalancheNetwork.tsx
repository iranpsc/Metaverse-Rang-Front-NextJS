// components/AvalancheNetwork.tsx
'use client';

import { useState, useEffect, useRef } from 'react';

export default function AvalancheNetwork() {
    const [count, setCount] = useState(12554178438);
    const [isActive, setIsActive] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const sectionRef = useRef(null);

    const blocks = [
        { blockNumber: '59005799', timeAgo: '1 SECOND AGO', hash: '0x54BA...F43D59', txCount: 7, amount: '<0.01 AVAX' },
        { blockNumber: '59005798', timeAgo: '2 SECONDS AGO', hash: '0x32CF...A872EB', txCount: 12, amount: '0.02 AVAX' },
        { blockNumber: '59005797', timeAgo: '3 SECONDS AGO', hash: '0x87DE...B4512F', txCount: 5, amount: '<0.01 AVAX' },
        { blockNumber: '59005796', timeAgo: '4 SECONDS AGO', hash: '0x41AC...E9637A', txCount: 9, amount: '0.01 AVAX' },
    ];

    const transactions = [
        { hash: '0x54BA...F43D59', timeAgo: '1 SECOND AGO', txCount: 7, amount: '<0.01 AVAX', from: '0x1234...5678', to: '0x8765...4321' },
        { hash: '0x32CF...A872EB', timeAgo: '2 SECONDS AGO', txCount: 12, amount: '0.02 AVAX', from: '0xabcd...efgh', to: '0xijkl...mnop' },
        { hash: '0x87DE...B4512F', timeAgo: '3 SECONDS AGO', txCount: 5, amount: '<0.01 AVAX', from: '0xqrst...uvwx', to: '0x1234...5678' },
        { hash: '0x41AC...E9637A', timeAgo: '4 SECONDS AGO', txCount: 9, amount: '0.01 AVAX', from: '0x9876...5432', to: '0xabcdef...123' },
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
        <>

            <section ref={sectionRef} className="w-full bg-white dark:bg-[#1A1A18] py-24" id="network-section">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">

                    {/* عنوان اصلی */}
                    <div className="text-center mb-16">
                        <div className="inline-block mb-4">
                            <span className="text-red-500 text-sm font-mono tracking-wider">AVALANCHE NETWORK</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                            In Action
                        </h2>
                        <div className="w-20 h-0.5 bg-red-500 mx-auto"></div>
                    </div>

                    {/* کارت توضیحات با طرح avax */}
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
                            <p className="text-gray-300 text-lg leading-relaxed">
                                Explore the latest transactions and block data from the Avalanche network in real-time.
                                Built for speed, security, and decentralization.
                            </p>
                        </div>
                    </div>

                    {/* آمار اصلی */}
                    <div className="text-center mb-20">
                        <div className="inline-block relative">
                            {/* افکت glow */}
                            <div className={`absolute -inset-4 bg-red-500/20 blur-3xl rounded-full transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>

                            <p className={`text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 font-mono tracking-tight transition-all duration-200 ${isActive ? 'text-red-500 scale-105' : 'text-white'}`}>
                                {formatNumber(count)}
                            </p>

                            <div className="flex items-center justify-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
                                    <span className="dark:text-white  text-sm font-mono">LIVE</span>
                                </div>
                                <div className="w-px h-4 bg-gray-700"></div>
                                <span className="dark:text-white  text-sm">Total Transactions</span>
                            </div>
                        </div>

                        {isActive && (
                            <div className="mt-6">
                                <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2">
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></div>
                                    <span className="text-red-400 text-xs font-mono">SYNCING NETWORK DATA...</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* گرید دیتاها */}
                    <div className="grid lg:grid-cols-2 gap-8">

                        {/* LATEST BLOCKS */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
                                <div className="w-1 h-6 bg-red-500 rounded-full"></div>
                                <h3 className="text-xl font-bold text-white tracking-wider">LATEST BLOCKS</h3>
                                <span className="text-xs text-gray-500 bg-gray-900 px-2 py-0.5 rounded">LIVE</span>
                            </div>

                            <div className="space-y-3">
                                {blocks.map((block, i) => (
                                    <div key={i} className="group border-solid border border-neutral-400 dark:border-neutral-700  rounded-3xl p-5  cursor-pointer">
                                        <div className="flex flex-row items-center justify-between gap-4">

                                            <div className="flex flex-col items-center gap-3 mb-2">
                                                <span className="dark:text-white underline font-mono text-lg font-bold">
                                                    {block.blockNumber}
                                                </span>
                                                <span className="text-xs text-neutral-400 dark:text-neutral-600 px-2 py-0.5 rounded-full">
                                                    {block.timeAgo}
                                                </span>
                                            </div>
                                            <div className='flex flex-col'>
                                                <p className="dark:text-white flex items-center flex-row-reverse gap-2 text-sm font-mono">
                                                   <span className='text-neutral-400 dark:text-neutral-600'>HASH</span> <span className='underline'>{block.hash}</span>
                                                </p>
                                                <p className='text-neutral-400 dark:text-neutral-600'>7TX</p>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <div className="text-right bg-black dark:bg-white py-3 px-3 rounded-xl">
                                                    {/* <p className="text-white font-semibold text-sm">{block.txCount}</p> */}
                                                    <p className="dark:text-black text-white text-sm font-mono">{block.amount}</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* LATEST TRANSACTIONS */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
                                <div className="w-1 h-6 bg-red-500 rounded-full"></div>
                                <h3 className="text-xl font-bold text-white tracking-wider">LATEST TRANSACTIONS</h3>
                                <span className="text-xs text-gray-500 bg-gray-900 px-2 py-0.5 rounded">LIVE</span>
                            </div>

                            <div className="space-y-3">
                                {transactions.map((tx, i) => (
                                    <div key={i} className="group  hover:bg-gray-900 border  rounded-xl p-5 transition-all duration-300 cursor-pointer">
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <p className="text-red-500 font-mono text-sm">
                                                    {tx.hash}
                                                </p>
                                                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                                                    <svg className="w-4 h-4 text-gray-400 group-hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-4">
                                                    <span className="dark:text-white text-xs">{tx.timeAgo}</span>
                                                    <span className="dark:text-white ">{tx.txCount} transactions</span>
                                                </div>
                                                <p className="text-green-400 font-mono font-semibold">{tx.amount}</p>
                                            </div>
                                            <div className="flex items-center gap-4 text-xs dark:text-white  font-mono pt-2 border-t ">
                                                <span>From: {tx.from}</span>
                                                <span>→</span>
                                                <span>To: {tx.to}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </section>

        </>
    );
}