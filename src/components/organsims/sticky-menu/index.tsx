import React, { useState } from "react";
import HomeClick from "../../../../public/png/sticky/home-click.png";
import Menu from "../../../../public/png/sticky/menu.png";
import login from "../../../../public/json/login.json";
import { stickyItems } from "@/src/data/sticky/stickyItems";
import LoginModal from "@/components/organsims/header/login-modal";
import Lottie from "lottie-react";

import Image from "next/image";

interface StickyMenuProps {
  className?: string;
  onIsOpenChange?: (newIsOpen: boolean) => void;
}

export default function StickyMenu({
  className,
  onIsOpenChange,
}: StickyMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleIsOpenChange(newIsOpen: boolean) {
    setIsOpen(newIsOpen);
    if (onIsOpenChange) {
      onIsOpenChange(newIsOpen);
    }
  }

  function openModal() {
    setModalIsOpen(true);
  }

  return (
    <>
      <LoginModal modalOpen={modalIsOpen} setModalOpen={setModalIsOpen} />
      <div
        className={`right-0 ${className}`}
        style={{ position: "absolute", height: "94vh" }}
      >
        <div
          style={{ filter: "drop-shadow(0px 0px 3px rgba(0,0,0,0.3 ))" }}
          className={`${
            isOpen == true ? "w-[110px]" : "w-[50px]"
          } bg-white h-[98%] rounded-[8px] mr-[10px]`}
        >
          <button
            className="mx-[5px] mt-[10px] rounded-[10px]"
            onClick={() => handleIsOpenChange(!isOpen)}
          >
            <Image
              src={Menu}
              width="32"
              height="32"
              alt="menu"
              className="h-[32px] w-[32px]"
            />
          </button>
          <div
              className="flex items-center justify-center p-[5px]"
            >
              <button
                disabled
                className={`rounded-md  grid ${
                  isOpen == true ? "grid-cols-2" : "grid-cols-1"
                } `}
              >
                <div className="col-span-1 bg-gray-lighter rounded-[12px] mx-[3px]">
                  <Image
                    src={HomeClick}
                    width="40"
                    height="30"
                    alt="iran-flag"
                    className={`p-[5px] flex justify-start `}
                  />
                </div>
                <div className="col-span-1 flex items-center h-[100%]">
                  {isOpen && (
                    <p className="text-gray mr-[5px] font-Digi text-[12px]">
                      خانه
                    </p>
                  )}
                </div>
              </button>
            </div>
          {stickyItems.map((data, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-[5px]"
            >
              <button
                disabled
                className={`rounded-md  grid ${
                  isOpen == true ? "grid-cols-2" : "grid-cols-1"
                } `}
              >
                <div className="col-span-1">
                  <Image
                    src={data.image}
                    width="50"
                    height="30"
                    alt="iran-flag"
                    className={`p-[5px] flex justify-start opacity-50`}
                  />
                </div>
                <div className="col-span-1 flex items-center h-[100%]">
                  {isOpen && (
                    <p className="text-gray mr-[5px] font-Digi text-[12px]">
                      {data.title}
                    </p>
                  )}
                </div>
              </button>
            </div>
          ))}
          <button
            onClick={openModal}
            style={{ position: "absolute" }}
            className={`${
              isOpen == true ? "w-[98px]" : "w-[48px]"
            } shadow-md bg-gray-lighter items-center rounded-md bottom-[2px]  mr-[1px] flex`}
          >
            <Lottie
              animationData={login}
              className="w-[40px] flex items-center"
            />
            {isOpen && (
              <h2 className="text-blue font-JannaLTRegular text-left flex items-center justify-end ml-[5px]">
                ورود
              </h2>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
