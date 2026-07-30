import AssetIcon from "./AssetIcon";
import {
  ASSET_CONFIG,
  CARD_HEIGHT,
  PERIOD_EARNED_LABEL,
  type Period,
  type SummaryItem,
} from "./walletHistory.types";
import { findByUniqueId } from "@/components/utils/findByUniqueId";
interface WalletSummaryCardProps {
  item: SummaryItem;
  period: Period;
  lang: string;
  mainData:any;
}

const faceBase =
  "absolute inset-0 [backface-visibility:hidden] bg-white dark:bg-darkGray rounded-2xl p-5 flex flex-col";

/**
 * Same visual language as `FeatureCard`: a 3D flip card that reveals a
 * short description + CTA on hover. Pure/presentational — no data
 * fetching — so it's easy to snapshot-test in isolation.
 */
export default function WalletSummaryCard({ item, period, lang , mainData }: WalletSummaryCardProps) {
  const config = ASSET_CONFIG[item.asset] || {
    label: item.asset,
    color: "#84858F",
    icon: "diamond" as const,
  };

  const isUp = item.direction === "up";
  const isFa = lang.toLowerCase() === "fa";

  const balanceLabel = item.privacy_restricted
    ? isFa
      ? "خصوصی"
      : "Private"
    : item.current_balance.toLocaleString(isFa ? "fa-IR" : "en-US");

  const description = isFa
    ? `این کارت وضعیت دارایی «${config.label}» را نشان می‌دهد؛ موجودی فعلی، روند رشد و میزان کسب‌شده شما در بازه انتخابی.`
    : `This card shows the status of your "${config.label}" asset — current balance, growth trend, and what you've earned in the selected period.`;

  return (
    <div className={`w-full ${CARD_HEIGHT} group [perspective:1200px]`}>
      <div className="relative w-full h-full transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] mt-10">
        {/* ---- front ---- */}
        <div className={`${faceBase} gap-4`}>
          <div className="flex items-center gap-3">
            <div className="rounded-xl w-full flex items-center justify-center absolute right-0 left-0 top-[-26px]">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center"
              // style={{ backgroundColor: `${config.color}22` }}
              >
                <AssetIcon type={config.icon} color={config.color} />
              </div>
            </div>
            <div className="text-center flex flex-col w-full items-center mt-6">
              <p className="text-black dark:text-white font-bold text-base lg:text-xl">
                {config.label}
              </p>
              <p className="text-lightGray dark:text-lightGray text-sm lg:text-2xl font-bold mt-1">
                {balanceLabel}  {findByUniqueId(mainData, 1582 )}
              </p>
              <p className="text-sm text-lightGray text-center"> {findByUniqueId(mainData, 1585 )}</p>
            </div>
          </div>

          <div className="flex items-end justify-between text-center border-t border-solid border-x-0 border-b-0 border-[#EFEFEF] dark:border-[#2A2B32] mt-auto">
            <div className="flex flex-col gap-1 pt-3 items-center mx-auto">
              <span
                className={`flex items-center justify-center gap-1 font-bold text-base ${isUp ? "text-green-500" : "text-red-600"
                  }`}
              >

                <svg className={` ${isUp ? "stroke-green-500" : "text-red-600 stroke-red-600 rotate-180"
                  }`} width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className={` ${isUp ? "stroke-green-500" : "text-red-600 stroke-red-600"
                    }`} d="M6.34042 10.7438H4.00417C1.10792 10.7438 -0.0820825 8.78542 1.37042 6.39375L2.54292 4.46875L3.71542 2.54375C5.16792 0.152083 7.53917 0.152083 8.99167 2.54375L10.1642 4.46875L11.3367 6.39375C12.7892 8.78542 11.5992 10.7438 8.70292 10.7438H6.34042Z" stroke="#14BD06" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

                {item.growth_percent}
                {isFa ? "٪" : "%"}
              </span>
              <span className={`text-lightGray text-[12px] lg:text-sm ${isUp ? "!text-green-500" : "text-red-600"
                  }` } >
                {PERIOD_EARNED_LABEL[period]}
              </span>
            </div>
            <div className="h-full w-[1px] bg-[#EFEFEF] dark:bg-[#2A2B32]" />
            <div className="flex flex-col gap-1 items-center justify-center text-center mx-auto">
              <span className="text-black dark:text-white font-bold text-base">
                {item.period_income.toLocaleString(isFa ? "fa-IR" : "en-US")}
              </span>
              <span className="text-lightGray text-[12px] lg:text-sm">
                {isFa ? "ورودی دوره" : "Period income"}
              </span>
            </div>
          </div>
        </div>

        {/* ---- back ---- */}
        <div className={`${faceBase} justify-between items-center gap-3`} style={{ transform: "rotateY(180deg)" }}>
          <div className="flex items-center gap-2">
            <div className="rounded-xl w-full flex items-center justify-center absolute right-0 left-0 top-[-26px]">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center"
              // style={{ backgroundColor: `${config.color}22` }}
              >
                <AssetIcon type={config.icon} color={config.color} />
              </div>
            </div>
          </div>

          <p className="text-[#84858F] text-xs mt-2 text-center lg:text-sm leading-6 line-clamp-4 flex-1">
            {description}
          </p>

          <a href="#" className="text-blueLink dark:text-dark-primary text-center text-xs lg:text-sm font-bold">
            {item.asset === "satisfaction"
              ? isFa
                ? "مشاهده نظرات و توضیحات"
                : "View reviews & details"
              : isFa
                ? "مشاهده جزئیات بیشتر"
                : "View more details"}
          </a>
        </div>
      </div>
    </div>
  );
}
