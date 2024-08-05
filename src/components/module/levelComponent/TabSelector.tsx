import Link from 'next/link'
import { targetData } from "@/components/utils/targetDataName";
import { trace } from 'console';

export default function TabSelector ({params,levelsTranslatePage}:any){
    const id = params.levelId
    const lang = params.lang

    const ButtonLink = ({ title, link }: { title: string, link: string }) => {
        return <Link prefetch={false} href={`/${lang}/levels/${id}/${link}`}
        className={link === params.tabs ? 'text-dark-active-btn border-b-2 border-dark-active-btn p-3 pb-2.5 font-bold' : ' border-b-2 border-transparent p-3 pb-2.5'} >
            {title}
        </Link>
    }


    return (
        <div className="flex-row gap-4 w-full text-[#868B90] overflow-auto no-scrollbar text-14">
            <ButtonLink title={targetData(levelsTranslatePage, "basic level information")} link="general-info" />
            <ButtonLink title={targetData(levelsTranslatePage,"permissions and access")} link="permissions" />
            <ButtonLink title={targetData(levelsTranslatePage,"surface gem")} link="gem" />
            <ButtonLink title={targetData(levelsTranslatePage,"accompanying gift")} link="gift" />
            <ButtonLink title={targetData(levelsTranslatePage,"reward for reaching the level")} link="reward" />
        </div>
    )
}