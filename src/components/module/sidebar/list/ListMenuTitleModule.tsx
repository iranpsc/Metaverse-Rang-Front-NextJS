// import { SideBarContext } from "@/components/context/SidebarContext";
// import { useContext } from "react";

const ListMenuTitleModule = ({ item, activeNav, i }: any) => {
  // const { state } = useContext(SideBarContext);
  return (
    //   ${
    //     (pageName === "citizen" && item.name === "home") ||
    //     state.showMenuItem === i ||
    //     item.name === "trainings"
    //       ? "text-[#0066FF] dark:text-dark-yellow"
    //       : "text-gray dark:text-dark-gray"
    //   }
    //   font-azarMehr font-normal 3xl:text-[22px] cursor-pointer group-hover:text-[#0000ffd9] dark:group-hover:text-dark-yellow
    //   ${state.isCollapsed ? "hidden" : "visible"}

    <span
      className={`
    ${
      activeNav == i
        ? "text-activeGrey dark:text-white"
        : "text-lightGrey dark:text-lightGrey"
    }
    capitalize 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle md:text-mdTitle sm:text-smTitle xs:text-smTitle
    font-azarMehr font-normal 3xl:text-[22px]  
    visible
      `}
    >
      {item.translation}
    </span>
  );
};

export default ListMenuTitleModule;
