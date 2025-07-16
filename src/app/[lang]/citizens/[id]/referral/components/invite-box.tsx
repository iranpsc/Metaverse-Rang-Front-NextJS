"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { findByUniqueId } from "@/components/utils/findByUniqueId";

export default function InviteBox({
  referralPageArrayContent,
  params,
  mainData,
}: {
  referralPageArrayContent: any;
  params: any;
  mainData: any;
}) {
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [inviteLink, setInviteLink] = useState(
    `rgb.irpsc.com/${params.lang}/citizens/${params.id}/referral`
  );

  // function localFind(_name: any): string {
  //   if (!Array.isArray(referralPageArrayContent) || referralPageArrayContent.length === 0) {
  //     console.warn('referralPageArrayContent is empty or not an array', { _name });
  //     return '';
  //   }
  //   const item = referralPageArrayContent.find((item: any) => item.name === _name);
  //   if (!item) {
  //     console.warn(`No item found for name: ${_name}`, { referralPageArrayContent });
  //     return '';
  //   }
  //   return item.translation || '';
  // }

  const handleShare = (platform: any) => {
    const urlToShare = `https://rgb.irpsc.com/${params.lang}/citizen/${params.id}`;
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

  const copyToClipboard = () => {
    let fullUrl;
    if (typeof window !== "undefined") {
      fullUrl = `${window.location.origin}${pathname}`;
    }

    if (inputRef.current) {
      navigator.clipboard
        .writeText(
          fullUrl ||
            `https://rgb.irpsc.com/${params.lang}/citizens/${params.id}/referral`
        )
        .then(() => {
          setCopied(true); // Update button text to "Copied"
          setTimeout(() => setCopied(false), 5000); // Reset text after 5 seconds
        })
        .catch((err) => console.error("Failed to copy text:", err));
    }
  };
  return (
    <div className="bg-white dark:bg-darkGray lg:overflow-visible h-auto flex flex-col w-full justify-start items-center text-white rounded-3xl relative overflow-hidden lg:flex-row mt-[64px]">
      <div
        className="absolute inset-20 lg:inset-5 opacity-10 bg-no-repeat  rotate-[25deg] z-10 w-44 h-44 "
        style={{
          backgroundImage: "url('/firstpage/referral/1.png')",
          backgroundSize: "contain",
        }}
      ></div>


      <div className="flex flex-wrap min-h-[260px] ">
        <div className="w-full lg:w-3/4 p-6">
          <p className="text-black dark:text-white text-lg leading-[36px] text-justify lg:text-[20px] ">
            {findByUniqueId(mainData, 1420)}
          </p>

          <div className=" flex flex-col w-full lg:flex-row lg:gap-2 xl:mt-12">
            <div className="lg:w-[50%] ">
              <label
                htmlFor="invite-link1"
                className="block mb-2 lg:mb-8 text-black dark:text-white"
              >
                {findByUniqueId(mainData, 1421)}
              </label>
              <div className=" h-12 lg:h-13 xl:h-14 rounded-xl border border-solid border-[#484950] flex flex-row-reverse items-center  px-2 relative">
                <button
                  onClick={copyToClipboard}
                  className="dark:text-dark-primary text-blueLink text-sm whitespace-nowrap bg-transparent"
                >
                  {copied
                    ? params.lang.toLowerCase() == "fa"
                      ? "کپی شد"
                      : "copied"
                    : findByUniqueId(mainData, 1422)}
                </button>
                <input
                  ref={inputRef}
                  id="invite-link1"
                  type="text"
                  value={inviteLink}
                  className="text-[#868B90] px-1 bg-transparent w-full overflow-hidden border-none whitespace-nowrap overflow-ellipsis outline-none cursor-pointer"
                  readOnly
                  onClick={copyToClipboard}
                />
                <div
                  id="iconbutton"
                  className="w-auto h-auto cursor-pointer dark:text-white text-darkGray"
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.0601 10.9375C15.3101 13.1875 15.3101 16.8275 13.0601 19.0675C10.8101 21.3075 7.17009 21.3175 4.93009 19.0675C2.69009 16.8175 2.68009 13.1775 4.93009 10.9375"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.59 13.4128C8.24996 11.0728 8.24996 7.27281 10.59 4.92281C12.93 2.57281 16.73 2.58281 19.08 4.92281C21.43 7.26281 21.42 11.0628 19.08 13.4128"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className=" flex flex-col justify-between lg:w-[50%] items-center lg:justify-center lg:gap-3 lg:ps-2 xl:ps-9">
              <span className="text-black dark:text-white my-5 self-start lg:my-0 lg:mb-8 lg:ps-[1px]">
                {findByUniqueId(mainData, 1423)}
              </span>
              <div className="flex flex-row w-full justify-evenly lg:justify-between  gap-1 sm:px-24 lg:px-0 lg:pe-20">
                {/* لینک تلگرام */}
                <a
                  onClick={(e) => handleShare("Telegram")}
                  id="telegram-share"
                  className="text-gray-400 cursor-pointer"
                >
                  <svg
                    className="xl:w-10 xl:h-10 2xl:w-11 2xl:h-11"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="16" cy="16" r="15.5" stroke="#484950" />
                    <path
                      d="M12.9331 12.2134L18.5931 10.3268C21.1331 9.4801 22.5131 10.8668 21.6731 13.4068L19.7865 19.0668C18.5198 22.8734 16.4398 22.8734 15.1731 19.0668L14.6131 17.3868L12.9331 16.8268C9.12646 15.5601 9.12646 13.4868 12.9331 12.2134Z"
                      stroke="#84858F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.7396 17.0965L17.1263 14.7031"
                      stroke="#84858F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                {/* لینک واتساپ */}
                <a
                  onClick={(e) => handleShare("Whatsapp")}
                  id="whatsApp-share"
                  className="text-gray-400 cursor-pointer"
                >
                  <svg
                    className="xl:w-10 xl:h-10 2xl:w-11 2xl:h-11"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="16" cy="16" r="15.5" stroke="#484950" />
                    <path
                      d="M12.6 21.7359C13.6 22.3359 14.8 22.6693 16 22.6693C19.6667 22.6693 22.6667 19.6693 22.6667 16.0026C22.6667 12.3359 19.6667 9.33594 16 9.33594C12.3334 9.33594 9.33337 12.3359 9.33337 16.0026C9.33337 17.2026 9.66671 18.3359 10.2 19.3359L9.77382 20.9753C9.57909 21.7242 10.2723 22.401 11.0164 22.1884L12.6 21.7359Z"
                      stroke="#84858F"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M19 17.899C19 18.007 18.976 18.118 18.9249 18.226C18.8738 18.334 18.8077 18.436 18.7206 18.532C18.5734 18.694 18.4111 18.811 18.2278 18.886C18.0476 18.961 17.8523 19 17.642 19C17.3355 19 17.008 18.928 16.6625 18.781C16.317 18.634 15.9715 18.436 15.6289 18.187C15.2834 17.935 14.9559 17.656 14.6435 17.347C14.334 17.035 14.0546 16.708 13.8052 16.366C13.5588 16.024 13.3605 15.682 13.2163 15.343C13.0721 15.001 13 14.674 13 14.362C13 14.158 13.0361 13.963 13.1082 13.783C13.1803 13.6 13.2944 13.432 13.4537 13.282C13.646 13.093 13.8563 13 14.0786 13C14.1627 13 14.2469 13.018 14.322 13.054C14.4001 13.09 14.4692 13.144 14.5233 13.222L15.2203 14.203C15.2744 14.278 15.3135 14.347 15.3405 14.413C15.3676 14.476 15.3826 14.539 15.3826 14.596C15.3826 14.668 15.3615 14.74 15.3195 14.809C15.2804 14.878 15.2233 14.95 15.1512 15.022L14.9229 15.259C14.8898 15.292 14.8748 15.331 14.8748 15.379C14.8748 15.403 14.8778 15.424 14.8838 15.448C14.8928 15.472 14.9019 15.49 14.9079 15.508C14.9619 15.607 15.0551 15.736 15.1873 15.892C15.3225 16.048 15.4667 16.207 15.6229 16.366C15.7852 16.525 15.9414 16.672 16.1007 16.807C16.2569 16.939 16.3861 17.029 16.4882 17.083C16.5033 17.089 16.5213 17.098 16.5423 17.107C16.5663 17.116 16.5904 17.119 16.6174 17.119C16.6685 17.119 16.7076 17.101 16.7406 17.068L16.969 16.843C17.0441 16.768 17.1162 16.711 17.1853 16.675C17.2544 16.633 17.3235 16.612 17.3986 16.612C17.4557 16.612 17.5158 16.624 17.5819 16.651C17.648 16.678 17.7171 16.717 17.7922 16.768L18.7867 17.473C18.8648 17.527 18.9189 17.59 18.9519 17.665C18.982 17.74 19 17.815 19 17.899Z"
                      stroke="#84858F"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                    />
                  </svg>
                </a>
                {/* لینک فیس بوک */}
                <a
                  onClick={(e) => handleShare("Facebook")}
                  id="faceBook-share"
                  className="text-gray-400 cursor-pointer"
                >
                  <svg
                    className="xl:w-10 xl:h-10 2xl:w-11 2xl:h-11"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="16" cy="16" r="15.5" stroke="#484950" />
                    <path
                      d="M17.3333 14.2V16.1333H19.0667C19.2 16.1333 19.2667 16.2667 19.2667 16.4L19 17.6667C19 17.7333 18.8667 17.8 18.8 17.8H17.3333V22.6667H15.3333V17.8667H14.2C14.0667 17.8667 14 17.8 14 17.6667V16.4C14 16.2667 14.0667 16.2 14.2 16.2H15.3333V14C15.3333 12.8667 16.2 12 17.3333 12H19.1333C19.2667 12 19.3333 12.0667 19.3333 12.2V13.8C19.3333 13.9333 19.2667 14 19.1333 14H17.5333C17.4 14 17.3333 14.0667 17.3333 14.2Z"
                      stroke="#84858F"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                    />
                    <path
                      d="M18 22.6693H14C10.6667 22.6693 9.33337 21.3359 9.33337 18.0026V14.0026C9.33337 10.6693 10.6667 9.33594 14 9.33594H18C21.3334 9.33594 22.6667 10.6693 22.6667 14.0026V18.0026C22.6667 21.3359 21.3334 22.6693 18 22.6693Z"
                      stroke="#84858F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                {/* لینک لینکدین */}
                <a
                  onClick={(e) => handleShare("Linkedin")}
                  id="linkedin-share"
                  className="text-gray-400 cursor-pointer"
                >
                  <svg
                    className="xl:w-10 xl:h-10 2xl:w-11 2xl:h-11"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="16" cy="16" r="15.5" stroke="#484950" />

                    <g transform="translate(8, 8) scale(1)">
                      <path
                        d="M4.79998 7.20156V11.2016M4.79998 4.80156V4.80956M7.99998 11.2016V7.20156M11.2 11.2016V8.80156C11.2 8.37722 11.0314 7.97025 10.7313 7.67019C10.4313 7.37013 10.0243 7.20156 9.59998 7.20156C9.17563 7.20156 8.76866 7.37013 8.46861 7.67019C8.16855 7.97025 7.99998 8.37722 7.99998 8.80156M1.59998 3.20156C1.59998 2.77722 1.76855 2.37025 2.0686 2.07019C2.36866 1.77013 2.77563 1.60156 3.19998 1.60156H12.8C13.2243 1.60156 13.6313 1.77013 13.9313 2.07019C14.2314 2.37025 14.4 2.77722 14.4 3.20156V12.8016C14.4 13.2259 14.2314 13.6329 13.9313 13.9329C13.6313 14.233 13.2243 14.4016 12.8 14.4016H3.19998C2.77563 14.4016 2.36866 14.233 2.0686 13.9329C1.76855 13.6329 1.59998 13.2259 1.59998 12.8016V3.20156Z"
                        stroke="#84858F"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                </a>
                {/* لینک ایکس */}
                <a
                  onClick={(e) => handleShare("Twitter")}
                  id="x-share"
                  className="text-gray-400 cursor-pointer"
                >
                  <svg
                    className="xl:w-10 xl:h-10 2xl:w-11 2xl:h-11"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="16" cy="16" r="15.5" stroke="#484950" />

                    <g transform="translate(8, 8) scale(1)">
                      <path
                        d="M12.2175 1.26562H14.4665L9.5531 6.88129L15.3333 14.5229H10.8075L7.26265 9.88832L3.20659 14.5229H0.956247L6.21158 8.51636L0.666626 1.26562H5.30736L8.51156 5.50185L12.2175 1.26562ZM11.4282 13.1768H12.6744L4.63022 2.54105H3.29293L11.4282 13.1768Z"
                        fill="#84858F"
                      />
                    </g>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="relative lg:absolute lg:top-[-30px] rtl:lg:left-0 ltr:lg:right-0 h-[300px] lg:h-[112%] w-full lg:w-[35%] ltr:rotate-y-180">
          <Image
            className="object-contain"
            src="/firstpage/referral/invite.svg"
            fill
            sizes="320px"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
