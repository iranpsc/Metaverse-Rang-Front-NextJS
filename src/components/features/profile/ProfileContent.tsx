import Profile from "@/components/templates/Profile";
import ProfileAbout from "@/components/features/profile/ProfileAbout";
import ProfileDetails from "@/components/features/profile/ProfileDatails";
import { getUserData } from "@/components/utils/actions";

interface ProfileDataProps {
  id: string;
  lang: string;
  params: any;
  langData: any;
  mainData: any;
}

const MIN_LOADING_TIME = 3000;

export default async function ProfileData({
  id,
  lang,
  params,
  langData,
  mainData,
}: ProfileDataProps) {
  const startTime = Date.now();

  const profileData = await getUserData(id);

  const elapsed = Date.now() - startTime;

  if (elapsed < MIN_LOADING_TIME) {
    await new Promise((resolve) =>
      setTimeout(resolve, MIN_LOADING_TIME - elapsed)
    );
  }

  if (!profileData?.data) {
    return null;
  }

  let titleData = "";
  let nameUser = "";

  if (lang === "fa") {
    if (profileData.data?.kyc?.fname) {
      nameUser =
        `${profileData.data.kyc.fname} ${profileData.data.kyc.lname || ""}`.trim();

      titleData = `${nameUser} | ${profileData.data.code}`;
    } else if (profileData.data.name) {
      nameUser = profileData.data.name;
      titleData = `${nameUser} | ${profileData.data.code}`;
    } else {
      titleData = "متاورس رنگ";
    }
  } else {
    if (profileData.data.name) {
      nameUser = profileData.data.name;
      titleData = `${nameUser} | ${profileData.data.code}`;
    } else if (profileData.data?.kyc?.fname) {
      nameUser =
        `${profileData.data.kyc.fname} ${profileData.data.kyc.lname || ""}`.trim();

      titleData = `${nameUser} | ${profileData.data.code}`;
    } else {
      titleData = "Metaverse RGB";
    }
  }

  return (
              <section className="relative w-full bg-bg-primary  flex flex-col lg:flex-row gap-[10px] p-[8px]">
                <section className="lg:w-[35%] flex flex-col lg:overflow-auto light-scrollbar dark:dark-scrollbar">
                  <Profile
                    profileData={profileData}
                    titleData={titleData}
                    langData={langData}
                    nameUser={nameUser}
                    mainData={mainData}
                    params={params}
                  />
                </section>

                <section className="lg:w-[35%] flex flex-col lg:overflow-auto light-scrollbar dark:dark-scrollbar">
                  <ProfileDetails
                    profileData={profileData}
                    mainData={mainData}
                  />
                </section>

                <section className="lg:w-[30%] flex flex-col lg:overflow-auto light-scrollbar dark:dark-scrollbar">
                  <ProfileAbout
                    profileData={profileData}
                    mainData={mainData}
                    titleData={titleData}
                    params={params}
                  />
                </section>
              </section>
  );
}