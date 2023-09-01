import Image from "next/image";
import { CLoseIcon } from "../svgs";
export default function ModalCard({setShowModal,dataModal}:any){
console.log(dataModal.desc);
    return (
      <div className="absolute backdrop-blur-sm bg-blackTransparent/30  z-50 top-0 w-full h-full">
        <div className=" flex justify-center items-center w-full h-full">
          <div className=" w-[40%] rounded-[10px] border-2 border-[#898989] flex me-[250px] justify-center items-center shadow-md bg-white dark:bg-dark-background text-center">
            <div className=" w-full h-full flex flex-col justify-start gap-4">
              <div className="flex flex-row justify-between items-center mx-3 mt-3">
                <CLoseIcon
                  className="w-[15px] h-[15px] cursor-pointer stroke-2 m-2 stroke-gray"
                  onClick={() => setShowModal(false)}
                />
                <h1 className="font-azarMehr font-bold text-[16px] text-[#00000096] dark:text-gray">
                  {dataModal.title}
                </h1>
              </div>

              {typeof dataModal.desc === "string" ? (
                <p className="pb-16 px-2 font-azarMehr font-medium text-[14px] text-[#00000096] dark:text-gray">
                  {dataModal.desc}
                </p>
              ) : (
                <div className="flex flex-row justify-center items-center gap-3 pb-10 mt-10 ">
                  {Object.keys(dataModal.desc).map((item: any, index: any) => (
                    <Image
                      key={index}
                      src={dataModal.desc[item]}
                      alt=""
                      width={100}
                      height={100}
                      className="w-10 h-10"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
}