'use client';
import React, { useState, useRef, useEffect } from "react";

const RondCard = ({ item }) => {
    const defaultCurrency = item.currencies.find(c => c.key === "IRR") || item.currencies[0];
    const [selectedCurrency, setSelectedCurrency] = useState(defaultCurrency);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [query, setQuery] = useState("");
    const dropdownRef = useRef(null);

    const price = item.prices[selectedCurrency.key];

    // بستن Dropdown وقتی کلیک خارج از آن انجام شود
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        window.addEventListener("click", handler);
        return () => window.removeEventListener("click", handler);
    }, []);

    // فیلتر کردن ارزها بر اساس query
    const filteredCurrencies = item.currencies.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase()) || c.key.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="bg-white shadow-lg dark:bg-dark-background rounded-2xl p-5 dark:text-white  text-gray-100 flex flex-col gap-9">
            {/* header */}
            <div className="flex justify-between items-start">
                <span className="text-[#52545C] dark:text-[#DEDEE9] text-base 2xl:text-xl">{item.percent}% مشابهت</span>
                <h3 className="text-light-primary dark:text-dark-yellow font-bold text-xl md:text-2xl 2xl:text-[32px] ">{item.id}</h3>
            </div>

            {/* price bar */}
            <div className="flex flex-col gap-2 bg-[#F8F8F8] dark:bg-black  py-3 rounded-xl px-3 relative">
                <div className="flex items-center justify-between ">

                    <div className=" text-[#52545C] flex  items-center gap-1 text-sm md:text-base 2xl:text-xl">
                        <div>{price}</div>
                    </div>
                    {/* Dropdown داخل کارت */}
                    <div className="flex items-center gap-2 ">
                        <div  ref={dropdownRef}>
                            <div
                                className="flex flex-row-reverse items-center  rounded-full  dark:text-white border border-gray-700 cursor-pointer"
                                onClick={(e) => { e.stopPropagation(); setDropdownOpen(!dropdownOpen); }}
                            >
                                {/* <span className="text-sm cursor-pointer bg-blue-500">{selectedCurrency.icon}</span> */}
                                {/* <span className="text-sm">{selectedCurrency.label}</span> */}
                                <svg className={`w-7 h-7 transition-transform ${dropdownOpen ? "transform rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                                </svg>
                            </div>

                            {dropdownOpen && (
                                <div className="absolute  bg-black mt-2 w-full top-14 z-20 right-0  border border-gray-700 rounded-xl shadow-lg text-gray-200">
                                    <div className="p-3">
                                        <input
                                            dir="ltr"
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            placeholder="جستجو..."
                                            className="w-full bg-[#1A1A18] dark:text-white focus:border-light-primary dark:focus:border-dark-yellow border border-solid border-transparent placeholder-gray-500 rounded-md px-3 py-3 text-sm outline-none"
                                        />
                                    </div>
                                    <div className="h-48 overflow-auto divide-y ">
                                        {filteredCurrencies.map((c) => (
                                            <button
                                                key={c.key}
                                                onClick={(e) => { e.stopPropagation(); setSelectedCurrency(c); setDropdownOpen(false); }}
                                                className="w-full text-right px-4 py-2 bg-transparent flex items-center justify-between dark:text-white"
                                            >
                                                <span className="flex items-center gap-2">
                                                    <span className="text-lg">{c.icon}</span>
                                                    <span className="text-sm">{c.label}</span>
                                                </span>
                                                {/* <span className="text-xs text-gray-400">{c.key}</span> */}
                                            </button>
                                        ))}
                                        {filteredCurrencies.length === 0 && (
                                            <div className="px-4 py-3 text-sm text-gray-500">موردی یافت نشد</div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* آیکون‌های ارز غیر تومان */}
                        <div className="flex items-center gap-2 justify-start ">
                            {["USD", "BTC", "USDT", "IRR"].map((key) => {
                                const currency = item.currencies.find(c => c.key === key);
                                if (!currency) return null;
                                const isActive = selectedCurrency.key === currency.key;
                                return (
                                    <div
                                        key={currency.key}
                                        onClick={() => setSelectedCurrency(currency)}
                                        className={`w-[32px] h-[32px] rounded-full flex items-center justify-center border text-sm cursor-pointer
                  ${isActive ? "bg-light-primary text-white  dark:bg-dark-yellow dark:text-black" : "bg-[#0066ff27] dark:bg-[#ffc8003d] "}`}
                                    >
                                        {currency.icon}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>


            </div>

            {/* action */}
            <div className="flex justify-center">
                <button className="bg-transparent w-max px-10 2xl:px-14 border border-light-primary text-light-primary dark:border-dark-yellow dark:text-dark-yellow py-3 rounded-xl lg:text-lg transition">خرید شناسه</button>
            </div>
        </div>
    );
};

export default RondCard;
