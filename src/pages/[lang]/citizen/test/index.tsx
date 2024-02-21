export default function Citizen() {
  return (
    <div className="grid grid-cols-12 gap-1 overflow-clip w-full h-screen">
      <div className="col-span-5 bg-white h-full flex flex-col pb-1 justify-between items-center gap-2">
        <h1>TESTTS</h1>
        <div className="bg-black/50 w-full  h-[10%]">Header</div>
        <div className=" w-full flex flex-col justify-between items-center gap-2 h-[70%] bg-dark-yellow">
          <div className=" h-[50%]  bg-blueLink w-full">Title</div>
          <div className="h-[25%] bg-error w-full">Title</div>
          <div className="h-[25%] bg-mediumGray w-full">Title</div>
        </div>
        {/* FOOTER */}
        <div className="flex flex-row justify-evenly items-start gap-5  bg-gray/90 w-full max-h-[30%] py-1 ">
          <div className="w-20 h-20 bg-error rounded-xl"></div>
          <div className="w-20 h-20 bg-error rounded-xl"></div>
          <div className="w-20 h-20 bg-error rounded-xl"></div>
        </div>
        H
      </div>
      <div className="col-span-4 bg-white h-full flex flex-col pb-1 justify-between items-center gap-2">
        <div className="bg-black/50 w-full  h-[10%]">Header</div>
        <div className=" w-full flex flex-col justify-between items-center gap-2 h-[70%] bg-dark-yellow">
          <div className=" h-[50%]  bg-blueLink w-full">Title</div>
          <div className="h-[25%] bg-error w-full">Title</div>
          <div className="h-[25%] bg-mediumGray w-full">Title</div>
        </div>
        {/* FOOTER */}
        <div className="flex flex-row justify-evenly items-start gap-5  bg-gray/90 w-full max-h-[30%] py-1 ">
          <div className="w-20 h-20 bg-error rounded-xl"></div>
          <div className="w-20 h-20 bg-error rounded-xl"></div>
          <div className="w-20 h-20 bg-error rounded-xl"></div>
        </div>
      </div>
      <div className="col-span-3 bg-white h-full flex flex-col pb-1 justify-between items-center gap-2">
        <div className="bg-black/50 w-full  h-[10%]">Header</div>
        <div className=" w-full flex flex-col justify-between items-center gap-2 h-[70%] bg-dark-yellow">
          <div className=" h-[50%]  bg-blueLink w-full">Title</div>
          <div className="h-[25%] bg-error w-full">Title</div>
          <div className="h-[25%] bg-mediumGray w-full">Title</div>
        </div>
        {/* FOOTER */}
        <div className="flex flex-row justify-evenly items-start gap-5  bg-gray/90 w-full max-h-[30%] py-1 ">
          <div className="w-20 h-20 bg-error rounded-xl"></div>
          <div className="w-20 h-20 bg-error rounded-xl"></div>
          <div className="w-20 h-20 bg-error rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
