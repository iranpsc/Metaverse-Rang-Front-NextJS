// components/templates/referral/skeletons/CitizenReferralSkeleton.tsx
import SideBarSkeleton from "@/components/shared/sidebar/SideBarSkeleton";
import BreadCrumb from "@/components/shared/BreadCrumb";
import InviteBox from "@/components/templates/referral/invite-box";
import InviteListSkeleton from "./InviteListSkeleton";
import InviteChartSkeleton from "./InviteChartSkeleton";
import Skeleton from "@/components/ui/skeleton";

export default function CitizenReferralSkeleton({
  dir = "rtl",
  params,
  langData,
  referralPageArrayContent,
  mainData,
}: {
  dir?: "rtl" | "ltr";
  params: any;
  langData: any;
  referralPageArrayContent?: any;
  mainData: any;
}) {
  return (
    <div className="flex h-screen overflow-hidden" dir={dir}>
      <SideBarSkeleton />

      <section className="relative w-full overflow-y-auto mt-[60px] lg:mt-0 bg-bg-primary px-2 light-scrollbar dark:dark-scrollbar">
        <div className="px-12">
          <BreadCrumb params={params} />
        </div>

        <div className="xl:px-8 lg:px-8 md:px-5 sm:px-5 xs:px-1 flex flex-col gap-6">
          {referralPageArrayContent && (
            <InviteBox
              referralPageArrayContent={referralPageArrayContent}
              params={params}
              mainData={mainData}
            />
          )}

          <InviteListSkeleton />
          <InviteChartSkeleton />
        </div>

        <div className="xl:px-8 lg:px-8 md:px-5 sm:px-5 xs:px-1 mt-10">
          <Skeleton variant="rect" tone="surface" className="!h-[120px] !w-full !rounded-2xl" />
        </div>
      </section>
    </div>
  );
}