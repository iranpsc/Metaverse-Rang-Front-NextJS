import { useState } from "react";
import { Like, Dislike, View, Search, ArrowMenu } from "@/components/svgs";

export const SortModule = ({ setShowFilterItems, showFilterItems }:any) => {
      const [activeItem, setActiveItem] = useState<any>(0);
  const changeHandlerFilterItems = (data: any) => {
    if (data === "sort") {
      setShowFilterItems("none");
    } else {
      setShowFilterItems(data);
    }
  };
  const itemFilter = [
    { id: 1, title: "بشترین بازدید" },
    { id: 2, title: "بیشترین لایک" },
    { id: 3, title: "بیشترین دیس لایک" },
  ];

  return (
    <>
      <div
        className="flex flex-row justify-between items-center w-full px-3 cursor-pointer"
        onClick={() => setShowFilterItems("sort")}
      >
        <p className="font-azarMehr font-medium text-[14px]">مرتب سازی </p>

        <ArrowMenu
          className={`stroke-gray stroke-2 dark:stroke-dark-background h-full w-[10px]  ${
            showFilterItems === "sort" ? "rotate-90" : "rotate-[-90deg]"
          }`}
        />
      </div>

      {/* {showFilterItems === "sort" && ( */}
        <div className="flex flex-col gap-2 items-center justify-evenly w-full  ">
          {itemFilter.map((item) => (
            <div
              className={` w-[90%] py-3 px-2 rounded-xl ${
                activeItem === item.id ? "bg-blueLink/30" : "bg-lightGray"
              } cursor-pointer  flex items-center justify-between`}
              key={item.id}
              onClick={() =>
                item.id === activeItem
                  ? setActiveItem(0)
                  : setActiveItem(item.id)
              }
            >
              <p
                className={`font-azarMehr  ${
                  activeItem === item.id ? "text-blueLink" : "text-gray"
                } font-medium text-[13px]`}
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>
      {/* )} */}
    </>
  );
};