"use client";

import { useState } from "react";
import Image from "next/image";
import { CLoseIcon } from "@/svgs/index";
import { findByUniqueId } from "../utils/findByUniqueId";
import { motion } from "motion/react";

const DEFAULT_IMAGE = "/defult-alayeg.jpg";

/* استایل محتوای HTML (Tailwind preflight استایل لیست/تیتر را برمی‌دارد) */
const RICH_TEXT_CLASSES =
  "[&_b]:font-bold [&_strong]:font-bold [&_i]:italic [&_em]:italic [&_u]:underline " +
  "[&_s]:line-through [&_del]:line-through " +
  "[&_p]:min-h-[1em] [&_p]:mb-2 [&_div]:min-h-[1em] " +
  "[&_ul]:list-disc [&_ol]:list-decimal [&_ul]:ps-6 [&_ol]:ps-6 [&_li]:mb-1 " +
  "[&_:is(h1,h2,h3,h4,h5,h6)]:font-bold [&_:is(h1,h2,h3,h4,h5,h6)]:mb-2 " +
  "[&_blockquote]:border-s-4 [&_blockquote]:ps-3 [&_blockquote]:opacity-80 " +
  "[&_a]:text-primary [&_a]:underline break-words";

function FavoriteImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [imageSrc, setImageSrc] = useState(src || DEFAULT_IMAGE);

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={60}
      height={60}
      className="size-[50px] md:size-[40px] mx-5"
      onError={() => {
        if (imageSrc !== DEFAULT_IMAGE) {
          console.error("خطا در بارگذاری تصویر:", imageSrc);
          setImageSrc(DEFAULT_IMAGE);
        }
      }}
    />
  );
}

export default function ModalCard({
  setShowModal,
  dataModal,
  mainData,
}: any) {
  const bodyClasses =
    "pb-16 px-4 pt-5 leading-[35px] overflow-y-auto overflow-x-clip font-azarMehr font-medium 3xl:text-xl3Desc xl:text-xlDesc lg:text-lgDesc md:text-mdDesc sm:text-smTitle xs:text-smTitle text-matn-2 text-justify dark:dark-scrollbar light-scrollbar";

  return (
    <div className="fixed top-0 left-0 backdrop-blur-[15px] bg-black/40 z-1001 w-screen h-screen text-matn-2">
      <div className="flex flex-col justify-center w-screen h-screen items-center w-full">
        <motion.div
          initial={{ rotate: 0, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          exit={{ opacity: 1, scale: 0 }}
          transition={{
            duration: 0.5,
            ease: "backInOut",
          }}
          className={`xl:w-[40%] lg:w-[40%] md:w-[70%] min-h-100 3xl:min-h-150 max-h-150 rounded-[10px] border-2 border-[#00000096] dark:border-[#898989] border-solid flex relative me-[250px] sm:me-0 sm:w-[90%] xs:me-0 xs:w-[90%] justify-center xl:mt-0 lg:mt-0 md:mt-0 ${
            dataModal.title === "about me" ||
            dataModal.title === "درباره من"
          } items-center relative shadow-md bg-white dark:bg-dark-background`}
        >
          <CLoseIcon
            className="absolute w-[24px] h-[24px] cursor-pointer stroke-2 stroke-matn-2 top-5 inset-e-5 z-50"
            onClick={() => setShowModal(false)}
            alt={dataModal.title}
          />

          <div className="w-full h-full flex flex-col justify-start gap-4 top-0 absolute">
            <div className="flex flex-row justify-start items-center mt-[14px] ps-4">
              <h1 className="font-azarMehr font-bold 3xl:text-2xl xl:text-xlDesc lg:text-lgDesc md:text-mdDesc sm:text-smTitle xs:text-smTitle text-matn-2">
                {dataModal.title}
              </h1>
            </div>

            {dataModal.type === "favorites" ? (
              <div className="px-5 mt-7">
                <div className="w-full flex justify-center items-center">
                  <div className="flex flex-wrap justify-center gap-x-12 gap-y-5 items-center w-full">
                    {Object.keys(dataModal.data).map(
                      (item: string, index: number) => (
                        <div
                          key={index}
                          className="flex flex-col gap-3 justify-center items-center"
                        >
                          <FavoriteImage
                            src={dataModal.data[item] || DEFAULT_IMAGE}
                            alt={findByUniqueId(mainData, item) || item}
                          />

                          <p className="font-azarMehr 3xl:text-xl3Title lg:text-lgTitle xl:text-xlTitle md:text-mdTitle sm:text-smTitle xs:text-smTitle font-medium text-matn-2 dark:text-white">
                            {item}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            ) : dataModal.isHtml ? (
              /* HTML تمیزشده با sanitizeHtml (bold / اینتر / لیست حفظ می‌شود) */
              <div
                className={`${bodyClasses} ${RICH_TEXT_CLASSES}`}
                dangerouslySetInnerHTML={{ __html: dataModal.data || "" }}
              />
            ) : (
              <p className={bodyClasses}>{dataModal.data}</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}