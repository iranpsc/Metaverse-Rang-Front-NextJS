"use client";
import { useEffect, useState } from "react";
import VersionContent from "./versionContent";
import axios from "axios";
// import { getSingleVersion } from "@/utils/actions";

const VersionSection = ({ firstPageArrayContent, allVersionList }: any) => {
  function localFind(_name: any) {
    return firstPageArrayContent.find((item: any) => item.name == _name)
      .translation;
  }
  const [activeTabId, setActiveTabId] = useState(allVersionList[0].id); // Default tab
  const [singleData, setSingleData] = useState({});

  useEffect(() => {
    const fetchActiveTab = async (_id: any) => {
      let temp = await axios.get(
        `https://api.rgb.irpsc.com/api/calendar/versions/${_id}`
      );
      setSingleData(temp.data.data);
    };
    fetchActiveTab(activeTabId);
  }, [activeTabId]);

  const handleTabClick = (_id: any) => {
    setActiveTabId(_id);
  };

  return (
    <>
      <div className="w-full flex flex-row justify-between items-center ">
        <p className="font-azarMehr font-medium text-[16px] md:text-[20px] lg:text-[28px] xl:text-[32px] dark:text-white">
          {localFind("The latest versions")}
        </p>
      </div>
      <div className="border-4 border-[#343434] rounded-[32px] md:rounded-[40px] lg:rounded-[50px] xl:rounded-[56px] flex flex-col justify-start items-start xl:gap-10 lg:gap-10 md:gap-7 sm:gap-5 xs:gap-3 p-5 sm:p-6 md:p-8 xl:p-10 bg-gradient-to-l from-[#343434] to-[#2E2D28] mt-12">
        <div className="w-full flex flex-nowrap overflow-x-scroll no-scrollbar justify-between items-center gap-2 sm:gap-3 ">
          {allVersionList.map(
            (item: any, index: any) =>
              index < 5 && (
                <p
                  key={item.id}
                  className={`p-[10px] w-fit text-center font-azarMehr text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] cursor-pointer font-light ${
                    item.id == activeTabId
                      ? "dark:bg-dark-yellow bg-blueLink text-white dark:text-black"
                      : "bg-[#343434] text-white"
                  }  rounded-[12px] sm:rounded-[14px] md:rounded-[16px] lg:rounded-[18px] xl:rounded-[20px] whitespace-nowrap`}
                  onClick={() => handleTabClick(item.id)}
                >
                  {item.version_title}
                </p>
              )
          )}
        </div>
        <div>
          <VersionContent singleData={singleData} />
        </div>
      </div>
    </>
  );
};

export default VersionSection;
