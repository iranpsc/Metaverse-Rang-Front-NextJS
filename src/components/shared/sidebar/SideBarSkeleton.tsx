import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * اسکلت اصلی سایدبار (معادل خروجی SideBar.tsx وقتی hydrated=false)
 *
 * === چرا این‌شکلیه (اولویت با پرفورمنس) ===
 * - فقط یک پراپ ورودی داره (isClosed) و کاملاً stateless/pure هست؛ هیچ
 *   useEffect، useState، فچ، یا listener ای نداره — یعنی صفر هزینه‌ی JS
 *   اضافه برای Hydration/TBT.
 * - هیچ آیکون SVG واقعی، next/image، یا کامپوننت MUI (مثل Tooltip که
 *   توی SideBarContent واقعی استفاده می‌شه) ایمپورت نشده. این کتابخونه‌ها
 *   سنگین‌ان و اسکلت اصلاً بهشون نیاز نداره — این باعث می‌شه باندل جاوااسکریپتی
 *   که برای رندر اولیه لازمه خیلی کوچیک‌تر بمونه (مستقیم روی FCP/LCP اثر داره).
 * - با React.memo پیچیده شده.
 * - فقط از --color-primary (از طریق Skeleton) و کلاس‌های یوتیلیتی Tailwind
 *   استفاده می‌کنه — بدون CSS اضافه، بدون فونت‌گیری اضافه.
 *
 * === چرا هر دو حالت باز/بسته پیاده شده ===
 * چون این کامپوننت هم به‌عنوان گارد هیدریشن استفاده می‌شه (که همیشه با
 * isClosed=true رندر می‌شه چون default state سرور همینه) و هم می‌تونه در
 * آینده برای هر حالت دیگه‌ای (مثلاً لودینگ tabsMenu از API) استفاده بشه،
 * پراپ isClosed رو گرفتیم و دقیقاً همون breakpoint هایی که خود <aside>
 * واقعی داره (w-[70px] در بسته / w-[260px] md:w-[242px] lg:w-[262px]
 * xl:w-[18.2vw] 2xl:w-[16.5vw] در باز) رو پیاده کردیم تا هیچ CLS ای بین
 * اسکلت و سایدبار واقعی رخ نده.
 *
 * === نکته مهم ===
 * ساختار داخلی <Header /> و <ListMenuSvgModule /> واقعی رو نداشتم (فایل‌شون
 * فرستاده نشده بود)، برای همین بخش هدر بالای سایدبار (لوگو + دکمه جمع/باز
 * کردن) و آیکون‌های هر آیتم منو رو با یه شکل عمومی و منطقی تقریب زدم. اگه
 * Header.tsx و ListMenuSvgModule.tsx رو هم بفرستی، این دو بخش رو دقیقاً
 * pixel-perfect می‌کنم.
 */

const MENU_ROWS = 8;

interface SideBarSkeletonProps {
  isClosed?: boolean;
}

function SideBarSkeletonBase({ isClosed  }: SideBarSkeletonProps) {
  return (
    <div className="z-[1000] h-dvh dark:bg-dark-background fixed top-0 rtl:right-0 ltr:left-0 xl:relative xl:top-0 xl:right-0">
      <div
        className={`shadow-left dark:shadow-leftDark xl:min-h-dvh scroll lg:min-h-dvh md:min-h-dvh relative sm:min-h-dvh xs:min-h-dvh ${
          isClosed
            ? "sm:hidden xs:hidden md:hidden menu-transition xl:block lg:block"
            : "sm:block xs:block"
        } absolute xl:relative lg:relative xl:w-fit lg:w-fit md:w-full z-[100] sm:w-full xs:w-full no-scrollbar`}
      >
        <aside
          className={`${
            isClosed
              ? "w-[70px] max-lg:hidden"
              : "w-[260px] md:w-[242px] lg:w-[262px] xl:w-[18.2vw] 2xl:w-[16.5vw]"
          } flex flex-col h-dvh relative bg-white dark:bg-dark-background menu-transition`}
        >
          {/* هدر بالای سایدبار — معادل <Header /> */}
          <div className="flex flex-col sticky w-full h-fit top-0 pt-1 z-50 bg-white dark:bg-dark-background menu-transition">
            <div
              className={`w-full flex items-center py-4 ${
                isClosed ? "justify-center" : "justify-between px-4"
              }`}
            >
              <Skeleton tone="standalone" variant="circle" className="w-[40px] h-[40px]" />
              {!isClosed && (
                <>
                  <Skeleton tone="standalone" className="h-4 w-20 rounded-md" />
                  <Skeleton tone="standalone" variant="circle" className="w-6 h-6" />
                </>
              )}
            </div>
          </div>

          {/* ردیف‌های آیتم منو — معادل <SideBarContent /> */}
          <ul className="h-full flex flex-col list-none overflow-y-hidden relative w-full pt-3 max-lg:w-fit">
            {Array.from({ length: MENU_ROWS }).map((_, i) => (
              <li
                key={i}
                className={`w-full flex flex-row items-center py-[12px] 3xl:py-[16px] ${
                  isClosed ? "justify-center" : "justify-start gap-3 px-4"
                }`}
              >
                <Skeleton tone="standalone" className="w-8 h-8 rounded-md flex-shrink-0" />
                {!isClosed && (
                  <Skeleton
                    tone="standalone"
                    className="h-3.5 rounded-md"
                    style={{ width: `${55 + ((i * 13) % 35)}%` }}
                  />
                )}
              </li>
            ))}
          </ul>

          {/* دکمه ورود پایین سایدبار — معادل <LoginMenuModule /> */}
          <div
            className={`${
              isClosed ? "sm:hidden xs:hidden md:hidden xl:block lg:block" : ""
            } w-full h-fit z-[100] bg-white dark:bg-dark-background bottom-0 py-5 flex flex-col items-center justify-center gap-3 menu-transition`}
          >
            <div className={isClosed ? "w-[80%] m-auto" : "w-[80%] m-auto"}>
              <Skeleton tone="standalone" className="w-full h-[40px] rounded-[15px]" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default memo(SideBarSkeletonBase);