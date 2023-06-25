import React, {useState} from "react";
import LoginModal from "@/components/organsims/header/login-modal"
import HeaderCategories from "@/components/molecules/header/header-categories"
import HamburgerMenu from "./hamburger-menu";
import HeaderIcon from '../../../../public/png/HeaderIcon.png'
import user from "../../../../public/png/profile-full.png";
import { Video } from "@/types/api/index";
import Image from 'next/image'
import Link from 'next/link'


export default function Header() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_URL;

  function openModal() {
    setModalIsOpen(true);
  }
  return (
    <>
    <LoginModal modalOpen={modalIsOpen} setModalOpen={setModalIsOpen} />    
    <div className="flex fixed bg-gray opacity-90 h-[67px] items-center w-full z-50">
      <div className="w-full grid grid-cols-3 lg:grid-cols-11 mx-[15px]">
      <div className="col-span-1 flex items-center lg:hidden"><HamburgerMenu/></div>
      <div className="col-span-1">
      <Image
        src={HeaderIcon}
        width={80}
        height={42}
        alt="آموزش متاورس"
        className="justify-start hidden lg:flex"
      />
      </div>
      <div className="hidden lg:flex lg:col-span-9 lg:justify-start"><HeaderCategories/></div>
      <div className="col-span-1 flex items-center sm:justify-end w-[150px] -mr-[25px] md:mr-[0px]">
          <Image src={user} width={40} height={40} alt="login modal" onClick={openModal} className="ml-[5px]"/>
      <Link href={`${baseUrl}/metaverse`} className="text-sm md:text-xl bg-orange h-[34px] w-[100px] md:w-[150px] rounded-sm -ml-[100px] lg:ml-[50px] flex justify-center items-center">
        <span className="font-Jana mx-2 whitespace-nowrap">ورود به متاورس</span>
      </Link>
      </div>
      </div>
    </div>
    </>
  );
}
