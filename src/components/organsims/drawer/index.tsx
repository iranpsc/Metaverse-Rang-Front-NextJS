import React, { FC, useState, MouseEventHandler, useEffect } from "react";

const AnchorStyle = {
  left: "left-0",
  right: "right-0",
} as const;
export interface DrawerProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  className?: string;
  togglerChild: React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  >;
  anchor?: "left" | "right";
  drawerOnClick?: MouseEventHandler;
}
export const Drawer: FC<DrawerProps> = ({
  children,
  togglerChild,
  isOpen = false,
  className,
  anchor = "left",
  drawerOnClick,
  ...props
}: DrawerProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(isOpen);

  const drawerStyles = isDrawerOpen
    ? "fixed inset-0 bg-gray z-20 bg-opacity-70 transition-opacity ease-in-out duration-300"
    : "fixed inset-0 bg-gray z-20 bg-opacity-0 transition-opacity ease-in-out duration-300 pointer-events-none";

  const drawerContentStyles = isDrawerOpen
    ? `fixed ${AnchorStyle[anchor]} top-0 h-full bg-gray-light min-w-[256px] overflow-y-auto z-50 ease-in-out transition-all duration-300`
    : `fixed ${AnchorStyle[anchor]} top-0 h-full bg-gray-light w-0 overflow-y-auto z-50 ease-in-out transition-all duration-300`;

  const toggleDrawer = (event: any) => {
    setIsDrawerOpen(!isDrawerOpen);
    if (drawerOnClick) {
      drawerOnClick(event);
    }
  };
  useEffect(() => {
    setIsDrawerOpen(isOpen)
  }, [isOpen]);

  return (
    <>
      {React.cloneElement(togglerChild, { onClick: toggleDrawer })}

      {/* <Button onClick={toggleDrawer} {...btnProps} /> */}
      {isDrawerOpen && <div className={drawerStyles} onClick={toggleDrawer} />}
      <div className={`${className} ${drawerContentStyles}`}>
        <div className="relative w-full h-full">{children}</div>
      </div>
    </>
  );
};

export default Drawer;
