import { createContext, ReactNode, useState } from "react";

const initialValue = { isCollapsed: false, toggleCollapseHandler: () => {} };

export const SideBarContext = createContext(initialValue);

interface Props {
  children: ReactNode;
}

const SidebarProvider = ({ children }: Props) => {
  const [isCollapsed, setToggleCollapse] = useState<boolean>(false);

  const toggleCollapseHandler = () => {
    setToggleCollapse((prev) => !prev);
  };

 

  return (
    <SideBarContext.Provider
      value={{ isCollapsed, toggleCollapseHandler }}
    >{children}</SideBarContext.Provider>
  );
};

export default SidebarProvider;
