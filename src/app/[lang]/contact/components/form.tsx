export default function ContactForm() {
  return (
    <>
      <div className="grid lg:grid-cols-2 gap-3 md:gap-5">
        <div className="flex flex-col gap-3 ">
          <div className="flex flex-col gap-5">
            <input
              type="text"
              className="w-full h-[50px] bg-grayLight dark:bg-black rounded-[10px] p-4 border-0 placeholder:text-[#BEBFC9] dark:placeholder:text-colors-light-shades-matn2"
              name="name"
              id="name"
              placeholder="نام و نام خانوادگی"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 ">
          <div className="flex flex-col gap-5">
            <input
              type="number"
              className="w-full h-[50px] bg-grayLight dark:bg-black rounded-[10px] p-4 border-0 placeholder:text-[#BEBFC9] dark:placeholder:text-colors-light-shades-matn2 "
              name="phone"
              id="phone"
              placeholder="شماره تلفن"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 ">
          <div className="flex flex-col gap-5">
            <input
              type="text"
              className="w-full h-[50px] bg-grayLight dark:bg-black rounded-[10px] p-4 border-0 placeholder:text-[#BEBFC9] dark:placeholder:text-colors-light-shades-matn2 "
              name="email"
              id="email"
              placeholder="پست الکترونیک"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 ">
          <div className="flex flex-col gap-5">
            <input
              type="text"
              className="w-full h-[50px] bg-grayLight dark:bg-black rounded-[10px] p-4 border-0 placeholder:text-[#BEBFC9] dark:placeholder:text-colors-light-shades-matn2 "
              name="subject"
              id="subject"
              placeholder="موضوع پیام"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 md:gap-5 w-full mt-2 md:mt-5">
        <div className="flex flex-col">
          <textarea
            className="w-full bg-grayLight dark:bg-black rounded-[10px] p-4 border-0 placeholder:text-[#BEBFC9] dark:placeholder:text-colors-light-shades-matn2 "
            id="message"
            rows={5}
            placeholder="پیام خود را اینجا بنویسید..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="mt-[4px] bg-blueLink dark:bg-dark-yellow dark:text-black w-full text-white font-bold text-center p-4 rounded-[10px] active:scale-105"
        >
          ارسال پیام
        </button>
      </div>
    </>
  );
}
