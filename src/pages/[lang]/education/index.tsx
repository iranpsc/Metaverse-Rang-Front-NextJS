import React from "react";
import { Search } from "@/components/svgs";
//COMPONENTS
import TopTrainers from "@/components/templates/education/TopTrainers";
import Categories from "./../../../components/templates/education/Categories";
import ListEducation from "@/components/templates/education/ListEducation";
import Footer from "@/components/templates/education/Footer";
import BaseLayoutEducation from "@/components/layout/BaseLayoutEducation";
type IndexProps = {};

const Index: React.FC<IndexProps> = () => {
  return (
    <section dir="rtl" className="overflow-auto relative ">
      <BaseLayoutEducation>
        <section className=" flex flex-col justify-start overflow-y-auto overflow-x-hidden items-center">
          <div className="mt-[94px] w-[724px] h-auto py-4 rounded-[67px] bg-white dark:bg-[#1A1A18] flex flex-row justify-between items-center">
            <Search className="ms-8 fill-blueLink dark:fill-dark-yellow" />
            <input
              placeholder="آموزش مورد نیاز خود را جستجو کنید"
              className="w-[80%]  outline-none border-none 
             placeholder-[#868B90] font-medium dark:bg-[#1A1A18]  dark:placeholder-gray "
            />
            <span className="text-blueLink dark:text-dark-activeButton font-bold me-5">
              جستجو
            </span>
          </div>
          <TopTrainers />
          <Categories />

          <ListEducation />

          <footer className="flex flex-col justify-center items-center">
            <Footer />
          </footer>
        </section>
      </BaseLayoutEducation>
    </section>
  );
};

export default Index;
