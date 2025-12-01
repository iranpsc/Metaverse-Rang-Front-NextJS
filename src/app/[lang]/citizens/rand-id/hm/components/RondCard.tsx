'use client';
import React, { useState, useRef, useEffect } from "react";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

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
    const [email, setEmail] = useState("");

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

    const filteredCurrencies = item.currencies.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.key.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <>
            {/* --- CARD --- */}
            <div className="bg-white shadow-lg dark:bg-dark-background rounded-2xl p-5 dark:text-white text-gray-100 flex flex-col gap-5 md:gap-9">

                {/* header */}
                <div className="flex justify-between items-start">
                    <span className="text-[#1F1F1F] dark:text-[#F2F2F2] text-base 2xl:text-xl">
                        {item.percent}% {findByUniqueId(mainData, 1486)}
                    </span>
                    <span className="text-[#1F1F1F] dark:text-[#F2F2F2] font-bold text-base md:text-2xl 2xl:text-[32px]">
                        {item.id}
                    </span>
                </div>

                {/* price bar */}
                <div className={`flex flex-col gap-2 bg-[#F8F8F8] dark:bg-black pt-3 rounded-xl px-3 relative          
                ${dropdownOpen
                        ? " rounded-b-0 pb-2 md:pb-0 md:rounded-xl"
                        : " "
                    }`}>
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
                                    <svg className={`w-7 h-7 mt-[-9px] transition-transform ${dropdownOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                                    </svg>
                                </div>

                                {dropdownOpen && (
                                    <div className="absolute bg-[#F8F8F8] text-black dark:bg-black mt-2 w-full top-[55px] rounded-b-xl md:top-[60px] z-30 right-0 border border-gray-700 md:rounded-xl shadow-lg text-gray-200">
                                        <div className="p-3">
                                            <input

                                                value={query}
                                                onChange={(e) => setQuery(e.target.value)}
                                                placeholder={findByUniqueId(mainData, 57) + " ..."}
                                                className="w-full bg-[#FCFCFC] dark:bg-[#1A1A18] dark:text-white border-0  placeholder-gray-500 rounded-xl px-3 py-3 text-sm ring-1 ring-[#DEDEE9] dark:ring-[#1A1A18] outline-none"
                                            />
                                        </div>
                                        <div className="h-[220px] overflow-auto divide-y">
                                            {filteredCurrencies.map((c) => (
                                                <button
                                                    key={c.key}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedCurrency(c);
                                                        setDropdownOpen(false);
                                                    }}
                                                    className="w-full text-right px-4  bg-transparent flex items-center justify-between dark:text-white"
                                                >
                                                    <span className="flex items-center gap-2">
                                                        <span className="text-lg" dangerouslySetInnerHTML={{ __html: c.icon }} />
                                                        <span className="text-sm">{c.label}</span>
                                                    </span>
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
                            <div className="flex items-center gap-2 justify-start ">
                                {["USD", "BTC", "USDT", "IRR"].map((key) => {
                                    const currency = item.currencies.find(c => c.key === key);
                                    if (!currency) return null;

                                    const isActive = selectedCurrency.key === currency.key;

                                    return (
                                        <div
                                            key={currency.key}
                                            onClick={() => setSelectedCurrency(currency)}
                                            className={`w-[36px] h-[36px] px-1 pt-5 pb-7 flex items-center justify-center border-x-0 border-t-0 border-b-2 border-solid text-sm cursor-pointer
                                                ${isActive
                                                    ? " border-light-primary dark:border-dark-yellow"
                                                    : " border-transparent"
                                                }`}
                                        >
                                            <div
                                                dangerouslySetInnerHTML={{ __html: currency.icon }}
                                                className="w-full h-full flex items-center justify-center"
                                            />
                                        </div>
                                    );
                                })}
                            </div>

                        </div>

                    </div>
                </div>
                <div className="flex justify-between ">
                    <div className="text-[#1F1F1F] dark:text-[#F2F2F2]  items-center gap-1 text-base md:text-xl flex">
                        <div>{price}</div>
                    </div>

                    {/* --- BUY BUTTON --- */}
                    <div className="flex justify-center">
                        <button aria-label="BUY BUTTON"
                            onClick={() => setModalOpen(true)}
                            className="bg-transparent dark:bg-[#1A1A18] w-max font-semibold text-sm px-5 md:px-10 border border-light-primary text-light-primary dark:border-transparent dark:text-dark-yellow py-3 rounded-xl  transition">
                            {findByUniqueId(mainData, 1488)}
                        </button>
                    </div>
                </div>
            </div>

            {/* --- MODAL --- */}
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">

                    {/* BACKDROP */}
                    <div
                        onClick={() => setModalOpen(false)}
                        className="absolute inset-0 bg-black/25 backdrop-blur-sm">
                    </div>

                    {/* MODAL BOX */}
                    <div className="  bg-white xl:ms-[5vw] 2xl:ms-[8vw] dark:bg-[#0C0D0F] rounded-xl p-5 2xl:p-10 w-[90%] max-w-xl shadow-xl z-50  flex flex-col gap-5 relative">

                        <svg onClick={() => setModalOpen(false)} className="absolute start-[25px] top-[25px] cursor-pointer" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.74638 7L13.6346 2.11179C13.8666 1.88021 13.9971 1.56595 13.9974 1.23815C13.9977 0.910351 13.8677 0.595863 13.6361 0.36387C13.4045 0.131876 13.0903 0.00138122 12.7625 0.00109174C12.4347 0.000802246 12.1202 0.130742 11.8882 0.362326L7 5.25054L2.11179 0.362326C1.8798 0.130333 1.56515 0 1.23706 0C0.90897 0 0.59432 0.130333 0.362326 0.362326C0.130333 0.59432 0 0.90897 0 1.23706C0 1.56515 0.130333 1.8798 0.362326 2.11179L5.25054 7L0.362326 11.8882C0.130333 12.1202 0 12.4349 0 12.7629C0 13.091 0.130333 13.4057 0.362326 13.6377C0.59432 13.8697 0.90897 14 1.23706 14C1.56515 14 1.8798 13.8697 2.11179 13.6377L7 8.74946L11.8882 13.6377C12.1202 13.8697 12.4349 14 12.7629 14C13.091 14 13.4057 13.8697 13.6377 13.6377C13.8697 13.4057 14 13.091 14 12.7629C14 12.4349 13.8697 12.1202 13.6377 11.8882L8.74638 7Z" fill="#6A6B74" />
                        </svg>

                        <div className="flex w-full justify-center">

                            <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className="dark:stroke-dark-yellow" d="M41.084 49.5443H16.9173C9.66732 49.5443 4.83398 45.9193 4.83398 37.4609V20.5443C4.83398 12.0859 9.66732 8.46094 16.9173 8.46094H41.084C48.334 8.46094 53.1673 12.0859 53.1673 20.5443V37.4609C53.1673 45.9193 48.334 49.5443 41.084 49.5443Z" stroke="#0066FF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path className="dark:stroke-dark-yellow" d="M41.0827 21.75L33.5185 27.7917C31.0293 29.7733 26.9452 29.7733 24.456 27.7917L16.916 21.75" stroke="#0066FF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                        </div>
                        <p className="text-lg md:text-xl font-bold text-black dark:text-white text-center">
                            ایمیل خود را وارد کنید
                        </p>
                        <p className="text-sm md:text-lg text-center text-[#868B90]">مالکیت شناسه ای که انتخاب کرده اید به ایمیل وارد شده اختصاص خواهد یافت و ایمیل میبایست قبلا در متارنگ استفاده نشده باشد .</p>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ایمیل خود را وارد کنید"
                            className="w-full bg-[#FCFCFC] dark:bg-black mt-3 dark:text-white border-0  placeholder-gray-500 rounded-xl px-3 py-3 text-sm ring-1 ring-[#DEDEE9] dark:ring-[#1A1A18] outline-none"
                        />

                        <button
                            className="mx-auto text-base bg-light-primary dark:bg-dark-yellow text-white dark:text-black py-3  rounded-xl font-bold w-full max-w-36 xl:max-w-44 mt-3">
                            تائید
                        </button>

                    </div>
                </div>
            )}
        </>
    );
};

export default RondCard;
