export type DropdownItem = {
  key: string;
  // other properties
};

export type State = {
  isCollapsed: boolean;
  activeDropdown: DropdownItem[];
  showFullModal: boolean;
  activeItem: string;
  pageName: string;
  showMenuItem: number;
  //DATA
  dataHeader: any;
  dataMenu: any;
  dataTheme: any;
  dataLogin: any;
  dataSubItems: any;
};

export type Action =
  | { type: "TOGGLE_COLLAPSE" }
  | { type: "ADD_TO_ACTIVE_DROPDOWN"; payload: DropdownItem }
  | { type: "REMOVE_FROM_ACTIVE_DROPDOWN"; payload: DropdownItem }
  | { type: "CLEAR_ACTIVE_DROPDOWN" }
  | { type: "SET_SHOW_FULL_MODAL" }
  | {
      type: "SET_ITEM_ACTIVE";
      payload: { pageName: string; activeItem: string };
    }
  | { type: "SET_SHOW_MENU_ITEM"; payload: number }
  | { type: "SET_DATA_HEADER"; payload: any }
  | { type: "SET_DATA_ITEMS"; payload: any }
  | { type: "SET_DATA_THEME"; payload: any }
  | { type: "SET_DATA_LOGIN"; payload: any }
  | { type: "SUB_ITEMS_MENU_DATA"; payload: { dataSubItems: any } };
