import { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { CLoseIcon } from "@/svgs/index";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
//ANIMATION
import { motion } from "framer-motion";
import { Tooltip as ReactTooltip } from "react-tooltip";

export default function ShredPage({ showSharedPage, setShowSharedPage }: any) {
      const [copied, setCopied] = useState(false);
    const { theme } = useTheme();
  const router = useRouter();
  const lang = router.query.lang;
  

  const items = [
    { id: 1, img: "/shared/whatsapp.png", title: "WhatsApp" },
    { id: 2, img: "/shared/telegram.png", title: "Telegram" },
    { id: 3, img: "/shared/facebook.png", title: "Facebook" },
    { id: 4, img: "/shared/twitter.png", title: "Twitter" },
    { id: 5, img: "/shared/linkedin.png", title: "Linkedin" },
  ];

   const handleCopyClick = async () => {
     try {
       const textToCopy = `https://rgb.irpsc.com/${router.query.lang}/citizen/${router.query.userId}`;
       await navigator.clipboard.writeText(textToCopy);

       setCopied(true);
       setTimeout(() => setCopied(false), 1000);
     } catch (error) {
       console.error("Error copying URL:", error);
     }
   };

   const handleShare = (platform:any) => {
     const urlToShare = `https://rgb.irpsc.com/${router.query.lang}/citizen/${router.query.userId}`;
     let shareUrl = "";

     switch (platform) {
       case "WhatsApp":
         shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
           urlToShare
         )}`;
         break;
       case "Telegram":
         shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
           urlToShare
         )}`;
         break;
       case "Facebook":
         shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
           urlToShare
         )}`;
         break;
       case "Twitter":
         shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
           urlToShare
         )}&text=YourTextHere`;
         break;
       case "Linkedin":
         shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
           urlToShare
         )}`;
         break;
     }

     window.open(shareUrl, "_blank");
   };

  return (
    <div
      className="absolute backdrop-blur-sm bg-blackTransparent/30 z-50 top-0 bottom-0 w-full xl:h-full lg:h-full md:h-full sm:min-h-full xs:min-h-full xl:pb-0 lg:pb-0 md:pb-0 sm:pb-[2300px] xs:pb-[2300px]"
    >
      <div className="w-full h-full">
        <motion.div
            initial={{ rotate: 0, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
           exit= {{opacity: 1,scale:0}}
         
          transition={{
            duration: 0.5,
            ease: "backInOut",
          }}
          className=" flex flex-col justify-center   items-center w-full h-full"
        >
          <div
            className="xl:w-[40%] lg:w-[40%] md:w-[40%] min-h-[300px] max-h-fit  rounded-[15px] border-2 border-[#898989] flex relative me-[250px] sm:me-0 sm:w-[90%] xs:me-0 xs:w-[90%] justify-center xl:mt-0 lg:mt-0 md:mt-0 
                 sm:mt-[1500px] xs:mt-[1500px] items-center shadow-md bg-white dark:bg-dark-background ">
            <div
            
              className="w-full h-full overflow-clip flex flex-col justify-start mt-2 items-center  gap-10 top-0 absolute">
              <div className="w-[96%] flex flex-row justify-between items-center">
                <CLoseIcon
                  className="w-[15px] h-[15px] cursor-pointer stroke-2 m-2 stroke-gray"
                  onClick={() => setShowSharedPage(false)}
                  alt="Close"
                />
                <h1 className="font-azarMehr font-bold text-[16px] text-[#00000096] dark:text-gray">
                  {lang == "fa" ? "اشتراک گذاری" : "Share"}
                </h1>
              </div>

              <div className="flex flex-row justify-center items-center w-full gap-4">
                {items.map((item: any) => (
                  <div
                    key={item.id}
                    className="transition-transform duration-500 ease-in-out hover:-translate-y-1 cursor-pointer hover flex flex-col justify-center items-center w-[70px]"
                    onClick={() => handleShare(item.title)}
                  >
                    <Image
                      src={item.img}
                      alt={item.img}
                      width={1000}
                      height={1000}
                      className="w-[50px] h-[50px]"
                    />
                    <p>{item.title}</p>
                  </div>
                ))}
              </div>

              <div
                data-tooltip-id="unique-tooltip"
                className="relative flex justify-end mt-10 w-[95%] rounded-[20px] px-4 py-1 shadow-md dark:bg-[#000] border border-gray"
              >
                <p
                  className="absolute start-2 cursor-pointer w-[75px] rounded-[40px] text-center  font-azarMehr text-[16px] font-bold  py-2 text-[#f9f9f9] bg-[#0000ffd9] dark:bg-dark-yellow dark:text-[#000]  "
                  onClick={handleCopyClick}
                >
                  {lang == "fa" ? "کپی" : "Copy"}
                </p>
                <p className="py-2 text-[#000] dark:text-[#fff] font-azarMehr text-[16px] font-medium">{`https://rgb.irpsc.com/${router.query.lang}/citizen/${router.query.userId}`}</p>
              </div>
              {copied && (
                <ReactTooltip id="unique-tooltip" place="bottom" isOpen={true}>
                  {router.query.lang === "fa" ? "کپی شد!" : "copied!"}
                </ReactTooltip>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
