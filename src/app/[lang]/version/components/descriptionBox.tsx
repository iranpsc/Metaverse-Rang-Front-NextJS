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

  const [VersionText, setVersionText] = useState("");
    const [DscriptionText, setDscriptionText] = useState("");

  useEffect(() => {
    if (params.lang.toLowerCase() === "fa") {
      setVersionText("ورژن متاورس");
      setDscriptionText("توضیحات");
    } else if (params.lang.toLowerCase() === "en") {
      setVersionText("Metaverse Version");
      setDscriptionText("Dscription");
    } else {
      setDscriptionText("Dscription");
      setVersionText("Metaverse Version");
    }
  }, [params.lang]);


  if (!selectedVersion) return null;

  const trimmedTitle =
    selectedVersion.title.length > charLimit
      ? selectedVersion.title.slice(0, charLimit) + "..."
      : selectedVersion.title;




  return (
    <div
      className=" h-[844px] pb-10 hidden lg:bg-[#FFFFFF] dark:bg-[#1A1A18] lg:self-start  lg:flex lg:flex-col lg:items-center 
    lg:transition-[width,margin-left] lg:duration-300 lg:ease-in-out lg:w-full lg:dark:bg-[#1A1A18] lg:pt-[15px] lg:rounded-[20px]"
    >
      <div className="lineBox flex justify-between items-center w-full min-h-[48px] lg:px-[15px]">
        <span className="versionP m-0 font-[600] z-[1] text-[#0066FF] dark:text-[#FFC700] text-[100%] lg:font-rokh lg:font-[600] lg:text-[200%]">
        {VersionText}
        </span>
        <hr
          className="flex-grow border-2 border-dashed h-[2px] border-b-0 my-[2px] mx-1"
        />
        <p className="displayVersionDes text-[170%] font-[700] z-[2] text-[#0066FF] dark:text-[#FFC700]">
          {switchDigits(selectedVersion.version, params.lang)}
        </p>
      </div>

      <div className="lineBox flex justify-between items-center w-full truncate min-h-[48px] lg:px-[15px]">
        <p className="toseVbehbod font-rokh dark:text-[#FCF9FE] z-[1] whitespace-nowrap  text-[140%] ">
          {trimmedTitle}
        </p>

        <hr className="flex-grow border-2 border-dashed h-[2px] border-b-0 my-[2px] mx-1" />

        <p className="toseVbehbodDate text-[#868B90] z-[1] whitespace-nowrap text-[120%] ">
          {formatDate(selectedVersion.date, params.lang)}
        </p>
      </div>

      <div className="lg:px-[15px] descriptionBox flex justify-between items-center  w-full min-h-[48px] ">
        <span className="mb-2 duration-300 ease-in-out self-start text-bold dark:text-white lg:w-full lg:self-end lg:p-0">
        {DscriptionText}
        </span>
      </div>

      <div
        className="versionHistoryInfo  flex-row flex  leading-[37px] transition-[max-height] duration-300 ease-in-out text-[90%] w-full pb-[20px] h-auto bg-transparent text-[#C4C4C4] lg:text-[#908986] lg:overflow-auto lg:h-full"
      >
        <div
          className="justify-between  px-3 ltr lg:px-[30px] "
          dangerouslySetInnerHTML={{
            __html: selectedVersion.description || "",
          }}
        />
      </div>
    </div>
  );
};

export default DescriptionBox;
