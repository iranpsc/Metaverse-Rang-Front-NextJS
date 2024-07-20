import { useContext } from "react";
// import { SideBarContext } from "@/components/context/SidebarContext";
import { ArrowMenu } from "@/components/svgs";

const ListMenuArrow = ({ item }: any) => {
  // const { state } = useContext(SideBarContext);
  return (
    <>
      {(item.name === "trainings" || item.name === "language") && (
        <ArrowMenu
          className={`ms-1 w-3 h-3 stroke-gray dark:stroke-dark-gray transition-all duration-300 ease-in-out `}
        />
      )}
    </>
  );
};

export default ListMenuArrow;
