"use client";

import { switchDigits } from "@/components/utils/DigitSwitch";
import { useState, useEffect } from "react";
import { formatDate } from "@/components/utils/formatDate";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

interface Version {
  id: number;
  title: string;
  version: string;
  date: string;
  description: string;
}

interface DescriptionBoxProps {
  selectedVersion: Version | null;
  params: any;
  mainData: any;
}

const getCharLimit = () => {
  const width = window.innerWidth;
  if (width < 1206) return 35;
  if (width < 1438) return 50;
  return 100;
};

const DescriptionBox: React.FC<DescriptionBoxProps> = ({
  selectedVersion,
  params,
  mainData,
}) => {
  const [charLimit, setCharLimit] = useState(100);

  useEffect(() => {
    const handleResize = () => {
      setCharLimit(getCharLimit());
    };

    handleResize(); // اجرا در بار اول
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!selectedVersion) return null;

  const trimmedTitle =
    selectedVersion.title.length > charLimit
      ? selectedVersion.title.slice(0, charLimit) + "..."
      : selectedVersion.title;

  return (
    <div
      className=" h-[844px] hidden lg:bg-[#FFFFFF] dark:bg-[#080807]  lg:self-start lg:px-[15px] lg:flex lg:flex-col lg:items-center 
    lg:transition-[width,margin-left] lg:duration-300 lg:ease-in-out lg:w-full lg:dark:bg-[#080807] lg:pt-[15px] lg:rounded-[20px]"
    >
      <div className="lineBox flex justify-between items-center w-full min-h-[48px]">
        <p className="versionP m-0 font-[600] z-[1] text-[#0066FF] dark:text-[#FFC700] text-[100%] lg:font-rokh lg:font-[600] lg:text-[200%]">
{findByUniqueId(mainData, 1443)}
        </p>
        <hr
          className="flex-grow border-none h-[2px] my-[2px] bg-transparent bg-bottom bg-repeat-x bg-[length:15px_100%]
           [background-image:linear-gradient(to_right,#BABABA_40%,#ffffff13_0%)] dark:[background-image:linear-gradient(to_right,#000_40%,#ffffff13_0%)]"
        />
        <p
          className="displayVersionDes text-[170%] font-[700] z-[2] text-[#0066FF] dark:text-[#FFC700]"
        >
          {switchDigits(selectedVersion.version, params.lang)}
        </p>
      </div>

      <div className="lineBox flex justify-between items-center w-full truncate min-h-[48px]">
        <p className="toseVbehbod font-rokh dark:text-[#FCF9FE] z-[1] whitespace-nowrap  text-[140%]">
          {trimmedTitle}
        </p>

        <hr className="flex-grow border-none h-[2px] my-[2px] bg-transparent bg-bottom bg-repeat-x bg-[length:15px_100%] [background-image:linear-gradient(to_right,#BABABA_40%,#ffffff13_0%)] dark:[background-image:linear-gradient(to_right,#000_40%,#ffffff13_0%)]" />

        <p className="toseVbehbodDate text-[#868B90] z-[1] whitespace-nowrap text-[120%]">
          {formatDate(selectedVersion.date, params.lang)}
        </p>
      </div>

      <div className="descriptionBox flex justify-between items-center  w-full min-h-[48px]">
        <p className="description transition-[max-height] duration-300 ease-in-out font-[Vazir] self-start text-bold dark:text-white lg:w-full lg:self-end lg:p-0">
        {findByUniqueId(mainData, 1444)}
        </p>
      </div>

      <div
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        className=" flex-row flex   leading-[37px] transition-[max-height] duration-300 ease-in-out text-[90%] w-full pb-[20px] h-auto bg-transparent text-[#C4C4C4] lg:text-[#908986] lg:overflow-auto lg:h-[40%]"
      >
        <div
          className="justify-between pt-[10px]"
          dangerouslySetInnerHTML={{
            __html: selectedVersion.description || "",
          }}
        />
      </div>
    </div>
  );
};

export default DescriptionBox;
