import { SideBarContext } from "@/components/context/SidebarContext";
import { ActiveMenuIcon } from "@/components/svgs";
import { useContext } from "react";

const ListMenuActiveIconModule = ({ item, languageSelected }: any) => {
  const { state } = useContext(SideBarContext);
  return (
    <ActiveMenuIcon
      className={
        item.name === state.activeItem
          ? ` ${state.isCollapsed ? "w-[10px] pr-[17px]" : ""}  ${
              languageSelected.dir === "rtl"
                ? "pr-[20px] w-[25px] rotate-180"
                : "pr-[20px] w-[25px]"
            } visible  h-[35px] absolute start-0 fill-blueLink dark:fill-dark-yellow `
          : "hidden"
      }
    />
  );
};

export default ListMenuActiveIconModule;
