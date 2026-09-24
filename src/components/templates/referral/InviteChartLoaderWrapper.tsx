"use client";

import dynamic from "next/dynamic";
import InviteChartSkeleton from "@/components/skeleton/InviteChartSkeleton";

const InviteChartLoader = dynamic(
  () => import("./InviteChartLoader"),
  {
    ssr: true,
    loading: () => <InviteChartSkeleton />,
  }
);

export default function InviteChartLoaderWrapper(props: any) {
  return <InviteChartLoader {...props} />;
}