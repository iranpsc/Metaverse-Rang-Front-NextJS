import SvgIcon from "../SvgIcon";

export default function ListMenuSvgModule({ item, i, activeNav }: any) {
  return (
    <SvgIcon
      name={item.name}
      color={"stroke-gray dark:stroke-dark-gray"}
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
