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
    <div className="dark:bg-darkGray bg-white p-3 rounded-xl flex  items-center w-full h-[56px] lg:h-[128px]">
      <div className="relative w-[50px] h-[50px] lg:w-[80px] lg:h-[80px] rounded-full overflow-hidden">
        <Image
          fill
          sizes="(max-width: 1024px) 50px,(min-width: 1025px) 100px"
          className="w-full h-full"
          src={item.image || "/firstpage/temp-1.webp"}
          alt="example"
        />
      </div>

      <div className="flex-1 mx-4">
        <div className="text-black dark:text-white text-[10px] lg:text-xl font-bold">
          {item.name}
        </div>
        {/* <div className="text-[#0066FF] text-sm lg:text-base">{item.code}</div> */}
        <Link
          target="_blank"
          className="min-h-[30px] uppercase text-blueLink font-medium font-azarMehr text-[10px] lg:text-[16px] cursor-pointer"
          href={`/${params.lang}/citizens/${item.code}`}
          title={`Go to citizen ${item.code}`} // Optional
          aria-label={`Go to citizen ${item.code}`}
        >
          {item.code}
        </Link>
      </div>
      <p className="dark:text-dark-primary text-blueLink me-1 text-[16px] lg:text-2xl">
        {totalAmount.toLocaleString()} +
      </p>
      <div className="relative w-[32px] h-[32px]">
        <Image
          width={32}
          height={32}
          src="/firstpage/referral/psc-D2J8hrjF.gif"
          alt="Coin"
        />
      </div>
    </div>
  );
}
