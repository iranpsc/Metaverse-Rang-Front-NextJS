import { State, DropdownItem } from "@/types/reducerTypes";

type Field = {
  name: string;
};

type Tab = {
  name: string;
  fields: Field[];
};

type Modal = {
  name: string;
  tabs: Tab[];
};

const modals: Record<string, string> = {
  citizen: "Citizenship-profile",
  education: "central-page",
};

const tabsNames: Record<string, string> = {
  citizen: "menu",
  education: "before-login",
};

const namesToDelete: Record<string, string[]> = {
  citizen: [
    "meta rgb",
    "metaverse rang",
    "login",
    "logout",
    "light",
    "dark",
    "citizenship page",
    "enter the metaverse",
    "home page",
    "my profile page",
    "are you sure you want to exit",
    "yes",
    "no",
    "categories",
    "metaverse trainers",
  ],
  education: [
    "meta rgb",
    "metaverse rang",
    "login",
    "exit",
    "light",
    "dark",
    "citizenship page",
    "enter the metaverse",
  ],
};

const sortOrder: string[] = [
  "home",
  "news",
  "articles",
  "competitions",
  "trainings",
  "about",
  "contact",
  "version",
  "calendar",
  "citizens",
  "overview",
  "language",
  "login",
  "light",
  "dark",
  "exit",
];

export const addToActiveDropdown = (
  state: State,
  payload: DropdownItem
): State => ({
  ...state,
  activeDropdown: state.activeDropdown.some((item) => item.key === payload.key)
    ? state.activeDropdown
    : [...state.activeDropdown, payload],
});

export const removeFromActiveDropdown = (
  state: State,
  payload: DropdownItem
): State => ({
  ...state,
  activeDropdown: state.activeDropdown.filter(
    (item) => item.key !== payload.key
  ),
});

export const setActiveItem = (state: State, pageName: string): State => {
  if (pageName === "citizen") {
    return { ...state, activeItem: "home" };
  }

  if (pageName === "education") {
    return { ...state, activeItem: "trainings" };
  }

  return state;
};

export const setShowMenuItem = (state: State, payload: number): State => ({
  ...state,
  showMenuItem:
    typeof payload === "number" ? payload : state.showMenuItem,
});

export const setDataHeader = (
  state: State,
  action: {
    payload: {
      pageName: string;
      dataHeader: Modal[];
    };
  }
): State => {
  const { dataHeader } = action.payload;

  const modal = dataHeader.find(
    (modal) => modal.name === "Citizenship-profile"
  );

  if (!modal) {
    return state;
  }

  const tab = modal.tabs.find((tab) => tab.name === "menu");

  if (!tab) {
    return state;
  }

  const namesToKeepHeader = ["meta rgb", "metaverse rang"];

  const filteredHeader = tab.fields.filter(({ name }) =>
    namesToKeepHeader.includes(name)
  );

  return {
    ...state,
    dataHeader: filteredHeader,
  };
};

export const setDataItems = (
  state: State,
  action: {
    payload: {
      pageName: keyof typeof modals;
      dataMenu: Modal[];
    };
  }
): State => {
  const { pageName, dataMenu } = action.payload;

  const modal = dataMenu.find(
    (modal) => modal.name === modals[pageName]
  );

  if (!modal) {
    return state;
  }

  const tab = modal.tabs.find(
    (tab) => tab.name === tabsNames[pageName]
  );

  if (!tab) {
    return state;
  }

  const filteredItems = tab.fields.filter(
    (item) => !namesToDelete[pageName].includes(item.name)
  );

  if (pageName === "education") {
    return {
      ...state,
      dataMenu: filteredItems
        .filter((item) => sortOrder.includes(item.name))
        .sort(
          (a, b) =>
            sortOrder.indexOf(a.name) -
            sortOrder.indexOf(b.name)
        ),
    };
  }

  return {
    ...state,
    dataMenu: filteredItems,
  };
};

export const setDataTheme = (
  state: State,
  action: {
    payload: {
      dataTheme: Modal[];
    };
  }
): State => {
  const { dataTheme } = action.payload;

  const modal = dataTheme.find(
    (modal) => modal.name === "Citizenship-profile"
  );

  if (!modal) {
    return state;
  }

  const tab = modal.tabs.find((tab) => tab.name === "menu");

  if (!tab) {
    return state;
  }

  const filteredThemeMode = tab.fields.filter((item) =>
    ["light", "dark"].includes(item.name)
  );

  return {
    ...state,
    dataTheme: filteredThemeMode,
  };
};

export const setDataLogin = (
  state: State,
  action: {
    payload: {
      dataLogin: Modal[];
    };
  }
): State => {
  const { dataLogin } = action.payload;

  const modal = dataLogin.find(
    (modal) => modal.name === "Citizenship-profile"
  );

  if (!modal) {
    return state;
  }

  const tab = modal.tabs.find((tab) => tab.name === "menu");

  if (!tab) {
    return state;
  }

  const filteredLogin = tab.fields.filter((item) =>
    [
      "login",
      "logout",
      "enter the metaverse",
      "home page",
      "my profile page",
    ].includes(item.name)
  );

  return {
    ...state,
    dataLogin: filteredLogin,
  };
};

export const setSubItemsMenuData = (
  state: State,
  action: {
    payload: {
      dataSubItems: Modal[];
    };
  }
): State => {
  const { dataSubItems } = action.payload;

  const modal = dataSubItems.find(
    (modal) => modal.name === "Citizenship-profile"
  );

  if (!modal) {
    return state;
  }

  const tab = modal.tabs.find((tab) => tab.name === "menu");

  if (!tab) {
    return state;
  }

  const filteredSubItems = tab.fields.filter((item) =>
    ["categories", "metaverse trainers"].includes(item.name)
  );

  return {
    ...state,
    dataSubItems: filteredSubItems,
  };
};