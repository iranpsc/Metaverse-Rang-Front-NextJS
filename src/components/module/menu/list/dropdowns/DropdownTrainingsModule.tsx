import { useContext, useState, useEffect } from "react";
import { SideBarContext } from "@/components/context/SidebarContext";
import { Categories, Trainers } from "@/components/svgs/SvgEducation";
import { useRouter } from "next/router";

const DropdownTrainingsModule = () => {
  const [isCategoryAll, setIsCategoryAll] = useState<boolean>();
  const { state } = useContext(SideBarContext);
  const router = useRouter();

  useEffect(() => {
    if (router.route.includes("/category/all")) {
      setIsCategoryAll(true);
    } else {
      setIsCategoryAll(false);
    }
  }, [router.route]);

  const pusher = (value: string) => {
    if (value === "categories" && !isCategoryAll) {
      router.push(`/${router.query.lang}/education/category/all`);
    }
  };

  return (
    <div className="h-fit py-2 ps-12  " onClick={(e) => e.stopPropagation()}>
      <ul className="flex flex-col justify-start items-start gap-3">
        {state.dataSubItems.map((item: any) => (
          <li
            key={item.id}
            className="flex flex-row justify-start items-center gap-4 cursor-pointer "
            onClick={() => pusher(item.name)}
          >
            {item.name === "categories" && (
              <Categories
                className={`w-5 h-5 ${
                  isCategoryAll
                    ? "fill-blueLink dark:fill-dark-yellow"
                    : "fill-gray dark:fill-dark-gray "
                }`}
              />
            )}
            {item.name === "metaverse trainers" && (
              <Trainers className="w-5 h-5 fill-gray dark:fill-dark-gray" />
            )}
            <p
              className={`font-azarMehr text-[14px] font-medium w-full   ${
                isCategoryAll && item.name === "categories"
                  ? "text-[#0000ffd9] dark:text-dark-yellow "
                  : ""
              }text-start text-gray dark:text-dark-gray`}
            >
              {item.translation}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownTrainingsModule;
