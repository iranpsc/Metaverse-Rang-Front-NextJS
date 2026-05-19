// components/PoweredBy.tsx
import Image from "next/image";
export default function PoweredBy() {


  return (
    <div className="flex flex-col gap-5">
      <div className="bg-white dark:bg-[#1A1A18] h-[370px] flex flex-col justify-center items-center p-5 lg:px-10 rounded-[40px] dark:text-white lg:text-3xl leading-9">
        <p>Avalanche powers a global community of builders creating real use cases for real impact. Lightning fast. Scalable by design. Natively interconnected. All coming together to form one unified ecosystem.
        </p>
      </div>
      <div className="bg-white dark:bg-[#1A1A18]  rounded-[40px] dark:text-white w-full">
        <div className="w-full h-[280px] overflow-hidden rounded-[40px]">
          <Image
            src={"/whitepaper/testimg.jpg"}
            alt={"whitepaper"}
            className="w-full  !static object-cover"
            fill />
        </div>
        <div className="w-full p-5 lg:px-10 pb-10 lg:text-2xl text-start">
          <p className="font-black pb-3">Powered by Avalanche
</p>
          <p >Avalanche powers a global community of builders creating real use cases for real impact. Lightning fast. Scalable by design. Natively interconnected. All coming together to form one unified ecosystem.
          </p>
        </div>
      </div>
    </div>
  );
}