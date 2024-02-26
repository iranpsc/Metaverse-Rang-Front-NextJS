import { useContext } from "react";
import SvgIcon from "../../SvgIcon";
import { SideBarContext } from "@/components/context/SidebarContext";

const ListMenuSvgModule = ({ item, i, pageName }: any) => {
  const { state } = useContext(SideBarContext);
  return (
    <SvgIcon
      name={item.name}
      color={`${
        item.name === "trainings"
          ? "stroke-blueLink dark:dark:stroke-dark-yellow"
          : ""
      }
    group-hover:stroke-blueLink group-hover:dark:stroke-dark-yellow w-4 h-4
    ${
      pageName === "citizen" && item.name === "home"
        ? "stroke-blueLink dark:stroke-dark-yellow"
        : ""
    }
    ${state.showMenuItem === i ? "stroke-blueLink dark:stroke-dark-yellow" : ""}
    ${
      item.name === "trainings" ? "stroke-blueLink dark:stroke-dark-yellow" : ""
    }
    ${
      item.name === "language" && state.activeDropdown.includes(item.name)
        ? "stroke-blueLink dark:stroke-dark-yellow"
        : ""
    }
    ${
      !(pageName === "citizen" && item.name === "home") &&
      !(state.showMenuItem === i) &&
      !(item.name === "trainings") &&
      !(item.name === "language" && state.activeDropdown.includes(item.name))
        ? "stroke-gray dark:stroke-dark-gray"
        : ""
    } w-[17px] h-[17px] `}
    />
  );
};
export default ListMenuSvgModule;
