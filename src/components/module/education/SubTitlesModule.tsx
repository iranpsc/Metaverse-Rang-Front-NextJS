import { useEffect, useState } from "react";
import { Like, Dislike, View } from "@/components/svgs";
import { formatNumber } from "@/components/utils/education";
 const SubTitlesModule = ()=>{
      const [isDragging, setIsDragging] = useState(false);
        const [startX, setStartX] = useState(0);
          const [scrollLeft, setScrollLeft] = useState(0);


 const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - e.currentTarget.offsetLeft);
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - e.currentTarget.offsetLeft;
    const walk = (x - startX) * 2; //scroll-fast
    e.currentTarget.scrollLeft = scrollLeft - walk;
  };

    return (
      <section className="w-full px-2 py-5 bg-white shadow-md sticky top-0  z-50 flex flex-wrap items-center justify-between  ">
        <div
          className={` max-w-[70%]  h-fit overflow-x-scroll flex flex-row justify-start items-center gap-5 no-scrollbar cursor-grabbing`}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <h4 className="py-3 min-w-fit px-5 text-[16px] bg-white text-blueLink cursor-pointer shadow-sm rounded-full font-azarMehr font-medium ">
            همه
          </h4>
          <h4 className="py-3 min-w-fit px-5  w-fit text-[16px] bg-white text-gray cursor-pointer shadow-sm rounded-full font-azarMehr font-medium ">
               احراز هویت 1
          </h4>
          <h4 className="py-3 min-w-fit px-5  w-fit text-[16px] bg-white text-gray cursor-pointer shadow-sm rounded-full font-azarMehr font-medium ">
               احراز هویت 1
          </h4>
          <h4 className="py-3 min-w-fit px-5  w-fit text-[16px] bg-white text-gray cursor-pointer shadow-sm rounded-full font-azarMehr font-medium ">
               احراز هویت 1
          </h4>
          <h4 className="py-3 min-w-fit px-5  w-fit text-[16px] bg-white text-gray cursor-pointer shadow-sm rounded-full font-azarMehr font-medium ">
               احراز هویت 1
          </h4>
          <h4 className="py-3 min-w-fit px-5  w-fit text-[16px] bg-white text-gray cursor-pointer shadow-sm rounded-full font-azarMehr font-medium ">
               احراز هویت 1
          </h4>
          <h4 className="py-3 min-w-fit px-5  w-fit text-[16px] bg-white text-gray cursor-pointer shadow-sm rounded-full font-azarMehr font-medium ">
               احراز هویت 1
          </h4>
          <h4 className="py-3 min-w-fit px-5  w-fit text-[16px] bg-white text-gray cursor-pointer shadow-sm rounded-full font-azarMehr font-medium ">
               احراز هویت 1
          </h4>
          <h4 className="py-3 min-w-fit px-5  w-fit text-[16px] bg-white text-gray cursor-pointer shadow-sm rounded-full font-azarMehr font-medium ">
               احراز هویت 1
          </h4>
          <h4 className="py-3 min-w-fit px-5  w-fit text-[16px] bg-white text-gray cursor-pointer shadow-sm rounded-full font-azarMehr font-medium ">
               احراز هویت 1
          </h4>
          
        
      
        </div>
        <hr className="w-[1px] h-[30px] bg-gray opacity-50"/>
        <div className="max-w-[30%] flex flex-row justify-start items-center gap-5">
          <View className="w-[20px] h-[20px]" />
          <span className=" whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px]">
            {formatNumber("1111")}
          </span>

          <Dislike className="w-[20px] h-[20px]" />
          <span className=" whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px]">
            {formatNumber("2222")}
          </span>

          <Like className="w-[20px] h-[20px]" />
          <span className=" whitespace-nowrap font-azarMehr font-normal 3xl:text-[18px]">
            {formatNumber("3333")}
          </span>
          <h1 className="font-azarMehr font-bold text-[20px]">فروشگاه متاورس</h1>
        </div>
      </section>
    );
}

export default SubTitlesModule;