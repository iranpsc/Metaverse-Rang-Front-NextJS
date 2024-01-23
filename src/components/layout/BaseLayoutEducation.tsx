import { ReactNode, useState } from "react";
import SideBarEducation from "../module/education/SideBarEducation";
import AuthCards from "./AuthCards";
import { AnimatePresence } from "framer-motion";
import LogoutPage from "../templates/LogoutPage";

interface Props {
  children: ReactNode;
}
export default function BaseLayoutEducation({ children }: Props) {
  const [showAuthCard, setShowAuthCard] = useState<boolean>(false);
    const [showLogOut, setShowLogOut] = useState<boolean>(false);

  return (
    <div className="flex flex-row max-h-screen max-lg:h-full  max-lg:flex-col xl:overflow-clip lg:overflow-clip md:overflow-clip sm:overflow-auto xs:overflow-auto no-scrollbar">
      <AnimatePresence>
        {showAuthCard && <AuthCards setShowAuthCard={setShowAuthCard} />}
      </AnimatePresence>
      <AnimatePresence>
        {showLogOut && (
          <LogoutPage showLogOut={showLogOut} setShowLogOut={setShowLogOut} />
        )}
      </AnimatePresence>

      <section>
        <SideBarEducation
          setShowLogOut={setShowLogOut}
          setShowAuthCard={setShowAuthCard}
          pageName="education"
        />
      </section>

      {children}
    </div>
  );
}
