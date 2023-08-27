import Link from "next/link";
import React from "react";
import Image from "next/image";
import logo from './../../../public/menu/belongings.svg'
import activeMenu from './../../../public/menu/activeMenu.png'

interface CardMenuProps {
  data: any;
 }

const CardMenu: React.FC<CardMenuProps> = ({ data }) => {
  return (
    <div className="flex gap-4 justify-end items-center my-3">
       
      <p className="visible">{data.name}</p>
           <Image
            src={logo}
            alt="emtion"
            style={{
              filter:
              "invert(100%) sepia(100%) saturate(10000%) hue-rotate(180deg)",
            }}
            width={15}
            height={15}
          />
            <Image src={activeMenu} alt="activeLink"/>
         
    </div>
  );
};

export default CardMenu;
