import { Action, State } from "@/types/reducerTypes";
import { createContext, ReactNode, useReducer } from "react";
import {
  setSubItemsMenuData,
  addToActiveDropdown,
  removeFromActiveDropdown,
  setActiveItem,
  setDataHeader,
  setDataItems,
  setDataLogin,
  setDataTheme,
  setShowMenuItem,
} from "../utils/reducerHelpers";

const initialValue: State = {
  isCollapsed: true,
  activeDropdown: [],
  showFullModal: false,
  activeItem: "",
  pageName: "",
  showMenuItem: -10,
  dataHeader: [],
  dataMenu: [],
  dataTheme: [],
  dataLogin: [],
  dataSubItems: [],
};

export const SideBarContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
  toggleCollapseHandler: () => void;
  showFullModalHandler: () => void;
}>({
  state: initialValue,
  dispatch: () => null,
  toggleCollapseHandler: () => null,
  showFullModalHandler: () => null,
});

interface Props {
  children: ReactNode;
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "TOGGLE_COLLAPSE":
      return { ...state, isCollapsed: !state.isCollapsed };
    case "ADD_TO_ACTIVE_DROPDOWN":
      return addToActiveDropdown(state, action.payload);
    case "REMOVE_FROM_ACTIVE_DROPDOWN":
      return removeFromActiveDropdown(state, action.payload);
    case "CLEAR_ACTIVE_DROPDOWN":
      return {
        ...state,
        activeDropdown: [],
      };
    case "SET_SHOW_FULL_MODAL":
      return { ...state, showFullModal: !state.showFullModal };

    case "SET_ITEM_ACTIVE":
      return setActiveItem(state, action.payload.pageName);
    case "SET_SHOW_MENU_ITEM":
      return setShowMenuItem(state, action.payload);

    case "SET_DATA_HEADER": {
      return setDataHeader(state, action);
    }
    case "SET_DATA_ITEMS": {
      return setDataItems(state, action);
    }
    case "SET_DATA_THEME": {
      return setDataTheme(state, action);
    }
    case "SET_DATA_LOGIN": {
      return setDataLogin(state, action);
    }
    case "SUB_ITEMS_MENU_DATA": {
      return setSubItemsMenuData(state, action);
    }

    default:
      return state;
  }
};

const SidebarProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  const toggleCollapseHandler = () => {
    dispatch({ type: "TOGGLE_COLLAPSE" });
  };

  const showFullModalHandler = () => {
    dispatch({ type: "SET_SHOW_FULL_MODAL" });
  };

  return (
    <SideBarContext.Provider
      value={{ state, dispatch, toggleCollapseHandler, showFullModalHandler }}
    >
      {children}
    </SideBarContext.Provider>
  );
};

export default SidebarProvider;
