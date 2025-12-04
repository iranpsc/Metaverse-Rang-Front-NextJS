'use client';
import React, { useState, useRef, useEffect } from "react";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import EmailModal from "./EmailModal";

interface CurrencyType {
    key: string;
    label: string;
    icon: string;
}

interface PriceType {
    [key: string]: string | string[] | undefined;
}

interface ItemType {
    id: string;
    percent: number;
    prices: PriceType;
    currencies: CurrencyType[];
}

interface RondCardProps {
    item: ItemType;
    mainData: any;
    params: any;
}

const RondCard: React.FC<RondCardProps> = ({ item, mainData, params }) => {

    const defaultCurrency =
        item.currencies.find(c => c.key === "IRR") || item.currencies[0];

    const [selectedCurrency, setSelectedCurrency] = useState(defaultCurrency);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [query, setQuery] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [modalOpen, setModalOpen] = useState(false);

    const price = item.prices[selectedCurrency.key];

    /** بستن dropdown خارج کلیک */
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        window.addEventListener("click", handler);
        return () => window.removeEventListener("click", handler);
    }, []);

    /** فیلتر ارزها */
    const filteredCurrencies = item.currencies.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.key.toLowerCase().includes(query.toLowerCase())
    );

    /** لیست آیکون‌هایی که در نوار بالا نمایش داده می‌شوند */
    const baseTopKeys = ["IRR", "USD", "BTC", "ETC", "USDT", "B&B"];
    const topKeys = baseTopKeys.includes(selectedCurrency.key)
        ? baseTopKeys
        : [
            ...baseTopKeys.slice(0, baseTopKeys.length - 1),
            selectedCurrency.key
        ];
    /** آیا ارز انتخاب‌شده جزو آیکون‌های بالاست؟ */
    const selectedExistsInTop = topKeys.includes(selectedCurrency.key);

    return (
        <>
            {/* --- CARD --- */}
            <div className="bg-white md:h-[252px] shadow-lg dark:bg-[#1A1A18]  rounded-2xl p-5 dark:text-white text-gray-100 flex flex-col gap-5 md:gap-9">

                {/* header */}
                <div className="flex justify-between items-start">
                    <span className="text-[#1F1F1F] dark:text-[#F2F2F2] text-base 2xl:text-xl">
                        {item.percent}% {findByUniqueId(mainData, 1486)}
                    </span>
                    <span className="text-[#1F1F1F] dark:text-[#F2F2F2] font-medium text-base md:text-2xl 2xl:text-[32px]">
                        {item.id}
                    </span>
                </div>

                {/* price bar */}
                <div className={`flex flex-col gap-2 bg-[#F8F8F8] dark:bg-black pt-3 rounded-xl px-3 relative          
                ${dropdownOpen ? " rounded-b-0 pb-2 " : " "}
                `}>
                    <div className="flex items-center justify-center lg:justify-between">

                        <div className="flex items-center gap-2 justify-between w-full ">
                            <div ref={dropdownRef}>
                                <div
                                    className="flex flex-row-reverse items-center rounded-full dark:text-white border border-gray-700 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setDropdownOpen(!dropdownOpen);
                                    }}
                                >
                                    <svg className={`w-[32px] h-[32px] mt-[-9px] transition-transform ${dropdownOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                                        <path className="fill-[#808080] dark:fill-[#84858F]" fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                                    </svg>
                                </div>

                                {dropdownOpen && (
                                    <div className="absolute pb-5 bg-[#F8F8F8] text-black dark:bg-black mt-2 w-full top-[55px] rounded-b-xl z-30 right-0 border border-gray-700 shadow-lg text-gray-200">

                                        <div className="p-3">
                                            <input
                                                value={query}
                                                onChange={(e) => setQuery(e.target.value)}
                                                placeholder={findByUniqueId(mainData, 57) + " ..."}
                                                className="w-full bg-[#FCFCFC] dark:bg-[#1A1A18] dark:text-white border-0 placeholder-gray-500 rounded-xl px-3 py-3 text-[16px] ring-1 ring-[#DEDEE9] dark:ring-[#1A1A18] outline-none"
                                            />
                                        </div>

                                        {/* لیست ارزها */}
                                        <div className="h-[224px] overflow-auto divide-y light-scrollbar dark:dark-scrollbar space-y-3">
                                            {filteredCurrencies.map((c) => (
                                                <button
                                                    key={c.key}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedCurrency(c);
                                                        setDropdownOpen(false);
                                                    }}
                                                    className={`w-full text-right px-4 flex items-center justify-between bg-transparent
        ${selectedCurrency.key === c.key ? "text-light-primary dark:text-dark-yellow font-semibold" : " dark:text-white"}
    `}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span
                                                            className="text-lg flex items-center"
                                                            dangerouslySetInnerHTML={{ __html: c.icon }}
                                                        />
                                                        <span className="text-sm">{c.label}</span>
                                                    </div>
                                                </button>

                                            ))}

                                            {filteredCurrencies.length === 0 && (
                                                <div className="px-4 py-3 text-sm text-gray-500">موردی یافت نشد</div>
                                            )}
                                        </div>

                                    </div>
                                )}
                            </div>

                            {/* icons */}
                            <div className="flex flex-row-reverse items-center justify-start gap-2 w-[90%] overflow-x-hidden ">

                                {/* آیکون‌های اصلی */}
                                {topKeys.map((key) => {
                                    const currency = item.currencies.find(c => c.key === key);
                                    if (!currency) return null;

                                    const isActive = selectedCurrency.key === currency.key;

                                    return (
                                        <div
                                            key={currency.key}
                                            onClick={() => setSelectedCurrency(currency)}
                                            className={`w-[40px] h-[40px] px-1 pt-6 pb-6 flex items-center justify-center  border-solid border-t-0 border-x-0
                border-b-[2px] cursor-pointer
                ${isActive ? "border-light-primary dark:border-dark-yellow" : "border-transparent"}
            `}
                                        >
                                            <div
                                                dangerouslySetInnerHTML={{ __html: currency.icon }}
                                            />
                                        </div>
                                    );
                                })}


                                {/* اگر آیکون ارز انتخاب‌شده در لیست نبود → نمایش جداگانه */}
                                {!selectedExistsInTop && (
                                    <div
                                        onClick={() => setSelectedCurrency(selectedCurrency)}
                                        className="w-[40px] h-[40px] px-1 pt-5 pb-7 flex items-center justify-center 
            border-b-[2px] border-light-primary dark:border-dark-yellow"
                                    >
                                        <div dangerouslySetInnerHTML={{ __html: selectedCurrency.icon }} />
                                    </div>
                                )}


                            </div>

                        </div>

                    </div>
                </div>

                {/* bottom section */}
                <div className="flex justify-between ">
                    <div className="text-[#1F1F1F] dark:text-[#F2F2F2] items-center gap-1 text-base md:text-xl flex">
                        <div> {price}</div>
                    </div>

                    {/* BUY BUTTON */}
                    <div className="flex justify-center">
                        <button
                            aria-label="BUY BUTTON"
                            onClick={() => setModalOpen(true)}
                            className="bg-[#f5f9ff] dark:bg-black w-max font-semibold text-sm px-5 md:px-10 border dark:hover:border-dark-yellow hover:border-light-primary text-light-primary dark:border-transparent dark:text-dark-yellow py-3 rounded-xl transition"
                        >
                            {findByUniqueId(mainData, 1488)}
                        </button>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            <EmailModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                mainData={mainData}
                params={params}
                id={item.id}
            />

        </>
    );
};

export default RondCard;
