import { useContext } from "react";
import { SideBarContext } from "@/components/context/SidebarContext";
import { ArrowMenu } from "@/components/svgs";

const ListMenuArrow = ({ item }: any) => {
  const { state } = useContext(SideBarContext);
  return (
    <>
      {((item.name === "trainings" && !state.isCollapsed) ||
        (item.name === "language" && !state.isCollapsed)) && (
        <ArrowMenu
          className={`ms-1 w-3 h-3 stroke-gray dark:stroke-dark-gray transition-all duration-300 ease-in-out ${
            state.activeDropdown.some((active) => active.key === item.name)
              ? "rotate-[270deg]"
              : "rotate-[90deg]"
          }`}
        />
      )}
    </>
  );
};

export default ListMenuArrow;
