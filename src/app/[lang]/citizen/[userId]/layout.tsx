import React from "react";

interface MenuLayoutProps {
  children: React.ReactNode;
}

const MenuLayout: React.FC<MenuLayoutProps> = ({ children }) => {
  return (
    <div>
      menu
      {children}
    </div>
  );
};

export default MenuLayout;
