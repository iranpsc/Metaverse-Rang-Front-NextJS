import { Property, HomeIcon, Transaction, Reward, Connections } from "../svgs";

//data
import { Items } from "../utils/items";

const StaticMobileMenu: React.FC<any> = ({activeItem,SetActiveItem}:any) => {
  const data: any = Items.filter((item: any) => item.id == activeItem);
  return (
    <div className="flex flex-row justify-evenly items-center md:h-[75px] xs:h-[50px] sm:h-[50px]  ">
      <Connections
        className="stroke-[#888888] md:w-[40px] md:h-[40px] sm:w-[25px] xs:w-[25px] sm:h-[25px] xs:h-[25px] cursor-pointer"
        onClick={() => SetActiveItem(10)}
      />
      <div className="h-[50%] w-[1px] bg-[#888888] bg-opacity-30" />
      <Transaction
        className="stroke-[#888888] md:w-[40px] md:h-[40px] sm:w-[25px] xs:w-[25px] sm:h-[25px] xs:h-[25px] cursor-pointer"
        onClick={() => SetActiveItem(7)}
      />
      <div className="h-[50%] w-[1px] bg-[#888888] bg-opacity-30" />
      <HomeIcon className="stroke-blueLink dark:stroke-dark-activeButton md:w-[40px] md:h-[40px] sm:w-[25px] xs:w-[25px] sm:h-[25px] xs:h-[25px] cursor-pointer " />
      <div className="h-[50%] w-[1px] bg-[#888888] bg-opacity-30 cursor-pointer" />
      <Reward
        className="stroke-[#888888] md:w-[40px] md:h-[40px] sm:w-[25px] xs:w-[25px] sm:h-[25px] xs:h-[25px] cursor-pointer"
        onClick={() => SetActiveItem(8)}
      />
      <div className="h-[50%] w-[1px] bg-[#888888] bg-opacity-30" />
      <Property
        className="stroke-[#888888] md:w-[40px] md:h-[40px] sm:w-[25px] xs:w-[25px] sm:h-[25px] xs:h-[25px] cursor-pointer"
        onClick={() => SetActiveItem(1)}
      />
    </div>
  );
};

export default StaticMobileMenu;
