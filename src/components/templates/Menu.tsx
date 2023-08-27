"use client";
import Image from "next/image";
//Modules
import CardMenu from "../module/CardMenu";
//ICONS
import * as logoKermoonSvg from "../../../public/menu/belongings.svg";
import closeIcon from "../../../public/close.png";
import moonIcon from "../../../public/moon.png";
import logo from "../../../public/cdlogo.png";

const Menu = async ({ menu }: any) => {
  interface DataItem {
    id: number;
    modal_id: Number;
    name: String;
    // سایر فیلدها
  }

  const res = await fetch(
    "https://admin.rgb.irpsc.com/api/translations/8/modals/49/tabs"
  );
  const data = await res.json();

  return (
    <div className="flex-row me-3">
      <div className="flex justify-between items-center w-full">
        <Image
          src={moonIcon}
          alt="darkMode"
          className={`cursor-pointer ${menu ? "visible" : "hidden"}`}
        />
        <Image
          src={closeIcon}
          alt="closeMenu"
          className="cursor-pointer"
          onClick={() => menu(false)}
        />
      </div>
      <div className="mt-5 flex w-full justify-end h-auto py-2">
        <div className="flex-row mr-2">
          <p className="text-right">متا رنگ</p>
          <p>متاورس رنگ</p>
        </div>
        <Image src={logo} alt="cdlogo" className="h-auto my-1" />
      </div>
      <hr className="mt-5" />
      {data.data &&
        data.data.map((item: DataItem) => (
          <CardMenu key={item.id} data={item} />
        ))}
    </div>
  );
};

export default Menu;
