
export default function ModalCard({setShowModal}:any){

    return (
      <div className="absolute backdrop-blur-sm bg-blackTransparent/30  z-50 top-0 w-full h-full">
        <div className=" flex justify-center items-center w-full h-full">
          <div className=" w-[40%] h-[40%] flex justify-center items-center shadow-md bg-white text-center">
            <p onClick={()=>setShowModal(false)}>sss</p>
            <p className="">sdsdsdsd</p>
          </div>
        </div>
      </div>
    );
}