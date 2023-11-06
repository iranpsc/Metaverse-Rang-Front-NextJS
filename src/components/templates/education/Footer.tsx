import { useState, useEffect, useContext } from "react";
import { LangContext } from "@/context/LangContext";
import Image from "next/image";
import axios from "axios";

export default function Footer() {
    const { languageSelected } = useContext(LangContext);
  interface ItemIcon {
    img: string;
  }
  const item: ItemIcon[] = [
    { img: "/footer/supply.png" },
    { img: "/footer/target.png" },
    { img: "/footer/tenders-soon.png" },
    { img: "/footer/tenders.png" },
    { img: "/footer/tour-soon.png" },
    { img: "/footer/tour.png" },
    { img: "/footer/vezarat.png" },
    { img: "/footer/video.png" },
    { img: "/footer/waste-soon2.png" },
    { img: "/footer/waste3.png" },
    { img: "/footer/work-soon1.png" },
    { img: "/footer/waste.png" },
    { img: "/footer/work-soon.png" },
    { img: "/footer/waste-soon1.png" },
    { img: "/footer/work3.png" },
    { img: "/footer/waste-soon.png" },
    { img: "/footer/work.png" },
  ];

  const socialItems: ItemIcon[] = [
    { img: "/social/printers.png" },
    { img: "/social/linkedin.png" },
    { img: "/social/instagram.png" },
    { img: "/social/feed.png" },
    { img: "/social/facebook.png" },
    { img: "/social/virgool.png" },
    { img: "/social/telegram.png" },
    { img: "/social/rubika.png" },
    { img: "/social/youtube.png" },
    { img: "/social/whatsapp.png" },
    { img: "/social/faq.png" },
    { img: "/social/discord.png" },
    { img: "/social/dalfak.png" },
    { img: "/social/aparat.png" },
    { img: "/social/add.png" },
    { img: "/social/namasha.png" },
    { img: "/social/mp4.png" },
    { img: "/social/medium.png" },
    { img: "/social/jabeh.png" },
    { img: "/social/filo.png" },
  ];

     useEffect(() => {
       const fetchData = async () => {
         try {
           const res = await axios.get(`${languageSelected.file_url}`);

           const modalsProfile = res.data.modals.find(
             (modal: any) => modal.name === "footer-menu"
           ).tabs;

           const tabsMenu = modalsProfile.find(
             (item: any) => item.name === "our-systems"
           );

         

          console.log(tabsMenu.fields);
   
         } catch (err) {}
       };
       fetchData();
     }, [languageSelected.id]);
   

  return (
    
    <>
      <div className="h-fit  w-[96%] mt-[200px] flex flex-row rounded-[10px] p-3 items-center justify-between  bg-white dark:bg-[#1A1A18]">
        {item.map((item: ItemIcon,i:number) => (
          <Image
          key={i}
            src={item.img}
            alt="rgb"
            width={1000}
            height={1000}
            className="w-[63px] h-[63px]"
          />
        ))}
      </div>
      <div className="h-[400px] mt-20 rounded-[10px] w-[96%] bg-white dark:bg-[#1A1A18] grid grid-cols-6">
        <div className="col-span-4 mt-2">
          <div className="w-full h-[82px] mt-4 ms-6 flex flex-row justify-start items-center gap-5">
            <Image
              src="/logo.png"
              alt="logo"
              width={1000}
              height={1000}
              className="w-[60px] h-[60px] inline bg-balck"
            />
            <h1 className="text-[22px]  font-bold text-[#4C4C4C] dark:text-white">
              متاورس ملی
              
              <div className="h-3"></div>
              رهبری جهانی در دنیای موازی
            </h1>
          </div>
          <p className="ms-6 mt-6 font-normal text-[#4C4C4C] dark:text-[#D4D4D4] text-[20px] leading-9">
            متاورس ملی، یک پروژه بزرگ و پیشرو در دنیای موازی متاورس رنگ است که
            توسط شرکت تعاونی زنجیره تامین بهشت به اجرا درآمده است. این پروژه، به
            واقعیت جدیدی در دنیای موازی و مجازی دست یافته و امکاناتی شگفت‌انگیز
            را به مردمان سرتاسر جهان ارائه می‌دهد تا تجربه‌هایی منحصر به فرد و
            جذاب را تجربه نمایند. <br />
            تعاونی زنجیره تامین بهشت، به عنوان بانی اصلی این پروژه، با استفاده
            از تکنولوژی‌های پیشرفته و بهره‌گیری از مفهوم متاورس، به ایجاد یک
            جوامع مجازی جهانی ارتقا داده است. این پروژه امکان بهره وری از
            فناوریIoT، تجربه‌ی محیط سه بعدی واقعیت مجازی، و تعاملات بی‌پایان را
            در اختیار مردم قرار می‌دهد.
          </p>
        </div>
        <div className="col-span-2 mt-6">
          <p className="text-center font-medium text-[20px] text-[#4C4C4C] dark:text-white">
            به شبکه های ما ملحق شوید.
          </p>
          <div className="flex flex-wrap gap-x-[18px] gap-y-3 justify-end me-3 mt-6">
            {socialItems.map((item: ItemIcon,i:number) => (
              <Image
              key={i}
                src={item.img}
                alt="rgb"
                width={1000}
                height={1000}
                className="w-[63px] h-[60px] col-span-1"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="h-[20px]"></div>
    </>
  );
}
