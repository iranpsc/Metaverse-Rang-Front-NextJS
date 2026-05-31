// components/AvalancheSolutions.tsx

import Image from 'next/image';
import TextScramble from '@/components/utils/textScramble';
interface SolutionCard {
    id: number;
    title: string;
    description: string;
    image: string;
    alt: string;
}

const cards: SolutionCard[] = [
    {
        id: 1,
        title: 'REAL-TIME MUSIC ROYALTIES ON AVALANCHE',
        description:
            'Artists and labels are leveraging Avalanche infrastructure to distribute music royalties globally in seconds instead of months.',
        image: '/whitepaper/bgFoundationGrants.jpg',
        alt: 'Music royalty infrastructure on Avalanche',
    },
    {
        id: 2,
        title: 'ENTERPRISE SUBNETS FOR GLOBAL BUSINESSES',
        description:
            'Fortune 500 companies are deploying scalable subnet architectures for secure, compliant and customizable blockchain ecosystems.',
        image: '/whitepaper/bgFoundationGrants.jpg',
        alt: 'Enterprise subnet architecture',
    },
    {
        id: 3,
        title: 'NEXT-GEN GAMING ECONOMIES',
        description:
            'Studios are building player-owned gaming economies with instant transactions and near-zero gas fees on Avalanche.',
        image: '/whitepaper/bgFoundationGrants.jpg',
        alt: 'Blockchain gaming economy',
    },
    {
        id: 4,
        title: 'TOKENIZED REAL-WORLD ASSETS',
        description:
            'Institutions are tokenizing real estate, private equity and commodities using Avalanche for transparent ownership systems.',
        image: '/whitepaper/bgFoundationGrants.jpg',
        alt: 'Tokenized real-world assets platform',
    },
    {
        id: 5,
        title: 'SCALABLE WEB3 PAYMENT NETWORKS',
        description:
            'Payment providers are integrating Avalanche to power instant settlements and borderless financial infrastructure.',
        image: '/whitepaper/bgFoundationGrants.jpg',
        alt: 'Web3 payments powered by Avalanche',
    },
    {
        id: 6,
        title: 'AI + BLOCKCHAIN DATA LAYERS',
        description:
            'AI platforms are using Avalanche to create secure, verifiable and decentralized data coordination layers.',
        image: '/whitepaper/bgFoundationGrants.jpg',
        alt: 'AI and blockchain integration',
    },
];

function Card({
    card,
    priority = false,
}: {
    card: SolutionCard;
    priority?: boolean;
}) {
    return (
        <article
            className="
                group
                flex
                items-center
                gap-4
                rounded-[28px]
                border
                border-[#D9D9D9]
                dark:border-[#434343]
                border-solid          
                p-4
                transition-colors
                duration-300
                
            "
        >
            {/* IMAGE */}
            <div className="relative h-[120px] w-[120px] shrink-0 overflow-hidden rounded-[22px]">
                <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    priority={priority}
                    loading={priority ? 'eager' : 'lazy'}
                    quality={70}
                    sizes="120px"
                    className="object-cover"
                />
            </div>

            {/* CONTENT */}
            <div className="min-w-0 flex-1">
                <p
                    className="
                        line-clamp-2
                        text-[18px]
                        font-extrabold
                        uppercase
                        leading-[1.05]
                        dark:text-white
                        md:text-[20px]
                    "
                >
                    {card.title}
                </p>

                <p
                    className="
                        line-clamp-4
                        mt-3
                        text-[12px]
                        uppercase
                        leading-[1.5]
                        text-[#8B8B8B]
                        md:text-[13px]
                    "
                >
                    {card.description}
                </p>
            </div>

            {/* ACTION */}
            <button
                aria-label={`Read more about ${card.title}`}
                className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-solid
                    bg-transparent
                    border-[#D9D9D9]
                    dark:border-[#434343]
                    transition-all
                    duration-300
                    text-[#808080]
                    dark:text-[#969696]
                    rtl:rotate-180
                    
                "
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                >
                    <path
                        d="M5 12H19"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                    />
                    <path
                        d="M13 6L19 12L13 18"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </article>
    );
}

export default function AvalancheSolutions() {
    return (
        <section
            className="
                relative
                w-full
                overflow-hidden
                rounded-[40px]
                bg-white
                dark:bg-[#1A1A18]
                p-5
                xl:p-10
                rounded-es-[180px]
            "
        >
            {/* BACKGROUND GLOW */}
            <div
                aria-hidden="true"
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    background: `
                        radial-gradient(
                            circle at top left,
                            rgba(37,99,235,.18),
                            transparent 30%
                        ),
                        radial-gradient(
                            circle at bottom right,
                            rgba(6,182,212,.18),
                            transparent 30%
                        )
                    `,
                }}
            />

            <div className="relative z-10 ">

                {/* HEADER */}
                <header className="border-b border-solid border-x-0 border-t-0 dark:border-[#434343] border-[#D9D9D9] ">
                <div className='flex gap-10 mt-5 items-center  pb-10'>
                    <svg width="198" height="198" viewBox="0 0 198 198" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className='fill-black dark:fill-white' d="M45.0441 16.5H33.4113C25.7388 16.5 21.8614 25.8225 27.3064 31.2675L74.5787 78.54C88.1087 92.07 109.971 92.07 123.501 78.54L170.774 31.2675C176.219 25.8225 172.342 16.5 164.669 16.5H153.036C146.189 16.5 139.589 19.2225 134.722 24.09L105.186 53.625C101.804 57.0075 96.3591 57.0075 92.9766 53.625L63.4414 24.09C58.4914 19.2225 51.8916 16.5 45.0441 16.5Z"  />
                        <path className='fill-black dark:fill-white' d="M45.0441 181.25H33.4113C25.7388 181.25 21.8614 171.928 27.3064 166.483L74.5787 119.21C88.1087 105.68 109.971 105.68 123.501 119.21L170.774 166.483C176.219 171.928 172.342 181.25 164.669 181.25H153.036C146.189 181.25 139.589 178.527 134.722 173.66L105.186 144.125C101.804 140.742 96.3591 140.742 92.9766 144.125L63.4414 173.66C58.4914 178.527 51.8916 181.25 45.0441 181.25Z"  />
                    </svg>
                    <div className="text-start max-w-3xl">
                        <TextScramble className=" dark:text-white text-xl xl:text-3xl 2xl:text-5xl 3xl:text-6xl leading-relaxed"
                            text='Avalanche Is Trusted By Businesses Worldwide' />

                    </div>
                </div>
                </header>

                {/* CONTENT */}
                <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[320px_1fr]">

                    {/* LEFT SIDE */}
                    <aside className="w-full ">
                        <p
                            className="
                                text-[18px]
                                lg:text-2xl
                                font-light
                                leading-[1.3]
                                tracking-[0.08em]
                                dark:text-[#E8E8E8]
                            "
                        >
                            Avalanche empowers founders,
                            businesses and institutions across
                            industries to build scalable blockchain
                            applications with high performance,
                            customization and institutional-grade
                            infrastructure.
                        </p>
                    </aside>

                    {/* RIGHT SIDE */}
                    <div className="grid grid-cols-1 xl:grid-cols-2">
                        {cards.map((card, index) => (
                            <Card
                                key={card.id}
                                card={card}
                                priority={index === 0}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}