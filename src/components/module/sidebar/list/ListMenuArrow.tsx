import { useContext } from "react";
// import { SideBarContext } from "@/components/context/SidebarContext";
import { ArrowMenu } from "@/components/svgs";

const ListMenuArrow = ({ item, isOpen , isClosed }: any) => {
  // const { state } = useContext(SideBarContext);
  return (
    <>
      {(item.name === "trainings" || item.name === "language") && (
        // {item.name === "language" && (
        <ArrowMenu
          className={`${
            isOpen ? "rotate-90" : "-rotate-90"
            
          }
           ${isClosed ? "hidden" : "block"}
           me-2 ms-1 w-3 h-3 md:w-5 md:h-5 stroke-gray dark:stroke-dark-gray transition-all duration-300 ease-in-out block !mx-3`
        }
          
        />
      )}
    </>
  );
};

export default ListMenuArrow;
