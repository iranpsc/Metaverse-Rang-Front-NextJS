import { CLoseIcon, Check } from "@/components/svgs";

export default function DetailItem({
  title,
  value,
  isLink,
  showCheck = false,
  fullBox,
  params,
}: {
  title: string;
  value: any;
  isLink?: boolean;
  showCheck?: boolean;
  fullBox?: boolean;
  params?: { lang?: string };
}) {
  // لاگ برای دیباگ مقدار params.lang
  // console.log("DetailItem params.lang:", params?.lang, "value:", value);

  const generateValue = () => {
    // بررسی قالب HM-2000000
    const isHMFormat = typeof value === "string" && value.startsWith("HM-");
    // تعیین lang با اولویت: params.lang، سپس پیش‌فرض 'fa'
    const lang = params?.lang && ["fa", "en"].includes(params.lang) ? params.lang : "fa";

    if (showCheck && value === 0) {
      return <CLoseIcon width={14} height={14} className="stroke-red-500" />;
    } else if (showCheck && value === 1) {
      return (
        <Check width={14} height={14} className="scale-[1.5] text-green-500" />
      );
    } else if (isLink || isHMFormat) {
      return (
        <a
          className="text-blueLink dark:text-dark-yellow font-[700]"
          target="_blank"
          href={isHMFormat ? `/${lang}/citizens/${value}` : value}
        >
          {isHMFormat ? value : "لینک"}
        </a>
      );
    } else {
      return (
        <span
          className="text-[#868B90] dark:text-[#C4C4C4] font-[700] text-ellipsis line-clamp-1 overflow-hidden"
          title={value}
        >
          {value}
        </span>
      );
    }
  };

  return (
    <div
      className={`flex flex-wrap flex-row gap-2 justify-between py-3 border-solid border-t-0 border-x-0 border-b-2 border-[#ECECEC] dark:border-[#1A1A18] items-center w-full text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] ${
        fullBox ? "w-full" : "sm:w-[47%]"
      }`}
    >
      <span
        className="whitespace-nowrap text-ellipsis text-[#414040] dark:text-white font-[500] 2xl:font-[700]"
        title={title}
      >
        {title}
      </span>
      <span className="flex justify-end min-w-max">{generateValue()}</span>
    </div>
  );
}