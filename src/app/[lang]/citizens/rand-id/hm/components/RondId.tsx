'use client';
import React from "react";
import RondCard from "./RondCard"
import { findByUniqueId } from "@/components/utils/findByUniqueId";

interface CitizenListProps {
  params: { lang: string };
  mainData: any;   // یا هر نوع مناسب
}


const CitizenList: React.FC<CitizenListProps> = ({ params , mainData }) => {
  // داده‌ها
const citizenData = [
  {
    id: "HM-2000100",
    percent: 76,
    prices: { 
      IRR: ["1,560,000 " + findByUniqueId(mainData, 1487)], 
      USD: "$37.14", 
      BTC: "₿0.0013", 
      USDT: "T37.14" 
    },
    currencies: [
      { key: "IRR", label: "", icon: "﷼" },
      { key: "USD", label: "Dollar", icon: "$" },
      { key: "BTC", label: findByUniqueId(mainData, 1491), icon: "₿" },
      { key: "USDT", label: findByUniqueId(mainData, 1493), icon: "T" },
    ],
  },

  {
    id: "HM-2000101",
    percent: 82,
    prices: { 
      IRR: ["2,140,000 " + findByUniqueId(mainData, 1487)], 
      USD: "$50.95", 
      BTC: "₿0.0018" 
    },
    currencies: [
      { key: "IRR", label:"", icon: "﷼" },
      { key: "USD", label: "Dollar", icon: "$" },
      { key: "BTC", label: findByUniqueId(mainData, 1491), icon: "₿" },
    ],
  },

  // -------------------------------
  // 3
  {
    id: "HM-2000102",
    percent: 68,
    prices: { 
      IRR: ["1,320,000 " + findByUniqueId(mainData, 1487)], 
      USD: "$31.50", 
      BTC: "₿0.0011" 
    },
    currencies: [
      { key: "IRR", label:"", icon: "﷼" },
      { key: "USD", label:"Dollar", icon:"$" },
      { key: "BTC", label: findByUniqueId(mainData, 1491), icon:"₿" }
    ],
  },

  // -------------------------------
  // 4
  {
    id: "HM-2000103",
    percent: 91,
    prices: { 
      IRR: ["3,450,000 " + findByUniqueId(mainData, 1487)], 
      USD: "$82.77", 
      BTC: "₿0.0029", 
      USDT: "T82.77"
    },
    currencies: [
      { key: "IRR", label:"", icon:"﷼" },
      { key: "USD", label:"Dollar", icon:"$" },
      { key: "BTC", label: findByUniqueId(mainData, 1491), icon:"₿" },
      { key: "USDT", label: findByUniqueId(mainData, 1493), icon:"T" },
    ],
  },

  // -------------------------------
  // 5
  {
    id: "HM-2000104",
    percent: 74,
    prices: { 
      IRR: ["1,980,000 " + findByUniqueId(mainData, 1487)], 
      USD: "$46.10", 
      BTC: "₿0.0016" 
    },
    currencies: [
      { key: "IRR", label:"", icon:"﷼" },
      { key: "USD", label:"Dollar", icon:"$" },
      { key: "BTC", label: findByUniqueId(mainData, 1491), icon:"₿" }
    ],
  },

  // -------------------------------
  // 6
  {
    id: "HM-2000105",
    percent: 88,
    prices: { 
      IRR: ["2,980,000 " + findByUniqueId(mainData, 1487)], 
      USD: "$71.85", 
      BTC: "₿0.0025", 
      USDT: "T71.85"
    },
    currencies: [
      { key: "IRR", label:"", icon:"﷼" },
      { key: "USD", label:"Dollar", icon:"$" },
      { key: "BTC", label: findByUniqueId(mainData, 1491), icon:"₿" },
      { key: "USDT", label: findByUniqueId(mainData, 1493), icon:"T" },
    ],
  },
    {
    id: "HM-2000115",
    percent: 88,
    prices: { 
      IRR: ["2,980,000 " + findByUniqueId(mainData, 1487)], 
      USD: "$71.85", 
      BTC: "₿0.0025", 
      USDT: "T71.85"
    },
    currencies: [
      { key: "IRR", label:"", icon:"﷼" },
      { key: "USD", label:"Dollar", icon:"$" },
      { key: "BTC", label: findByUniqueId(mainData, 1491), icon:"₿" },
      { key: "USDT", label: findByUniqueId(mainData, 1493), icon:"T" },
    ],
  },
    {
    id: "HM-2020105",
    percent: 88,
    prices: { 
      IRR: ["2,980,000 " + findByUniqueId(mainData, 1487)], 
      USD: "$71.85", 
      BTC: "₿0.0025", 
      USDT: "T71.85"
    },
    currencies: [
      { key: "IRR", label:"", icon:"﷼" },
      { key: "USD", label:"Dollar", icon:"$" },
      { key: "BTC", label: findByUniqueId(mainData, 1491), icon:"₿" },
      { key: "USDT", label: findByUniqueId(mainData, 1493), icon:"T" },
    ],
  },
];

  return (
    <div className="w-full px-5 2xl:px-10 py-10">
      <h1 className=" text-2xl 2xl:text-3xl font-bold dark:text-white mb-[32px] text-start px-2">
        {findByUniqueId(mainData, 1490)}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 3xl:gap-10">
        {citizenData.map((item) => (
          <RondCard key={item.id} item={item} mainData={mainData}params={params}/>
        ))}
      </div>
    </div>
  );
};

export default CitizenList;
