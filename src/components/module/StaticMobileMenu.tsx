import { Property, HomeIcon, Transaction, Reward, Connections } from "../svgs";



const StaticMobileMenu: React.FC = () => {
  return (
    <div className="flex flex-row justify-evenly items-center h-[50px] ">
      <Connections className="stroke-[#888888] w-[25px] h-[25px] cursor-pointer" />
      <div className="h-[50%] w-[1px] bg-[#888888] bg-opacity-30" />
      <Transaction className="stroke-[#888888] w-[25px] h-[25px] cursor-pointer" />
      <div className="h-[50%] w-[1px] bg-[#888888] bg-opacity-30" />
      <HomeIcon className="stroke-blueLink dark:stroke-dark-activeButton w-[25px] h-[25px] cursor-pointer " />
      <div className="h-[50%] w-[1px] bg-[#888888] bg-opacity-30 cursor-pointer" />
      <Reward className="stroke-[#888888] w-[25px] h-[25px] cursor-pointer" />
      <div className="h-[50%] w-[1px] bg-[#888888] bg-opacity-30" />
      <Property className="stroke-[#888888] w-[25px] h-[25px] cursor-pointer" />
    </div>
  );
};

export default StaticMobileMenu;
