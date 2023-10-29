
//SVGS
import {  MenuIcon } from "@/svgs/index";
interface HeaderMenuModuleProps {
  isCollapsed: boolean;
  toggleCollapseHandler: () => void;
}
const HeaderMenuModule: React.FC<HeaderMenuModuleProps> = ({
  isCollapsed,
  toggleCollapseHandler,
}) => {
  
  return (
    <>
      <div className=" flex justify-between mt-2 flex-row items-center p-2 pb-4">
        {!isCollapsed ? 
        null : (
          <MenuIcon
            className="stroke-[#2B2B2B] dark:stroke-gray cursor-pointer w-full"
            onClick={toggleCollapseHandler}
          />
        )}  
      </div>
    </>
  );
};

export default HeaderMenuModule;
