import { useContext } from "react";
import BaseLayout from "./../components/BaseLayout";
import Profile from "@/components/templates/Profile";
import ProfileDetails from "@/components/templates/ProfileDatails";
import ProfileAbout from "@/components/templates/ProfileAbout";
import { LangContext } from "@/components/context/LangContext";

export default function Home() {
  const { languageSelected } = useContext(LangContext);
  return (
    <section dir={languageSelected.dir} className=" overflow-clip">
      <BaseLayout>
        <div className="grid grid-cols-12 w-full  ">
          <section className="col-span-5 h-[100vh] dark:bg-black bg-[#e9eef8] px-1 ">
            <Profile />
          </section>
          <div className="col-span-4 dark:bg-black h-[100vh] bg-[#e9eef8] p-1">
            <ProfileDetails />
          </div>
          <div className="col-span-3 dark:bg-black h-[100vh] bg-[#e9eef8] p-1">
            <ProfileAbout />
          </div>
        </div>
      </BaseLayout>
    </section>
  );
}
