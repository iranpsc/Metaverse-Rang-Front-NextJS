// components/WindowsNews.tsx
import React from 'react';
import Image from 'next/image';

const WindowsNews = () => {
    return (
        <div className=" mx-auto w-full bg-gradient-to-r to-light-primary from-blue-400 dark:to-dark-yellow dark:from-yellow-600 rounded-xl  overflow-hidden  my-10 p-5">
            <div className="p-6 flex flex-col md:flex-row justify-between" dir="rtl">
                <div className='w-[300px] mx-auto lg:mx-0 relative'>
                    <div className='bg-[#5d9eff80] dark:bg-[#d8a90054] w-[240px] h-[240px] rounded-full relative z-0' />
                    <Image src={'/adNews.png'} fill alt={'ad pic'} className=' w-full max-w-[270px] !h-auto z-10 my-auto ms-[-15px]' />
                </div>
                <div className=" flex flex-col gap-4">
                    <p className="text-xl lg:text-3xl font-rokh font-bold text-white dark:text-black">
                        عرضه‌ی جدیدترین نسخه ویندوز به بازار
                    </p>
                    <p className='text-white dark:text-black max-w-3xl'>
                        ماکروسافت نسخه جایگزین ویندوز ۸.۱ را با نام ویندوز ۱۰ به صورت رسمی منتشر کرد.
                        ماکروسافت منوی استارترا که با معرفی ویندوز ۸ حذف شده بود،
                        به محیط دسکتاپ ویندوز ۱۰ بازگردانده است. سیستم جستجو در ویندوز ۱۰ بهبود یافته و
                        پشتیبانی از ماوس و صفحه‌کلید نیز بهتر شده است.
                    </p>
                </div>

                <div className=" flex items-center lg:items-end lg:pe-10">
                    <button className="bg-black w-max text-light-primary dark:text-dark-yellow font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md flex items-center gap-2">
                        آموزش نصب
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WindowsNews;