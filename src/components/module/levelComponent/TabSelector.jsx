import Link from 'next/link'
import { targetData } from "@/components/utils/targetDataName";

export default function TabSelector ({params,levelsTranslatePage,levelId}){
    const lang = params.lang

    const ButtonLink = ({ title, link }) => {
        return <Link prefetch={false} href={`/${lang}/levels/citizen/${params.levelName}/${link}`}
        className={`inline-flex items-center justify-center w-full sm:w-auto ${link === params.tabs ? 'text-blueLink dark:text-dark-yellow border-b-2 border-dark-active-btn p-3 pb-2.5 font-bold' : 'dark:text-white font-[400] border-b-2 border-transparent p-3 pb-2.5'}`} >
            {title}
        </Link>
    }


    return (
        <div className="bg-bgLightGrey dark:bg-darkGrey dark:textwhite rounded-[12px] font[700] mx-3">
            <ul className="flex flex-col sm:flex-row sm:justify-around flex-wrap -mb-px text-sm font-medium">
                <li className="me-2 w-100 sm:w-auto">
                  <ButtonLink title={targetData(levelsTranslatePage, "basic level information")} link="general-info" />
                </li>
                <li className="me-2 w-100 sm:w-auto"><ButtonLink title={targetData(levelsTranslatePage,"permissions and access")} link="licenses" /></li>
                <li className="me-2 w-100 sm:w-auto"> <ButtonLink title={targetData(levelsTranslatePage,"surface gem")} link="gem" /></li>
                <li className="me-2 w-100 sm:w-auto"><ButtonLink title={targetData(levelsTranslatePage,"accompanying gift")} link="gift" /></li>
                <li className="me-2 w-100 sm:w-auto"><ButtonLink title={targetData(levelsTranslatePage,"reward for reaching the level")} link="prize" /></li>
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