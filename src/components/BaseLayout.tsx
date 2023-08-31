import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import AuthCards from "./layout/AuthCards";

interface Props {
  children: ReactNode;
}
export default function BaseLayout({ children }: Props) {
  const [showAuthCard, setShowAuthCard] = useState<boolean>(false);
  return (
    <div className="flex flex-row max-h-screen max-lg:h-full  max-lg:flex-col overflow-clip max-lg:overflow-auto no-scrollbar">
      {showAuthCard ? <AuthCards setShowAuthCard={setShowAuthCard} /> : null}
      <Sidebar setShowAuthCard={setShowAuthCard} />
      {children}
    </div>
  );
}
