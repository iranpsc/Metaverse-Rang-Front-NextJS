'use client';
import React from "react";
import RondCard from "./RondCard"

// داده‌ها
const citizenData = [
  {
    id: "HM-2000100",
    percent: 76,
    prices: { IRR: "1,560,000 تومان", USD: "$37.14", BTC: "₿0.0013", USDT: "T37.14" },
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
    prices: { IRR: "2,140,000 تومان", USD: "$50.95", BTC: "₿0.0018" },
    currencies: [
      { key: "IRR", label: "تومان", icon: "﷼" },
      { key: "USD", label: "Dollar", icon: "$" },
      { key: "BTC", label: "Bitcoin", icon: "₿" },
    ],
  },
  // باقی کارت‌ها مشابه همین
];

const CitizenList = () => {
  return (
    <div className="w-full px-5 lg:px-20 py-10">
      <h1 className="text-3xl font-bold text-white mb-6 text-right">شناسه های آزاد</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {citizenData.map((item) => (
          <RondCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CitizenList;
