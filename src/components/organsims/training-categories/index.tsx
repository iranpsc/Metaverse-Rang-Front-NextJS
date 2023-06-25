import React from "react";
import CategoriesCapsule from "@/components/molecules/trainings/categories-capsule";
import Divider from "@/components/molecules/common/divider";
import { CategoryData, Category } from "@/types/api/index"
export interface TrainingCategoriesProps {
  categoryData:CategoryData[],
}

export default function TrainingCategories({ categoryData }: TrainingCategoriesProps) {
  return (
    <>
      <Divider title='دسته بندی'/>
      <div style={{width:'90%'}}  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:mr-[75px]" >
      {categoryData && categoryData.data.map((data:Category, index:any) => (
        <CategoriesCapsule name={data.name} image={data.image} slug={data.slug} key={index}/>
      ))}
      </div>
    </>
  );
}
