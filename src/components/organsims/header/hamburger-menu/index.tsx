import React, {useState} from "react"
import Drawer from "@/components/organsims/drawer"
import {headerCategories} from "@/data/header/headerCats"
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HeaderIcon from '../../../../../public/png/HeaderIcon.png'
import Link from "next/link";
import Image from 'next/image'


export default function HamburgerMenu() {
const [isDrawerOpen, setIsDrawerOpen] = useState(false);
const toggleDrawer = (event: any) => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <Drawer
      anchor="right"
      togglerChild={
        <FontAwesomeIcon icon={faBars} className="w-[30px] h-[30px]"/>
      }
      isOpen={isDrawerOpen}
    >
      <>
        <div className="h-full flex flex-col mt-4">
            <Image
                src={HeaderIcon}
                width={80}
                height={42}
                alt="آموزش متاورس"
            />
          {headerCategories.map((data, index) => (
            <Link
              key={index}
              href={data.href}
              className="text-neutrals-40 hover:text-primary py-4 px-4 hover:bg-purple rounded-lg"
              onClick={toggleDrawer}
            >
              <span
                className="text-14 md:text-16 text-neutrals-90 p-3 text-right font-medium"
              >
                {data.title}
              </span>
            </Link>
          ))}          
          
        </div>
      </>
    </Drawer>
  );
}
