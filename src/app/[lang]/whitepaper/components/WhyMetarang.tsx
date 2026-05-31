// components/WhyMetarang.tsx
'use client';

import { useEffect, useRef } from 'react';
import { Framer, Hex, DropBox, Wings } from "@/components/svgs/SvgWhitepaper";
interface CardData {
    id: number;
    title: string;
    description: string;
    gradient: string;
    icon: React.ReactNode;
}
const svg1 = (
    <Wings className="w-full h-full fill-white" />
);

const svg2 = (
    <Hex className="w-full h-full fill-white"/>
);

const svg3 = (
    <DropBox className="w-full h-full fill-white"/>
);

const svg4 = (
    <Framer className="w-full h-full fill-white"/>
);

const cardsData: CardData[] = [
    {
        id: 1,
        title: 'Fast. Powerful. Secure.',
        description: 'The groundbreaking Metarang consensus powers a network of fast, efficient, highly-optimized chains that finalize transactions almost instantly. Accompanied by a best-in-class developer experience and suite of tools, Metarang is the platform of choice for builders and users ready for what’s next in Web3.',
        gradient: 'bg-[#3D8BFF] dark:bg-[#19005E]',
        icon: svg1,
    },
    {
        id: 2,
        title: 'Infinitely Scalable by Design',
        description: 'Metarang is where Web3s big ideas scale with confidence. Whether it’s a single application, or launching a fully-customizable Layer 1 blockchain, Metarang makes it easy to scale up — or across — in an interconnected ecosystem.',
        gradient: 'bg-[#FF24A8] dark:bg-[#FE0099] ',
        icon: svg2,
    },
    {
        id: 3,
        title: 'Customizable Layer 1s',
        description: 'Whatever your use-case, Metarang makes launching your own L1 more economically feasible, simpler to customize, smoother to maintain and quicker to bring to market. The network is anchored by a lightning-fast and efficient primary chain and a universe of sovereign blockchains, all natively connected through Metarang Interchain Messaging.',
        gradient: 'bg-[#8E02F7] dark:bg-[#9100D9]',
        icon: svg3,
    },
    {
        id: 4,
        title: 'Global Community',
        description: 'Metarang is more than just a blockchain network. Its a global community of builders, creators, and collaborators, all together on a mission to drive the adoption of blockchain technology. There are no gatekeepers, just an open ecosystem where knowledge and resources are shared, creating a global movement ready to turn ideas into real-world impact.',
        gradient: 'bg-[#01FFE5] dark:bg-[#00CEB9]',
        icon: svg4,
    },
];

export default function WhyMetarang() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const section = sectionRef.current;
        if (!container || !section) return;

        const cards = container.querySelectorAll('.sticky-card');
        const totalCards = cards.length;
        const startOffset = 0;
        const endOffset = 100;

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



                (card as HTMLElement).style.transform = `translateY(${translateY}px) )`;

            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[200vh] bg-white dark:bg-[#1A1A18] rounded-[40px] ltr:rounded-tr-[150px] rtl:rounded-tl-[150px]"
        >

            <div>
                <div className="font-bold text-start flex flex-col justify-start py-12 px-10 mb-20 space-y-4">
                    <p className="text-6xl md:text-7xl lg:text-8xl tracking-[0.2em] text-black dark:text-white uppercase">
                        Why
                    </p>
                    <h2 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-black dark:text-white">
                        Metarang
                        
                    </h2>
                    <div className="w-12 h-px bg-gray-700 mx-auto mt-6" />
                </div>
            </div>

            <div
                ref={containerRef}
                className="relative z-20 w-full"
            // style={{ marginTop: '-10vh' }}
            >
                {cardsData.map((card, idx) => (
                    <div
                        key={card.id}
                        className={`sticky-card sticky rounded-3xl overflow-hidden mt-[-70px]  transition-all duration-500 ease-out`}
                        style={{
                            top: `calc(${idx * 9}vh + 10vh)`,
                            zIndex: 40 + idx,
                        }}
                    >
                        <div
                            className={`   rounded-3xl `}
                        >
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between  w-full">
                                <div className="flex flex-col lg:flex-row h-[650px] w-full ">
                                    <div className={`${card.gradient} border-2 border-solid border-[#434343] flex flex-col gap-10 p-10 rounded-[40px] ltr:rounded-tr-[150px] rtl:rounded-tl-[150px] rtl:lg:rounded-tl-[40px] ltr:lg:rounded-tr-[40px] w-full lg:w-1/2 min-h-[320px]`}>
                                        <div className='flex gap-5 items-end'>
                                            <div className="text-3xl text-black dark:text-white font-mono">
                                                {(idx + 1).toString().padStart(2, '0')}

                                            </div>
                                            <h3 className="text-2xl md:text-3xl 3xl:text-6xl font-light tracking-tight text-black dark:text-white">
                                                {card.title}
                                            </h3>
                                        </div>
                                        <p className="text-black dark:text-white text-base lg:text-xl leading-relaxed max-w-lg">
                                            {card.description}
                                        </p></div>
                                    <div className={`${card.gradient} border border-solid border-[#434343]  flex flex-col w-full lg:w-1/2 h-full justify-center items-center rounded-[40px] rtl:lg:rounded-tl-[150px] ltr:lg:rounded-tr-[150px]`}>
                                        <div className='w-[200px] lg:w-[300px] 2xl:w-[350px]'>
                                            {card.icon}
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* فضای خالی انتهایی */}
            <div className="h-[3vh] hidden lg:block" />
        </section>
    );
}