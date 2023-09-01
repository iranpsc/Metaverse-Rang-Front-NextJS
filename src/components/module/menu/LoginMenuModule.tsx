import { LoginMenu } from "./../../svgs/index";
export default function LoginMenuModule({ isCollapsed, setShowAuthCard ,menuData}: any) {
  
   const namesToKeep = ['log in', 'logout'];

const filteredItems = menuData.filter((item:any) => namesToKeep.includes(item.name));
  
  return (
    <>
      <div
        className="bg-white dark:bg-dark-background bottom-0 transition-all duration-300 ease-linear flex justify-center items-center w-full sticky h-[70px]"
        onClick={() => ""}
      >
        <div
          className="bg-blueLink cursor-pointer dark:bg-dark-yellow rounded-[10px] w-[70%] h-[44px]  flex flex-row justify-around gap-5 items-center"
          onClick={() => setShowAuthCard(true)}
        >
          <LoginMenu
            className={`stroke-white stroke-2 dark:stroke-dark-background h-full w-5 ${
              isCollapsed ? "hidden" : "visibale"
            }`}
          />
          <p className="text-white dark:text-dark-background font-azarMehr font-medium text-center">
            {filteredItems[0] && filteredItems[0].translation}
          </p>
        </div>
      </div>
    </>
  );
}
