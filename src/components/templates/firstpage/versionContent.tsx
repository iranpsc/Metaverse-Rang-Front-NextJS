export default function VersionContent({ singleData }: any) {
  return (
    <>
      <p className="w-fit font-azarMehr xl:text-[20px] lg:text-[20px] md:text-[18px] sm:text-[16px] xs:text-[16px] font-light  text-[#7D7D7D]  py-5 rounded-[20px] ">
        {/* HINT just to show 1402/11/10 00:00 like 1402/11/10*/}
        {singleData.starts_at ? singleData?.starts_at.split(" ")[0] : ""}
      </p>
      <div
        //   HINT inject html to html in nextjs, this way have issue
        dangerouslySetInnerHTML={{ __html: singleData.description }}
        className="text-white xl:text-[28px] lg:text-[24px] md:text-[20px] sm:text-[16px] text-[14px] text-start w-full font-bold"
      ></div>
      {/* <ul className="list-disc ps-5 ">
        <li className="mt-5">
          <span className="font-azarMehr text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] font-medium  text-white">
            تغییرات 1
          </span>
        </li>
        <li className="mt-5">
          <span className="font-azarMehr text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] font-medium  text-white">
            {" "}
            تغییرات 2
          </span>
        </li>
        <li className="mt-5">
          <span className="font-azarMehr text-[14px] sm:text-[16px] md:text-[18px]  xl:text-[20px] font-medium  text-white">
            {" "}
            تغییرات 3
          </span>
        </li>
      </ul> */}
    </>
  );
}
