import { Xxx, ShowAll } from "@/components/svgs";

export default function Categories() {
  return (
    <>
      <div className="w-[95%] h-[500px] mt-36 flex flex-col justify-center items-center ">
        <h1 className="w-[95%] text-[24px] flex flex-col text-start  font-bold text-[#414040] ms-5">
          مربیان برتر
        </h1>
        <div className="mt-10 grid grid-cols-5  gap-y-8 gap-x-8">
          <div className="col-span-1  w-[255px] h-[80px] bg-white dark:bg-[#1A1A18]  rounded-[20px] flex flex-row justify-center items-center gap-5">
            <Xxx className="w-[32px] h-[32px]" />
            <p className="text-[18px] font-bold">سرمایه گذاری</p>
          </div>
          <div className="col-span-1  w-[255px] h-[80px] bg-white dark:bg-[#1A1A18]  rounded-[20px] flex flex-row justify-center items-center gap-5">
            <Xxx className="w-[32px] h-[32px]" />
            <p className="text-[18px] font-bold">سرمایه گذاری</p>
          </div>
          <div className="col-span-1  w-[255px] h-[80px] bg-white dark:bg-[#1A1A18] shadow-lg rounded-[20px] flex flex-row justify-center items-center gap-5">
            <Xxx className="w-[32px] h-[32px]" />
            <p className="text-[18px] font-bold">سرمایه گذاری</p>
          </div>
          <div className="col-span-1  w-[255px] h-[80px] bg-white dark:bg-[#1A1A18] shadow-lg rounded-[20px] flex flex-row justify-center items-center gap-5">
            <Xxx className="w-[32px] h-[32px]" />
            <p className="text-[18px] font-bold">سرمایه گذاری</p>
          </div>
          <div className="col-span-1  w-[255px] h-[80px] bg-white dark:bg-[#1A1A18] shadow-lg rounded-[20px] flex flex-row justify-center items-center gap-5">
            <Xxx className="w-[32px] h-[32px]" />
            <p className="text-[18px] font-bold">سرمایه گذاری</p>
          </div>
          <div className="col-span-1  w-[255px] h-[80px] bg-white  dark:bg-[#1A1A18] shadow-lg rounded-[20px] flex flex-row justify-center items-center gap-5">
            <Xxx className="w-[32px] h-[32px]" />
            <p className="text-[18px] font-bold">سرمایه گذاری</p>
          </div>
          <div className="col-span-1  w-[255px] h-[80px] bg-white dark:bg-[#1A1A18] shadow-lg rounded-[20px] flex flex-row justify-center items-center gap-5">
            <Xxx className="w-[32px] h-[32px]" />
            <p className="text-[18px] font-bold">سرمایه گذاری</p>
          </div>
          <div className="col-span-1  w-[255px] h-[80px] bg-white dark:bg-[#1A1A18] shadow-lg rounded-[20px] flex flex-row justify-center items-center gap-5">
            <Xxx className="w-[32px] h-[32px]" />
            <p className="text-[18px] font-bold">سرمایه گذاری</p>
          </div>
          <div className="col-span-1  w-[255px] h-[80px] bg-white dark:bg-[#1A1A18] shadow-lg rounded-[20px] flex flex-row justify-center items-center gap-5">
            <Xxx className="w-[32px] h-[32px]" />
            <p className="text-[18px] font-bold">سرمایه گذاری</p>
          </div>
          <div className="col-span-1  w-[255px] h-[80px] bg-white dark:bg-[#1A1A18] shadow-lg rounded-[20px] flex flex-row justify-center items-center gap-5">
            <ShowAll className="w-[32px] h-[32px]" />
            <p className="text-[18px] font-bold text-[#0066FF]">مشاهده همه</p>
          </div>
        </div>
      </div>
    </>
  );
}
