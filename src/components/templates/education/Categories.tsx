import { Xxx, ShowAll } from "@/components/svgs";

export default function Categories() {
  return (
    <>
      <div className="w-full h-[500px] mt-36">
        <h1 className="text-[24px] flex flex-col  font-bold text-[#414040] ms-5">
          دسته بندی ها
        </h1>
        <div className="mt-10 grid grid-cols-5 ms-5 gap-y-8 ">
          <div className="col-span-1  w-[270px] h-[80px] bg-white dark:bg-[#1A1A18] shadow-lg rounded-[20px] flex flex-row justify-center items-center gap-5">
            <Xxx className="w-[32px] h-[32px]" />
            <p className="text-[18px] font-bold">سرمایه گذاری</p>
          </div>
          <div className="col-span-1  w-[270px] h-[80px] bg-white dark:bg-[#1A1A18] shadow-lg rounded-[20px] flex flex-row justify-center items-center gap-5">
            <Xxx className="w-[32px] h-[32px]" />
            <p className="text-[18px] font-bold">سرمایه گذاری</p>
          </div>
          <div className="col-span-1  w-[270px] h-[80px] bg-white dark:bg-[#1A1A18] shadow-lg rounded-[20px] flex flex-row justify-center items-center gap-5">
            <Xxx className="w-[32px] h-[32px]" />
            <p className="text-[18px] font-bold">سرمایه گذاری</p>
          </div>
          <div className="col-span-1  w-[270px] h-[80px] bg-white dark:bg-[#1A1A18] shadow-lg rounded-[20px] flex flex-row justify-center items-center gap-5">
            <Xxx className="w-[32px] h-[32px]" />
            <p className="text-[18px] font-bold">سرمایه گذاری</p>
          </div>
          <div className="col-span-1  w-[270px] h-[80px] bg-white dark:bg-[#1A1A18] shadow-lg rounded-[20px] flex flex-row justify-center items-center gap-5">
            <Xxx className="w-[32px] h-[32px]" />
            <p className="text-[18px] font-bold">سرمایه گذاری</p>
          </div>
          <div className="col-span-1  w-[270px] h-[80px] bg-white  dark:bg-[#1A1A18] shadow-lg rounded-[20px] flex flex-row justify-center items-center gap-5">
            <Xxx className="w-[32px] h-[32px]" />
            <p className="text-[18px] font-bold">سرمایه گذاری</p>
          </div>
          <div className="col-span-1  w-[270px] h-[80px] bg-white dark:bg-[#1A1A18] shadow-lg rounded-[20px] flex flex-row justify-center items-center gap-5">
            <Xxx className="w-[32px] h-[32px]" />
            <p className="text-[18px] font-bold">سرمایه گذاری</p>
          </div>
          <div className="col-span-1  w-[270px] h-[80px] bg-white dark:bg-[#1A1A18] shadow-lg rounded-[20px] flex flex-row justify-center items-center gap-5">
            <Xxx className="w-[32px] h-[32px]" />
            <p className="text-[18px] font-bold">سرمایه گذاری</p>
          </div>
          <div className="col-span-1  w-[270px] h-[80px] bg-white dark:bg-[#1A1A18] shadow-lg rounded-[20px] flex flex-row justify-center items-center gap-5">
            <Xxx className="w-[32px] h-[32px]" />
            <p className="text-[18px] font-bold">سرمایه گذاری</p>
          </div>
          <div className="col-span-1  w-[270px] h-[80px] bg-white dark:bg-[#1A1A18] shadow-lg rounded-[20px] flex flex-row justify-center items-center gap-5">
            <ShowAll className="w-[32px] h-[32px]" />
            <p className="text-[18px] font-bold text-[#0066FF]">مشاهده همه</p>
          </div>
        </div>
      </div>
    </>
  );
}
