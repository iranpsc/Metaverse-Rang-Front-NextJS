import { ReactNode, useState } from "react";
import SideBarEducation from "../module/education/SideBarEducation";

interface Props {
  children: ReactNode;
}
export default function BaseLayoutEducation({ children }: Props) {
  const [showAuthCard, setShowAuthCard] = useState<boolean>(false);
  return (
    <div className="flex flex-row overflow-clip max-h-screen no-scrollbar">
      <SideBarEducation setShowAuthCard={setShowAuthCard} />
      {children}
    </div>
  );
}
