import SvgIcon from "../SvgIcon";

export default function ListMenuSvgModule({ item }: any) {
  return (
    <SvgIcon
      name={item.name}
      // activeNav == i
      // ? "text-[#0066FF] dark:text-[#FFC700]"
      // : "text-[#888888] dark:text-[#888888]"
      color={`${
        item.active
          ? "text-[#0066FF] dark:text-[#FFC700] stroke-[#0066FF] dark:stroke-[#FFC700]"
          : "text-[#888888] dark:text-[#868B90] stroke-[#888888] dark:stroke-[#868B90]"
      }`}
      //   color={`${
      //     item.name === "trainings"
      //       ? "stroke-blueLink dark:dark:stroke-dark-yellow"
      //       : ""
      //   }
      // group-hover:stroke-blueLink group-hover:dark:stroke-dark-yellow w-4 h-4
      // ${
      //   pageName === "citizen" && item.name === "home"
      //     ? "stroke-blueLink dark:stroke-dark-yellow"
      //     : ""
      // }

      // ${
      //   item.name === "trainings" ? "stroke-blueLink dark:stroke-dark-yellow" : ""
      // }

      // ${
      //   !(pageName === "citizen" && item.name === "home") &&
      //   !(item.name === "trainings") &&
      //   !(item.name === "language")
      //     ? "dark:stroke-dark-gray"
      //     : ""
      // } w-[17px] h-[17px] `}
    />
  );
}
