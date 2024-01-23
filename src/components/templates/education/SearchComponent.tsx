import {  useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { Like, Search } from "@/components/svgs";
import SyncLoader from "react-spinners/SyncLoader";
import { translateFooter } from "@/components/utils/education";


export default function SearchComponent({ themeDataActive, translateData ,setActiveSearch}: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState<any>([]);
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);

  useEffect(() => {
    if (searchTerm.length >= 4) {
      setLoadingSearch(true);
      const formData = new FormData();
      formData.append("searchTerm", searchTerm);

      axios
        .post("https://api.rgb.irpsc.com/api/tutorials/search", formData)
        .then((response) => {
          setLoadingSearch(false);
          setSearchData(response.data.data);
            
       
              

        })
        .catch((error) => {
          setLoadingSearch(false);
          setActiveSearch(false)
        });
    } else {
      setSearchData([]);
      setLoadingSearch(false);

      setActiveSearch(false)
    }
  }, [searchTerm]);

  useEffect(()=>{
   if (searchData.length >= 1) {
     setActiveSearch(true);
   } else {
     setActiveSearch(false);
   }
  },[searchData])
  const removeSearch = () => {
    setSearchData([]);
    setSearchTerm("");
    setActiveSearch(false)
  };

  return (
    <>
      <div
        className={`${
          searchData.length >= 1 ? "visible" : "invisible"
        }  w-full backdrop-blur-sm  bg-blackTransparent/30 h-screen absolute top-0 z-10 `}
        onClick={removeSearch}
      ></div>
      <div
        id={`${
          themeDataActive === "dark" ? "dark-scrollbar" : "light-scrollbar"
        }`}
        className="mt-[50px] flex flex-col  relative z-20 "
      >
        <div className=" w-[724px] xs:w-[300px] h-[50px] py-4 rounded-[67px] shadow-md hover:shodow-2xl bg-white dark:bg-[#1A1A18] flex flex-row justify-between items-center">
          <Search className="ms-8 fill-blueLink dark:fill-dark-yellow" />
          <input
            placeholder={translateFooter(
              translateData,
              "search for the training you need"
            )}
            className="w-[80%]  outline-none border-none 
              placeholder-[#868B90] text-[14px] xs:text-[10px] ms-2  font-azarMehr font-medium  dark:bg-[#1A1A18]  dark:placeholder-dark-gray "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {loadingSearch && (
            <SyncLoader
              color={`${themeDataActive == "dark" ? "#FFC700" : "#0000FF"}`}
              className="me-1 "
              size={5}
              speedMultiplier={0.5}
            />
          )}

          <span className="text-blueLink dark:text-dark-activeButton  me-5  font-azarMehr font-medium">
            {translateFooter(translateData, "search")}
          </span>
        </div>
        <div className="w-full  bg-white dark:bg-dark-background rounded-xl max-h-[500px]  overflow-y-auto overflow-x-clip absolute mt-[53px]  flex flex-col justify-start items-center gap-1 z-10  ">
          {searchData.length >= 1 &&
            searchData.map((item: any) => (
              <div
                key={item.id}
                className="w-[99%] h-[65px] mt-2 hover:dark:shadow-dark transition-all duration-300  bg-white dark:bg-[#121210] shadow-md hover:shadow-xl  cursor-pointer rounded-full  flex flex-row justify-between items-center"
              >
                <p className="ms-7 font-azarMehr truncate  text-[16px] xs:text-[12px] font-medium ">
                  {item.title}
                </p>
                <div className="flex flex-row justify-between items-center gap-3 min-w-fit ">
                  <div className="h-full flex flex-col gap-0 ">
                    <p className="uppercase  font-azarMehr text-[14px] xs:text-[10px] font-bold  text-blueLink">
                      {item.creator_code}
                    </p>
                    <div className="flex flex-row items-center justify-end gap-1 ">
                      <span className=" whitespace-nowrap font-azarMehr font-light 3xl:text-[18px] xs:text-[12px]">
                        {item.likes}
                      </span>
                      <Like />
                    </div>
                  </div>
                  <Image
                    src={item.creator_image}
                    alt={item.creator_image}
                    loading="lazy"
                    width={1000}
                    height={1000}
                    className=" w-[50px] h-[50px] xs:w-[40px] xs:h-[40px] me-2 my-5  shadow-sm shadow-gray rounded-full"
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
