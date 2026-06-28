// components/AvalancheBanner.tsx
import { findByUniqueId } from "@/components/utils/findByUniqueId";
import TextScramble from '@/components/ui/animations/textScramble';
interface AvalancheBannerProps {
    params: { lang: string };
    mainData: { mainData: string };
}
export default function AvalancheBanner({ params, mainData }: AvalancheBannerProps) {

    return (
        <section className="relative overflow-hidden  bg-white dark:bg-[#1A1A18] rounded-[40px] px-4 py-10 md:px-0 md:py-14">
            {/* Background Glow */}
            <div className="flex gap-10 items-center justify-center">
                <div className='flex gap-10 mt-5 items-center w-[50%] pb-10'>
                    <div >
                        <svg className="w-[100px] lg:w-auto" width="198" height="198" viewBox="0 0 198 198" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className='fill-black dark:fill-white' d="M45.0441 16.5H33.4113C25.7388 16.5 21.8614 25.8225 27.3064 31.2675L74.5787 78.54C88.1087 92.07 109.971 92.07 123.501 78.54L170.774 31.2675C176.219 25.8225 172.342 16.5 164.669 16.5H153.036C146.189 16.5 139.589 19.2225 134.722 24.09L105.186 53.625C101.804 57.0075 96.3591 57.0075 92.9766 53.625L63.4414 24.09C58.4914 19.2225 51.8916 16.5 45.0441 16.5Z" fill="white" />
                            <path className='fill-black dark:fill-white' d="M45.0441 181.25H33.4113C25.7388 181.25 21.8614 171.928 27.3064 166.483L74.5787 119.21C88.1087 105.68 109.971 105.68 123.501 119.21L170.774 166.483C176.219 171.928 172.342 181.25 164.669 181.25H153.036C146.189 181.25 139.589 178.527 134.722 173.66L105.186 144.125C101.804 140.742 96.3591 140.742 92.9766 144.125L63.4414 173.66C58.4914 178.527 51.8916 181.25 45.0441 181.25Z" fill="white" />
                        </svg>
                    </div>
                    <div className="text-start max-w-3xl ">
                        <TextScramble className=" dark:text-white text-xl xl:text-3xl 2xl:text-5xl 3xl:text-6xl leading-relaxed 3xl:leading-[60px] "
                            text={findByUniqueId(mainData, 1683)}
                            lang={params.lang}
                        />

                    </div>

                </div>
                <div className="w-[40%]">
                    <p className="dark:text-[#FFFFFF] text-[#1A1A18] 3xl:text-3xl">
                        {findByUniqueId(mainData, 1682)}
                    </p>
                </div>
            </div>
        </section>
    );
}