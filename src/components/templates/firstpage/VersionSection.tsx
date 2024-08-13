const VersionSection = ({ firstPageArrayContent }: any) => {
  function localFind(_name: any) {
    return firstPageArrayContent.find((item: any) => item.name == _name)
      .translation;
  }
  const data = [
    { id: 1, text: " ورژن 1.1.5" },
    { id: 2, text: " ورژن 1.1.4" },
    { id: 3, text: " ورژن 1.1.3" },
    { id: 4, text: " ورژن 1.1.2" },
  ];
  return (
    <>
      <div className="w-full flex flex-row justify-between items-center ">
        <p className="font-azarMehr font-medium text-[16px] md:text-[20px] lg:text-[28px] xl:text-[32px] dark:text-white">
          {localFind("The latest versions")}
        </p>
      </div>
      <div className="border-4 border-[#343434] rounded-[56px] flex flex-col justify-start items-start xl:gap-10 lg:gap-10 md:gap-7 sm:gap-5 xs:gap-3 p-10 bg-gradient-to-l from-[#343434] to-[#2E2D28] mt-12">
        <div className="w-full flex flex-wrap justify-between items-center gap-3 ">
          {data.map((item: any) => (
            <p
              key={item.id}
              className={`w-fit text-center font-azarMehr xl:text-[20px] ld:text-[20px] md:text-[20px] sm:text-[16px] xs:text-[14px] xl:px-10 lg:px-10 md:px-7 sm:px-5 xs:px-5 px-1 py-5 font-medium ${
                item.id === 1
                  ? "bg-dark-yellow text-black "
                  : "bg-[#343434] text-white"
              }   rounded-[20px] whitespace-nowrap`}
            >
              {item.text}
            </p>
          ))}
        </div>
        <p className="w-fit font-azarMehr xl:text-[20px] lg:text-[20px] md:text-[18px] sm:text-[16px] xs:text-[16px] font-medium  text-[#7D7D7D]  py-5 rounded-[20px] ">
          18/9/1401
        </p>
        <h3 className="text-white xl:text-[36px] lg:text-[34px] md:text-[32px] sm:text-[28px] xs:text-[24px] text-start  w-full font-bold ">
          اجرای یادمان مزار شهدای گمنام قزوین و ساخت مدال مربوط به شهدا
        </h3>
        <ul className="list-disc ps-5 ">
          <li className="mt-5">
            <span className="font-azarMehr text-[20px] font-medium  text-white">
              تغییرات 1
            </span>
          </li>
          <li className="mt-5">
            <span className="font-azarMehr text-[20px] font-medium  text-white">
              {" "}
              تغییرات 2
            </span>
          </li>
          <li className="mt-5">
            <span className="font-azarMehr text-[20px] font-medium  text-white">
              {" "}
              تغییرات 3
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default VersionSection;
