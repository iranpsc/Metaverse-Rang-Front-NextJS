import { useState, useEffect, useContext } from "react";
//Types
import { MenuDataItem } from "@/types/listMenu";
import { SideBarContext } from "@/components/context/SidebarContext";
import ListMenuSvgModule from "./list/ListMenuSvgModule";
import ListMenuTitleModule from "./list/ListMenuTitleModule";
import ListMenuActiveIconModule from "./list/ListMenuActiveIconModule";
import ListMenuArrow from "./list/ListMenuArrow";
import DropdownTrainingsModule from "./list/dropdowns/DropdownTrainingsModule";
import DropdownLanguageModule from "./list/dropdowns/DropdownLanguageModule";

type DropdownItem = {
  key: string;
};

const NewListModule: React.FC<any> = ({
  languageSelected,
  languagesData,
  handleDirChange,
  pageName,
}) => {
  const { state, dispatch } = useContext(SideBarContext);
  const [data, setData] = useState(state.dataMenu);

  useEffect(() => {
    dispatch({
      type: "SET_ITEM_ACTIVE",
      payload: { pageName, activeItem: "" },
    });

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        const filteredMenu = state.dataMenu.filter(
          (item: any) =>
            ![
              "home",
              "property",
              "reward",
              "transaction",
              "connection",
            ].includes(item.name)
        );
        setData(filteredMenu);
      } else {
        setData(state.dataMenu);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [state.dataMenu]);

  const selectItemHandler = (value: string, i: number) => {
    if (value !== "language") {
      dispatch({
        type: "SET_ITEM_ACTIVE",
        payload: { pageName, activeItem: value },
      });
      if (pageName === "citizen") {
        dispatch({ type: "SET_SHOW_MENU_ITEM", payload: i });
      }
    }
    const selectedItem: DropdownItem = { key: value };
    if (state.activeDropdown.some((item) => item.key === selectedItem.key)) {
      dispatch({ type: "REMOVE_FROM_ACTIVE_DROPDOWN", payload: selectedItem });
    } else {
      dispatch({ type: "ADD_TO_ACTIVE_DROPDOWN", payload: selectedItem });
    }
  };

  return (
    <>
      <ul
        id="light-scrollbar"
        className={` list-none overflow-y-visible ${
          state.showFullModal ? "pb-[350px] xs:pb-[400px] " : "pb-[200px]"
        } 
        relative pt-3 w-full   bg-white dark:bg-dark-background  transition-all duration-300 ease-linear max-lg:w-fit`}
      >
        {state.dataMenu &&
          data.map((item: MenuDataItem, i: number) => (
            <li key={item.id} onClick={() => selectItemHandler(item.name, i)}>
              <div
                className={`w-full flex flex-row ${
                  state.isCollapsed ? "ms-4" : "ms-5"
                }  justify-start items-center gap-2  group py-[12px] 3xl:py-[16px]`}
              >
                <ListMenuActiveIconModule
                  item={item}
                  languageSelected={languageSelected}
                />
                <ListMenuSvgModule item={item} i={i} pageName={pageName} />
                <ListMenuTitleModule item={item} i={i} pageName={pageName} />
                <ListMenuArrow item={item} />
              </div>
              {item.name === "trainings" &&
                state.activeDropdown.some((item) => item.key === "trainings") &&
                !state.isCollapsed && <DropdownTrainingsModule />}
              {item.name === "language" &&
                !state.isCollapsed &&
                state.activeDropdown.some(
                  (item) => item.key === "language"
                ) && (
                  <DropdownLanguageModule
                    languagesData={languagesData}
                    languageSelected={languageSelected}
                    handleDirChange={handleDirChange}
                  />
                )}
            </li>
          ))}
      </ul>
    </>
  );
};

export default NewListModule;
