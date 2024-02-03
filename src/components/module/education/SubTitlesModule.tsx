import { useState } from "react";
import { SubItems } from "../categories/SubItems";
import { Filter } from "@/components/svgs";

 const SubTitlesModule = ({setShowFilter}:any)=>{
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
      <section className="w-full px-5 py-5  bg-white sticky top-0  z-50 flex flex-nowrap items-center justify-between ">
        <div
          className={` max-w-auto h-fit pb-1 overflow-x-scroll flex flex-row justify-start items-center gap-5 no-scrollbar cursor-grabbing`}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <SubItems />
        </div>

        <div
          className="min-w-[100px]  flex flex-row justify-center items-center gap-5 cursor-pointer "
          onClick={() => setShowFilter(true)}
        >
          <Filter
            fill="#151b30"
            className="w-[30px] h-[30px]  hover:shadow-sm"
          />
        </div>
      </section>
    );
}

export default SubTitlesModule;