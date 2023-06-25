import React, { useState } from "react";
import Lottie from "lottie-react";
import User from "../../../../public/png/user.png";
import Logo from "../../../../public/png/navbar/cdlogo.png";
import { navBarItems } from "@/src/data/navbar/navbarItems";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import LoginModal from "@/components/organsims/header/login-modal";
import login from "../../../../public/json/login.json";

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className }: NavbarProps) {
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }
  return (
    <>
      <LoginModal modalOpen={modalIsOpen} setModalOpen={setModalIsOpen} />
      <nav
        className={`z-50 fixed bottom-0 flex items-center justify-between w-full h-16 bg-gray-lighter text-gray-600 rounded-t-[20px] ${className}`}
      >
        {/* Avatar */}
        <div className="flex items-center">
          <button
            onClick={openModal}
            style={{ position: "absolute" }}
            className="shadow-md bg-gray-lighter items-center rounded-md mr-[1px] flex"
          >
            <Lottie
              animationData={login}
              className="w-[40px] flex items-center"
            />
            <h2 className="text-blue font-JannaLTRegular text-left flex items-center justify-end ml-[5px]">
              ورود
            </h2>
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex overflow-x-auto max-w-[200px]">
          {navBarItems.map((data, index) => (
            <Image
              key={index}
              src={data.image}
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full mx-2 h-[40px] w-[40px]"
            />
          ))}
        </div>
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src={Logo}
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full mx-[5px]"
          />
        </div>
      </nav>
    </>
  );
}
