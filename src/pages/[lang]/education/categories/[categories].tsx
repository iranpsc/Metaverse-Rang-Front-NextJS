import { useContext, useState, useEffect } from "react";
import { LangContext } from "@/context/LangContext";
import { useRouter } from "next/router"
import BaseLayoutEducation from "@/components/layout/BaseLayoutEducation";



const Index = ()=>{
    const { data, languageSelected } = useContext(LangContext);
    const router = useRouter();
    const {categories}= router.query;
    return (
      <>
        <section
          dir={languageSelected.dir}
          className={`overflow-auto relative `}
        >
          <BaseLayoutEducation>
            <h1>Index{categories}</h1>
          </BaseLayoutEducation>
        </section>
      </>
    );
} 


export default Index