"use client";

import dynamic from "next/dynamic";

const WalletHistory = dynamic(() => import("./WalletHistory"), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-[420px] flex items-center justify-center text-matn-2">
      &nbsp;
    </div>
  ),
});

export default function WalletHistoryLoader({
  params,
  mainData,
}: {
  params: any;
  mainData: any;
}) {
  return <WalletHistory params={params} mainData={mainData} />;
}
