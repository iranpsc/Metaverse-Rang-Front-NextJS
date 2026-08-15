import { getChartReferral } from "@/components/utils/actions";
import InviteChart from "./invite-chart";

export default async function InviteChartLoader({
  id,
  params,
  referralPageArrayContent,
  mainData,
}: any) {
  const chartDataFetch = await getChartReferral(id, "yearly");

  console.log("========== REFERRAL CHART DEBUG ==========");
  console.log("Citizen ID:", id);
  console.log("Chart range:", "yearly");
  console.log("Raw chart response:", chartDataFetch);
  console.log(
    "chart_data:",
    chartDataFetch?.chart_data
  );
  console.log(
    "chart_data length:",
    chartDataFetch?.chart_data?.length
  );
  console.log("==========================================");

  const convertToPersianDigits = (str: any) =>
    str?.toString()?.replace(/\d/g, (d: any) => "۰۱۲۳۴۵۶۷۸۹"[d]);

  let initChartData = {
    labels: [],
    data: [[], []],
  };

  if (chartDataFetch?.chart_data) {
    initChartData.labels = chartDataFetch.chart_data.map(
      (i: any) => convertToPersianDigits(i.year)
    );

    initChartData.data[0] = chartDataFetch.chart_data.map(
      (i: any) => i.total_referrals_count
    );

    initChartData.data[1] = chartDataFetch.chart_data.map(
      (i: any) => i.total_referral_orders_amount
    );
  }

  console.log("========== FINAL CHART DATA ==========");
  console.log("initChartData:", initChartData);
  console.log("labels:", initChartData.labels);
  console.log("referrals:", initChartData.data[0]);
  console.log("orders amount:", initChartData.data[1]);
  console.log("======================================");

  return (
    <InviteChart
      params={params}
      referralPageArrayContent={referralPageArrayContent}
      initChartData={initChartData}
      mainData={mainData}
    />
  );
}