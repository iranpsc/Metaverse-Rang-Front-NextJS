import { ReactNode, useState } from "react";
import SideBarEducation from "./module/education/SideBarEducation";
import AuthCards from "@/layout/AuthCards";

interface Props {
  children: ReactNode;
}
export default function BaseLayout({ children }: Props) {
  const [showAuthCard, setShowAuthCard] = useState<boolean>(false);
  return (
    <div className=" flex flex-row max-h-screen max-lg:h-full  max-lg:flex-col xl:overflow-clip lg:overflow-clip md:overflow-clip sm:overflow-auto xs:overflow-auto no-scrollbar">
      {showAuthCard ? <AuthCards setShowAuthCard={setShowAuthCard} /> : null}
      <section>
      <SideBarEducation setShowAuthCard={setShowAuthCard} pageName="citizen" />
      </section>
      {children}
    </div>
  );
}
