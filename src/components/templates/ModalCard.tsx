import { CLoseIcon } from "../svgs";
export default function ModalCard({setShowModal,data}:any){

    return (
      <div className="absolute backdrop-blur-sm bg-blackTransparent/30  z-50 top-0 w-full h-full">
        <div className=" flex justify-center items-center w-full h-full">
          <div className=" w-[40%] h-[40%] flex justify-center items-center shadow-md bg-white text-center">
            <div className=" w-full h-full flex flex-col justify-start gap-20">
              <div>
                
                <CLoseIcon className="w-[15px] h-[15px] cursor-pointer stroke-2 m-2 stroke-gray"
                onClick={()=>setShowModal(false)}
                 />
              </div>
              <p className="">{data}</p>
            </div>
            d
          </div>
        </div>
      </div>
    );
}