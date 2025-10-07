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
        className="text-base w-full break-words whitespace-normal text-[#868B90] dark:text-[#C4C4C4] [&_*]:text-lg [&_h1]:text-2xl [&_h2]:text-2xl   mb-4 text-justify leading-8 space-y-3   font-normal font-[Vazir] 2xl:text-lg 2xl:leading-8
         [&_ul]:list-disc [&_ul]:pl-5
         [&_ol]:list-decimal [&_ol]:pl-5
         [&_li>p]:inline [&_li>h1]:inline [&_li>h2]:inline [&_li>h3]:inline [&_li>h4]:inline [&_li>p]:m-0  "
      ></div>
     
    </>
  );
}
