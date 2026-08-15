"use client";

import dynamic from "next/dynamic";
import ProfileSectionSkeleton from "@/components/skeleton/ProfileSectionSkeleton";

const ProfileContent = dynamic(
  () => import("./ProfileContent"),
  {
    ssr: false,
    loading: () => <ProfileSectionSkeleton />,
  }
);

interface ProfileContentClientProps {
  id: string;
  lang: string;
  params: any;
  langData: any;
  langArray: any;
  mainData: any;
}

export default function ProfileContentClient(
  props: ProfileContentClientProps
) {
  return <ProfileContent {...props} />;
}