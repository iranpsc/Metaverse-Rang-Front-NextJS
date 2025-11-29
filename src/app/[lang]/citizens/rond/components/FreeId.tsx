'use client';
import React, { useState, useRef, useEffect } from "react";

// ---------------------------
// 📌 Static Data (Sample Cards)
// ---------------------------
const citizenData = [
  {
    id: "HM-2000100",
    percent: 76,
    price: "1,560,000 تومان",
    currencies: [
      { key: "IRR", label: "تومان", icon: "﷼" },
      { key: "USD", label: "Dollar", icon: "$" },
      { key: "BTC", label: "Bitcoin", icon: "₿" },
      { key: "USDT", label: "Tether", icon: "T" },
    ],
  },
  {
    id: "HM-2000101",
    percent: 82,
    price: "2,140,000 تومان",
    currencies: [
      { key: "IRR", label: "تومان", icon: "﷼" },
      { key: "USD", label: "Dollar", icon: "$" },
      { key: "BTC", label: "Bitcoin", icon: "₿" },
    ],
  },
  {
    id: "HM-2000102",
    percent: 65,
    price: "980,000 تومان",
    currencies: [
      { key: "IRR", label: "تومان", icon: "﷼" },
      { key: "BTC", label: "Bitcoin", icon: "₿" },
    ],
  },
  {
    id: "HM-2000103",
    percent: 91,
    price: "3,500,000 تومان",
    currencies: [
      { key: "IRR", label: "تومان", icon: "﷼" },
      { key: "USD", label: "Dollar", icon: "$" },
      { key: "BTC", label: "Bitcoin", icon: "₿" },
      { key: "USDT", label: "Tether", icon: "T" },
    ],
  },
  {
    id: "HM-2000104",
    percent: 74,
    price: "1,240,000 تومان",
    currencies: [
      { key: "IRR", label: "تومان", icon: "﷼" },
      { key: "USD", label: "Dollar", icon: "$" },
    ],
  },
  {
    id: "HM-2000105",
    percent: 88,
    price: "4,200,000 تومان",
    currencies: [
      { key: "IRR", label: "تومان", icon: "﷼" },
      { key: "USDT", label: "Tether", icon: "T" },
    ],
  },
];

// ---------------------------
// 📌 Currency Dropdown (with search)
// ---------------------------
const CurrencyDropdown = ({ currencies, selected, onSelect }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  const filtered = currencies.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()) || c.key.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-black dark:text-white border border-gray-700 cursor-pointer"
        onClick={(e) => { e.stopPropagation(); setOpen((s) => !s); }}
      >
        <div className="flex items-center gap-2">
          {selected && (
            <span className="text-sm">{selected.icon}</span>
          )}
          <span className="text-sm ">{selected ? selected.label : currencies[0].label}</span>
          <svg className={`w-4 h-4 ml-1 transition-transform ${open ? "transform rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {open && (
        <div className="absolute  w-52 z-20 mt-2 right-0  bg-[#0b0b0c] border border-gray-700 rounded-xl shadow-lg text-gray-200">
          <div className="p-3">
            <input
              dir="ltr"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="جستجو..."
              className="w-full bg-gray-900 text-gray-200 placeholder-gray-500 rounded-md px-3 py-2 text-sm outline-none w-48"
            />
          </div>
          <div className=" h-60 overflow-auto divide-y divide-gray-800">
            {filtered.map((c) => (
              <button
                key={c.key}
                onClick={(e) => { e.stopPropagation(); onSelect(c); setOpen(false); }}
                className="w-full text-right px-4 py-2 hover:bg-gray-800 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">{c.icon}</span>
                  <span className="text-sm">{c.label}</span>
                </span>
                <span className="text-xs text-gray-400">{c.key}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="px-4 py-3 text-sm text-gray-500">موردی یافت نشد</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ---------------------------
// 📌 Card Component (updated layout to match image)
// ---------------------------
const CitizenCard = ({ item }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(item.currencies[0]);

  return (
    <div className="bg-dark-background border border-solid border-gray-800 rounded-2xl p-4 dark:text-white shadow-inner text-gray-100 flex flex-col gap-4">
      {/* header */}
      <div className="flex justify-between items-start">
        <h3 className="text-yellow-400 font-bold text-lg">{item.id}</h3>
        <span className="text-sm text-gray-400">{item.percent}% مشابهت</span>
      </div>

      {/* price bar: left = icons, right = price (pill) */}
      <div className="flex items-center justify-between bg-[#0f1720] border border-gray-700 rounded-full px-3 py-2">
        <div className="flex items-center gap-3">
          {/* currency dropdown */}
          <CurrencyDropdown
            currencies={item.currencies}
            selected={selectedCurrency}
            onSelect={(c) => setSelectedCurrency(c)}
          />

          {/* small icons (other tokens) */}
          <div className="flex items-center gap-2">
            {item.currencies.slice(0, 4).map((c) => (
              <div key={c.key} className="w-7 h-7 rounded-full bg-[#081018] flex items-center justify-center border border-gray-700 text-sm">
                {c.icon}
              </div>
            ))}
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm ">قیمت</div>
          <div className="text-base font-bold">{item.price}</div>
        </div>
      </div>

      {/* description placeholder */}
      <p className="text-sm  line-clamp-2">توضیحات کوتاه درباره شناسه و اطلاعات مرتبط که در صورت نیاز جایگزین می‌شود.</p>

      {/* action */}
      <div className="flex justify-center">
        <button className="w-full max-w-xs border border-yellow-500 text-yellow-400 py-2 rounded-xl hover:bg-yellow-500 hover:text-black transition">خرید شناسه</button>
      </div>
    </div>
  );
};

// ---------------------------
// 📌 List Component (Grid)
// ---------------------------
const CitizenList = () => {
  return (
    <div className="w-full px-5 lg:px-20 py-10">
      <h1 className="text-3xl font-bold text-white mb-6 text-right">شناسه های آزاد</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {citizenData.map((item) => (
          <CitizenCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CitizenList;
