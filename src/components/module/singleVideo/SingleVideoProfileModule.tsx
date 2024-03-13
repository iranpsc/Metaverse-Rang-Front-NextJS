import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { checkData } from "@/components/utils/targetDataName";

const SingleVideoProfileModule = ({ DataVideo }: any) => {
  const router = useRouter();
  const { lang } = router.query;
  return (
    <div className="w-full pb-2 flex flex-row justify-between  items-center pt-10 bg-white dark:bg-singleVideo-dark-background ps-5 ">
      <Link
        href={`https://rgb.irpsc.com/${lang}/citizen/${2000}`}
        target="_blank"
      >
        <div className="flex flex-row justify-start items-center gap-2">
          <Image
            src={DataVideo.creator.image}
            alt={DataVideo.creator.code}
            width={1000}
            height={1000}
            loading="lazy"
            className="w-[80px] h-[80px] xs:size-[50px] rounded-full object-cover cursor-pointer transition-all duration-150 ease-in-out"
            // onClick={() => pushRgb(item.creator.code)}
          />
          <div className="flex flex-col justify-center items-start gap-4 xs:gap-2 h-[80px]">
            <span
              className="text-singleVideo-gray dark:text-white cursor-pointer text-[20px] xs:text-[14px] whitespace-nowrap font-medium hover:font-bold uppercase "
              // onClick={() => pushRgb(item.creator.code)}
            >
              {checkData(DataVideo.creator.name)}
            </span>
            <span
              className="text-blueLink  cursor-pointer text-[14px] xs:text-[12px] 3xl:text-[18px] whitespace-nowrap font-medium hover:font-bold uppercase "
              // onClick={() => pushRgb(item.creator.code)}
            >
              {checkData(DataVideo.creator.code)}
              {" : "}
              {checkData(DataVideo.creator.code)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SingleVideoProfileModule;
