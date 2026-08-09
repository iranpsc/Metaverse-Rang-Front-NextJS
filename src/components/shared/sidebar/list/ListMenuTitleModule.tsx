// import { SideBarContext } from "@/components/context/SidebarContext";
// import { useContext } from "react";

const ListMenuTitleModule = ({ item, isClosed }: any) => {
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
    ${isClosed ? "w-0 h-0 overflow-hidden" : "w-max h-fit"}
    capitalize 3xl:text-xl3Title xl:text-xlTitle lg:text-lgTitle md:text-mdTitle sm:text-smTitle xs:text-smTitle font-azarMehr font-normal 3xl:text-[22px]`}
    >
      {item.translation}
    </div>
  );
};

export default ListMenuTitleModule;
