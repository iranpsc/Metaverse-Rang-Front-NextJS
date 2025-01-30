import Image from "next/image";

export default function InviteList() {
  return (
    <>
      <div className="flex flex-col py-8 leading-[24px] gap-4 w-full lg:w-[49%]  lg:self-start">
        <p className="text-white font-black lg:text-2xl">لیست دعوتی ها</p>
        <p className="text-[#A0A0AB] lg:text-lg">
          لیست دوستانی که تا به الان از طریق شما به جمع متاورس رنگ اضافه شدن و
          مقدار پاداشی که گرفتید.
        </p>

        <div className="searchBoxContainer  transition-[right,width] duration-300 ease-in-out flex items-center flex-row justify-between bg-[#1A1A18] w-full h-[50px] rounded-[12px] ">
          <div className="searchIcon flex justify-center pr-7">
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.67065 8.61694C1.67065 4.68636 4.85702 1.5 8.78759 1.5C12.7182 1.5 15.9045 4.68636 15.9045 8.61694C15.9045 12.5475 12.7182 15.7339 8.78759 15.7339C4.85702 15.7339 1.67065 12.5475 1.67065 8.61694ZM8.78759 0C4.02859 0 0.170654 3.85793 0.170654 8.61694C0.170654 13.3759 4.02859 17.2339 8.78759 17.2339C10.7923 17.2339 12.6371 16.5493 14.101 15.4012L16.8142 18.1073C17.1074 18.3998 17.5823 18.3992 17.8748 18.1059C18.1673 17.8126 18.1667 17.3378 17.8734 17.0453L15.1973 14.3761C16.5696 12.8499 17.4045 10.8309 17.4045 8.61694C17.4045 3.85793 13.5466 0 8.78759 0Z"
                fill="white"
              />
            </svg>
          </div>
          <input
            type="text"
            id="searchBox"
            className="searchWrite pr-2 pl-5 text-white bg-transparent flex-1 w-[90%] h-[90%] border-none outline-none text-sm text-aliceblue"
            placeholder=" دعوت شده  خود را جستجو کنید.."
          />
          <button className="searchButton font-normal text-[95%] pl-5  border-none bg-transparent text-[#FFBC00] cursor-pointer">
            جستجو
          </button>
        </div>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2  gap-4 w-full"
        id="card-container"
      >
        <div className="bg-[#0C0D0F] p-3 rounded-xl flex  items-center w-full h-14 lg:h-28">
          <div className="relative w-[50px] h-[50px] lg:w-[100px] lg:h-[100px]">
            <Image
              fill
              className="w-full h-full"
              src="/firstpage/temp-1.webp"
              alt="example"
            />
          </div>

          <div className="flex-1 mx-4">
            <div className="text-white lg:text-xl">حسین قدیری</div>
            <div className="text-[#0066FF] text-sm lg:text-base">
              HM-2000003
            </div>
          </div>
          <p className="text-[#FFC700] ml-1 lg:text-2xl">100 +</p>
          <div className="relative w-[32px] h-[32px]">
            <Image fill src="/referral/psc-D2J8hrjF.gif" alt="Coin" />
          </div>
        </div>
      </div>
    </>
  );
}
