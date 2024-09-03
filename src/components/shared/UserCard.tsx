import Image from "next/image";
import { Like } from "../svgs/SvgEducation";
import Link from "next/link";

export default function UserCard({ item, index, params }: any) {
  return (
    <Link href={`/${params.lang}/citizen/${item.code}`}>
      <div
        key={index}
        className="min-w-[258px] min-h-[150px] shadow-xl flex flex-col justify-start items-center gap-10 py-5 bg-[#1A1A18] rounded-[24px] mx-3 hover:scale-105 base-transition-1"
      >
        <Image
          className="size-[170px] rounded-full border-none"
          src={item.profile_photo || "/temp-1.png"}
          alt="header"
          width={1000}
          height={1000}
          loading="lazy"
        />
        <p className="font-azarMehr font-medium text-[20px] text-white">
          {item.name}
        </p>
        <p className="font-azarMehr font-medium text-[18px] text-dark-yellow">
          شهروندان پیشرو
        </p>
        <div className="flex justify-center items-center">
          <p className="font-azarMehr font-medium text-[20px] text-[#808080]">
            {item.like}
          </p>
          <Like className="size-[15px] stroke-[#808080]" />
        </div>
      </div>
    </Link>
  );
}
