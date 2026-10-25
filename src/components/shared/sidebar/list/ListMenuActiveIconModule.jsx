"use client";
import { ActiveMenuIcon } from "@/components/svgs";

const ListMenuActiveIconModule = ({
  item,
  isClosed,
  i,
}) => {
  return (
    item.active && (
      <ActiveMenuIcon
        className={` ${isClosed ? "w-[10px] pr-[17px]" : ""}  ${
          "pr-[20px] w-[25px] rtl:rotate-180"
        } visible  h-[35px] absolute inset-s-0 fill-primary dark:fill-primary `}
      />
    )
  );
};

export default ListMenuActiveIconModule;