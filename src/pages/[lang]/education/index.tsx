import { useContext } from "react";
import { useTheme } from "next-themes";
import { LangContext } from "@/context/LangContext";
import { Search } from "@/components/svgs";
//COMPONENTS
import TopTrainers from "@/components/templates/education/TopTrainers";
import Categories from "./../../../components/templates/education/Categories";
import ListEducation from "@/components/templates/education/ListEducation";
import Footer from "@/components/templates/education/Footer";
import BaseLayoutEducation from "@/components/layout/BaseLayoutEducation";
type IndexProps = {};

const Index: React.FC<IndexProps> = () => {
    const { languageSelected } = useContext(LangContext);
    const { theme } = useTheme();
    console.log(languageSelected.dir);
  return (
    <section
      id="light-scrollbar"
      dir={languageSelected.dir}
      className={`overflow-auto relative ${
        theme === "dark" ? "dark-scrollbar" : "light-scrollbar"
      } `}
    >
      <BaseLayoutEducation>
        <section className=" flex flex-col justify-start overflow-y-auto overflow-x-hidden items-center bg-[#f8f8f8] dark:bg-[#000] bg-opacity20">
          <div className="mt-[50px] w-[724px] h-auto py-4 rounded-[67px] shadow-md hover:shodow-2xl bg-white dark:bg-[#1A1A18] flex flex-row justify-between items-center">
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
