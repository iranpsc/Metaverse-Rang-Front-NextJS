import { useContext, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { CLoseIcon, Arrow } from "@/svgs/index";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { LangContext } from "@/context/LangContext";
import { targetData } from "@/utils/targetDataName";

//ANIMATION
import { motion } from "framer-motion";
import { Tooltip as ReactTooltip } from "react-tooltip";

export default function ShredPage({ showSharedPage, setShowSharedPage }: any) {
  const [copied, setCopied] = useState(false);

  const { data } = useContext(LangContext);
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

  const handleShare = (platform: any) => {
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

  const scrollContainer = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: 100, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: -100, behavior: "smooth" });
    }
  };

  return (
    <div className="absolute backdrop-blur-sm bg-blackTransparent/30 z-50 top-0 w-full h-screen ">
      <div className="w-full h-full overflow-clip">
        <motion.div
          initial={{ rotate: 0, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          exit={{ opacity: 1, scale: 0 }}
          transition={{
            duration: 0.5,
            ease: "backInOut",
          }}
          className=" flex flex-col justify-center   items-center w-full h-full"
        >
          <div
            className="xl:w-[50%] lg:w-[50%] md:w-[70%] min-h-[350px] max-h-fit  rounded-[15px] border-2 border-[#898989] flex relative me-[250px] sm:me-0 sm:w-[90%] xs:me-0 xs:w-[90%] justify-center xl:mt-0 lg:mt-0 md:mt-0 
              mt-[100px]    items-center shadow-md bg-white dark:bg-dark-background "
          >
            <div className="w-full h-full overflow-clip flex flex-col justify-start mt-2 items-center  gap-10 top-0 absolute">
              <CLoseIcon
                className="w-[15px] h-[15px] cursor-pointer stroke-2 m-2 stroke-gray absolute start-3 top-1"
                onClick={() => setShowSharedPage(false)}
                alt="Close"
              />
              <h1 className="font-azarMehr font-bold text-[16px] mt-2 text-[#00000096] dark:text-gray w-full text-center">
                {targetData(data.data.selectedProfileData, "citizen sharing")}
              </h1>

              <div
                className="rounded-full cursor-pointer 3xl:w-[50px] 3xl:h-[50px] xl:w-[50px] xl:h-[50px] lg:w-[50px] lg:h-[50px] md:w-[50px] md:h-[50px] sm:w-[40px] sm:h-[40px] xs:w-[40px] xs:h-[40px] absolute right-1 top-[28%]  z-50 flex justify-center items-center"
                onClick={scrollRight}
              >
                <Arrow className="stroke-gray stroke-[5px] w-7 h-7 rotate-[180deg]" />
              </div>
              <div
                className="rounded-full cursor-pointer 3xl:w-[50px] 3xl:h-[50px] xl:w-[50px] xl:h-[50px] lg:w-[50px] lg:h-[50px] md:w-[50px] md:h-[50px] sm:w-[40px] sm:h-[40px] xs:w-[40px] xs:h-[40px] absolute left-1 top-[28%] z-50 flex justify-center items-center"
                onClick={scrollLeft}
              >
                <Arrow className="stroke-gray stroke-[5px] w-7 h-7" />
              </div>

              <div
                className=" overflow-x-auto overflow-y-clip no-scrollbar relative w-[80%]"
                ref={scrollContainer}
              >
                <div className=" 3xl:mx-5 xl:mx-5 lg:mx-5 sm:mx-10 xs:mx-20 flex flex-row justify-center items-center xl:gap-8 lg:gap-4 md:gap-4 sm:gap-2 xs:gap-2 py-2 w-full">
                  {items.map((item: any) => (
                    <div
                      key={item.id}
                      className=" transition-transform duration-500 ease-in-out hover:-translate-y-1  cursor-pointer hover flex flex-col justify-center items-center "
                      onClick={() => handleShare(item.title)}
                    >
                      <Image
                        src={item.img}
                        alt={item.img}
                        width={1000}
                        height={1000}
                        className="xl:w-[70px] xl:h-[70px] lg:w-[70px] lg:h-[70px] md:w-[60px] md:h-[60px]
                      xs:w-[50px] h-[50px] sm:w-[50px] sm:h-[50px]
                      "
                      />
                      <p className="font-azarMehr font-bold xl:text-[16px] lg:text-[16px] md:text-[14px] sm:text-[14px] xs:text-[12px] mt-3 px-5">
                        {item.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div
                data-tooltip-id="unique-tooltip"
                className="relative flex justify-end items-center mt-8 w-[95%] rounded-[20px] px-4 py-1 shadow-md dark:bg-[#000] border border-gray"
              >
                <p
                  className="absolute start-2 cursor-pointer xl:w-[75px] lg:w-[75px] md:w-[65px] sm:w-[55px] xs:w-[55px] rounded-[40px] text-center  font-azarMehr text-[16px] sm:text-[14px] xs:text-[14px]  font-bold xl:py-2  lg:py-2 md:py-1 sm:py-2 xs:py-2 text-[#f9f9f9] bg-[#0000ffd9] dark:bg-dark-yellow dark:text-[#000]  "
                  onClick={handleCopyClick}
                >
                  {targetData(data.data.selectedProfileData, "copy")}
                </p>
                <p className="py-2 text-[#000] dark:text-[#fff] font-azarMehr xl:text-[16px] lg:text-[16px] md:text-[10px] sm:text-[12px] xs:text-[12px] font-medium">{`https://rgb.irpsc.com/${router.query.lang}/citizen/${router.query.userId}`}</p>
              </div>
              {copied && (
                <ReactTooltip
                  id="unique-tooltip"
                  place="bottom"
                  isOpen={true}
                  style={{
                    backgroundColor: "#737272",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
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
