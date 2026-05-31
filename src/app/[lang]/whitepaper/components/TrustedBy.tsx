// components/TrustedBy.tsx
'use client';

import Image from 'next/image';
import TextScramble from '@/components/utils/textScramble';
const companies = [
    { id: 1, name: 'Company 1', logo: '/logos/logo1.svg' },
    { id: 2, name: 'Company 2', logo: '/logos/logo2.svg' },
    { id: 3, name: 'Company 3', logo: '/logos/logo3.svg' },
    { id: 4, name: 'Company 4', logo: '/logos/logo4.svg' },
    { id: 5, name: 'Company 5', logo: '/logos/logo5.svg' },
    { id: 6, name: 'Company 6', logo: '/logos/logo6.svg' },
    { id: 7, name: 'Company 7', logo: '/logos/logo7.svg' },
    { id: 8, name: 'Company 8', logo: '/logos/logo8.svg' },
];
const academyCards = [
    {
        id: 1,
        img: '/whitepaper/testimg.jpg',
        title: 'Academy',
        description: 'Avalanche Academy is a suite of courses for developers of all experience levels to hone their skills, while the Codebase Entrepreneur Academy offers the foundational knowledge needed to launch and grow your Web3 startup on Avalanche....',
        buttonText: 'Learn more',
    },
    {
        id: 2,
        img: '/whitepaper/testimg.jpg',
        title: 'Academy',
        description: 'Avalanche Academy is a suite of courses for developers of all experience levels to hone their skills, while the Codebase Entrepreneur Academy offers the foundational knowledge needed to launch and grow your Web3 startup on Avalanche....',
        buttonText: 'Learn more',
    },
    {
        id: 3,
        img: '/whitepaper/testimg.jpg',
        title: 'Academy',
        description: 'Avalanche Academy is a suite of courses for developers of all experience levels to hone their skills, while the Codebase Entrepreneur Academy offers the foundational knowledge needed to launch and grow your Web3 startup on Avalanche....',
        buttonText: 'Learn more',
    },
        {
        id: 4,
        img: '/whitepaper/testimg.jpg',
        title: 'Academy',
        description: 'Avalanche Academy is a suite of courses for developers of all experience levels to hone their skills, while the Codebase Entrepreneur Academy offers the foundational knowledge needed to launch and grow your Web3 startup on Avalanche....',
        buttonText: 'Learn more',
    },
        {
        id:5,
        img: '/whitepaper/testimg.jpg',
        title: 'Academy',
        description: 'Avalanche Academy is a suite of courses for developers of all experience levels to hone their skills, while the Codebase Entrepreneur Academy offers the foundational knowledge needed to launch and grow your Web3 startup on Avalanche....',
        buttonText: 'Learn more',
    },
        {
        id: 6,
        img: '/whitepaper/testimg.jpg',
        title: 'Academy',
        description: 'Avalanche Academy is a suite of courses for developers of all experience levels to hone their skills, while the Codebase Entrepreneur Academy offers the foundational knowledge needed to launch and grow your Web3 startup on Avalanche....',
        buttonText: 'Learn more',
    },
];
export default function TrustedBy() {
    return (
        <section className="py-12 px-4 2xl:px-10  bg-white dark:bg-[#1A1A18] rounded-[40px] rtl:rounded-tr-[200px] ltr:rounded-tl-[200px]">
            <div className="">
                {/* متن اصلی */}
                <div className='flex gap-10 mt-5 items-center border-b border-solid border-x-0 border-t-0 dark:border-[#434343] border-[#D9D9D9] pb-10'>
                    <svg width="198" height="198" viewBox="0 0 198 198" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className='fill-black dark:fill-white' d="M45.0441 16.5H33.4113C25.7388 16.5 21.8614 25.8225 27.3064 31.2675L74.5787 78.54C88.1087 92.07 109.971 92.07 123.501 78.54L170.774 31.2675C176.219 25.8225 172.342 16.5 164.669 16.5H153.036C146.189 16.5 139.589 19.2225 134.722 24.09L105.186 53.625C101.804 57.0075 96.3591 57.0075 92.9766 53.625L63.4414 24.09C58.4914 19.2225 51.8916 16.5 45.0441 16.5Z" fill="white" />
                        <path className='fill-black dark:fill-white' d="M45.0441 181.25H33.4113C25.7388 181.25 21.8614 171.928 27.3064 166.483L74.5787 119.21C88.1087 105.68 109.971 105.68 123.501 119.21L170.774 166.483C176.219 171.928 172.342 181.25 164.669 181.25H153.036C146.189 181.25 139.589 178.527 134.722 173.66L105.186 144.125C101.804 140.742 96.3591 140.742 92.9766 144.125L63.4414 173.66C58.4914 178.527 51.8916 181.25 45.0441 181.25Z" fill="white" />
                    </svg>
                    <div className="text-start max-w-3xl">
                        <TextScramble className=" dark:text-white text-xl xl:text-3xl 2xl:text-5xl 3xl:text-6xl leading-relaxed"
                           text='Avalanche Is Trusted By Businesses Worldwide'
                        />

                    </div>
                </div>

                {/* عنوان پایین */}
                <div className=" flex flex-col lg:flex-row mt-12 gap-10">

                    <p className="dark:text-white text-start text-sm 2xl:text-2xl tracking-[0.2em] uppercase mb-10 max-w-[500px]">
                        Avalanche is the platform for developers looking to build, launch and scale without sacrificing speed, flexibility, or control. Start today and explore Avalanche’s full-stack of developer tools and resources.
                    </p>
                    <div className="">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                            {academyCards.map((card, idx) => (
                                <div
                                    key={card.id}
                                    className=" space-y-4 border border-solid text-start  border-[#D9D9D9] dark:border-[#434343] rounded-[40px] p-3   "
                                >
                                    <div className='w-full h-[135px] rounded-[40px] overflow-hidden'>
                                        <Image src={card.img} alt={card.title + " pic "} fill className='w-full h-full !static' />
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
                                        <div className="group cursor-pointer inline-flex items-center gap-6 bg-transparent hover:bg-[#9100D9] rounded-3xl rtl:rounded-bl-[100px] ltr:rounded-br-[100px]  text-gray-900 dark:text-white font-medium text-sm transition-all duration-300 px-5 py-3">
                                            <span>{card.buttonText}</span>
                                            <svg className="w-5 h-5 text-[#9100D9] group-hover:text-white rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-1" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path className='stroke-[#9100D9] group-hover:stroke-white' d="M14.4297 5.92969L20.4997 11.9997L14.4297 18.0697"  stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                <path className='stroke-[#9100D9] group-hover:stroke-white' d="M3.5 12H20.33" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
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