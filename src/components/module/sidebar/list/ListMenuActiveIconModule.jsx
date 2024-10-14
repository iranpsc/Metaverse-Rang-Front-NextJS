"use client";
import { ActiveMenuIcon } from "@/components/svgs";
import { useContext } from "react";

const ListMenuActiveIconModule = ({
  item,
  languageSelected,
  isClosed,
  i,
}) => {
  return (
    item.active && (
      <ActiveMenuIcon
        className={` ${isClosed ? "w-[10px] pr-[17px]" : ""}  ${
          languageSelected === "fa"
            ? "pr-[20px] w-[25px] rotate-180"
            : "pr-[20px] w-[25px]"
        } visible  h-[35px] absolute start-0 fill-blueLink dark:fill-dark-yellow `}
      />
    )
  );
};

export default ListMenuActiveIconModule;
