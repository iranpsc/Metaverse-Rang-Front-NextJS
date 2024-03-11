import { State, DropdownItem } from "@/types/reducerTypes";

type Field = {
  name: string;
  // other properties
};

type Tab = {
  name: string;
  fields: Field[];
  // other properties
};

type Modal = {
  name: string;
  tabs: Tab[];
  // other properties
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
    "log in",
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
  } else if (pageName === "education") {
    return { ...state, activeItem: "trainings" };
  }
  return state;
};

export const setShowMenuItem = (state: State, payload: number): State => {
  const newShowMenuItem =
    typeof payload === "number" ? payload : state.showMenuItem;
  return { ...state, showMenuItem: newShowMenuItem };
};

export const setDataHeader = (
  state: State,
  action: { payload: { pageName: string; dataHeader: any } }
): State => {
  const { pageName: newPageName, dataHeader } = action.payload;

  const modalsProfile = dataHeader.find(
    (modal: any) => modal.name === "Citizenship-profile"
  ).tabs;

  const tabsMenu = modalsProfile.find((item: any) => item.name === "menu");

  const namesToKeepHeader = ["meta rgb", "metaverse rang"];
  const filteredHeader = tabsMenu.fields.filter(({ name }: any) =>
    namesToKeepHeader.includes(name)
  );

  return { ...state, dataHeader: filteredHeader };
};

export const setDataItems = (state: State, action: any) => {
  const { pageName, dataMenu } = action.payload;

  const modalsProfile = dataMenu.find(
    (modal: Modal) => modal.name === modals[pageName]
  ).tabs;

  const tabsMenu = modalsProfile.find(
    (item: Field) => item.name === tabsNames[pageName]
  );

  const filteredItems = tabsMenu.fields.filter(
    (item: Field) => !namesToDelete[pageName].includes(item.name)
  );

  if (pageName === "education") {
    const sortedData = filteredItems
      .filter((item: Field) => sortOrder.includes(item.name))
      .sort(
        (a: any, b: any) =>
          sortOrder.indexOf(a.name) - sortOrder.indexOf(b.name)
      );

    return { ...state, dataMenu: sortedData };
  }

  return { ...state, dataMenu: filteredItems };
};

export const setDataTheme = (state: State, action: any) => {
  const { dataTheme } = action.payload;

  const modalsProfile = dataTheme.find(
    (modal: any) => modal.name === "Citizenship-profile"
  ).tabs;

  const tabsMenu = modalsProfile.find((item: any) => item.name === "menu");

  const namesToKeepsThemeMode = ["light", "dark"];

  const filteredThemeMode = tabsMenu.fields.filter((item: any) =>
    namesToKeepsThemeMode.includes(item.name)
  );
  return { ...state, dataTheme: filteredThemeMode };
};

export const setDataLogin = (state: State, action: any) => {
  const { dataLogin } = action.payload;

  const modalsProfile = dataLogin.find(
    (modal: any) => modal.name === "Citizenship-profile"
  ).tabs;

  const tabsMenu = modalsProfile.find((item: any) => item.name === "menu");

  const namesToKeep = [
    "login",
    "logout",
    "enter the metaverse",
    "home page",
    "my profile page",
  ];
  const filteredLogin = tabsMenu.fields.filter((item: any) =>
    namesToKeep.includes(item.name)
  );

  return { ...state, dataLogin: filteredLogin };
};

export const setSubItemsMenuData = (state: State, action: any) => {
  const { dataSubItems } = action.payload;
  const modalsProfile = dataSubItems.find(
    (modal: any) => modal.name === "Citizenship-profile"
  ).tabs;

  const tabsMenu = modalsProfile.find((item: any) => item.name === "menu");

  const namesToKeepSub = ["categories", "metaverse trainers"];
  const filterSubItems = tabsMenu.fields.filter((item: any) =>
    namesToKeepSub.includes(item.name)
  );
  return { ...state, dataSubItems: filterSubItems };
};
