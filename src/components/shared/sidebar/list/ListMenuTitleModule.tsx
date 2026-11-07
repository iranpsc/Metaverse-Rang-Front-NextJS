// import { SideBarContext } from "@/components/context/SidebarContext";
// import { useContext } from "react";

const ListMenuTitleModule = ({ item, isClosed, activeColor }: any) => {
  // const { state } = useContext(SideBarContext);
  return (
    //   ${
    //     (pageName === "citizen" && item.name === "home") ||
    //     state.showMenuItem === i ||
    //     item.name === "trainings"
    //       ? "text-primary "
    //       : "text-matn-2 "
    //   }
    //   font-azarMehr font-normal 3xl:text-[22px] cursor-pointer group-hover:text-[#0000ffd9] dark:group-hover:text-primary
    //   ${state.isCollapsed ? "hidden" : "visible"}

    <div
      className={`
    ${
      item.active
        ? "text-primary "
        : "text-black dark:text-matn-2"
    }
    ${isClosed ? "w-0 h-0 overflow-hidden" : "min-w-0 flex-1 h-fit whitespace-nowrap"}
    capitalize 3xl:text-xl xl:text-lg lg:text-lgTitle  md:text-mdTitle sm:text-smTitle xs:text-smTitle font-azarMehr `}
      style={activeColor ? { color: activeColor } : undefined}
    >
      {item.translation}
    </div>
  );
};

export default ListMenuTitleModule;
