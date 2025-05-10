import SvgIcon from "../SvgIcon";

export default function ListMenuSvgModule({ item }: any) {
  const colorClass = item.active
    ? "text-[#0066FF] dark:text-[#FFC700] stroke-[#0066FF] dark:stroke-[#FFC700]"
    : "text-[#888888] dark:text-[#868B90] stroke-[#888888] dark:stroke-[#868B90]";

  return (
    <SvgIcon
      unique_id={item.unique_id}
      name= {item.name}
      color={colorClass}
    />
  );
}
