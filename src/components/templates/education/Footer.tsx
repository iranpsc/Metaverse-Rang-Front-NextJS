import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { translateFooter } from "@/components/utils/education";
import { imageSources } from "@/components/utils/items";

export default function Footer({ footerTabs }: any) {
  interface ItemIcon {
    id: number;
    img: string;
    translation: string;
    target: string;
  }
  const socialItems: ItemIcon[] = [
    {
      id: 1,
      img: "/social/facebook.png",
      translation: translateFooter(footerTabs, "facebook"),
      target: translateFooter(footerTabs, "facebook-url"),
    },
    {
      id: 2,
      img: "/social/feed.png",
      translation: translateFooter(footerTabs, "feed"),
      target: translateFooter(footerTabs, "fedd-url"),
    },
    {
      id: 3,
      img: "/social/instagram.png",
      translation: translateFooter(footerTabs, "instagram"),
      target: translateFooter(footerTabs, "instagram-url"),
    },
    {
      id: 4,
      img: "/social/linkedin.png",
      translation: translateFooter(footerTabs, "linkedin"),
      target: translateFooter(footerTabs, "linkedin-url"),
    },
    {
      id: 5,
      img: "/social/printers.png",
      translation: translateFooter(footerTabs, "pinterest"),
      target: translateFooter(footerTabs, "pinterest-url"),
    },
    {
      id: 6,
      img: "/social/whatsapp.png",
      translation: translateFooter(footerTabs, "whatsapp"),
      target: translateFooter(footerTabs, "whatsapp-url"),
    },
    {
      id: 7,
      img: "/social/youtube.png",
      translation: translateFooter(footerTabs, "youtube"),
      target: translateFooter(footerTabs, "youtube-url"),
    },
    {
      id: 8,
      img: "/social/rubika.png",
      translation: translateFooter(footerTabs, "rubika"),
      target: translateFooter(footerTabs, "rubika-url"),
    },
    {
      id: 9,
      img: "/social/telegram.png",
      translation: translateFooter(footerTabs, "telegram"),
      target: translateFooter(footerTabs, "telegram-url"),
    },
    {
      id: 10,
      img: "/social/virgool.png",
      translation: translateFooter(footerTabs, "virgool"),
      target: translateFooter(footerTabs, "virgool-url"),
    },
    {
      id: 11,
      img: "/social/add.png",
      translation: translateFooter(footerTabs, "add"),
      target: translateFooter(footerTabs, "add-url"),
    },
    {
      id: 12,
      img: "/social/aparat.png",
      translation: translateFooter(footerTabs, "aparat"),
      target: translateFooter(footerTabs, "aparat-url"),
    },
    {
      id: 13,
      img: "/social/dalfak.png",
      translation: translateFooter(footerTabs, "dalfak"),
      target: translateFooter(footerTabs, "dalfak-url"),
    },
    {
      id: 14,
      img: "/social/discord.png",
      translation: translateFooter(footerTabs, "discord"),
      target: translateFooter(footerTabs, "discord-url"),
    },

    {
      id: 15,
      img: "/social/faq.png",
      translation: translateFooter(footerTabs, "faq"),
      target: translateFooter(footerTabs, "faq-url"),
    },
    {
      id: 16,
      img: "/social/filo.png",
      translation: translateFooter(footerTabs, "filo"),
      target: translateFooter(footerTabs, "filo-url"),
    },
    {
      id: 17,
      img: "/social/jabeh.png",
      translation: translateFooter(footerTabs, "jabeh"),
      target: translateFooter(footerTabs, "jabeh-url"),
    },
    {
      id: 18,
      img: "/social/medium.png",
      translation: translateFooter(footerTabs, "medium"),
      target: translateFooter(footerTabs, "medium-url"),
    },
    {
      id: 19,
      img: "/social/mp4.png",
      translation: translateFooter(footerTabs, "mp4"),
      target: translateFooter(footerTabs, "mp4-url"),
    },
    {
      id: 20,
      img: "/social/namasha.png",
      translation: translateFooter(footerTabs, "namasha"),
      target: translateFooter(footerTabs, "namasha-url"),
    },
  ];

  return (
    <>
      <div className="h-fit  w-[96%] mt-[200px] flex flex-wrap gap-[8px] rounded-[10px] p-3 items-center justify-center bg-white dark:bg-[#1A1A18]">
        {imageSources.map((item: any, i: number) => (
          <div key={i}>
            <Link href={item.target} target="_blank">
              <Image
                data-tooltip-id={item.url}
                src={item.url}
                loading="lazy"
                alt={item.translate}
                width={1000}
                height={1000}
                className="w-[60px] h-[60px] cursor-pointer"
              />
            </Link>
            <ReactTooltip
              id={item.url}
              place="top"
              content={
                (
                  footerTabs.find(
                    (itemData: any) => itemData.name === item.translate
                  ) || {}
                ).translation || "undefined"
              }
            />
          </div>
        ))}
      </div>
      <div className="h-fit pb-5 mt-20 rounded-[10px] w-[96%] bg-white dark:bg-[#1A1A18] grid grid-cols-6">
        <div className="col-span-6  xl:col-span-4 mt-2 ">
          <div className="w-full h-[82px] mt-4 ms-6 flex flex-row justify-start items-center gap-5 ">
            <Image
              src="/logo.png"
              alt="logo"
              width={1000}
              height={1000}
              className="w-[60px] h-[60px] inline "
            />
            <div className="flex flex-col h-[60px]  justify-between items-start">
              <h1 className="text-[22px] mt-[-5px] font-bold font-azarMehr  dark:text-white">
                {(
                  footerTabs.find(
                    (item: any) => item.name == "national metaverse"
                  ) || {}
                ).translation || "undefined"}
              </h1>
              <h2 className="mb-[-3px] font-azarMehr font-normal">
                {(
                  footerTabs.find(
                    (item: any) =>
                      item.name == "global leadership in a parallel world"
                  ) || {}
                ).translation || "undefined"}
              </h2>
            </div>
          </div>
          <p className="ms-6 mt-6 font-normal text-justify font-azarMehr text-[#4C4C4C] dark:text-[#D4D4D4] text-[20px] leading-9">
            {(
              footerTabs.find(
                (item: any) => item.name == "footer description1"
              ) || {}
            ).translation || "undefined"}{" "}
            <br />
            {(
              footerTabs.find(
                (item: any) => item.name == "footer description2"
              ) || {}
            ).translation || "undefined"}
          </p>
        </div>
        <div className="xl:col-span-2 col-span-6 mt-6 w-full flex flex-col items-center">
          <p className="text-center w-full font-medium font-azarMehr text-[20px] text-[#4C4C4C] dark:text-white">
            {(
              footerTabs.find(
                (item: any) => item.name == "join our networks"
              ) || {}
            ).translation || "undefined"}
          </p>
          <div className="xl:grid xl:grid-cols-5 3xl:grid-cols-7  flex flex-wrap gap-3 max-w-fit lg:w-full  justify-center   mt-6 ">
            {socialItems.map((item: ItemIcon) => (
              <div key={item.id}>
                <Link href={item.target} target="_blank">
                  <Image
                    data-tooltip-id={`${item.id}`}
                    key={item.id}
                    src={item.img}
                    alt={item.translation}
                    width={1000}
                    height={1000}
                    className="w-[63px] h-[60px] col-span-1"
                  />
                </Link>
                <ReactTooltip
                  id={`${item.id}`}
                  place="top"
                  content={item.translation}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-[20px]"></div>
    </>
  );
}
