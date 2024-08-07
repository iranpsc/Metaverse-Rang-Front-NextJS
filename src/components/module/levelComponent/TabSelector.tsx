import Link from 'next/link'
import { targetData } from "@/components/utils/targetDataName";
import { trace } from 'console';

export default function TabSelector ({params,levelsTranslatePage}:any){
    const id = params.levelId
    const lang = params.lang

    const ButtonLink = ({ title, link }: { title: string, link: string }) => {
        return <Link prefetch={false} href={`/${lang}/levels/${id}/${link}`}
        className={`inline-flex items-center justify-center ${link === params.tabs ? 'dark:text-dark-yellow border-b-2 border-dark-active-btn p-3 pb-2.5 font-bold' : 'dark:text-white border-b-2 border-transparent p-3 pb-2.5'}`} >
            {title}
        </Link>
    }


    return (
        <div className="dark:bg-darkGray dark:textwhite rounded-[12px]">
            <ul className="flex justify-around flex-wrap -mb-px text-sm font-medium">
                <li className="me-2">
                  <ButtonLink title={targetData(levelsTranslatePage, "basic level information")} link="general-info" />
                </li>
                <li className="me-2"><ButtonLink title={targetData(levelsTranslatePage,"permissions and access")} link="licenses" /></li>
                <li className="me-2"> <ButtonLink title={targetData(levelsTranslatePage,"surface gem")} link="gem" /></li>
                <li className="me-2"><ButtonLink title={targetData(levelsTranslatePage,"accompanying gift")} link="gift" /></li>
                <li className="me-2"><ButtonLink title={targetData(levelsTranslatePage,"reward for reaching the level")} link="prize" /></li>
            </ul>
        </div>

        // <div className="flex-row gap-4 w-full text-[#868B90] overflow-auto no-scrollbar text-14">
        //     
        //     
        //    
        //     
        //     
        // </div>
    )
}