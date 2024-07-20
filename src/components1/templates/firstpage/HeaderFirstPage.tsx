import { Arrow, Discord, Vector } from "@/components/svgs";
import { motion } from "framer-motion";
import Image from "next/image";

const HeaderFirstPage = () => {
  return (
    <>
      <div
        className="xl:col-span-6 lg:col-span-6 md:col-span-12 sm:col-span-12  xl:order-1 lg:order-1 md:order-2  sm:order-2 xs:order-2 xs:col-span-12 w-full flex flex-col justify-start items-start gap-5 
      xl:ps-32 lg:ps-32 md:ps-5 sm:ps-5 xs:ps-5"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="w-[50%] text-center font-bold text-[56px] text-dark-yellow whitespace-nowrap font-rokh mt-5"
        >
          متاورس رنگ
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className=" w-full outline-none border-none"
        >
          <Vector className="w-[50%] h-10" />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="text-white text-[36px] text-start  w-[50%] font-bold "
        >
          ادغام ایده و خلاقیت
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full   text-justify   text-white font-azarMehr font-medium "
        >
          متاورس رنگ یک پلتفرم دنیای متاورس است که به کاربران امکان می‌دهد تا در
          یک فضای مجازی منحصربه‌فرد، به ارتباط با دیگر افراد بپردازند و تعاملات
          واقعی را تجربه کنند. با این وبسایت، شما می‌توانید جهان‌های دیجیتال را
          ایجاد کنید، با دوستان خود در ارتباط باشید، آثار خلاقانه خود را به
          اشتراک بگذارید و در مسابقات و بازی‌ها شرکت کنید.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="border-[1px] border-white rounded-full w-[305px] h-[77px] flex flex-row justify-between items-center ps-6 pe-1"
        >
          <p className="w-fit text-start text-[20px] text-white font-azarMehr font-medium ">
            ورود به دنیای متاورس
          </p>
          <div className="bg-dark-yellow size-[70px] rounded-full flex justify-center items-center">
            <Arrow className="size-[36px]" />
          </div>
        </motion.div>
        <Discord className="size-[50px]" />
      </div>

      <div
        className="xl:col-span-6 lg:col-span-6 md:col-span-12 sm:col-span-12 xs:col-span-12 w-full flex justify-center items-center 
       xl:order-2 lg:order-2 md:order-1  sm:order-1 xs:order-1
      "
      >
        <Image
          className="size-full"
          src="/firstpage/header.png"
          alt="header"
          width={1000}
          height={1000}
          priority={true}
        />
      </div>
    </>
  );
};

export default HeaderFirstPage;
