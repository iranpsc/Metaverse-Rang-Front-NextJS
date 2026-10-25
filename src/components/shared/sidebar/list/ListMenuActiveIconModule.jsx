
"use client";

import { ActiveMenuIcon } from "@/components/svgs";

const ListMenuActiveIconModule = ({
  item,
  languageSelected,
  isClosed,
  i,
}) => {
  const isRTL = languageSelected === "fa" || languageSelected === "ar";

  return (
    item.active && (
      <ActiveMenuIcon
        className={` 
          ${isClosed ? "w-[10px] pr-[17px]" : ""} 
          ${
            isRTL
              ? "pr-[20px] w-[25px] rotate-180"
              : "pr-[20px] w-[25px]"
          } 
          visible h-[35px] absolute inset-s-0 fill-primary dark:fill-primary
        `}
      />
    )
  );
};

export default ListMenuActiveIconModule;
