import Image from "next/image";

export default function MenuProfileModule() {
  return (
    <>
      <div className="w-full h-[45px] mt-2 items-center justify-start flex flex-row gap-2">
        <Image
          src="/shared/temp-1.webp"
          alt=""
          width={100}
          height={100}
          className=" rounded-full ms-5 w-[40px] h-[40px] bg-white"
        />
        <p>Test</p>
      </div>
      <hr className="mx-7 mt-3 w-[80%] border-[1px] border-[#00000017] dark:border-[#3F3F3F]" />
    </>
  );
}
