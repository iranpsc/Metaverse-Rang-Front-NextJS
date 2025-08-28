import { useState, useRef } from "react";
import Image from "next/image";
import { CLoseIcon } from "@/svgs/index";
import { Arrow } from "@/svgs/SvgEducation";

// ANIMATION
import { motion } from "framer-motion";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { findByUniqueId } from "../../../../../components/utils/findByUniqueId";

export default function ShareArticlePage({
  setShowSocial,
  mainData,
  params,
}: any) {
  const [copied, setCopied] = useState(false);

  const items = [
    { id: 1, img: "/shared/whatsapp.png", title: "WhatsApp" },
    { id: 2, img: "/shared/telegram.png", title: "Telegram" },
    { id: 3, img: "/shared/facebook.png", title: "Facebook" },
    { id: 4, img: "/shared/twitter.png", title: "Twitter" },
    { id: 5, img: "/shared/linkedin.png", title: "Linkedin" },
  ];

  const handleCopyClick = async () => {
    try {
      const textToCopy = `https://rgb.irpsc.com/${params.lang}/articles/${params.slug}`;
      await navigator.clipboard.writeText(textToCopy);

      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (error) {
      console.error("Error copying URL:", error);
    }
  };

  const handleShare = (platform: any) => {
    const urlToShare = `https://rgb.irpsc.com/${params.lang}/articles/${params.slug}`;
    let shareUrl = "";

    switch (platform) {
      case "WhatsApp":
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(urlToShare)}`;
        break;
      case "Telegram":
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(urlToShare)}`;
        break;
      case "Facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`;
        break;
      case "Twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(urlToShare)}&text=YourTextHere`;
        break;
      case "Linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(urlToShare)}`;
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
    <div className="fixed backdrop-blur-sm bg-blackTransparent/30 z-50 top-[-112px] left-0 w-full h-screen ">
      <div className="w-full h-full overflow-clip">
        <motion.div
          initial={{ rotate: 0, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          exit={{ opacity: 1, scale: 0 }}
          transition={{ duration: 0.5, ease: "backInOut" }}
          className="flex flex-col justify-center items-center w-full h-full "
        >
          <div className="xl:w-[50%] lg:w-[50%] md:w-[70%] min-h-[350px] max-h-fit rounded-[15px] border-2 border-[#898989] flex relative me-[250px] sm:me-0 sm:w-[90%] xs:me-0 xs:w-[90%] justify-center items-center shadow-md bg-white dark:bg-dark-background">
            <div className="w-full h-full flex flex-col justify-start mt-2 items-center gap-10 absolute top-0">
              <CLoseIcon
                className="w-[15px] h-[15px] cursor-pointer stroke-2 m-2 stroke-gray dark:stroke-dark-gray absolute start-3 top-1"
                onClick={() => setShowSocial(false)}
                alt="Close"
              />
              <h1 className="font-azarMehr font-bold text-[16px] mt-2 text-[#00000096] dark:text-white w-full text-center">
                {findByUniqueId(mainData, 324)}
              </h1>

              {/* arrows */}
              <div className="rounded-full cursor-pointer absolute right-1 top-[28%] z-50 flex justify-center items-center" onClick={scrollRight}>
                <Arrow className="stroke-gray dark:stroke-dark-gray stroke-[5px] w-7 h-7 rotate-[180deg]" />
              </div>
              <div className="rounded-full cursor-pointer absolute left-1 top-[28%] z-50 flex justify-center items-center" onClick={scrollLeft}>
                <Arrow className="stroke-gray dark:stroke-dark-gray stroke-[5px] w-7 h-7" />
              </div>

              {/* icons */}
              <div className="overflow-x-auto no-scrollbar relative w-[90%]" ref={scrollContainer}>
                <div className="flex flex-row justify-center items-center gap-4 py-2 w-full">
                  {items.map((item: any) => (
                    <div
                      key={item.id}
                      className="transition-transform duration-500 ease-in-out hover:-translate-y-1 cursor-pointer flex flex-col justify-center items-center"
                      onClick={() => handleShare(item.title)}
                    >
                      <Image
                        src={item.img}
                        alt={item.title}
                        width={70}
                        height={70}
                        className="xl:w-[70px] xl:h-[70px] lg:w-[70px] lg:h-[70px] md:w-[60px] md:h-[60px] sm:w-[50px] sm:h-[50px] xs:w-[50px] xs:h-[50px]"
                      />
                      <p className="font-azarMehr font-bold text-[14px] mt-3">{item.title}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* copy link */}
              <div data-tooltip-id="unique-tooltip" className="relative flex justify-end items-center mt-8 w-[95%] rounded-[20px] px-4 py-1 shadow-md dark:bg-[#000] border border-gray">
                <p
                  className="absolute start-2 cursor-pointer rounded-[18px] w-max text-center font-azarMehr text-[14px] font-bold py-2 px-5 text-[#f9f9f9] bg-[#0000ffd9] dark:bg-dark-yellow dark:text-[#000]"
                  onClick={handleCopyClick}
                >
                  {findByUniqueId(mainData, 323)}
                </p>
                <p className="py-2 text-[#000] dark:text-[#fff] font-azarMehr text-[14px] font-medium">{`https://rgb.irpsc.com/${params.lang}/articles/${params.slug}`}</p>
              </div>

              {copied && (
                <ReactTooltip
                  id="unique-tooltip"
                  place="bottom"
                  isOpen={true}
                  style={{ backgroundColor: "#737272", color: "#fff", fontWeight: "bold" }}
                >
                  {params.lang === "fa" ? "کپی شد!" : "copied!"}
                </ReactTooltip>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
