import ProfileSkeleton from "@/components/skeleton/ProfileSkeleton";
import ProfileDetailsSkeleton from "@/components/skeleton/ProfileDetailsSkeleton";
import ProfileAboutSkeleton from "@/components/skeleton/ProfileAboutSkeleton";

export default function ProfileSectionSkeleton() {
  return (
    <>
      {/* ستون ۱: Profile (TopMobile + Images + MainDetails + Gems) */}
      <section className="lg:w-[35%] w-full flex flex-col lg:overflow-auto light-scrollbar dark:dark-scrollbar">
        <ProfileSkeleton />
      </section>

      {/* ستون ۲: ProfileDetails (SecondDetails + DetailsInterest + ReadMore) */}
      <section className="lg:w-[35%] w-full flex flex-col lg:overflow-auto light-scrollbar dark:dark-scrollbar">
        <ProfileDetailsSkeleton />
      </section>

      {/* ستون ۳: ProfileAbout */}
      <section className="lg:w-[30%] w-full flex flex-col lg:overflow-auto light-scrollbar dark:dark-scrollbar">
        <ProfileAboutSkeleton />
      </section>
    </>
  );
}