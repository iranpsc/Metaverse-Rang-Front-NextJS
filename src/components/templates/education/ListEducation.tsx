import Image from "next/image";
import {Like } from "@/components/svgs";

export default function ListEducation() {
  return (
    <>
      <div className="w-[95%] h-[500px] mt-24  flex flex-col justify-center items-center">
        <div className="grid grid-cols-3 gap-5">
          <div className="w-[100%] h-[543px] rounded-[10px] bg-white dark:bg-[#1A1A18] flex flex-col justify-between items-center">
            <Image
              src="/bg-edu.png"
              alt="background"
              width={1000}
              height={1000}
              className="w-full h-[230px] rounded-[10px]"
            />
            <span className="mt-2 text-start w-[95%]">
              توسعه وب / لورم ایپسوم
            </span>
            <h3 className="text-[22px] font-bold text-start w-[95%] mt-2">
              نحوه استفاده از محصولات سیب
            </h3>
            <p className="text-[16px] font-medium text-start w-[95%] mt-1">
              تغییرات زیادی در قسمت های اکثریت وجود دلرد که به نوعی دچار تغییر
              شده اند ... بیشتر
            </p>
            <div className="w-[95%] h-[50px] py-10 flex flex-row justify-start items-center gap-3">
              <Image
                src="/profile/prof.png"
                alt="profile"
                width={1000}
                height={1000}
                className="w-[44px] h-[44px]"
              />
              <span className="text-[#0066FF] text-[14px] font-medium">
                hm-200003
              </span>

              <span className="ms-28">
                125
                <Like className="inline ms-2" />
              </span>
              <span>
                10
                <Like className="inline ms-2" />
              </span>

              <span>
                600
                <Like className="inline ms-2" />
              </span>
            </div>
          </div>

          <div className="w-[100%] h-[543px]  rounded-[10px] bg-white dark:bg-[#1A1A18] flex flex-col justify-between items-center">
            <Image
              src="/bg-edu.png"
              alt="background"
              width={1000}
              height={1000}
              className="w-full h-[230px] rounded-[10px]"
            />
            <span className="mt-2 text-start w-[95%]">
              توسعه وب / لورم ایپسوم
            </span>
            <h3 className="text-[22px] font-bold text-start w-[95%] mt-2">
              نحوه استفاده از محصولات سیب
            </h3>
            <p className="text-[16px] font-medium text-start w-[95%] mt-1">
              تغییرات زیادی در قسمت های اکثریت وجود دلرد که به نوعی دچار تغییر
              شده اند ... بیشتر
            </p>
            <div className="w-[95%] h-[50px] py-10 flex flex-row justify-start items-center gap-3">
              <Image
                src="/profile/prof.png"
                alt="profile"
                width={1000}
                height={1000}
                className="w-[44px] h-[44px]"
              />
              <span className="text-[#0066FF] text-[14px] font-medium">
                hm-200003
              </span>

              <span className="ms-28">
                125
                <Like className="inline ms-2" />
              </span>
              <span>
                10
                <Like className="inline ms-2" />
              </span>

              <span>
                600
                <Like className="inline ms-2" />
              </span>
            </div>
          </div>

          <div className="w-[100%] h-[543px]  rounded-[10px] bg-white dark:bg-[#1A1A18] flex flex-col justify-between items-center">
            <Image
              src="/bg-edu.png"
              alt="background"
              width={1000}
              height={1000}
              className="w-full h-[230px] rounded-[10px]"
            />
            <span className="mt-2 text-start w-[95%]">
              توسعه وب / لورم ایپسوم
            </span>
            <h3 className="text-[22px] font-bold text-start w-[95%] mt-2">
              نحوه استفاده از محصولات سیب
            </h3>
            <p className="text-[16px] font-medium text-start w-[95%] mt-1">
              تغییرات زیادی در قسمت های اکثریت وجود دلرد که به نوعی دچار تغییر
              شده اند ... بیشتر
            </p>
            <div className="w-[95%] h-[50px] py-10 flex flex-row justify-start items-center gap-3">
              <Image
                src="/profile/prof.png"
                alt="profile"
                width={1000}
                height={1000}
                className="w-[44px] h-[44px]"
              />
              <span className="text-[#0066FF] text-[14px] font-medium">
                hm-200003
              </span>

              <span className="ms-28">
                125
                <Like className="inline ms-2" />
              </span>
              <span>
                10
                <Like className="inline ms-2" />
              </span>

              <span>
                600
                <Like className="inline ms-2" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
