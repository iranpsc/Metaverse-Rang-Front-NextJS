"use client";
import Image from "next/image";
import Link from "next/link";

export default function InviteListCard({
  item,
  params,
}: {
  item: any;
  params: any;
}) {
  const totalAmount = item.referrerOrders?.reduce(
    (sum: number, order: { amount: number }) => sum + (order.amount || 0),
    0
  );
  return (
    <div className="bg-[#0C0D0F] p-3 rounded-xl flex  items-center w-full h-[56px] lg:h-[112px]">
      <div className="relative w-[50px] h-[50px] lg:w-[100px] lg:h-[100px]">
        <Image
          fill
          sizes="(max-width: 1024px) 50px,(min-width: 1025px) 100px"
          className="w-full h-full"
          src="/firstpage/temp-1.webp"
          alt="example"
        />
      </div>

      <div className="flex-1 mx-4">
        <div className="text-white lg:text-xl">{item.name}</div>
        {/* <div className="text-[#0066FF] text-sm lg:text-base">{item.code}</div> */}
        <Link
          className="min-h-[30px] uppercase text-blueLink font-medium font-azarMehr text-[16px] cursor-pointer"
          href={`/${params.lang}/citizens/${item.code}`}
          title={`Go to citizen ${item.code}`} // Optional
          aria-label={`Go to citizen ${item.code}`}
        >
          {item.code}
        </Link>
      </div>
      <p className="text-[#FFC700] ml-1 lg:text-2xl">
        {totalAmount.toLocaleString()} +
      </p>
      <div className="relative w-[32px] h-[32px]">
        <img src="/firstpage/referral/psc-D2J8hrjF.gif" alt="Coin" />
      </div>
    </div>
  );
}
